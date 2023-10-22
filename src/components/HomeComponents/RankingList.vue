<template>
  <div class="rmgedanfeli">
    <!-- 标题 -->
   <ComponentsTitle>排行榜</ComponentsTitle>
    <!-- 排行榜 -->
    <div class="rmgedanfeli-content">我是排行榜</div>
  </div>
</template>
    
<script setup  >
import ComponentsTitle from "../ComponentsTitle.vue";
</script>
    
<style lang="less" scoped>
.rmgedanfeli {
  .rmgedanfeli-content {
    width: 1100px;
    height: 500px;
    background-color: rgb(210, 241, 231);
  }
}
</style>