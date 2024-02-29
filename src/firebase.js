import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCaA3DZwV-MXpcpVBNdJM9ieJQHa42JKoE',
  authDomain: 'walkdogs-5bd5e.firebaseapp.com',
  projectId: 'walkdogs-5bd5e',
  storageBucket: 'walkdogs-5bd5e.appspot.com',
  messagingSenderId: '664653741814',
  appId: '1:664653741814:web:aadd7b2d5de7f4194576d7',
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
