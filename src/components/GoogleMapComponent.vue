<template>
  <GoogleMap
    :api-key="API_KEY"
    :zoom="zoom"
    :center="center"
    class="w-full h-full rounded-lg"
    ref="mapRef"
  >
    <Marker
      v-for="marker in markers"
      :key="marker.user.uid"
      :options="{ position: marker.position }"
      :title="marker.user.name"
    />
  </GoogleMap>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { API_KEY } from "../basic/const.js";

defineProps({
  zoom: Number,
  center: Object,
  markers: Array,
});

const mapRef = ref(null);

onMounted(() => {
  // Additional logic if needed
});
</script>

<style scoped>
/* Add any styles specific to the GoogleMapComponent here */
</style>
