import requests from './axios'

// 热门歌单分类
export const reqRemengGedan = () => requests({ url: '/playlist/hot', method: 'get' });
// 获取精品歌单
export const reqCompetitiveGedan = (sum, cat) => requests({ url: `/top/playlist/highquality?limit=${sum}&cat= ${cat}`, method: 'get' });
// 获取歌单详情 能获取歌单里的歌
export const reqSongListDetail = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'get' });
// 获取歌曲详情
export const reqSongDetail = (id) => requests({ url: `/song/detail?ids=${id}`, method: 'get' });
// 歌单评论  可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqSongListComment = (id, limit = 20, offset = 1) => requests({ url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' });
// 获取音乐 url
export const reqSongUrl = (id) => requests({ url: `/song/url?id=${id}`, method: 'get' });






