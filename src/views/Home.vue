<template>
  <body>
    <div class="flex flex-col md:flex-row items-start justify-center md:m-10 m-2 rounded-lg" >
      <div class="flex flex-col md:w-1/2">
        <div class="w-full flex md:flex-row items-start justify-between">
          <searchBox :selectedExperiences="selectedExperiences" @citySelected="filterCities" @cityRemoved="clearFilter" class="w-2/3"></searchBox>
          <div class="flex flex-col md:items-end mt-6 mr-2">
            <button id="filterDropdownButton"
              @click="dropdownToggle"
              data-dropdown-toggle="filterDropdown" class="w-auto md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none md:bg-white rounded-lg md:border md:border-gray-200 md:hover:bg-gray-100 hover:text-primary-700   md:dark:focus:ring-gray-700 md:dark:bg-gray-800 dark:text-gray-400 md:dark:border-gray-600 dark:hover:text-white md:dark:hover:bg-gray-700" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4 mr-2" viewbox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
              </svg>
              <svg class="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            <div id="filterDropdown" 
            :class="{'hidden' : !toggled}"
            class="absolute top-[190px] z-10 w-48 p-3 mt-3 bg-white rounded-lg shadow dark:bg-gray-700">
                <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Experienced</h6>
                <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                  <li v-for="exp in experiences" :key="exp" class="flex items-center">
                    <input :id="exp" 
                    type="checkbox"
                    v-model="toggle[exp]"  
                    true-value="yes"
                    false-value="no"
                    @change="filterExperiences(exp)"
                    class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label :for="exp" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">{{ exp }}</label>
                  </li>
                </ul>
            </div>
        </div>
        </div>
        <div v-for="user in usersToShow" :key="user.id">
          <card 
            :user="user" 
            class="mt-2"
            @book="toggleModal"
            @favorite="toggleFavorite"
            />
        </div>
      </div>
      <div class="w-full md:w-1/2 h-screen">
        <GoogleMap api-key="AIzaSyDrvWDpSZHy-4tD48QQfirBJTA3yL9cHZ0" :zoom="7" :center="center" class="w-full h-full rounded-lg"/>
      </div>
      <bookingModal :open="open" @update="open =!open" :startHour="6" :endHour="21" @selectedDate="selectedDate" />
      <successModal :open="openModal" @update="openModal =!openModal" />
  </div>
  </body>

  
</template>
<script setup>
import searchBox from '../components/searchbox.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { GoogleMap } from 'vue3-google-map';
import card from '../components/card.vue'
import users from '../users.js'
import bookingModal from '../components/BookingModal.vue'
import successModal from '../components/successModal.vue';

const usersData = reactive(users)
const filteredUsers = ref([])
const center = ref({ lat: 52.00, lng: 20.00 })
const toggle = ref({})
const toggled = ref(false)
const experiences = ref(['Personal Trainer', 'Yoga Instructor', 'Zumba Instructor', 'Spinning Instructor', 'Bodybuilding Coach'])
const selectedExperiences = ref([])
const isFavorite = ref(false)
const open = ref(false)
const openModal = ref(false)

const usersToShow = computed(() => {
  return filteredUsers.value.length > 0 ? filteredUsers.value : usersData;
})

const dropdownToggle = () => {
  toggled.value = !toggled.value
}
const select = () => {
  selectedExperiences.value  = Object.keys(toggle.value).filter(key => toggle.value[key] === 'yes');
  console.log(selectedExperiences.value);
}
const toggleFavorite = (user) => {
  user.favorite = !user.favorite
}
const filterCities = (city) => {
    filteredUsers.value = usersData.filter((user) => user.city === city)
}
const clearFilter = () => {
  filteredUsers.value = []
}

const filterExperiences = (experience) => {
  selectedExperiences.value  = Object.keys(toggle.value).filter(key => toggle.value[key] === 'yes');
  filteredUsers.value = usersData.filter((user) => selectedExperiences.value.includes(user.title))
}

const toggleModal = () => {
  open.value =!open.value
}

const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d.getTime());
}

const selectedDate = (date) => {
  if (date === null) {
    open.value = false;
  } else if (isValidDate(date)) {
    open.value = false;
    openModal.value =!openModal.value
  }
}

</script>
<style scoped> 

body > div {
  background-color: #f8f9fa;
}
</style>
