<template>
  <toast
    :show="success || error"
    :type="error ? 'error' : 'success'"
    :message="errorMessage"
    @animation-end="handleAnimationEnd"
    @close="handleClose"
  ></toast>
  <div
    class="flex flex-col border-gray-300 mt-5 rounded-lg bg-white shadow-sm p-4"
  >
    <div
      class="flex justify-between flex-col md:flex-row items-start md:items-center py-4 px-5"
    >
      <h2 class="text-2xl font-bold mb-4 lg:m-0">Your classes</h2>
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
        <button
          @click="addClass"
          type="button"
          class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          <svg
            class="w-6 h-6 text-white-800 dark:text-white"
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
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
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
        :coachAccess="true"
        :isAlreadyBooked="isClassBooked(Class.uid)"
        @deleteClass="handleOpenPopup"
      />
      <loadingSpinner v-if="isLoading && displayedClasses.length === 0" />
      <emptyState v-else-if="displayedClasses.length === 0" />
    </div>
    <div
      v-if="store.classes.length > 3"
      class="text-center dark:border-neutral-70"
    >
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
    <div
      id="classesFormDiv"
      v-show="showForm"
      class="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-h-full overflow-y-auto">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">Add classes</h2>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="showForm = false"
            data-modal-toggle="classesModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div
          class="flex flex-col justify-center items-center mt-2 m-2 rounded-lg"
        >
          <classesForm
            @formSubmitted="handleFormSubmission"
            @closeForm="showForm = false"
            @success="handleSuccess"
            @error="handleError"
          />
        </div>
      </div>
    </div>
    <popUpModal
      :open="openPopUp"
      :text="deletePopUpText"
      @confirm="deleteClass"
      @cancel="closePopup"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "../store/store";
import emptyState from "../components/emptyState.vue";
import classesCard from "../components/classesCard.vue";
import classesForm from "../components/classesForm.vue";
import loadingSpinner from "../components/loadingSpinner.vue";
import popUpModal from "../components/popUpModal.vue";
import toast from "../components/toast.vue";
import { deleteSubDocument } from "../utils/useFirebase";
import { cleanupPastClasses } from "../utils/useRecurringClasses";

const store = useStore();
const showForm = ref(false);
const showAllClasses = ref(false);
const searchTerm = ref("");
const isLoading = ref(false);
const openPopUp = ref(false);
const deletePopUpText = ref("Are you sure you want to delete this class?");
const classUid = ref("");
const success = ref(false);
const error = ref(false);
const errorMessage = ref("");
const filteredClasses = computed(() => store.classes);

const handleOpenPopup = uid => {
  classUid.value = uid;
  togglePopup();
};

const togglePopup = () => {
  openPopUp.value = !openPopUp.value;
};
const closePopup = () => {
  openPopUp.value = false;
};

const displayedClasses = computed(() => {
  let filtered = filteredClasses.value;

  if (searchTerm.value) {
    filtered = filtered.filter(Class =>
      Class.className.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (showAllClasses.value) {
    return filtered;
  } else {
    return filtered.slice(0, 3);
  }
});

const viewAllProjects = () => {
  showAllClasses.value = !showAllClasses.value;
};

const toggleForm = () => {
  showForm.value = !showForm.value;
};

const handleFormSubmission = async () => {
  isLoading.value = true;
  await fetchClasses();
  isLoading.value = false;
};

const handleSuccess = () => {
  success.value = true;
};

const handleError = message => {
  error.value = true;
  errorMessage.value = message;
};

const handleAnimationEnd = event => {
  if (event.animationName.includes("slideOutRight")) {
    if (error.value) {
      error.value = false;
      errorMessage.value = "";
    } else {
      success.value = false;
    }
  }
};

const handleClose = () => {
  if (error.value) {
    error.value = false;
  } else {
    success.value = false;
  }
};

const fetchClasses = async () => {
  try {
    isLoading.value = true;
    await store.fetchClasses();
    try {
      await cleanupPastClasses(store.docId);
      await store.fetchClasses();
    } catch (cleanupError) {
      console.error("Failed to cleanup past classes:", cleanupError);
    }
  } catch (error) {
    console.error("Failed to fetch offers:", error);
  } finally {
    isLoading.value = false;
  }
};

const addClass = () => {
  toggleForm();
  if (showForm.value) {
    window.location.hash = "#classesFormDiv";
  }
};

onMounted(async () => {
  await fetchClasses();
  await store.fetchUserBookedClasses();
});

const deleteClass = async () => {
  await deleteSubDocument(store.docId, "classes", classUid.value);
  await fetchClasses();
  closePopup();
};

const isClassBooked = classId => {
  if (!store.user?.bookedClasses) return false;
  return store.user.bookedClasses.some(booking => booking.uid === classId);
};
</script>
