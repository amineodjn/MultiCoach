import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStore } from "./store/store";

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

const app = createApp(App);

app.use(router);
app.use(createPinia());

const store = useStore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.setDocId(user.uid);
    store.setRoute(user.uid);
    store.fetchUser("users");
    store.fetchUser("coaches");
    localStorage.setItem("uid", user.uid);
    console.log("Page reloaded, user is logged in");
  } else {
    // Handle the case where the user is not logged in
    localStorage.removeItem("uid");
    router.push("/sign-in");
    console.log("User is not logged in");
  }
});

app.mount("#app");

export { db, storage, auth };
