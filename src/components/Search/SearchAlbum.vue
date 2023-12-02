<template>
  <div class="rmgedanfeli">
    <div class="title">歌曲列表</div>
    <!-- 歌单 -->
    <div class="allGedan">
      <div class="gedan" v-for="album in searchData.SongData.albums" :key="album.id">
        <img :src="album.picUrl" alt />
        <span>{{ album.name }}</span>
        <button class="play-button">播放</button>
      </div>
      <!-- <div v-if="songList.CompetitiveSongList.length == 0" class="zanwuneirong">
        此分类暂无内容
      </div>-->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  searchData: Object
});
</script>

<style lang="less" scoped>
.rmgedanfeli {
  width: 1200px;

  .title {
    margin: 10px 50px;
    font-size: 23px;
    padding-bottom: 10px;
    border-bottom: 3px solid #d63434;
  }

  .allGedan {
    display: flex;
    flex-wrap: wrap;
    width: 1190px;
    margin-top: 25px;
    margin-left: 20px;

    .gedan {
      position: relative;
      width: 165px;
      height: 165px;
      margin: 0px 30px 30px 30px;
      box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);

      img {
        width: 100%;
        height: 100%;
      }

      .play-button {
        display: none;
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }

    .gedan:hover {
      .play-button {
        display: block;
      }
    }

    .zanwuneirong {
      width: 100%;
      height: 460px;
      text-align: center;
      line-height: 460px;
      font-size: 130px;
      font-weight: 600;
      background-color: #ffffff;
      border-radius: 30px;
    }
  }
}
</style>