<template>
  <!-- 我是播放器 -->
  <div class="myBofnagqi" :class="shengjiang ? 'sheng' : 'jiang'">
    <!-- 隐藏和显示 -->
    <div class="show" @click="changeShengjiang"></div>

    <!-- 播放器 -->
    <audio controls :src="mp3" class="my-audio" style="display: none"></audio>

    <!-- 播放按钮 -->
    <div>
      <el-button type="primary" round @click="bofangSong">播放</el-button>
      <el-button type="primary" round @click="zantingSong">暂停</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import useCounterStore from "../pinia/counter";
import { reqSongUrl } from "../axios/songListOrSong";
// Pinia仓库
const counterStore = useCounterStore();

let musicPlayer = reactive({});

let mp3 = ref("");
let shengjiang = ref(true);

let myAudio = "";

function changeShengjiang() {
  shengjiang.value = !shengjiang.value;
}

// 切换音乐
async function changeSong() {
  // 播放器音乐id   本地拿播放器id
  let PlayerSongId = counterStore.lastPlayerSongId;
  const songUrl = await reqSongUrl(PlayerSongId);
  mp3.value = songUrl.data.data[0].url;
}

// 播放音乐
function bofangSong() {
  myAudio.play();
}

// 暂停音乐
function zantingSong(){
  myAudio.pause();

}

watch(
  () => counterStore.lastPlayerSongId,
  (newValue, oldValue) => {
    changeSong();
    bofangSong()
  }
);

onMounted(async () => {
  changeSong();
  myAudio = document.querySelector(".my-audio");
});
</script>

<style lang="less" scoped>
.sheng {
  position: fixed; /* 使用固定定位 */
  bottom: 0px; /* 显示时是0px 不显示时是-90px */
  left: 0; /* 固定位置距离屏幕左侧 0px */
}

.jiang {
  position: fixed; /* 使用固定定位 */
  bottom: -90px; /* 显示时是0px 不显示时是-90px */
  left: 0; /* 固定位置距离屏幕左侧 0px */
}

.myBofnagqi {
  width: 100%;
  height: 100px;
  background-color: rgba(51, 51, 51, 0.39);
  /* 其他样式 */
  .show {
    position: absolute;
    width: 40px;
    height: 30px;
    background-color: black;
    right: 0;
    top: -30px;
  }
}
</style>