import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App';
import api from './api/index'
import router from './router'
import VueMask from 'v-mask'

Vue.prototype.$api = api
Vue.use(VueMask)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
