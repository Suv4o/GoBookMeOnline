import { render, cleanup } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DefaultNotification from './DefaultNotification.vue'
import { pinia } from '../../../main'
import { NotificationTypes, useNotificationStore } from '../../../store/notification'

describe('DefaultNotification', async () => {
  it('render component correctly', async () => {
    const useStoreNotification = useNotificationStore(pinia)

    useStoreNotification.isOpen = true
    useStoreNotification.type = NotificationTypes.Success
    useStoreNotification.title = 'Test Title'
    useStoreNotification.message = 'Test Message'

    const wrapper = render(DefaultNotification, {
      global: {
        plugins: [pinia],
      },
    })

    const notificationTitle = wrapper.getByTestId('Notification title')
    const notificationMessage = wrapper.getByTestId('Notification message')
    const notificationIcon = wrapper.getByTestId('Notification icon')

    expect(notificationTitle.textContent).toBe(useStoreNotification.title)
    expect(notificationMessage.textContent).toBe(useStoreNotification.message)
    expect(notificationIcon.childElementCount).toBe(1)

    cleanup()
  })

  it('snap shot matches', async () => {
    const wrapper = render(DefaultNotification, {
      global: {
        plugins: [pinia],
      },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
