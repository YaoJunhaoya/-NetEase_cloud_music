<template>
  <div class="myHome">
    <!-- 热门歌单分类 -->
    <div>
      <div>
        <span>热门歌单分类</span><br />
        <span
          class="fenglei"
          :class="{ activeFenglei: songList.hotSongListType.name == item.name }"
          v-for="(item, index) in songList.hotSongList"
          :key="index"
          @click="changType(index)"
          >{{ item.name }}</span
        >
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import useCounterStore from "../pinia/counter";
import useUserStore from "../pinia/user";
import { reqRemengGedan, reqCompetitiveGedan } from "../axios/user";
import { useRouter } from "vue-router";

// Pinia仓库
const counterStore = useCounterStore();
const userStore = useUserStore();
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

// 跳转歌单详情
function toSongListDetails(item) {
  // console.log(item);
  router.push({
    name: "SongListDetails",
    params: {
      SongListDetails: JSON.stringify(item),
    },
  });
  // console.log(item);
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
.myHome {
  display: flex;
  flex-direction: column;
  align-items: center;
  .allGedan {
    display: flex;
    flex-wrap: wrap;
    width: 1100px;
    .gedan {
      width: 150px;
      height: 150px;
      margin: 0 30px 80px 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .fenglei {
    margin: 0 10px;
  }
  .activeFenglei {
    color: red;
  }
}
</style>