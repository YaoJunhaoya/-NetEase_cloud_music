<template>
  <!-- 导航条 -->

  <div class="nav">
    <!-- 图标 -->
    <div class="music-iocn">
      <img
        src="https://img1.baidu.com/it/u=1003401282,2815738756&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      />
      <span>网易云音乐</span>
    </div>
    <!-- 栏目 -->
    <div class="lanmu">
      <div>发现音乐</div>
      <div>我的音乐</div>
      <div>关注</div>
      <div>排行榜</div>
      <div>音乐人</div>
    </div>

    <!-- 手机的栏目 -->
    <div class="lanmu-phone">
      <svg class="icon lanmu-icon" aria-hidden="true">
        <use xlink:href="#icon-zhanshi"></use>
      </svg>
    </div>

    <!-- 搜索 -->
    <div class="sousuo">
      <!-- 搜索图标 -->
      <svg class="icon sousuo-icon" aria-hidden="true">
        <use xlink:href="#icon-a-021_sousuo"></use>
      </svg>
      <!-- 搜索框 -->
      <input type="text" class="sousuo-input" />
    </div>
    <!-- 我的 -->
    <div class="my">
      <img
        src="https://img0.baidu.com/it/u=4275172878,2244226890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@breakpoint-medium: 1200px; //网页样式会变了
@breakpoint-small: 900px; //手机大小

// 大屏幕
@media (min-width: @breakpoint-medium) {
  .nav {
    height: 70px;
    width: 100%;
    background-color: #333;
    display: flex;
    //   padding: 0 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .music-iocn {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      background-color: transparent;
      color: white;
      width: 150px;
      font-size: 20px;
      padding: 0 50px 0 50px;

      img {
        width: 30px;
        border-radius: 50%;
      }
    }

    .font-iocn {
      color: #cecece;
    }

    .lanmu {
      display: flex;
      height: 70px;
      font-size: 20px;
      color: white;

      div {
        //   margin: 0 20px;
        width: 100px;
        text-align: center;
        height: 70px;
        line-height: 70px;
      }
    }

    .lanmu-phone {
      display: none;
    }

    .sousuo {
      width: 250px;
      background-color: rgb(228, 228, 228);
      height: 30px;
      border-radius: 10px;
      position: relative;
      .sousuo-icon {
        font-size: 30px;
        position: absolute;
        top: 0;
        left: 0px;
      }
      .sousuo-input {
        position: absolute;
        top: 0;
        left: 40px;
        height: calc(30px - 2px);
        width: 250px;
        border: 1px solid rgb(228, 228, 228);
        background-color: rgb(228, 228, 228);
      }
    }

    .my {
      width: 50px;
      height: 50px;
      padding: 0 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
      }
    }
  }
}

// 中等屏幕
@media (min-width: @breakpoint-small) and (max-width: @breakpoint-medium) {
  .nav {
    height: 70px;
    width: 100%;
    background-color: #333;
    display: flex;
    //   padding: 0 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .music-iocn {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      background-color: transparent;
      color: white;
      width: 150px;
      font-size: 10px;
      padding: 0 20px;

      img {
        width: 30px;
        border-radius: 50%;
      }
    }

    .font-iocn {
      color: #cecece;
    }

    .lanmu {
      display: flex;
      height: 70px;
      font-size: 15px;
      color: white;

      div {
        //   margin: 0 20px;
        width: 70px;
        text-align: center;
        height: 70px;
        line-height: 70px;
      }
    }

    .lanmu-phone {
      display: none;
    }

    .sousuo {
      width: 150px;
      background-color: rgb(228, 228, 228);
      height: 30px;
      border-radius: 10px;
      position: relative;
      .sousuo-icon {
        font-size: 30px;
        position: absolute;
        top: 0;
        left: 0px;
      }
      .sousuo-input {
        position: absolute;
        top: 0;
        left: 40px;
        height: calc(30px - 2px);
        width: 150px;
        border: 1px solid rgb(228, 228, 228);
        background-color: rgb(228, 228, 228);
      }
    }

    .my {
      width: 50px;
      height: 50px;
      padding: 0 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
      }
    }
  }
}

// 小屏幕
@media (max-width: @breakpoint-small) {
  .nav {
    height: 70px;
    width: 100%;
    background-color: #333;
    display: flex;
    //   padding: 0 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .music-iocn {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      background-color: transparent;
      color: white;
      width: 20px;
      font-size: 0px;
      padding: 0 0 0 10px;

      img {
        width: 20px;
        border-radius: 50%;
      }
    }

    .font-iocn {
      color: #cecece;
    }

    .lanmu {
      display: flex;
      height: 70px;
      font-size: 10px;
      color: white;
      display: none;

      div {
        width: 50px;
        text-align: center;
        height: 70px;
        line-height: 70px;
        padding: 0 5px;
      }
    }

    .lanmu-phone {
      .lanmu-icon {
        font-size: 30px;
        color: #d1bfbf;
      }
    }

    .sousuo {
      width: 100px;
      background-color: rgb(228, 228, 228);
      height: 30px;
      border-radius: 10px;
      position: relative;
      .sousuo-icon {
        font-size: 30px;
        position: absolute;
        top: 0;
        left: 0px;
      }
      .sousuo-input {
        position: absolute;
        top: 0;
        left: 40px;
        height: calc(30px - 2px);
        width: 50px;
        border: 1px solid rgb(228, 228, 228);
        background-color: rgb(228, 228, 228);
      }
    }

    .my {
      width: 50px;
      height: 50px;
      padding: 0 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
      }
    }
  }
}
</style>