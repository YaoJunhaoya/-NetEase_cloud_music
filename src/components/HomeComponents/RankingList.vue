<template>
  <div class="rmgedanfeli">
    <!-- 标题 -->
    <ComponentsTitle>排行榜</ComponentsTitle>
    <!-- 排行榜  这是首页的排行榜-->
    <div class="rmgedanfeli-content">
      <!-- 前四名排行榜 -->
      <RanKingCarousel :firstFour="rankingListData.firstFour"></RanKingCarousel>
    </div>
  </div>
</template>
    
<script setup  >
import {
  reqToplist,
  reqSongListDetail,
  reqSongDetail,
} from "../../axios/songListOrSong";
import { ref, reactive, onMounted, computed } from "vue";
import useSongStore from "../../pinia/songStore";

import ComponentsTitle from "../ComponentsTitle.vue";
import RanKingCarousel from "../Widget/RanKingCarousel.vue";

// pinia仓库
const store = useSongStore();

// 排行榜页面数据
const rankingListData = reactive({
  // 所有的排行榜 可以把数据存储在本地
  allRankingList: [],
  // 首页的排行榜 只需要展示前四个
  firstFour: [],
});

onMounted(async () => {
  const { data: data } = await reqToplist();
  if (data.code == 200) {
    // 赋值所有排行榜
    rankingListData.allRankingList = data.list;
    // 把所有排行榜存入本地
    store.allRankingListToLocal(rankingListData.allRankingList);
    // 赋值前四名的排行榜
    rankingListData.firstFour = store.allRankingListFirstFour;
  }
  console.log("我是排行榜rankingListData", rankingListData);
});
</script>
    
<style lang="less" scoped>
.rmgedanfeli {
  .rmgedanfeli-content {
    width: 1100px;
    height: 500px;
    // background-color: rgb(210, 241, 231);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>