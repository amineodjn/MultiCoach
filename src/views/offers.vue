<template>
  <div class="flex flex-col justify-center items-center md:m-10 m-2 rounded-lg"> 
    <offersCard 
        v-for="offer in offers" :key="offer.uid"
        :offer="offer" 
        class="mt-2"
        @book="toggleModal"
        @favorite="toggleFavorite" />
    <offersForm />
      
  </div>

</template>

<script setup>
import offersCard from '../components/offersCard.vue'
import offersForm from '../components/offersForm.vue'
import { onMounted, ref } from 'vue';
import { collection, getDocs, doc, where } from 'firebase/firestore';
import { db } from '../main'; 
import { useStore } from '../store/store';


const store = useStore();
const offers = ref([]);
const user = ref(null); 

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

const toggleFavorite = () => {
  console.log('toggle favorite')
}
</script>