import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    docId: localStorage.getItem('uid'),
  }),
  actions: {
    setDocId(id) {
      this.docId = id;
      localStorage.setItem('uid', id);
    }
  }
});