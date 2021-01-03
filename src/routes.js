import Home from './components/Home.vue';
import Map from './components/Map.vue';
import Info from './components/Info.vue';

export const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/map', component: Map },
  { path: '/info', component: Info },
  { path: '*', redirect: '/home' },
];
