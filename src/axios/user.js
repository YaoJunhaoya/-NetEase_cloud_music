import requests from './axios'


// 
export const reqLogCode = (phone) => requests({ url: `/captcha/sent?phone=${phone}`, method: 'get' });
// 
export const reqLogState = () => requests({ url: '/login/status', method: 'get' });
// 退出登录
export const reqLogOut = () => requests({ url: '/logout', method: 'get' });
// 手机号登录
export const reqPhoneLog = (phone, password) => requests({ url: `/login/cellphone?phone=${phone}&password=${password}`, method: 'get' });
// 邮箱登录
export const reqEmailLog = (email, password) => requests({ url: `/login?email=${email}&password=${password}`, method: 'get' });
// 热门歌单分类
export const reqRemengGedan = () => requests({ url: '/playlist/hot', method: 'get' });
// 获取精品歌单
export const reqCompetitiveGedan = (sum,cat) => requests({ url: `/top/playlist/highquality?limit=${sum}&cat= ${cat}`, method: 'get' });
// 获取歌单详情 能获取歌单里的歌
export const reqSongListDetail = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'get' });
// 获取歌曲详情
export const reqSongDetail = (id) => requests({ url: `/song/detail?ids=${id}`, method: 'get' });











