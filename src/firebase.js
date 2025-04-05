import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multicoach-4a815.firebaseapp.com",
  projectId: "multicoach-4a815",
  storageBucket: "multicoach-4a815.appspot.com",
  messagingSenderId: "358107330258",
  appId: "1:358107330258:web:d9b5130473870730981f0b",
  measurementId: "G-VS30S4EM4Z",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

const auth = getAuth(firebaseApp);

export { firebaseApp, db, storage, auth };
