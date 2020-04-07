<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <h3>Wellcome {{ user.name }}</h3>
        </v-card-text>

        <v-card-text class="text-right">
          <div v-for="(item, index) in messages" :key="index">
            <v-chip pill>
              <v-avatar left>
                <v-img :src="item.picture"></v-img>
              </v-avatar>
              {{ item.message }}
            </v-chip>
            <p class="caption">{{ item.date }}</p>
          </div>
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
import { db } from "@/firebase";

export default {
  name: "Chat",
  data() {
    return {
      date: new Date(),
      message: "",
      validation: false,
      rules: [v => !!v || "Message required"],
      messages: []
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    sendMessage() {
      if (this.validation) {
          db
            .collection("chats")
            .add({
              message: this.message,
              name: this.user.name,
              picture: this.user.picture,
              date: Date.now()
            })
            .catch(err => console.log(err))
            this.message = "";
      } else {
          console.log("Message error");
      }
    }
  },
  created() {
    let ref = db.collection("chats");

    ref.onSnapshot(querySnapshot => {
      this.messages = [];
      querySnapshot.forEach(doc => {
        this.messages.push(doc.data());
      });
      console.log(this.messages)
    });
  }
};
</script>
