<template>
  <v-layout justify-center mt-4>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
    <v-card-text class="title text-center">
      Welcome {{user.name}}!
    </v-card-text>
  </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(["user"])
  }

}
</script>
