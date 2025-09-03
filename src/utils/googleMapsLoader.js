const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

let isLoaded = false;
let loadPromise = null;

export const loadGoogleMapsScript = async () => {
  if (isLoaded) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    if (!API_KEY || API_KEY === "undefined") {
      reject(new Error("Google Maps API key is not configured. Please set VITE_GOOGLE_API_KEY in your .env file"));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places,marker&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

export const waitForGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout waiting for Google Maps to load"));
    }, 10000);

    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearTimeout(timeout);
        resolve();
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
  });
};

// Note: The vue3-google-map library uses the deprecated google.maps.Marker
// This will show a deprecation warning in the console, but it's still functional
// To use AdvancedMarker, you would need to switch to a different library or
// implement it manually with the native Google Maps API
