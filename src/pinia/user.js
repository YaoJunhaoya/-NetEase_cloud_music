import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', {
    state: () => ({
        token: "",
        uid:"1767320482"
    }),
    actions: {

    },
    getters: {

    },
})

export default useUserStore;