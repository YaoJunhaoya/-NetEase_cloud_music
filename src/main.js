import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router/index";

import { createPinia } from "pinia";
const pinia = createPinia();

import axios from "./axios/axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 1. 引入你需要的组件
import vant from "vant";
// 2. 引入组件样式
import "vant/lib/index.css";

// main.js 文件
import VueLazyload from "vue-lazyload";

import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

// img元素上使用v-lazy="src";<img v-lazy="showImage"/>
const app = createApp(App);
app.use(router);
app.use(pinia);
app.config.globalProperties.$http = axios;
app.use(ElementPlus);
app.use(vant);
window.document.title = "仿网易云音乐";

// 配置项
const loadimage =
  "https://img0.baidu.com/it/u=2316172803,2733469627&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
app.use(VueLazyload, {
  preLoad: 1.3, //预加载的宽高比
  loading: loadimage, //图片加载状态下显示的图片
  // error: errorimage, //图片加载失败时显示的图片
  attempt: 1, // 加载错误后最大尝试次数
});

app.use(VueViewer, {
  Options: {
    // 自定义默认配置
    inline: true,
    button: true, //右上角按钮
    navbar: true, //底部缩略图
    title: true, //当前图片标题
    toolbar: true, //底部工具栏
    tooltip: true, //显示缩放百分比
    movable: true, //是否可以移动
    zoomable: true, //是否可以缩放
    rotatable: true, //是否可旋转
    scalable: true, //是否可翻转
    transition: true, //使用 CSS3 过度
    fullscreen: true, //播放时是否全屏
    keyboard: true, //是否支持键盘
    url: "data-source",
  },
});

app.mount("#app");
