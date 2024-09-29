<template>
  <headerCard page="bookings">
    <template v-slot:content>
      <bookingCard />
    </template>
  </headerCard>    
</template>

<script setup>
import headerCard from '../components/headerCard.vue';
import bookingCard from '../components/bookingCard.vue';
</script>  
  