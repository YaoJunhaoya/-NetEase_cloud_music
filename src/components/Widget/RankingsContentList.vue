<template>
  <div class="RankingsContentList">
    <div
      v-for="(item, index) in SongListDetails.SongSectionInformation"
      :key="index"
      class="RankingsContentList-item"
      @click="toSongdetails(item.id)"
    >
      <!-- 排名 -->
      <div
        class="RankingsContentList-item-index"
        :class="`RankingsContentList-item-${index + 1}`"
      >
        {{ index + 1 }}
      </div>
      <!-- 图片 -->
      <div class="RankingsContentList-item-divimg">
        <img v-lazy="item.al.picUrl" alt="" />
      </div>
      <!-- 歌曲名称 -->
      <div class="RankingsContentList-item-songName">{{ item.name }}</div>
      <!-- 歌手名称 -->
      <div class="RankingsContentList-item-singerName">
        {{ singerName(item.ar) }}
      </div>
      <!-- 播放按钮 -->
      <div @click.stop="playSong(item.id)" style="cursor: pointer">
        <svg class="icon item-icon" aria-hidden="true">
          <use xlink:href="#icon-a-021_shipin"></use>
        </svg>
      </div>
    </div>
    <div class="load-more">
      <button @click="addSong()">加载更多</button>
    </div>
  </div>
</template>
    
<script setup  >
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  defineProps,
  watch,
  nextTick,
} from "vue";
import { reqSongDetail } from "../../axios/songListOrSong";
import { useRouter } from "vue-router";
import emitter from "../../plugins/Bus";
import useCounterStore from "../../pinia/counter";

// 路由
const router = useRouter();
// 路由跳转
function toSongdetails(id) {
  router.push({ path: `/songdetails/${id}` });
}

// Pinia仓库
const counterStore = useCounterStore();

// 父组件传的参数
const props = defineProps({
  songListId: {
    type: Number,
    default: 0,
  },
  privileges: {
    type: Array,
  },
});

// 歌单详情
const SongListDetails = reactive({
  // 歌单信息
  privileges: [],
  // 歌曲全部信息
  songDetails: [],
  // 歌曲部分信息
  SongSectionInformation: [],
});
// 获取歌曲详情
async function getSongDetails() {
  // 把歌单id连接在一起
  let a = SongListDetails.privileges.map((e) => e.id);
  const { data: data } = await reqSongDetail(a);
  SongListDetails.songDetails = data.songs;
  SongListDetails.SongSectionInformation = SongListDetails.songDetails.slice(
    0,
    10
  );
}
// 歌曲的歌手名称
function singerName(ar = []) {
  return ar.map((e) => e.name).join(",");
}
// 添加更多
function addSong() {
  // 歌曲部分信息的个数
  let a = SongListDetails.SongSectionInformation.length;
  let b = SongListDetails.songDetails.length;
  let newArr=[]
  if (b - a < 10) {
     newArr = SongListDetails.songDetails.slice(a, b - a);
  } else {
     newArr = SongListDetails.songDetails.slice(a, a + 10);
  }
  SongListDetails.SongSectionInformation = [
    ...SongListDetails.SongSectionInformation,
    ...newArr,
  ];
}

// 获取歌单id，把歌单添加到播放器  （除非是同一个歌单不然都会更新）
function getSongList(songListId) {
  let arr = ref([]);
  // 判断 歌单id 与 本地的第一项 是否相同
  if (counterStore.playerSongList[0] != songListId) {
    // 这是歌单id
    arr.value.push(songListId);
    // 获取列表
    SongListDetails.songDetails.forEach((item, index) => {
      arr.value.push(SongListDetails.songDetails[index].id);
    });
    // 上传到本地
    counterStore.PlayerSongList(arr.value);
  } else {
    console.log("是同一首歌单");
  }
}
// 播放音乐
function playSong(songId) {
  // 歌单id     props.songListId
  // 歌曲id     songId
  counterStore.PlayerSongIdToLocal(songId);
  getSongList(props.songListId);
  emitter.emit("SongDetailsPlay");
}

// 监视和onMounted相同的方法
async function onMountedAndWatch() {
  SongListDetails.privileges = props.privileges;
  await getSongDetails();
  // console.log(SongListDetails);
}
watch(
  () => props.songListId,
  async () => {
    onMountedAndWatch();
  }
);
onMounted(async () => {
  await onMountedAndWatch();
});

onUnmounted(() => {});
</script>
    
<style lang="less" scoped>
.RankingsContentList {
  width: 1000px;
  .RankingsContentList-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 5px;
    border-radius: 10px;
    box-shadow: 4px 4px 15px #000000;
    .RankingsContentList-item-index {
      width: 50px;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
    }
    .RankingsContentList-item-1 {
      font-size: 24px;
      font-weight: 600;
      color: red;
    }
    .RankingsContentList-item-2 {
      font-size: 22px;
      font-weight: 600;
      color: orange;
    }
    .RankingsContentList-item-3 {
      font-size: 20px;
      font-weight: 600;
      color: yellowgreen;
    }
    .RankingsContentList-item-divimg {
      width: 70px;
      height: 70px;
      margin: 2px 40px 2px 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .RankingsContentList-item-songName {
      font-size: 20px;
      font-weight: 600;
      margin: 0 20px;
      width: 350px;
    }
    .RankingsContentList-item-singerName {
      font-size: 15px;
      color: #999;
      font-weight: 600;
      width: 350px;
    }
  }
  .load-more {
    width: 100%;
    text-align: center;
    button {
      cursor: pointer;
      background-color: rgb(228, 95, 95);
      color: rgb(255, 250, 220);
      width: 200px;
      height: 40px;
      border: 1px rgb(228, 213, 5) solid;
    }
  }
}
</style>