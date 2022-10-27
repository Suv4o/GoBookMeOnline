import { reactive, toRefs } from 'vue'

const state = reactive({
  isSignInButtonShown: true,
  isSignUpButtonShown: true,
})

export default () => {
  function setSignInButtonShown(isShown = true) {
    state.isSignInButtonShown = isShown
  }

  function setSignUpButtonShown(isShown = true) {
    state.isSignUpButtonShown = isShown
  }

  return {
    ...toRefs(state),
    setSignInButtonShown,
    setSignUpButtonShown,
  }
}
