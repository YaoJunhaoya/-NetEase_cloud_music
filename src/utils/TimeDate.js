// 毫秒转具体分钟
export const formattedTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 1000) / 60;
  return minutes.toFixed(2).replace(/\./g, ':'); // 保留两位小数  
}
