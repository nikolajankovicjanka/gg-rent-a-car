import { createRouter, createWebHistory } from 'vue-router';
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },
    { path: '/vozila', component: () => import('../views/VehiclesView.vue') },
    { path: '/vozila/:slug', component: () => import('../views/VehicleDetailsView.vue') },
    { path: '/prati-rezervaciju', component: () => import('../views/BookingTrackingView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
});
