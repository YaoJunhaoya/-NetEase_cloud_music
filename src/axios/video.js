import requests from './axios'
// 获取相关视频内容
export const reqAlbumList = (id) => requests({ url: `/album?id=${id}`, method: 'get' });
// 视频(搜索的是MV)详细
export const reqVideoDetail=(id)=>requests({url:`/mv/detail?mvid=${id}`,method:'post'})
// mv 视频播放地址
export const reqMvVideo=(id)=>requests({url:`mv/url?id=${id}`,method:'post'})
