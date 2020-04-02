import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '@/firebase';
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    newUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    setUser({ commit }, payload) {
      console.log("PAYLOAD: ", payload)
      const user = {
        name: payload.displayName,
        email: payload.email,
        uid: payload.uid,
        picture: payload.photoURL
      }
      commit('newUser', user)
    },
    logout({ commit }) {
      auth.signOut()
      commit('newUser', null)
      router.push({ name: 'Login' })
    }
  },
  modules: {
  }
})
