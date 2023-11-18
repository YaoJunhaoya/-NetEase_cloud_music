<template>
  <!-- 判断有没有传值，有传值先显示传值的id所对应的排行榜  没有传值就默认 -->
  <div class="main">
    <!-- 排行榜分类   根据浏览器窗口 设置成固定位置-->
    <div class="classification">
      <!-- 云音乐特色榜 -->
      <div class="rankingsTitle"><span>云音乐特色榜</span></div>
      <div
        v-for="(item, index) in rankings.cloudMusicRankings"
        :key="index"
        @click="refreshActivateRankingsIndex(item.id)"
        style="cursor: pointer"
      >
        <RankingsListItem
          :item="item"
          :activate="index == activateRankingsIndex"
        ></RankingsListItem>
      </div>
      <!-- 全球媒体榜 -->
      <div class="rankingsTitle"><span>全球媒体榜</span></div>
      <!-- index索引也是0开始 但是判断选中索引不是0开始 -->
      <div
        v-for="(item, index) in rankings.globalRankings"
        :key="index"
        @click="refreshActivateRankingsIndex(item.id)"
        style="cursor: pointer"
      >
        <RankingsListItem
          :item="item"
          :activate="index + 4 == activateRankingsIndex"
        ></RankingsListItem>
      </div>
    </div>
    <!-- 排行榜内容 -->
    <div class="content">
      <!-- 上部分 -->
      <div class="content-up">
        <!-- 图片 -->
        <div class="content-up-img">
          <img :src="activateRankingsData.playlist.coverImgUrl" />
        </div>
        <!-- 信息 -->
        <div class="content-up-information">
          <!-- 歌单名称 -->
          <div>
            <span>{{ activateRankingsData.playlist.name }}</span>
          </div>
          <!-- 歌单详情 -->
          <div>
            <span>{{ activateRankingsData.playlist.description }}</span>
          </div>
          <!-- 更新时间 -->
          <div>
            <span>{{ activateRankingsData.playlist.updateTime }}</span>
          </div>
          <!-- 操作按钮 -->
          <div>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div>
        </div>
      </div>
      <!-- 下部分 -->
      <div class="content-below">
        <RankingsContentList
          v-if="
            activateRankingsData.privileges && activateRankingsData.playlist.id
          "
          :songListId="activateRankingsData.playlist.id"
          :privileges="activateRankingsData.privileges"
        />
      </div>
    </div>
  </div>
</template>
    
<script setup  >
import { ref, reactive, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { reqToplist, reqSongListDetail } from "../axios/songListOrSong";
import RankingsContentList from "../components/Widget/RankingsContentList.vue";

import RankingsListItem from "../components/Widget/RankingsListItem.vue";

// 路由
const router = useRouter();
const route = useRoute();

// 选中榜单索引
let activateRankingsIndex = ref(0);
// 刷新选中榜单索引
async function refreshActivateRankingsIndex(id = 0) {
  rankings.allRankings.forEach((e, index) => {
    if (e.id == id) activateRankingsIndex.value = index;
  });
  // console.log(activateRankingsIndex.value);
  nextTick(() => {
    // 刷新选中的排行榜的信息
    refreshActivateRankingsData();
  });
}

// 所有排行榜信息
const rankings = reactive({
  // 全部排行榜
  allRankings: [],
  // 云音乐特色榜
  cloudMusicRankings: [],
  // 全球媒体榜
  globalRankings: [],
});
// 获取排行榜所有信息
async function getRankingsData() {
  const { data: data } = await reqToplist();
  rankings.allRankings = data.list;
  rankings.cloudMusicRankings = rankings.allRankings.slice(0, 4);
  rankings.globalRankings = rankings.allRankings.slice(4);
  // console.log(rankings.allRankings);
}

// 选中的排行榜的信息
let activateRankingsData = reactive({
  playlist: {},
  privileges: {},
});
// 刷新选中的排行榜的信息
async function refreshActivateRankingsData() {
  // 这里获取了一次详情 可以直接把数据给子组件，子组件就没必要在向后端请求一次
  const { data: data } = await reqSongListDetail(
    rankings.allRankings[activateRankingsIndex.value].id
  );
  activateRankingsData.playlist = data.playlist;
  activateRankingsData.privileges = data.privileges;
  // console.log(activateRankingsData);
}

onMounted(async () => {
  // 排行榜所有信息
  await getRankingsData();
  // 刷新选中榜单索引
  await refreshActivateRankingsIndex(route.query.id);
});
</script>
    
<style lang="less" scoped >
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .classification {
    width: 300px;
    height: calc(100vh - 250px);
    padding: 10px 5px;
    margin: 10px;
    box-shadow: 0 0 4px black;
    overflow: auto;
    position: fixed;
    top: 70px;
    left: 10px;
    /* 修改滚动条宽度 */
    &::-webkit-scrollbar {
      width: 8px;
    }

    /* 修改滚动条轨道样式 */
    &::-webkit-scrollbar-track {
      background: #dddddd;
    }

    /* 修改滚动滑块样式 */
    &::-webkit-scrollbar-thumb {
      background: #797878;
      border-radius: 5px;
    }

    /* 添加鼠标悬停时的滚动滑块样式 */
    &::-webkit-scrollbar-thumb:hover {
      background: #424141;
    }
    .rankingsTitle {
      font-size: 25px;
      font-weight: 600;
    }
  }
  .content {
    width: 1000px;
    padding: 10px 5px;
    margin: 10px;
    box-shadow: 0 0 4px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content-up {
      // 上半部分 分左边图片和右边详情
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid black;
      width: 100%;
      .content-up-img {
        width: 200px;
        margin-right: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-up-information {
        width: 500px;
      }
    }
    .content-below {
    }
  }
}
</style>