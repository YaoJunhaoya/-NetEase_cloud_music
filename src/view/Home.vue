<template>
  <!-- 背景 -->
  <div class="bj">
    <!-- 首页 -->
    <div class="myHome">
      <!-- 跑马灯 -->
      <div class="text-center">
        <el-carousel
          class="paomadeng"
          :interval="6000"
          type="card"
          height="300px"
        >
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
      <!-- 热门歌单分类 -->
      <div class="rmgedanfeli">
        <div class="flei">
          <span class="fleiTitle">热门歌单分类</span><br />
          <el-button
            class="fenglei"
            :class="{
              activeFenglei: songList.hotSongListType.name == item.name,
            }"
            round
            v-for="(item, index) in songList.hotSongList"
            :key="index"
            @click="changType(index)"
            >{{ item.name }}</el-button
          >
        </div>
        <!-- 歌单 -->
        <div class="allGedan">
          <div
            class="gedan"
            v-for="(item, index) in songList.CompetitiveSongList"
            :key="index"
            @click="toSongListDetails(item)"
          >
            <img :src="item.coverImgUrl" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import useCounterStore from "../pinia/counter";
import useUserStore from "../pinia/user";
import { reqUserPlayRecord } from "../axios/user";
import { reqRemengGedan, reqCompetitiveGedan } from "../axios/songListOrSong";
import { useRouter } from "vue-router";

// Pinia仓库
const counterStore = useCounterStore();
const userStore = useUserStore();
// 路由
const router = useRouter();

let songList = reactive({
  //分类列表
  hotSongList: [],
  // 当前选择的分类
  hotSongListType: {},
  // 当前类型的一些歌单
  CompetitiveSongList: [],
  // 用户听歌记录
  userSongRecord: [],
  // 跑马灯的歌曲
  marqueeSongList: [],
});

// 更改当前选择的分类
async function changType(index) {
  songList.hotSongListType = songList.hotSongList[index];
  // 更改当前类型的一些歌单
  const b = await reqCompetitiveGedan(10, songList.hotSongListType.name);
  songList.CompetitiveSongList = b.data.playlists;
}

// 跳转歌单详情页面 //传入歌单id
function toSongListDetails(item) {
  // console.log(item);
  router.push({
    name: "SongListDetails",
    params: {
      SongListDetails: JSON.stringify(item),
      // 歌单id
      songListId: item.id,
    },
  });
  // console.log(item);
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

onMounted(async () => {
  // 获取分类列表
  const a = await reqRemengGedan();
  songList.hotSongList = a.data.tags;

  // 初始化当前选择的分类
  songList.hotSongListType = songList.hotSongList[0];

  // 初始化当前类型的一些歌单
  const b = await reqCompetitiveGedan(10, songList.hotSongListType.name);
  songList.CompetitiveSongList = b.data.playlists;

  // 获取用户播放记录
  const c = await reqUserPlayRecord(userStore.uid, 1);
  songList.userSongRecord = c.data.weekData;
  // console.log(songList.userSongRecord);
  getMarqueeSongList();
  // console.log(songList.marqueeSongList);
});
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
    .rmgedanfeli {
      .flei {
        border-top: 5px solid rgba(209, 13, 13, 0.507);
        margin: 10px 0;
        .fleiTitle {
          font-size: 25px;
          font-weight: 600;
        }
        .fenglei {
          margin: 0 10px;
          background-color: rgb(255, 255, 255);
        }
        .activeFenglei {
          color: rgb(255, 255, 255);
          background-color: rgb(255, 65, 32);
        }
      }

      .allGedan {
        display: flex;
        flex-wrap: wrap;
        width: 1100px;
        .gedan {
          width: 150px;
          height: 150px;
          margin: 0 30px 80px 30px;
          box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
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