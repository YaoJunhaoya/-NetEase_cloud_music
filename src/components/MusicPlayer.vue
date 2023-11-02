<template>
  <!-- 我是播放器 -->
  <div class="myBofnagqi" :class="shengjiang ? 'sheng' : 'jiang'">
    <!-- 隐藏和显示 -->
    <div class="show" @click="changeShengjiang" style="cursor: pointer"></div>
    <!-- 播放器 -->
    <audio
      controls
      :src="mp3"
      class="my-audio"
      style="display: none"
      @ended="audioEnded()"
      @play="audioPlay()"
      @pause="audioPause()"
    ></audio>

    <!-- 播放器显示页面 -->
    <div class="myBofnagqi-bofangqianniu">
      <!-- 歌曲名称和图片 -->
      <div
        class="myBofnagqi-bofangqianniu-gequ"
        @click="toSongDetails"
        style="cursor: pointer"
      >
        <img :src="musicParticulars.songImg" />
        <div class="name-vip">
          <span class="vip">{{ isVip(musicParticulars.fee) }}</span>
          <span class="name">{{ musicParticulars.songName }}</span>
        </div>
      </div>
      <div class="myBofnagqi-bofangqianniu-you">
        <div class="aax">
          <!-- 播放按钮 -->
          <div class="myBofnagqi-bofangqianniu-wai">
            <div class="myBofnagqi-bofangqianniu-nei">
              <!-- 上一首 -->
              <div
                type="primary"
                plain
                @click="playerChangeSong(-1)"
                style="cursor: pointer"
              >
                <svg class="icon" aria-hidden="true" style="font-size: 30px">
                  <use xlink:href="#icon-ziyuanldpi"></use>
                </svg>
              </div>
              <!-- 播放或者暂停 -->
              <div @click="BofangOrZantingSong" style="cursor: pointer">
                <svg class="icon" aria-hidden="true" style="font-size: 35px">
                  <use
                    :xlink:href="pd ? '#icon-bofang1' : '#icon-zanting2'"
                  ></use>
                </svg>
              </div>
              <!-- 下一首 -->
              <div
                type="primary"
                plain
                @click="playerChangeSong(1)"
                style="cursor: pointer"
              >
                <svg class="icon" aria-hidden="true" style="font-size: 30px">
                  <use xlink:href="#icon-ziyuanldpi1"></use>
                </svg>
              </div>
            </div>
            <!-- 右边 -->
            <div class="myBofnagqi-bofangqianniu-nei-you">
              <!-- 是否添加到我喜欢 -->
              <el-button type="primary" circle>
                <svg class="icon" aria-hidden="true" style="font-size: 18px">
                  <use xlink:href="#icon-aixin"></use>
                </svg>
              </el-button>
              <!-- 循环，随机 -->
              <el-button
                type="primary"
                circle
                class="bofangType"
                @click="changePlayType()"
              >
                <svg class="icon bofangType-icon" aria-hidden="true">
                  <use :xlink:href="PlaybackMode.arr[PlaybackMode.index]"></use>
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

                <div class="tanchu" v-show="volumeShow">
                  <input
                    type="range"
                    min="0"
                    :max="100"
                    v-model="bofnagqiVolume.current"
                    @click="setVolume()"
                  />
                  <div>
                    <span>{{ bofnagqiVolume.current }}</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 显示歌词 -->
          <div class="myBofnagqi-bofangqianniu-geci">
            <span>{{ musicParticulars.lyric[dangqiangecudijihang] }}</span>
          </div>
          <!-- 查看播放列表 -->
          <div class="myBofnagqi-bofangqianniu-bflb" style="cursor: pointer">
            <svg
              class="icon"
              aria-hidden="true"
              style="font-size: 30px"
              @click="drawer = true"
            >
              <use xlink:href="#icon-jichu_gengduo"></use>
            </svg>

            <el-drawer
              v-model="drawer"
              title="I am the title"
              :with-header="false"
              append-to-body
            >
              <div>
                <div
                  v-for="(item, index) in playerSongList.list.slice(1)"
                  :key="index"
                >
                  <!-- <span>{{ item.name }}+{{ index }}</span> -->
                  <PlayerSongList
                    :playerSongList="item"
                    :ranking="index + 1"
                    :activate="playerSongList.i == index + 1"
                  ></PlayerSongList>
                </div>
              </div>
            </el-drawer>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="myBofnagqi-jdt">
          <input
            class="jdt"
            type="range"
            style="cursor: pointer"
            v-model="rangeValue.time"
            min="0"
            :max="rangeValue.maxValue"
            @click="setSongTime()"
            @mousedown="anxia()"
            @mouseup="setSongTime()"
          />
          <div class="myBofnagqi-jdt-data">
            <span>{{ formatSecondsToTime(rangeValue.time) }}</span>
            <span>{{ formatSecondsToTime(rangeValue.maxValue) }}</span>
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
import { useRouter } from "vue-router";
// import axios from "axios"

import PlayerSongList from "./PlayerSongList.vue";
import axioss from "axios";

// 路由
const router = useRouter();
// Pinia仓库
const counterStore = useCounterStore();

// 播放器升降
let shengjiang = ref(true);
// 取反升降 控制播放器升降
function changeShengjiang() {
  shengjiang.value = !shengjiang.value;
}

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
// 跳转到歌曲详情
function toSongDetails() {
  router.push({
    name: "SongDetailsId",
    params: {
      songId: musicParticulars.songId,
    },
  });
}

// 播放器
let myAudio = ref(null);
// 更新播放器歌词数据
async function updateSong() {
  const { data: data } = await reqSongDetail(musicParticulars.songId);
  // 歌曲图片
  musicParticulars.songImg = data.songs[0].al.picUrl;
  // 歌曲名称
  musicParticulars.songName = data.songs[0].name;
  // 是否vip
  musicParticulars.fee = data.songs[0].fee;

  const { data: data2 } = await reqLyric(musicParticulars.songId);

  const lyrics = data2.lrc.lyric;
  const regexFirst = /\[(.*?)\]/g;
  const regexSecond = /\](.*?)\n/g;

  const firstArray = [];
  const secondArray = [];

  let matchFirst;
  while ((matchFirst = regexFirst.exec(lyrics)) !== null) {
    firstArray.push(timeStringToSeconds(matchFirst[1]));
  }
  musicParticulars.lyricTime = firstArray;
  let matchSecond;
  while ((matchSecond = regexSecond.exec(lyrics)) !== null) {
    secondArray.push(matchSecond[1]);
  }
  musicParticulars.lyric = secondArray;
  dangqiangecudijihang.value = 0;
}

// 判断音乐暂停还是播放
let pd = ref(true);
// 播放或暂停音乐
function BofangOrZantingSong() {
  // 未播放：true
  if (myAudio.value.paused) {
    myAudio.value.play();
  } else {
    myAudio.value.pause();
  }
}
// 开始播放时间
function audioPlay() {
  // 添加时间更新的监听器
  myAudio.value.addEventListener("timeupdate", handleTimeUpdate);
  console.log("开始播放");
  pd.value = myAudio.value.paused;
}
// 暂停播放事件
function audioPause() {
  myAudio.value.removeEventListener("timeupdate", handleTimeUpdate);
  console.log("暂停播放");
  pd.value = myAudio.value.paused;
}

// 播放方式  顺序 循环 随机
let PlaybackMode = reactive({
  index: 0,
  // 顺序 循环 随机
  arr: ["#icon-xunhuan", "#icon-danquxunhuan", "#icon-suijibofang"],
});
// 改变播放类型
function changePlayType() {
  if (PlaybackMode.index >= 2) {
    PlaybackMode.index = 0;
  } else {
    PlaybackMode.index++;
  }
}
// 播放结束后
function audioEnded() {
  // 下一首歌id
  let gequ = ref("202369");
  // 判断下一首歌播放什么   更换counterStore.PlayerSongIdToLocal() 再播放changeSong()放音乐
  if (PlaybackMode.index == 0) {
    playerChangeSong(1);
    // console.log("顺序播放");
  } else if (PlaybackMode.index == 1) {
    playerChangeSong(0);
    // console.log("循环播放");
  } else if (PlaybackMode.index == 2) {
    let suiji = Math.floor(Math.random() * playerSongList.list.length - 1);
    playerChangeSong(suiji);
    // console.log("随机播放");
  }
  changeSong();
  // console.log("播放结束");
}

// 歌曲地址
let mp3 = ref("");
// 切换音乐
async function changeSong() {
  // 播放器音乐id   本地拿播放器id
  musicParticulars.songId = counterStore.lastPlayerSongId;
  const { data: data } = await reqSongUrl(musicParticulars.songId);
  if (data.code == -460) {
    mp3.value = "../../public/music/画.mp3";
    console.log("api的音乐url有问题，随便使用一首歌", data);
  } else {
    mp3.value = data.data[0].url;
    console.log("mp3.value", mp3.value);
  }
  myAudio.value.play();
}

// 歌词数组的索引
let dangqiangecudijihang = ref(0);
// 设置歌词的索引值
function showLyric() {
  // 播放器进度条当前值
  let currentTime = rangeValue.time;

  // 根据当前进度条的值 判断当前应该为什么歌词

  musicParticulars.lyricTime.forEach((e, index) => {
    if (
      currentTime > e &&
      currentTime < musicParticulars.lyricTime[index + 1]
    ) {
      dangqiangecudijihang.value = index;
    }
  });
}

//播放器进度条
const rangeValue = reactive({
  // 当前值
  time: 0,
  // 最大值
  maxValue: 100,
});
// 获取音乐时间
function getSongTime() {
  setTimeout(() => {
    if (myAudio.value.duration) {
      rangeValue.maxValue = myAudio.value.duration;
      return;
    }
  }, 500);
}
// 监视当前音乐的时间
function handleTimeUpdate() {
  showaaa();
  showLyric();
}
// 当前音乐的时间
function showaaa() {
  // 设置时间为播放器当前的时间
  rangeValue.time = myAudio.value.currentTime;
  // 如果当前时间为结束时间 暂停播放器
  if (rangeValue.time == rangeValue.maxValue) {
    myAudio.value.pause();
    pd.value = myAudio.value.paused;
  }
}
// 暂停进度条更新
function anxia() {
  // 添加时间更新的监听器
  myAudio.value.removeEventListener("timeupdate", handleTimeUpdate);
}
//修改播放进度
function setSongTime() {
  myAudio.value.currentTime = rangeValue.time;
  myAudio.value.addEventListener("timeupdate", handleTimeUpdate);
}

//是否显示控制音量大小
let volumeShow = ref(false);
// 播放器音量
const bofnagqiVolume = reactive({
  // 当前值
  current: 20,
});
// 设置播放器音量
function setVolume() {
  myAudio.value.volume = bofnagqiVolume.current / 100;
}

// 点击查看播放器播放列表
let drawer = ref(false);
// 播放器里的列表
let playerSongList = reactive({
  list: [],
  i: 1,
});
// 修改playerSongList.i的值
async function changPlayerSongListIndex() {
  console.log("changPlayerSongListIndex");
  playerSongList.list.forEach((item, index) => {
    // item 在  onMounted中是id，watch中是对象
    if (item == musicParticulars.songId || item.id == musicParticulars.songId) {
      playerSongList.i = index;
    }
  });
}
// 获取本地的播放器列表数据 发送请求 获取歌曲列表里的所有歌曲的详情
async function bian() {
  playerSongList.list = counterStore.playerSongList;

  // 除了第一个数据，其他全部获取到
  let arr = playerSongList.list.slice(1);
  // 逗号连接所有数据成为一个字符串
  let string = arr.join(",");
  // 发送请求获取歌曲数据
  const { data: data } = await reqSongDetail(string);
  // 将第一个数据添加回去
  playerSongList.list = playerSongList.list.slice(0, 1);
  // 将获取到的数据全部添加进去
  playerSongList.list.push(...data.songs);
  // console.log(playerSongList);
}
// 播放器切换上一首或下一首
function playerChangeSong(x) {
  let a = playerSongList.i + x;
  // console.log(a);
  if (a <= 0) {
    a = playerSongList.list.length - 1;
  } else if (a > playerSongList.list.length - 1) {
    a = 1;
  }

  counterStore.PlayerSongIdToLocal(playerSongList.list[a].id);
  playerSongList.i = a;
  // console.log(playerSongList.list[a]);
  // console.log(a);
  changeSong();
}

//
//
//
// 判断是否是vip
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
// 秒切换成分:秒:毫秒
function formatSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds) % 60;
  const milliseconds = Math.round((seconds % 1) * 1000);

  // 使用padStart()确保分钟、秒和毫秒都有正确的长度
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(remainingSeconds).padStart(2, "0");
  const millisecondsStr = String(milliseconds).padStart(3, "0");

  // return `${minutesStr}:${secondsStr}.${millisecondsStr}`;
  return `${minutesStr}:${secondsStr}`;
}
// 分秒变秒
function timeStringToSeconds(timeString) {
  const [minutesStr, secondsAndMillisecondsStr] = timeString.split(":");
  const [secondsStr, millisecondsStr] = secondsAndMillisecondsStr.split(".");

  const minutesInSeconds = parseInt(minutesStr, 10) * 60;
  const seconds = parseFloat(secondsStr);
  const millisecondsInSeconds = parseInt(millisecondsStr, 10) / 1000;

  return minutesInSeconds + seconds + millisecondsInSeconds;
}

//
//
//
//

// counterStore.lastPlayerSongId 必须是新值才能触发 （不能是同一首歌） 切换下一首歌 需要手动点击播放
watch(
  () => counterStore.lastPlayerSongId,
  (newValue, oldValue) => {
    console.log("播放器的音乐id变了");
    // 播放器暂停
    myAudio.value.pause();
    // 播放按钮改变
    pd.value = myAudio.value.paused;

    // 本地播放器id修改
    changeSong();
    // 更新播放器数据
    updateSong();
    // 获取音乐时间
    getSongTime();
    // 获取本地的数据加载到播放器里的歌曲列表   这里应该监视playerSongList.list[0]的值有没有改变 改变后再触发
    // 判断歌曲有没有在播放列表里，没有再使用bian()
    if ( !playerSongList.list.some( (item) => item.id == counterStore.lastPlayerSongId) ) {
      // 播放器中没有要播放的歌曲
      // console.log("播放器中没有要播放的歌曲");
      bian();
    } else {
      if (playerSongList.list[0] != counterStore.playerSongList[0]) {
        // 播放器中有要播放的歌曲，但是播放器列表类型不同
        // console.log("播放器中有要播放的歌曲，但是播放器列表类型不同");
        bian();
      }
    }

    // 修改playerSongList.i的值
    changPlayerSongListIndex();
    // 播放器播放 (不可用)
    // myAudio.value.play()
  }
);

onMounted(async () => {
  // 拿到播放器DOM
  myAudio.value = document.querySelector(".my-audio");
  // 设置播放器的音乐和音乐ID
  changeSong();
  // 更新播放器数据
  updateSong();
  // console.log(musicParticulars);
  // 获取音乐时间
  getSongTime();
  // console.log(rangeValue);

  // 获取播放器音乐
  // bofnagqiVolume.current = myAudio.value.volume * 100;
  myAudio.value.volume = bofnagqiVolume.current / 100;

  // 获取本地的数据加载到播放器里的歌曲列表
  bian();

  // 修改playerSongList.i的值
  changPlayerSongListIndex();
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
  width: calc(100% - 40px);
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
    margin-top: 5px;
    width: 100%;
    .myBofnagqi-bofangqianniu-gequ {
      width: 260px;
      margin: 0 0px 0 50px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
      }
      .name-vip {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-left: 10px;
        max-width: 160px;
        .vip {
          padding: 1px 3px;
          margin: 0 0 5px 0;
          font-size: 12px;
          color: red;
          border: 1px solid red;
          border-radius: 5px;
          background-color: #e2e0e0;
        }
        .name {
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
    .myBofnagqi-bofangqianniu-you {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      margin: 0 50px;
      width: calc(100% - 200px);
      height: 95px;
      .aax {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 3px;
        width: 100%;
        height: 45px;
        .myBofnagqi-bofangqianniu-wai {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 400px;
          min-width: 330px;
          margin: 0 20px;
          padding: 2px 10px;
          border-radius: 10px;
          box-shadow: 1px 1px 8px #585858;
          .myBofnagqi-bofangqianniu-nei {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            width: 150px;
            height: 45px;
          }
          .myBofnagqi-bofangqianniu-nei-you {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 150px;
            // 播放类型
            .bofangType {
              margin: 0 0;
              .bofangType-icon {
                font-size: 20px;
                color: rgb(0, 0, 0);
              }
            }
            // 音量
            .yingliang {
              position: relative;
              .tanchu {
                position: absolute;
                width: 110px;
                height: 40px;
                background-color: #ffffff;
                left: calc(-50px + 18px);
                bottom: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 5px;
                input {
                  width: 100px;
                }
                div {
                  width: 100px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                }
              }
            }
          }
        }
        .myBofnagqi-bofangqianniu-geci {
          margin: 0 20px;
          font-size: 15px;
        }
        .myBofnagqi-bofangqianniu-bflb {
          .icon {
          }
        }
      }

      .myBofnagqi-jdt {
        width: calc(100% - 150px);
        height: 30px;
        background-color: #ffffff;
        margin: 5px 20px;
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
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
}
</style>
