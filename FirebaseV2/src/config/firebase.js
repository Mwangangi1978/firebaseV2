// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXvmx-KF0tdX9kGQqbrGz41AnSETuO5wo",
  authDomain: "fir-v2-ce54f.firebaseapp.com",
  projectId: "fir-v2-ce54f",
  storageBucket: "fir-v2-ce54f.appspot.com",
  messagingSenderId: "828031274623",
  appId: "1:828031274623:web:412d9d8e3911fb9381394a",
  measurementId: "G-BDWL1QH59R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);