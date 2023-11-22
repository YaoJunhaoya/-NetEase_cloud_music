<template>
  <div>
    <div>当前在搜索：{{ searchContent }}</div>
  </div>
</template>
    
<script setup  >
import { ref, onMounted, watch } from "vue";
import useCounterStore from "../pinia/counter";

// Pinia仓库
const counterStore = useCounterStore();

let searchContent = ref("");

// 监视和onMounted共同的方法
function watchAndOnMounted() {
  searchContent.value = counterStore.lastSearchContent;
}
watch(
  () => counterStore.lastSearchContent,
  () => {
    watchAndOnMounted();
  }
);
onMounted(async () => {
  watchAndOnMounted();
});
</script>
    
<style lang="less" scoped>
</style>