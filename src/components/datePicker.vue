<template>
  <div>
    <label
      for="date"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Date</label
    >
    <input
      type="date"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :min="minDate"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Select date"
    />
    <p
      v-if="showError"
      id="outlined_error_help"
      class="mt-2 text-xs text-red-600 dark:text-red-400"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  modelValue: {
    type: String,
    default: "yyyy-MM-dd",
  },
  title: {
    type: String,
    default: "Date",
  },
  errorMessage: {
    type: String,
    default: "Please enter a valid date",
  },
  showError: {
    type: Boolean,
    default: false,
  },
});

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});
</script>
