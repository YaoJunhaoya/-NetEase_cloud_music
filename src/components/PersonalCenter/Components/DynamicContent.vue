<template>
  <div class="qianbu" v-if="props.data">
    <!-- 角色信息 -->
    <div class="user-data">
      <div class="user-data-l">
        <!-- 头像 -->
        <img class="user-img" v-lazy="props.data.user.avatarUrl" alt="" />
        <!-- 姓名 -->
        <span class="user-name">{{ props.data.user.nickname }}</span>
      </div>
      <!--  类型谁可见-->
      <div class="user-data-r">{{ props.data?.privacySettingInfo?.desc }}</div>
    </div>
    <!-- 内容 -->
    <div class="DynamicContent">
      <!-- 文字 -->
      <div
        class="DynamicContent-text"
        v-html="props.data.json2?.msg.replace(/\n/g, '<br/>')"
      ></div>
      <!-- 图片 -->
      <div class="DynamicContent-img" v-viewer>
        <viewer
          class="div-img"
          v-for="(item, index) in props.data.pics"
          :key="index"
        >
          <img v-lazy="item.originUrl" alt="" />
        </viewer>
      </div>
      <!-- 音乐 -->
      <div class="DynamicContent-music" v-if="props.data?.json2?.song">
        <div class="kaozuo">
          <!-- 左边 -->
          <div
            class="music-l"
            @click="toSongDetails(props.data?.json2?.song?.id)"
          >
            <img
              class="music-l-img"
              v-lazy="props.data?.json2?.song?.album?.blurPicUrl"
              alt=""
            />
          </div>
          <!-- 右边 -->
          <div
            class="music-r"
            @click="toSongDetails(props.data?.json2?.song?.id)"
          >
            <!-- 歌曲名称 -->
            <div class="music-song">
              {{ props.data?.json2?.song?.album?.name }}
            </div>
            <!-- 歌手 -->
            <div class="music-singer">
              <span
                v-for="(item, index) in props.data?.json2?.song?.artists"
                :key="index" >{{ item.name }}  </span>
            </div>
          </div>
        </div>
        <!-- 播放按钮 -->
        <div class="icon-bofnag-div">
          <svg
            class="icon my-icon"
            aria-hidden="true"
            @click="PlaySong(props.data?.json2?.song?.id)"
          >
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
      </div>
      <!-- 设置 -->
      <div class="DynamicContent-shezhi">
        <div class="caozuo">
          <div
            class="shezhi-box"
            v-for="(item, index) in domButtons"
            :key="index"
          >
            <svg class="icon" aria-hidden="true" style="font-size: 20px">
              <use :xlink:href="`#${item.icon}`"></use>
            </svg>
          </div>
        </div>
        <!--  发布时间 ip地址-->
        <div class="xiangqing">
          <!-- 时间 -->
          <div class="xiangqing-box">
            {{ changeTime(props.data?.eventTime, 1) }}
          </div>
          <!-- ip地址 -->
          <div class="xiangqing-box">
            IP {{ props.data?.ipLocation?.location || "未知" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import changeTime from "../../../plugins/Time";
import { useRouter } from "vue-router";
import useCounterStore from "../../../pinia/counter";
import emitter from "../../../plugins/Bus";
import PlaySong from "../../../plugins/method/PlaySong";

// Pinia仓库
const counterStore = useCounterStore();

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
// dom
const domButtons = reactive({
  // 点赞
  dianzan: {
    icon: "icon-dianzan",
  },
  // 评论
  pinglun: {
    icon: "icon-pinglun",
  },
  // 删除
  shanchu: {
    icon: "icon-shanchu3",
  },
});

// 路由
const router = useRouter();

// 跳转歌曲详情
function toSongDetails(id) {
  if (id) {
    router.push({
      path: "/songdetails/" + id,
    });
  }
}

onMounted(() => {
  props.data.json2 = JSON.parse(props.data.json);
  // console.log(props.data);
});
</script>

<style lang="less" scoped>
.qianbu {
  padding-top: 0.1px;
  margin: 10px 0;
  border-bottom: 1px solid #c9c9c9;

  .user-data {
    margin: 10px 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    .user-data-l {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      .user-img {
        width: 50px;
        border-radius: 25px;
      }
      .user-name {
        margin-left: 10px;
        font-size: 20px;
        font-weight: 600;
      }
    }
    .user-data-r {
      font-size: 15px;
      color: #999;
    }
  }
  .DynamicContent {
    margin: 10px 0 0 60px;
    border-radius: 10px;
    .DynamicContent-text {
      font-size: 16px;
      margin: 10px 10px;
    }
    .DynamicContent-img {
      width: 510px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .div-img {
        height: 150px;
        width: 150px;
        margin: 3px 10px;
        overflow: hidden;
        background-color: #d6d6d6a8;
        text-align: center;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        img {
          height: 100%;
          width: 100%;
          border-radius: 10px;
          object-fit: contain;
        }
      }
    }
    .DynamicContent-music {
      width: 350px;
      height: 70px;
      border-radius: 10px;
      box-shadow: 2px 2px 4px 1px #999;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .kaozuo {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        .music-l {
          cursor: pointer;
          .music-l-img {
            width: 70px;
            border-radius: 10px;
          }
        }
        .music-r {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 20px;
          cursor: pointer;
          .music-song {
            margin-top: 10px;
            font-size: 20px;
            font-weight: 600;
            white-space: nowrap; /* 禁止自动换行 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 当内容溢出容器时显示省略号 */
            width: 180px;
          }
          .music-singer {
            font-size: 14px;
            white-space: nowrap; /* 禁止自动换行 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 当内容溢出容器时显示省略号 */
            width: 200px;
            span{
              margin-right: 5px;
            }
          }
        }
      }
      .icon-bofnag-div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 20px;
        .my-icon {
          font-size: 40px;
          cursor: pointer;
        }
      }
    }
    .DynamicContent-shezhi {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .caozuo {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-left: 40px;
        .shezhi-box {
          font-size: 12px;
          width: 30px;
          height: 30px;
          border-radius: 25px;
          text-align: center;
          line-height: 35px;
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            background-color: #d1d1d194;
            border-radius: 15px;
          }
        }
      }
      .xiangqing {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        color: #999;
        font-size: 12px;
        .xiangqing-box {
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
