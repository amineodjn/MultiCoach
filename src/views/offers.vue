<template>
  <div class="flex flex-col justify-center items-center mt-10 m-2 rounded-lg">
    <h2 class="mb-4 w-1/2 text-2xl font-bold text-gray-900 dark:text-white">Offers</h2>
  </div>
  <div class="flex flex-col justify-center items-center mt-2 m-2 rounded-lg">
    <offersCard 
        v-for="offer in offers" :key="offer.uid"
        :offer="offer" 
        class="mt-2"
        :customWidth="'w-1/2'"
        :coachAccess="true"
        @book="toggleModal"
        @deleteOffer="deleteOffer" />
  </div>
  <div class="flex flex-col justify-center items-center mt-10 m-2 rounded-lg">
    <button @click="showForm = !showForm" type="button" class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
      <svg class="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
      </svg>
      Add offer
    </button>
  </div>
  <div v-if="showForm" class="flex flex-col justify-center items-center mt-2 m-2 rounded-lg">
    <offersForm />
  </div>

</template>

<script setup>
import offersCard from '../components/offersCard.vue'
import offersForm from '../components/offersForm.vue'
import { onMounted, ref } from 'vue';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../main'; 
import { useStore } from '../store/store';


const store = useStore();
const offers = ref([]);
const showForm = ref(false);

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