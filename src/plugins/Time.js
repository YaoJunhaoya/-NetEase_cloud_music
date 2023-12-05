
const changeTime = function (data, type = 0) {

    // 定义时间戳  
    let timestamp = data;

    // 创建新的 Date 对象，使用时间戳作为参数（以毫秒为单位）  
    let date = new Date(timestamp);

    // 获取年份  
    let year = date.getFullYear();

    // 获取月份（注意，月份是从0开始的，所以需要加1）  
    let month = date.getMonth() + 1;
    // 如果月份小于10，前面补0  
    if (month < 10) {
        month = '0' + month;
    }

    // 获取日期  
    let day = date.getDate();
    // 如果日期小于10，前面补0  
    if (day < 10) {
        day = '0' + day;
    }

    // 获取小时、分钟和秒  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // 如果小时、分钟或秒小于10，前面补0  
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    // 组合年月日格式  
    let formattedDate = "";

    if (type == 0) {
        // 年/月/日
        formattedDate = `${year}/${month}/${day}`;
    } else if (type == 1) {
        // 年/月/日 时：分 
        formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
    } else if (type == 2) {
        // 年/月/日 时：分：秒
        formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    } else if (type == 3) {
        //  月/日 
        formattedDate = ` ${month}/${day}`;
    }

    return formattedDate;
}

export default changeTime;