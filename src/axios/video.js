import requests from './axios'
// 获取相关视频内容
export const reqAlbumList = (id) => requests({ url: `/album?id=${id}`, method: 'get' });
