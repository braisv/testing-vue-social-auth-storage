<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card class="text-center">
          <v-card-text>
              <v-avatar>
                <img :src="user.picture" />
              </v-avatar>
          </v-card-text>
          <v-card-text>
              <h3>{{ user.name }}</h3>
          </v-card-text>
          <v-card-text>
              <input class="d-none" type="file" ref="button" @change="searchImage($event)">
              <v-btn class="mr-5" color="primary" @click="$refs.button.click()">Search Image</v-btn>
              <v-btn color="secondary" :disabled="!file">Upload Image</v-btn>
          </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Settings",
  data() {
      return {
          file: null
      }
  },
  methods: {
      searchImage(e) {
          console.log(e.target.files[0])
          this.file = e.target.files[0]
      }
  },
    computed: {
    ...mapState(["user"])
  }
};
</script>
