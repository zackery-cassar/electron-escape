// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBXuOf3YopRnNEIw4dgw91_2DDRSVYEt_o",
  authDomain: "electron-escape.firebaseapp.com",
  projectId: "electron-escape",
  storageBucket: "electron-escape.firebasestorage.app",
  messagingSenderId: "702726138882",
  appId: "1:702726138882:web:1e76c0d10ede49c4d88b1b",
  measurementId: "G-5RBX1DMW8R"
});

export const db = getFirestore(firebaseConfig);