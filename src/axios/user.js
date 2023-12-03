import requests from './axios'

// ip地址
let realIP = "183.245.83.114"
const myCookie = "MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/feedback;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/clientlog;;__remember_me=true; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/feedback;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/openapi/clientlog;;__csrf=ee0adc8903ccad3295ce3124ce928017; Max-Age=1296010; Expires=Wed, 08 Nov 2023 07:58:50 GMT; Path=/;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/feedback;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/feedback;;MUSIC_U=0005FD4D6F513006DD127EB14768083C596A83DC49033ACA1D4393686A053EB825218DB97A77CF1A179E194F0AC11836A5C9A083D98B6CCC46A237DDB6989BE306CD41E91D434B0BE02E7614A291E71031CDEF8E5DCA376822CB6C3FD0001AF76868F9D6568FC535B1085D4013B57F1932D0A70D77D350570ECAFF90078F595E8A97B1BA4CEBDE0F46A4A41B0E949229C997C230CFEE44294B1AA2A5C1ED8B18E01D9BE341C9FB5252688F7F96B877F11E40C778A4E343C134A16F70C87774EC9D881D343C6913437FB2597277A73D06E718534650B9F358F3EDD4B1298B920B8D026F5D38EC57CEA76D41BD5702B663CA0E30EE15C4809A73C1A4F10833E8B3253A9658FA386AAFED5DB16F59232EE4763A59ACDCF42CF56341C384605F978B7F9CD8E430696784B03D358349BDB41C3FB6108E0006784A5B31BE2B6667ACB89AA0C2BCDA66C76B5080DE224F6EF9F434; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/clientlog;;NMTID=00OWudMoRjdMsVYNkaUkjLvMFujnmkAAAGLYLFlRA; Max-Age=315360000; Expires=Fri, 21 Oct 2033 07:58:40 GMT; Path=/;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 24 Oct 2023 07:58:40 GMT; Path=/"
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
export const reqUserAccount = (key) => requests({ url: `/user/account`, method: 'get' });








