// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyB0ocINvuyUb9p_zPjkWM7tzpk1ruqtq1Y",
  authDomain: "profilehb.firebaseapp.com",
  projectId: "profilehb",
  storageBucket: "profilehb.appspot.com", // <-- Fixed typo here
  messagingSenderId: "351633837765",
  appId: "1:351633837765:web:e534ade2b0d835c2d6eaac",
  measurementId: "G-0GBQWRN0FH"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleprovider = new GoogleAuthProvider();
// export const analytics = getAnalytics(app); // Optional