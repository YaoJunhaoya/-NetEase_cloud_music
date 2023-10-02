import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
    state: () => ({
        // 最后一次浏览的歌单
        lastSongList: JSON.parse(localStorage.getItem('SongList'))||{} ,
        // 最后一次浏览的歌曲
        lastSong: {},
    }),
    actions: {
        // 把歌单信息存储在本地
        SongListToLocal(item = {}) {
            localStorage.setItem('SongList', JSON.stringify(item))
        }
    },
    getters: {

    },
})

export default useCounterStore;