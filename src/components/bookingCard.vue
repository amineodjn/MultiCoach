<template>
  <div
    class="flex flex-col border-gray-300 mt-5 p-5 rounded-lg bg-white shadow-sm"
  >
    <div class="flex justify-between items-center px-0 py-4 lg:px-5">
      <h2 class="text-2xl font-bold pr-2">Classes</h2>
      <div class="flex items-center md:justify-end space-x-2">
        <div class="relative">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search"
            class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-800 hover:border-indigo-500"
          />
          <svg
            class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white"
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
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <classCard
        v-for="(Class, index) in displayedClasses"
        :key="index"
        :trainingClass="Class"
        @delete="deleteClass"
      />
      <loadingSpinner v-if="isLoading && displayedClasses.length === 0" />
      <emptyState v-else-if="displayedClasses.length === 0" />
    </div>
    <div
      v-if="displayedClasses.length > 2"
      class="text-center dark:border-neutral-70"
    >
      <a
        class="flex items-center text-indigo-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700 cursor-pointer"
        @click="viewAllClasses"
      >
        {{ showAllClasses ? "Show less" : "Show all" }}
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
  <div
    class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm p-4"
  >
    <div class="flex justify-between items-center px-0 py-4 lg:px-5">
      <h2 class="text-2xl font-bold pr-2">Offers</h2>
      <div class="flex items-center md:justify-end space-x-2">
        <div class="relative">
          <input
            v-model="offersSearchTerm"
            type="text"
            placeholder="Search"
            class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-800 hover:border-indigo-500"
          />
          <svg
            class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white"
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
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <offerCard
        v-for="offer in displayedOffers"
        :key="offer.uid"
        :offer="offer"
        @delete="deleteOffer"
      />
      <loadingSpinner v-if="isLoading && displayedOffers.length === 0" />
      <emptyState v-else-if="displayedOffers.length === 0" />
    </div>
    <div
      v-if="displayedOffers.length > 2"
      class="text-center dark:border-neutral-70"
    >
      <a
        class="flex items-center text-indigo-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700 cursor-pointer"
        @click="viewAllOffers"
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
  <Toast
    :show="showToast"
    :type="toastType"
    :message="toastMessage"
    @close="showToast = false"
  />
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "../store/store";
import emptyState from "../components/emptyState.vue";
import offerCard from "../components/offerCard.vue";
import classCard from "../components/classCard.vue";
import loadingSpinner from "./loadingSpinner.vue";
import {
  handleCancelBooking,
  handleCancelOfferBooking,
} from "../utils/useFirebase";
import Toast from "../components/toast.vue";

const store = useStore();
const searchTerm = ref("");
const offersSearchTerm = ref("");
const isLoading = ref(false);
const offersLoading = ref(false);
const showAllClasses = ref(false);
const showAllOffers = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const showToast = ref(false);

const bookedClasses = computed(() => store.bookedClasses || []);

// Classes
const displayedClasses = computed(() => {
  let filteredClasses = bookedClasses.value;

  if (searchTerm.value) {
    filteredClasses = filteredClasses.filter(Class =>
      Class.className.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (showAllClasses.value && filteredClasses.length > 3) {
    return filteredClasses;
  } else if (filteredClasses) {
    return filteredClasses.slice(0, 3);
  } else {
    return [];
  }
});

onMounted(() => {
  if (store.userReady) {
    store.fetchUserBookedClasses();
  } else {
    const stop = watch(
      () => store.userReady,
      ready => {
        if (ready) {
          store.fetchUserBookedClasses();
          stop();
        }
      }
    );
  }
});

// Offers
const displayedOffers = computed(() => {
  let filteredOffers = store?.user?.bookedOffers || [];

  if (offersSearchTerm.value) {
    filteredOffers = filteredOffers.filter(offer =>
      offer.offerName
        .toLowerCase()
        .includes(offersSearchTerm.value.toLowerCase())
    );
  }

  if (showAllOffers.value) {
    return filteredOffers;
  } else {
    return filteredOffers.slice(0, 3);
  }
});

const viewAllClasses = () => {
  showAllClasses.value = !showAllClasses.value;
};

const viewAllOffers = () => {
  showAllOffers.value = !showAllOffers.value;
};

const deleteClass = async trainingClass => {
  try {
    await handleCancelBooking(store.docId, trainingClass.uid);
    await store.fetchUserBookedClasses();
    toastMessage.value = "Booking cancelled successfully!";
    toastType.value = "success";
    showToast.value = true;
  } catch (error) {
    console.error("Error deleting class:", error);
    toastMessage.value = "Failed to cancel the booking. Please try again.";
    toastType.value = "error";
    showToast.value = true;
  }
};

const deleteOffer = async offer => {
  try {
    await handleCancelOfferBooking(store.docId, offer.bookedOffer);
    store.user.bookedOffers = store.user.bookedOffers.filter(
      booking => booking.bookedOffer !== offer.bookedOffer
    );
    toastMessage.value = "Offer booking cancelled successfully!";
    toastType.value = "success";
    showToast.value = true;
  } catch (error) {
    console.error("Error deleting offer:", error);
    toastMessage.value =
      "Failed to cancel the offer booking. Please try again.";
    toastType.value = "error";
    showToast.value = true;
  }
};

onMounted(async () => {
  offersLoading.value = true;
  await store.fetchUserBookedOffers();
  offersLoading.value = false;
});
</script>
