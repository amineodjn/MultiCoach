<template>
  <div
    class="bg-white flex flex-col lg:flex-row lg:items-center justify-between px-5 py-4 w-full border-b hover:shadow-lg hover:border-indigo-600 cursor-pointer"
    :class="customWidth"
  >
    <div class="flex flex-col sm:-mx-4 sm:flex-row">
      <img
        class="flex-shrink-0 object-cover w-20 h-20 rounded-full sm:mx-4 ring-4 ring-gray-300 hover:ring-indigo-300"
        :src="image"
        alt=""
      />
      <div class="sm:mx-4 sm:mt-0">
        <h1
          class="text-xl font-medium sm:mt-0 mt-2 text-gray-700 capitalize dark:text-white"
        >
          {{ offer.offerName }}
        </h1>
        <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
          {{ offer.offerDescription }}
        </p>
        <div class="flex flex-col lg:flex-row mt-2">
          <a
            class="flex mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="gym"
          >
            <svg
              class="w-6 h-6"
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
                d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
              />
            </svg>
            <p>{{ offer.gym }}</p>
          </a>
          <a
            class="flex lg:ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="location"
          >
            <svg
              class="w-6 h-6"
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
                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
              />
            </svg>
            <p>{{ offer.location }}</p>
          </a>
          <!-- <a
            class="flex lg:ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Github"
          >
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
              />
            </svg>
            <p>{{ offer.reviews }} (100)</p>
          </a> -->
        </div>
      </div>
    </div>
    <div
      v-if="!readOnly"
      class="flex justify-end items-center lg:justify-center"
    >
      <div class="flex flex-col items-end">
        <span class="text-2xl font-bold text-black dark:text-white mb-2">
          {{ offer.price }} PLN
        </span>
        <button
          v-if="!coachAccess"
          @click="handleBooking"
          type="button"
          :disabled="isAlreadyBooked || isBookingDisabled"
          class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group"
          :class="[
            isAlreadyBooked || isBookingDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-br from-indigo-600 to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
          ]"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md"
            :class="[
              isAlreadyBooked || isBookingDisabled
                ? 'bg-gray-100 text-gray-500'
                : 'bg-white dark:bg-gray-900 group-hover:bg-opacity-0 text-indigo-600 group-hover:text-white',
            ]"
          >
            {{ getButtonText }}
          </span>
        </button>
      </div>
      <div
        class="ml-3 hover:bg-gray-100 rounded-md"
        v-if="coachAccess"
        @click="emitDeleteOffer"
      >
        <svg
          class="w-6 h-6 text-gray-800 m-1 dark:text-white"
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
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const image = computed(() => {
  return props.offer.offerImage
    ? props.offer.offerImage
    : "../../public/images/class.png";
});

const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
  customWidth: {
    type: String,
    default: "w-1/2",
  },
  coachAccess: {
    type: Boolean,
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  isAlreadyBooked: {
    type: Boolean,
    default: false,
  },
  isBookingDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["deleteOffer", "booking"]);

const emitDeleteOffer = () => {
  return emit("deleteOffer", props.offer.uid);
};

const handleBooking = () => {
  if (props.isBookingDisabled) return;
  emit("booking", props.offer);
};

const getButtonText = computed(() => {
  if (props.isAlreadyBooked) return "Booked";
  if (props.isBookingDisabled) return "Not Available";
  return "Book Now";
});
</script>
