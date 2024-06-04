<template>
  <toast v-if="success" @animation-end="resetSuccess" @close="success = false" :success="success"></toast>
      <sidebar v-if="false" />
      <main id="content" class="content-container">
        <div class="mx-auto">
          <div class="md:pt-5 sm:pt-0 sm:pb-0 sm:p-5 p-2">
            <div class="w-full pb-0 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-800 dark:border-neutral-700">
              <figure>
                <svg class="w-full" preserveAspectRatio="none" width="1113" height="161" viewBox="0 0 1113 161" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_666_220723)"><rect x="0.5" width="1112" height="161" rx="12" fill="white"></rect><rect x="1" width="1112" height="348" fill="#D9DEEA"></rect><path d="M512.694 359.31C547.444 172.086 469.835 34.2204 426.688 -11.3096H1144.27V359.31H512.694Z" fill="#C0CBDD"></path><path d="M818.885 185.745C703.515 143.985 709.036 24.7949 726.218 -29.5801H1118.31V331.905C1024.49 260.565 963.098 237.945 818.885 185.745Z" fill="#8192B0"></path><defs><clipPath id="clip0_666_220723"><rect x="0.5" width="1112" height="161" rx="12" fill="white"></rect></clipPath></defs></g></svg>
              </figure>
              <div class="-mt-24">
                <div class="relative flex border-4 mx-auto rounded-full flex-col items-center dark:border-neutral-800" style="width: 120px; height: 120px;">
                  <img class="object-cover w-full h-full rounded-full shadow-lg" :src="profilePicture" alt="Profile picture"/>
                </div>
                <div class="flex flex-col items-center mt-3">
                  <h1 class="text-xl font-medium text-gray-900 dark:text-white">{{firstName + ' ' + lastName}}</h1>
                  <p class="text-sm text-gray-500 dark:text-neutral-500">{{userName}}</p>
                </div>
              </div>
              <div class="pt-0.5 pb-0.5 whitespace-nowrap overflow-y-hidden overflow-x-auto gap-2 justify-between items-center flex-row flex mt-7 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <nav class="flex space-x-6">
                  <router-link class="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-indigo-500 text-sm whitespace-nowrap  text-indigo-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500" to="/myProfile">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    My Profile
                  </router-link>
                  <router-link class="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm font-medium whitespace-nowrap text-gray-500 focus:outline-none focus:text-indigo-800 dark:text-indigo-500" to="/connections">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </svg>
                    Connections
                  </router-link>
                  <router-link class="py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 dark:text-neutral-500 dark:hover:text-indigo-500" :to="profileLink">
                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Edit Profile
                  </router-link>
                </nav>
                <div>
                  <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">Edit</button>
                </div>
              </div>
            </div>
            <div class="container mx-auto py-6" >
              <offers />
            </div>
        </div> 
      </div> 
    </main>    
  
  </template>
  
  <script setup>
  import { ref, computed, onMounted, reactive  } from 'vue';
  import { db } from '../main.js';
  import { doc, updateDoc } from 'firebase/firestore';
  import { useStore } from '../store/store.js';
  import { storage } from '../main.js';
  import { getAuth } from 'firebase/auth';
  import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
  import toast from '../components/toast.vue';
  import sidebar from '../components/sidebar.vue';
  import offers from '../views/offers.vue';

  
  
  const store = useStore();
  const userId = computed(() => store.docId);
  const docRef = doc(db, "users", userId.value);
  const profileLink = ref(store.route)
  const firstName = ref(store.user.firstName);
  const lastName = ref(store.user.lastName);
  const email = ref(store.user.email);
  const password = ref(store.user.password);
  const description = ref(store.user.description);
  const userName = ref(store.user.userName);
  const profilePicture = ref(store.user.profilePicture);
  const success = ref(false);
  const hasEmptyFields = ref(false);

  const errorMessages = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userName: '',
  description: '',
});

// Function to create computed properties for error messages
function createErrorComputed(field, key) {
  return computed(() => {
    if (field.value === '' || showError[key]) {
      return errorMessages[key];
    }
    return '';
  });
}
// Error messages 
const firstNameError = createErrorComputed(firstName, 'firstName');
const lastNameError = createErrorComputed(lastName, 'lastName');
const emailError = createErrorComputed(email, 'email');
const passwordError = createErrorComputed(password, 'password');
const descriptionError = createErrorComputed(description, 'description');
const userNameError = createErrorComputed(userName, 'userName');

const showError = reactive({
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  userName: false,
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
    userName: userName.value,
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

  if (hasErrors) {
    Object.entries(showError).forEach(([key, value]) => {
      if (value === true) {
        showError[key] = true;
        errorMessages[key] = `Please enter your ${splitCamelCase(key)}`; // Update the error message
      }
    });
  }
    // Update the fields based on your reactive properties
}
  
  // Fetch user data from Firestore
  
  
  onMounted(() => {
    if(!userId.value) {
      console.log('docId is not set', userId.value);
    }

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
            const docRef = doc(db, 'users', user.uid);
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
  <style scoped>
  @media (min-width: 1024px) {
    .content-container {
        padding-inline-start: 260px;
    }
}
  .content-container-padding {
    padding-top: 59px;
  }
  </style>