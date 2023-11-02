import { defineStore } from 'pinia'

// 这里存的都是歌曲有关
const useSongStore = defineStore('songStore', {
    state: () => ({
        // 存储所有排行榜
        allRankingList: JSON.parse(localStorage.getItem('allRankingList')) || [],
    }),
    actions: {
        // 把歌单id存储在本地
        allRankingListToLocal(item = []) {
            localStorage.setItem('allRankingList', JSON.stringify(item))
            this.allRankingList = item
        }
    },
    getters: {
        // 排行榜前四名
        allRankingListFirstFour(state) {
            let arr = state.allRankingList.splice(0, 4)
            return arr;
        },
        

    },
})

export default useSongStore;