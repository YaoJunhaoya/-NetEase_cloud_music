<template>
  <div class="comment">
    <div class="comment-item" v-for="(item, i) in comments" :key="i">
      <div class="comment-item-user">
        <!-- 评论的用户头像 -->
        <div class="comment-item-user-img">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <!-- 评论的用户名字 -->
        <div class="comment-item-user-name">{{ item.nickname }}</div>
      </div>
      <div class="comment-item-pinglun">
        <!-- 评论 -->
        <div class="comment-item-pinglun-text">
          <span>{{ item.content }}</span>
        </div>
        <!-- 评论信息 -->
        <div class="comment-item-pinglun-xx">
          <!-- 时间 -->
          <div>
            {{ getTime(item.time) }}
          </div>
          <!-- 地址 -->
          <div>IP:{{ item.ipLocation.location }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  comments: {
    type: Array,
    default: [], //默认值
  },
});

// 转化时间
function getTime(item) {
  const date = new Date(item);

  // 从 Date 对象中提取年、月、日、时、分、秒
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 注意：月份从0开始，所以要加1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return ` ${year}年  ${month}月   ${day}日   ${hours}: ${minutes}: ${seconds}`;
}
</script>

<style lang="less" scoped>
.comment {
  border-top: 1px dashed #999;
  .comment-item {
    margin: 10px 50px;
    min-height: 60px;
    background-color: rgb(233, 235, 230);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    .comment-item-user {
      margin: 10px 10px;
      width: 100px;
      .comment-item-user-img {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          border-radius: 30px;
        }
      }
      .comment-item-user-name {
        font-size: 10px;
      }
    }
    .comment-item-pinglun {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      min-height: 70px;
      width: 900px;
      margin: 0px 10px;
      .comment-item-pinglun-text {
        font-size: 20px;
        margin: 10px 10px;
        span {
          white-space: normal; /* 允许文字自动换行 */
          word-break: break-all; /* 在单词内换行 */
        }
      }
      .comment-item-pinglun-xx {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #999;
        width: 95%;
        margin: 10px 0;
      }
    }
  }
}
</style>