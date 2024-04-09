<template>
  <div id="exampleWrapper" class="relative">
    <form class="m-6">
        <div class="flex">
          <label for="location-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
          <button @click="dropdownToggle" id="dropdown-button-2" data-dropdown-toggle="dropdown-search-city" class="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-primary-700   dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
            <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
              Location <svg class="w-2.5 h-2.5 ms-2.5 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path>
            </svg>
          </button>
          <div id="dropdown-search-city" :class="{'hidden' : !toggled}" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" data-popper-placement="bottom" style="position: absolute; top: 75px;  margin: 0px;">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-2">
              <li v-for="city in cities" :key="city" >
                  <button @click="selectCity(city)" type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                      <div class="inline-flex items-center">
                          {{ city }}
                      </div>
                  </button>
              </li>
            </ul>
          </div>
          <div class="relative w-full">
            <input type="search" :value="selectedCity" id="location-search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-indigo-500" :placeholder="selectedCity.value ? '' : 'Search for city or address'" required="">
            <span v-if="selectedCity != ''" class="absolute top-3 left-2 bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{{ selectedCity }}
              <button @click="removeCity" type="button" class="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" data-dismiss-target="#badge-dismiss-default" aria-label="Remove">
                <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                </svg>
                <span class="sr-only">Remove city</span>
              </button>
            </span>
            <button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-indigo-700 rounded-e-lg border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue'

const toggled = ref(false)
const cities = ref(['Poznań', 'Warsaw', 'Wrocław', 'Kraków', 'Gdańsk'])
const selectedCity = ref('')


const dropdownToggle = () => {
  toggled.value = !toggled.value
}

 const selectCity = (city) => {
   selectedCity.value = city
 }

 const removeCity = () => {
   selectedCity.value = ''
 }
</script>