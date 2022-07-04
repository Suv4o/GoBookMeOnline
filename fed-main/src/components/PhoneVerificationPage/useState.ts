import { reactive, toRefs } from 'vue'

const state = reactive({
  fullName: '',
  phoneNumber: '',
})

export default () => {
  function setFullName(name = '') {
    state.fullName = name
  }

  function setPhoneNumber(phone = '') {
    state.phoneNumber = phone
  }

  return {
    ...toRefs(state),
    setFullName,
    setPhoneNumber,
  }
}
