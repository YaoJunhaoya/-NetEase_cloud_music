<template>
  <div>
    <!-- 无搜索内容时展示 -->
    <div class="search-component" v-if="searchValue.searchValue == ''">
      <!-- 搜索历史 -->
      <div class="search-history">
        <div class="title">搜索历史:</div>
        <div class="content">
          <span
            v-for="(item, index) in SearchHistoryReverse"
            :key="index"
            @mousedown="toSearch(item)"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <!-- 热搜榜 -->
      <div class="search-hot">
        <div class="title">热搜榜：</div>
        <div class="search-hot-a">
          <div
            class="content"
            v-for="(item, index) in hotSearchData"
            :key="index"
            @mousedown="toSearch(item.searchWord)"
          >
            <div class="index">{{ index + 1 }}</div>
            <div class="name">{{ item.searchWord }}</div>
            <div v-if="item.iconUrl" class="img">
              <img :src="item.iconUrl" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--搜索到的内容 -->
    <div class="search-content" v-else>
      <!-- 歌曲 -->
      <div
        class="search-content-box"
        v-show="searchResult.singsFive.length > 0"
      >
        <div class="search-content-title">歌曲</div>
        <div
          class="box songList"
          v-for="(item, index) in searchResult.singsFive"
          :key="index"
        >
          <!-- 歌曲名称 -->
          <span class="name" @mousedown="toSong(item.id)">{{ item.name }}</span>
          <!-- 歌手名称 -->
          <div>
            <span
              class="songer"
              v-for="(item2, index) in item.artists"
              :key="index"
              @mousedown="toSinger(item2.id)"
              >{{ item2.name }}</span
            >
          </div>
        </div>
      </div>
      <!-- 歌单 -->
      <div
        class="search-content-box"
        v-show="searchResult.singListsFive.length > 0"
      >
        <div class="search-content-title">歌单</div>
        <div
          class="box songListList"
          v-for="(item, index) in searchResult.singListsFive"
          :key="index"
          @mousedown="toSongList(item)"
        >
          <!-- 歌单名称 -->
          <span class="name">{{ item.name }}</span>
          <!-- 歌曲数量 -->
          <span class="trackCount">{{ item.trackCount }}首</span>
          <!-- 播放次数 -->
          <span class="playCount"
            >播放{{ digitalConverter(item.playCount) }}次</span
          >
        </div>
      </div>
      <!-- 歌手 -->
      <div
        class="search-content-box"
        v-show="searchResult.singersFive.length > 0"
      >
        <div class="search-content-title">歌手</div>
        <div
          class="box songerList"
          v-for="(item, index) in searchResult.singersFive"
          :key="index"
          @mousedown="toSinger(item.id)"
        >
          <div class="img">
            <img :src="item.img1v1Url" alt="" />
          </div>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup >
import { ref, defineProps, onMounted, watch, reactive, computed } from "vue";
import { reqSearch, reqSearchHotDetail } from "../../axios/search";
import useCounterStore from "../../pinia/counter";
import { useRouter } from "vue-router";
import emitter from "../../plugins/Bus";

// 路由
const router = useRouter();

// Pinia仓库
const counterStore = useCounterStore();

let searchValue = defineProps({
  searchValue: {
    type: String,
  },
});

// 历史记录 翻转数组
const SearchHistoryReverse = computed(() => {
  const arrReverse = ref([]);
  // 从原数组的最后一个元素开始，将其添加到新数组中
  for (let i = counterStore.SearchHistory.length - 1; i >= 0; i--) {
    arrReverse.value.push(counterStore.SearchHistory[i]);
  }
  return arrReverse.value;
});

let hotSearchData = ref([]);
// 获取热搜榜
async function hotSearch() {
  const { data: data } = await reqSearchHotDetail();
  hotSearchData.value = data.data;
}

// 搜索到的内容
let searchResult = reactive({
  sings: [],
  singsFive: [],
  singLists: [],
  singListsFive: [],
  singers: [],
  singersFive: [],
});
// 获取搜索内容的信息
async function searchContent(i) {
  const { data: data } = await reqSearch(searchValue.searchValue, i, 5, 0);
  console.log(i, data.result);
  if (i == 1) {
    searchResult.sings = data.result.songs;
    searchResult.singsFive = searchResult.sings.slice(0, 5);
  }
  if (i == 100) {
    searchResult.singers = data.result.artists;
    searchResult.singersFive = searchResult.singers.slice(0, 3);
  }

  if (i == 1000) {
    searchResult.singLists = data.result.playlists;
    searchResult.singListsFive = searchResult.singLists.slice(0, 5);
  }
}

// 跳转到搜索
function toSearch(item) {
  emitter.emit("beFoSearch", item);
  //  把当前搜索的内容存在本地
  counterStore.SearchContent(item);
}
// 跳转歌曲
function toSong(songId) {
  router.push({
    name: "SongDetailsId",
    params: {
      songId: songId,
    },
  });
}
// 跳转歌单
function toSongList(item) {
  console.log(item);
  router.push({
    name: "SongListDetails",
    params: {
      SongListDetails: JSON.stringify(item),
      // 歌单id
      songListId: item.id,
    },
  });
}
// 跳转歌手
function toSinger(SingerId) {
  router.push({
    name: "Singer",
    params: {
      singerId: SingerId,
    },
  });
}
watch(
  () => searchValue.searchValue,
  () => {
    searchContent(1);
    searchContent(100);
    searchContent(1000);
  }
);
watch(
  () => counterStore.SearchHistory,
  () => {}
);
onMounted(() => {
  hotSearch();
});

// 数值转换 纯数字转换成万单位
function digitalConverter(value) {
  if (value >= 10000) {
    return Math.round(value / 10000) + "万";
  } else if (value >= 100000000) {
    return Math.round(value / 100000000) + "亿";
  } else {
    return value;
  }
}
</script>
    
<style lang="less" scoped>
.search-component {
  width: 400px;
  height: 500px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 5px;
  border: 1px solid black;
  box-shadow: 0px 0px 14px black;
  .search-history {
    min-height: 100px;
    .title {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 5px;
      border-bottom: 1px solid #999;
    }
    .content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      span {
        min-width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        margin: 3px 5px;
        padding: 0 5px;
        border: 1px solid #333;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          color: rgb(255, 255, 255);
          background-color: rgb(255, 74, 74);
          border: 1px solid #999;
        }
      }
    }
  }

  .search-hot {
    .title {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 5px;
      border-bottom: 1px solid #999;
    }
    .search-hot-a {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      .content {
        width: 40%;
        height: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        border-bottom: #d8d8d8 1px solid;
        cursor: pointer;

        .index {
          color: #999;
          font-size: 18px;
          margin-right: 5px;
          width: 25px;
        }
        .name {
          color: #333;
          font-weight: 600;
          max-width: 6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            color: red;
          }
        }
        .img {
          height: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.search-content {
  width: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 5px;
  border: 1px solid black;
  box-shadow: 0px 0px 14px black;
  .search-content-box {
    width: 400px;
    display: flex;
    flex-direction: column;
    margin: 15px 5px 0 5px;
    .search-content-title {
      font-size: 18px;
      border-bottom: 1px solid #999;
    }
    .box {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 2px 5px;
      .name {
        width: 250px;
        font-size: 18px;
        color: #333;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: rgb(255, 74, 74);
        }
      }
    }
    .songList {
      div {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .songer {
          font-size: 15px;
          color: #999;
          margin-left: 5px;
          cursor: pointer;
          &:hover {
            color: rgb(247, 113, 113);
          }
        }
      }
    }
    .songListList {
      .trackCount {
        font-size: 11px;
        width: 40px;
        color: #999;
      }
      .playCount {
        font-size: 11px;
        width: 70px;
        color: #999;
      }
    }
    .songerList {
      .img {
        width: 50px;
        height: 50px;
        cursor: pointer;
        margin: 3px 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 25px;
          box-shadow: 4px 6px 9px 1px black;
        }
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 20px;
      }
    }
  }
}
</style>