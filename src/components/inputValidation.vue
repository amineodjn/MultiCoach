<template>
  <div>
    <label :for="Modelval" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
    <input 
    :value="Modelval"
    @input="$emit('update', $event.target.value)"
    @key.escape="$emit('update', '')"
    type="text" :id="Modelval" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 hover:border-indigo-500" :placeholder="placeholder" />
    <p v-if="showError" id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>    
  </div>
</template>

<script setup>
const props = defineProps({
  showError: Boolean,
  Modelval: [String,Number],
  title: String,
  errorMessage: String,
  placeholder: String,
})
</script>