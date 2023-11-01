import db from 'src/boot/firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const sendMessage = async (message: any) => {
  const docRef = await addDoc(collection(db, 'chatMessage'), {
    sender: message.sender,
    receiver: message.receiver,
    content: message.content,
    datetime: message.datetime,
    isRead: false,
  });
};

const readMessages = async () => {
  // Get 未讀訊息
  const q = await query(
    collection(db, 'chatMessage'),
    where('isRead', '==', false)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (message) => {
    // Update
    const editItem = doc(db, 'chatMessage', message.id!);
    await updateDoc(editItem, {
      isRead: true,
    });
  });
};

export { sendMessage, readMessages };
