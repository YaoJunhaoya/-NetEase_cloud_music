<template>
  <div class="rmgedanfeli">
    <div class="title">歌曲列表</div>
    <!-- 歌单 -->
    <div class="big">
      <div class="allGedan">
        <div class="gedan" v-for="album in searchData.SongData.albums" :key="album.id" @click="goCollection(album.id)">
          <img :src="album.picUrl" alt />
          <span>{{ album.name }}</span>
          <a class="play-button" @click.stop="Playalbum(album.id)">
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-playCircle"></use>
            </svg>
          </a>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize"
        :total="parseInt(pagination.total)" :current-page="currentPage" @current-change="paginationChange" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { reqAlbumList } from '../../axios/album'
import useCounterStore from "../../pinia/counter"
import emitter from "../../plugins/Bus";
import { useRouter } from 'vue-router'
// Pinia仓库
const counterStore = useCounterStore();
const props = defineProps({
  searchData: Object,
  pagination: Object
});
const emit = defineEmits(['paginationChange'])
const router = useRouter()
// 当前页
let currentPage = ref(1)
let albumsList = reactive({
  // 歌单信息
  songs: {}
})
// 分页点击
function paginationChange(val) {
  currentPage.value = val
  emit('paginationChange', val)
}
// 跳转专辑页面
function goCollection(id) {
  router.push({
    name: 'Collection',
    params: { id: id }
  })
}
// 点击播放
async function Playalbum(id) {
  let { data } = await reqAlbumList(id)
  albumsList.songs = data.songs
  console.log("歌单详情歌曲id:", data.songs[0].id);
  counterStore.PlayerSongIdToLocal(data.songs[0].id);
  getSongList(id)
  emitter.emit("SongDetailsPlay");
}
// 获取本地歌单
function getSongList(id) {
  let arr = ref([]);
  // 判断 歌单id 与 本地的第一项 是否相同
  if (counterStore.playerSongList[0] != id) {
    // 这是歌单id
    arr.value.push(id);
    // 获取列表
    albumsList.songs.forEach((item, index) => {
      arr.value.push(item.id)
    });
    // 上传到本地
    counterStore.PlayerSongList(arr.value);
  } else {
    console.log("是同一首专辑");
  }
}
</script>

<style lang="less" scoped>
.rmgedanfeli {
  width: 1200px;

  .title {
    margin: 10px 50px;
    font-size: 23px;
    padding-bottom: 10px;
    border-bottom: 3px solid #d63434;
  }

  .big {
    display: flex;
    flex-direction: column;
    align-items: center;

    .allGedan {
      display: flex;
      flex-wrap: wrap;
      width: 1190px;
      margin-top: 25px;
      margin-left: 25px;

      .gedan {
        position: relative;
        width: 165px;
        height: 165px;
        margin: 0px 30px 30px 30px;
        box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);

        img {
          width: 100%;
          height: 100%;
        }

        .play-button {
          display: none;
          position: absolute;
          bottom: -4px;
          right: -4px;
        }
      }

      .gedan:hover {
        .play-button {
          display: block;
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
}
</style>