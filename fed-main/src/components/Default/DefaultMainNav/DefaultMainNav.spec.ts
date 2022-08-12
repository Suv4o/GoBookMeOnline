import { render, fireEvent, cleanup } from '@testing-library/vue'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { createRouter, createWebHistory, Router } from 'vue-router'
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
  it('render component correctly', async () => {
    const wrapper = render(DefaultMainNav, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    // Test if Desktop Signin and Signup buttons are rendered
    const buttonSignOutDesktop = wrapper.getAllByTestId('Sign up')
    const buttonSignInDesktop = wrapper.getAllByTestId('Sign in')

    expect(buttonSignOutDesktop.length).toBe(1)
    expect(buttonSignInDesktop.length).toBe(1)

    // Open Mobile Menu and test if both Desktop and Mobile Signin and Signup buttons are rendered
    const buttonHamburgerMenu = wrapper.getByTestId('Open menu')
    await fireEvent.click(buttonHamburgerMenu)

    const buttonSignOutDesktopMobile = wrapper.getAllByTestId('Sign up')
    const buttonSignInDesktopMobile = wrapper.getAllByTestId('Sign in')

    expect(buttonSignOutDesktopMobile.length).toBe(2)
    expect(buttonSignInDesktopMobile.length).toBe(2)

    cleanup()
  })

  it('render component with sign in user correctly', async () => {
    const useStoreAuth = useAuthStore(pinia)

    useStoreAuth.user = {
      displayName: 'Foo Bar',
      email: 'test@test.com',
      emailVerified: true,
      firstName: 'Foo',
      lastName: 'Bar',
      phoneNumber: null,
      photoURL: null,
      role: 'USER_DEFAULT',
      uid: 'ZU4jn14tbWfspKuWorshlqQ1s2E3',
    }

    useStoreAuth.isUserReady = true

    const wrapper = render(DefaultMainNav, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    // Render User Initials currently on Desktop
    const userInitialsDesktop = wrapper.getByTestId('User Initials Desktop')
    expect(userInitialsDesktop.textContent).toBe(useStoreAuth.userInitials)

    // Open Mobile Menu and render User Initials currently on Mobile
    const buttonHamburgerMenu = wrapper.getByTestId('Open menu')
    await fireEvent.click(buttonHamburgerMenu)

    const userInitialsMobile = wrapper.getByTestId('User Initials Mobile')
    expect(userInitialsMobile.textContent).toBe(useStoreAuth.userInitials)

    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultMainNav, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
