import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "./store/store";

const app = createApp(App);

app.use(createPinia());

const store = useStore();
app.use(router);

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
