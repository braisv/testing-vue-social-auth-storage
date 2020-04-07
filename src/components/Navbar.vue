<template>
  <nav>
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon class="mr-3" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
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

    <v-navigation-drawer v-model="drawer" absolute dark app>
      <v-list dense nav class="py-0">
        <v-row v-if="user != ''">
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-avatar>
                <img :src="user.picture" />
              </v-avatar>
            </v-row>
          </v-col>
          <v-col cols="12">
            {{ user.name }}
          </v-col>
        </v-row>
        <v-divider class="mb-3"></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Navbar",
  data: () => ({
    drawer: false,
    items: [
      {
        title: "Profile",
        icon: "fas fa-address-book",
        to: { name: "Profile" }
      },
      { title: "Favourites", icon: "fas fa-star", to: { name: "Login" } },
      { title: "Chat", icon: "fas fa-comments", to: { name: "Chat" } },
      { title: "Settings", icon: "fas fa-cog", to: { name: "Settings" } },
    ]
  }),
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
