<template>
  <div class="UserManagement">
    <div>
      <el-button @click="closePage"> 关闭 </el-button>
      <el-button @click="outLogIn"> 退出登录 </el-button>
      <el-button> 签到 </el-button>
      <el-button> 云贝签到 </el-button>
    </div>
    <div class="upper">
      <!-- 头像 -->
      <img class="user-img" :src="userProperty.myProfile.avatarUrl" alt="" />
      <!-- 名称 信息 -->
      <div class="upper-property">
        <!-- 用户名称 -->
        <span class="user-name">{{ userProperty.myProfile.nickname }}</span>
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
              <svg class="icon" aria-hidden="true" style="font-size: 25px">
                <use xlink:href="#icon-info"></use>
              </svg>
              <div class="hint" v-show="levelHint">
                <span
                  v-for="(
                    item, index
                  ) in userProperty.getUserLevelInformation.info.split('$')"
                  :key="index"
                  >{{ item }}</span
                >
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
        <!-- 用户信息 -->
        <div class="user-xx">
          <!-- 生日 -->
          <span >生日：{{ changeTime(userProperty.myProfile.birthday, 0) }}</span >
          <!-- 粉丝 关注 -->
          <div
            v-if="
              userProperty.getUserFolloweds.followeds &&
              userProperty.getUserFollows.follow " >
            <span>关注：{{ userProperty.getUserFollows.follow.length }}</span>
            <span >粉丝：{{ userProperty.getUserFolloweds.followeds.length }}</span >
          </div>
          <!-- 歌单 收藏 -->
          <div>
            <span v-if="userProperty.getUserSubcount.createdPlaylistCount">
              歌单：{{ userProperty.getUserSubcount.createdPlaylistCount }}
            </span>
            <span v-if="userProperty.getUserSubcount.subPlaylistCount">
              收藏：{{ userProperty.getUserSubcount.subPlaylistCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <el-button @click="toPersonalCenter"> 个人中心 </el-button>
      <el-button> 最近播放-歌曲 </el-button>
      <el-button> 我的喜欢 </el-button>
      <el-button> 我的歌单 </el-button>
      <el-button> 我的好友 </el-button>
      <el-button> 动态 </el-button>
      <el-button> 云盘 </el-button>
      <el-button> 已购单曲 </el-button>
    </div>
    <span
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
import useUserStore from "../../pinia/user";
import baocunCookie from "../../plugins/ReserveCookie";
import { ref, onMounted, reactive } from "vue";
import changeTime from "../../plugins/Time";

// 路由
const router = useRouter();

// Pinia仓库
const userStore = useUserStore();

const emit = defineEmits(["closePage"]);
// 关闭窗口状态
function closePage() {
  emit("closePage");
}
// 判断鼠标移入
let levelHint = ref(false);

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
// 去个人中心
function toPersonalCenter() {
  router.push({
    path: "/personal_center",
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
  console.log("获取 VIP 信息", a.data);
}
// 获取 VIP 信息(app端)
async function getVipInfoV2(uid) {
  const { data: a } = await reqVipInfoV2(uid);
  userProperty.userVipPhone = a.data;
  console.log("获取 VIP 信息(app端)", a.data);
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
});
</script>
    
<style lang="less" scoped>
.UserManagement {
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
      }
      .user-level {
        display: flex;
        .level {
          display: flex;
          align-items: center;
          margin: 0 10px;
          .level-a {
            width: 50px;
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
            .hint {
              position: absolute;
              width: 200px;
              height: 80px;
              background-color: rgb(255, 255, 255);
              left: -30px;
              display: flex;
              flex-direction: column;
              padding: 5px;
              border: 1px solid black;
              box-shadow: 2px 2px 3px black;
              border-radius: 10px;
            }
          }
        }
        .vip-level {
          .vip-level-vip {
            width: 70px;
          }
        }
      }
      .user-xx {
        width: 100%;
        margin: 10px 0;
      }
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    .el-button {
      margin: 0;
      width: 400px;
      margin: 10px 0;
    }
  }
}
</style>