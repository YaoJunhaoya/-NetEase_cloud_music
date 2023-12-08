<template>
  <div class="app">
    <!-- 导航条 -->
    <NavigationVue></NavigationVue>
    <router-view class="router-view-app"></router-view>
    <MusicPlayerVue></MusicPlayerVue>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import MusicPlayerVue from "./components/MusicPlayer.vue";
import NavigationVue from "./components/Navigation.vue";

// 大屏自适应
// import autofit from "autofit.js";

onMounted(() => {
  // autofit.init(
  //   {
  //     ah: 1080,
  //     dw: 1920,
  //     el: "#app",
  //     resize: true,
  //   },
  //   false
  // );
});
onBeforeUnmount(() => {
  // autofit.off();
});
</script>

<style lang="less" >
.app {
  background-color: #eeeeee96;
}
.router-view-app {
  padding-bottom: 130px;
}
</style>
