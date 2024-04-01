<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit your profile</h2>
        <form @submit.prevent="updateUser">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input 
            v-model="firstName"
            type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="John" required />
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input 
            v-model="lastName"
            type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Doe" required />
        </div>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input 
    v-model="email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email" required />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input 
          v-model="password"
          type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Password" required />
        </div>
        <div>
          <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
          <input 
          v-model="city"
          type="text" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Poznań" required />
        </div>   

        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website url (optional)</label>
            <input 
            v-model="websiteUrl"
            type="url" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Multicoach.com" />
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
          <input 
          v-model="phoneNumber"
          type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="xxx-xxx-xxx" pattern="[1-9]{1}[0-9]{2}\s[0-9]{3}\s[0-9]{3}" required />
        </div>
        <div>
            <label for="gym" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gym</label>
            <input 
            v-model="gym"
            type="text" id="gym" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Gym world, can be?" required />
        </div>
        <div>
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input 
          v-model="price" type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-primary-500" placeholder="399 PLN" required="">
        </div>
    </div>
    <div class="sm:col-span-2  mb-6">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea 
        v-model="description"
        id="description" rows="8" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="👋 Hello, my name is [Your Name]. I am a certified personal trainer 💪 with [Number of Years] years of experience. I specialize in [Your Specialization] and have worked with [Types of Clients You've Worked With]. I frequently collaborate with gyms such as [Names of the Gyms] 🏋️‍♀️. My certifications include [Your Certifications] 🎓. I am passionate about helping others achieve their fitness goals and look forward to working with you. 😊"></textarea>
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
import { ref, computed, onMounted } from 'vue';
import { db } from '../main.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useStore } from '../store/store.js';
import { storage } from '../main.js';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, getMetadata } from 'firebase/storage'; // Import necessary functions from Firebase Storage



const store = useStore();
const userId = computed(() => store.docId);
const docRef = doc(db, "users", userId.value);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const city = ref('');
const websiteUrl = ref('');
const phoneNumber = ref('');
const gym = ref('');
const price = ref('');
const description = ref('');
const password = ref('');

// Function to update user data in Firestore
async function updateUser() {
  const dataObj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    city: city.value,
    websiteUrl: websiteUrl.value,
    phoneNumber: phoneNumber.value,
    gym: gym.value,
    price: price.value,
    description: description.value,  
  }
    // Update the fields based on your reactive properties
    await updateDoc(docRef, dataObj);

    console.log('User data updated successfully!');
}

// Fetch user data from Firestore
const fetchUser = async () => {
  if (!userId.value) {
    console.log('docId is not set', userId.value);
    return;
  }

  const docRef = doc(db, "users", userId.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    firstName.value = docSnap.data().firstName;
    lastName.value = docSnap.data().lastName;
    email.value = docSnap.data().email;
    city.value = docSnap.data().city;
    websiteUrl.value = docSnap.data().websiteUrl;
    phoneNumber.value = docSnap.data().phoneNumber;
    gym.value = docSnap.data().gym;
    price.value = docSnap.data().price;
    description.value = docSnap.data().description;
    password.value = docSnap.data().password;

  } else {
    console.log('No such document!');
  }
};

onMounted(() => {
  fetchUser();
});
const selectedFile = ref(null);
const imageUrl = ref('');
const imageName = ref('');

const uploadImage = async (event) => {
  selectedFile.value = event.target.files[0];
  imageName.value = selectedFile.value.name;
  console.log(selectedFile.value.name);

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
          const docRef = doc(db, 'users', user.uid);
          updateDoc(docRef, { profilePicture: downloadURL });
        });
      }
    );
  }
};

</script>