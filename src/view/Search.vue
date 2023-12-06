<template>
  <div class="bj">
    <div class="myBack">
      <!-- 搜索数据 -->
      <div class="Search-Introduction">
        搜索"{{ searchContent }}"共找到
        <span style="color:brown;">
          {{ pagination.total }}
        </span>条数据
      </div>
      <!-- 顶部 -->
      <ul class="tab-nav">
        <li :class="{ active: searchData.current == index }" v-for="(type, index) in searchData.types" :key="index"
          @click="data(index)">
          <a data-id="0">{{ type }}</a>
        </li>
      </ul>
      <!-- 单曲样式 -->
      <SearchSingle :searchData="searchData" :pagination="pagination" v-if="searchData.current == 0"
        @paginationChange="paginationChange" />
      <!-- 专辑 歌单 样式 -->
      <SearchAlbum :searchData="searchData" :pagination="pagination"
        v-if="searchData.current == 1 || searchData.current == 3" @paginationChange="paginationChange" />
      <div class="dibumeiguan"></div>
    </div>
  </div>
</template>
    
<script setup>
import SearchSingle from "../components/Search/SearchSingle.vue";
import SearchAlbum from "../components/Search/SearchAlbum.vue";
import { ref, onMounted, watch, reactive } from "vue";
import useCounterStore from "../pinia/counter";
import { reqSearchlist, reqSearch } from "../axios/search";
import { useRouter } from "vue-router";
// Pinia仓库
const counterStore = useCounterStore();
// 路由
const router = useRouter();
let pagination = reactive({
  currentPage: 1, //当前页
  total: 1, //总条数
  pageSize: 30 //当前页容量
});
let searchData = reactive({
  // 歌曲数据
  SongData: [],
  types: ["单曲", "专辑", "歌手", "歌单", "用户", "视频"],
  // 分类索引
  current: 0
});
function paginationChange(val) {
  // pagination.currentPage = val
  data(searchData.current, val - 1);
}
let searchContent = ref("");
// 监视和onMounted共同的方法
function watchAndOnMounted() {
  searchContent.value = counterStore.lastSearchContent;
  data();
}
async function data(current = 0, offset = 0, limit = 30) {
  // 分类索引
  let type;
  searchData.current = current;
  if (current == 0) {
    type = 1;
  } else if (current == 1) {
    type = 10;
  } else if (current == 2) {
    type = 100;
  } else if (current == 3) {
    type = 1000;
  } else if (current == 4) {
    type = 1002;
  } else if (current == 5) {
    type = 1004;
  }
  let result = await reqSearchlist(
    counterStore.lastSearchContent,
    type,
    limit,
    offset
  );
  if ((result.data.code = 200)) {
    searchData.SongData = result.data.result
    pagination.total = searchData.SongData.songCount || searchData.SongData.albumCount || searchData.SongData.playlistCount
    if ((limit * (offset + 1) > pagination.total) && pagination.total != 1) {
      let slicing = limit - (limit * (offset + 1) - pagination.total)
      // 因limit修改请求数量不变，只能切割数组保证数据
      if (searchData.SongData.songs) searchData.SongData.songs = searchData.SongData.songs.splice(0, slicing)
      if (searchData.SongData.albums) searchData.SongData.songs = searchData.SongData.albums.splice(0, slicing)
      if (searchData.SongData.playlists) searchData.SongData.songs = searchData.SongData.playlists.splice(0, slicing)
    }
    console.log(result.data.result);
  }
}
watch(
  () => [counterStore.lastSearchContent],
  () => {
    watchAndOnMounted();
  }
);
onMounted(async () => {
  watchAndOnMounted();
});
</script>
    
<style lang="less" scoped>
.bj {
  display: flex;
  flex-direction: column;
  align-items: center;

  .myBack {
    margin-top: 20px;
    background-color: #dddada4d;
    width: 1300px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    align-items: center;

    .Search-Introduction {
      margin: 28px 0 17px;
    }

    .dibumeiguan {
      height: 30px;
    }

    .tab-nav {
      width: 100%;
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: center;
      align-items: flex-start;

      .active {
        background: linear-gradient(to bottom, #d3d3d3, white);
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-top: 2px solid red;
        border-bottom: 0;
      }

      li {
        width: 156px;
        text-align: center;
        border-top: 1px solid black;
        border-bottom: 1px solid black;

        a {
          color: inherit;
          text-decoration: none;
        }
      }

      li:first-child {
        border-left: 1px solid black;
      }

      li:last-child {
        border-right: 1px solid black;
      }
    }

    .songListToSongData {
      width: 1200px;

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