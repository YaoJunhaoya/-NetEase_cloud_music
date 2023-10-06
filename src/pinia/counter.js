import { defineStore } from 'pinia'

const useCounterStore = defineStore('counterStore', {
    state: () => ({
        // 最后一次歌单的id
        songlistId: JSON.parse(localStorage.getItem('SongListId')) || "",
        // 最后一次浏览的歌曲id   歌曲详情的歌曲id
        lastSongId: JSON.parse(localStorage.getItem('SongId')) || "",
        // 最后一次播放器播放的id
        lastPlayerSongId: JSON.parse(localStorage.getItem('PlayerSongId')) || "202369"
    }),
    actions: {
        // 把歌单id存储在本地
        SongListIdToLocal(id = "") {
            localStorage.setItem('SongListId', JSON.stringify(id))
            this.songlistId = id

        },
        // 把最后一次浏览的歌曲id存储在本地
        SongIdToLocal(id = "") {
            localStorage.setItem('SongId', JSON.stringify(id))
            this.lastSongId = id

        },
        // 最后一次播放器播放的id存储在本地
        PlayerSongIdToLocal(id = "") {
            localStorage.setItem('PlayerSongId', JSON.stringify(id))
            this.lastPlayerSongId = id
        }
    },
    getters: {

    },
})

export default useCounterStore;