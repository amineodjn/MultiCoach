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
        @book="console.log('Booked class:', $event)"
      />
      <loadingSpinner v-if="isLoading && displayedClasses.length === 0" />
      <emptyState v-else-if="displayedClasses.length === 0" />
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
    <div
      class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm"
    >
      <offersCard
        v-for="offer in displayedOffers"
        :key="offer.uid"
        :offer="offer"
        :customWidth="'w-1/2'"
        :coachAccess="false"
        :read-only="true"
      />
      <loadingSpinner v-if="isLoading && displayedOffers.length === 0" />
      <emptyState v-else-if="displayedOffers.length === 0" />
    </div>
    <div
      v-if="displayedOffers.length > 2"
      class="text-center dark:border-neutral-70 hover:bg-gray-50"
    >
      <a
        class="flex items-center text-blue-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700"
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
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../main";
import { useStore } from "../store/store";
import emptyState from "../components/emptyState.vue";
import offersCard from "../components/offersCard.vue";
import classCard from "../components/classCard.vue";
import loadingSpinner from "./loadingSpinner.vue";

const store = useStore();
const classes = ref([]);
const showAllClasses = ref(false);
const searchTerm = ref("");
const uid = ref(store.docId);
const isLoading = ref(false);
const offersLoading = ref(false);
//Classes
const displayedClasses = computed(() => {
  let filteredClasses = classes.value;

  if (searchTerm.value) {
    filteredClasses = filteredClasses.filter((Class) =>
      Class.className.toLowerCase().includes(searchTerm.value.toLowerCase()),
    );
  }

  if (showAllClasses.value) {
    return filteredClasses;
  } else {
    return filteredClasses.slice(0, 3);
  }
});

const viewAllClasses = () => {
  showAllClasses.value = !showAllClasses.value;
};

const fetchClasses = async () => {
  if (!uid.value) {
    return;
  }
  isLoading.value = true;
  const docRef = store.user.coach
    ? store.userDoc("coaches")
    : store.userDoc("users");

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();
    classes.value = user.bookedClasses;
  } else {
    console.log("No such document!");
  }
  isLoading.value = false;
};

onMounted(async () => {
  fetchClasses();
});

//Offers
const offers = ref([]);
const showAllOffers = ref(false);

const displayedOffers = computed(() => {
  let filteredOffers = offers.value;

  if (searchTerm.value) {
    filteredOffers = filteredOffers.filter((offer) =>
      offer.offerName.toLowerCase().includes(searchTerm.value.toLowerCase()),
    );
  }

  if (showAllOffers.value) {
    return filteredOffers;
  } else {
    return filteredOffers.slice(0, 3);
  }
});

const viewAllOffers = () => {
  showAllOffers.value = !showAllOffers.value;
};

const fetchUserBookedEvents = async (db, uid) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().bookedEvents || [];
  } else {
    console.log("No such user!");
    return [];
  }
};

const fetchOfferDetails = async (db, bookedEvents) => {
  const offerDetailsPromises = bookedEvents.map(async (event) => {
    const { bookedOffer, bookedCoach } = event;
    const offerRef = doc(db, "coaches", bookedCoach, "Offers", bookedOffer);
    const offerSnap = await getDoc(offerRef);
    if (offerSnap.exists()) {
      return { ...offerSnap.data(), bookedEvent: event };
    } else {
      console.log(`No such offer: ${bookedOffer} for coach: ${bookedCoach}`);
      return null;
    }
  });

  return Promise.all(offerDetailsPromises);
};

const getUserBookedOfferDetails = async (db, uid) => {
  offersLoading.value = true;
  const bookedEvents = await fetchUserBookedEvents(db, uid);
  const offerDetails = await fetchOfferDetails(db, bookedEvents);

  return offerDetails.filter((details) => details !== null); // Filter out any null results
};

onMounted(async () => {
  // fetchOffers();
  getUserBookedOfferDetails(db, uid.value)
    .then((details) => {
      offers.value = details;
    })
    .catch((error) => {
      console.error("Error fetching offer details:", error);
    });
  offersLoading.value = false;
});
</script>
