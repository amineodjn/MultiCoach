<template>
  <div v-if="firstName">
    <h1>Welcome to our app  {{ firstName }}</h1>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useStore } from '../store/store.js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../main.js'; 

const store = useStore();
const docId = computed(() => store.docId);
const firstName = ref(null);

const fetchUser = async () => {
  if (!docId.value) {
    console.log('docId is not set', docId.value);
    return;
  }

  const docRef = doc(db, 'users', docId.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    firstName.value = docSnap.data().firstName;
  } else {
    console.log('No such document!');
  }
};

watch(() => store.docId, fetchUser, { immediate: true });
</script>