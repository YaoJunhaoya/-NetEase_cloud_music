<template>
  <div class="wai">
    <!-- 歌单详情 这里是一个歌单里的详情  -->
    <div class="mySongList">
      <!-- 歌单介绍 -->
      <div class="songListData">
        <!-- 图片 -->
        <div class="myImg">
          <img :src="albumList.songs.blurPicUrl" alt="" />
        </div>
        <!-- 信息 -->
        <div class="songListIntroduce">
          <!-- 歌单名称 -->
          <div>
            <div>
              歌单名称：<span>{{ albumList.songs.name }}</span>
            </div>
          </div>
          <div>
            <div>
              发行公司：<span>{{ albumList.songs.company }}</span>
            </div>
          </div>
          <div>
            <div>
              发表日期：<span>{{ albumList.publishTim }}</span>
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
        </div>
      </div>
      <!-- 介绍 -->
      <div class="jieshao" :class="showFullDescription ? 'collapsed' : ''">
        <div class="jieshaodata">
          <span style="color: rgba(206, 31, 31, 0.76); font-weight: 600">介绍：</span>
          <div id="description" v-html="albumList.songs.description"></div>
          <button class="fold" @click="toggleDescription()">{{ !showFullDescription ? "展开" : "折叠" }}</button>
        </div>
      </div>
      <!-- 歌单中歌单列表 -->
      <div class="songListToSongData">
        <!-- 标题 -->
        <div class="title">歌曲列表</div>
        <!-- 我是一些歌曲 -->
        <div class="songListToSongData-song">
          <div v-for="(item, index) in albumList.dataSong" :key="index" class="songListToSongData-song-item"
            @click="toSongDetails(item)">
            <div class="songListToSongData-song-item-1">{{ index + 1 }}</div>
            <div class="songListToSongData-song-item-2" @click.stop="playSong(item.id)">
              <svg class="icon item-icon" aria-hidden="true">
                <use xlink:href="#icon-a-021_shipin"></use>
              </svg>
            </div>
            <div class="fnagzhiyichu songListToSongData-song-item-3">
              <span class="fnagzhiyichu-title"> 歌曲：</span>
              <span class="fnagzhiyichu-a">{{ item.name }}</span>
            </div>
            <div class="fnagzhiyichu songListToSongData-song-item-4">
              <span class="fnagzhiyichu-title">作者：</span>
              <span class="fnagzhiyichu-a">{{ item.ar[0].name }}</span>
            </div>
            <div class="fnagzhiyichu songListToSongData-song-item-5">
              <span class="fnagzhiyichu-title">专辑：</span>
              <span class="fnagzhiyichu-a">{{ item.al.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqAlbumList } from '../axios/album'
import useCounterStore from "../pinia/counter";
import emitter from "../plugins/Bus";
// Pinia仓库
const counterStore = useCounterStore();
const route = useRoute()
const router = useRouter()
let albumList = reactive({
  // 歌单信息
  songs: {},
  // 歌曲创建时间
  publishTim: '',
  // 歌单里的歌曲们
  dataSong: [],
  // 歌单评论信息
  SongListComments: [],
  // 歌单的id
  songlistId: "",
});
async function getCollectionList() {
  let id = route.params.id
  let { data } = await reqAlbumList(id)
  console.log("专辑", data);
  albumList.songlistId = id
  albumList.songs = data.album
  getPublishTime(data.album.publishTime)
  albumList.dataSong = data.songs;
  albumList.songs.description = albumList.songs.description.replace(/\n/g, '<br/>');
  console.log(albumList.songs);
}
// 处理创建时间
function getPublishTime(Time) {
  const timestamp = Time / 1000;
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedTime = `${year}-${month}-${day}`
  albumList.publishTim = formattedTime
}
// 跳转详细页
function toSongDetails(item) {
  router.push({
    name: "SongDetails",
    params: {
      songId: item.id,
    },
  });
}
// 播放按钮
function playSong(id) {
  counterStore.PlayerSongIdToLocal(id);
  getSongList(id);
  emitter.emit("SongDetailsPlay");
}
// 操作歌单
function getSongList(id) {
  let arr = ref([])
  // 最后一次播放id
  let lastId = counterStore.lastPlayerSongId
  // 当前歌单数据
  arr = counterStore.playerSongList
  if (arr.length == 0) {
    arr.push('歌曲')
  } else {
    if (arr.indexOf(lastId) != -1) {
      arr.splice(arr.indexOf(lastId) + 1, 0, id)
      counterStore.PlayerSongList(arr);
    } else {
      arr.push(id)
      counterStore.PlayerSongList(arr);
    }
  }
}
// 折叠
let showFullDescription = ref(false)
function toggleDescription() {
  // const jieshao = document.querySelector('.jieshao');
  // jieshao.classList.toggle('collapsed');
  showFullDescription.value = !showFullDescription.value
}
onMounted(() => {
  getCollectionList();
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
      height: 200px;
      overflow: hidden;
      border-bottom: 1px dashed #999;
      color: #222;
      position: relative;

      // transition: height 0.5s ease;
      .fold {
        position: absolute;
        bottom: 10px;
        right: 35px;
      }

      .jieshaodata {
        margin: 10px 30px;
      }
    }

    .collapsed {
      height: 100%;
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

          .fnagzhiyichu {
            .fnagzhiyichu-title {
              width: 50px;
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
            width: 250px;

            .fnagzhiyichu-a {
              width: 210px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #333;
            }
          }

          .songListToSongData-song-item-4 {
            width: 250px;

            .fnagzhiyichu-a {
              width: 210px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #333;
            }
          }

          .songListToSongData-song-item-5 {
            width: 250px;

            .fnagzhiyichu-a {
              width: 210px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #333;
            }
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