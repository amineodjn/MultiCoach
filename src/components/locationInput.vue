<template>
  <div>
    <label :for="Modelval" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
    <input 
      ref="locationRef"
      :value="selectedLocation ? selectedLocation : Modelval" 
      :placeholder="placeholder"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
      required
    >
    <div v-if="showError" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue'

const selectedLocation = ref('')

const emit = defineEmits(['input'])
watch(selectedLocation, (newVal) => {
  emit('input', newVal)
})

const props = defineProps({
  Modelval:  String,
  title: String,
  placeholder: String,
  showError: Boolean,
  errorMessage: String
})

const locationRef = ref(null)

onMounted(async () => {
  const src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDrvWDpSZHy-4tD48QQfirBJTA3yL9cHZ0&libraries=places`

  await new Promise ((resolve, reject) => {
    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.head.appendChild(script);
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    } else {
      resolve();
    }
  });

  await new Promise(resolve => {
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });

  const autoComplete = new google.maps.places.Autocomplete(locationRef.value, {
    types: ['(cities)'],
    componentRestrictions: { country: 'PL' }
  });

  google.maps.event.addListener(autoComplete, 'place_changed', () => {
    selectedLocation.value = autoComplete.getPlace().formatted_address
})
})
</script>