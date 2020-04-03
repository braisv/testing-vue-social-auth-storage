<template>
  <nav>
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon class="mr-3"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Home' }">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
        <v-toolbar-title class="headline text-uppercase">
          <span>Vue</span>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="logout">
        <span class="mr-2">Log Out</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
