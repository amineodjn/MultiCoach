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
import { ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { API_KEY } from "../basic/const.js";

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
</script>
