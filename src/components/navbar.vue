<template>


<header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
  <nav class="mt-6 relative max-w-[85rem] w-full bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-gray-800 dark:border-gray-700" aria-label="Global">
    <div class="flex items-center justify-between">
      <a class="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Multicoach">Multicoach</a>
      <div class="md:hidden">
        <button 
        type="button" 
        class="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700" 
        data-hs-collapse="#navbar-collapse-with-animation" 
        aria-controls="navbar-collapse-with-animation" 
        aria-label="Toggle navigation"
        @click="collapse"
        >
        
        <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
          <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
    <div 
    id="navbar-collapse-with-animation" 
    class="hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
    :class="{ 'hidden' : !navbarCollapse}"
    >
      <div class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
        <router-link to="/" class="font-medium text-indigo-600 md:py-6 dark:text-indigo-500" href="#" aria-current="page">Home</router-link>
        <router-link :to="route" @click="openProfile"  class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="#">Profile</router-link>
        <a class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="#">Work</a>
        <a class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" href="#">Blog</a>
        <router-link to="/register-user"  
        href="#"
        v-if="!isLoggedIn"
        :class="[{ 'font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500' : navbarCollapse}, { 'py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-blue-500 dark:text-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400' : !navbarCollapse}]"
        @click="toggleModal"
        >Get started</router-link>
        <modal :open="open" @update="toggleModal" />

        <!-- <div class="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] md:[--trigger:hover] md:py-4">
          <button type="button" class="flex items-center w-full text-gray-500 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 ">
            Dropdown
            <svg class="ms-2 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 md:w-48 hidden z-10 bg-white md:shadow-md rounded-lg p-2 dark:bg-gray-800 md:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full md:border before:-top-5 before:start-0 before:w-full before:h-5">
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
              About
            </a>
            <div class="hs-dropdown relative [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover]">
              <button type="button" class="w-full flex justify-between items-center text-sm text-gray-800 rounded-lg py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                Sub Menu
                <svg class="md:-rotate-90 ms-2 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 md:w-48 hidden z-10 md:mt-2 bg-white md:shadow-md rounded-lg p-2 dark:bg-gray-800 md:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute md:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full !mx-[10px]">
                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                  About
                </a>
                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                  Downloads
                </a>
                <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                  Team Account
                </a>
              </div>
            </div>

            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
              Downloads
            </a>
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
              Team Account
            </a>
          </div>
        </div> -->

        <router-link  to="sign-in" v-if="!isLoggedIn" class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-indigo-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-indigo-500">
          <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Log in
        </router-link>
        <router-link v-else @click="HandleLogout" to="sign-in" class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-indigo-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-indigo-500">
          <svg class="w-4 h-4 flex-shrink-0 size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
          </svg>
          Logout
        </router-link>
      </div>
    </div>
  </nav>
</header>

</template>
<script setup>
import { onBeforeMount, onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import modal from '../components/modal.vue'
import { useStore } from '../store/store.js';

const store = useStore();
const router = useRouter();
const navbarCollapse = ref(false);
const open = ref(false);

const route = ref('');
const isLoggedIn = ref(false);
const isCoach = ref(false)

let auth;

const HandleLogout = () => {
  localStorage.clear();
  signOut(auth).then(() => {
    isLoggedIn.value = false;
    localStorage.clear();
    store.docId = null;
    store.user = null;
    store.coach = null;
    store.route = 'home';
    router.push('/');
  });
}

const collapse = () => {
  navbarCollapse.value = !navbarCollapse.value
}

const toggleModal = () => {
  open.value =!open.value;
};

onMounted( async () => {
  auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user.uid);
      isLoggedIn.value = true;
      
    } else {
      isLoggedIn.value = false;
    }
  });
});

const openProfile = async () => {
  if (isLoggedIn.value) {
    const profileRoute = await store.getUserType();
    router.push('/myProfile');
    route.value = profileRoute;
  }
}

</script>