<template>
  <!-- 我是播放器 -->
  <div class="myBofnagqi" :class="shengjiang ? 'sheng' : 'jiang'">
    <!-- 隐藏和显示 -->
    <div class="show" @click="changeShengjiang"></div>
    <!-- 播放器 -->
    <audio controls :src="mp3" class="my-audio" style="display: none"></audio>

    <!-- 播放按钮 -->
    <div class="myBofnagqi-bofangqianniu">
      <div class="myBofnagqi-bofangqianniu-wai">
        <!-- 循环，随机 -->
        <el-button type="primary" circle>
          <svg class="icon" aria-hidden="true" style="font-size: 18px">
            <use xlink:href="#icon-shunxubofang"></use>
          </svg>
        </el-button>
        <div class="myBofnagqi-bofangqianniu-nei">
          <!-- 上一首 -->
          <el-button type="primary" plain>
            <svg class="icon" aria-hidden="true" style="font-size: 18px">
              <use xlink:href="#icon-jichu_xiangzuo"></use>
            </svg>
          </el-button>
          <!-- 播放或者暂停 -->
          <el-button
            type="primary"
            round
            @click="BofangOrZantingSong"
            class="bofangorzanting"
          >
            {{ pd ? "播放" : "暂停" }}
            <svg class="icon" aria-hidden="true" style="font-size: 18px">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </el-button>
          <!-- 下一首 -->
          <el-button type="primary" plain>
            <svg class="icon" aria-hidden="true" style="font-size: 18px">
              <use xlink:href="#icon-jichu_xiangyou"></use>
            </svg>
          </el-button>
        </div>
        <!-- 是否添加到我喜欢 -->
        <el-button type="primary" circle>
          <svg class="icon" aria-hidden="true" style="font-size: 18px">
            <use xlink:href="#icon-aixin"></use>
          </svg>
        </el-button>
        <!-- 音量大小 -->
        <el-button type="primary" circle>
          <svg class="icon" aria-hidden="true" style="font-size: 18px">
            <use xlink:href="#icon-shengyin"></use>
          </svg>
        </el-button>
      </div>
      <!-- 查看播放列表 -->
      <div>
        <svg class="icon" aria-hidden="true" style="font-size: 30px">
          <use xlink:href="#icon-jichu_gengduo"></use>
        </svg>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="myBofnagqi-jdt">
      <el-progress class="jdt" :text-inside="true" :stroke-width="15"  :percentage="100" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect } from "vue";
import useCounterStore from "../pinia/counter";
import { reqSongUrl } from "../axios/songListOrSong";
// Pinia仓库
const counterStore = useCounterStore();

let musicPlayer = reactive({});

let mp3 = ref("");
let shengjiang = ref(true);
let pd = ref(true);

let myAudio = ref("");

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

// 播放或暂停音乐
function BofangOrZantingSong() {
  // 未播放：true
  if (myAudio.value.paused) {
    myAudio.value.play();
    pd.value = myAudio.value.paused;
  } else {
    myAudio.value.pause();
    pd.value = myAudio.value.paused;
  }
}

// counterStore.lastPlayerSongId 必须是新值才能触发 （不能是同一首歌） 切换下一首歌 需要手动点击播放
watch(
  () => counterStore.lastPlayerSongId,
  (newValue, oldValue) => {
    myAudio.value.pause();
    pd.value = myAudio.value.paused;

    // 本地播放器id修改
    changeSong();

  }
);

onMounted(async () => {
  changeSong();
  myAudio.value = document.querySelector(".my-audio");
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
  width: calc(100vw - 40px);
  left: 20px;
  height: 100px;
  background-color: rgb(214, 211, 211);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  box-shadow: 0px 0px 8px black;
  /* 其他样式 */
  .show {
    position: absolute;
    width: 40px;
    height: 30px;
    background-color: black;
    right: 20px;
    top: -30px;
  }
  .myBofnagqi-bofangqianniu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    width: 800px;
    margin-left: 400px;
    .myBofnagqi-bofangqianniu-wai {
      width: 500px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .myBofnagqi-bofangqianniu-nei {
        display: flex;
      }
    }
  }
  .myBofnagqi-jdt {
    width: 70%;
    height: 30px;
    background-color: #ffffff;
    margin-bottom: 10px;

    .jdt{
      margin: 0 10px;
    }
  }
}
</style>