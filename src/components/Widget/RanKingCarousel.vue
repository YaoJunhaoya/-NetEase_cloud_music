<template>
  <div class="wai">
    <div class="wai-to">前往全部榜单=></div>
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
        <div class="content-side">
          {{ firstFour[dataIndex.leftIndex]?.name || "空" }}
        </div>
        <!-- 中间内容 -->
        <div class="content-main">
          {{ firstFour[dataIndex.middleIndex]?.name || "空" }}
        </div>
        <!-- 右边内容 -->
        <div class="content-side">
          {{ firstFour[dataIndex.rightIndex]?.name || "空" }}
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
import { ref, reactive, defineProps, onMounted, watch } from "vue";

defineProps({
  firstFour: {
    type: Array,
    default: [],
  },
});

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
  // console.log(firstFour[dataIndex.leftIndex]);
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
    border-bottom: 1px solid black;
    border-radius: 10px;
    color: red;
  }
  .mainPart {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    height: calc(100% - 30px);
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
      width: calc(100%);
      display: flex;
      // 所有排行榜
      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-shadow: 0px 0px 4px black;
        margin: 0px 5px;
      }
      // 两遍的排行榜
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