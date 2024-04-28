import { defineStore } from 'pinia';
import { getDoc, doc } from 'firebase/firestore'; // import these from Firebase
import { db } from '../main.js'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    docId: localStorage.getItem('uid'),
    user: null,
    coach: null,
    route: null, // add this to your state
  }),
  actions: {
    setDocId(id) {
      this.docId = id;
      console.log(this.docId);
      localStorage.setItem('uid', id);
    },
    setUserRole(id) {
      
    },
    async getUserType() {
      const userDoc = await getDoc(doc(db, 'users', this.docId));
      const coachDoc = await getDoc(doc(db, 'coaches', this.docId));

      if (userDoc.exists()) {
        console.log( this.route);
        this.route = 'user-profile';
        return 'user-profile';
      } else if (coachDoc.exists()) {
        console.log(this.route);
        this.route = 'coach-profile';
        return 'coach-profile';
      } else {
        return null;
      }
    }
  }
});