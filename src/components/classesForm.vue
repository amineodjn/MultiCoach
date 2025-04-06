<template>
  <section class="bg-white dark:bg-gray-900">
    <form @submit.prevent="submitClass">
      <div class="grid gap-6 mb-4 md:grid-cols-2">
        <inputValidation
          :Modelval="className"
          title="Class name"
          :error-message="errorMessages.className"
          placeholder="yoga session"
          @input="className = $event.target.value"
          :showError="showError.className"
        ></inputValidation>
        <inputValidation
          :Modelval="price"
          title="Price"
          :error-message="errorMessages.price"
          placeholder="100"
          @input="price = $event.target.value"
          :showError="showError.price"
        ></inputValidation>
        <locationInput
          :Modelval="location"
          title="Location"
          :error-message="errorMessages.location"
          placeholder="Poznań"
          @input="location = $event"
        ></locationInput>
        <inputValidation
          :Modelval="gym"
          title="Gym"
          :error-message="errorMessages.gym"
          placeholder="Gym world, can be?"
          @input="gym = $event.target.value"
          :showError="showError.gym"
        ></inputValidation>
        <datePicker
          :showError="showError.date"
          :error-message="errorMessages.date"
          v-model="date"
        />
        <timePicker
          :showError="showError.time"
          :error-message="errorMessages.time"
          v-model="time"
        />
        <counterInput
          v-model="counter"
          label="Choose number of guests"
          title="Guests"
        />
      </div>
      <div>
        <textArea
          :Modelval="classDescription"
          title="Description"
          :error-message="errorMessages.classDescription"
          placeholder="Enter your classes description"
          @input="classDescription = $event.target.value"
          :showError="showError.classDescription"
        ></textArea>
      </div>
      <div class="flex flex-col justify-center w-full mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
          >Upload your class image</label
        >
        <input
          @change="imageEvent = $event"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        <p
          class="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      </div>
      <div v-if="selectedFile" class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <svg
            class="w-6 h-5 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
            ></path>
          </svg>
        </div>
        <label
          for="remember"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          ><a
            :href="imageUrl"
            class="text-indigo-600 hover:underline dark:text-indigo-500"
            >{{ imageName }}</a
          >.</label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      >
        Add
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useStore } from "../store/store.js";
import inputValidation from "../components/inputValidation.vue";
import locationInput from "../components/locationInput.vue";
import textArea from "../components/textarea.vue";
import datePicker from "./datePicker.vue";
import timePicker from "../components/timePicker.vue";
import counterInput from "../components/counterInput.vue";
import { useUploadImage } from "../utils/useUploadImage.js";
import { saveDocument } from "../utils/useFirebase.js";
import {
  splitCamelCase,
  isValidDate,
  isValidTime,
} from "../utils/formUtils.js";

const store = useStore();
const userId = computed(() => store.docId);
const imageEvent = ref(null);
const date = ref("yyyy-MM-dd");
const time = ref("00:00");
const counter = ref(1);

const className = ref("");
const classDescription = ref("");
const price = ref("");
const location = ref("");
const gym = ref("");
const selectedFile = ref(null);
const imageUrl = ref("");
const imageName = ref("");

const errorMessages = reactive({
  className: "",
  classDescription: "",
  price: "",
  location: "",
  gym: "",
  time: "",
  date: "",
});

const showError = reactive({
  className: false,
  classDescription: false,
  price: false,
  location: false,
  gym: false,
  time: false,
  date: false,
});

const emit = defineEmits(["formSubmitted", "closeForm", "success", "error"]);
const checkForErrors = computed(() => {
  return Object.values(showError).some(value => value === true);
});

async function submitClass() {
  const dataObj = {
    className: className.value,
    classDescription: classDescription.value,
    price: price.value,
    location: location.value,
    gym: gym.value,
    time: time.value,
    date: date.value,
    counter: counter.value,
  };

  resetErrors();
  validateData(dataObj);

  if (!checkForErrors.value) {
    try {
      await saveDocument(`coaches/${userId.value}/classes`, dataObj);

      if (imageEvent.value) {
        try {
          await useUploadImage({
            event: imageEvent.value,
            docPath: `coaches/${userId.value}/classes`,
            field: "classImage",
            imageUrl,
            imageName,
          });
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
          emit("error", "Image upload failed, but class was saved");
        }
      }

      resetForm();
      emit("formSubmitted");
      emit("closeForm");
      emit("success");
    } catch (error) {
      console.error("Error saving class:", error);
      emit("error", "Failed to save class");
    }
  }
}

function resetErrors() {
  Object.keys(showError).forEach(key => {
    showError[key] = false;
    errorMessages[key] = "";
  });
}

function validateData(dataObj) {
  Object.entries(dataObj).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      showError[key] = true;
      errorMessages[key] = `Please enter your ${splitCamelCase(key)}`;
    } else if (key === "price" && isNaN(value)) {
      showError[key] = true;
      errorMessages[key] = `Please enter a valid number for ${splitCamelCase(
        key
      )}`;
    } else if (
      key !== "price" &&
      key !== "counter" &&
      typeof value !== "string"
    ) {
      showError[key] = true;
      errorMessages[key] = `Please enter a valid string for ${splitCamelCase(
        key
      )}`;
    } else if (key === "date" && !isValidDate(value)) {
      showError[key] = true;
      errorMessages[key] = `Please enter a valid date for ${splitCamelCase(
        key
      )}`;
    } else if (key === "time" && !isValidTime(value)) {
      showError[key] = true;
      errorMessages[key] = `Please enter a valid time for ${splitCamelCase(
        key
      )}`;
    }
  });
}

function resetForm() {
  className.value = "";
  classDescription.value = "";
  price.value = "";
  location.value = "";
  gym.value = "";
  imageEvent.value = null;
  time.value = "";
  date.value = "";
  counter.value = 1;
}
</script>
