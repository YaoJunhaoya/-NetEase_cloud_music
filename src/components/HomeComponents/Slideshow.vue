<template>
  <div class="text-center">
  
    <!-- 内容 -->
    <el-carousel class="paomadeng" :interval="6000" type="card" height="300px">
      <el-carousel-item
        class="paomadeng-item"
        v-for="(item, index) in songList.marqueeSongList"
        :key="index"
      >
        <div @click="toSongDetails(item)">
          <img :src="item.song.al.picUrl" alt="" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
    
<script setup  >
import { ref, reactive, computed, onMounted } from "vue";
import useUserStore from "../../pinia/user";
import { reqUserPlayRecord } from "../../axios/user";
import { useRouter } from "vue-router";


// Pinia仓库
const userStore = useUserStore();
// 路由
const router = useRouter();

let songList = reactive({
  // 用户听歌记录
  userSongRecord: [],
  // 跑马灯的歌曲
  marqueeSongList: [],
});
// 在用户听歌记录中随机获取5首歌当作跑马灯
function getMarqueeSongList() {
  if (songList.userSongRecord.length > 5) {
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(
        Math.random() * songList.userSongRecord.length
      );
      songList.marqueeSongList[i] = songList.userSongRecord[randomNumber];
    }
  } else {
    songList.marqueeSongList = songList.userSongRecord;
  }
}
// 跳转到歌曲详情页面
function toSongDetails(item) {
  // console.log(item);
  router.push({
    name: "SongDetails",
    params: {
      songId: item.song.id,
    },
  });
}

onMounted(async () => {
  // 获取用户播放记录用来随机跑马灯
  const c = await reqUserPlayRecord(userStore.uid, 1);
  songList.userSongRecord = c.data.weekData;
  getMarqueeSongList();
});
</script>
    
<style lang="less" scoped>
.text-center {
  width: 1100px;
  margin-top: 10px;
  .paomadeng {
    .paomadeng-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      div {
        width: 300px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>