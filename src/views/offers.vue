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
        @favorite="deleteOffer" />
  </div>
  <div class="flex flex-col justify-center items-center mt-10 m-2 rounded-lg">
    <h2 class="mb-4 w-1/2 text-2xl font-bold text-gray-900 dark:text-white">Add your offer</h2>
  </div>
  <div class="flex flex-col justify-center items-center mt-2 m-2 rounded-lg">
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