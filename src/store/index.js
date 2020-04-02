import Vue from 'vue'
import Vuex from 'vuex'

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
      const user = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        picture: user.photoURL
      }
      commit('newUser', user)
    }
  },
  modules: {
  }
})
