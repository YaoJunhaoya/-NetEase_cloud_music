<template>
  <div class="playerSongList" @click="playSong(playerSongList.id)" style="cursor:pointer">
    <div class="playerSongList-ranking">{{ ranking }}</div>
    <div class="playerSongList-a" :class="{activate:activate}">
      <!-- 歌曲id -->
      <div class="playerSongList-a-id">{{ playerSongList.id }}</div>
      <!-- 歌曲名称 -->
      <div class="playerSongList-a-name">{{ playerSongList.name }}</div>
    </div>
    <div class="playerSongList-b">
      <!-- 是否vip  -->
      <div class="playerSongList-a-vip">{{ isVip(playerSongList.fee) }}</div>
      <!-- 是否原创    0: 未知  1: 原曲  2: 翻唱-->
      <div class="playerSongList-a-original">
        {{ isOriginal(playerSongList.originCoverType) }}
      </div>
    </div>
  </div>
</template>

<script setup  >
import { ref, defineProps } from "vue";
import useCounterStore from "../pinia/counter";
import emitter from "../plugins/Bus";

defineProps({
  playerSongList: {
    // type: Object,
    default: {},
  },
  ranking: {
    type: Number,
    default: 1,
  },
  activate:{
    type:Boolean,
    default:false
  }
});

// Pinia仓库
const counterStore = useCounterStore();

// 播放音乐
function playSong(id) {
  counterStore.PlayerSongIdToLocal(id);
  emitter.emit("bofang", "我是播放器列表切歌");//第二步
}

// 判断是否vip
function isVip(item) {
  let songTyoe = ref("");
  // 0: 免费或无版权     1: VIP 歌曲     4: 购买专辑     8: 非会员可免费播放低音质，会员可播放高音质及下载   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
  if (item == 0) {
    songTyoe.value = "免费或无版权";
  } else if (item == 1) {
    songTyoe.value = "VIP";
  } else if (item == 4) {
    songTyoe.value = "购买专辑";
  } else if (item == 8) {
    songTyoe.value = "免费低音质";
  }
  return songTyoe.value;
}
// 判断是否原创
function isOriginal(item) {
  let OriginalType = ref("");
  // 0: 未知  1: 原曲  2: 翻唱
  if (item == 0) {
    OriginalType.value = "未知";
  } else if (item == 1) {
    OriginalType.value = "原曲";
  } else if (item == 2) {
    OriginalType.value = "翻唱";
  }
  return OriginalType.value;
}
</script>


<style lang="less">
.playerSongList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  border-bottom: 1px solid #a3a3a3;
  border-radius: 8px;
  margin: 10px 0;
  padding: 5px 5px;
  box-shadow: 2px 2px 3px black;
  .playerSongList-ranking {
    font-size: 10px;
    height: 100%;
  }
  .playerSongList-a {
    border-left: #999 1px solid;
    width: 60%;
    margin: 0 5px;
    padding: 0 0 0 5px;
    .playerSongList-a-id {
      font-size: 10px;
      color: #999;
    }
    .playerSongList-a-name {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .activate{
    color: red;
  }
  .playerSongList-b {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 40%;
    font-size: 15px;
    margin: 0 5px;
    .playerSongList-a-vip {
      padding: 1px 3px;
      margin: 0 0 5px 0;
      font-size: 12px;
      color: red;
      border: 1px solid red;
      border-radius: 5px;
      background-color: #ffffff;
    }
    .playerSongList-a-original {
    }
  }
}
</style>