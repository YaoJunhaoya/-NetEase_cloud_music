import { defineStore } from 'pinia'

// 这里存的都是与播放器有关内容
const useCounterStore = defineStore('counterStore', {
    state: () => ({
        // 最后一次歌单的id
        songlistId: JSON.parse(localStorage.getItem('SongListId')) || "",
        // 最后一次浏览的歌曲id   歌曲详情的歌曲id
        lastSongId: JSON.parse(localStorage.getItem('SongId')) || "",
        // 最后一次播放器播放的id
        lastPlayerSongId: JSON.parse(localStorage.getItem('PlayerSongId')) || "202369",
        // 播放器里的播放列表
        playerSongList: JSON.parse(localStorage.getItem('PlayerSongList')) || [],
        // 搜索的内容(单个)
        lastSearchContent: JSON.parse(localStorage.getItem('SearchContent')) || "",
        // 历史记录(多个)
        SearchHistory: JSON.parse(localStorage.getItem('SearchHistory')) || [],

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
        },
        // 播放器里的播放列表存储在本地
        PlayerSongList(item) {
            localStorage.setItem('PlayerSongList', JSON.stringify(item))
            this.playerSongList = item
        },
        // 搜索内容存储在本地(单个)
        SearchContent(item) {
            localStorage.setItem('SearchContent', JSON.stringify(item))
            this.lastSearchContent = item
        },
        // 历史记录存储在本地(多个)
        StorageSearchHistory(item=[]) {
            localStorage.setItem('SearchHistory', JSON.stringify(item))
            this.SearchHistory = item
        },
    },
    getters: {

    },
})

export default useCounterStore;