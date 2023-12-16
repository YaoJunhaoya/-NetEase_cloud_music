<template>
  <span> {{ route.params }}</span>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { reqVideoDetail } from '../axios/video'
const route = useRoute()
async function getData() {
  let result = await reqVideoDetail(route.params.Vid)
  console.log(result);
}
onMounted(() => {
  getData();
});
</script>

<style></style>