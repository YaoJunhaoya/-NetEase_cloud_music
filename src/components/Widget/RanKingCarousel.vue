<template>
  <div class="wai">
    <div class="wai-to">
      <span>前往全部榜单</span>
      <svg class="icon" aria-hidden="true" style="font-size: 18px">
        <use xlink:href="#icon-youyou-"></use>
      </svg>
    </div>
    <div class="mainPart">
      <!-- 上一个 -->
      <div class="changeButton last" @click="addMiddleIndex(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jichu_xiangzuo"></use>
        </svg>
      </div>
      <!-- 三个内容轮播--->
      <div class="content">
        <!-- 左边内容 -->
        <div class="content-side content-div">
          <RanKingCarouselItem
            v-if="myFirstFour[dataIndex.leftIndex]"
            :item="myFirstFour[dataIndex.leftIndex]"
          ></RanKingCarouselItem>
          <div v-else>空</div>
        </div>
        <!-- 中间内容 -->
        <div class="content-main content-div">
          <RanKingCarouselItem
            v-if="myFirstFour[dataIndex.middleIndex]"
            :item="myFirstFour[dataIndex.middleIndex]"
          ></RanKingCarouselItem>
          <div v-else>空</div>
        </div>
        <!-- 右边内容 -->
        <div class="content-side content-div">
          <RanKingCarouselItem
            v-if="myFirstFour[dataIndex.rightIndex]"
            :item="myFirstFour[dataIndex.rightIndex]"
          ></RanKingCarouselItem>
          <div v-else>空</div>
        </div>
      </div>
      <!-- 下一个 -->
      <div class="changeButton next" @click="addMiddleIndex(+1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jichu_xiangyou"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
  
<script setup  >
import {
  ref,
  reactive,
  defineProps,
  onMounted,
  watch,
  toRef,
  toRefs,
} from "vue";
import useSongStore from "../../pinia/songStore";
import RanKingCarouselItem from "./RanKingCarouselItem.vue";

// pinia仓库
const store = useSongStore();

let myFirstFour = store.allRankingListFirstFour;

// 当前显示的索引
let dataIndex = reactive({
  middleIndex: 0,
  leftIndex: -1,
  rightIndex: 1,
});
//修改dataIndex.middleIndex的值 让他在一定范围
function addMiddleIndex(item) {
  dataIndex.middleIndex = fixedRange(dataIndex.middleIndex + item);
  dataIndex.leftIndex = fixedRange(dataIndex.middleIndex - 1);
  dataIndex.rightIndex = fixedRange(dataIndex.middleIndex + 1);
}
// 循环一个范围  传入一个值，规定范围 [0,max]
function fixedRange(value = 0) {
  let max = 3;
  if (value >= 0 && value <= 3) return value;
  if (value < 0) return max;
  if (value > 3) return 0;
}
onMounted(async () => {
  addMiddleIndex(0);
});
</script>
   
<style lang="less" scoped>
.wai {
  height: 100%;
  .wai-to {
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
    color: red;
  }
  .mainPart {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    height: calc(100% - 30px);
    width: 1100px;
    .changeButton {
      width: 40px;
      height: 70px;
      margin: 0px 5px;
      border-radius: 25px;
      background-color: rgb(238, 230, 230);
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      box-shadow: 0 0 5px black;
    }
    .content {
      height: 100%;
      width: 1100px;
      display: flex;
      // 所有排行榜
      .content-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: 0px 0px 6px black;
        margin: 0px 5px;
        border-radius: 10px;
      }
      // 两边的排行榜
      .content-side {
        width: 30%;
      }
      // 中间的排行榜
      .content-main {
        width: 40%;
      }
    }
  }
}
</style>