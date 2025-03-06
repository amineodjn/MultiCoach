<template>
  <div>
    <label
      for="time"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Time</label
    >
    <div class="relative">
      <input
        type="time"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        id="time`"
        class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <p
        v-if="showError"
        id="outlined_error_help"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "00:00",
  },
  errorMessage: {
    type: String,
    default: "Please enter a valid time",
  },
  showError: {
    type: Boolean,
    default: false,
  },
});
</script>
