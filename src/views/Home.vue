<template>
  <body>
    <div class="flex flex-col md:flex-row items-start justify-center md:m-10 m-2 rounded-lg" >
      <div class="flex flex-col h-screen md:w-1/2">
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
        <div v-for="user in filteredUsers" :key="user.uid">
          <card 
            :user="user" 
            class="mt-2"
            :favorite="isFavorite(user)"
            @book="toggleModal"
            @favorite="toggleFavorite(user)"
            />
        </div>
        <emptyState v-if="filteredUsers.length === 0" class="mx-4" />
      </div>
      <div class="w-full md:w-1/2 h-screen">
        <GoogleMap api-key="AIzaSyDrvWDpSZHy-4tD48QQfirBJTA3yL9cHZ0" :zoom="7" :center="center" class="w-full h-full rounded-lg"/>
      </div>
      <bookingModal :open="open" @update="open =!open" :startHour="6" :endHour="21" @confirmBooking="confirmBooking" @selectedDate="selectedDate" :bookedCoach="bookedCoach" />
      <successModal :open="openModal" @update="openModal =!openModal" />
      <popUpModal 
        :open="openPopUp" 
        :text="text"
        @confirm="confirmBooking"
        @cancel="cancel"
      />
  </div>
  </body>

  
</template>
<script setup>
import searchBox from '../components/searchbox.vue'
import { ref, onMounted, computed, onBeforeUpdate } from 'vue'
import { db } from '../main.js';
import { doc, collection, getDocs, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, getAuth  } from "firebase/auth";
import { GoogleMap } from 'vue3-google-map';
import { useStore } from '../store/store';
import card from '../components/card.vue'
import emptyState from '../components/emptyState.vue';
import popUpModal from '../components/popUpModal.vue';
import bookingModal from '../components/BookingModal.vue'
import successModal from '../components/successModal.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const usersData = ref([])
const filteredUsers = ref([])
const center = ref({ lat: 52.00, lng: 20.00 })
const toggle = ref({})
const toggled = ref(false)
const experiences = ref([])
const selectedExperiences = ref([])
const selectedCity = ref('')
const open = ref(false)
const openModal = ref(false)
const bookedCoach = ref('')
const offerName = ref(localStorage.getItem('bookedOfferName'));


const getUsers = async () => {
  const usersCollection = collection(db, 'coaches');
  const userSnapshot = await getDocs(usersCollection);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
};

const dropdownToggle = () => {
  toggled.value = !toggled.value
}

let favoriteCoaches = ref([]);

const fetchFavoriteCoaches = async () => {
  const docRef = store.user.coach ? store.userDoc("coaches") : store.userDoc("users");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    favoriteCoaches.value = user.favoriteCoaches;
  } else {
    console.log("No such document!");
  }
}

const  isFavorite = (user) => {
  return favoriteCoaches.value.some((c) => c.uid === user.uid);
}
const toggleFavorite = async (coach) => {  
  isFavorite(coach);
  const isAlreadyConnected = favoriteCoaches.value.find(c => c.uid === coach.uid);
  if (!isAlreadyConnected) {
    favoriteCoaches.value.push(coach);
  } else {
    favoriteCoaches.value = favoriteCoaches.value.filter(c => c.uid !== coach.uid);
  }
  const userRef = store.user.coach ? store.userDoc('coaches') :  store.userDoc('users');
  await updateDoc(userRef, { favoriteCoaches: favoriteCoaches.value }, { merge: true });
  store.favoriteCoaches = favoriteCoaches.value;
  
};
const filterCities = (city) => {
  if(city.length > 0 ) {
    selectedCity.value = city;
    filteredUsers.value = usersData.value.filter((user) => user.city === city)
  }
}
const clearFilter = () => {
  selectedCity.value = '';
  if(selectedExperiences.value.length === 0) {
    filteredUsers.value = usersData.value;
    return;
  } else {
    filteredUsers.value = usersData.value.filter((user) => {
    return selectedExperiences.value.includes(user.profession) })
  }
}

const filterExperiences = () => {
  selectedExperiences.value = Object.keys(toggle.value).filter(key => toggle.value[key] === 'yes');

  if(selectedExperiences.value.length === 0 && selectedCity.value === '') {
    filteredUsers.value = usersData.value;
    return;
  }

  filteredUsers.value = usersData.value.filter(user => {
    const hasSelectedExperience = selectedExperiences.value.includes(user.profession);
    const isInSelectedCity = user.city === selectedCity.value;

    if (selectedCity.value && selectedExperiences.value.length > 0) {
      return hasSelectedExperience && isInSelectedCity;
    } else if (selectedExperiences.value.length > 0) {
      return hasSelectedExperience;
    } else if (selectedCity.value) {
      return isInSelectedCity;
    }

    return false;
  });
}

const toggleModal = (id) => {
  bookedCoach.value = idfetchFavoriteCoaches
  open.value =!open.value
}

const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d.getTime());
}

const selectedDate = (date) => {
  if (date === null) {
    open.value = false;
  } else if (isValidDate(date) && store.docId) {
    open.value = false;
    openModal.value =!openModal.value
  }
}

///Confirmation Modal
const openPopUp = ref(false);
const selectedDateandTime = computed(() => {
  const selectedDate = localStorage.getItem('selectedDateandTime');
  if(!selectedDate) {
    openPopUp.value = false;
  } else {
    openPopUp.value = true;
  }
  return selectedDate
});

const toLocaleStringTimeOrDate = (date) => {
      const formattedDate = new Date(date);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      return formattedDate.toLocaleDateString(undefined, options);
};
const text = computed(() => {
  return `Are you sure you want to book ${offerName.value} at ${toLocaleStringTimeOrDate(selectedDateandTime.value)}?`
})

const confirmBooking = async () => {
   const bookedOffer = localStorage.getItem('bookedOffer');
   const bookedOfferName = localStorage.getItem('bookedOfferName');
   const bookedCoach = localStorage.getItem('bookedCoach');
   
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, proceed with booking
        const date = new Date(localStorage.getItem('selectedDateandTime'));
  
        // Save the booking to Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        if (date && auth.currentUser.uid) {
          const newEvent = { bookedOffer: bookedOffer, offerName: bookedOfferName, bookingTime: date, bookedCoach: bookedCoach };
          await updateDoc(userRef, { 
            bookedEvents: arrayUnion(newEvent) 
          });
          localStorage.removeItem('selectedDateandTime');
          localStorage.removeItem('bookedOffer');
          localStorage.removeItem('bookedOfferName');
          localStorage.removeItem('bookedCoach');
          openModal.value=true;
          open.value = false;
          openPopUp.value= false;
        }
      } else {
        // No user is signed in, handle accordingly
        router.push('/sign-in');
      }
    });
  }

const cancel = () => {
  openPopUp.value = false;
  localStorage.removeItem('selectedDateandTime');
  localStorage.removeItem('bookedOffer');
  localStorage.removeItem('bookedOfferName');
  localStorage.removeItem('bookedCoach');
};
onMounted(async () => {
  usersData.value = await getUsers();
  filteredUsers.value = usersData.value;
  experiences.value = [...new Set(usersData.value
    .filter(user => user.profession && user.profession !== '')
    .map(user => user.profession))];
});
onBeforeUpdate(() => {
  fetchFavoriteCoaches();
})
</script>
<style scoped> 

body > div {
  background-color: #f8f9fa;
}
</style>
