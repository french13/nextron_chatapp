import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAijPukM3VZRkYScOibt_DsFaQQJm8H4u8",
  authDomain: "nextjs-chat-c41dc.firebaseapp.com",
  projectId: "nextjs-chat-c41dc",
  storageBucket: "nextjs-chat-c41dc.appspot.com",
  messagingSenderId: "268415902854",
  appId: "1:268415902854:web:c1bd10582683e89a271d07"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()