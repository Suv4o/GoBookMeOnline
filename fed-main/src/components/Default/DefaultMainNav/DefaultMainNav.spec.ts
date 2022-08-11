import { render } from '@testing-library/vue'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import DefaultMainNav from './DefaultMainNav.vue'
import { Auth, getAuth } from 'firebase/auth'
import * as dotenv from 'dotenv'
import { initializeFirebaseApp } from '../../../config/firebase.config'
import { pinia } from '../../../main'
import { useAuthStore } from '../../../store/auth'
dotenv.config({ path: `./env/env.${process.env.NODE_ENV}` })

let router: Router
let auth: Auth

beforeAll(() => {
  router = createRouter({
    history: createWebHistory(),
    routes: [
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
    ],
  })
  auth = getAuth(initializeFirebaseApp(process.env as ImportMetaEnv))
})

describe('DefaultMainNav', async () => {
  it('render DefaultMainNav component correctly', async () => {
    const useStoreAuth = useAuthStore(pinia)

    // useStoreAuth.user = {
    //   displayName: 'Foo Bar',
    //   email: 'test@test.com',
    //   emailVerified: true,
    //   firstName: 'Foo',
    //   lastName: 'Bar',
    //   phoneNumber: null,
    //   photoURL: null,
    //   role: 'USER_DEFAULT',
    //   uid: 'ZU4jn14tbWfspKuWorshlqQ1s2E3',
    // }

    // useStoreAuth.isUserReady = true

    const wrapper = render(DefaultMainNav, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    const buttonSignOut = wrapper.getAllByText('Sign up')
    const buttonSignIn = wrapper.getAllByText('Sign in')

    expect(buttonSignOut.length).toBe(1)
    expect(buttonSignIn.length).toBe(1)
  })

  // it('snap shot matches', async () => {
  //   const wrapper = render(DefaultMainNav, {
  //     global: {
  //       plugins: [createTestingPinia({ createSpy: vi.fn }), router],
  //       provide: {
  //         $auth: auth,
  //       },
  //     },
  //   })
  //   expect(wrapper).toMatchSnapshot()
  // })
})
