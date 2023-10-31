import requests from './axios'

// 时间戳
var now = new Date();
var timestamp = now.getTime();
// ip地址
let realIP = "183.245.83.114"//183.245.83.114
const myCookie = "MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/feedback;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/clientlog;;__remember_me=true; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/feedback;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/openapi/clientlog;;__csrf=ee0adc8903ccad3295ce3124ce928017; Max-Age=1296010; Expires=Wed, 08 Nov 2023 07:58:50 GMT; Path=/;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/feedback;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/api/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/wapi/feedback;;MUSIC_U=0005FD4D6F513006DD127EB14768083C596A83DC49033ACA1D4393686A053EB825218DB97A77CF1A179E194F0AC11836A5C9A083D98B6CCC46A237DDB6989BE306CD41E91D434B0BE02E7614A291E71031CDEF8E5DCA376822CB6C3FD0001AF76868F9D6568FC535B1085D4013B57F1932D0A70D77D350570ECAFF90078F595E8A97B1BA4CEBDE0F46A4A41B0E949229C997C230CFEE44294B1AA2A5C1ED8B18E01D9BE341C9FB5252688F7F96B877F11E40C778A4E343C134A16F70C87774EC9D881D343C6913437FB2597277A73D06E718534650B9F358F3EDD4B1298B920B8D026F5D38EC57CEA76D41BD5702B663CA0E30EE15C4809A73C1A4F10833E8B3253A9658FA386AAFED5DB16F59232EE4763A59ACDCF42CF56341C384605F978B7F9CD8E430696784B03D358349BDB41C3FB6108E0006784A5B31BE2B6667ACB89AA0C2BCDA66C76B5080DE224F6EF9F434; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/;;MUSIC_A_T=1550468032267; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/eapi/feedback;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1550468094398; Max-Age=2147483647; Expires=Sun, 11 Nov 2091 11:12:47 GMT; Path=/weapi/clientlog;;NMTID=00OWudMoRjdMsVYNkaUkjLvMFujnmkAAAGLYLFlRA; Max-Age=315360000; Expires=Fri, 21 Oct 2033 07:58:40 GMT; Path=/;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 24 Oct 2023 07:58:40 GMT; Path=/"

// 热门歌单分类
export const reqRemengGedan = () => requests({ url: `/playlist/hot`, method: 'get' });
// 获取精品歌单
export const reqCompetitiveGedan = (sum, cat) => requests({ url: `/top/playlist/highquality?limit=${sum}&cat= ${cat}`, method: 'get' });
// 获取歌单详情 能获取歌单里的歌
export const reqSongListDetail = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'get' });
// 获取歌曲详情
export const reqSongDetail = (id) => requests({ url: `/song/detail?ids=${id}`, method: 'get' });
// 歌单评论  可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqSongListComment = (id, limit = 20, offset = 1) => requests({ url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' });
// 歌曲评论  可选参数 : limit: 取出评论数量 , 默认为 20 ,offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqSongComment = (id, limit = 20, offset = 1) => requests({ url: `/comment/music?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' });
// 获取音乐 url
export const reqSongUrl = (id) => requests({ url: `/song/url/v1?id=${id}&level=standard`, method: 'get' });
// 获取歌词
export const reqLyric = (id) => requests({ url: `/lyric?id=${id}`, method: 'get' });
// 所有榜单
export const reqToplist = () => requests({ url: `/toplist`, method: 'get' });






