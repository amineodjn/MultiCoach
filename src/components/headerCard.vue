<template>
  <main id="content" class="content-container">
    <div class="mx-auto">
      <div class="md:pt-5 sm:pt-0 sm:pb-0 sm:p-5 p-2">
        <div
          class="w-full pb-0 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-800 dark:border-neutral-700"
        >
          <figure>
            <svg
              class="w-full"
              preserveAspectRatio="none"
              width="1113"
              height="161"
              viewBox="0 0 1113 161"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_666_220723)">
                <rect
                  x="0.5"
                  width="1112"
                  height="161"
                  rx="12"
                  fill="white"
                ></rect>
                <rect x="1" width="1112" height="348" fill="#D9DEEA"></rect>
                <path
                  d="M512.694 359.31C547.444 172.086 469.835 34.2204 426.688 -11.3096H1144.27V359.31H512.694Z"
                  fill="#C0CBDD"
                ></path>
                <path
                  d="M818.885 185.745C703.515 143.985 709.036 24.7949 726.218 -29.5801H1118.31V331.905C1024.49 260.565 963.098 237.945 818.885 185.745Z"
                  fill="#8192B0"
                ></path>
                <defs>
                  <clipPath id="clip0_666_220723">
                    <rect
                      x="0.5"
                      width="1112"
                      height="161"
                      rx="12"
                      fill="white"
                    ></rect>
                  </clipPath>
                </defs>
              </g>
            </svg>
          </figure>
          <div class="-mt-24">
            <div
              class="relative flex border-4 mx-auto rounded-full flex-col items-center dark:border-neutral-800"
              style="width: 120px; height: 120px"
            >
              <img
                class="object-cover w-full h-full rounded-full shadow-lg"
                :src="profilePicture"
                alt="Profile picture"
              />
            </div>
            <div class="flex flex-col items-center mt-3">
              <h1 class="text-xl font-medium text-gray-900 dark:text-white">
                {{ firstName + " " + lastName }}
              </h1>
              <p class="text-sm text-gray-500 dark:text-neutral-500">
                {{ userName }}
              </p>
            </div>
          </div>
          <div
            class="pt-0.5 pb-0.5 whitespace-nowrap overflow-y-hidden overflow-x-auto gap-2 justify-between items-center flex-row flex mt-7 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <nav class="flex space-x-6">
              <router-link
                v-if="isCoach"
                class="py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-gray-500 hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500"
                :class="{
                  'border-b-2 border-indigo-500 outline-none text-indigo-600':
                    page === 'my-profile',
                }"
                to="/my-profile"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  ></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                My Profile
              </router-link>
              <router-link
                v-if="!isCoach"
                class="py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-gray-500 hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500"
                :class="{
                  'border-b-2 border-indigo-500 outline-none text-indigo-600':
                    page === 'bookings',
                }"
                to="/bookings"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
                Bookings
              </router-link>
              <router-link
                class="py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-gray-500 hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500"
                :class="{
                  'border-b-2 border-indigo-500 outline-none text-indigo-600':
                    page === 'connections',
                }"
                to="/connections"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="10" r="3"></circle>
                  <path
                    d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"
                  ></path>
                </svg>
                Connections
              </router-link>
              <router-link
                class="py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-gray-500 hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500"
                :class="{
                  'border-b-2 border-indigo-500 outline-none text-indigo-600':
                    page === 'edit',
                }"
                :to="profileLink"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                  ></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Edit Profile
              </router-link>
              <router-link
                v-if="isCoach"
                class="py-4 px-1 inline-flex items-center gap-2 text-sm whitespace-nowrap text-gray-500 hover:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500"
                :class="{
                  'border-b-2 border-indigo-500 outline-none text-indigo-600':
                    page === 'schedule',
                }"
                to="/schedule"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Schedule
              </router-link>
            </nav>
          </div>
        </div>
        <div class="container mx-auto py-6">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "../store/store.js";
import { RouterLink } from "vue-router";

const store = useStore();

const profileLink = computed(() => `/edit/${store.docId}`);
const firstName = computed(() => store.user?.firstName || "");
const lastName = computed(() => store.user?.lastName || "");
const userName = computed(() => store.user?.userName || "");
const isCoach = computed(() => store.user?.coach || false);
const profilePicture = computed(
  () => store.user?.profilePicture || "../../public/images/avatar.jpg"
);

defineProps({
  page: {
    type: String,
    required: true,
    validator: value => {
      return [
        "my-profile",
        "bookings",
        "connections",
        "edit",
        "schedule",
      ].includes(value);
    },
  },
});
</script>
