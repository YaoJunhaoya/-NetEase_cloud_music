import { reqUserEvent } from "../axios/user";
// 传入所有用户的id 类型：数组
// 传出的数量默认为10个
// 对找到的数量按时间顺序排序
async function AllUserMoment(UserArr) {
  // 保存所以用户获取到的所有数据
  let AllUser = [];
  for (let element of UserArr) {
    const { data: a } = await reqUserEvent(element);
    AllUser = [...AllUser, ...a.events];
  }
//   console.log(AllUser);

// 对数组进行排序
  return AllUser.sort((a, b) =>  b.eventTime - a.eventTime );  ;
}

export default AllUserMoment;
