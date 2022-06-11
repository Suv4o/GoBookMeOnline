import { AccessLevel } from '../../types/enums'

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
    meta: { accessLevel: AccessLevel.NotAuthenticated },
  },
  {
    path: '/signin',
    name: 'signin',
    components: {
      default: () => import('../../views/SigninPage.vue'),
      DefaultMainNav: () => import('../../components/Default/DefaultMainNav/DefaultMainNav.vue'),
      DefaultNewsletter: () => import('../../components/Default/DefaultNewsletter/DefaultNewsletter.vue'),
      DefaultFooter: () => import('../../components/Default/DefaultFooter/DefaultFooter.vue'),
    },
    meta: { accessLevel: AccessLevel.NotAuthenticated },
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
  {
    path: '/email-verification',
    name: 'email-verification',
    components: {
      default: () => import('../../views/EmailVerificationPage.vue'),
      DefaultMainNav: () => import('../../components/Default/DefaultMainNav/DefaultMainNav.vue'),
      DefaultNewsletter: () => import('../../components/Default/DefaultNewsletter/DefaultNewsletter.vue'),
      DefaultFooter: () => import('../../components/Default/DefaultFooter/DefaultFooter.vue'),
    },
    meta: { accessLevel: AccessLevel.AuthenticatedWithoutEmailVerified },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    components: {
      default: () => import('../../views/NotFoundPage.vue'),
    },
  },
]

export default routes
