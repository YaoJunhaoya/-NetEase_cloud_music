<template>
  <div class="Moment">
    <!--选择类型-->
    <div class="Moment-type">
      <!-- 推荐 朋友 -->
      <div
        class="Moment-button"
        :class="{ activate: !AorB }"
        @click="AorB = false"
      >
        推荐
      </div>
      <div
        class="Moment-button"
        :class="{ activate: AorB }"
        @click="AorB = true"
      >
        朋友
      </div>
    </div>
    <!-- n内容 -->
    <div class="neirong">
      <div
        v-if="(AorB ? friend.MomentArr : recommend.MomentArr).length <= 0"
        class="jiazai"
      >
        <span>正在加载中</span>
      </div>
      <div v-else>
        <DynamicContent
          v-for="(item, index) in AorB ? friend.MomentArr : recommend.MomentArr"
          :key="index"
          :data="item"
        ></DynamicContent>
        <button @click="TypeData()">加载更多</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import DynamicContent from "./Components/DynamicContent.vue";
import { reqUserFollows } from "../../axios/user";
import useUserStore from "../../pinia/user";
import AllUserMoment from "../../plugins/AllUserMoment";
import RandomUserId from "../../plugins/RandomUserId";

// 仓库
const userStore = useUserStore();

// 当前选择的是推荐还是朋友  false：推荐
let AorB = ref(false);

// 内容为推荐时的好友动态
const recommend = reactive({
  // 动态数组
  MomentArr: [],
});
// 内容为朋友时的好友动态
const friend = reactive({
  // 动态数组
  MomentArr: [],
});

// 根据
async function TypeData() {
  if (!AorB.value) {
    console.log("推荐");
    // 获取推荐数据
    // 获取随机的10个用户id
    let tuijianUserId = await RandomUserId(10);
    // 获取每个用户的动态
    recommend.MomentArr = [
      ...recommend.MomentArr,
      ...(await AllUserMoment(tuijianUserId)),
    ];
  } else {
    console.log("朋友");
    // 获取关注的好友的数据
    const { data: a } = await reqUserFollows(userStore.myProfile.userId);
    let haoyaou = a.follow.map((item) => item.userId);
    friend.MomentArr = await AllUserMoment(haoyaou);
  }
}

watch(AorB, async () => {
  await TypeData();
});
onMounted(async () => {
  await TypeData();
});
</script>

<style lang="less" scoped>
.Moment {
  width: calc(100vw - 240px);
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: flex-start;
  .Moment-type {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #999;
    margin-bottom: 10px;
    .Moment-button {
      width: 200px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: rgb(216, 216, 216);
      border-radius: 10px;
      font-size: 25px;
      cursor: pointer;
      &:hover {
        background-color: #999;
      }
    }
    .activate {
      background-color: #999;
    }
  }
  .neirong {
    width: 100%;
    .jiazai {
      height: 400px;
      font-size: 50px;
      font-weight: 600;
      text-align: center;
      line-height: 400px;
    }
  }
}
</style>
