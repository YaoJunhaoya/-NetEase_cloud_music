import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
    state: () => ({
        count: 10,
        sum: 100
    }),
    actions: {
        increment() {
            this.count++
        },
    },
    getters: {

    },
})

export default useCounterStore;