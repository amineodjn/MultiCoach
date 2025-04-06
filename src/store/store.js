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
    async fetchUser(userType, uid) {
      if (!uid) {
        return;
      }
      const userData = await fetchDocument(userType, uid);
      if (userData) {
        this.user = userData;
      }
      return userData;
    },
    async fetchClasses() {
      if (!this.docId) {
        return;
      }
      this.classes = await fetchCollection(`coaches/${this.docId}/classes`);
    },
    async fetchOffers() {
      if (!this.docId) {
        return;
      }
      this.offers = await fetchCollection(`coaches/${this.docId}/Offers`);
    },
    async deleteOffer(uid) {
      if (!this.docId) {
        return;
      }
      await deleteDocument("coaches", this.docId, "Offers", uid);
      await this.fetchOffers();
    },
    async fetchUserBookedOffers() {
      if (!this.docId) {
        return [];
      }
      const userData = await fetchDocument("users", this.docId);
      this.user.bookedOffers = userData.bookedOffers || [];
      return userData.bookedOffers || [];
    },
    async fetchUserBookedClasses() {
      if (!this.docId) {
        return [];
      }
      const userData = await fetchDocument("users", this.docId);
      this.user.bookedClasses = userData.bookedClasses || [];
    },
    async fetchOfferDetails(bookedOffers) {
      const offerDetailsPromises = bookedOffers.map(async event => {
        const { bookedOffer, bookedCoach } = event;
        const offerData = await fetchDocument(
          `coaches/${bookedCoach}/Offers`,
          bookedOffer
        );
        if (offerData) {
          return { ...offerData, bookedEvent: event };
        } else {
          return null;
        }
      });
      const offerDetails = await Promise.all(offerDetailsPromises);
      return offerDetails.filter(details => details !== null);
    },
    async getUserBookedOfferDetails() {
      const bookedOffers = await this.fetchUserBookedOffers();
      const offerDetails = await this.fetchOfferDetails(bookedOffers);
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

    async fetchFavoriteCoaches() {
      if (!this.docId) {
        console.log("docId is not set", this.docId);
        return;
      }
      const userType = this.user.coach ? "coaches" : "users";
      const userData = await fetchDocument(userType, this.docId);
      if (userData) {
        this.favoriteCoaches = userData.favoriteCoaches || [];
      }
    },

    userDoc(type) {
      return doc(db, type, this.docId);
    },
  },
});
