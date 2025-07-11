<template>
  <section class="bg-white dark:bg-gray-900">
    <form @submit.prevent="submitOffer">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <inputValidation
          :Modelval="offerName"
          title="Offer name"
          :error-message="errorMessages.offerName"
          placeholder="Online yoga session"
          @input="offerName = $event.target.value"
          :showError="showError.offerName"
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
      </div>
      <div>
        <textArea
          :Modelval="offerDescription"
          title="Description"
          :error-message="errorMessages.offerDescription"
          placeholder="Enter your description"
          @input="offerDescription = $event.target.value"
          :showError="showError.offerDescription"
        ></textArea>
      </div>
      <div class="flex flex-col justify-center w-full mb-6">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
          >Upload your offer image</label
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
        Confirm
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import { useStore } from "../store/store.js";
import inputValidation from "../components/inputValidation.vue";
import locationInput from "../components/locationInput.vue";
import textArea from "../components/textarea.vue";
import { useUploadImage } from "../utils/useUploadImage.js";
import { saveDocument, updateDocument } from "../utils/useFirebase.js";
import { splitCamelCase } from "../utils/formUtils.js";

const store = useStore();
const userId = computed(() => store.docId);
const imageEvent = ref(null);
const offerName = ref("");
const offerDescription = ref("");
const price = ref("");
const location = ref("");
const gym = ref("");

const selectedFile = ref(null);
const imageUrl = ref("");
const imageName = ref("");

const errorMessages = reactive({
  offerName: "",
  offerDescription: "",
  price: "",
  location: "",
  gym: "",
});

const showError = reactive({
  offerName: false,
  offerDescription: false,
  price: false,
  location: false,
  gym: false,
});

const emit = defineEmits(["formSubmitted", "closeForm", "success", "error"]);

const checkForErrors = computed(() => {
  return Object.values(showError).some(value => value === true);
});

const props = defineProps({
  offerToEdit: {
    type: Object,
    default: null,
  },
});

watch(
  () => props.offerToEdit,
  newVal => {
    if (newVal) {
      offerName.value = newVal.offerName || "";
      offerDescription.value = newVal.offerDescription || "";
      price.value = newVal.price || "";
      location.value = newVal.location || "";
      gym.value = newVal.gym || "";
      selectedFile.value = newVal.offerImage ? true : null;
      imageUrl.value = newVal.offerImageUrl || "";
      imageName.value = newVal.offerImageName || "";
    } else {
      offerName.value = "";
      offerDescription.value = "";
      price.value = "";
      location.value = "";
      gym.value = "";
      selectedFile.value = null;
      imageUrl.value = "";
      imageName.value = "";
    }
  },
  { immediate: true }
);

async function submitOffer() {
  const dataObj = {
    offerName: offerName.value,
    offerDescription: offerDescription.value,
    price: price.value,
    location: location.value,
    gym: gym.value,
  };

  resetErrors();
  validateData(dataObj);

  if (!checkForErrors.value) {
    try {
      if (props.offerToEdit && props.offerToEdit.uid) {
        await updateDocument(
          `coaches/${userId.value}/Offers`,
          props.offerToEdit.uid,
          dataObj
        );
      } else {
        await saveDocument(`coaches/${userId.value}/Offers`, dataObj);
      }
      if (imageEvent.value) {
        try {
          await useUploadImage({
            event: imageEvent.value,
            docPath: `coaches/${userId.value}/Offers`,
            field: "offerImage",
            imageUrl,
            imageName,
          });
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
          emit("error", "Image upload failed, but offer was saved");
        }
      }
      resetForm();
      emit("formSubmitted");
      emit("closeForm");
      emit("success");
    } catch (error) {
      console.error("Error saving offer:", error);
      emit("error", "Failed to save offer");
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
      errorMessages[key] = `Please enter a valid number for ${splitCamelCase(
        key
      )}`;
      showError[key] = true;
    } else if (key !== "price" && typeof value !== "string") {
      showError[key] = true;
      errorMessages[key] = `Please enter a valid string for ${splitCamelCase(
        key
      )}`;
    }
  });
}

function resetForm() {
  offerName.value = "";
  offerDescription.value = "";
  price.value = "";
  location.value = "";
  gym.value = "";
  imageEvent.value = null;
}
</script>
