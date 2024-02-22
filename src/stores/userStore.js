import { defineStore } from "pinia";
// import { ref } from 'vue';
// import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../firebase';


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    checkAuth(authUser) {
      this.user = authUser;
      this.isLoggedIn = !!authUser;
    }
  }
})