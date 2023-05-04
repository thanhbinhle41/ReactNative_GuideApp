// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3ocAgwXqKXZ9FBlrmHhFKNJUBvX47Bbw",
  authDomain: "guide-app-6b862.firebaseapp.com",
  projectId: "guide-app-6b862",
  storageBucket: "guide-app-6b862.appspot.com",
  messagingSenderId: "306671209005",
  appId: "1:306671209005:web:ae45c4019291d680f786a4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
