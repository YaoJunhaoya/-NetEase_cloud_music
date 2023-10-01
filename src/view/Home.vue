<template>
  <div>
    我是首页
    <div>展示pinia的counter的count值:{{counterStore.count}}</div>
    <div>展示pinia的counter的sum值:{{counterStore.sum}}</div>
    <div>展示pinia的user的token值:{{userStore.token}}</div>
    <div v-for="(a, index) in 30" :key="index" class="box">一</div>
  </div>
</template>

<script setup>
import useCounterStore from "../pinia/counter";
import useUserStore from '../pinia/user'


const counterStore = useCounterStore();
const userStore = useUserStore();

console.log(counterStore);
console.log(userStore);
</script>

<style lang="less" scoped>
.box {
  height: 40px;
  background-color: rgba(1, 1, 1, 0.5);
  margin: 10px 0;
}
</style>