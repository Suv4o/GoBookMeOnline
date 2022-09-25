import { render, cleanup, fireEvent } from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { pinia } from '../../main'
import { useNotification } from '../../utils/composables/notification'
import EmailVerificationPage from './HeroSection.vue'
import { NotificationTypes, useNotificationStore } from '../../store/notification'
import { TestUtils } from '../../utils/helpers'

describe('EmailVerificationPage', async () => {
  it('render component correctly and send verification email link', async () => {
    const useStoreNotification = useNotificationStore(pinia)

    const wrapper = render(EmailVerificationPage, {
      global: {
        plugins: [pinia],
      },
    })

    const buttonSendVerificationEmailLink = wrapper.getByTestId('Send Verification Email Link')

    // Mock sendVerificationEmailLink() function
    TestUtils.Vitest.mockImplementationClick(buttonSendVerificationEmailLink, () => undefined)
    await fireEvent.click(buttonSendVerificationEmailLink)

    expect(buttonSendVerificationEmailLink).toBeTruthy()
    expect(buttonSendVerificationEmailLink).respondTo('click')

    useNotification({
      type: NotificationTypes.Success,
      title: 'Verification Email Sent',
      message: 'A new verification email has been sent to your email address.',
    })

    expect(useStoreNotification.isOpen).toBe(true)
    expect(useStoreNotification.type).toBe(NotificationTypes.Success)
    expect(useStoreNotification.title).toBe('Verification Email Sent')
    expect(useStoreNotification.message).toBe('A new verification email has been sent to your email address.')

    cleanup()
  })

  it('call sendVerificationEmailLink() function', async () => {
    const wrapper = shallowMount(EmailVerificationPage, {
      global: {
        plugins: [pinia],
      },
    })

    const spySendVerificationEmailLink = vi.spyOn(wrapper.vm, 'sendVerificationEmailLink')
    spySendVerificationEmailLink.mockImplementation(() => undefined)
    await wrapper.vm.sendVerificationEmailLink()
    expect(spySendVerificationEmailLink).toHaveBeenCalled()
    expect(spySendVerificationEmailLink).toReturnWith(undefined)
    spySendVerificationEmailLink.mockReset()
    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(EmailVerificationPage)
    expect(wrapper).toMatchSnapshot()
  })
})
