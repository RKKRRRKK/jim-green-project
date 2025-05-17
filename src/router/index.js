import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

export default createRouter({
  history: createWebHashHistory(), // ← hash mode
  routes: [
    { path: '/jim-green-project/', component: HomeView },
    { path: '/jim-green-project/about', component: AboutView },
  ],
})
