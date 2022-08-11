import { render } from '@testing-library/vue'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import DefaultMainNav from './DefaultMainNav.vue'
import { Auth, getAuth } from 'firebase/auth'
import * as dotenv from 'dotenv'
import { initializeFirebaseApp } from '../../../config/firebase.config'
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

describe('DefaultMainNav', () => {
  it('render DefaultMainNav component correctly', async () => {
    render(DefaultMainNav, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
        provide: {
          $auth: auth,
        },
      },
    })
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultMainNav, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
        provide: {
          $auth: auth,
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
