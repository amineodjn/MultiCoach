<template>
  <toast
    :show="success"
    type="success"
    @animation-end="handleAnimationEnd"
    @close="handleClose"
  ></toast>
  <headerCard page="schedule">
    <template #content>
      <div
        class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm p-4"
      >
        <div class="flex justify-between items-center py-4 px-5">
          <h2 class="text-2xl font-bold">Your schedule</h2>
        </div>
        <div class="border-gray-300 mt-5 rounded-lg bg-white shadow-sm">
          <loadingSpinner v-if="isLoading" />
          <form
            v-else
            @submit.prevent="submitSchedule"
            class="flex flex-col items-center"
          >
            <div class="flex flex-col mb-6 md:grid-cols-2">
              <div
                class="flex justify-between items-center mt-3"
                v-for="(day, index) in days"
                :key="index"
              >
                <h3 class="mt-7">{{ capitalaizefirstLetter(day.name) }}</h3>
                <timePickerRange
                  :day="day.name.toLowerCase()"
                  v-model:startTime="day.startTime"
                  v-model:endTime="day.endTime"
                />
              </div>
            </div>
            <button
              type="submit"
              class="text-white mb-6 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </template>
  </headerCard>
</template>

<script setup>
import headerCard from "../components/headerCard.vue";
import toast from "../components/toast.vue";
import { ref, computed, onMounted } from "vue";
import { db } from "../firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import timePickerRange from "../components/timePickerRange.vue";
import { useStore } from "../store/store.js";
import loadingSpinner from "../components/loadingSpinner.vue";

const store = useStore();
const userId = computed(() => store.docId);
const days = ref([]);
const success = ref(false);
const isLoading = ref(false);

const capitalaizefirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const submitSchedule = async () => {
  const coachRef = doc(db, "coaches", userId.value);
  const schedule = days.value.reduce((acc, day) => {
    acc[day.name] = { startTime: day.startTime, endTime: day.endTime };
    return acc;
  }, {});
  await setDoc(coachRef, { schedule }, { merge: true });
  success.value = true;
};

const handleAnimationEnd = event => {
  if (event.animationName.includes("slideOutRight")) {
    success.value = false;
  }
};

const handleClose = () => {
  success.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  const coachRef = doc(db, "coaches", userId.value);
  const docSnap = await getDoc(coachRef);

  if (docSnap.exists() && docSnap.data().schedule) {
    const schedule = docSnap.data().schedule;
    days.value = Object.keys(schedule).map(day => ({
      name: day,
      startTime: schedule[day].startTime,
      endTime: schedule[day].endTime,
    }));
  } else {
    days.value = [
      { name: "Monday", startTime: "09:00", endTime: "18:00" },
      { name: "Tuesday", startTime: "09:00", endTime: "18:00" },
      { name: "Wednesday", startTime: "09:00", endTime: "18:00" },
      { name: "Thursday", startTime: "09:00", endTime: "18:00" },
      { name: "Friday", startTime: "09:00", endTime: "18:00" },
      { name: "Saturday", startTime: "09:00", endTime: "18:00" },
      { name: "Sunday", startTime: "09:00", endTime: "18:00" },
    ];
  }
  isLoading.value = false;
});
</script>
