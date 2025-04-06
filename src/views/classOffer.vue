<template>
  <div
    class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm p-4"
  >
    <div class="flex justify-between items-center py-4 px-5">
      <h2 class="text-gray-800 text-lg font-semibold inline-block">Classes</h2>
      <div class="flex items-center md:justify-end space-x-2">
        <div class="relative">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search"
            class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-800 hover:border-indigo-500"
          />
          <svg
            class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm"
    >
      <classesCard
        v-for="Class in displayedClasses"
        :key="Class.uid"
        :trainingClass="Class"
        :customWidth="'w-1/2'"
        :coachAccess="false"
        :readOnly="true"
      />
      <loadingSpinner v-if="isLoading && displayedClasses.length === 0" />
      <emptyState v-else-if="displayedClasses.length === 0" />
    </div>
    <div v-if="classes.length > 3" class="text-center dark:border-neutral-70">
      <a
        class="flex items-center text-indigo-600 font-medium border-b text-sm leading-5 p-3 rounded-b-md space-x-1 justify-center dark:text-indigo-500 dark:hover:text-indigo-600 dark:focus:bg-neutral-700 cursor-pointer"
        @click="viewAllProjects"
      >
        {{ showAllClasses ? "Show less" : "Show all" }}
        <svg
          class="flex-shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import emptyState from "../components/emptyState.vue";
import classesCard from "../components/classesCard.vue";
import loadingSpinner from "../components/loadingSpinner.vue";
import { fetchClasses } from "../utils/useFirebase";

const classes = ref([]);
const showAllClasses = ref(false);
const searchTerm = ref("");
const isLoading = ref(false);

const props = defineProps({
  uid: {
    type: String,
    required: true,
  },
});

const displayedClasses = computed(() => {
  let filteredClasses = classes.value;

  if (searchTerm.value) {
    filteredClasses = filteredClasses.filter(Class =>
      Class.className.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (showAllClasses.value) {
    return filteredClasses;
  } else {
    return filteredClasses.slice(0, 3);
  }
});

const viewAllProjects = () => {
  showAllClasses.value = !showAllClasses.value;
};

const fetchCoachClasses = async () => {
  if (!props.uid) {
    return;
  }

  isLoading.value = true;

  try {
    const data = await fetchClasses(props.uid);
    classes.value = data.length ? data : [];
  } catch (error) {
    console.error("Error fetching classes:", error);
    classes.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchCoachClasses();
});
</script>
