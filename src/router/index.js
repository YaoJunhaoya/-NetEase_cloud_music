import { createRouter, createWebHistory } from 'vue-router'

import Log from '../view/Log.vue'
import SongDetails from "../view/SongDetails.vue"
import SongListDetails from "../view/SongListDetails.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../view/Home.vue')
        },
        {
            path: '/home',
            name: "Home",
            component: () => import('../view/Home.vue')
        }, {
            // 登录页面
            path: '/log',
            component: Log
        }, {
            // 歌曲详情
            path: '/songdetails',
            name: 'SongDetails',
            component: SongDetails,
            props: true,
        },
        {
            // 歌曲详情+id
            path: '/songdetails/:songId',
            name: 'SongDetailsId',
            component: SongDetails,
            props: true,
        },
        {
            // 歌单详情
            path: '/songlistdetails/:songListId',
            name: 'SongListDetails',
            component: SongListDetails,
            props: true
        },
        {
            // 排行榜页面
            path: '/rankinglist',
            name: "RanKingList",
            component: () => import("../view/RankingList.vue"),
            props: true
        },
        {
            // 个人中心
            path: '/personal_center',
            name: "PersonalCenter",
            component: () => import("../view/PersonalCenter.vue"),
            props: true,
            children: [
                {
                    // 个人中心 首页
                    path: '',
                    component: () => import("../components/PersonalCenter/Home.vue"),
                    props: true
                },
                {
                    // 个人中心 首页
                    path: 'home',
                    name: "PersonalCenterHome",
                    component: () => import("../components/PersonalCenter/Home.vue"),
                    props: true
                },
                {
                    // 最近播放
                    path: 'recently_played',
                    name: "RecentlyPlayed",
                    component: () => import("../components/PersonalCenter/RecentlyPlayed.vue"),
                    props: true
                },
                {
                    // 我的喜欢
                    path: 'my_like',
                    name: "MyLike",
                    component: () => import("../components/PersonalCenter/MyLike.vue"),
                    props: true
                },
                {
                    // 我的歌单
                    path: 'my_songList',
                    name: "MySongList",
                    component: () => import("../components/PersonalCenter/MySongList.vue"),
                    props: true
                },
                {
                    // 云盘
                    path: 'cloud_disk',
                    name: "CloudDisk",
                    component: () => import("../components/PersonalCenter/CloudDisk.vue"),
                    props: true
                },
                {
                    // 已购单曲
                    path: 'purchase_song',
                    name: "PurchaseSong",
                    component: () => import("../components/PersonalCenter/PurchaseSong.vue"),
                    props: true
                },
                {
                    // 我的好友
                    path: 'my_good_friend',
                    name: "MyGoodFriend",
                    component: () => import("../components/PersonalCenter/MyGoodFriend.vue"),
                    props: true
                },
                {
                    // 动态页面
                    path: 'moment',
                    name: "Moment",
                    component: () => import("../components/PersonalCenter/Moment.vue"),
                    props: true
                },
            ]

        },

        {
            // 歌手页面
            path: '/singer/:singerId',
            name: "Singer",
            component: () => import("../view/Singer.vue"),
            props: true
        },
        {
            // 用户页面
            path: '/user/:userId',
            name: "User",
            component: () => import("../view/User.vue"),
            props: true
        },
        {
            // MV页面
            path: '/mv',
            name: "MV",
            component: () => import("../view/MV.vue"),
            props: true
        },

        {
            // 专辑页面
            path: '/collection/:id',
            name: "Collection",
            component: () => import("../view/Collection.vue"),
            props: true
        },
        {
            // 搜索页面
            path: '/search',
            name: "Search",
            component: () => import("../view/Search.vue"),
            props: true
        },
        {
            // 搜索页面
            path: '/VideoDetail/:Vid',
            name: "VideoDetail",
            component: () => import("../view/VideoDetail.vue"),
            props: true
        },

    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.name) {
        window.document.title = to.name
    } else {
        window.document.title = "仿网易云音乐"
    }
    // 针对 Chrome 浏览器
    document.body.scrollTop = 0
    // 针对 Firefox 浏览器
    document.documentElement.scrollTop = 0
    next()
})

export default router;