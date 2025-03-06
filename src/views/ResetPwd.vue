<template>
  <div
    v-if="resetEmailSent"
    id="toast-simple"
    class="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert"
  >
    <svg
      class="w-5 h-5 text-indigo-600 dark:text-indigo-500 rotate-45"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
      />
    </svg>
    <div class="ps-4 text-sm font-normal">Email sent successfully.</div>
  </div>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Reset Password
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="resetPassword">
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
          <p v-if="errMsg" class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ errMsg }}
          </p>
        </div>
        <div>
          <button
            type="submit"
            @click="resetPassword"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initFlowbite } from "flowbite";

const email = ref("");
const errMsg = ref("");
const resetEmailSent = ref(false);
const resetPassword = () => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      initFlowbite();
      resetEmailSent.value = true;
      setTimeout(() => {
        resetEmailSent.value = false;
      }, 3000);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errMsg.value = "Enter a valid email address.";
      console.log(errorMessage, errorCode);
    });
};
</script>
