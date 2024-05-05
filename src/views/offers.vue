<template>
  <div class="flex items-start justify-center md:m-10 m-2 rounded-lg"> 
    <offersCard 
   :offer="offer" 
    class="mt-2"
    @book="toggleModal"
    @favorite="toggleFavorite" />
  </div>

</template>

<script setup>
import offersCard from '../components/offersCard.vue'
import { ref } from 'vue'

const offer = ref({
  uid: 1,
  name: 'face-to-face training',
  duration: '1h',
  price: 100,
  description: 'offer 1 description',
  offerPicture: 'https://picsum.photos/200/300',
  gym: 'fit fat',
  city: 'Poznań',
})
</script>