import { reactive } from 'vue'
import { splitFullName } from '../helpers'

enum Messages {
  FullName = 'Please enter a valid full name.',
  Email = 'Please enter a valid Email.',
  PhoneNumber = 'Please enter a valid Mobile Phone. The phone number must start with a + and must be between 7 and 16 digits.',
  PhoneOrEmail = 'Please enter a valid Mobile Number or Email. The phone number must start with a + and must be between 7 and 16 digits.',
  Password = 'Password must between 8 to 20 letters and include combination of uppercase, lowercase, numbers and a special characters.',
}

export type ResponseValidator = {
  [key in keyof ValidateOptions]: PropertyOptions
}

interface PropertyOptions {
  valid: boolean
  message: string
  isMobile?: boolean
}

interface ValidateOptions {
  fullName: string
  email: string
  mobilePhone: string
  phoneOrEmail: string
  password: string
}

export function useValidator(validate: Partial<ValidateOptions>) {
  const validProps = reactive({} as ResponseValidator)

  if (validate.fullName) {
    validateFullName(validate.fullName)
  }

  if (validate.email) {
    validateEmail(validate.email)
  }

  if (validate.mobilePhone) {
    validatePhone(validate.mobilePhone)
  }

  if (validate.phoneOrEmail) {
    validatePhoneOrEmail(validate.phoneOrEmail)
  }

  if (validate.password) {
    validatePassword(validate.password)
  }

  function validateFullName(fullName: string) {
    const { firstName, lastName } = splitFullName(fullName)
    if (/^([a-zA-Z\\'\- ]){2,32}$/.test(fullName) && firstName.length >= 2 && lastName.length >= 2) {
      validProps.fullName = {
        valid: true,
        message: '',
      }
      return
    }
    validProps.fullName = {
      valid: false,
      message: Messages.FullName,
    }
  }

  function validatePhoneOrEmail(phoneOrEmail: string) {
    validatePhone(phoneOrEmail)
    if (validProps.mobilePhone.valid) {
      validProps.phoneOrEmail = { ...validProps.mobilePhone, ...{ isMobile: true } }
      return
    }
    validateEmail(phoneOrEmail)
    if (validProps.email.valid) {
      validProps.phoneOrEmail = { ...validProps.email, ...{ isMobile: false } }
      return
    }
    validProps.phoneOrEmail = {
      valid: false,
      message: Messages.PhoneOrEmail,
    }
  }

  function validateEmail(email: string) {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      validProps.email = {
        valid: true,
        message: '',
      }
      return
    }
    validProps.email = {
      valid: false,
      message: Messages.Email,
    }
  }

  function validatePhone(mobilePhone: string) {
    if (/^\+[1-9]{1}[0-9]{7,16}$/.test(mobilePhone)) {
      validProps.mobilePhone = {
        valid: true,
        message: '',
      }
      return
    }
    validProps.mobilePhone = {
      valid: false,
      message: Messages.PhoneNumber,
    }
  }

  function validatePassword(password: string) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/.test(password)) {
      validProps.password = {
        valid: true,
        message: '',
      }
      return
    }
    validProps.password = {
      valid: false,
      message: Messages.Password,
    }
  }

  return { validProps }
}
