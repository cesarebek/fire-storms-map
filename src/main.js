import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import Spinner from './components/Spinner.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.component('my-spinner', Spinner);

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
