<template>
  <div class="mb-4">
    <label
      :for="Modelval"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ title }}</label
    >
    <textarea
      :value="Modelval"
      :id="Modelval"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 hover:border-indigo-500"
      :placeholder="placeholder"
      @input="$emit('update', $event.target.value)"
    ></textarea>
    <p
      id="outlined_error_help"
      class="mt-2 text-xs text-red-600 dark:text-red-400"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  showError: {
    type: Boolean,
    default: false
  },
  Modelval: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
});
</script>
