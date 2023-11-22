<template>
  <div class="rmgedanfeli">
    <div class="flei">
      <!-- 标题 -->
      <ComponentsTitle> 热门歌单分类</ComponentsTitle>
      <!-- 歌单切换按钮 -->
      <el-button
        class="fenglei"
        :class="{
          activeFenglei: songList.hotSongListType.name == item.name,
        }"
        round
        v-for="(item, index) in songList.hotSongList"
        :key="index"
        @click="changType(index)"
      >
        {{ item.name }}
      </el-button>
    </div>
    <!-- 歌单 -->
    <div class="allGedan">
      <div
        class="gedan"
        v-for="(item, index) in songList.CompetitiveSongList"
        :key="index"
        @click="toSongListDetails(item)"
      >
        <img :src="item.coverImgUrl" alt="" />
        <span>{{ item.name }}</span>
      </div>
      <div v-if="songList.CompetitiveSongList.length == 0" class="zanwuneirong">
        此分类暂无内容
      </div>
    </div>
  </div>
</template>
    
<script setup  >
import { ref, reactive, computed, onMounted } from "vue";
import {
  reqRemengGedan,
  reqCompetitiveGedan,
} from "../../axios/songListOrSong";
import { useRouter } from "vue-router";

import ComponentsTitle from "../ComponentsTitle.vue";

// 路由
const router = useRouter();

let songList = reactive({
  //分类列表
  hotSongList: [],
  // 当前选择的分类
  hotSongListType: {},
  // 当前类型的一些歌单
  CompetitiveSongList: [],
});

// 更改当前选择的分类
async function changType(index) {
  songList.hotSongListType = songList.hotSongList[index];
  // 更改当前类型的一些歌单
  const b = await reqCompetitiveGedan(10, songList.hotSongListType.name);
  songList.CompetitiveSongList = b.data.playlists;
}

// 跳转歌单详情页面 //传入歌单id
function toSongListDetails(item) {
  // console.log(item);
  router.push({
    name: "SongListDetails",
    params: {
      SongListDetails: JSON.stringify(item),
      // 歌单id
      songListId: item.id,
    },
  });
}

onMounted(async () => {
  // 获取分类列表
  const a = await reqRemengGedan();
  songList.hotSongList = a.data.tags;

  // 初始化当前选择的分类
  songList.hotSongListType = songList.hotSongList[0];

  // 初始化当前类型的一些歌单
  const b = await reqCompetitiveGedan(10, songList.hotSongListType.name);
  songList.CompetitiveSongList = b.data.playlists;
});
</script>
    
<style lang="less" scoped>
.rmgedanfeli {
  .flei {
    margin: 10px 0;
    .fenglei {
      margin: 0 10px;
      background-color: rgb(255, 255, 255);
    }
    .activeFenglei {
      color: rgb(255, 255, 255);
      background-color: rgb(255, 65, 32);
    }
  }

  .allGedan {
    display: flex;
    flex-wrap: wrap;
    width: 1100px;
    .gedan {
      width: 150px;
      height: 150px;
      margin: 0 30px 80px 30px;
      box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .zanwuneirong {
      width: 100%;
      height: 460px;
      text-align: center;
      line-height: 460px;
      font-size: 130px;
      font-weight: 600;
      background-color: #ffffff;
      border-radius: 30px;
    }
  }
}
</style>