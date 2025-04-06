<template>
  <div
    class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white border shadow-sm p-4"
  >
    <Toast
      :show="toastShow"
      :type="toastType"
      :message="toastMessage"
      @close="toastShow = false"
    />
    <div class="flex justify-between items-center p-5 pb-2">
      <h2 class="text-gray-800 text-lg font-semibold inline-block">Offers</h2>
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
      class="flex flex-col px-5 border-gray-300 mt-5 divide-y rounded-lg bg-white shadow-sm"
    >
      <offersCard
        v-for="offer in displayedOffers"
        :key="offer.uid"
        :offer="offer"
        :customWidth="'w-1/2'"
        :coachAccess="false"
        :readOnly="false"
        :isAlreadyBooked="isOfferAlreadyBooked(offer.uid)"
        @booking="handleBooking"
      />
      <loadingSpinner v-if="isLoading && displayedOffers.length === 0" />
      <emptyState v-else-if="displayedOffers.length === 0" />
    </div>
    <div v-if="offers.length > 3" class="text-center dark:border-neutral-70">
      <a
        class="flex items-center text-indigo-600 font-medium text-sm leading-5 pt-4 rounded-b-md space-x-1 justify-center dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700 cursor-pointer"
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
    <BookingModal
      v-if="showBookingModal"
      :show="showBookingModal"
      :offer="selectedOffer"
      @close="closeBookingModal"
      @confirm="handleBookingConfirm"
    />
  </div>
</template>

<script setup>
import offersCard from "../components/offersCard.vue";
import { onMounted, ref, computed } from "vue";
import emptyState from "../components/emptyState.vue";
import loadingSpinner from "../components/loadingSpinner.vue";
import {
  fetchOffers as fetchCoachOffers,
  updateDocument,
} from "../utils/useFirebase";
import BookingModal from "../components/BookingModal.vue";
import { useStore } from "../store/store";
import { arrayUnion } from "firebase/firestore";
import Toast from "../components/toast.vue";

const store = useStore();
const offers = ref([]);
const showAllOffers = ref(false);
const searchTerm = ref("");
const isLoading = ref(false);
const showBookingModal = ref(false);
const selectedOffer = ref(null);
const toastShow = ref(false);
const toastType = ref("success");
const toastMessage = ref("");

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
});

const displayedOffers = computed(() => {
  let filteredOffers = offers.value;

  if (searchTerm.value) {
    filteredOffers = filteredOffers.filter(offer =>
      offer.offerName.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (showAllOffers.value) {
    return filteredOffers;
  } else {
    return filteredOffers.slice(0, 3);
  }
});

const handleBooking = offer => {
  selectedOffer.value = offer;
  showBookingModal.value = true;
};

const closeBookingModal = () => {
  showBookingModal.value = false;
  selectedOffer.value = null;
};

const handleBookingConfirm = async bookingData => {
  const showErrorToast = message => {
    toastType.value = "error";
    toastMessage.value = message;
    toastShow.value = true;
  };

  const showSuccessToast = () => {
    toastType.value = "success";
    toastMessage.value = "Booking successful!";
    toastShow.value = true;
    setTimeout(() => {
      closeBookingModal();
    }, 1000);
  };

  const validateBooking = () => {
    if (!store.user) {
      showErrorToast("User must be logged in to make a booking");
      return false;
    }
    if (store.user.coach) {
      showErrorToast("You must be logged in as a user to make a booking");
      return false;
    }
    return true;
  };

  const createBookingEvent = () => ({
    offerId: selectedOffer.value.uid,
    coachId: props.uid,
    offerName: selectedOffer.value.offerName,
    offerPrice: selectedOffer.value.price,
    bookedAt: new Date().toISOString(),
  });

  if (!validateBooking()) {
    return;
  }

  try {
    const newEvent = createBookingEvent();
    await updateDocument("users", store.docId, {
      bookedOffers: arrayUnion(newEvent),
    });

    // Update the store's user data with the new booking
    if (!store.user.bookedOffers) {
      store.user.bookedOffers = [];
    }
    store.user.bookedOffers.push(newEvent);

    showSuccessToast();
  } catch (error) {
    console.error("Error booking offer:", error);
    if (!toastShow.value) {
      showErrorToast("Failed to book the offer. Please try again.");
    }
  }
};

const viewAllProjects = () => {
  showAllOffers.value = !showAllOffers.value;
};

const fetchOffers = async () => {
  if (!props.uid) {
    return;
  }

  isLoading.value = true;

  try {
    const data = await fetchCoachOffers(props.uid);
    offers.value = data.length ? data : [];
  } catch (error) {
    console.error("Error fetching offers:", error);
    offers.value = [];
  } finally {
    isLoading.value = false;
  }
};

const isOfferAlreadyBooked = offerId => {
  const existingBookings = store.user?.bookedOffers || [];
  return existingBookings.some(booking => booking.offerId === offerId);
};

onMounted(async () => {
  await fetchOffers(props.uid);
});
</script>
