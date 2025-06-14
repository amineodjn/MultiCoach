<template>
  <body>
    <div
      class="flex flex-col md:flex-row items-start justify-center md:m-10 m-2 rounded-lg"
    >
      <div class="flex flex-col h-screen lg:w-1/2">
        <div class="w-full flex md:flex-row items-start justify-between">
          <searchBox
            :selectedExperiences="selectedExperiences"
            @citySelected="filterCities"
            @cityRemoved="clearFilter"
            class="w-2/3 mx-2"
          ></searchBox>
          <filterDropdown
            :experiences="experiences"
            @filterExperiences="filterExperiences"
          />
        </div>
        <div v-for="user in filteredUsers" :key="user.uid">
          <card
            :user="user"
            class="mt-2"
            :favorite="isFavorite(user)"
            :disabled="!store.user"
            @book="toggleModal"
            @favorite="toggleFavorite(user)"
          />
        </div>
        <loadingSpinner v-if="isLoading" />
        <emptyState
          v-else-if="!isLoading && filteredUsers.length === 0"
          class="mx-4"
        />
      </div>
      <div class="flex lg:w-1/2 h-screen">
        <loadingSpinner v-if="mapLoading || userMarkers.length === 0" />
        <GoogleMap
          v-else
          :zoom="7"
          :center="center"
          class="w-full h-full rounded-lg"
          ref="mapRef"
          :markers="userMarkers"
        />
      </div>
      <bookingModal
        :open="open"
        @update="open = !open"
        :startHour="startHour"
        :endHour="endHour"
        @confirmBooking="confirmBooking"
        @selectedDate="selectedDate"
        :bookedCoach="bookedCoach"
      />
      <successModal :open="openModal" @update="openModal = !openModal" />
      <popUpModal
        :open="openPopUp"
        :text="text"
        @confirm="confirmBooking"
        @cancel="cancel"
      />
    </div>
  </body>
</template>
<script setup>
import searchBox from "../components/searchbox.vue";
import { ref, onMounted, computed, watch } from "vue";
import { arrayUnion } from "firebase/firestore";
import {
  onAuthStateChangedPromise,
  fetchUsers,
  updateDocument,
} from "../utils/useFirebase.js";
import { useStore } from "../store/store";
import card from "../components/card.vue";
import emptyState from "../components/emptyState.vue";
import popUpModal from "../components/popUpModal.vue";
import bookingModal from "../components/BookingModal.vue";
import successModal from "../components/successModal.vue";
import { useRouter } from "vue-router";
import loadingSpinner from "../components/loadingSpinner.vue";
import GoogleMap from "../components/GoogleMap.vue";
import filterDropdown from "../components/filterDropdown.vue";
import { useMapCache } from "../composables/useMapCache";

const router = useRouter();
const store = useStore();
const usersData = ref([]);
const filteredUsers = ref([]);
const toggle = ref({});
const experiences = ref([]);
const selectedExperiences = ref([]);
const selectedCity = ref("");
const open = ref(false);
const openModal = ref(false);
const bookedCoach = ref("");
const offerName = ref(localStorage.getItem("bookedOfferName"));
const isLoading = ref(false);
const startHour = 6;
const endHour = 21;
const openPopUp = ref(false);

const {
  userMarkers,
  center,
  isLoading: mapLoading,
  initializeMap,
} = useMapCache();

const selectedDateandTime = computed(() => {
  return localStorage.getItem("selectedDateandTime");
});
const text = computed(() => {
  return `Are you sure you want to book ${
    offerName.value
  } at ${toLocaleStringTimeOrDate(selectedDateandTime.value)}?`;
});

const getUsers = async () => {
  isLoading.value = true;
  const userList = await fetchUsers();
  isLoading.value = false;
  return userList;
};

const isFavorite = user => {
  return store.favoriteCoaches?.some(c => c.uid === user.uid);
};

const toggleFavorite = async coach => {
  const isAlreadyFavorite = isFavorite(coach);
  store.favoriteCoaches = isAlreadyFavorite
    ? store.favoriteCoaches.filter(c => c.uid !== coach.uid)
    : [...store.favoriteCoaches, coach];

  const userType = store.user.coach ? "coaches" : "users";
  await updateDocument(userType, store.docId, {
    favoriteCoaches: store.favoriteCoaches,
  });
};

const filterCities = city => {
  if (city.length > 0) {
    selectedCity.value = city;
    filteredUsers.value = usersData.value.filter(user => user.city === city);
  }
};

const clearFilter = () => {
  selectedCity.value = "";
  if (selectedExperiences.value.length === 0) {
    filteredUsers.value = usersData.value;
    return;
  } else {
    filteredUsers.value = usersData.value.filter(user => {
      return selectedExperiences.value.includes(user.profession);
    });
  }
};

const filterExperiences = exp => {
  toggle.value[exp] = toggle.value[exp] === "yes" ? "no" : "yes";
  selectedExperiences.value = Object.keys(toggle.value).filter(
    key => toggle.value[key] === "yes"
  );

  if (selectedExperiences.value.length === 0 && selectedCity.value === "") {
    filteredUsers.value = usersData.value;
    return;
  }

  filteredUsers.value = usersData.value.filter(user => {
    const hasSelectedExperience = selectedExperiences.value.includes(
      user.profession
    );
    const isInSelectedCity = user.city === selectedCity.value;

    if (selectedCity.value && selectedExperiences.value.length > 0) {
      return hasSelectedExperience && isInSelectedCity;
    } else if (selectedExperiences.value.length > 0) {
      return hasSelectedExperience;
    } else if (selectedCity.value) {
      return isInSelectedCity;
    }

    return false;
  });
};

const toggleModal = id => {
  bookedCoach.value = id;
  open.value = !open.value;
};

const isValidDate = d => {
  return d instanceof Date && !isNaN(d.getTime());
};

const selectedDate = date => {
  if (date === null) {
    open.value = false;
  } else if (isValidDate(date) && store.docId) {
    open.value = false;
    openModal.value = !openModal.value;
  }
};

watch(selectedDateandTime, newValue => {
  openPopUp.value = !!newValue;
});

const toLocaleStringTimeOrDate = date => {
  const formattedDate = new Date(date);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return formattedDate.toLocaleDateString(undefined, options);
};

const confirmBooking = async () => {
  const bookedOffer = localStorage.getItem("bookedOffer");
  const bookedOfferName = localStorage.getItem("bookedOfferName");
  const bookedCoach = localStorage.getItem("bookedCoach");

  const user = await onAuthStateChangedPromise();
  if (user) {
    const date = new Date(localStorage.getItem("selectedDateandTime"));

    const userType = store.user.coach ? "coaches" : "users";

    if (date && user.uid) {
      const newEvent = {
        bookedOffer: bookedOffer,
        offerName: bookedOfferName,
        bookingTime: date,
        bookedCoach: bookedCoach,
      };
      const newBooking = {
        bookedOffer: bookedOffer,
        offerName: bookedOfferName,
        bookingTime: date,
        user: user.uid,
      };
      await updateDocument(userType, user.uid, {
        bookedOffers: arrayUnion(newEvent),
      });

      await updateDocument("coaches", bookedCoach, {
        bookings: arrayUnion(newBooking),
      });

      localStorage.removeItem("selectedDateandTime");
      localStorage.removeItem("bookedOffer");
      localStorage.removeItem("bookedOfferName");
      localStorage.removeItem("bookedCoach");
      openModal.value = true;
      open.value = false;
      openPopUp.value = false;
    }
  } else {
    router.push("/sign-in");
  }
};

const cancel = () => {
  openPopUp.value = false;
  localStorage.removeItem("selectedDateandTime");
  localStorage.removeItem("bookedOffer");
  localStorage.removeItem("bookedOfferName");
  localStorage.removeItem("bookedCoach");
};

onMounted(async () => {
  usersData.value = await getUsers();
  filteredUsers.value = usersData.value;
  experiences.value = [
    ...new Set(
      usersData.value
        .filter(user => user.profession && user.profession !== "")
        .map(user => user.profession)
    ),
  ];

  if (store.user) {
    await store.fetchFavoriteCoaches();
  }

  await initializeMap(usersData.value);
});
</script>
<style scoped>
body > div {
  background-color: #f8f9fa;
}
</style>
