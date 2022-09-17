import { render, cleanup, fireEvent } from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { pinia } from '../../main'
import { useAuthStore } from '../../store/auth'
import EmailVerificationPage from './HeroSection.vue'

describe('EmailVerificationPage', async () => {
  beforeAll(async () => {
    console.log('idToken')
  })

  it('render component correctly and send verification email link', async () => {
    // const useStoreAuth = useAuthStore(pinia)
    // useStoreAuth.accessToken = idToken

    const wrapper = render(EmailVerificationPage, {
      global: {
        plugins: [pinia],
      },
    })

    const buttonSendVerificationEmailLink = wrapper.getByTestId('Send Verification Email Link')
    await fireEvent.click(buttonSendVerificationEmailLink)
    cleanup()
  })

  it('call sendVerificationEmailLink() function', async () => {
    // const useStoreAuth = useAuthStore(pinia)
    // useStoreAuth.accessToken = idToken

    const wrapper = shallowMount(EmailVerificationPage, {
      global: {
        plugins: [pinia],
      },
    })

    const spySendVerificationEmailLink = vi.spyOn(wrapper.vm, 'sendVerificationEmailLink')
    wrapper.vm.sendVerificationEmailLink()
    expect(spySendVerificationEmailLink).toHaveBeenCalled()
    spySendVerificationEmailLink.mockReset()

    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(EmailVerificationPage)
    expect(wrapper).toMatchSnapshot()
  })
})
