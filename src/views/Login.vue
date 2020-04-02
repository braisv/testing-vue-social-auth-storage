<template>
  <v-layout justify-center mt-4>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text
          class="display-1 text-uppercase white--text text-center"
          :class="noAccount ? 'success' : 'accent'"
        >
          <span v-if="!noAccount">Log In</span>
          <span v-if="noAccount">Sig Up</span>
        </v-card-text>

        <v-card-text>
          <v-btn block color="error" @click="google">
            <v-icon left dark>fab fa-google</v-icon>
            Google
          </v-btn>
          <v-btn block color="info" @click="facebook" class="mt-2">
            <v-icon left dark>fab fa-facebook-f</v-icon>
            Facebook
          </v-btn>
        </v-card-text>

        <v-card-text>
          <v-btn block @click="noAccount = !noAccount">{{
            noAccount
              ? "Do yu already have account? Log in here"
              : "No account? Sign up here"
          }}</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebase, auth, db } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      noAccount: false
    };
  },
  methods: {
    async login(provider) {
      firebase.auth().languageCode = "es";
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        const theUser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          picture: user.photoURL
        };

        await db
          .collection("users")
          .doc(theUser.uid)
          .set({
            theUser
          });
      } catch (error) {
        console.log(error);
      }
    },
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.login(provider);
    },
    facebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.login(provider);
    }
  }
};
</script>
