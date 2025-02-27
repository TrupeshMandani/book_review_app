// This is the fire base setup file to setup the login and authentication in the website
// app/utils/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signOut, // Import signOut function
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  db,
};
