// 歌曲播放方法 需要传入歌曲id 并且加入播放列表
import { ref } from 'vue'
import emitter from "../Bus.js";
import useCounterStore from "../../pinia/counter.js"
// Pinia仓库
const counterStore = useCounterStore();

// 播放单曲歌曲
function PlaySong(SongId) {
  counterStore.PlayerSongIdToLocal(SongId);
  getSongList(SongId);
  emitter.emit("SongDetailsPlay");
}

// 获取歌单id，把歌单添加到播放器
function getSongList(id) {
    // 获取本地PlayerSongList的数据
    let arr = ref(counterStore.playerSongList);
  
    // 判断里面有没有这个歌曲id了
    if (!arr.value.includes(id)) {
      // 获取列表 第一项是歌曲就添加歌曲 不是歌曲就变成歌曲
      if (arr.value[0] != "歌曲") {
        arr.value = [];
        arr.value.push("歌曲");
        arr.value.push(id);
      } else {
        arr.value.push(id);
      }
    }
  
    // 上传到本地
    counterStore.PlayerSongList(arr.value);
  }

export default PlaySong;
