<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <h3>Wellcome {{ user.name }}</h3>
        </v-card-text>

        <v-card-text
          vue-chat-scroll
          style="height: 60vh; overflow: auto"
        >
          <div v-for="(item, index) in messages" :key="index" :class="item.name === user.name ? 'text-right' : 'text-left'">
            <v-chip pill :color="item.name === user.name ? 'primary' : 'secondary'">
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
import moment from "moment";

export default {
  name: "Chat",
  data() {
    return {
      date: new Date(),
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
        db.collection("chats")
          .add({
            message: this.message,
            name: this.user.name,
            picture: this.user.picture,
            date: Date.now()
          })
          .catch(err => console.log(err));
        this.message = "";
      } else {
        console.log("Message error");
      }
    }
  },
  created() {
    moment.locale("es");
    let ref = db
      .collection("chats")
      .orderBy("date", "desc")
      .limit(15);

    ref.onSnapshot(querySnapshot => {
      this.messages = [];
      querySnapshot.forEach(doc => {
        this.messages.unshift({
          message: doc.data().message,
          picture: doc.data().picture,
          name: doc.data().name,
          date: moment(doc.data().date).format("lll")
        });
      });
      console.log(this.messages);
    });
  }
};
</script>
