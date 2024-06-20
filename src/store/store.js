import { defineStore } from 'pinia';
import { getDoc, doc } from 'firebase/firestore'; // import these from Firebase
import { db } from '../main.js'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    docId: '',
    user: {},
    favoriteCoaches: [],
    route: null,
  }),
  actions: {
    setDocId(id) {
      this.docId = id;
      localStorage.setItem('uid', id);
    },
    async fetchUser(userType) {
      if (!this.docId) {
        console.log('docId is not set', this.docId);
        return;
      }
  
      const docRef = doc(db, userType, this.docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.user = {
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
          email: docSnap.data().email,
          password: docSnap.data().password,
          userName: docSnap.data().userName,
          description: docSnap.data().description,
          gym: docSnap.data().gym,
          city: docSnap.data().city,
          phoneNumber: docSnap.data().phoneNumber,
          profession: docSnap.data().profession,
          profilePicture: docSnap.data().profilePicture,
          websiteUrl: docSnap.data().websiteUrl,
          coach: docSnap.data().coach,
          favoriteCoaches: docSnap.data().favoriteCoaches,
          schedule: docSnap.data().schedule
        };
      } else {
        console.log('No such document!');
      }
    },
    setUser(user) {
      // this.user = user;
      // this.email = user.email;
      // console.log(user.email);

    },
    async getUserType() {
      const userDoc = await getDoc(doc(db, 'users', this.docId));
      const coachDoc = await getDoc(doc(db, 'coaches', this.docId));

      if (userDoc.exists()) {
        this.route = '/user-profile/' + this.docId;
        return this.route;
      } else if (coachDoc.exists()) {
        this.route = '/coach-profile/' + this.docId
        return this.route;
      } else {
        return null;
      }
    },
    userDoc(type) {
      return doc(db, type, this.docId);
    }
  }
});