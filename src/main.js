import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import { auth } from "@/firebase";

import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll)

Vue.config.productionTip = false

auth.onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch('setUser', user)
  } 
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
});



