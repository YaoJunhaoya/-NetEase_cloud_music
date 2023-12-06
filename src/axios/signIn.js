import requests from './axios'



//签到  type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
export const reqDailySignin = (type = 0) => requests({ url: `/daily_signin?type=${type} `, method: 'get' });
//乐签信息
export const reqHappyInfo = () => requests({ url: `/sign/happy/info`, method: 'get' });
//云贝签到
export const reqYunbeiSignin = () => requests({ url: `/yunbei/sign`, method: 'get' });
//云贝签到信息
export const reqYunbeiInfo = () => requests({ url: `/yunbei/info`, method: 'get' });

