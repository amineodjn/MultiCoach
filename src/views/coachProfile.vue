<template>
  <headerCard>
    <template v-slot:content>
      <profileForm /> 
    </template>
  </headerCard>    
</template>

<script setup>
import headerCard from '../components/headerCard.vue'
import profileForm from '../views/profileForm.vue'
</script>