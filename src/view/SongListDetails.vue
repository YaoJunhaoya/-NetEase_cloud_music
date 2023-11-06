<template>
  <div class="wai">
    <!-- 歌单详情 这里是一个歌单里的详情  -->
    <div class="mySongList">
      <!-- 歌单介绍 -->
      <div class="songListData">
        <!-- 图片 -->
        <div class="myImg">
          <img :src="SongListDetails.data.coverImgUrl" alt="" />
        </div>
        <!-- 信息 -->
        <div class="songListIntroduce">
          <!-- 歌单名称 -->
          <div>
            <div>
              歌单名称：<span>{{ SongListDetails.data.name }}</span>
            </div>
          </div>
          <!-- 作者信息 -->
          <div>
            <div>
              作者id：<span>{{ SongListDetails.data.userId }}</span>
            </div>
          </div>
          <!-- 各种按钮 -->
          <div>
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
          </div>
          <!-- 歌单详细信息 -->
          <div>
            <!-- 标签 -->
            <div>
              标签：<span
                class="biaoqian"
                v-for="(item, index) in SongListDetails.data.tags"
                :key="index"
                >{{ item }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 介绍 -->
      <div class="jieshao">
        <div class="jieshaodata">
          <span style="color: rgba(206, 31, 31, 0.76); font-weight: 600">
            介绍：</span
          >
          <span>{{ SongListDetails.data.description }}</span>
        </div>
      </div>
      <!-- 歌单中歌单列表 -->
      <div class="songListToSongData">
        <!-- 标题 -->
        <div class="title">歌曲列表</div>
        <!-- 我是一些歌曲 -->
        <div class="songListToSongData-song">
          <div
            v-for="(item, index) in SongListDetails.showDataSong"
            :key="index"
            class="songListToSongData-song-item"
            @click="toSongDetails(item)"
          >
            <div class="songListToSongData-song-item-1">{{ index + 1 }}</div>
            <div
              class="songListToSongData-song-item-2"
              @click.stop="playSong(item.id)"
            >
              <svg class="icon item-icon" aria-hidden="true">
                <use xlink:href="#icon-a-021_shipin"></use>
              </svg>
            </div>
            <div class="songListToSongData-song-item-3">
              <span> 歌曲：</span>{{ item.name }}
            </div>
            <div class="songListToSongData-song-item-4">
              <span>作者：</span>{{ item.ar[0].name }}
            </div>
            <div class="songListToSongData-song-item-5">
              <span>专辑：</span>{{ item.al.name }}
            </div>
          </div>
          <el-button
            class="songListToSongData-song-button"
            type="danger"
            @click="addSongs(1)"
            >加载更多</el-button
          >
        </div>
      </div>
      <!-- 评论 -->
      <Comment :comments="SongListDetails.SongListComments"></Comment>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCounterStore from "../pinia/counter";
import {
  reqSongListDetail,
  reqSongDetail,
  reqSongListComment,
} from "../axios/songListOrSong";
import { reqUserDetails } from "../axios/user";
import emitter from "../plugins/Bus" 
import Comment from "../components/Comment.vue";

const route = useRoute();
const router = useRouter();

// Pinia仓库
const counterStore = useCounterStore();

let SongListDetails = reactive({
  // 歌单的信息
  data: {},
  // 歌单里的歌曲们
  dataSong: [],
  // 限制歌曲个数，用来显示 用户看见的歌曲列表
  showDataSong: [],
  // 歌单评论信息
  SongListComments: [],
  // 歌单的id
  songlistId: "",
});

let gequliebiao = reactive({
  //当前页数
  page: 1,
  // 每页几个
  concat: 10,
  // 总数量
  allNumber: SongListDetails.dataSong.length,
});

// 获取歌单id，把歌单添加到播放器  （除非是同一个歌单不然都会更新）
function getSongList() {
  let arr = ref([]);

  // 判断 歌单id 与 本地的第一项 是否相同
  if (counterStore.playerSongList[0] != SongListDetails.data.id) {
    // 这是歌单id
    arr.value.push(SongListDetails.data.id);
    // 获取列表
    SongListDetails.dataSong.forEach((item, index) => {
      arr.value.push(SongListDetails.dataSong[index].id);
    });
    // 上传到本地
    counterStore.PlayerSongList(arr.value);
  } else {
    console.log("是同一首歌单");
  }
}

// 切换播放器音乐id
function playSong(id) {
  console.log("歌单详情歌曲id:", id);
  counterStore.PlayerSongIdToLocal(id);
  getSongList();
  emitter.emit("SongDetailsPlay")

}

// 歌单评论
async function SongListComment() {
  const songListId = SongListDetails.songlistId;
  // 可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
  let data = await reqSongListComment(songListId);
  SongListDetails.SongListComments = data.data.comments;

  SongListDetails.SongListComments.forEach(async (element) => {
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

  // console.log(SongListDetails.SongListComments);
}

// 页码数增加
function addSongs(index) {
  gequliebiao.page += index;
  songs();
}

// 用户看见的歌曲列表
async function songs() {
  let concat = gequliebiao.concat;
  let page = gequliebiao.page;

  //concat:每页几个 page：第几页
  let arr = SongListDetails.dataSong.slice(
    concat * (page - 1),
    concat * (page - 1) + concat
  );

  const ids = await Promise.all(
    arr.map(async (item, index) => {
      // console.log(item.id);
      return item.id;
    })
  );
  const combinedIds = [...ids].join(", ");
  // console.log(combinedIds);

  let xx = await reqSongDetail(combinedIds);
  // console.log(xx.data.songs);

  SongListDetails.showDataSong = [
    ...SongListDetails.showDataSong,
    ...xx.data.songs,
  ];
  // console.log(SongListDetails.showDataSong);
}

// 跳转到歌曲详情页面
function toSongDetails(item) {
  // console.log(item);
  router.push({
    name: "SongDetails",
    params: {
      songId: item.id,
    },
  });
}

onMounted(async () => {
  // 传入歌单id
  let songlistId = route.params.songListId || counterStore.songlistId;
  SongListDetails.songlistId = songlistId;
  // console.log(songlistId);

  // 仓库中 把歌单id存在本地
  counterStore.SongListIdToLocal(songlistId);

  // 通过传入的歌单id  在线获取歌单信息
  const xx = await reqSongListDetail(songlistId);
  // 赋值拿到歌单数据
  SongListDetails.data = xx.data.playlist;
  // console.log(SongListDetails.data);

  // 歌单里的歌曲们
  SongListDetails.dataSong = xx.data.playlist.trackIds;

  //设置给用户看见的歌曲列表
  songs();

  // 获取歌单评论
  SongListComment();
});
</script>

<style lang="less" scoped>
.wai {
  background-color: #e2e2e2d7;
  display: flex;
  flex-direction: column;
  align-items: center;
  .mySongList {
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffffd7;
    .songListData {
      width: 1200px;
      height: 400px;
      border-bottom: 1px dashed #aaa;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .myImg {
        width: 300px;
        height: 300px;
        margin: 0 50px;
        border: 2px solid rgb(187, 186, 178);
        box-shadow: 3px 3px 5px #999;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .songListIntroduce {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .biaoqian {
          margin: 0 10px;
        }
      }
    }
    .jieshao {
      width: 100%;
      min-height: 100px;
      border-bottom: 1px dashed #999;
      color: #222;
      .jieshaodata {
        margin: 10px 30px;
      }
    }
    .songListToSongData {
      width: 1200px;
      // height: 3000px;
      .title {
        margin: 10px 50px;
        font-size: 23px;
        padding-bottom: 10px;
        border-bottom: 3px solid rgb(214, 52, 52);
      }
      .songListToSongData-song {
        margin: 10px 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .songListToSongData-song-item {
          width: 100%;
          height: 50px;
          background-color: #dddddd;
          margin: 10px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-radius: 25px;
          box-shadow: 6px 3px 6px #999;
          div {
            margin: 0 20px;
            display: flex;
            span {
              color: rgba(206, 31, 31, 0.76);
              font-weight: 600;
            }
          }
          .songListToSongData-song-item-1 {
            width: 50px;
          }
          .songListToSongData-song-item-2 {
            width: 50px;
            .item-icon {
              font-size: 30px;
            }
          }
          .songListToSongData-song-item-3 {
            width: 300px;
          }
          .songListToSongData-song-item-4 {
            width: 300px;
          }
          .songListToSongData-song-item-5 {
            width: 300px;
          }
        }
        .songListToSongData-song-button {
          width: 200px;
          height: 40px;
        }
      }
    }
  }
}
</style>