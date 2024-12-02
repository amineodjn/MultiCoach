import {
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      console.warn(
        `No document found in collection '${collectionName}' with ID '${docId}'`,
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching document from collection '${collectionName}' with ID '${docId}':`,
      error,
    );
    throw error;
  }
};

/**
 * Fetches all documents from a specified collection in Firestore.
 * @param {string} collectionPath - The path of the collection.
 * @returns {Promise<Array<Object>>} - An array of document data.
 */
export const fetchCollection = async (collectionPath) => {
  try {
    const collectionReference = collection(db, collectionPath);
    const querySnapshot = await getDocs(collectionReference);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => doc.data());
    } else {
      console.warn(`No documents found in collection '${collectionPath}'`);
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching documents from collection '${collectionPath}':`,
      error,
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
      return userSnapshot.docs.map((doc) => doc.data());
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
 * @param {string} bookedCoach - The ID of the booked coach.
 * @returns {Promise<Array>} - A promise that resolves with the offers data.
 */
export const fetchOffers = async (bookedCoach) => {
  if (!bookedCoach) {
    return [];
  }

  try {
    const offersRef = collection(db, "coaches", bookedCoach, "Offers");
    const querySnapshot = await getDocs(offersRef);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => doc.data());
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error fetching offers for coach '${bookedCoach}':`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName,
  docId,
  subCollectionName,
  subDocId,
) => {
  try {
    const docRef = doc(db, collectionName, docId, subCollectionName, subDocId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(
      `Error deleting document from collection '${collectionName}' with ID '${docId}' and sub-collection '${subCollectionName}' with sub-ID '${subDocId}':`,
      error,
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
      error,
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
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject,
    );
  });
};
