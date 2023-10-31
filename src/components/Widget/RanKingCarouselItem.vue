<template>
  <!-- 外围 -->
  <div class="waiwei">
    <!-- 图片名称 -->
    <div class="waiwei-ni" >
      <!-- 图片 -->
      <div class="waiwei-ni-img">
        <img :src="props.item.coverImgUrl" alt="" />
      </div>
      <!-- 名称 -->
      <div class="waiwei-ni-name">
        <span>{{ props.item.name }}</span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="waiwei-list">
      <div
        class="waiwei-list-each"
        v-for="(axx, index) in tenSongs.songDetails"
        :key="index"
        :class="`waiwei-list-each-${index + 1}`"
      >
        <!-- 排名 -->
        <div class="waiwei-list-each-index">
          {{ index + 1 }}
        </div>
        <!-- 名称 -->
        <div class="waiwei-list-each-name" ><span @click="goSongDetails(axx.id)" style="cursor: pointer">{{axx.name}}</span></div>
        <!-- 歌手 -->
        <div class="waiwei-list-each-songster">{{ singerName(axx.ar) }}</div>
      </div>
    </div>
    <!-- 前往查看更多 -->
    <div class="ckgd">
      <span>前往查看更多</span>
      <svg class="icon" aria-hidden="true" style="font-size: 18px">
        <use xlink:href="#icon-youyou-"></use>
      </svg>
    </div>
  </div>
</template>
    
<script setup  >
import { ref, reactive, defineProps, onMounted, watch, toRefs } from "vue";
import { reqSongListDetail, reqSongDetail } from "../../axios/songListOrSong";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();

const props = defineProps({
  item: {
    type: Object,
  },
});

const tenSongs = reactive({
  // 十首歌歌单
  songList: [],
  // 十首歌详情
  songDetails: [],
});
// 获取歌手名称 可能多个
function singerName(arr) {
  let singers = arr.map((e) => e.name).join("/");
  return singers;
}
// 修改歌单歌曲
async function changeSong() {
  // console.log("item", props.item);
  const { data: data } = await reqSongListDetail(props.item.id);
  tenSongs.songList = data.privileges.splice(0, 10);
  // console.log("tenSongs.songList", tenSongs.songList);

  let songIds = tenSongs.songList.map((e) => e.id).join(",");
  const { data: data2 } = await reqSongDetail(songIds);
  tenSongs.songDetails = data2.songs;
  // console.log("tenSongs.songDetails", tenSongs.songDetails);
}

// 跳转到歌曲详情页
function goSongDetails(songId){
  router.push({
    name:"SongDetails",
     params: {
      // 歌单id
      songId: songId,
    },
  })
}



watch(
  () => props.item,
  () => {
    console.log("item变了");
    changeSong();
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  changeSong();
});
</script>
    
<style lang="less" scoped>
.waiwei {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .waiwei-ni {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    border-bottom: 3px solid #b8b8b8;
    .waiwei-ni-img {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 3px 0;
      cursor: pointer;
      img {
        width: 70px;
        height: 70px;
        border-radius: 20px;
        box-shadow: 0 0 8px rgb(136, 136, 136);
      }
    }
    .waiwei-ni-name {
      font-size: 15px;
      font-weight: 600;
    }
  }
  .waiwei-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    .waiwei-list-each {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: calc(100% - 16px);
      height: 25px;
      margin: 4px 5px;
      padding: 0 3px;
      border-radius: 8px;
      box-shadow: 2px 2px 5px rgb(104, 104, 104);
      .waiwei-list-each-index {
        font-size: 15px;
        width: 10%;
      }
      .waiwei-list-each-name {
        font-size: 17px;
        font-weight: 600;
        width: 50%;
        padding: 0 3px;
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 如果文本超出，则显示省略号 */
        
      }
      .waiwei-list-each-songster {
        font-size: 13px;
        width: 40%;
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 如果文本超出，则显示省略号 */
      }
      //
    }
    .waiwei-list-each-1 {
      color: rgb(201, 13, 12);
      font-size: 18px;
    }
    .waiwei-list-each-2 {
      color: #c10d0c;
      font-size: 17px;
    }
    .waiwei-list-each-3 {
      color: rgb(204, 86, 12);
      font-size: 16px;
    }
  }
  .ckgd {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    color: red;
    font-size: 12px;
    cursor:pointer;
  }
}
</style>