<template>
  <div class="songListToSongData">
    <!-- 标题 -->
    <div class="title">歌曲列表</div>
    <!-- 我是一些歌曲 -->
    <div class="songListToSongData-song">
      <div v-for="(item, index) in searchData.SongData.songs" :key="index" class="songListToSongData-song-item"
        @click="toSongDetails(item)">
        <div class="songListToSongData-song-item-1">{{ index + 1 + (30 * (currentPage - 1)) }}</div>
        <div class="songListToSongData-song-item-2">
          <svg class="icon item-icon" aria-hidden="true" @click.stop="playSong(item.id)">
            <use xlink:href="#icon-a-021_shipin"></use>
          </svg>
        </div>
        <div class="fnagzhiyichu songListToSongData-song-item-3">
          <span class="fnagzhiyichu-title"> 歌曲：</span>
          <span class="fnagzhiyichu-a">{{ item.name }}</span>
        </div>
        <div class="fnagzhiyichu songListToSongData-song-item-4">
          <span class="fnagzhiyichu-title">作者：</span>
          <span class="fnagzhiyichu-a">{{ item.artists[0].name }}</span>
        </div>
        <div class="fnagzhiyichu songListToSongData-song-item-5">
          <span class="fnagzhiyichu-title">专辑：</span>
          <span class="fnagzhiyichu-a">{{ item.album.name }}</span>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize"
        :total="parseInt(pagination.total)" :current-page="currentPage" @current-change="paginationChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import useCounterStore from "../../pinia/counter";
import emitter from "../../plugins/Bus";
// Pinia仓库
const counterStore = useCounterStore();
const router = useRouter()
const props = defineProps({
  searchData: Object,
  pagination: Object
})
const emit = defineEmits(['paginationChange'])
let currentPage = ref(1)
// 跳转详细页
function toSongDetails(item) {
  router.push({
    name: "SongDetails",
    params: {
      songId: item.id,
    },
  });
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
function playSong(id) {
  counterStore.PlayerSongIdToLocal(id);
  getSongList(id);
  emitter.emit("SongDetailsPlay");
}
// 分页点击
function paginationChange(val) {
  currentPage.value = val
  emit('paginationChange', val)
}

watch(
  props.searchData,
  (newValue) => {
    console.log(newValue);
  }
);
</script>

<style lang="less" scoped>
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
</style>