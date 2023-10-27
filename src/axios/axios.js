import axios from "axios";

// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"

const myCookie = "MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Mon, 23 Oct 2023 11:57:30 GMT; Path=/;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/feedback;;__csrf=2c536310ae848db75708d55c313485c4; Max-Age=1296010; Expires=Tue, 07 Nov 2023 11:57:40 GMT; Path=/;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/openapi/clientlog;;__remember_me=true; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/;;NMTID=00O3oKmTtUbeE6uzUXkpsOWJ2t76UEAAAGLXGWxnw; Max-Age=315360000; Expires=Thu, 20 Oct 2033 11:57:30 GMT; Path=/;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/openapi/clientlog;;MUSIC_U=0053AB23B441CFEE606C5699A41DD4B56C14F8F9395EA0B0873DE856E2E0BE92316C1D0BD0C0DDF639A1F829736ACDF25F649F5CD700113225B4F2DEE9761F1BE3382E888D7A3AF0A09F21968FA81CBED642B349864AAD8063AE711A7DA6D8AC91DC57093E597A454C5D533F1E67FE33CC227E7391D641A0358ACDC133A617F7883EDC84C09656B6CF20E137E4F08EFDF4DB3C6A9E5ABAEFE76DD1D5C993C0778ACCAEDF97A18084DCC52ABB6AD65DE9D97BE27EF2AECCF39DB49AD5B6A7CEA447B5FCAFF082A39E2EB2CD25421749B3199A9D3313D0B0F989014509F8AD637525888902CC8833145A46DE5365001DBF445DE6BDE0468A3D951CFF6CD9A3643F175168327AB3ECEBD4F4B97072060FF36875C78B307E131B0604C8E1FF96B507290C5CB3FAA641644546D55964E22CCE4003CF10D3DAC683891A44E60BD2C1BD18B0B7AD70EA887EBB190F02EE1CFEF7C7; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/clientlog;"

const myUrl = {
    a: 'http://localhost:3000',//测试gitee上传gitee
    b: 'http://8144281bj8.zicp.fun:22958/',//贝锐花生壳 内网穿透 
    c: 'https://my-fork-netease-cloud-music-api-vercel-yaojunhaoya.vercel.app/',//vercel的第一个接口（第一第二内容相同的）
    d: 'https://my-fork-netease-cloud-music-api-vercel-git-master-yaojunhaoya.vercel.app/',//vercel的第二个接口（第一第二内容相同的）
    e: 'http://wyapi.sa00.cn/',//网友api
    f: 'http://203.195.129.93:3000/banner',//网友api
    g: 'https://music.thankmm.com/',//网友api
}

const requests = axios.create({
    baseURL: myUrl.e, // 设置根路径 http://localhost:3000
    timeout: 5000,
    //这告诉服务器请求正文将发送为JSON格式。
    headers: {
        'Content-Type': 'application/json',
        // 'Cookie': myCookie
    },
    // 在跨域请求时，允许携带敏感信息，如cookie、HTTP认证信息等
    withCredentials: true
    // 其他配置项...
});

// 添加请求拦截器  
requests.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // config.headers["token"] = "123";
        // config.url += "&cookie=" + "MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Mon, 23 Oct 2023 11:57:30 GMT; Path=/;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/feedback;;__csrf=2c536310ae848db75708d55c313485c4; Max-Age=1296010; Expires=Tue, 07 Nov 2023 11:57:40 GMT; Path=/;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/openapi/clientlog;;__remember_me=true; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/;;NMTID=00O3oKmTtUbeE6uzUXkpsOWJ2t76UEAAAGLXGWxnw; Max-Age=315360000; Expires=Thu, 20 Oct 2033 11:57:30 GMT; Path=/;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/feedback;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/feedback;;MUSIC_R_T=1641904771466; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/api/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/openapi/clientlog;;MUSIC_U=0053AB23B441CFEE606C5699A41DD4B56C14F8F9395EA0B0873DE856E2E0BE92316C1D0BD0C0DDF639A1F829736ACDF25F649F5CD700113225B4F2DEE9761F1BE3382E888D7A3AF0A09F21968FA81CBED642B349864AAD8063AE711A7DA6D8AC91DC57093E597A454C5D533F1E67FE33CC227E7391D641A0358ACDC133A617F7883EDC84C09656B6CF20E137E4F08EFDF4DB3C6A9E5ABAEFE76DD1D5C993C0778ACCAEDF97A18084DCC52ABB6AD65DE9D97BE27EF2AECCF39DB49AD5B6A7CEA447B5FCAFF082A39E2EB2CD25421749B3199A9D3313D0B0F989014509F8AD637525888902CC8833145A46DE5365001DBF445DE6BDE0468A3D951CFF6CD9A3643F175168327AB3ECEBD4F4B97072060FF36875C78B307E131B0604C8E1FF96B507290C5CB3FAA641644546D55964E22CCE4003CF10D3DAC683891A44E60BD2C1BD18B0B7AD70EA887EBB190F02EE1CFEF7C7; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/;;MUSIC_A_T=1641904771339; Max-Age=2147483647; Expires=Sat, 10 Nov 2091 15:11:37 GMT; Path=/weapi/clientlog;"

        // console.log('发送了一次请求', config);
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
