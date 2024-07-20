<template>
        <main id="content" class="content-container">
        <div class="mx-auto">
          <div class="md:pt-5 sm:pt-0 sm:pb-0 sm:p-5 p-2">
            <div class="w-full pb-0 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-800 dark:border-neutral-700">
              <figure>
                <svg class="w-full" preserveAspectRatio="none" width="1113" height="161" viewBox="0 0 1113 161" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_666_220723)"><rect x="0.5" width="1112" height="161" rx="12" fill="white"></rect><rect x="1" width="1112" height="348" fill="#D9DEEA"></rect><path d="M512.694 359.31C547.444 172.086 469.835 34.2204 426.688 -11.3096H1144.27V359.31H512.694Z" fill="#C0CBDD"></path><path d="M818.885 185.745C703.515 143.985 709.036 24.7949 726.218 -29.5801H1118.31V331.905C1024.49 260.565 963.098 237.945 818.885 185.745Z" fill="#8192B0"></path><defs><clipPath id="clip0_666_220723"><rect x="0.5" width="1112" height="161" rx="12" fill="white"></rect></clipPath></defs></g></svg>
              </figure>
              <div class="-mt-24 mb-10">
                <div class="relative flex border-4 mx-auto rounded-full flex-col items-center dark:border-neutral-800" style="width: 120px; height: 120px;">
                  <img class="object-cover w-full h-full rounded-full shadow-lg" :src="user.profilePicture" alt="Profile picture"/>
                </div>
                <div class="flex flex-col items-center mt-3">
                  <h1 class="text-xl font-medium text-gray-900 dark:text-white">{{ user.firstName + ' ' + user.lastName }}</h1>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">{{ user.userName }}</p>
                </div>
              </div>

            </div>
            <div class="space-y-5 mt-5 lg:shadow-sm lg:p-5 bg-white lg:border lg:border-gray-200 lg:rounded-lg flex flex-col">
              <div class="xl:flex divide-x space-x-20" >
                <!--sidebar-->
                <div class="xl:p-0 xl:block xl:z-0 xl:relative xl:bottom-0 transition duration-300 p-5 bg-white border-gray-200 overflow-y-auto hidden fixed">
                 <div class="dark:divide-neutral-700 xl:pe-4 mt-3 space-y-5 divide-y ">
                  <div class="first:pt-0 pt-4">
                    <h2 class="text-sm leading-5 font-semibold text-gray-800"> About </h2>
                    <!--list-->
                    <ul class="mt-3 space-y-2">
                      <li>
                        <div class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">
                          <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
                        </svg>
                        {{ user.gym }}
                        </div>
                      </li>
                      <li>
                        <div class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">
                          <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                          </svg>
                          {{ user.city }}
                        </div>
                      </li>
                      <li>
                        <div class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">
                          <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                          </svg>
                          {{ user.email }}
                        </div>
                      </li>
                      <li>
                        <div class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">
                          <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
                          </svg>
                          <a :href="user.websiteUrl">{{ user.websiteUrl }}</a>
                        </div>
                      </li>
                      <li>
                        <div class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">
                          <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
                          </svg>
                          {{user.phoneNumber}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="first:pt-0 pt-4">
                    <h2 class="text-sm leading-5 mb-3 font-semibold text-gray-800"> Connections </h2>
                    <ul class="space-y-2">
                      <li v-if="!user.favoriteCoaches" class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">No connections available</li>
                      <li v-else v-for="connection in userConnection" :key="connection.uid">
                        <div class="flex items-center gap-x-3">
                          <img v-if="connection.profilePicture" class="flex flex-shrink-0 justify-center items-center rounded-full w-9 h-9" :src="connection.profilePicture" alt="Connection image">  
                          <span v-else class="flex flex-shrink-0 justify-center items-center w-9 h-9 bg-white text-gray-700 text-opacity-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 border border-gray-200 border-opacity-100 rounded-full uppercase font-medium text-xs leading-4">  
                            {{ getInitials(connection.firstName, connection.lastName) }}
                          </span>
                          <div class="flex-grow">
                            <router-link :to="`/profile/${connection.uid}`" class="block text-gray-800 text-opacity-100 font-medium text-sm leading-5 dark:text-neutral-200 hover:text-indigo-500 focus:text-indigo-500 dark:hover:text-indigo-500 dark:focus:text-indigo-500" href="">
                              {{connection.firstName + ' ' + connection.lastName}}
                            </router-link>
                            <p class="text-sm text-gray-500 dark:text-neutral-500">
                              {{connection.userName}}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="first:pt-0 pt-4">
                    <h2 class="text-sm leading-5 mb-3 font-semibold text-gray-800"> Schedule </h2>
                    <ul class="space-y-2">
                      <li>
                        <div v-if="!user.schedule" class="text-gray-800 text-sm leading-5 gap-x-3 inline-flex items-center dark:text-neutral-200">No schedule available</div>
                      </li>
                      <li>
                        <div v-for="(value, key) in user.schedule" :key="value.index" class="text-gray-800 text-sm leading-5 flex justify-between items-center dark:text-neutral-200">
                          <span>{{ capitalaizefirstLetter(key) }}</span>
                          <span>{{ value.startTime }} - {{ value.endTime }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                 </div>
                </div>
                <!--End sidebar-->
                <div class="xl:pl-5 flex-grow space-y-2">
                 <userOffer :uid="uid" /> 
                 <classOffer :uid="uid" />
                </div>
              </div>
            </div>
        </div> 
      </div> 
    </main> 
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore } from '../store/store';
import userOffer from './userOffer.vue';
import classOffer from './classOffer.vue';
import { useRoute } from 'vue-router';

const props = defineProps()
const route = useRoute();
const uid = ref(route.params.uid);
const store = useStore();
const user = ref({});
const userConnection = computed(() => user.value.favoriteCoaches.slice(0, 5));

function getInitials(firstName, lastName) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}

function capitalaizefirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchCoachData() {
  user.value = await store.fetchCoach('coaches', uid.value);
}

onMounted(fetchCoachData);


watch(() => route.params.uid, (newUid, oldUid) => {
  if (newUid !== oldUid) {
    uid.value = newUid;
    fetchCoachData();
  }
});
</script>