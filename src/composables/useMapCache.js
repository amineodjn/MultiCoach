import { ref } from "vue";
import { getUserCoordinates } from "../utils/getUserCoordinates";

const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hour in milliseconds
const CACHE_KEYS = {
  MARKERS: "map_markers_cache",
  CENTER: "map_center_cache",
  TIMESTAMP: "map_cache_timestamp",
};

export const useMapCache = () => {
  const userMarkers = ref([]);
  const center = ref({ lat: 52.0, lng: 20.0 });
  const isLoading = ref(false);

  const isCacheValid = () => {
    const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
    if (!timestamp) return false;

    const now = Date.now();
    return now - parseInt(timestamp) < CACHE_EXPIRATION;
  };

  const saveToCache = (markers, center) => {
    localStorage.setItem(CACHE_KEYS.MARKERS, JSON.stringify(markers));
    localStorage.setItem(CACHE_KEYS.CENTER, JSON.stringify(center));
    localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());
  };

  const loadFromCache = () => {
    const markers = JSON.parse(
      localStorage.getItem(CACHE_KEYS.MARKERS) || "[]"
    );
    const center = JSON.parse(
      localStorage.getItem(CACHE_KEYS.CENTER) || '{"lat": 52.0, "lng": 20.0}'
    );
    return { markers, center };
  };

  const initializeMap = async usersData => {
    isLoading.value = true;
    try {
      if (isCacheValid()) {
        const { markers, center: cachedCenter } = loadFromCache();
        userMarkers.value = markers;
        center.value = cachedCenter;
      } else {
        userMarkers.value = await getUserCoordinates(usersData);
        saveToCache(userMarkers.value, center.value);
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      userMarkers.value = [];
      center.value = { lat: 52.0, lng: 20.0 };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    userMarkers,
    center,
    isLoading,
    initializeMap,
  };
};
