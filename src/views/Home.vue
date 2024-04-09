<template>
  <body>
    <div class="flex items-start justify-center m-10 rounded-lg" >
      <div class="w-1/2 h-screen flex items-start justify-between">
        <searchBox class="w-2/3"></searchBox>
        <div class="flex flex-col items-end mt-6">
          <button id="filterDropdownButton"
            @click="dropdownToggle"
            data-dropdown-toggle="filterDropdown" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700   dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button>
          <div id="filterDropdown" 
          :class="{'hidden' : !toggled}"
          class="z-10 w-48 p-3 mt-3 bg-white rounded-lg shadow dark:bg-gray-700">
              <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Experienced</h6>
              <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                  <li class="flex items-center">
                      <input id="apple" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                      <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Weight loss (10)</label>
                  </li>
                  <li class="flex items-center">
                      <input id="fitbit" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                      <label for="fitbit" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Strength (16)</label>
                  </li>
                  <li class="flex items-center">
                      <input id="razor" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                      <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Squash (49)</label>
                  </li>
                  <li class="flex items-center">
                      <input id="nikon" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                      <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Spinning (12)</label>
                  </li>
                  <li class="flex items-center">
                      <input id="benq" type="checkbox" value="" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                      <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Box (74)</label>
                  </li>
              </ul>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-12">
      
      </div>
  </div>
  </body>

  
</template>
<script setup>
import searchBox from '../components/searchbox.vue'
import { ref } from 'vue'

const toggled = ref(false)

const dropdownToggle = () => {
  toggled.value = !toggled.value
}

</script>
<style scoped> 

body > div {
  background-color: #f8f9fa;
}
</style>
