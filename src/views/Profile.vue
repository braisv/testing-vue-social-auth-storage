<template>
      <v-row>
          <v-col cols="12">
            <v-row align="center" justify="center">
              <v-avatar>
                <img :src="user.picture" />
              </v-avatar>
            </v-row>
            <v-row align="center" justify="center">
              {{ user.name }}
          </v-row>
          </v-col>
        </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data: () => ({
  //
  }),
  computed: {
    ...mapState(["user"])
  }
};
</script>
