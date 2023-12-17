<template>
  <div class="grzx-home">
    <!--上半部分 -->
    <div class="grzx-home-shang">
      <!-- 图片 -->
      <div class="grzx-home-img"  v-viewer>
        <img :src="user.myProfile.avatarUrl" alt="" />
      </div>
      <!--资料 -->
      <div class="grzx-home-data">
        <!-- 姓名 -->
        <div class="name">{{ user.myProfile.nickname }}</div>
        <!-- 等级 vip信息 -->
        <div class="level">
          <!-- 等级 -->
          <div class="level-a">Lv.{{ user.userLevel.level }}</div>
          <!-- vip信息 -->
          <div class="level-vip">
            <!-- 黑胶会员 -->
            <div>
              <img :src="user.userViLevel.associator?.dynamicIconUrl" alt="" />
            </div>
            <!-- SVIP -->
            <div>
              <img :src="user.userViLevel.redplus?.iconUrl" alt="" />
            </div>
          </div>
        </div>
        <!-- 粉丝 关注 -->
        <div class="relation">
          <!-- 关注 -->
          <div class="relation-box">
            <span class="relation-box-shuliang">{{
              user.UserFollows?.follow?.length
            }}</span>
            <span class="relation-box-name">关注</span>
          </div>
          <!-- 粉丝 -->
          <div class="relation-box">
            <span class="relation-box-shuliang">{{
              user.UserFolloweds?.followeds?.length
            }}</span>
            <span class="relation-box-name">粉丝</span>
          </div>
        </div>
        <!-- 所在地 年龄 -->
        <div class="suozaidi">
          <div class="suozaidi-box">
            <span>所在地: </span>
            <span>{{ "未知" }}</span>
          </div>
          <div class="suozaidi-box">
            <span>年龄: </span>
            <span>{{Time(user?.myProfile?.birthday).charAt(2)}}0后</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="grzx-home-xia">
      <!-- 自己的动态内容 -->
      <div class="grzx-home-xia-box">
        <div class="title">我的动态</div>
        <!-- 动态所有内容 -->
        <div class="xia-box-content" v-if="user.UserEvent?.events?.length > 0">
          <!-- 动态中的每一篇内容 -->
          <DynamicContent
            v-for="(item, index) in user.UserEvent?.events"
            :key="index"
            :data="item"
          ></DynamicContent>
        </div>
        <!-- 如果没有动态 -->
        <div v-else class="kong">暂时没有动态</div>
      </div>
    </div>
  </div>
</template>
    
<script setup  >
import { onMounted, reactive } from "vue";
import useUserStore from "../../pinia/user";
import {
  reqVipInfo,
  reqUserLevel,
  reqUserFollows,
  reqUserFolloweds,
  reqUserEvent,
} from "../../axios/user";
import DynamicContent from "./Components/DynamicContent.vue";
import Time from '../../plugins/Time'

// 仓库
const userStore = useUserStore();

const user = reactive({
  myAccount: {},
  myProfile: {},
  // vip信息
  userViLevel: {},
  // 用户等级信息
  userLevel: {},
  // 用户关注列表
  UserFollows: {},
  // 用户粉丝列表
  UserFolloweds: {},
  // 自己的动态内容
  UserEvent: {},
});

// 网络获取
// 获取vip信息
async function getVipInfo() {
  const { data: a } = await reqVipInfo(user.myProfile.userId);
  user.userViLevel = a.data;
  // console.log("获取vip信息", a.data);
}
// 获取用户等级信息
async function getUserLevel() {
  const { data: a } = await reqUserLevel();
  user.userLevel = a.data;
  // console.log("获取用户等级信息", a.data);
}
// 获取用户关注列表
async function getUserFollows() {
  const { data: a } = await reqUserFollows(user.myProfile.userId);
  user.UserFollows = a;
  // console.log("获取用户关注列表", a);
}
// 获取用户粉丝列表
async function getUserFolloweds() {
  const { data: a } = await reqUserFolloweds(user.myProfile.userId);
  user.UserFolloweds = a;
  // console.log("获取用户粉丝列表", a);
}

// 获取用户动态
async function getUserEvent() {
  const { data: a } = await reqUserEvent(user.myProfile.userId, 30, -1);
  user.UserEvent = a;
  // console.log("获取用户动态", a);
}

// 一开始就要获取到数据
async function startGetData() {
  await getVipInfo();
  await getUserLevel();
  await getUserFollows();
  await getUserFolloweds();
  await getUserEvent();
}
onMounted(async () => {
  user.myAccount = userStore.myAccount;
  user.myProfile = userStore.myProfile;
  console.log(user);
  // 一开始就要获取到数据
  await startGetData();
});
</script>
    
<style lang="less" scoped>
.grzx-home {
  margin: 10px 20px;
  width: calc(100vw - 240px);
  .grzx-home-shang {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .grzx-home-img {
      width: 300px;
      margin: 0 5px;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .grzx-home-data {
      display: flex;
      flex-direction: column;
      margin: 0 10px;
      .name {
        font-size: 50px;
        font-weight: 600;
        margin-top: 20px;
      }
      .level {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        height: 50px;
        margin-top: 10px;
        .level-a {
          width: 95px;
          height: 35px;
          color: red;
          border: 2px solid red;
          border-radius: 20px;
          text-align: center;
          line-height: 35px;
          font-size: 24px;
          margin-bottom: 5px;
          margin-right: 20px;
        }
        .level-vip {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          div {
            width: 100px;
            margin-right: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
      .relation {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .relation-box {
          width: 100px;
          border-right: 2px solid #aaa;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 10px 0;
          .relation-box-shuliang {
            font-size: 40px;
          }
          .relation-box-name {
            font-size: 15px;
          }
        }
      }
      .suozaidi {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .suozaidi-box {
          margin: 10px 20px;
          span:nth-child(1) {
            font-size: 20px;
          }
        }
      }
    }
  }
  .grzx-home-xia {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .grzx-home-xia-box {
      width: calc(100% - 20px);
      padding: 5px 10px;
      min-height: 100px;
      .title {
        font-size: 15px;
        color: #ff7272;
        width: 100%;
        border-bottom: 2px solid #ff7272;
        padding-bottom: 2px;
      }
      .xia-box-content {
        width: 100%;
        min-height: 100px;

      }
      .kong {
        width: 100%;
        min-height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
}
</style>