// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBR8dFvc8jKyBoLBSQbxh5NytwyOVQKT1Q",
  authDomain: "tableapp-3c0d5.firebaseapp.com",
  projectId: "tableapp-3c0d5",
  storageBucket: "tableapp-3c0d5.firebasestorage.app",
  messagingSenderId: "129661315765",
  appId: "1:129661315765:web:eee8200912fd1b4b4b6cfc",
  measurementId: "G-Q5SMVP1HDX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
