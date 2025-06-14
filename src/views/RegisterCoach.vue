<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Join our community
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="register">
        <div>
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              v-model="firstName"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="last-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >last name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="given-name"
              v-model="lastName"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="passwordConfirmation"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Repeat Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autocomplete="current-password"
              required
              v-model="passwordConfirmation"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p
            v-if="wrongPwd"
            class="mt-2 text-sm text-red-600 dark:text-red-500"
          >
            Your password doesn't match
          </p>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { useStore } from "../store/store.js";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const wrongPwd = ref(false);
const router = useRouter();
const store = useStore();

const createUser = async uid => {
  const docRef = doc(db, "coaches", uid);

  const dataObj = {
    uid: uid,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    coach: true,
  };

  await setDoc(docRef, dataObj);

  store.setDocId(docRef.id);
  localStorage.setItem("uid", docRef.id);
};

const register = () => {
  if (passwordConfirmation.value !== password.value) {
    wrongPwd.value = true;
    return;
  }
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      createUser(auth.currentUser.uid);
      router.push("/");
    })
    .catch(error => {
      console.log(error.code);
    });
};
</script>
