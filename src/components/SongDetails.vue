<template>
  <!-- 歌曲详情 里面是一首歌的详情 -->
  <div class="bg">
    <!--详情 -->
    <div class="xiangqing">
      <!-- 歌曲内容 -->
      <div class="songContent">
        <!-- 左图片 -->
        <div class="songContent-img">
          <img :src="songParticulars.img" />
        </div>
        <!-- 右歌曲 -->
        <div class="songContent-xx">
          <!-- 上歌曲信息 -->
          <div>
            <div>歌名:{{ songParticulars.songMessage.name }}</div>
            <div>歌手:{{ songParticulars.ar.name }}</div>
            <div>专辑:{{ songParticulars.al.name }}</div>
          </div>
          <!-- 按钮 -->
          <div>
            <el-button type="primary" round @click="playSong">
              <div>
                <svg class="icon bofnag-icon" aria-hidden="true">
                  <use xlink:href="#icon-a-021_shipin"></use>
                </svg>
              </div>
            </el-button>
            <el-button type="success" round>Success</el-button>
            <el-button type="info" round>Info</el-button>
            <el-button type="warning" round>Warning</el-button>
            <el-button type="danger" round>Danger</el-button>
          </div>
          <!-- 歌词 -->
          <div>歌词</div>
        </div>
      </div>
      <!-- 其他内容 -->
      <div class="qita">其他内容</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { reqSongDetail } from "../axios/songListOrSong";
import useCounterStore from "../pinia/counter";

//    路由
const route = useRoute();
// Pinia仓库
const counterStore = useCounterStore();

const songParticulars = reactive({
  // 歌曲id
  songId: "",
  // 歌曲详情
  songMessage: {},
  img: "",
  al: {},
  ar: {},
});

// 切换播放器音乐id
function playSong() {
  // console.log(songParticulars.songId);
  counterStore.PlayerSongIdToLocal(songParticulars.songId);
  console.log("歌曲详情id:"+songParticulars.songId);
}

onMounted(async () => {
  // 赋值歌曲id 没有传参来就去本地拿
  songParticulars.songId = route.params.songId || counterStore.lastSongId;
  // 调用仓库方法：存入歌曲id到本地
  counterStore.SongIdToLocal(songParticulars.songId);

  // 用歌曲id拿到歌曲信息
  const gequxiangqing = await reqSongDetail(songParticulars.songId);
  songParticulars.songMessage = gequxiangqing.data.songs[0];
  songParticulars.img = songParticulars.songMessage.al.picUrl;
  songParticulars.al = songParticulars.songMessage.al;
  songParticulars.ar = songParticulars.songMessage.ar[0];
  // console.log(songParticulars.songMessage);
});
</script>

<style lang="less" scoped>
.bg {
  width: 1900px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  .xiangqing {
    width: 80%;
    min-height: 500px;
    background-color: rgba(219, 219, 219, 0.425);
    display: flex;
    flex-direction: column;

    .songContent {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .songContent-img {
        width: 500px;
        height: 500px;
        margin: 10px 30px;
        img {
          width: 100%;
          border-radius: 250px;
        }
      }
      .songContent-xx {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        .bofnag-icon {
          font-size: 35px;
        }
      }
    }
    .qita {
      width: 100%;
      height: 200px;
      background-color: aquamarine;
    }
  }
}
</style>