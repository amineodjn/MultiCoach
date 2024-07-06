<template>
  <form class="max-w-xs mx-auto">
      <label for="counter-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
      <div class="relative flex items-center max-w-[11rem]">
          <button @click="decrease" type="button" id="decrement-button" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
              <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
              </svg>
          </button>
          <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text" id="counter-input" data-input-counter-min="1" aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="" value="3" required />
          <div class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
            <svg class="w-2.5 h-2.5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"></path>
            </svg>
            <span>{{ title }}</span>
          </div>
          <button @click="increase" type="button" id="increment-button" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
              <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
              </svg>
          </button>
      </div>
      <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select the number of bedrooms.</p>
  </form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

const counter = ref (0);

onMounted(() => {
  counter.value = props.modelValue
})

watch(() => props.modelValue, (newValue) => {
  counter.value = newValue
})

const increase = () => {
  counter.value++;
  emits('update:modelValue', counter.value)
};

const decrease = () => {
  if (counter.value > 0) {
    counter.value--
    emits('update:modelValue', counter.value)
  }
};
</script>