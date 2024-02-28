// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3lCdhFm5E92f_knxjYFduE-Ok9K3A2ZA",
    authDomain: "fir-988b5.firebaseapp.com",
    projectId: "fir-988b5",
    storageBucket: "fir-988b5.appspot.com",
    messagingSenderId: "890326384275",
    appId: "1:890326384275:web:153384e48318db19689766",
    measurementId: "G-7DPFY2LC9R"
  }

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);