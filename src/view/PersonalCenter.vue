<template>
  <div class="PersonalCenter">
    <!-- 左边目标栏 -->
    <div class="PersonalCenter-left">
      <div class="left-div" @click="toPage('home')">个人中心</div>
      <div class="left-div" @click="toPage('recently_played')">最近播放</div>
      <div class="left-div" @click="toPage('my_like')">我的喜欢</div>
      <div class="left-div" @click="toPage('my_songList')">我的歌单</div>
      <div class="left-div" @click="toPage('cloud_disk')">云盘</div>
      <div class="left-div" @click="toPage('purchase_song')">已购单曲</div>
      <div class="left-div" @click="toPage('my_good_friend')">我的好友</div>
      <div class="left-div" @click="toPage('moment')">动态</div>
    </div>
    <div class="PersonalCenter-left2"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
    
<script setup  >
import {useRouter} from "vue-router"

// 路由
const router =useRouter()

function toPage (pageName){
  router.push({
    path:`/personal_center/${pageName}`
  })
}

</script>
    
<style lang="less" scoped>
.PersonalCenter {
  display: flex;
  .PersonalCenter-left {
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    position: fixed;
    top: 72px;
    left: 0px;
    .left-div {
      width: calc(100% - 10px);
      height: 40px;
      background-color: rgb(233, 233, 233);
      margin: 10px 5px;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      box-shadow: 2px 2px 6px #817979;
      cursor: pointer;
    }
  }
  .PersonalCenter-left2 {
    width: 200px;
  }
}
</style>