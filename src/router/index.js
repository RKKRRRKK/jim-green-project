import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // <-- key change
  routes: [
    { path: '/', component: HomeView },
    // { path: '/about', component: AboutView },
  ],
})

export default router
