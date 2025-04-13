<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Book Your Class
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

      <!-- Class Details -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {{ classDetails.className }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-2">
          {{ classDetails.classDescription }}
        </p>
        <div class="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ classDetails.time }}</span>
        </div>
        <p class="text-2xl font-bold text-indigo-600 dark:text-white">
          {{ classDetails.price }} PLN
        </p>
      </div>

      <!-- Calendar Integration -->
      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
          Add to Calendar
        </h4>
        <div class="flex space-x-2">
          <a
            :href="googleCalendarUrl"
            target="_blank"
            class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13.5h-5v5h-2v-5H6v-2h5v-5h2v5h5v2z"
              />
            </svg>
            Google Calendar
          </a>
        </div>
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
import { ref, computed } from "vue";
import { format, parseISO } from "date-fns";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  classDetails: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "confirm"]);
const isLoading = ref(false);
const acceptedTerms = ref(false);

const formattedDate = computed(() => {
  return format(parseISO(props.classDetails.date), "EEEE, MMMM d, yyyy");
});

const googleCalendarUrl = computed(() => {
  const startDate = new Date(
    props.classDetails.date + "T" + props.classDetails.time
  );
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: props.classDetails.className,
    details: props.classDetails.classDescription,
    location: props.classDetails.location,
    dates: `${startDate.toISOString().replace(/-|:|\.\d+/g, "")}/${endDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
});

const handleSubmit = () => {
  if (!acceptedTerms.value) {
    return;
  }

  isLoading.value = true;
  emit("confirm", {
    classId: props.classDetails.uid,
    totalPrice: props.classDetails.price,
  });
  emit("close");
  isLoading.value = false;
};
</script>
