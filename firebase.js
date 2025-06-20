// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR8dFvc8jKyBoLBSQbxh5NytwyOVQKT1Q",
  authDomain: "tableapp-3c0d5.firebaseapp.com",
  projectId: "tableapp-3c0d5",
  storageBucket: "tableapp-3c0d5.firebasestorage.app",
  messagingSenderId: "129661315765",
  appId: "1:129661315765:web:eee8200912fd1b4b4b6cfc",
  measurementId: "G-Q5SMVP1HDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);