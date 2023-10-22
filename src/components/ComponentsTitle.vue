<template>
  <!-- 标题 -->
  <div class="flei">
    <span class="fleiTitle">
      <slot></slot>
    </span>
  </div>
</template>
    
<script setup  >
</script>
    
<style lang="less" scoped>
.flei {
  margin: 10px 0;
  border-top: 5px solid rgba(209, 13, 13, 0.507);
  width: 1100px;
  .fleiTitle {
    font-size: 25px;
    font-weight: 600;
  }
}
</style>