const routes = [
  { path: '/', name: 'home', component: () => import('../../views/HomePage.vue') },
  { path: '/signup', name: 'signup', component: () => import('../../views/SignupPage.vue') },
]

export default routes
