<template>
  <div class="rmgedanfeli">
    <div class="title">MV列表</div>
    <!-- MV -->
    <div class="big">
      <div class="allGedan">
        <div class="gedan" v-for="video in searchData.SongData.videos" :key="video.id">
          <img :src="video.coverUrl" />
          <span>{{ video.title }}</span>
          <span class="formattedTime">{{ formattedTime(video.durationms) }}</span>
          <span class="playTime">
            <svg class="playTimeIcon" aria-hidden="true">
              <use xlink:href="#icon-redu"></use>
            </svg>{{ getHeat(video.playTime) }}</span>
          <a class="play-button">
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-playCircle"></use>
            </svg>
          </a>
        </div>
      </div>
      <div class="pagination">
        <el-pagination v-if="pagination.total > 30" background layout="prev, pager, next" :page-size="pagination.pageSize"
          :total="parseInt(pagination.total)" :current-page="currentPage" @current-change="paginationChange" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { formattedTime } from '../../utils/TimeDate'
const props = defineProps({
  searchData: Object,
  pagination: Object
})
const emit = defineEmits(['paginationChange'])
// 当前页
let currentPage = ref(1)
// 分页点击
function paginationChange(val) {
  currentPage.value = val
  emit('paginationChange', val)
}
// 处理热度数据
function getHeat(playTime) {
  if (playTime < 100000) return playTime
  let result = (playTime / 10000).toFixed(1);
  if (result.split('.')[1] == '0') return `${Math.floor(result)}万`
  return `${result}万`
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

    .pagination {
      margin-top: 10px;
    }

    .allGedan {
      display: flex;
      flex-wrap: wrap;
      width: 1190px;
      margin-top: 25px;
      margin-left: 25px;
      margin-bottom: 20px;

      .gedan {
        position: relative;
        width: 175px;
        height: 100px;
        margin: 0px 30px 45px 30px;
        box-shadow: 2px 2px 8px rgba(109, 109, 109, 0.795);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;

        span {
          // 自适应宽度
          width: fit-content;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          width: 100%;
          height: 100%;
        }

        .play-button {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }

        .formattedTime {
          position: absolute;
          bottom: 2px;
          left: 3px;
          color: #ffffff;
          font-size: 14px;
        }

        .playTime {
          position: absolute;
          top: 0px;
          right: 0px;
          color: #ffffff;
          font-size: 14px;
          background: linear-gradient(to left, #000000, rgba(255, 255, 255, 0));
        }

        .playTimeIcon {
          width: 1em;
          height: 1em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
          font-size: 20px;
          margin-right: 3px;
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