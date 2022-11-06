import type { RouteRecordRaw } from 'vue-router'

const mainRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('../../views/HomePage.vue'),
      DefaultMainNav: () => import('../../components/Default/DefaultMainNav/DefaultMainNav.vue'),
      DefaultNewsletter: () => import('../../components/Default/DefaultNewsletter/DefaultNewsletter.vue'),
      DefaultFooter: () => import('../../components/Default/DefaultFooter/DefaultFooter.vue'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    components: {
      default: () => import('../../views/NotFoundPage.vue'),
    },
  },
]

export default mainRoutes
