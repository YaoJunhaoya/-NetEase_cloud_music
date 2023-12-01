<template>
  <div>
    歌手页面
    <div>当前歌手id:{{route.params.singerId}}</div>
  </div>
</template>
    
<script setup  >
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// 路由
const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log(route.params.singerId);
});
</script>
    
<style lang="less" scoped>
</style>