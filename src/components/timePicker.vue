<template>
  <div class="gap-6 grid grid-cols-2 ml-3">
    <div>
      <label :for="`${day}-start-time`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
      <div class="relative">
        <input type="time" :id="`${day}-start-time`" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" v-model="startTime" />
      </div>
    </div>
    <div>
      <label :for="`${day}-end-time`" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
      <div class="relative">
        <input type="time" :id="`${day}-end-time`" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" v-model="endTime" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  day: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    default: '00:00'
  },
  endTime: {
    type: String,
    default: '00:00'
  }
});

const day = ref(props.day);
const startTime = ref(props.startTime);
const endTime = ref(props.endTime);

const emit = defineEmits(['update:startTime', 'update:endTime']);

watch(startTime, (newVal) => {
  emit('update:startTime', newVal);
});

watch(endTime, (newVal) => {
  emit('update:endTime', newVal);
});
</script>
