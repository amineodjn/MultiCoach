<template>
  <div
    class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm p-4"
  >
    <div class="flex justify-between items-center py-4 px-5">
      <h2 class="text-2xl font-bold">Your connections</h2>
    </div>
    <div
      class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm"
    >
      <favoritesCard
        v-for="coach in connectionList"
        :key="coach.uid"
        :favoriteCoach="coach"
        :customWidth="'w-1/2'"
        :coachAccess="false"
        @handleClick="handleClick"
      />
      <emptyState v-if="isEmptyArray && !isLoading" />
      <loadingSpinner v-if="isLoading && isEmptyArray" />
    </div>
    <div
      v-if="favoriteCoaches.length > 3"
      class="text-center dark:border-neutral-70"
    >
      <a
        class="flex items-center text-indigo-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700 cursor-pointer"
        @click="viewAllProjects"
      >
        {{ showAllOffers ? "Show less" : "Show all" }}
        <svg
          class="flex-shrink-0 w-4 h-4"
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
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { getDoc } from "firebase/firestore";
import { useStore } from "../store/store";
import emptyState from "../components/emptyState.vue";
import favoritesCard from "../components/favoritesCard.vue";
import loadingSpinner from "../components/loadingSpinner.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const handleClick = uid => {
  router.push(`/profile/${uid}`);
};

const store = useStore();
const showAllOffers = ref(false);
const favoriteCoaches = ref([]);
const isLoading = ref(false);

const fetchFavoriteCoaches = async () => {
  isLoading.value = true;
  const docRef = store.user.coach
    ? store.userDoc("coaches")
    : store.userDoc("users");

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();
    favoriteCoaches.value = user.favoriteCoaches;
  } else {
    console.log("No such document!");
  }
  isLoading.value = false;
};

const connectionList = computed(() => {
  if (
    !showAllOffers.value &&
    Array.isArray(favoriteCoaches.value) &&
    favoriteCoaches.value.length > 3
  ) {
    return favoriteCoaches.value.slice(0, 3);
  }
  return favoriteCoaches.value;
});

const viewAllProjects = () => {
  showAllOffers.value = !showAllOffers.value;
};
const isEmptyArray = computed(
  () =>
    !Array.isArray(favoriteCoaches.value) || favoriteCoaches.value.length === 0
);

onMounted(async () => {
  fetchFavoriteCoaches();
});
</script>
