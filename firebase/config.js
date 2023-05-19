import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrrly-AGk60yZzKcSrajjnykFxBS8GdTI",
  authDomain: "rn-social-c5397.firebaseapp.com",
  projectId: "rn-social-c5397",
  storageBucket: "rn-social-c5397.appspot.com",
  messagingSenderId: "767062757969",
  appId: "1:767062757969:web:d1ce0cb67c860b62085e70",
  measurementId: "G-G11T48TFS6",
};

export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

export const db = getFirestore(app);
// export const storage = getStorage(app);
