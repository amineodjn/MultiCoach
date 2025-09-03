<template>
  <div class="w-full h-full rounded-lg">
    <div v-if="!isLoaded" class="w-full h-full flex items-center justify-center">
      <div class="text-gray-500">Loading map...</div>
    </div>
    <GoogleMap
      v-else
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { loadGoogleMapsScript, waitForGoogleMaps } from "../utils/googleMapsLoader.js";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

defineProps({
  zoom: {
    type: Number,
    required: true,
  },
  center: {
    type: Object,
    required: true,
  },
  markers: {
    type: Array,
    required: true,
  },
});

const mapRef = ref(null);
const isLoaded = ref(false);

onMounted(async () => {
  try {
    await loadGoogleMapsScript();
    await waitForGoogleMaps();
    isLoaded.value = true;
  } catch (error) {
    console.error("Failed to load Google Maps:", error);
  }
});
</script>
