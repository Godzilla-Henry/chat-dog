import db from 'src/boot/firebase';
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  updateDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { ILogin } from './type';

const getOtherUsers = async (myself: string) => {
  const q = query(collection(db, 'chatUsers'), where('name', '!=', myself));
  const result = [] as any;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return new Promise((resolve, reject) => {
    if (result.length > 0) {
      resolve({
        error: null,
        result: result,
        status: 'ok',
      }); // 如果成功，调用 resolve 并传递结果
    } else {
      reject({
        error: '獲取使用者資料時發生錯誤',
        result: null,
        status: 'failed',
      }); // 如果失败，调用 reject 并传递错误信息
    }
  });
};

const login = async (loginForm: ILogin) => {
  const q = query(
    collection(db, 'chatUsers'),
    where('name', '==', loginForm.name),
    where('password', '==', loginForm.password)
  );

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs);

  return new Promise((resolve, reject) => {
    if (querySnapshot.docs.length > 0) {
      const result = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      };
      resolve({
        error: null,
        result: result,
        status: 'ok',
      }); // 如果成功，调用 resolve 并传递结果
    } else {
      reject({
        error: '帳號密碼錯誤',
        result: null,
        status: 'failed',
      }); // 如果失败，调用 reject 并传递错误信息
    }
  });
};

const register = async (registerForm: any) => {
  const docRef = await addDoc(collection(db, 'chatUsers'), {
    name: registerForm.name,
    password: registerForm.password,
    phone: registerForm.phone,
    email: registerForm.email,
    address: '',
    describe: '',
  });

  return new Promise((resolve, reject) => {
    if (docRef.id) {
      const result = {
        id: docRef.id,
      };
      resolve({
        error: null,
        result: result,
        status: 'ok',
      }); // 如果成功，调用 resolve 并传递结果
    } else {
      reject({
        error: '註冊失敗',
        result: null,
        status: 'failed',
      }); // 如果失败，调用 reject 并传递错误信息
    }
  });
};

const editUserInfo = async (editForm: any) => {
  // Update
  const editItem = doc(db, 'chatUsers', editForm.id!);
  await updateDoc(editItem, {
    phone: editForm.phone,
    email: editForm.email,
    address: editForm.address,
    describe: editForm.describe,
  });
  // Get
  const docSnap = await getDoc(editItem);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!');
  }

  return new Promise((resolve, reject) => {
    if (docSnap.exists()) {
      const result = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      resolve({
        error: null,
        result: result,
        status: 'ok',
      }); // 如果成功，调用 resolve 并传递结果
    } else {
      reject({
        error: '編輯時發生錯誤',
        result: null,
        status: 'failed',
      }); // 如果失败，调用 reject 并传递错误信息
    }
  });
};

export { getOtherUsers, login, register, editUserInfo };
