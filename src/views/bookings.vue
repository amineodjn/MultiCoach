<template>
  <headerCard page="bookings">
    <template #content>
      <bookingCard />
    </template>
  </headerCard>    
</template>

<script setup>
import headerCard from '../components/headerCard.vue';
import bookingCard from '../components/bookingCard.vue';
</script>  
  