import { createRouter, createWebHistory } from 'vue-router'

import Home from '../view/Home.vue'
import Log from '../view/Log.vue'
import SongDetails from "../view/SongDetails.vue"
import SongListDetails from "../view/SongListDetails.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/home',
            component: Home
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