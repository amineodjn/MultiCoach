<script setup>

</script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/feed">Feed</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/sign-in">Login</router-link> |
    <button @click="HandleLogout" v-if="isLoggedIn">Logout</button>
  </nav>
  <router-view />
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const isLoggedIn = ref(false);
const router = useRouter();


let auth;
onMounted(() => {
 auth = getAuth();
 onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in.
    isLoggedIn.value = true;
  } else {
    // No user is signed in.
    isLoggedIn.value = false;
  }
 });

});


const HandleLogout = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
}
</script>
