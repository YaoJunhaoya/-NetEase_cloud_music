<template>
  <div class="app">
    <!-- 导航条 -->
    <NavigationVue></NavigationVue>
    <router-view class="router-view-app"></router-view>
    <MusicPlayerVue></MusicPlayerVue>
  </div>
</template>

<script setup>
import MusicPlayerVue from "./components/MusicPlayer.vue";
import NavigationVue from "./components/Navigation.vue";
</script>

<style lang="less" >
.router-view-app{
  margin-bottom: 100px;
}
</style>
