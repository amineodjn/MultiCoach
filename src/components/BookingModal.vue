<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Book Your Session
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Offer Details -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {{ offer.offerName }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-2">
          {{ offer.offerDescription }}
        </p>
        <p class="text-2xl font-bold text-indigo-600 dark:text-white">
          {{ offer.price }} PLN
        </p>
      </div>

      <!-- Booking Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Terms and Conditions -->
        <div class="flex items-center">
          <input
            type="checkbox"
            id="terms"
            v-model="acceptedTerms"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            required
          />
          <label
            for="terms"
            class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the terms and conditions
          </label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          :disabled="isLoading"
        >
          {{ isLoading ? "Processing..." : "Confirm Booking" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  offer: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm"]);
const isLoading = ref(false);
const acceptedTerms = ref(false);

const handleSubmit = async () => {
  if (!acceptedTerms.value) {
    return;
  }

  isLoading.value = true;
  emit("confirm", {
    offerId: props.offer.uid,
    totalPrice: props.offer.price,
  });
  emit("close");
  isLoading.value = false;
};
</script>
