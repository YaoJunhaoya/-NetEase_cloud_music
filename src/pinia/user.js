import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', {
    state: () => ({
        // 登录信息 用户的全部信息
        logState: JSON.parse(localStorage.getItem('logState')) || {},
        // 用户token（可能会弃用）
        token: localStorage.getItem('userToken') || "",
        // 用户id
        uid: localStorage.getItem('userUid') || "1767320482",  //自己id：1767320482 展示设置成自己的
        // 用户cookie
        myCookie: localStorage.getItem('myCookie') || "",
        // 账号信息
        myAccount: JSON.parse(localStorage.getItem('myAccount')) || {},
        // 用户信息 属性 资料
        myProfile: JSON.parse(localStorage.getItem('myProfile')) || {},

    }),
    actions: {
        // 把登录信息存储在本地
        userLogState(item = {}) {
            localStorage.setItem('logState', JSON.stringify(item))
            this.logState = item
        },
        // 把token信息存储在本地
        usetTokenToLocal(item = "") {
            localStorage.setItem('userToken', item)
            this.token = item
        },
        // 把uid信息存储在本地
        userUserUidToLocal(item = "") {
            localStorage.setItem('userUid', item)
            this.uid = item
        },
        // 把Cookie存储在本地
        usetCookieToLocal(item = "") {
            localStorage.setItem('myCookie', item)
            this.myCookie = item
        },
        // 把Account存储在本地
        usetAccountToLocal(item = {}) {
            localStorage.setItem('myAccount', JSON.stringify(item))
            this.myAccount = item
        },
        // 把Profile存储在本地
        usetProfileToLocal(item = {}) {
            localStorage.setItem('myProfile', JSON.stringify(item))
            this.myProfile = item
        },
        // 清除所有登录信息
        ClearLoginInformation() {
            this.userLogState()
            this.usetTokenToLocal()
            this.userUserUidToLocal()
            this.usetCookieToLocal()
            this.usetAccountToLocal()
            this.usetProfileToLocal()
        }
    },
    getters: {


    },
})

export default useUserStore;