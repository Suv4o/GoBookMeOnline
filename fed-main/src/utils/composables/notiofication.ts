import { useNotificationStore } from '../../store/notification'
import { NotificationState } from '../../store/notification'
let notificationTimeout = null as ReturnType<typeof setTimeout> | null

export function useNotification(
  notificationOptions: Pick<NotificationState, 'type' | 'title' | 'message'>,
  timeout = 8000
) {
  const notificationStore = useNotificationStore()
  const { type, title, message } = notificationOptions

  if (notificationTimeout) {
    clearTimeout(notificationTimeout)
  }

  notificationStore.isOpen = true
  notificationStore.type = type
  notificationStore.title = title
  notificationStore.message = message

  notificationTimeout = setTimeout(() => {
    notificationStore.isOpen = false
    notificationStore.type = null
    notificationStore.title = null
    notificationStore.message = null
  }, timeout)
}
