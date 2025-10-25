// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mayan-ai-647.firebaseapp.com",
  projectId: "mayan-ai-647",
  storageBucket: "mayan-ai-647.firebasestorage.app",
  messagingSenderId: "857661524579",
  appId: "1:857661524579:web:8622ee55e3d5891eb9c656",
  measurementId: "G-4DB3QZQBG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app, 'all-ai-chat')