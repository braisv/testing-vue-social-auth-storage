<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  name: "App",
  data: () => ({
    //
  })
};
</script>
