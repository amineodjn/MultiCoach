<template v-show="success">
<toast  @animation-end="resetSuccess" @close="success = false" :success="success"></toast>
  <section class="bg-white dark:bg-gray-900">
    <sidebar />
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit your profile</h2>
        <form @submit.prevent="updateUser">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <inputValidation :Modelval="firstName" 
        title="First name" 
        :error-message="firstNameError" 
        placeholder="John"
        @input="firstName = $event.target.value"
        :showError="showError.firstName"
        ></inputValidation>
        <inputValidation 
          :Modelval="lastName" 
          title="Last name" 
          :error-message="lastNameError" 
          placeholder="Doe"
          @input="lastName = $event.target.value"
          :showError="showError.lastName"
        ></inputValidation>

        <inputValidation 
          :Modelval="email" 
          title="Your email" 
          :error-message="emailError" 
          placeholder="Enter your email"
          @input="email = $event.target.value"
          :showError="showError.email"
        ></inputValidation>

        <inputValidation 
          :Modelval="password" 
          title="Password" 
          :error-message="passwordError" 
          placeholder="Password"
          @input="password = $event.target.value"
          :showError="showError.password"
        ></inputValidation>

        <inputValidation 
          :Modelval="profession" 
          title="Profession" 
          :error-message="professionError" 
          placeholder="Personal Trainer"
          @input="profession = $event.target.value"
          :showError="showError.profession"
        ></inputValidation>

        <inputValidation 
          :Modelval="city" 
          title="City" 
          :error-message="cityError" 
          placeholder="Poznań"
          @input="city = $event.target.value"
          :showError="showError.city"
        ></inputValidation>

        <inputValidation 
          :Modelval="websiteUrl" 
          title="Website url (optional)" 
          :error-message="websiteUrlError" 
          placeholder="Multicoach.com"
          @input="websiteUrl = $event.target.value"
          :showError="showError.websiteUrl"
        ></inputValidation>

        <inputValidation 
          :Modelval="phoneNumber" 
          title="Phone number" 
          :error-message="phoneNumberError" 
          placeholder="xxx-xxx-xxx"
          @input="phoneNumber = $event.target.value"
          :showError="showError.phoneNumber"
        ></inputValidation>

        <inputValidation 
          :Modelval="gym" 
          title="Gym" 
          :error-message="gymError" 
          placeholder="Gym world, can be?"
          @input="gym = $event.target.value"
          :showError="showError.gym"
        ></inputValidation>

    </div>
    <div>
      <textArea
    :Modelval="description"
    title="Description" 
    :error-message="descriptionError" 
    placeholder="👋 Hello, my name is [Your Name]. I am a certified personal trainer 💪 with [Number of Years] years of experience. I specialize in [Your Specialization] and have worked with [Types of Clients You've Worked With]. I frequently collaborate with gyms such as [Names of the Gyms] 🏋️‍♀️. My certifications include [Your Certifications] 🎓. I am passionate about helping others achieve their fitness goals and look forward to working with you. 😊"
    @input="description = $event.target.value"
    :showError="showError.description"
    ></textArea>
    </div>
    
    <div class="flex items-center justify-center w-full mb-6">
      <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" @change="uploadImage" class="hidden" />
      </label>
    </div> 
    <div v-if="selectedFile" class="flex items-start mb-6">
        <div class="flex items-center h-5">
            <svg class="w-6 h-5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"></path>
</svg>        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><a :href="imageUrl" class="text-indigo-600 hover:underline dark:text-indigo-500">{{ imageName }}</a>.</label>
    </div>
    <button type="submit" class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Submit</button>
    </form>
  </div>
</section>

</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { db } from '../main.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useStore } from '../store/store.js';
import { storage } from '../main.js';
import { getAuth } from 'firebase/auth';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import toast from '../components/toast.vue';
import sidebar from '../components/sidebar.vue';
import inputValidation from '../components/inputValidation.vue';
import textArea from '../components/textarea.vue';

const store = useStore();
const userId = computed(() => store.docId);
const docRef = doc(db, "coaches", userId.value);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const city = ref('');
const websiteUrl = ref('');
const phoneNumber = ref('');
const gym = ref('');
const description = ref('');
const password = ref('');
const success = ref(false);
const profession = ref('');
const hasEmptyFields = ref(false);

const errorMessages = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  description: '',
});


//Helper function
function createErrorComputed(field, key) {
  return computed(() => {
    if (field.value === '' || showError[key]) {
      return errorMessages[key];
    }
    return '';
  });
}
//Error messages 
const firstNameError = createErrorComputed(firstName, 'firstName');
const lastNameError = createErrorComputed(lastName, 'lastName');
const emailError = createErrorComputed(email, 'email');
const cityError = createErrorComputed(city, 'city');
const websiteUrlError = createErrorComputed(websiteUrl, 'websiteUrl');
const phoneNumberError = createErrorComputed(phoneNumber, 'phoneNumber');
const gymError = createErrorComputed(gym, 'gym');
const descriptionError = createErrorComputed(description, 'description');
const professionError = createErrorComputed(profession, 'profession');
const passwordError = createErrorComputed(password, 'password');

const showError = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  profession: false,
  city: false,
  websiteUrl: false,
  phoneNumber: false,
  gym: false,
  description: false,
});

function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
}
// Function to update user data in Firestore
async function updateUser() {
  const dataObj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    profession: profession.value,
    city: city.value,
    websiteUrl: websiteUrl.value,
    phoneNumber: phoneNumber.value,
    gym: gym.value,
    description: description.value,  
  }
  // Reset showError
  Object.keys(showError).forEach(key => {
    showError[key] = false;
  });

  // Check for empty fields
  Object.entries(dataObj).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      showError[key] = true;
    }
  });

  // Check if there are any errors
  const hasErrors = Object.values(showError).some(value => value === true);
  if (!hasErrors) {
    await updateDoc(docRef, dataObj);
    success.value = true;
    console.log('User data updated successfully!');
  }
  else {
    Object.entries(showError).forEach(([key, value]) => {
      if (value === true) {
        showError[key] = true;
        errorMessages[key] = `Please enter your ${splitCamelCase(key)}`;
      }
    });
  }
    // Update the fields based on your reactive properties
}

// Fetch user data from Firestore
const fetchUser = async () => {
  if (!userId.value) {
    console.log('docId is not set', userId.value);
    return;
  }

  const docRef = doc(db, "coaches", userId.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    firstName.value = docSnap.data().firstName;
    lastName.value = docSnap.data().lastName;
    email.value = docSnap.data().email;
    profession.value = docSnap.data().profession;
    city.value = docSnap.data().city;
    websiteUrl.value = docSnap.data().websiteUrl;
    phoneNumber.value = docSnap.data().phoneNumber;
    gym.value = docSnap.data().gym;
    description.value = docSnap.data().description;
    password.value = docSnap.data().password;
  } else {
    success.value = false;
    console.log('No such document!');
  }
};

onMounted(() => {
  if(!userId.value) {
    console.log('docId is not set', userId.value);
  }
  fetchUser();
});
const selectedFile = ref(null);
const imageUrl = ref('');
const imageName = ref('');

const uploadImage = async (event) => {
  selectedFile.value = event.target.files[0];
  imageName.value = selectedFile.value.name;

  if (!selectedFile.value) {
    console.log('No file selected');
    return;
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Create a storage reference with the user's uid
    const storageReference = storageRef(storage, `profilePictures/${user.uid}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageReference, selectedFile.value);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUrl.value = downloadURL;
          // Update user document with the download URL
          const docRef = doc(db, 'coaches', user.uid);
          updateDoc(docRef, { profilePicture: downloadURL });
        });
      }
    );
  }
};

//Toast 
const resetSuccess = (event) => {
  if (event.animationName.includes('slideOutRight')) {
    success.value = false;
  }
};
</script>
