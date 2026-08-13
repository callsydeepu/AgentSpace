// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-d4c7b.firebaseapp.com",
  projectId: "cortexai-d4c7b",
  storageBucket: "cortexai-d4c7b.firebasestorage.app",
  messagingSenderId: "515229931042",
  appId: "1:515229931042:web:967ca6297508f0b02a1c7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()