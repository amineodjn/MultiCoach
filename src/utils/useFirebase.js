import {
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

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
