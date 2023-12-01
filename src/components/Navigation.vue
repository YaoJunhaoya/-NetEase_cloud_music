<template>
  <!-- 导航条 -->

  <div class="nav">
    <!-- 图标 -->
    <div class="music-iocn" @click="toHome">
      <img src="https://img1.baidu.com/it/u=1003401282,2815738756&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
      <span>仿网易云音乐2</span>
    </div>
    <!-- 栏目 -->
    <div class="lanmu">
      <div @click="toRankingList()" class="RankingList">音乐排行榜</div>
      <div>歌手馆</div>
      <div>我的音乐</div>
    </div>

    <!-- 手机的栏目 -->
    <div class="lanmu-phone">
      <svg class="icon lanmu-icon" aria-hidden="true">
        <use xlink:href="#icon-zhanshi"></use>
      </svg>
    </div>

    <!-- 搜索 -->
    <div class="sousuo">
      <!-- 搜索图标 -->
      <svg class="icon sousuo-icon" aria-hidden="true" style="cursor: pointer" @click="toSearch()">
        <use xlink:href="#icon-a-021_sousuo"></use>
      </svg>
      <!-- 搜索框 -->
      <input type="text" class="sousuo-input" style="cursor: text" v-model="searchValue" @keyup.enter="toSearch()"
        @focusin="gainFocus()" @blur="loseFocus()" @input="searchOnchange" placeholder="搜索： 歌曲 歌单 歌手 用户" />

      <SearchPopup class="search-popup" v-show="isSearchFocus" :searchValue="searchValueTow"></SearchPopup>
    </div>

    <!-- 未登录 -->
    <div @click="userLog" v-if="!userStore.token" class="noneLog" style="cursor: pointer">
      未登录
    </div>
    <!-- 我的 -->
    <div class="my" v-else style="cursor: pointer">
      <div @click="drawer = true">
        <img :src="userStore.myProfile.avatarUrl" />
      </div>

      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <UserManagement @closePage="drawerToFalse"></UserManagement>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reqUserLogState, reqUserLogOut, reqNewLogState } from "../axios/user";
import useUserStore from "../pinia/user";
import useCounterStore from "../pinia/counter";
import { ref, onMounted, reactive, nextTick } from "vue";

import UserManagement from "./HomeComponents/UserManagement.vue";
import SearchPopup from "./Search/SearchPopup.vue";
import emitter from "../plugins/Bus";

const router = useRouter();

// Pinia仓库
const userStore = useUserStore();
const counterStore = useCounterStore();

// 控制关闭el-drawer
let drawer = ref(false);
function drawerToFalse() {
  drawer.value = false;
}

// 防抖
let fangdou = reactive({
  time: null,
});

// 搜索内容
let searchValue = ref("");
// 搜索内容传给组件（不是搜索内容，搜索窗口展示）
let searchValueTow = ref("");

// 是否在搜索框焦点上
let isSearchFocus = ref(false);
// 获得焦点
function gainFocus() {
  isSearchFocus.value = true;
}
// 失去焦点
async function loseFocus() {
  let pd = false;
  // 接收参数
  emitter.on("beFoSearch", async (e) => {
    pd = true;
    await toSearch(e);
    isSearchFocus.value = false;
    await nextTick(() => {
      emitter.off("beFoSearch");
    });
  });

  if (!pd) {
    isSearchFocus.value = false;
  }
}

// 内容发生改变
function searchOnchange(e) {
  clearTimeout(fangdou.time);
  fangdou.time = setTimeout(() => {
    searchValueTow.value = e.srcElement.value;
  }, 700);
}

// 路由跳转
function toHome() {
  router.push("/home");
}
function userLog() {
  router.push("/log");
}
function toRankingList() {
  router.push("/rankinglist");
}

// 历史记录
let SearchHistory = reactive({
  data: ["z", "x"],
});
async function toSearch(item = searchValue.value) {
  console.log(item);
  router.push({
    path: "/search",
    query: {
      value: item,
    },
  });
  // 查找内容在数组中位置
  let a = SearchHistory.data.indexOf(item);
  //  把当前搜索的内容存在本地(单个)
  counterStore.SearchContent(item);
  // 先对比一下里面有没有相同的 有相同的先删除相同的 然后再添加当前这个
  //没有相同的
  if (a < 0) {
    // 添加当前搜索记录
    SearchHistory.data.push(item);
    // 如果数组大于10个 那么就删除第一个
    if (SearchHistory.data.length > 10) {
      SearchHistory.data.shift();
    }
    // 存储历史记录
    counterStore.StorageSearchHistory(SearchHistory.data);
  } else {
    SearchHistory.data.splice(a, 1); // 删除元素
    // 添加当前搜索记录
    SearchHistory.data.push(item);
    // 如果数组大于10个 那么就删除第一个
    if (SearchHistory.data.length > 10) {
      SearchHistory.data.shift();
    }
    // 存储历史记录
    counterStore.StorageSearchHistory(SearchHistory.data);
  }

  // 清除内容
  searchValue.value = "";
  searchValueTow.value = "";
}

onMounted(() => {
  SearchHistory.data = counterStore.SearchHistory;
});
</script>

<style lang="less" scoped>
@breakpoint-medium: 1200px; //网页样式会变了
@breakpoint-small: 900px; //手机大小

.nav {
  height: 70px;
  width: 100%;
  background-color: #333;
  display: flex;
  //   padding: 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(255, 68, 68);

  .music-iocn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: transparent;
    color: white;
    width: 150px;
    font-size: 20px;
    padding: 0 50px 0 50px;

    img {
      width: 30px;
      border-radius: 50%;
    }
  }

  .font-iocn {
    color: #cecece;
  }

  .lanmu {
    display: flex;
    height: 70px;
    font-size: 20px;
    color: white;

    div {
      //   margin: 0 20px;
      width: 100px;
      text-align: center;
      height: 70px;
      line-height: 70px;
    }

    .RankingList {
      cursor: pointer;

      &:hover {
        color: rgb(255, 100, 100);
      }
    }
  }

  .lanmu-phone {
    display: none;
  }

  .sousuo {
    width: 250px;
    background-color: rgb(228, 228, 228);
    height: 30px;
    border-radius: 10px;
    position: relative;
    z-index: 3;

    .sousuo-icon {
      font-size: 30px;
      position: absolute;
      top: 0;
      left: 0px;
    }

    .sousuo-input {
      position: absolute;
      top: 0;
      left: 40px;
      height: calc(30px - 2px);
      width: 250px;
      border: 1px solid rgb(228, 228, 228);
      background-color: rgb(228, 228, 228);
    }

    .search-popup {
      position: absolute;
      top: 40px;
      left: -50px;
    }
  }

  .noneLog {
    width: 50px;
    height: 50px;
    padding: 0 80px 0 0;
    text-align: center;
    line-height: 50px;
    color: white;
  }

  .my {
    width: 50px;
    height: 50px;
    padding: 0 80px 0 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 25px;
    }
  }
}
</style>





































































//sb姚君豪到此一游