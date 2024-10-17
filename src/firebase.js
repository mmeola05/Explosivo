// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';  // Importa desde 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8I0VxmtdkSS8ShMnamOHrUEaBHYUEdSA",
  authDomain: "quedadas-fc454.firebaseapp.com",
  databaseURL: "https://quedadas-fc454-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quedadas-fc454",
  storageBucket: "quedadas-fc454.appspot.com",
  messagingSenderId: "952662171024",
  appId: "1:952662171024:web:2de91b619b88b3b01c6715",
  measurementId: "G-9ENPZ5H423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };