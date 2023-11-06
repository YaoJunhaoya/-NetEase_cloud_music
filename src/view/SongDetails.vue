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
          <div class="songContent-xx-a gequ">
            <div>歌名:{{ songParticulars.songMessage.name }}</div>
            <div>歌手:{{ songParticulars.ar.name }}</div>
            <div>专辑:{{ songParticulars.al.name }}</div>
          </div>
          <!-- 按钮 -->
          <div class="songContent-xx-a">
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
          <div class="songContent-xx-a geci">
            <div
              v-for="(item, index) in songParticulars.lyric"
              :key="index"
              class="geci-a"
              :class="{
                'lyric-activation': index == songParticulars.lyricIndex,
              }"
            >
              <div>{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 其他内容 -->
      <div class="qita">
        <Comment :comments="songParticulars.SongComments"></Comment>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {
  reqSongDetail,
  reqLyric,
  reqSongComment,
} from "../axios/songListOrSong";
import { reqUserDetails } from "../axios/user";
import useCounterStore from "../pinia/counter";
import Comment from "../components/Comment.vue";
import emitter from "../plugins/Bus";

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
  // 歌词时间
  lyricTime: [],
  // 歌词
  lyric: [],
  lyricIndex: null,
  SongComments: [],
});
// 切换播放器音乐id
function playSong() {
  // console.log(songParticulars.songId);
  counterStore.PlayerSongIdToLocal(songParticulars.songId);
  console.log("歌曲详情id:" + songParticulars.songId);
  getSongList(songParticulars.songId);
  emitter.emit("SongDetailsPlay")
}

// 歌词
async function updateSong() {
  const { data: data2 } = await reqLyric(songParticulars.songId);
  const lyrics = data2.lrc.lyric;
  const regexFirst = /\[(.*?)\]/g;
  const regexSecond = /\](.*?)\n/g;

  const firstArray = [];
  const secondArray = [];

  let matchFirst;
  while ((matchFirst = regexFirst.exec(lyrics)) !== null) {
    firstArray.push(matchFirst[1]);
  }
  songParticulars.lyricTime = firstArray;
  let matchSecond;
  while ((matchSecond = regexSecond.exec(lyrics)) !== null) {
    secondArray.push(matchSecond[1]);
  }
  songParticulars.lyric = secondArray;

  // console.log(songParticulars);
}

// 歌曲评论
async function SongListComment() {
  // 可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
  let data = await reqSongComment(songParticulars.songId);
  songParticulars.SongComments = data.data.comments;

  songParticulars.SongComments.forEach(async (element) => {
    if (element.ipLocation.userId) {
      const { data: axx } = await reqUserDetails(element.ipLocation.userId);
      element.nickname = axx.profile.nickname || "未知用户";
      element.avatarUrl =
        axx.profile.avatarUrl ||
        "http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg";
    } else {
      element.nickname = "未知用户";
      element.avatarUrl =
        "http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg";
    }
  });

  // console.log(songParticulars.SongComments);
}

// 获取歌单id，把歌单添加到播放器
function getSongList(id) {
  // 获取本地PlayerSongList的数据
  let arr = ref(counterStore.playerSongList);

  // 判断里面有没有这个歌曲id了
  if (!arr.value.includes(id)) {
    // 获取列表 第一项是歌曲就添加歌曲 不是歌曲就变成歌曲
    if (arr.value[0] != "歌曲") {
      arr.value = [];
      arr.value.push("歌曲");
      arr.value.push(id);
    } else {
      arr.value.push(id);
    }
  }

  // 上传到本地
  counterStore.PlayerSongList(arr.value);
}

// 设置歌词索引
function setLyricsIndex() {
  emitter.on("idAndLyricsIndex", (item) => {
    if (songParticulars.songId == item.id) {
      songParticulars.lyricIndex = item.index;
      // console.log(item.index);
    }
  });
}
// 监视歌词索引
watch(
  () => songParticulars.lyricIndex,
  (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    const Father = document.querySelector(".geci");
    const Son = document.querySelector(".lyric-activation"); //这个是上一个歌词  目前激活的歌词是这个歌词的下个
    // 获取 container 和 child 的位置信息
    if (Father && Son) {
      Father.scrollTop=Son.offsetTop-(21*20)
    }
  }
);

// 监视route.params.songId  在歌曲详情页面时，监视 route.params.songId 来改变页面
watch(
  () => route.params.songId,
  async () => {
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
    updateSong();
    SongListComment();
  }
);

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
  updateSong();
  SongListComment();
  setLyricsIndex();
});

onBeforeUnmount(() => {
  console.log("正在被销毁");
  emitter.off("idAndLyricsIndex");
});
</script>

<style lang="less" scoped>
.bg {
  width: 1900px;
  background-color: rgba(219, 219, 219, 0.425);
  display: flex;
  justify-content: center;
  margin: 0 auto;
  .xiangqing {
    width: 80%;
    min-height: 500px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        margin: 10px 10px;
        .gequ {
          div {
            margin: 10px 0;
          }
        }
        .geci {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 550px;
          overflow: auto;
          border-radius: 20px;
          box-shadow: 1px 1px 4px rgb(129, 129, 129);
          padding: 5px 0;
          width: 700px;
          &::-webkit-scrollbar {
            width: 0;
          }
          .geci-a {
            margin: 5px 10px;
          }
          .lyric-activation {
            color: red;
            font-weight: 600;
            font-size: 20px;
          }
        }
        .songContent-xx-a {
          margin: 10px 0;
        }
        .bofnag-icon {
          font-size: 35px;
        }
      }
    }
    .qita {
      width: 1100px;
    }
  }
}
</style>