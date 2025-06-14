import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { storage, db } from "../firebase.js";
import { ref } from "vue";

export const useUploadImage = async ({
  event,
  docPath,
  field,
  imageUrl,
  imageName,
}) => {
  const selectedFile = ref(null);

  try {
    if (event && event.target && event.target.files) {
      selectedFile.value = event.target.files[0];
    } else {
      selectedFile.value = event;
    }

    if (!selectedFile.value) {
      console.log("No image selected");
      return;
    }

    imageName.value = selectedFile.value.name;

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const storageReference = storageRef(
        storage,
        `${docPath}/${user.uid}/${selectedFile.value.name}`
      );

      const uploadTask = uploadBytesResumable(
        storageReference,
        selectedFile.value
      );

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          console.error("Upload failed", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          imageUrl.value = downloadURL;
          const docRef = doc(db, docPath, user.uid);
          await updateDoc(docRef, { [field]: downloadURL });
        }
      );
    } else {
      console.error("You are not logged in yet!");
    }
  } catch (error) {
    console.error("Error uploading image", error);
  }
};
