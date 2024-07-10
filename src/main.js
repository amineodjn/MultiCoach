import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrvWDpSZHy-4tD48QQfirBJTA3yL9cHZ0",
  authDomain: "multicoach-4a815.firebaseapp.com",
  projectId: "multicoach-4a815",
  storageBucket: "multicoach-4a815.appspot.com",
  messagingSenderId: "358107330258",
  appId: "1:358107330258:web:d9b5130473870730981f0b",
  measurementId: "G-VS30S4EM4Z"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore service
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app')

export { db, storage, auth };