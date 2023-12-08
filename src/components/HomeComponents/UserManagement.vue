<template>
  <div class="UserManagement">
    <div class="UserManagement-end">
      <el-button @click="closePage"> 关闭 </el-button>
      <el-button @click="outLogIn"> 退出登录 </el-button>
    </div>
    <div class="upper">
      <!-- 头像 -->
      <img
        class="user-img"
        :src="userProperty.myProfile.avatarUrl"
        alt=""
        @click="toPage('home')"
      />
      <!-- 名称 信息 -->
      <div class="upper-property">
        <!-- 用户名称 -->
        <span class="user-name" @click="toPage('home')">{{
          userProperty.myProfile.nickname
        }}</span>
        <!-- 等级信息 -->
        <div class="user-level">
          <!-- 用户等级 -->
          <div class="level">
            <span
              class="level-a"
              v-if="userProperty.getUserLevelInformation.level"
              >Lv.{{ userProperty.getUserLevelInformation.level }}</span
            >
            <!-- 升级信息 -->
            <div
              class="div-icon"
              @mouseover="levelHint = true"
              @mouseleave="levelHint = false"
              v-if="userProperty.getUserLevelInformation.info"
            >
              <svg class="icon" aria-hidden="true" style="font-size: 20px">
                <use xlink:href="#icon-info"></use>
              </svg>
              <div class="hint" v-show="levelHint">
                <!-- 等级特权 -->
                <div class="djtq">
                  <span
                    v-for="(
                      item, index
                    ) in userProperty.getUserLevelInformation.info.split('$')"
                    :key="index"
                    >{{ item }}</span
                  >
                </div>
                <!-- 升级条件 -->
                <div class="sjtj">
                  <div class="sjtj-title">下一级条件:</div>
                  <div class="sjtj-rw">
                    <div
                      :class="{
                        'rw-ok':
                          userProperty.getUserLevelInformation.nowPlayCount ==
                          userProperty.getUserLevelInformation.nextPlayCount,
                      }"
                    >
                      听歌：<span
                        >{{
                          userProperty.getUserLevelInformation.nowPlayCount
                        }}/{{
                          userProperty.getUserLevelInformation.nextPlayCount
                        }}首</span
                      >
                    </div>
                    <div
                      :class="{
                        'rw-ok':
                          userProperty.getUserLevelInformation.nowLoginCount ==
                          userProperty.getUserLevelInformation.nextLoginCount,
                      }"
                    >
                      登录：<span
                        >{{
                          userProperty.getUserLevelInformation.nowLoginCount
                        }}/{{
                          userProperty.getUserLevelInformation.nextLoginCount
                        }}天</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 会员等级 -->
          <div class="vip-level" v-if="userProperty.userVip.associator">
            <img
              class="vip-level-vip"
              :src="userProperty.userVip.associator.dynamicIconUrl"
              alt=""
            />
          </div>
        </div>
        <!-- 签到 -->
        <div class="sign_in">
          <el-button
            @click="qiandao"
            :disabled="signInDetails.pdqiandao || signInDetails.pdNew"
          >
            {{
              signInDetails.pdqiandao || signInDetails.pdNew ? "已签到" : "签到"
            }}
          </el-button>
        </div>
        <!-- 用户信息 -->
        <div class="user-xx">
          <!-- 生日 -->
          <div class="user-xx-a">
            <span
              >生日：{{ changeTime(userProperty.myProfile.birthday, 0) }}</span
            >
          </div>
          <!-- 粉丝 关注 -->
          <div
            class="user-xx-a"
            v-if="
              userProperty.getUserFolloweds.followeds &&
              userProperty.getUserFollows.follow
            "
          >
            <span> {{ userProperty.getUserFollows.follow.length }} 关注</span>
            <span
              >{{ userProperty.getUserFolloweds.followeds.length }} 粉丝</span
            >
          </div>
          <!-- 歌单 收藏 -->
          <div class="user-xx-a">
            <span v-if="userProperty.getUserSubcount.createdPlaylistCount">
              {{ userProperty.getUserSubcount.createdPlaylistCount }} 歌单
            </span>
            <span v-if="userProperty.getUserSubcount.subPlaylistCount">
              {{ userProperty.getUserSubcount.subPlaylistCount }} 收藏</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 按钮 -->
      <div :class="item.cssYangshi" v-for="(item,index) in domYangShi" :key="index">
        <el-button v-for="(item2,index2) in item.name" :key="index2"  @click="toPage(`${item.toRouter[index2]}`)">
          <div>
            <svg class="icon" aria-hidden="true">
              <use  :xlink:href="`#${item.icon[index2]}`"></use>
            </svg>
            <span>{{item2}}</span>
          </div>
        </el-button>
      </div>
    </div>
    <span class="scdlsj"
      >上次登录时间： {{ changeTime(userProperty.myProfile.lastLoginTime, 2) }}
    </span>
  </div>
</template>
    
<script setup  >
import { useRouter } from "vue-router";
import {
  reqUserLogState,
  reqLogOut,
  reqNewLogState,
  reqAnonimous,
  reqUserSubcount,
  reqUserLevel,
  reqUserFollows,
  reqUserFolloweds,
  reqVipInfo,
  reqVipInfoV2,
} from "../../axios/user";
import {
  reqDailySignin,
  reqHappyInfo,
  reqYunbeiSignin,
  reqYunbeiInfo,
} from "../../axios/signIn";
import useUserStore from "../../pinia/user";
import baocunCookie from "../../plugins/ReserveCookie";
import { ref, onMounted, reactive } from "vue";
import changeTime from "../../plugins/Time";

// 路由
const router = useRouter();

// Pinia仓库
const userStore = useUserStore();

// dom属性
const domYangShi = reactive({
  // 个人中心
  grzx: {
    cssYangshi: "grzx",
    toRouter: ["home"],
    icon: ["icon-gerenzhongxin"],
    name:['个人中心']
  },
  // 歌单
  gd: {
    cssYangshi: "gd",
    toRouter: ["recently_played", "my_like", "my_songList"],
    icon: ["icon-zuijinliulan", "icon-xihuan", "icon-icon-gedan"],
    name:['最近播放-歌曲','我的喜欢','我的歌单']
  },
  // 云盘 已购歌单
  ypyggd: {
    cssYangshi: "ypyggd",
    toRouter: ["cloud_disk", "purchase_song"],
    icon: ["icon-a-yunpan1", "icon-goumai"],
    name:['云盘','已购单曲']
  },
  // 好友 动态
  hydt: {
    cssYangshi: "hydt",
    toRouter: ["my_good_friend", "moment"],
    icon: ["icon-haoyou", "icon-airudiantubiaohuizhi-zhuanqu_zixundongtai"],
    name:['我的好友','动态']

  },
});

const emit = defineEmits(["closePage"]);
// 关闭窗口状态
function closePage() {
  emit("closePage");
}
// 判断鼠标移入
let levelHint = ref(false);

// 签到信息
const signInDetails = reactive({
  // 云贝签到信息
  yunbei: {},
  // 判断是否已经签到
  pdqiandao: false,
  // 判断 立刻变
  pdNew: false,
});

// 签到
async function qiandao() {
  signInDetails.pdNew = true;
  // 签到
  await getDailySignin();
  // 云贝签到
  await getYunbeiSignin();
  // 云贝签到信息
  await getYunbeiInfo();
}

// 用户信息 属性 资料 和账号信息
let userProperty = reactive({
  myAccount: {},
  myProfile: {},
  // 获取用户等级信息
  getUserLevelInformation: {},
  // 获取用户信息 , 歌单，收藏，mv, dj 数量
  getUserSubcount: {},
  // 获取用户关注列表
  getUserFollows: {},
  // 获取用户粉丝列表
  getUserFolloweds: {},
  // 用户Vip信息
  userVip: {},
  // 用户Vip信息(app端)
  userVipPhone: {},
});

// 退出登录
async function outLogIn() {
  let isOut = confirm("确定退出当前账号吗?");
  if (isOut) {
    // 清除登录信息
    userStore.ClearLoginInformation();
    document.cookie = "";
    // 退出登录接口
    const { data: data } = await reqLogOut();
    console.log(data);
    // 跳转到登录界面
    let pd = confirm("是否跳转到登录界面?");
    // 关闭窗口
    closePage();
    // 判断是否跳转
    if (pd) {
      // 跳转登录
      router.push({
        path: "/log",
      });
    }
  }
}
// 去个人中心
function toPage(pageName) {
  router.push({
    path: `/personal_center/${pageName}`,
  });
  // 关闭窗口
  closePage();
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
async function getUserSubcount() {
  const { data: a } = await reqUserSubcount();
  userProperty.getUserSubcount = a;
  // console.log("获取用户信息 , 歌单，收藏，mv, dj 数量", a);
}
// 获取用户等级信息
async function getUserLevel() {
  const { data: a } = await reqUserLevel();
  userProperty.getUserLevelInformation = a.data;
  // console.log("获取用户等级信息", a);
}
// 获取用户关注列表
async function getUserFollows(uid) {
  const { data: a } = await reqUserFollows(uid);
  userProperty.getUserFollows = a;
  // console.log("获取用户关注列表", a);
}
// 获取用户粉丝列表
async function getUserFolloweds(uid) {
  const { data: a } = await reqUserFolloweds(uid);
  userProperty.getUserFolloweds = a;
  // console.log("获取用户粉丝列表", a);
}
// 获取 VIP 信息
async function getVipInfo(uid) {
  const { data: a } = await reqVipInfo(uid);
  userProperty.userVip = a.data;
  // console.log("获取 VIP 信息", a.data);
}
// 获取 VIP 信息(app端)
async function getVipInfoV2(uid) {
  const { data: a } = await reqVipInfoV2(uid);
  userProperty.userVipPhone = a.data;
  // console.log("获取 VIP 信息(app端)", a.data);
}

//签到
async function getDailySignin() {
  const { data: a } = await reqDailySignin();
  // console.log("签到", a);
}
//乐签信息
async function getHappyInfo() {
  const { data: a } = await reqHappyInfo();
  // console.log("乐签信息", a);
}
//云贝签到
async function getYunbeiSignin() {
  const { data: a } = await reqYunbeiSignin();
  // console.log("云贝签到", a);
}
//云贝签到信息
async function getYunbeiInfo() {
  const { data: a } = await reqYunbeiInfo();
  signInDetails.yunbei = a;
  if (signInDetails.yunbei.mobileSign && signInDetails.yunbei.pcSign) {
    signInDetails.pdqiandao = true;
  }
  // console.log("云贝签到信息", a);
}

onMounted(async () => {
  userProperty.myAccount = userStore.myAccount;
  userProperty.myProfile = userStore.myProfile;

  // 获取用户信息 , 歌单，收藏，mv, dj 数量
  await getUserSubcount();
  // 获取用户等级信息
  await getUserLevel();
  // 获取用户关注列表
  await getUserFollows(userStore.uid);
  // 获取用户粉丝列表
  await getUserFolloweds(userStore.uid);
  // 获取 VIP 信息
  await getVipInfo(userStore.uid);
  // 获取 VIP 信息(app端)
  await getVipInfoV2(userStore.uid);
  // 乐签信息
  await getHappyInfo();
  // 云贝签到信息
  await getYunbeiInfo();
});
</script>
    
<style lang="less" scoped>
.UserManagement {
  .UserManagement-end {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .upper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .user-img {
      width: 200px;
      border-radius: 50px;
      box-shadow: 3px 3px 9px black;
      margin: 20px 0px;
    }
    .upper-property {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .user-name {
        font-size: 25px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 5px;
      }
      .user-level {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        width: 100%;
        .level {
          display: flex;
          align-items: center;
          margin: 0 10px;
          .level-a {
            width: 64px;
            height: 20px;
            color: red;
            text-align: center;
            line-height: 20px;
            border: 1px solid red;
            border-radius: 12px;
            padding: 2px;
          }
          .div-icon {
            position: relative;
            height: 20px;
            top: 5px;
            .hint {
              position: absolute;
              width: 200px;
              background-color: rgb(255, 255, 255);
              left: -30px;
              display: flex;
              flex-direction: column;
              padding: 5px;
              border: 1px solid black;
              box-shadow: 2px 2px 3px black;
              border-radius: 10px;
              .djtq {
                font-size: 16px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                color: red;
                font-weight: 600;
              }
              .sjtj {
                .sjtj-title {
                  font-size: 12px;
                  color: #000000;
                  border-top: 1px solid black;
                  margin-top: 5px;
                }
                .sjtj-rw {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  font-size: 14px;
                  color: #999;
                  .rw-ok {
                    color: green;
                    font-weight: 600;
                  }
                }
              }
            }
          }
        }
        .vip-level {
          .vip-level-vip {
            width: 70px;
          }
        }
      }
      .sign_in {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
      .user-xx {
        width: 100%;
        margin-top: 10px;
        .user-xx-a {
          font-size: 15px;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          color: #555;
          span {
            border-bottom: 1px solid #999;
            padding-bottom: 2px;
            margin-bottom: 3px;
          }
        }
      }
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
    div {
      width: 100%;
      .el-button {
        width: 100px;
        height: 95px;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            font-size: 15px;
            font-weight: 600;
            margin-top: 5px;
          }
        }
      }
    }
    .grzx {
      display: flex;
      justify-content: space-between; /* 如果需要按钮之间有均匀的间距 */
      .el-button {
        flex: 1; /* 让按钮根据 flex 容器的子元素数量平均分配大小 */
        margin: 5px; /* 可根据需要调整按钮之间的间距 */
      }
    }
    .gd {
      display: flex;
      justify-content: space-between; /* 如果需要按钮之间有均匀的间距 */
      .el-button {
        flex: 3; /* 让按钮根据 flex 容器的子元素数量平均分配大小 */
        margin: 5px; /* 可根据需要调整按钮之间的间距 */
      }
    }
    .ypyggd {
      display: flex;
      justify-content: space-between; /* 如果需要按钮之间有均匀的间距 */
      .el-button {
        flex: 2; /* 让按钮根据 flex 容器的子元素数量平均分配大小 */
        margin: 5px; /* 可根据需要调整按钮之间的间距 */
      }
    }
    .hydt {
      display: flex;
      justify-content: space-between; /* 如果需要按钮之间有均匀的间距 */
      .el-button {
        flex: 2; /* 让按钮根据 flex 容器的子元素数量平均分配大小 */
        margin: 5px; /* 可根据需要调整按钮之间的间距 */
      }
    }
  }
  .scdlsj {
    font-size: 13px;
    color: #999;
  }
}
</style>