// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVurJn0d2QhRun8TC1vpyU6wXqVvLv3xI",
  authDomain: "astro-authentication-ef65c.firebaseapp.com",
  projectId: "astro-authentication-ef65c",
  storageBucket: "astro-authentication-ef65c.firebasestorage.app",
  messagingSenderId: "1021142421285",
  appId: "1:1021142421285:web:b9dcb634fb46ba350254cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
  app,
  auth,
};
