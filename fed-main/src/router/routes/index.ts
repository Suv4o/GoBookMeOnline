const routes = [
  { path: '/', component: () => import('../../views/HomePage.vue') },
  { path: '/signup', component: () => import('../../views/SignupPage.vue') },
]

export default routes
