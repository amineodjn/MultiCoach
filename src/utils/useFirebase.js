import {
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

/**
 * Fetches a document from a specified collection in Firestore.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document.
 * @returns {Promise<Object|null>} - The document data or null if not found.
 */
export const fetchDocument = async (collectionName, docId) => {
  try {
    const documentReference = doc(db, collectionName, docId);
    const documentSnapshot = await getDoc(documentReference);
    if (documentSnapshot.exists()) {
      return documentSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching document from collection '${collectionName}' with ID '${docId}':`,
      error
    );
    throw error;
  }
};

/**
 * Fetches all documents from a specified collection in Firestore.
 * @param {string} collectionPath - The path of the collection.
 * @returns {Promise<Array<Object>>} - An array of document data.
 */
export const fetchCollection = async collectionPath => {
  try {
    const collectionReference = collection(db, collectionPath);
    const querySnapshot = await getDocs(collectionReference);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => doc.data());
    } else {
      console.warn(`No documents found in collection '${collectionPath}'`);
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching documents from collection '${collectionPath}':`,
      error
    );
    throw error;
  }
};

/**
 * Fetches all users from the "coaches" collection in Firestore.
 * @returns {Promise<Array<Object>>} - An array of user data.
 */
export const fetchUsers = async () => {
  try {
    const usersCollection = collection(db, "coaches");
    const userSnapshot = await getDocs(usersCollection);
    if (!userSnapshot.empty) {
      return userSnapshot.docs.map(doc => doc.data());
    } else {
      console.warn("No users found in the 'coaches' collection");
      return [];
    }
  } catch (error) {
    console.error("Error fetching users from 'coaches' collection:", error);
    throw error;
  }
};

/**
 * Fetches offers for a specific coach from Firestore.
 * @param {string} bookedCoachId - The ID of the booked coach.
 * @returns {Promise<Array>} - A promise that resolves with the offers data.
 */
export const fetchOffers = async bookedCoachId => {
  if (!bookedCoachId) {
    return [];
  }

  try {
    const offersRef = collection(db, "coaches", bookedCoachId, "Offers");
    const querySnapshot = await getDocs(offersRef);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => doc.data());
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching offers for coach '${bookedCoachId}':`, error);
    throw error;
  }
};

/**
 * Fetches offers for a specific coach from Firestore.
 * @param {string} bookedCoachId - The ID of the booked coach.
 * @returns {Promise<Array>} - A promise that resolves with the offers data.
 */
export const fetchClasses = async bookedCoachId => {
  if (!bookedCoachId) {
    return [];
  }

  try {
    const offersRef = collection(db, "coaches", bookedCoachId, "classes");
    const querySnapshot = await getDocs(offersRef);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => doc.data());
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching classes for coach '${bookedCoachId}':`,
      error
    );
    throw error;
  }
};

export const deleteDocument = async (
  collectionName,
  docId,
  subCollectionName,
  subDocId
) => {
  try {
    const docRef = doc(db, collectionName, docId, subCollectionName, subDocId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(
      `Error deleting document from collection '${collectionName}' with ID '${docId}' and sub-collection '${subCollectionName}' with sub-ID '${subDocId}':`,
      error
    );
    throw error;
  }
};

/**
 * Updates a document in a specified collection in Firestore.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document.
 * @param {Object} data - The data to update.
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const documentReference = doc(db, collectionName, docId);
    await updateDoc(documentReference, data);
  } catch (error) {
    console.error(
      `Error updating document in collection '${collectionName}' with ID '${docId}':`,
      error
    );
    throw error;
  }
};

/**
 * Saves a document to a specified sub-collection in Firestore.
 * @param {string} collectionPath - The path of the collection.
 * @param {Object} dataObj - The data to save.
 * @returns {Promise<void>}
 */
export const saveDocument = async (collectionPath, dataObj) => {
  try {
    const collectionReference = collection(db, collectionPath);
    const documentReference = await addDoc(collectionReference, dataObj);
    await updateDoc(documentReference, { uid: documentReference.id });
  } catch (error) {
    console.error(
      `Error saving document to collection '${collectionPath}':`,
      error
    );
    throw error;
  }
};

/**
 * Returns a promise that resolves with the authenticated user.
 * @returns {Promise<Object|null>} - The authenticated user or null if not authenticated.
 */
export const onAuthStateChangedPromise = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      user => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param {Event} event - The file input change event.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
export const uploadImage = async (event, userId) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) {
    console.log("No image selected");
    return;
  }

  const storageReference = storageRef(storage, `profilePictures/${userId}`);
  const uploadTask = uploadBytesResumable(storageReference, selectedFile);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      snapshot => {
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL);
        });
      }
    );
  });
};

/**
 * Deletes a document from a specified sub-collection of a coach.
 * @param {string} coachId - The ID of the coach.
 * @param {string} subCollectionName - The name of the sub-collection.
 * @param {string} docId - The ID of the document.
 * @returns {Promise<void>}
 */
export const deleteSubDocument = async (coachId, subCollectionName, docId) => {
  try {
    const docRef = doc(db, "coaches", coachId, subCollectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(
      `Error deleting document with ID '${docId}' from sub-collection '${subCollectionName}' for coach '${coachId}':`,
      error
    );
    throw error;
  }
};

/**
 * Adds a class booking to a user's bookedClasses array in Firestore.
 * @param {string} userId - The ID of the user.
 * @param {Object} classData - The class data to be booked.
 * @returns {Promise<void>}
 */
export const addClassBooking = async (userId, classData) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const bookedClasses = userData.bookedClasses || [];

    // Check if class is already booked
    if (bookedClasses.some(booking => booking.uid === classData.uid)) {
      throw new Error("Class already booked");
    }

    // Add the new booking
    await updateDoc(userRef, {
      bookedClasses: [...bookedClasses, classData],
    });
  } catch (error) {
    console.error("Error adding class booking:", error);
    throw error;
  }
};

/**
 * Removes a class booking from a user's bookedClasses array in Firestore.
 * @param {string} userId - The ID of the user.
 * @param {string} classId - The ID of the class to be removed.
 * @returns {Promise<void>}
 */
export const handleCancelBooking = async (userId, classId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();
    const bookedClasses = userData.bookedClasses || [];

    // Filter out the class to be removed
    const updatedBookedClasses = bookedClasses.filter(
      booking => booking.uid !== classId
    );

    // Update the user's bookedClasses array
    await updateDoc(userRef, {
      bookedClasses: updatedBookedClasses,
    });
  } catch (error) {
    console.error("Error cancelling class booking:", error);
    throw error;
  }
};
