import { render, cleanup, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import SignupForm from './SignupForm.vue'
import { initializeFirebaseApp } from '../../config/firebase.config'
import { Auth, getAuth } from 'firebase/auth'
import { pinia } from '../../main'
import { TestUtils } from '../../utils/helpers'
import { useValidator } from '../../utils/composables/validator'
import { default as useStatePhoneVerification } from '../PhoneVerificationPage/useState'
import { useAuthStore } from '../../store/auth'

let router: Router
let auth: Auth

describe('SignupForm', async () => {
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

  it('render component correctly and create a user with phone, email or google', async () => {
    const wrapper = render(SignupForm, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    const buttonCreateAUser = wrapper.getByTestId('Create a user')
    const buttonSignupWithGoogle = wrapper.getByTestId('Sign up with Google')

    // Mock signUpWithGoogle() function
    TestUtils.Vitest.mockImplementationClick(buttonSignupWithGoogle, () => undefined)

    // Mock createUser() function
    TestUtils.Vitest.mockImplementationSubmit(buttonCreateAUser, () => undefined)

    await fireEvent.submit(buttonCreateAUser)
    await fireEvent.click(buttonSignupWithGoogle)

    expect(buttonCreateAUser).toBeTruthy()
    expect(buttonCreateAUser).respondTo('submit')

    expect(buttonSignupWithGoogle).toBeTruthy()
    expect(buttonSignupWithGoogle).respondTo('click')

    cleanup()
  })

  it('call createUser() function', async () => {
    const wrapper = shallowMount(SignupForm, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    // Mock and test createUser() and test function
    const spyOnCreateUser = vi.spyOn(wrapper.vm, 'createUser')
    spyOnCreateUser.mockImplementation(() => undefined)
    await wrapper.vm.createUser()

    expect(spyOnCreateUser).toHaveBeenCalled()

    // Test useValidator() function
    const fullName = 'Foo Bar'
    const incorrectFullName = 'Foo Bar 123'
    const email = 'test@test.com'
    const incorrectEmail = 'test'
    const phone = '+61411111111'

    const testWithFullNameAndEmail = useValidator({
      fullName: fullName,
      phoneOrEmail: email,
    })

    expect(testWithFullNameAndEmail.validProps.fullName.valid).toBe(true)
    expect(testWithFullNameAndEmail.validProps.fullName.message).toBe('')
    expect(testWithFullNameAndEmail.validProps.mobilePhone.valid).toBe(false)
    expect(testWithFullNameAndEmail.validProps.mobilePhone.message).toBe(
      'Please enter a valid Mobile Phone. The phone number must start with a + and must be between 7 and 16 digits.'
    )
    expect(testWithFullNameAndEmail.validProps.email.valid).toBe(true)
    expect(testWithFullNameAndEmail.validProps.email.message).toBe('')
    expect(testWithFullNameAndEmail.validProps.phoneOrEmail.valid).toBe(true)
    expect(testWithFullNameAndEmail.validProps.phoneOrEmail.message).toBe('')

    const testWithFullNameAndPhone = useValidator({
      fullName: fullName,
      phoneOrEmail: phone,
    })

    expect(testWithFullNameAndPhone.validProps.fullName.valid).toBe(true)
    expect(testWithFullNameAndPhone.validProps.fullName.message).toBe('')
    expect(testWithFullNameAndPhone.validProps.mobilePhone.valid).toBe(true)
    expect(testWithFullNameAndPhone.validProps.mobilePhone.message).toBe('')
    expect(testWithFullNameAndPhone.validProps.phoneOrEmail.valid).toBe(true)
    expect(testWithFullNameAndPhone.validProps.phoneOrEmail.message).toBe('')

    const testWithIncorrectFullNameAndIncorrectEmail = useValidator({
      fullName: incorrectFullName,
      phoneOrEmail: incorrectEmail,
    })

    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.fullName.valid).toBe(false)
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.fullName.message).toBe(
      'Please enter a valid full name.'
    )
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.mobilePhone.valid).toBe(false)
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.mobilePhone.message).toBe(
      'Please enter a valid Mobile Phone. The phone number must start with a + and must be between 7 and 16 digits.'
    )
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.email.valid).toBe(false)
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.email.message).toBe('Please enter a valid Email.')
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.phoneOrEmail.valid).toBe(false)
    expect(testWithIncorrectFullNameAndIncorrectEmail.validProps.phoneOrEmail.message).toBe(
      'Please enter a valid Mobile Number or Email. The phone number must start with a + and must be between 7 and 16 digits.'
    )

    // Mock and test signInWithToken() and test function
    const spyOnSignInWithToken = vi.spyOn(wrapper.vm, 'signInWithToken')
    spyOnSignInWithToken.mockImplementation(() => undefined)
    await wrapper.vm.signInWithToken()

    expect(spyOnSignInWithToken).toHaveBeenCalled()

    // Mock and test sendVerificationEmailLink() and test function
    const spyOnSendVerificationEmailLink = vi.spyOn(wrapper.vm, 'sendVerificationEmailLink')
    spyOnSendVerificationEmailLink.mockImplementation(() => undefined)
    await wrapper.vm.sendVerificationEmailLink()

    expect(spyOnSendVerificationEmailLink).toHaveBeenCalled()

    // Test clearInputs() function
    const spyOnClearInputs = vi.spyOn(wrapper.vm, 'clearInputs')

    await wrapper.find('[data-testid="Full Name"]').setValue('Foo Bar')
    await wrapper.find('[data-testid="Phone or Email"]').setValue('+61411111111')

    expect(wrapper.vm.fullName).toBe('Foo Bar')
    expect(wrapper.vm.phoneOrEmail).toBe('+61411111111')

    await wrapper.vm.clearInputs()

    expect(wrapper.vm.fullName).toBe('')
    expect(wrapper.vm.phoneOrEmail).toBe('')
    expect(spyOnClearInputs).toHaveBeenCalled()

    // Test setting phone verification useStore()
    await wrapper.find('[data-testid="Full Name"]').setValue('Foo Bar')
    await wrapper.find('[data-testid="Phone or Email"]').setValue('+61411111111')

    const { fullName: name, phoneNumber, setFullName, setPhoneNumber } = useStatePhoneVerification()
    setFullName(wrapper.vm.fullName)
    setPhoneNumber(wrapper.vm.phoneOrEmail)

    expect(name.value).toBe('Foo Bar')
    expect(phoneNumber.value).toBe('+61411111111')

    spyOnCreateUser.mockReset()
    spyOnSignInWithToken.mockReset()
    spyOnSendVerificationEmailLink.mockReset()
    spyOnClearInputs.mockReset()
  })

  it('call signUpWithGoogle() function', async () => {
    const wrapper = shallowMount(SignupForm, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    // Mock and test signUpWithGoogle() and test function
    const spyOnSignUpWithGoogle = vi.spyOn(wrapper.vm, 'signUpWithGoogle')
    spyOnSignUpWithGoogle.mockImplementation(() => undefined)
    await wrapper.vm.signUpWithGoogle()

    expect(spyOnSignUpWithGoogle).toHaveBeenCalled()

    // Mock and test storeUserToDatabase() and test function
    const spyOnStoreUserToDatabase = vi.spyOn(wrapper.vm, 'storeUserToDatabase')
    // Set the auth store with pinia
    const useStoreAuth = useAuthStore(pinia)
    spyOnStoreUserToDatabase.mockImplementation(() => {
      useStoreAuth.user = {
        uid: 'ZU4jn14tbWfspKuWorshlqQ1s2E3',
        firstName: 'Foo',
        lastName: 'Bar',
        role: 'USER_DEFAULT',
        email: 'test@test.com',
        phoneNumber: null,
        displayName: 'Foo Bar',
        photoURL: null,
        emailVerified: true,
      }
    })
    await wrapper.vm.storeUserToDatabase()

    expect(spyOnStoreUserToDatabase).toHaveBeenCalled()
    expect(useStoreAuth.user).toEqual({
      uid: 'ZU4jn14tbWfspKuWorshlqQ1s2E3',
      firstName: 'Foo',
      lastName: 'Bar',
      role: 'USER_DEFAULT',
      email: 'test@test.com',
      phoneNumber: null,
      displayName: 'Foo Bar',
      photoURL: null,
      emailVerified: true,
    })
  })

  it('snap shot matches', async () => {
    const wrapper = render(SignupForm, {
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
