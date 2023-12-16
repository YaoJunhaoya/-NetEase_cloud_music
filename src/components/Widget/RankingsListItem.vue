<template>
  <div class="RankingsListItem-main" :class="{ activate: itemProps.activate }">
    <!-- 图片 -->
    <div class="main-img">
      <img v-lazy="itemProps.item.coverImgUrl" alt="" />
    </div>
    <div class="main-youbian">
      <!-- 名称 -->
      <div class="main-name">{{ itemProps.item.name }}</div>
      <!-- 更新时间 -->
      <div class="main-gxsj">更新时间：{{ updateTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";

const itemProps = defineProps({
  item: {
    default: {},
    type: Object,
  },
  activate: {
    default: false,
    type: Boolean,
  },
});

// 计算时间
let updateTime = computed(() => {
  let timestamp = itemProps.item.updateTime;
  let date = new Date(timestamp);

  // 创建一个格式化的日期字符串
  let formattedDate = [
    date.getFullYear() + "-",
    ("0" + (date.getMonth() + 1)).slice(-2) + "-",
    ("0" + date.getDate()).slice(-2),
    " ",
  ].join("");

  // 添加时分秒并格式化
  formattedDate += [
    ("0" + date.getHours()).slice(-2),
    ("0" + date.getMinutes()).slice(-2),
    ("0" + date.getSeconds()).slice(-2),
  ].join(":");
  return formattedDate;
});
</script>

<style lang="less" scoped>
.RankingsListItem-main {
  width: calc(100% - 20px); //280px
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px 5px;
  padding: 5px;
  box-shadow: 0 0 5px black;
  .main-img {
    width: 50px;
    img {
      width: 100%;
    }
  }
  .main-youbian {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 5px;
    .main-name {
      width: 200px; /* 这里可以设置你需要的宽度 */
      white-space: nowrap; /* 防止文字换行 */
      overflow: hidden; /* 隐藏超出部分 */
      text-overflow: ellipsis; /* 当文字超出时显示省略号 */
      font-size: 18px;
      font-weight: 600;
    }
    .main-gxsj {
      font-size: 10px;
      color: #999;
    }
  }
}
.activate {
  color: red;
}
</style>
