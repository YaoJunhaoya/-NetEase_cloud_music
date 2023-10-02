import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import router from './router/index'

import { createPinia } from "pinia";
const pinia = createPinia()

import axios from "./axios/axios";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(router)
app.use(pinia)
app.config.globalProperties.$http = axios;
app.use(ElementPlus)


app.mount('#app')
