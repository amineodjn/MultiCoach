<template>
  <headerCard page="connections">
    <template v-slot:content>
      <favoriteCoaches />
    </template>
  </headerCard>    
</template>
  
  <script setup>
  import favoriteCoaches from '../views/favoriteCoaches.vue';
  import headerCard from '../components/headerCard.vue';
  </script>
