import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "./store/store";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const store = useStore();

onAuthStateChanged(auth, async user => {
  try {
    if (user) {
      store.setDocId(user.uid);
      // Wait for user data to be fetched before proceeding
      await Promise.all([
        store.fetchUser("users", user.uid),
        store.fetchUser("coaches", user.uid),
      ]);
      await store.setRoute();
      localStorage.setItem("uid", user.uid);
      console.log("Page reloaded, user is logged in");
    } else {
      localStorage.removeItem("uid");
      store.user = null; // Clear user data
      router.push("/sign-in");
      console.log("User is not logged in");
    }
  } catch (error) {
    console.error("Error during auth state change:", error);
    localStorage.removeItem("uid");
    store.user = null;
    router.push("/sign-in");
  }
});

app.use(router);
app.mount("#app");
