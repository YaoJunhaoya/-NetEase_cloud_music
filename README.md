# 仿网易云音乐 Vue 3 + Vite

## 介绍

仿网易云音乐 前端 Vue3+Vite+Router+Pinia

后端使用https://neteasecloudmusicapi.js.org/#/

网易云音乐 NodeJS 版 API 后端代码来自: https://github.com/Binaryify/NeteaseCloudMusicApi

## 会网络拥挤的接口

[歌曲评论](https://docs.neteasecloudmusicapi.binaryify.com/#/?id=%e6%ad%8c%e6%9b%b2%e8%af%84%e8%ae%ba) /comment/music

音乐url  /song/url/v1

## 需要完成

1.排行榜

    首页排行榜跳转
	排行榜，榜单 页面

2.歌词

    高亮显示根据播放器的歌曲（可以监视播放器当前的播放的时间）

    播放器里的歌曲列表中，点击歌曲后列表所有数据都重新获取，占用资源，通一个歌单就不用重新获取了

4.验证码登录

5.用户登录后界面

6.搜索

## BUG

首页点击播放器的列表详情 会被走马灯

播放器的歌词拖动后不能实时定位到需要的位置

首页排行榜上下翻页后，整体大小会变

播放器列表中换个后，高亮不会实时改变

登录后点击关闭无法正常关闭
