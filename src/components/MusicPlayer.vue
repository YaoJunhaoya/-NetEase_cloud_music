<template>
  <!-- 我是播放器 -->
  <div class="myBofnagqi" :class="shengjiang ? 'sheng' : 'jiang'">
    <!-- 隐藏和显示 -->
    <div class="show" @click="changeShengjiang"></div>
    <!-- 播放器 -->
    <audio controls :src="mp3" class="my-audio" style="display: none"></audio>

    <!-- 播放器显示页面 -->
    <div class="myBofnagqi-bofangqianniu">
      <!-- 歌曲名称和图片 -->
      <div class="myBofnagqi-bofangqianniu-gequ">
        <img :src="musicParticulars.songImg" />
        <span>{{ musicParticulars.songName }}</span>
      </div>
      <div class="myBofnagqi-bofangqianniu-you">
        <div class="aax">
          <!-- 播放按钮 -->
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
            <div class="yingliang" @mouseleave="volumeShow = false">
              <!-- 音量大小 -->
              <el-button
                type="primary"
                circle
                @mouseover.stop="volumeShow = true"
              >
                <svg class="icon" aria-hidden="true" style="font-size: 18px">
                  <use xlink:href="#icon-shengyin"></use>
                </svg>
              </el-button>

              <div class="tanchu" v-show="volumeShow"></div>
            </div>
          </div>
          <!-- 显示歌词 -->
          <div class="myBofnagqi-bofangqianniu-geci">
            <span>{{ musicParticulars.lyric[5] }}</span>
          </div>
          <!-- 查看播放列表 -->
          <div class="myBofnagqi-bofangqianniu-bflb">
            <svg class="icon" aria-hidden="true" style="font-size: 30px">
              <use xlink:href="#icon-jichu_gengduo"></use>
            </svg>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="myBofnagqi-jdt">
          <!-- <el-progress
            class="jdt"
            :text-inside="true"
            :stroke-width="15"
            :percentage="100"
          /> -->
          <input
            class="jdt"
            type="range"
            v-model="rangeValue.maxTime"
            min="0"
            :max="rangeValue.maxValue"
          />
          <div class="myBofnagqi-jdt-data">
            <span>{{ rangeValue.maxTime }}</span>
            <span>{{ rangeValue.maxValue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect } from "vue";
import useCounterStore from "../pinia/counter";
import { reqSongUrl, reqSongDetail, reqLyric } from "../axios/songListOrSong";
// Pinia仓库
const counterStore = useCounterStore();

let musicPlayer = reactive({});

const rangeValue = reactive({
  // 当前值
  maxTime: 0,
  // 最大值
  maxValue: 100,
});

// 歌曲地址
let mp3 = ref("");
// 音乐详情
let musicParticulars = reactive({
  // 歌曲id
  songId: "",
  // 歌曲图片
  songImg: "",
  // 歌曲名称
  songName: "",
  // 歌词时间
  lyricTime: [],
  // 歌词
  lyric: [],
  // 是否喜欢(未做)
  loveOrNo: false,
});
// 播放器升降
let shengjiang = ref(true);
//音量大小是否显示
let volumeShow = ref(false);
// 判断音乐暂停还是播放
let pd = ref(true);
// 播放器
let myAudio = ref(null);

// 取反升降 控制播放器升降
function changeShengjiang() {
  shengjiang.value = !shengjiang.value;
}

// 切换音乐
async function changeSong() {
  // 播放器音乐id   本地拿播放器id
  musicParticulars.songId = counterStore.lastPlayerSongId;
  const songUrl = await reqSongUrl(musicParticulars.songId);
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
    // 更新播放器数据
    updateSong();
  }
);

// 更新播放器数据
async function updateSong() {
  const { data: data } = await reqSongDetail(musicParticulars.songId);
  // 歌曲图片
  musicParticulars.songImg = data.songs[0].al.picUrl;
  // 歌曲名称
  musicParticulars.songName = data.songs[0].name;

  const { data: data2 } = await reqLyric(musicParticulars.songId);

  const lyrics = data2.lrc.lyric;
  const regexFirst = /\[(.*?)\]/g;
  const regexSecond = /\](.*?)\n/g;

  const firstArray = [];
  const secondArray = [];

  let matchFirst;
  while ((matchFirst = regexFirst.exec(lyrics)) !== null) {
    firstArray.push(matchFirst[1]);
  }
  musicParticulars.lyricTime = firstArray;
  let matchSecond;
  while ((matchSecond = regexSecond.exec(lyrics)) !== null) {
    secondArray.push(matchSecond[1]);
  }
  musicParticulars.lyric = secondArray;
}

onMounted(async () => {
  // 拿到播放器DOM
  myAudio.value = document.querySelector(".my-audio");
  // 设置播放器的音乐和音乐ID
  changeSong();
  // 更新播放器数据
  updateSong();
  console.log(musicParticulars);
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
    justify-content: flex-start;
    margin-top: 5px;
    .myBofnagqi-bofangqianniu-gequ {
      width: 200px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
      margin: 0 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
      }
      span {
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .myBofnagqi-bofangqianniu-you {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .aax {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
        width: 1300px;
        .myBofnagqi-bofangqianniu-wai {
          width: 500px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0 20px;
          .yingliang {
            position: relative;
            .tanchu {
              position: absolute;
              width: 50px;
              height: 100px;
              background-color: #f02e2e;
              bottom: 30px;
            }
          }
          .myBofnagqi-bofangqianniu-nei {
            display: flex;
          }
        }
        .myBofnagqi-bofangqianniu-geci {
          margin: 0 20px;
          font-size: 15px;
        }
        .myBofnagqi-bofangqianniu-bflb {
        }
      }

      .myBofnagqi-jdt {
        width: 1200px;
        height: 40px;
        background-color: #ffffff;
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        .jdt {
          width: 95%;
        }
        .myBofnagqi-jdt-data {
          width: 95%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>