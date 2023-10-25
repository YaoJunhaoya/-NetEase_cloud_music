import requests from './axios'

// 时间戳
var now = new Date();
var timestamp = now.getTime();
// ip地址
let realIP = "183.245.83.114"

// 
export const reqLogCode = (phone) => requests({ url: `/captcha/sent?phone=${phone}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 
export const reqLogState = () => requests({ url: `/login/status&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 退出登录
export const reqLogOut = () => requests({ url: `/logout&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 手机号登录
export const reqPhoneLog = (phone, password) => requests({ url: `/login/cellphone?phone=${phone}&password=${password}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 手机验证码登录
export const reqPhoneCodeLog = (phone, captcha) => requests({ url: `/login/cellphone?phone=${phone}&captcha=${captcha}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 发送验证码
export const reqSendPhoneCodeLog = (phone) => requests({ url: `/captcha/sent?phone=${phone}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 邮箱登录
export const reqEmailLog = (email, password) => requests({ url: `/login?email=${email}&password=${password}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 登录状态
export const reqUserLogState = () => requests({ url: `/login/status?&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 退出登录
export const reqUserLogOut = () => requests({ url: `/logout?timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 刷新登录状态
export const reqNewLogState = () => requests({ url: `/login/refresh?timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 获取用户播放记录
export const reqUserPlayRecord = (uid, type = 1) => requests({ url: `/user/record?uid=${uid}&type=${type}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });
// 获取用户详情
export const reqUserDetails = (uid) => requests({ url: `/user/detail?uid=${uid}&timestamp=${timestamp}&realIP=${realIP}`, method: 'get' });









