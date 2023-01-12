// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTViAu_pUddUCegCKRJqAS9vs6H1vXMlg',
  authDomain: 'dnd-app-143f6.firebaseapp.com',
  projectId: 'dnd-app-143f6',
  storageBucket: 'dnd-app-143f6.appspot.com',
  messagingSenderId: '571811367307',
  appId: '1:571811367307:web:0d9615e67239ccebe1078e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
