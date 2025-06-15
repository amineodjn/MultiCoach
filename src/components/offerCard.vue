<template>
  <div
    class="bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
  >
    <img
      class="w-full h-auto rounded-t-xl min-h-40"
      :src="image"
      alt="Image Description"
    />
    <div class="p-4 md:p-3">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
        {{ offer.offerName }}
      </h3>
      <p class="mt-1 text-gray-500 dark:text-neutral-400">
        {{ offer.offerDescription }}
      </p>
      <div class="flex-col mt-2">
        <a
          class="flex mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="gym"
        >
          <svg
            class="w-6 h-6 text-indigo-600"
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
          class="flex text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="location"
        >
          <svg
            class="w-6 h-6 text-indigo-600"
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
      </div>
      <div class="text-right">
        <button
          type="button"
          @click="deleteOffer"
          class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-200 text-red-500 hover:border-red-600 hover:text-red-600 disabled:opacity-50 disabled:pointer-events-none dark:border-red-700 dark:text-red-400 dark:hover:text-red-500 dark:hover:border-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["delete"]);

const image = computed(() => {
  return props.offer.offerImage
    ? props.offer.offerImage
    : "../../public/images/class.png";
});

const deleteOffer = () => {
  emits("delete", props.offer);
};
</script>
