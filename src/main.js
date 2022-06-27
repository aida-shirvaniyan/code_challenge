import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://api.themoviedb.org/'
axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  store.state.token;
  return config;
});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
