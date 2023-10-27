import requests from './axios'

// 时间戳
var timestamp = + new Date();
// ip地址
let realIP = "183.245.83.114"
async function getIP() {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    realIP = data.query;
    return realIP;
}
getIP().then(() => console.log(realIP));

// 
export const reqLogCode = (phone) => requests({ url: `/captcha/sent?phone=${phone}`, method: 'get' });
// 
export const reqLogState = () => requests({ url: `/login/status`, method: 'get' });
// 退出登录
export const reqLogOut = () => requests({ url: `/logout`, method: 'get' });
// 手机号登录
export const reqPhoneLog = (phone, password) => requests({ url: `/login/cellphone?phone=${phone}&password=${password}`, method: 'get' });
// 手机验证码登录
export const reqPhoneCodeLog = (phone, captcha) => requests({ url: `/login/cellphone?phone=${phone}&captcha=${captcha}`, method: 'get' });
// 发送验证码
export const reqSendPhoneCodeLog = (phone) => requests({ url: `/captcha/sent?phone=${phone}`, method: 'get' });
// 邮箱登录
export const reqEmailLog = (email, password) => requests({ url: `/login?email=${email}&password=${password}`, method: 'get' });
// 登录状态
export const reqUserLogState = () => requests({ url: `/login/status?`, method: 'get' });
// 退出登录
export const reqUserLogOut = () => requests({ url: `/logout`, method: 'get' });
// 刷新登录状态
export const reqNewLogState = () => requests({ url: `/login/refresh`, method: 'get' });
// 获取用户播放记录
export const reqUserPlayRecord = (uid, type = 1) => requests({ url: `/user/record?uid=${uid}&type=${type}`, method: 'get' });
// 获取用户详情
export const reqUserDetails = (uid) => requests({ url: `/user/detail?uid=${uid}`, method: 'get' });









