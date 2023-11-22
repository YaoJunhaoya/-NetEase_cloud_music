<template>
  <!-- 背景 -->
  <div class="bj">
    <!-- 首页 -->
    <div class="myHome">
      <!-- 跑马灯 -->
      <Slideshow></Slideshow>
      <!-- 热门歌单分类 -->
      <HitSongList></HitSongList>
      <!-- 排行榜 榜单 -->
      <RankingList></RankingList>
      <!--底部美观 -->
      <div class="dibumeiguan"></div>
    </div>
  </div>
</template>

<script setup>
import Slideshow from "../components/HomeComponents/Slideshow.vue";
import HitSongList from "../components/HomeComponents/HitSongList.vue";
import RankingList from "../components/HomeComponents/RankingList.vue";
</script>

<style lang="less" scoped>
.bj {
  display: flex;
  flex-direction: column;
  align-items: center;
  .myHome {
    margin-top: 20px;
    background-color: #dddada4d;
    width: 1600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    // box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.822);
    .dibumeiguan {
      height: 30px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 250px;
    margin: 0;
    text-align: center;
  }
}
</style>