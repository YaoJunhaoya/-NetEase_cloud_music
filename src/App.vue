<template>
  <div>
    <!-- 导航条 -->
    <NavigationVue></NavigationVue>
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavigationVue from "./components/Navigation.vue";
</script>

<style scoped>

</style>
