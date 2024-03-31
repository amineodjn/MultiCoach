import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    docId: null,
  }),
  actions: {
    setDocId(id) {
      this.docId = id;
    }
  }
});