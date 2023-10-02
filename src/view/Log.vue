<template>
  <div class="myLog">
    <div class="log-windows">
      <!-- 标题 -->
      <div class="title">登录</div>
      <!-- 内容 -->
      <div class="logContent">
        <!-- 图片 -->
        <div class="logImg">
          <img src="../image/log.png" alt="" />
        </div>
        <!-- 输入框 -->
        <div class="logInput">
          <!-- 账号 -->
          <div>
            <el-form-item label="账号：">
              <el-input
                v-model="zhanghaoInput"
                placeholder="请输入手机号或邮箱"
                clearable
              />
            </el-form-item>
          </div>
          <!-- 密码 -->
          <div>
            <el-form-item label="密码：">
              <el-input
                v-model="passwordInput"
                placeholder="请输入密码"
                type="password"
                clearable
              />
            </el-form-item>
          </div>
          <el-button
            type="danger"
            round
            size="large"
            :disabled="pdButton"
            class="logButton"
            @click="toLog"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { reqPhoneLog } from "../axios/user";
const zhanghaoInput = ref("");
const passwordInput = ref("");

let pdButton = computed({
  get() {
    return zhanghaoInput.value == "" || passwordInput.value == "";
  },
});

async function toLog() {
  const req = await reqPhoneLog(zhanghaoInput.value, passwordInput.value);
  console.log(req);
}
</script>

<style lang="less" scoped>
@background-img: url("../image/maowindows.png"); /* 替换为你自己的颗粒纹理图像 */
.myLog {
  position: relative;
  width: 100%;
  height: calc(100vh - 72px);
  background-color: rgba(109, 109, 109, 0.685);
  overflow: hidden;
  display: flex;
  //   align-items: center;
  justify-content: center;
  .log-windows {
    position: absolute;
    width: 1100px;
    height: 600px;
    top: 100px;
    background-color: white;
    .title {
      width: 100%;
      height: 40px;
      background-color: #333;
      color: white;
      font-size: 24px;
      font-weight: 600;
      padding: 0 20px;
      line-height: 40px;
      box-sizing: border-box;
    }
    .logContent {
      // background-color: aqua;
      height: calc(100% - 41px);
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .logImg {
        // background-color: aquamarine;
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 80%;
        }
      }
      .logInput {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        border-left: 1px solid black;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logButton {
          width: 200px;
        }
      }
    }
  }
}

.myLog::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover; /* 使用 cover 将图片拉伸以填充整个容器 */
  background-image: @background-img;
  // opacity: 0.8; /* 调整纹理图像的透明度 */
  filter: blur(3px);
  pointer-events: none;
  z-index: -1; /* 将伪元素置于背后 */
}
</style>