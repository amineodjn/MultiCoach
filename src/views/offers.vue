<template>
  <div class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm">
    <div class="flex justify-between items-center py-4 px-5">
      <h2 class="text-2xl font-bold">Offers</h2>
      <div class="flex items-center md:justify-end space-x-2">
        <div class="relative">
          <input type="text" placeholder="Search" class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-800">
          <svg class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <button @click="addOffer" type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
          <svg class="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
          </svg>
          Add offer
        </button>
      </div>
    </div>
    <div class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm">
      <offersCard 
          v-for="offer in displayedOffers" :key="offer.uid"
          :offer="offer" 
          :customWidth="'w-1/2'"
          :coachAccess="true"
          @book="toggleModal"
          @deleteOffer="deleteOffer" />
    </div>
    <div class="text-center dark:border-neutral-70 hover:bg-gray-50">
      <a class="flex  items-center text-blue-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center  dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700"
         @click="viewAllProjects">
        {{ showAllOffers ? 'Show less' : 'Show all' }}
        <svg class="flex-shrink-0  w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>         
    </div>
    <div id="offersFormDiv" v-show="showForm" class="p-4">
        <h2 class="text-2xl font-bold">Add offers</h2>
    </div>
  </div>
  <div v-show="showForm" class="flex flex-col justify-center items-center mt-2 m-2 rounded-lg">
    <offersForm />
  </div>

</template>

<script setup>
import offersCard from '../components/offersCard.vue'
import offersForm from '../components/offersForm.vue'
import { onMounted, ref, computed } from 'vue';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../main'; 
import { useStore } from '../store/store';


const store = useStore();
const offers = ref([]);
const showForm = ref(false);
const showAllOffers = ref(false);

const displayedOffers = computed(() => {
  if (showAllOffers.value) {
    return offers.value;
  } else {
    return offers.value.slice(0, 3);
  }
});

const viewAllProjects = () => {
  showAllOffers.value = !showAllOffers.value;
};

const fetchOffers = async () => {
  if (!store.docId) {
    console.log('docId is not set', store.docId);
    return;
  }

  const offersRef = collection(db, "coaches", store.docId, "Offers");
  const querySnapshot = await getDocs(offersRef);

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map(doc => doc.data());
    offers.value = data;
  } else {
    console.log('No such document!');
  }
};

const addOffer = () => {
  showForm.value = !showForm.value;
  if (showForm.value) {
    window.location.hash = '#offersFormDiv';
  }
};

onMounted(async () => {
  fetchOffers();});

const toggleModal = () => {
  console.log('toggle modal')
}

const deleteOffer = async (uid) => {
  const offerRef = doc(db, "coaches", store.docId, "Offers", uid);

  try {
    await deleteDoc(offerRef);
    console.log(`Offer with uid ${uid} has been deleted.`);
    // Fetch the updated list of offers after deleting
    fetchOffers();
  } catch (error) {
    console.error("Error deleting offer: ", error);
  }
};
</script>