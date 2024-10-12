<template>
  <headerCard page="connections">
    <template #content>
      <favoriteCoaches />
    </template>
  </headerCard>
</template>

<script setup>
import favoriteCoaches from "../views/favoriteCoaches.vue";
import headerCard from "../components/headerCard.vue";
</script>
