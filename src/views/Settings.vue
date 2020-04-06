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
              <v-btn color="secondary" :disabled="!file" :loading="loading" @click="uploadImage()">Upload Image</v-btn>
          </v-card-text>
          <v-card-text v-if="file">
              <h4>{{ file.name }}</h4>
              <v-img :src="urlTemp"></v-img>
          </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/firebase"

export default {
  name: "Settings",
  data() {
      return {
          file: null,
          urlTemp: '',
          loading: false
      }
  },
  methods: {
      searchImage(e) {
          console.log(e.target.files[0])
          this.file = e.target.files[0]

          const reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = (e) => {
              this.urlTemp = e.target.result
              // console.log(urlTemp)
          }
      },
      async uploadImage() {

          try {
              this.loading = true;
              const refImg = storage.ref().child(this.user.email).child('Profile Pic');
              const res = await refImg.put(this.file)

              console.log(res)

              const urlDownload = await refImg.getDownloadURL()

              console.log(urlDownload)

              this.user.picture = urlDownload

              await db.collection('users').doc(this.user.uid).update({
                  picture: urlDownload
              })

              console.log("USER UPDATED: ", this.user)

          } catch (err) {
              console.log(err)
          } finally {
              this.loading = false
          }
      }
  },
    computed: {
    ...mapState(["user"])
  }
};
</script>
