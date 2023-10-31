import db from 'src/boot/firebase';
import { collection, addDoc } from 'firebase/firestore';

const sendMessage = async (message: any) => {
  const docRef = await addDoc(collection(db, 'chatMessage'), {
    sender: message.sender,
    receiver: message.receiver,
    content: message.content,
    datetime: message.datetime,
  });

  // return new Promise((resolve, reject) => {
  //   if (docRef.id) {
  //     const result = {
  //       id: docRef.id,
  //     };
  //     resolve({
  //       error: null,
  //       result: result,
  //       status: 'ok',
  //     }); // 如果成功，调用 resolve 并传递结果
  //   } else {
  //     reject({
  //       error: '註冊失敗',
  //       result: null,
  //       status: 'failed',
  //     }); // 如果失败，调用 reject 并传递错误信息
  //   }
  // });
};

export { sendMessage };
