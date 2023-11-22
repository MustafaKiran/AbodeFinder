import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC81Sxk_z7QHp30rYXVabb_OiL-1Bk9aNs",
  authDomain: "abodefinder-5b042.firebaseapp.com",
  projectId: "abodefinder-5b042",
  storageBucket: "abodefinder-5b042.appspot.com",
  messagingSenderId: "179760300289",
  appId: "1:179760300289:web:d1ac8adacd4a427c789b00"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);




