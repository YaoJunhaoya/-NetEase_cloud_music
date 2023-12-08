<template>
  <!-- 导航条 -->

  <div class="nav">
    <!-- 图标 -->
    <div class="music-iocn" @click="toHome">
      <img src="https://img1.baidu.com/it/u=1003401282,2815738756&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
      <span>仿网易云音乐</span>
    </div>
    <!-- 栏目 -->
    <div class="lanmu">
      <div @click="toRankingList()" class="lanmu-title">音乐排行榜</div>
      <div>歌手馆</div>
      <div @click="toPersonalCenter()" class="lanmu-title">我的音乐</div>
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
    <div @click="userLog" v-if="!userStore.myCookie" class="noneLog" style="cursor: pointer">
      未登录
    </div>
    <!-- 我的 -->
    <div class="my" v-else style="cursor: pointer">
      <div @click="drawer = true">
        <img v-if="userStore.myProfile" :src="userStore.myProfile.avatarUrl" />
        <img v-else
          src="data:image/jpeg;base64,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"
          alt="">
      </div>

      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <UserManagement @closePage="drawerToFalse"></UserManagement>
      </el-drawer>
    </div>
  </div>
  <div class="xuni"></div>
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
emitter.on("beFoSearch", (e) => {
  toSearch(e);
  isSearchFocus.value = false;
});
// 失去焦点
function loseFocus() {
  isSearchFocus.value = false;
}
// 内容发生改变.
function searchOnchange(e) {
  clearTimeout(fangdou.time);
  fangdou.time = setTimeout(() => {
    searchValueTow.value = e.srcElement.value;
  }, 700);
}
// 路由跳转
function toHome() {
  router.push({
    path: "/home",
  });
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
  if (item != '') {
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
  } else {
    alert('不能为空')
  }

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
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;

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

    .lanmu-title {
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