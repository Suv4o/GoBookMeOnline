import { render } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import DefaultMainNav from './DefaultMainNav.vue'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

describe('DefaultMainNav', () => {
  it('render DefaultMainNav component correctly', async () => {
    const router = createRouter({
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

    function initializeFirebaseApp() {
      const firebaseConfig = {
        apiKey: 'AIzaSyAwJ-t5f4sHaQWfkgvBTiT67dGyVTU3DG4',
        authDomain: 'o-book-me-today-dev.firebaseapp.com',
        projectId: 'go-book-me-today-dev',
        storageBucket: 'go-book-me-today-dev.appspot.com',
        messagingSenderId: '992441441826',
        appId: '1:992441441826:web:eda4b493cb3c4f803e347b',
      }

      return initializeApp(firebaseConfig)
    }

    const auth = getAuth(initializeFirebaseApp())

    render(DefaultMainNav, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
        provide: {
          $auth: auth,
        },
      },
    })
  })
})

//   it('snap shot matches', async () => {
//     const wrapper = render(DefaultMainNav)
//     expect(wrapper).toMatchSnapshot()
//   })
// })
