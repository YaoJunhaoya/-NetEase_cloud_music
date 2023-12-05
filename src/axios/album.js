import requests from './axios'
// 获取专辑内容
export const reqAlbumList = (id) => requests({ url: `/album?id=${id}`, method: 'get' });
