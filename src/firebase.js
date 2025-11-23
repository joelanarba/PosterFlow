// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Config
const firebaseConfig = {
  apiKey: "AIzaSyADDfkHaTkodCYwI2PwVD54Hu5HgsaOB6k",
  authDomain: "posterflow-id.firebaseapp.com",
  projectId: "posterflow-id",
  storageBucket: "posterflow-id.firebasestorage.app",
  messagingSenderId: "235188106188",
  appId: "1:235188106188:web:b53324a35b3b5dcf6f6369",
  measurementId: "G-8LZL9JFDXS",
};

// Initialize App
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);