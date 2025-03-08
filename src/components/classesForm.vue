<template>
  <section class="bg-white dark:bg-gray-900">
    <form @submit.prevent="updateOffer">
      <div class="grid gap-6 mb-4 md:grid-cols-2">
        <inputValidation
          :Modelval="className"
          title="Class name"
          :error-message="classNameError"
          placeholder="yoga session"
          @input="className = $event.target.value"
          :showError="showError.className"
        ></inputValidation>
        <inputValidation
          :Modelval="price"
          title="Price"
          :error-message="priceError"
          placeholder="100"
          @input="price = $event.target.value"
          :showError="showError.price"
        ></inputValidation>
        <locationInput
          :Modelval="location"
          title="Location"
          :error-message="locationError"
          placeholder="Poznań"
          @input="location = $event"
        ></locationInput>
        <inputValidation
          :Modelval="gym"
          title="Gym"
          :error-message="gymError"
          placeholder="Gym world, can be?"
          @input="gym = $event.target.value"
          :showError="showError.gym"
        ></inputValidation>
        <datePicker
          :showError="showError.date"
          :error-message="dateError"
          v-model="date"
        />
        <timePicker
          :showError="showError.time"
          :error-message="timeError"
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
          :error-message="classDescriptionError"
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
import { ref, computed, onMounted, reactive } from "vue";
import { db } from "../firebase.js";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useStore } from "../store/store.js";
import inputValidation from "../components/inputValidation.vue";
import locationInput from "../components/locationInput.vue";
import textArea from "../components/textarea.vue";
import datePicker from "./datePicker.vue";
import timePicker from "../components/timePicker.vue";
import counterInput from "../components/counterInput.vue";
import { useUploadImage } from "../utils/useUploadImage.js";

const store = useStore();
const userId = computed(() => store.docId);
const docRef = doc(db, "coaches", userId.value);
const classId = ref("");
const imageEvent = ref(null);
const date = ref("yyyy-MM-dd");
const time = ref("00:00");
const counter = ref(1);

const className = ref("");
const classDescription = ref("");
const price = ref("");
const location = ref("");
const gym = ref("");

const errorMessages = reactive({
  className: "",
  classDescription: "",
  price: "",
  location: "",
  gym: "",
  time: "",
  date: "",
});

function createErrorComputed(field, key) {
  return computed(() => {
    if (field.value === "" || showError[key]) {
      return errorMessages[key];
    }
    return "";
  });
}
const classNameError = createErrorComputed(className, "className");
const classDescriptionError = createErrorComputed(
  classDescription,
  "classDescription",
);
const priceError = createErrorComputed(price, "price");
const locationError = createErrorComputed(location, "location");
const gymError = createErrorComputed(gym, "gym");
const timeError = createErrorComputed(time, "time");
const dateError = createErrorComputed(date, "date");

const showError = reactive({
  className: false,
  classDescription: false,
  price: false,
  location: false,
  gym: false,
  time: false,
  date: false,
});

function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase();
}
const emit = defineEmits(["formSubmitted"]);

async function updateOffer() {
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

  Object.keys(showError).forEach(key => {
    showError[key] = false;
  });

  Object.entries(dataObj).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      showError[key] = true;
    }
  });

  const hasErrors = Object.values(showError).some(value => value === true);
  if (!hasErrors) {
    const classsRef = collection(docRef, "classes");

    const classDocRef = await addDoc(classsRef, dataObj);
    classId.value = classDocRef.id;
    await updateDoc(classDocRef, { uid: classId.value });
    useUploadImage({ event: imageEvent.value, docPath: `coaches/${userId.value}/classes`, field: "classImage", imageUrl, imageName });
    className.value = "";
    classDescription.value = "";
    price.value = "";
    location.value = "";
    gym.value = "";
    imageEvent.value = null;
    time.value = "";
    date.value = "";
    counter.value = 1;

    emit("formSubmitted", { classId: classId.value });
  }

  if (hasErrors) {
    Object.entries(showError).forEach(([key, value]) => {
      if (value === true) {
        showError[key] = true;
        errorMessages[key] = `Please enter your ${splitCamelCase(key)}`;
      }
    });
  }
}

onMounted(() => {
  if (!userId.value) {
    console.log("docId is not set", userId.value);
  }
});
const selectedFile = ref(null);
const imageUrl = ref("");
const imageName = ref("");

</script>
