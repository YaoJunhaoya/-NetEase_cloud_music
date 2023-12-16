import requests from './axios'
// 其他一些内容获取

// 国家编码列表
export const reqCountriesCode = () => requests({ url: `/countries/code/list`, method: 'get' });
