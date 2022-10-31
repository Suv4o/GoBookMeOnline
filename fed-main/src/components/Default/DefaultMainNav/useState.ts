import { reactive, toRefs } from 'vue'
import { Roles } from '../../../types/enums'

const state = reactive({
  isSignInButtonShown: true,
  isSignUpButtonShown: true,
  roleType: Roles.USER_DEFAULT,
})

export default () => {
  function setSignInButtonShown(isShown = true) {
    state.isSignInButtonShown = isShown
  }

  function setSignUpButtonShown(isShown = true) {
    state.isSignUpButtonShown = isShown
  }

  function setRoleType(roleType: Roles) {
    state.roleType = roleType
  }

  return {
    ...toRefs(state),
    setSignInButtonShown,
    setSignUpButtonShown,
    setRoleType,
  }
}
