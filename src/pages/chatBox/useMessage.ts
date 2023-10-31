import db from 'src/boot/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  and,
  or,
  orderBy,
  limit,
} from 'firebase/firestore';

const getMessageList = async (
  myself: any,
  toUser: any,
  messageList: Array<any>
) => {
  console.log(myself, toUser);
  const q = query(
    collection(db, 'chatMessage'),
    or(
      and(where('sender', '==', myself), where('receiver', '==', toUser)),
      and(where('sender', '==', toUser), where('receiver', '==', myself))
    ),
    orderBy('datetime')
  );
  const unsubscribe = await onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const data = change.doc.data();
      data.id = change.doc.id;
      if (change.type === 'added') {
        // console.log('New', data);
        messageList.push(data);
      }
      if (change.type === 'modified') {
        console.log('Modified');
        // let index = users.findIndex((item: any) => item.id === data.id);
        // Object.assign(users[index], data);
      }
      if (change.type === 'removed') {
        console.log('Removed', data);
        // let index = messageList.findIndex((item: any) => item.id === data.id);
        // console.log('Delete index: ', index);
        // messageList.splice(index, 1);
      }
    });
  });
};

// const login = async (loginForm: ILogin) => {
//   const q = query(
//     collection(db, 'chatUsers'),
//     where('name', '==', loginForm.name),
//     where('password', '==', loginForm.password)
//   );

//   const querySnapshot = await getDocs(q);
//   console.log(querySnapshot.docs);

//   return new Promise((resolve, reject) => {
//     if (querySnapshot.docs.length > 0) {
//       const result = {
//         id: querySnapshot.docs[0].id,
//         ...querySnapshot.docs[0].data(),
//       };
//       resolve({
//         error: null,
//         result: result,
//         status: 'ok',
//       }); // 如果成功，调用 resolve 并传递结果
//     } else {
//       reject({
//         error: '帳號密碼錯誤',
//         result: null,
//         status: 'failed',
//       }); // 如果失败，调用 reject 并传递错误信息
//     }
//   });
// };

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

// const editUserInfo = async (editForm: any) => {
//   // Update
//   const editItem = doc(db, 'chatUsers', editForm.id!);
//   await updateDoc(editItem, {
//     phone: editForm.phone,
//     email: editForm.email,
//     address: editForm.address,
//     describe: editForm.describe,
//   });
//   // Get
//   const docSnap = await getDoc(editItem);
//   if (docSnap.exists()) {
//     console.log('Document data:', docSnap.data());
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log('No such document!');
//   }

//   return new Promise((resolve, reject) => {
//     if (docSnap.exists()) {
//       const result = {
//         id: docSnap.id,
//         ...docSnap.data(),
//       };
//       resolve({
//         error: null,
//         result: result,
//         status: 'ok',
//       }); // 如果成功，调用 resolve 并传递结果
//     } else {
//       reject({
//         error: '編輯時發生錯誤',
//         result: null,
//         status: 'failed',
//       }); // 如果失败，调用 reject 并传递错误信息
//     }
//   });
// };

export { getMessageList, sendMessage };
