<template>
  <div class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm p-4">
    <div class="flex justify-between items-center py-4 px-5">
      <h2 class="text-2xl font-bold">Your connections</h2>

    </div>
    <div class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm">
      <favoritesCard 
          v-for="coach in favoriteCoaches" :key="coach.uid"
          :favoriteCoach="coach" 
          :customWidth="'w-1/2'"
          :coachAccess="false"
          @book="toggleModal"
          @deleteOffer="deleteOffer" />
      <emptyState v-if="favoriteCoaches.length === 0" />
    </div>
    <div v-if="favoriteCoaches.length > 0" class="text-center dark:border-neutral-70 hover:bg-gray-50">
      <a class="flex  items-center text-blue-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center  dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700"
         @click="viewAllProjects">
        {{ showAllOffers ? 'Show less' : 'Show all' }}
        <svg class="flex-shrink-0  w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>         
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../main'; 
import { useStore } from '../store/store';
import emptyState from '../components/emptyState.vue';
import favoritesCard from '../components/favoritesCard.vue';


const store = useStore();
const showForm = ref(false);
const showAllOffers = ref(false);

const favoriteCoaches = computed(() => {
  const favorites = store.favoriteCoaches;
  if(!showAllOffers.value) {
    return favorites.slice(0, 3);
  }
  return favorites;
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