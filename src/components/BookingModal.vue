<template>
  <!-- Main modal -->
  <div id="timepicker-modal" tabindex="-1" aria-hidden="true" 
    :class="{ 'hidden': !open }" 
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  bg-black bg-opacity-50 h-[calc(100%-1rem)] max-h-full">
    <!-- <div class="relative p-4 w-full max-w-[23rem] max-h-full"> -->
      <div class="relative p-4 max-h-full">
      <!-- Modal content -->
      <div v-if="!showSecondModal" class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Pick your offer
          </h3>
          <button id="close-modal" type="button" 
            @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="timepicker-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 pt-0">
          <offersCard 
            v-for="offer in offers" :key="offer.uid"
            :offer="offer" 
            :customWidth="'w-auto'"
            class="mt-2"
            @book="selectOffer"
            @favorite="selectOffer" />
        </div>
        <div class="flex items-center justify-center">
          <button 
            type="button" 
            class="text-white w-1/2 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            @click="selectDateAndTime"
            >Next</button>
        </div>
      </div>
      <div v-if="showSecondModal" class="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <!-- Modal header -->
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Schedule an appointment
          </h3>
          <button id="close-modal" type="button" 
            @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="timepicker-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
          </button>
        </div> 
        <!-- Modal body -->
        <div class="p-4 pt-0 flex">
          <div id="date-picker" :data-date="selectedDate" class="mx-auto sm:mx-0 flex justify-center my-5 [&>div>div]:shadow-none [&>div>div]:bg-gray-50 [&_div>button]:bg-gray-50"></div>
          <div class="my-5 p-4">
            <label class="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
           Pick your time
          </label>
          <ul id="timetable" class="grid w-full grid-cols-3 gap-2 mb-5">
            <li v-for="time in times" :key="time.id">
              <input type="radio"  :id="time.id" v-model="selectedTime" :value="time.label" class="hidden peer" name="timetable">
              <label :for="time.id"
                class="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-indigo-500 peer-checked:border-indigo-700 dark:hover:border-gray-600 dark:peer-checked:text-indigo-500               peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-indigo-900">
                {{ time.label }}
              </label>
            </li>
          </ul>
          <p v-if="showError" id="filled_error_help" class="mb-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh, snapp!</span> please select the date and time.</p>
          </div>
          
          
        </div>
        <div class="flex items-center justify-center">
              <button 
                type="button" 
                class="text-white w-1/2 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                @click="saveBooking"
                >next</button>
          </div>
      </div>
    </div>
  </div>
  </template>
  <script setup>
  import { ref, defineEmits, onMounted, watch, nextTick } from 'vue';
  import Datepicker from 'flowbite-datepicker/Datepicker';
  import { onAuthStateChanged, getAuth } from "firebase/auth";
  import { useRouter } from 'vue-router';
  import { db } from '../main.js';
  import { doc, collection, updateDoc, arrayUnion, getDocs  } from 'firebase/firestore';
  import offersCard from '../components/offersCard.vue'

  import { useStore } from '../store/store';


const store = useStore();
const offers = ref([]);
const user = ref(null); 

const fetchOffers = async () => {
  console.log('fetching offers', props.bookedCoach) ;
  if (!props.bookedCoach) {
    console.log('docId is not set', props.bookedCoach);
    return;
  }

  const offersRef = collection(db, "coaches", props.bookedCoach, "Offers");
  const querySnapshot = await getDocs(offersRef);

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map(doc => doc.data());
    offers.value = data;
  } else {
    console.log('No such document!');
  }
};


onMounted(async () => {
  fetchOffers();});

  const selectedTime = ref(null);
  const selectedDate = ref(null);
  const props = defineProps({
    open: {
      type: Boolean,
      default: false
    },
    startHour: {
      type: Number,
      default: 6
    },
    endHour: {
      type: Number,
      default: 22
    },
    bookedCoach: {
      type: String,
      default: ''
    }
  })
  
  watch(() => props.bookedCoach, fetchOffers, { immediate: true });
  

  const times = ref([]);
  for (let i = props.startHour; i <= props.endHour; i++) {
    let hour = i;
    let period = 'AM';
    if (i > 12) {
      hour = i - 12;
      period = 'PM';
    }
    times.value.push({ id: `${i}-am`, label: `${hour}:00 ${period}` });
  }
  
  // // initialize components based on data attribute selectors
  // onMounted(() => {
  //     const $Datepicker = document.querySelector('#date-picker')
  
  //     if ($Datepicker) {
  //       selectedDate.value = new Datepicker($Datepicker);
  //     }
  // })
  
  const emit = defineEmits(['update', 'selectedDate'])
  
  const closeModal = () => {
    emit('update', false)
    emit('selectedDate', null)
    selectedTime.value = null;
    showSecondModal.value = false;
  }

  const showSecondModal = ref(false);
  watch(() => showSecondModal.value, () => {
  nextTick().then(() => {
    const $Datepicker = document.querySelector('#date-picker');
    if ($Datepicker) {
      selectedDate.value = new Datepicker($Datepicker);
    }
  });
}, { immediate: true });

const bookedOffer = ref(null);
  const selectOffer = (uid) => {
    bookedOffer.value = uid;
    console.log('new favorite', bookedOffer.value);
  }

  const selectDateAndTime = () => {
    showSecondModal.value = !showSecondModal.value
  }
  
  const showError = ref(false);
  const router = useRouter();
  
  
  const saveBooking = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, proceed with booking
        if (!selectedDate.value || !selectedTime.value) {
          showError.value = true;
          return;
        }
  
        const timestamp = selectedDate.value.dates[0];
        const date = new Date(timestamp);
  
        const time = selectedTime.value; 
        const [hourStr, minuteStr] = time.split(':');
        const period = minuteStr.slice(-2);
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
  
        // Convert to 24-hour format
        if (period === 'PM' && hour !== 12) {
          hour += 12;
        } else if (period === 'AM' && hour === 12) {
          hour = 0;
        }
  
        date.setHours(hour);
        date.setMinutes(minute);

        // Save the booking to Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        if (date && auth.currentUser.uid) {
          const newEvent = { bookedOffer: bookedOffer.value, bookingTime: date, bookedCoach: props.bookedCoach };
          await updateDoc(userRef, { 
            bookedEvents: arrayUnion(newEvent) 
          });
        }
        emit('selectedDate', date)
      } else {
        // No user is signed in, handle accordingly
        console.log('User is not signed in');
  
        // Store the selected date and time in localStorage
        localStorage.setItem('selectedDateandTime', date);
        router.push('/sign-in');
      }
    });
  }
  </script>