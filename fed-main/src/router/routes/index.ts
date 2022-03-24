const routes = [
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
    path: '/signup',
    name: 'signup',
    components: {
      default: () => import('../../views/SignupPage.vue'),
      DefaultMainNav: () => import('../../components/Default/DefaultMainNav/DefaultMainNav.vue'),
      DefaultNewsletter: () => import('../../components/Default/DefaultNewsletter/DefaultNewsletter.vue'),
      DefaultFooter: () => import('../../components/Default/DefaultFooter/DefaultFooter.vue'),
    },
  },
]

export default routes
