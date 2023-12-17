import requests from './axios'
// 其他一些内容获取

// 国家编码列表
export const reqCountriesCode = () => requests({ url: `/countries/code/list`, method: 'get' });

// 获取动态消息
export const reqEvent = (pagesize=20,lasttime=-1) => requests({ url: `/event?pagesize=${pagesize}&lasttime=${lasttime}`, method: 'get' });

// 获取热门话题
export const reqTopic = (limit=20,offset) => requests({ url: `/hot/topic?limit=${limit}&offset=${offset}`, method: 'get' });
// 获取话题详情
export const reqTopicDetail = (actid) => requests({ url: `/topic/detail?actid=${actid}`, method: 'get' });
// 获取话题详情热门动态
export const reqTopicEventHot = (actid) => requests({ url: `/topic/detail/event/hot?actid=${actid}`, method: 'get' });

// 获取每日推荐歌曲
export const reqRecommendSongs = () => requests({ url: `/recommend/songs`, method: 'get' });





