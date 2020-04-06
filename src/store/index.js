import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "@/firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ""
  },
  mutations: {
    newUser(state, payload) {
      payload === null ? (state.user = "") : (state.user = payload);
    }
  },
  actions: {
    async setUser({ commit }, payload) {
      try {
        const doc = await db
          .collection("users")
          .doc(payload.uid)
          .get();

        if (doc.exists) {
          commit("newUser", doc.data());
        } else {
          const user = {
            name: payload.displayName,
            email: payload.email,
            uid: payload.uid,
            picture: payload.photoURL
          };

          await db
            .collection("users")
            .doc(user.uid)
            .set(user);

          commit("newUser", user);
        }
      } catch (err) {
        console.log(err);
      }

      console.log("PAYLOAD: ", payload);
    },
    logout({ commit }) {
      auth.signOut();
      commit("newUser", null);
      router.push({ name: "Login" });
    }
  },
  modules: {}
});
