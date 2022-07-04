import { defineStore } from 'pinia'

export enum NotificationTypes {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface NotificationState {
  isOpen: boolean
  type: NotificationTypes | null
  title: string | null
  message: string | null
}

export const useNotificationStore = defineStore('notificationStore', {
  state: (): NotificationState => {
    return {
      isOpen: false,
      type: null,
      title: null,
      message: null,
    }
  },
})
