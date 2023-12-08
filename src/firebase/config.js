// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx3p3CFQv2t6J1vPkeGrwFI03Hy_GEonE",
  authDomain: "test-be7e2.firebaseapp.com",
  projectId: "test-be7e2",
  storageBucket: "test-be7e2.appspot.com",
  messagingSenderId: "561739787688",
  appId: "1:561739787688:web:a7e692c0d47898e729019d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
