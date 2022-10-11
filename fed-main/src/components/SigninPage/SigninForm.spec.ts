import { render, cleanup, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import SigninForm from './SigninForm.vue'
import { initializeFirebaseApp } from '../../config/firebase.config'
import { Auth, getAuth } from 'firebase/auth'
import { pinia } from '../../main'
import { TestUtils } from '../../utils/helpers'
import { useValidator } from '../../utils/composables/validator'
import { default as useStatePhoneVerification } from '../PhoneVerificationPage/useState'
import { useAuthStore } from '../../store/auth'

let router: Router
let auth: Auth

describe('SigninForm', async () => {
  beforeAll(() => {
    router = createRouter({
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { top: 0 }
        }
      },
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          components: {},
        },
        {
          path: '/email-verification',
          name: 'email-verification',
          components: {},
        },
        {
          path: '/phone-verification',
          name: 'phone-verification',
          components: {},
        },
      ],
    })
    auth = getAuth(initializeFirebaseApp(process.env as ImportMetaEnv))
  })

  it('render component correctly and signin a user with phone, email or google', async () => {
    const wrapper = render(SigninForm, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    const buttonSignInAUser = wrapper.getByTestId('Sign in a user')
    const buttonSigninWithGoogle = wrapper.getByTestId('Sign in with Google')

    // Mock signUpWithGoogle() function
    TestUtils.Vitest.mockImplementationClick(buttonSigninWithGoogle, () => undefined)

    // Mock signInUser() function
    TestUtils.Vitest.mockImplementationSubmit(buttonSignInAUser, () => undefined)

    await fireEvent.submit(buttonSignInAUser)
    await fireEvent.click(buttonSigninWithGoogle)

    expect(buttonSignInAUser).toBeTruthy()
    expect(buttonSignInAUser).respondTo('submit')

    expect(buttonSigninWithGoogle).toBeTruthy()
    expect(buttonSigninWithGoogle).respondTo('click')

    cleanup()
  })

  it('call signInUser() function', async () => {
    const wrapper = shallowMount(SigninForm, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    // Mock and test signInUser() and test function
    const spyOnSignInUser = vi.spyOn(wrapper.vm, 'signInUser')
    spyOnSignInUser.mockImplementation(() => undefined)
    await wrapper.vm.signInUser()

    expect(spyOnSignInUser).toHaveBeenCalled()

    // Test useValidator() function
    const fullName = 'Foo Bar'
    const incorrectFullName = 'Foo Bar 123'
    const email = 'test@test.com'
    const incorrectEmail = 'test'
    const phone = '+61411111111'

    const testEmail = useValidator({
      phoneOrEmail: email,
    })

    expect(testEmail.validProps.mobilePhone.valid).toBe(false)
    expect(testEmail.validProps.mobilePhone.message).toBe(
      'Please enter a valid Mobile Phone. The phone number must start with a + and must be between 7 and 16 digits.'
    )
    expect(testEmail.validProps.email.valid).toBe(true)
    expect(testEmail.validProps.email.message).toBe('')
    expect(testEmail.validProps.phoneOrEmail.valid).toBe(true)
    expect(testEmail.validProps.phoneOrEmail.message).toBe('')

    const testPhone = useValidator({
      phoneOrEmail: phone,
    })

    expect(testPhone.validProps.mobilePhone.valid).toBe(true)
    expect(testPhone.validProps.mobilePhone.message).toBe('')
    expect(testPhone.validProps.phoneOrEmail.valid).toBe(true)
    expect(testPhone.validProps.phoneOrEmail.message).toBe('')

    const testWithIncorrectEmail = useValidator({
      phoneOrEmail: incorrectEmail,
    })

    expect(testWithIncorrectEmail.validProps.mobilePhone.valid).toBe(false)
    expect(testWithIncorrectEmail.validProps.mobilePhone.message).toBe(
      'Please enter a valid Mobile Phone. The phone number must start with a + and must be between 7 and 16 digits.'
    )
    expect(testWithIncorrectEmail.validProps.email.valid).toBe(false)
    expect(testWithIncorrectEmail.validProps.email.message).toBe('Please enter a valid Email.')
    expect(testWithIncorrectEmail.validProps.phoneOrEmail.valid).toBe(false)
    expect(testWithIncorrectEmail.validProps.phoneOrEmail.message).toBe(
      'Please enter a valid Mobile Number or Email. The phone number must start with a + and must be between 7 and 16 digits.'
    )
  })
})
