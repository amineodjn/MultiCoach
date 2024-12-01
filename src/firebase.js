import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrvWDpSZHy-4tD48QQfirBJTA3yL9cHZ0",
  authDomain: "multicoach-4a815.firebaseapp.com",
  projectId: "multicoach-4a815",
  storageBucket: "multicoach-4a815.appspot.com",
  messagingSenderId: "358107330258",
  appId: "1:358107330258:web:d9b5130473870730981f0b",
  measurementId: "G-VS30S4EM4Z",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore service
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

export { firebaseApp, db, storage, auth };
