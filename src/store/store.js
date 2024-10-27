// src/store/store.js
import { defineStore } from "pinia";
import {
  fetchDocument,
  fetchCollection,
  deleteDocument,
} from "../utils/useFirebase.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export const useStore = defineStore({
  id: "main",
  state: () => ({
    docId: "",
    user: {},
    favoriteCoaches: [],
    route: null,
    bookedCoach: null,
    offers: [],
    classes: [],
  }),
  actions: {
    setDocId(id) {
      this.docId = id;
      localStorage.setItem("uid", id);
    },
    setBookedCoach(uid) {
      this.bookedCoach = uid;
    },
    async fetchUser(userType) {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return;
      }
      const userData = await fetchDocument(userType, this.docId);
      if (userData) {
        this.user = userData;
      }
    },
    async fetchClasses() {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return;
      }
      const userType = this.user.coach ? "coaches" : "users";
      const userData = await fetchDocument(userType, this.docId);
      if (userData) {
        const classesData = await fetchCollection(
          `coaches/${this.docId}/classes`,
        );
        this.classes = classesData;
      }
    },
    async deleteClass(uid) {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return;
      }
      await deleteDocument("coaches", this.docId, "classes", uid);
      await this.fetchClasses();
    },
    async fetchOffers() {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return;
      }
      const offersData = await fetchCollection(`coaches/${this.docId}/Offers`);
      this.offers = offersData;
    },
    async deleteOffer(uid) {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return;
      }
      await deleteDocument("coaches", this.docId, "Offers", uid);
      await this.fetchOffers();
    },
    async fetchUserBookedEvents() {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return [];
      }
      const userData = await fetchDocument("users", this.docId);
      return userData.bookedEvents || [];
    },
    async fetchOfferDetails(bookedEvents) {
      const offerDetailsPromises = bookedEvents.map(async (event) => {
        const { bookedOffer, bookedCoach } = event;
        const offerData = await fetchDocument(
          `coaches/${bookedCoach}/Offers`,
          bookedOffer,
        );
        if (offerData) {
          return { ...offerData, bookedEvent: event };
        } else {
          return null;
        }
      });
      const offerDetails = await Promise.all(offerDetailsPromises);
      return offerDetails.filter((details) => details !== null);
    },
    async getUserBookedOfferDetails() {
      const bookedEvents = await this.fetchUserBookedEvents();
      const offerDetails = await this.fetchOfferDetails(bookedEvents);
      return offerDetails;
    },

    async setRoute() {
      const userDoc = await getDoc(doc(db, "users", this.docId));
      const coachDoc = await getDoc(doc(db, "coaches", this.docId));

      if (userDoc.exists()) {
        this.route = "/edit/" + this.docId;
        return this.route;
      } else if (coachDoc.exists()) {
        this.route = "/edit/" + this.docId;
        return this.route;
      } else {
        return "/";
      }
    },

    userDoc(type) {
      return doc(db, type, this.docId);
    },
  },
});
