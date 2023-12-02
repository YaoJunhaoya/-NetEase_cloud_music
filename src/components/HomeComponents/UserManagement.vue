<template>
  <div>
    <el-button @click="closePage"> 关闭 </el-button>
    <el-button @click="outLogIn"> 退出登录 </el-button>
    <el-button @click="getLog"> 登录状态 </el-button>
    <el-button @click="toPersonalCenter"> 个人中心 </el-button>
  </div>
</template>
    
<script setup  >
import { useRouter } from "vue-router";
import { reqUserLogState } from "../../axios/user";
import useUserStore from "../../pinia/user";

// 路由
const router = useRouter();

// Pinia仓库
const userStore = useUserStore();

const emit = defineEmits(["closePage"]);
// 关闭窗口状态
function closePage() {
  emit("closePage");
}

// 退出登录
function outLogIn() {
  // 清除登录信息
  userStore.ClearLoginInformation()
  // 跳转到登录界面
  let pd = confirm("是否跳转到登录界面?");
  closePage();
  if (pd) {
    // 跳转登录
    router.push({
      path: "/log",
    });
  }
}

// 查看登录状态
async function getLog() {
  const { data: data } = await reqUserLogState();
  console.log(data.data);
  alert(JSON.stringify(data.data));
}

// 去个人中心
function toPersonalCenter() {
  router.push({
    path: "/personal_center",
  });
  // 关闭窗口
  closePage();
}
</script>
    
<style lang="less" scoped>
</style>