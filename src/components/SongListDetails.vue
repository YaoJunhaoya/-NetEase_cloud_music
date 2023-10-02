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
          介绍：<span>{{ SongListDetails.data.description }}</span>
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
          >
            {{ index }}+{{ item.id }}+歌曲：{{item.name}}+作者：{{item.ar[0].name}}+专辑：{{item.al.name}}
          </div>
          <el-button type="danger" @click="addSongs(1)">加载更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import useCounterStore from "../pinia/counter";
import { reqSongListDetail, reqSongDetail } from "../axios/user";

const route = useRoute();

// Pinia仓库
const counterStore = useCounterStore();

let SongListDetails = reactive({
  // 歌单的信息
  data: {},
  // 歌单里的歌曲们
  dataSong: [],
  // 限制歌曲个数，用来显示 用户看见的歌曲列表
  showDataSong: [],
});

let gequliebiao = reactive({
  //当前页数
  page: 1,
  // 每页几个
  concat: 10,
  // 总数量
  allNumber: SongListDetails.dataSong.length,
});

// 歌曲详情
async function songData(id) {
  let data = await reqSongDetail(id);
  console.log(data);
  return "123";
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
  // // 把id转成歌曲详情
  // arr.forEach(async (item, index) => {
  //   let xx = await reqSongDetail(item.id);
  //   arr[index]=xx.data.songs[0]
  // });

  await Promise.all(arr.map(async (item, index) => {
  let xx = await reqSongDetail(item.id);
  arr[index] = xx.data.songs[0];
}));

  SongListDetails.showDataSong = [...SongListDetails.showDataSong, ...arr];
  console.log(SongListDetails.showDataSong);

}

onMounted(async () => {
  SongListDetails.data = route.params.SongListDetails
    ? JSON.parse(route.params.SongListDetails)
    : counterStore.lastSongList;

  // 仓库中 把歌单存在本地
  counterStore.SongListToLocal(SongListDetails.data);

  // console.log(SongListDetails.data);

  const xx = await reqSongListDetail(SongListDetails.data.id);
  SongListDetails.dataSong = xx.data.playlist.trackIds;
  // console.log(SongListDetails.dataSong);

  //设置给用户看见的歌曲列表
  songs();
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
      }
    }
    .jieshao {
      width: 100%;
      max-height: 100px;
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
      }
    }
  }
}
</style>