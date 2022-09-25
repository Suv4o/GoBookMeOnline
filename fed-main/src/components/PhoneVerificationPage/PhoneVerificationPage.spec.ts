import * as dotenv from 'dotenv'
import { render, cleanup, fireEvent } from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { createRouter, createWebHistory, Router } from 'vue-router'
import PhoneVerificationPage from './HeroSection.vue'
import { initializeFirebaseApp } from '../../config/firebase.config'
import { Auth, getAuth } from 'firebase/auth'
import { default as useStatePhoneVerification } from './useState'
import { useNotification } from '../../utils/composables/notification'
import { NotificationTypes, useNotificationStore } from '../../store/notification'
import { TestUtils } from '../../utils/helpers'
import { pinia } from '../../main'
import { ConfirmationResult, UserCredential } from '@firebase/auth'
dotenv.config({ path: `./env/env.${process.env.NODE_ENV}` })

let router: Router
let auth: Auth

// Set Mocked Function
const sendPhoneVerificationCodeFunction = () => {
  const confirmationResult: ConfirmationResult = {
    confirm(verificationCode: string): Promise<UserCredential> {
      return Promise.resolve({} as UserCredential)
    },
    verificationId: 'string',
  }
  return confirmationResult
}

describe('PhoneVerificationPage', async () => {
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
      ],
    })
    auth = getAuth(initializeFirebaseApp(process.env as ImportMetaEnv))
  })

  it('render component correctly and send phone number', async () => {
    const useStoreNotification = useNotificationStore(pinia)

    const wrapper = render(PhoneVerificationPage, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    const buttonSendPhoneVerificationCode = wrapper.getByTestId('Send Phone Verification Code')

    // Mock sendVerificationCode() function
    TestUtils.Vitest.mockImplementationClick(buttonSendPhoneVerificationCode, sendPhoneVerificationCodeFunction)
    await fireEvent.click(buttonSendPhoneVerificationCode)

    expect(buttonSendPhoneVerificationCode).toBeTruthy()
    expect(buttonSendPhoneVerificationCode).respondTo('click')

    useNotification({
      type: NotificationTypes.Success,
      title: 'Send',
      message: 'A verification code has been sent to your mobile number.',
    })

    expect(useStoreNotification.isOpen).toBe(true)
    expect(useStoreNotification.type).toBe(NotificationTypes.Success)
    expect(useStoreNotification.title).toBe('Send')
    expect(useStoreNotification.message).toBe('A verification code has been sent to your mobile number.')

    cleanup()
  })

  it('call onMounted functions', async () => {
    const wrapper = shallowMount(PhoneVerificationPage, {
      global: {
        plugins: [pinia, router],
        provide: {
          $auth: auth,
        },
      },
    })

    // Set user Full Name and Phone Number
    const { setFullName, setPhoneNumber } = useStatePhoneVerification()
    setFullName('Foo Bar')
    setPhoneNumber('+61411111111')
    wrapper.vm.verificationCode = '221288'

    const spyOnMounted = vi.spyOn(wrapper.vm, 'setVerificationCode')
    const spyOnSendVerificationCode = vi.spyOn(wrapper.vm, 'sendVerificationCode')
    spyOnSendVerificationCode.mockImplementation(sendPhoneVerificationCodeFunction)
    const spyOnSubmitVerificationCode = vi.spyOn(wrapper.vm, 'submitVerificationCode')

    await wrapper.vm.setVerificationCode()
    await wrapper.vm.sendVerificationCode()
    await wrapper.vm.submitVerificationCode()

    expect(spyOnMounted).toHaveBeenCalled()
    expect(spyOnSendVerificationCode).toHaveBeenCalled()
    expect(spyOnSubmitVerificationCode).toHaveBeenCalled()

    spyOnMounted.mockReset()
    spyOnSendVerificationCode.mockReset()
    spyOnSubmitVerificationCode.mockReset()

    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(PhoneVerificationPage, {
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
