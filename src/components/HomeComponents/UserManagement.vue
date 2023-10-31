<template>
  <div>
    <el-button @click="closePage"> 关闭 </el-button>
    <el-button> 退出登录 </el-button>
    <el-button @click="getLog"> 登录状态 </el-button>
  </div>
</template>
    
<script setup  >
import { reqUserLogState } from "../../axios/user";

const emit = defineEmits(['closePage'])

function closePage(){
  emit("closePage")
}

async function getLog() {
  const {data:data} = await reqUserLogState();
  console.log(data.data);
}

</script>
    
<style lang="less" scoped>
</style>