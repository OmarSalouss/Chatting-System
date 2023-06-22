import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB6tXmersyWat7mqnaM3ofJh547iuokFmw",
  authDomain: "finalchatsys.firebaseapp.com",
  projectId: "finalchatsys",
  storageBucket: "finalchatsys.appspot.com",
  messagingSenderId: "941480465314",
  appId: "1:941480465314:web:28849715b253d9acd958fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const provider = new GoogleAuthProvider();