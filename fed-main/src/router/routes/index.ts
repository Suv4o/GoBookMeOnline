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
    meta: { accessLevel: [AccessLevel.DEFAULT_USER_NOT_AUTHENTICATED, AccessLevel.DEFAULT_PROVIDER_NOT_AUTHENTICATED] },
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
    meta: { accessLevel: [AccessLevel.DEFAULT_USER_NOT_AUTHENTICATED, AccessLevel.DEFAULT_PROVIDER_NOT_AUTHENTICATED] },
  },
  {
    path: '/email-verification',
    name: 'email-verification',
    components: {
      default: () => import('../../views/EmailVerificationPage.vue'),
      DefaultMainNav: () => import('../../components/Default/DefaultMainNav/DefaultMainNav.vue'),
      DefaultFooter: () => import('../../components/Default/DefaultFooter/DefaultFooter.vue'),
    },
    meta: {
      accessLevel: [
        AccessLevel.DEFAULT_USER_AUTHENTICATED_WITHOUT_EMAIL_VERIFIED,
        AccessLevel.DEFAULT_PROVIDER_AUTHENTICATED_WITHOUT_EMAIL_VERIFIED,
      ],
    },
  },
  {
    path: '/phone-verification',
    name: 'phone-verification',
    components: {
      default: () => import('../../views/PhoneVerificationPage.vue'),
      DefaultMainNav: () => import('../../components/Default/DefaultMainNav/DefaultMainNav.vue'),
      DefaultFooter: () => import('../../components/Default/DefaultFooter/DefaultFooter.vue'),
    },
    meta: {
      accessLevel: [
        AccessLevel.DEFAULT_USER_WAITING_FOR_PHONE_VERIFICATION,
        AccessLevel.DEFAULT_PROVIDER_WAITING_FOR_PHONE_VERIFICATION,
      ],
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

export default routes
