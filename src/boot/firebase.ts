// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBg0665H3AWv9eOIOneUxbNotV31p7xkY',
  authDomain: 'quasar-d59c5.firebaseapp.com',
  projectId: 'quasar-d59c5',
  storageBucket: 'quasar-d59c5.appspot.com',
  messagingSenderId: '750560357471',
  appId: '1:750560357471:web:ec5676302e4c505613ffea',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
