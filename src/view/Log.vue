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
        <!-- 右边区域 -->
        <div class="youbianquyu">
          <!-- 验证码登录 -->
          <div class="logInput" v-if="loginType == 0">
            <!-- 账号 -->
            <div>
              <el-form-item label="手机号：">
                <el-input
                  v-model="zhanghaoInput"
                  placeholder="请输入手机号 "
                  clearable
                />
              </el-form-item>
            </div>
            <!-- 密码 -->
            <div>
              <el-form-item label="验证码：">
                <el-input
                  v-model="passwordInput"
                  placeholder="请输入验证码"
                  clearable
                  class="yzmkuang"
                />
              </el-form-item>
              <button class="hqyzm" @click="getCode()">获取验证码</button>
            </div>
          </div>
          <!-- 账号密码登录 -->
          <div class="logInput" v-if="loginType == 1">
            <!-- 账号 -->
            <div>
              <el-form-item label="账号：">
                <el-input
                  v-model="zhanghaoInput"
                  placeholder="请输入手机号"
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
          </div>
          <!-- 邮箱登录 -->
          <div class="logInput" v-if="loginType == 2">
            <!-- 账号 -->
            <div>
              <el-form-item label="邮箱：">
                <el-input
                  v-model="zhanghaoInput"
                  placeholder="请输入邮箱"
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
          </div>
          <!-- 扫码登录 -->
          <div class="logInput" v-if="loginType == 3">
            <!-- 二维码 -->
            <div v-if="qrKey" class="qrCode">
              <!-- 801等待扫码 -->
              <div>
                <img
                  :class="{ imgslur: qrCodeState.code == 802 }"
                  :src="qrImg"
                  alt=""
                />
              </div>
              <!-- 802授权中 -->
              <div class="code802" v-if="qrCodeState.code == 802">
                <img :src="qrCodeState.userImg" alt="" />
                <span>{{ qrCodeState.name }}</span>
              </div>
              <!-- 803授权登陆成功 -->
              <!-- 800二维码不存在或已过期 -->
            </div>
            <div></div>
          </div>
          <div class="changeLogin">
            <span v-if="loginType != 0" @click="loginType = 0">验证码登录</span>
            <span v-if="loginType != 1" @click="loginType = 1"
              >账号密码登录</span
            >
            <span v-if="loginType != 2" @click="loginType = 2">邮箱登录</span>
            <span v-if="loginType != 3" @click="loginType = 3">扫码登录</span>
          </div>
          <el-button
            type="danger"
            round
            size="large"
            :disabled="pdButton"
            class="logButton"
            @click="toLog"
            v-show="loginType != 3"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from "vue";
import {
  reqPhoneCodeLog,
  reqPhoneLog,
  reqEmailLog,
  reqSendPhoneCodeLog,
  reqQrKey,
  reqQrCreate,
  reqQrCheck,
  reqUserAccount,
} from "../axios/user";
import useUserStore from "../pinia/user";
import { useRouter, useRoute } from "vue-router";
import baocunCookie from "../plugins/ReserveCookie";

// 路由
const router = useRouter();
const route = useRoute();

// Pinia仓库
const userStore = useUserStore();

// 登录方式
let loginType = ref(0);

// 获取验证码
async function getCode() {
  const { data: data } = await reqSendPhoneCodeLog(zhanghaoInput.value);
  if (data.code == 200) {
    alert("发送成功");
  } else {
    alert("发送失败");
  }
}

// 账号密码
const zhanghaoInput = ref("15888673903");
const passwordInput = ref("");

let pdButton = computed({
  get() {
    return zhanghaoInput.value == "" || passwordInput.value == "";
  },
});

// 登录
async function toLog() {
  // 获取的数据
  let allData = ref(null);
  if (loginType.value == 0) {
    // 验证码登录
    const { data: req } = await reqPhoneCodeLog(
      zhanghaoInput.value,
      passwordInput.value
    );
    allData = req;
  } else if (loginType.value == 1) {
    // 账号密码登录

    const { data: req } = await reqPhoneLog(
      zhanghaoInput.value,
      passwordInput.value
    );
    allData = req;
  } else if (loginType.value == 2) {
    // 邮箱登录
    const { data: req } = await reqEmailLog(
      zhanghaoInput.value,
      passwordInput.value
    );
    allData = req;
  }
  console.log("allData", allData);
  if (allData.code == 200) {
    // 设置用户cookie
    userStore.usetCookieToLocal(allData.cookie);
    baocunCookie(allData.cookie);
    // 设置用户ID
    userStore.userUserUidToLocal(allData.account.id);
    // 账户信息
    userStore.usetAccountToLocal(allData.account);
    // 用户资料
    userStore.usetProfileToLocal(allData.profile);
    // 用户全部资料
    userStore.userLogState(allData);
    // 完成登录跳转到首页
    router.push("/home");
  } else {
    alert("账号，密码或验证码有问题，请重试");
    zhanghaoInput.value = "";
    passwordInput.value = "";
  }
}
// 二维码的key
let qrKey = ref("");
// 二维码图
let qrImg = ref("");
async function getQrImg() {
  const { data: a } = await reqQrCreate(qrKey.value);
  qrImg.value = a.data.qrimg;
}
// 当前扫码状态
let qrCodeState = reactive({
  code: "",
  name: "",
  userImg: "",
});
// 获取账号信息
async function getUserAccount() {
  const { data: a } = await reqUserAccount();
  // console.log(a);
  // 设置用户ID
  userStore.userUserUidToLocal(a.account.id);
  // 账户信息
  userStore.usetAccountToLocal(a.account);
  // 用户资料
  userStore.usetProfileToLocal(a.profile);
  // 用户全部资料
  userStore.userLogState(a);
}

// 监视登录类型
watch(
  () => loginType.value,
  async () => {
    if (loginType.value == 3) {
      // 生成二维码的key
      const { data: a } = await reqQrKey();
      qrKey.value = a.data.unikey;
      if (qrKey.value != "") {
        getQrImg();
        // 启动触发器 一直循环检查二维码状态
        let intervalId = setInterval(async function () {
          const { data: a } = await reqQrCheck(qrKey.value);
          qrCodeState.code = a.code;
          console.log(a); //801等待扫码 802授权中 803授权登陆成功 800二维码不存在或已过期
          if (qrCodeState.code == 802) {
            qrCodeState.userImg = a.avatarUrl;
            qrCodeState.name = a.nickname;
          } else if (qrCodeState.code == 803) {
            // 设置用户cookie
            userStore.usetCookieToLocal(a.cookie);
            baocunCookie(a.cookie);
            // 获取账号信息
            await getUserAccount();
            // 跳转到首页
            router.push({
              path: "/home",
            });
            // 关闭定时器
            clearInterval(intervalId);
          }
        }, 2500);
      }
    }
  }
);
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
      .youbianquyu {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        border-left: 1px solid black;
        .logInput {
          .qrCode {
            display: flex;
            align-items: center;
            .imgslur {
              filter: blur(5px);
            }
            .code802 {
              width: 150px;
              height: 150px;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 100px;
                height: 100px;
              }
            }
          }
          div {
            display: flex;
            // align-items: center;
            justify-content: flex-start;
          }
          // 验证码登录
          .yzmkuang {
            width: 120px;
          }
          .hqyzm {
            width: 80px;
            height: 30px;
            font-size: 10px;
            margin-left: 20px;
          }
          // 账号密码
          // 邮箱
        }
        .changeLogin {
          font-size: 10px;
          width: 50%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-top: #999 1px solid;
          span {
            margin: 5px 5px;
          }
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