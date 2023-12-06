import requests from './axios'

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
// 游客登录
export const reqAnonimous = () => requests({ url: `/register/anonimous?timestamp=${+ new Date()}&noCookie=true`, method: 'get' });
// 登录状态
export const reqUserLogState = () => requests({ url: `/login/status`, method: 'get' });
// 退出登录
export const reqUserLogOut = () => requests({ url: `/logout`, method: 'get' });
// 刷新登录状态
export const reqNewLogState = () => requests({ url: `/login/refresh`, method: 'get' });
// 获取用户播放记录
export const reqUserPlayRecord = (uid, type = 1) => requests({ url: `/user/record?uid=${uid}&type=${type}`, method: 'get' });
// 获取用户详情
export const reqUserDetails = (uid) => requests({ url: `/user/detail?uid=${uid}`, method: 'get' });

// 1. 二维码 key 生成接口
export const reqQrKey = () => requests({ url: `/login/qr/key?timestamp=${+ new Date()}&noCookie=true`, method: 'get' });
// 2. 二维码生成接口
export const reqQrCreate = (key) => requests({ url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${+ new Date()}&noCookie=true`, method: 'get' });
// 3. 二维码检测扫码状态接口
export const reqQrCheck = (key) => requests({ url: `/login/qr/check?key=${key}&timestamp=${+ new Date()}&noCookie=true`, method: 'get' });

// 获取账号信息
export const reqUserAccount = ( ) => requests({ url: `/user/account`, method: 'get' });
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const reqUserSubcount = ( ) => requests({ url: `/user/subcount`, method: 'get' });
// 获取用户等级信息
export const reqUserLevel = ( ) => requests({ url: `/user/level`, method: 'get' });
// 获取用户关注列表
export const reqUserFollows = (uid, limit=30, offset=0) => requests({ url: `/user/follows?uid=${uid}&limit=${limit}&offset=${offset}`, method: 'get' });
// 获取用户粉丝列表
export const reqUserFolloweds = (uid, limit = 30, offset = 0) => requests({ url: `/user/followeds?uid=${uid}&limit=${limit}&offset=${offset}`, method: 'get' });

// 获取 VIP 信息
export const reqVipInfo = (uid) => requests({ url: `/vip/info?uid=${uid}`, method: 'get' });
// 获取 VIP 信息(app端)
export const reqVipInfoV2 = (uid) => requests({ url: `/vip/info/v2?uid=${uid}`, method: 'get' });










