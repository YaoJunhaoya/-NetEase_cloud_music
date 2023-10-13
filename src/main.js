import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import router from './router/index'

import { createPinia } from "pinia";
const pinia = createPinia()

import axios from "./axios/axios";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 1. 引入你需要的组件
import vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);
app.use(router)
app.use(pinia)
app.config.globalProperties.$http = axios;
app.use(ElementPlus)
app.use(vant)


app.mount('#app')
