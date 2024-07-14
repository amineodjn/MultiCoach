<template>
  <div class="mb-4">
    <label :for="Modelval" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
    <textarea 
    :value="Modelval"
    :id="Modelval" rows="4" 
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" :placeholder="placeholder"
    @input="$emit('update', $event.target.value)"
    ></textarea>
    <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>    
  </div>
</template>

<script setup>
const props = defineProps({
  showError: Boolean,
  Modelval: String,
  title: String,
  errorMessage: String,
  placeholder: String,
})
</script>