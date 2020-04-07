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
          <v-form @submit.prevent="sendMessage()" v-model="validation">
            <v-text-field
              v-model="message"
              label="Write your message here"
              required
              :rules="rules"
            >
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
      message: "",
      validation: false,
      rules: [
          v => !!v || 'Message required'
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    sendMessage() {
        this.validation ? console.log("Message sent") : console.log('Message error')
    }
  }
};
</script>
