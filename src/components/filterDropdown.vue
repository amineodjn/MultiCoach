<template>
  <div class="flex flex-col md:items-end mt-6 mr-2">
    <button
      id="filterDropdownButton"
      @click="dropdownToggle"
      data-dropdown-toggle="filterDropdown"
      class="w-auto md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none md:bg-white rounded-lg md:border md:border-gray-200 md:hover:bg-gray-100 hover:text-primary-700 md:dark:focus:ring-gray-700 md:dark:bg-gray-800 dark:text-gray-400 md:dark:border-gray-600 dark:hover:text-white md:dark:hover:bg-gray-700"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="h-4 w-4 mr-2"
        viewbox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        class="-mr-1 ml-1.5 w-5 h-5"
        fill="currentColor"
        viewbox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        />
      </svg>
    </button>
    <div
      id="filterDropdown"
      :class="{ hidden: !toggled }"
      class="absolute top-[190px] z-10 w-48 p-3 mt-3 bg-white rounded-lg shadow dark:bg-gray-700"
    >
      <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
        Experienced
      </h6>
      <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
        <li v-for="exp in experiences" :key="exp" class="flex items-center">
          <input
            :id="exp"
            type="checkbox"
            v-model="toggle[exp]"
            true-value="yes"
            false-value="no"
            @change="$emit('filterExperiences', exp)"
            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <label
            :for="exp"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >{{ exp }}</label
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const toggled = ref(false);
const toggle = ref({});

defineProps({
  experiences: {
    type: Array,
    required: true,
  },
});

const dropdownToggle = () => {
  toggled.value = !toggled.value;
};
</script>
