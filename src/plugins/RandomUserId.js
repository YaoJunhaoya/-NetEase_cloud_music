import { reqRecommendSongs } from "../axios/Other";
import { reqSongComment } from "../axios/songListOrSong";

// 获取随机的用户id 数组
async function RandomUserId(amount = 10) {
  // 获取到数组用户id
  let usersId = await Bb(await Aa(), amount);
  return usersId;
  async function Aa() {
    const { data: a } = await reqRecommendSongs();
    //  随机数
    let suiji = Math.floor(Math.random() * (a.data.dailySongs.length + 1));
    return a.data.dailySongs[suiji].id;
  }
  // 根据歌曲找到评论的用户
  async function Bb(songId, amount) {
    const { data: a } = await reqSongComment(songId, amount);
    let UserId = a.comments.map((item) => item.user.userId);
    return UserId;
  }
}

export default RandomUserId;