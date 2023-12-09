<template>
  <div class="PersonalCenter">
    <!-- 左边目标栏 -->
    <div class="PersonalCenter-left">
      <div
        class="PersonalCenter-left-box"
        v-for="(item, index) in domYangShi"
        :key="index"
      >
        <div class="box-title">{{ item.title }}</div>
        <div
          class="left-div"
          :class="{
            checked: `/personal_center/${item.toRouter[index2]}` == sonRouter,
          }"
          v-for="(item2, index2) in item.name"
          :key="index2"
          @click="toPage(`${item.toRouter[index2]}`)"
        >
          <svg class="icon" aria-hidden="true" style="font-size: 25px">
            <use :xlink:href="`#${item.icon[index2]}`"></use>
          </svg>
          <span class="div-name">{{ item2 }}</span>
        </div>
      </div>
    </div>
    <div class="PersonalCenter-left2"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
    
<script setup  >
import { reactive, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// 路由
const router = useRouter();
const route = useRoute();

// dom样式
const domYangShi = reactive({
  // 个人中心
  grzx: {
    title: "个人中心",
    toRouter: ["home"],
    name: ["个人中心"],
    icon: ["icon-gerenzhongxin1"],
  },
  // 联系
  lx: {
    title: "联系",
    toRouter: ["my_good_friend", "moment"],
    name: ["我的好友", "动态"],
    icon: ["icon-yaoqinghaoyou", "icon-iconfontzhizuobiaozhunbduan36"],
  },
  // 我的音乐
  wdyy: {
    title: "我的音乐",
    toRouter: [
      "recently_played",
      "my_like",
      "my_songList",
      "cloud_disk",
      "purchase_song",
    ],
    name: ["最近播放", "我的喜欢", "我的歌单", "云盘", "已购单曲"],
    icon: [
      "icon-a-shijianzuijin",
      "icon-aixin",
      "icon-liebiao",
      "icon-yunpan",
      "icon-goumai1",
    ],
  },
});

function toPage(pageName) {
  router.push({
    path: `/personal_center/${pageName}`,
  });
}

// 当前选中的子路由
let sonRouter = ref("");
// 设置当前的子路由是哪个
function setSonRouter(path) {
  if (path == "/personal_center") {
    sonRouter.value = "/personal_center/home";
  } else {
    sonRouter.value = path;
  }
}

watch(
  () => route.path,
  (newValue, oldValue) => {
    setSonRouter(newValue);
  }
);

onMounted(() => {
  setSonRouter(route.path);
});
</script>
    
<style lang="less" scoped>
.PersonalCenter {
  display: flex;
  .PersonalCenter-left {
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    position: fixed;
    top: 72px;
    left: 0px;
    padding-top: 30px;
    .PersonalCenter-left-box {
      width: 100%;
      .box-title {
        font-size: 15px;
        color: #999;
        border-bottom: 3px solid #333;
        margin: 20px 10px;
      }
      .left-div {
        width: calc(100% - 20px);
        height: 50px;
        background-color: #ffffff;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        padding-left: 10px;
        margin: 10px 5px;
        &:hover {
          border-radius: 10px;
          background-color: #e2e2e2;
        }
        .div-name {
          margin-left: 20px;
        }
      }
      .checked {
        background-color: #e2e2e2;
        border-radius: 10px;
      }
    }
    .grzx-box {
      margin-top: 20px;
    }
  }
  .PersonalCenter-left2 {
    width: 200px;
  }
}
</style>