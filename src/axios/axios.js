import axios from "axios";

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"

const requests = axios.create({
    // baseURL: 'https://wang-yiyun-music-api.vercel.app', // 设置根路径 http://localhost:3000
    baseURL: 'http://localhost:3000', // 设置根路径 http://localhost:3000
    // baseURL: 'http://8144281bj8.zicp.fun:22958/', // 设置根路径 http://localhost:3000
    timeout: 5000,
    //这告诉服务器请求正文将发送为JSON格式。
    headers: {
        'Content-Type': 'application/json'
    }
    // 其他配置项...
});

// 添加请求拦截器  
requests.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 
        // console.log('发送了一次请求');
        // 进度条开始
        nprogress.start();
        return config;
    },
    (error) => {
        // 对请求错误做些什么  
        return Promise.reject(error);
    }
);

// 添加响应拦截器  
requests.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么  
        // console.log('响应拦截器一次');
        // 进度条结束
        nprogress.done();
        return response;
    },
    (error) => {
        // 对响应错误做点什么  
        return Promise.reject(error);
    }
);

//#region
// const ApiPlugin = {
//     install(app) {
//         app.config.globalProperties.$api = {
//             // 封装 GET 请求
//             get(url, params) {
//                 return apiClient.get(url, { params });
//             },
//             // 封装 POST 请求
//             post(url, data) {
//                 return apiClient.post(url, data);
//             },
//             // 其他请求方法...
//         };
//     },
// };
//#endregion

export default requests;
