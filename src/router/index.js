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
            component: () => import('../view/Home.vue')
        }, {
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
            path: '/songlistdetails',
            name: 'SongListDetails',
            component: SongListDetails,
            props: true
        },
        {
            path: '/rankinglist',
            name: "RanKingList",
            component: () => import("../view/RankingList.vue"),
            props:true
        }
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // 针对 Chrome 浏览器
    document.body.scrollTop = 0
    // 针对 Firefox 浏览器
    document.documentElement.scrollTop = 0
    next()
})

export default router;