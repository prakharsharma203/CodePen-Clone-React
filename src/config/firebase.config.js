import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5-7p46tuHUap7B0U93sMByktGqKNtgvE",
  authDomain: "codepen-26e09.firebaseapp.com",
  projectId: "codepen-26e09",
  storageBucket: "codepen-26e09.appspot.com",
  messagingSenderId: "23549980968",
  appId: "1:23549980968:web:71c8ce35ca018ade29a01d"
};

let app;
if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Error initializing Firebase app:", error);
  }
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
