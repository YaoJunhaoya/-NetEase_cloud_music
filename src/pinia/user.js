import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', {
    state: () => ({
        // 登录信息
        logState: JSON.parse(localStorage.getItem('logState')) || {},
        // 用户token
        token: localStorage.getItem('userToken') || "",
        // 用户id
        uid: "1767320482" || localStorage.getItem('userUid') //自己id：1767320482 展示设置成自己的
    }),
    actions: {
        // 把token信息存储在本地
        usetTokenToLocal(item = "") {
            localStorage.setItem('userToken', item)
        },
        // 把登录信息存储在本地
        userLogState(item = {}) {
            localStorage.setItem('logState', JSON.stringify(item))
        },
        // 把uid信息存储在本地
        userUserUidToLocal(item = "") {
            localStorage.setItem('userUid', item)
        },
    },
    getters: {

    },
})

export default useUserStore;