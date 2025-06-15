<template>
  <div class="flex flex-col gap-2">
    <label
      class="block text-sm font-medium text-gray-900 dark:text-white"
      for="recurrence"
    >
      Recurrence
    </label>
    <select
      id="recurrence"
      v-model="selectedRecurrence"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      :class="{ 'border-red-500': showError }"
      @change="handleChange"
    >
      <option value="none">No recurrence</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="custom">Custom</option>
    </select>
    <p v-if="showError" class="mt-1 text-sm text-red-600 dark:text-red-500">
      {{ errorMessage }}
    </p>

    <!-- Custom recurrence options -->
    <div v-if="selectedRecurrence === 'custom'" class="mt-2 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-gray-900 dark:text-white">
          Repeat every
        </label>
        <input
          type="number"
          v-model="customInterval"
          min="1"
          class="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        />
        <select
          v-model="customFrequency"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        >
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
      </div>

      <div v-if="customFrequency === 'weeks'" class="flex flex-wrap gap-2">
        <label
          class="w-full text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Repeat on:
        </label>
        <button
          v-for="day in weekDays"
          :key="day.value"
          type="button"
          @click="toggleWeekDay(day.value)"
          class="px-3 py-1 text-sm rounded-full"
          :class="
            selectedWeekDays.includes(day.value)
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          "
        >
          {{ day.label }}
        </button>
      </div>

      <div class="flex items-center gap-4">
        <label class="text-sm font-medium text-gray-900 dark:text-white">
          End after
        </label>
        <input
          type="number"
          v-model="occurrences"
          min="1"
          class="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300"
          >occurrences</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      type: "none",
      interval: 1,
      frequency: "days",
      weekDays: [],
      occurrences: 1,
    }),
  },
  showError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedRecurrence = ref(props.modelValue.type);
const customInterval = ref(props.modelValue.interval);
const customFrequency = ref(props.modelValue.frequency);
const selectedWeekDays = ref(props.modelValue.weekDays);
const occurrences = ref(props.modelValue.occurrences);

const weekDays = [
  { label: "Mon", value: "monday" },
  { label: "Tue", value: "tuesday" },
  { label: "Wed", value: "wednesday" },
  { label: "Thu", value: "thursday" },
  { label: "Fri", value: "friday" },
  { label: "Sat", value: "saturday" },
  { label: "Sun", value: "sunday" },
];

const toggleWeekDay = day => {
  const index = selectedWeekDays.value.indexOf(day);
  if (index === -1) {
    selectedWeekDays.value.push(day);
  } else {
    selectedWeekDays.value.splice(index, 1);
  }
  emitUpdate();
};

const handleChange = () => {
  if (selectedRecurrence.value !== "custom") {
    customInterval.value = 1;
    customFrequency.value = "days";
    selectedWeekDays.value = [];
    occurrences.value = 1;
  }
  emitUpdate();
};

const emitUpdate = () => {
  emit("update:modelValue", {
    type: selectedRecurrence.value,
    interval: customInterval.value,
    frequency: customFrequency.value,
    weekDays: selectedWeekDays.value,
    occurrences: occurrences.value,
  });
};

watch([customInterval, customFrequency, occurrences], () => {
  emitUpdate();
});
</script>
