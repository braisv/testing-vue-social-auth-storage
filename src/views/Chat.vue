<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <h3>Wellcome {{ user.name }}</h3>
        </v-card-text>
        <v-card-text class="text-right">
          <v-chip pill>
            <v-avatar left>
              <v-img :src="user.picture"></v-img>
            </v-avatar>
            Message
          </v-chip>
          <p class="caption">{{ date }}</p>
        </v-card-text>
        <v-card-text class="text-right">
            <v-form @submit.prevent="sendMessage()">
                <v-text-field v-model="message" label="Write your message here">

                </v-text-field>
            </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Chat",
  data() {
    return {
      date: new Date(),
      message: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
      sendMessage() {
          console.log('Message sent')
      }
  }
};
</script>
