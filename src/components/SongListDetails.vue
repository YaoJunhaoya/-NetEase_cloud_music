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
        <div class="title">我是标题</div>
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
      <div class="comment">
        <div
          class="comment-item"
          v-for="(item, i) in SongListDetails.SongListComments"
          :key="i"
        >
          <div class="comment-item-user">
            <!-- 评论的用户头像 -->
            <div class="comment-item-user-img">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <!-- 评论的用户名字 -->
            <div class="comment-item-user-name">{{ item.nickname }}</div>
          </div>
          <div class="comment-item-pinglun">
            <!-- 评论 -->
            <div class="comment-item-pinglun-text">
              <span>{{ item.content }}</span>
            </div>
            <!-- 评论信息 -->
            <div class="comment-item-pinglun-xx">
              <!-- 时间 -->
              <div>
                {{ getTime(item.time) }}
              </div>
              <!-- 地址 -->
              <div>IP:{{ item.ipLocation.location }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCounterStore from "../pinia/counter";
import {
  reqSongListDetail,
  reqSongDetail,
  reqSongListComment,
} from "../axios/songListOrSong";
import { reqUserDetails } from "../axios/user";

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

// 切换播放器音乐id
function playSong(id) {
  console.log("歌单详情歌曲id:", id);
  counterStore.PlayerSongIdToLocal(id);
}

// 歌单评论
async function SongListComment() {
  const songListId = SongListDetails.songlistId;
  // 可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
  let data = await reqSongListComment(songListId);
  SongListDetails.SongListComments = data.data.comments;

  SongListDetails.SongListComments.forEach(async (element) => {
    const axx = await reqUserDetails(element.ipLocation.userId);
    element.nickname = axx.data.profile.nickname;
    element.avatarUrl = axx.data.profile.avatarUrl;
  });

  // console.log(SongListDetails.SongListComments);
}

// 页码数增加
function addSongs(index) {
  gequliebiao.page += index;
  songs();
}

// 转化时间
function getTime(item) {
  const date = new Date(item);

  // 从 Date 对象中提取年、月、日、时、分、秒
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 注意：月份从0开始，所以要加1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return ` ${year}年  ${month}月   ${day}日   ${hours}: ${minutes}: ${seconds}`;
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

    .comment {
      border-top: 1px dashed #999;
      .comment-item {
        margin: 10px 50px;
        min-height: 60px;
        background-color: rgb(233, 235, 230);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 10px;
        .comment-item-user {
          margin: 10px 10px;
          width: 100px;
          .comment-item-user-img {
            width: 60px;
            height: 60px;
            img {
              width: 100%;
              border-radius: 30px;
            }
          }
          .comment-item-user-name {
            font-size: 10px;
          }
        }
        .comment-item-pinglun {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          min-height: 70px;
          width: 900px;
          margin: 0px 10px;
          .comment-item-pinglun-text {
            font-size: 20px;
            margin: 10px 10px;
            span {
              white-space: normal; /* 允许文字自动换行 */
              word-break: break-all; /* 在单词内换行 */
            }
          }
          .comment-item-pinglun-xx {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #999;
            width: 95%;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>