import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import MarketsView from '@/views/MarketsView.vue'
import ContactView from '@/views/ContactView.vue'
import QuizView from '@/views/QuizView.vue'
import { featureFlags } from '@/data/realtorProfile'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/markets',
      name: 'markets',
      component: MarketsView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView,
      alias: ['/match', '/triangle-quiz']
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, _from, next) => {
  const isQuizRoute = ['quiz', 'match', 'triangle-quiz'].includes(to.name as string) ||
    to.path === '/quiz' ||
    to.path === '/match' ||
    to.path === '/triangle-quiz'

  if (isQuizRoute && !featureFlags.value.neighborhoodVibeMatcher) {
    next({ path: '/', replace: true })
    return
  }
  next()
})

export default router
