<template>
  <headerCard page="my-profile">
    <template #content>
      <classes />
      <offers />
    </template>
  </headerCard>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "../store/store.js";

import offers from "../views/offers.vue";
import classes from "./classes.vue";
import headerCard from "../components/headerCard.vue";

const store = useStore();
const userId = computed(() => store.docId);

onMounted(() => {
  if (!userId.value) {
    console.log("docId is not set", userId.value);
  }
});
</script>
