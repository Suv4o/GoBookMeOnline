import { RouteLocationNormalized, Router } from 'vue-router'
import { AuthStateUser } from '../../types/interfaces'
import { AuthState } from '../../store/auth'
import { AccessLevel } from '../../types/enums'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { pinia } from '../../main'
import { useAuthStore } from '../../store/auth'
import { default as useStatePhoneVerification } from '../../components/PhoneVerificationPage/useState'
import { default as useStateDefaultMainNav } from '../../components/Default/DefaultMainNav/useState'

interface CurrentUserDetails {
  accessToken: AuthState['accessToken']
  accessTokenExpirationTime: AuthState['accessTokenExpirationTime']
  uid: AuthStateUser['uid']
  firstName: AuthStateUser['firstName']
  lastName: AuthStateUser['lastName']
  role: AuthStateUser['role']
  email: AuthStateUser['email']
  phoneNumber: AuthStateUser['phoneNumber']
  displayName: AuthStateUser['displayName']
  photoURL: AuthStateUser['photoURL']
  emailVerified: AuthStateUser['emailVerified']
}

function setGuards(to: RouteLocationNormalized, from: RouteLocationNormalized, router: Router) {
  if (to.name === 'email-verification' || to.name === 'phone-verification') {
    const { setSignInButtonShown, setSignUpButtonShown } = useStateDefaultMainNav()
    setSignInButtonShown(false)
    setSignUpButtonShown(false)
  }

  if (from.name === 'email-verification' || from.name === 'phone-verification') {
    const { setSignInButtonShown, setSignUpButtonShown } = useStateDefaultMainNav()
    setSignInButtonShown(true)
    setSignUpButtonShown(true)
  }

  if (to.meta.accessLevel === AccessLevel.DefaultUserNotAuthenticated) {
    const { user, isUserAuthCompleted } = useAuthStore(pinia)

    if (user && isUserAuthCompleted) {
      router.push(from.path)
      return false
    }
    return true
  }

  if (to.meta.accessLevel === AccessLevel.DefaultUserAuthenticatedWithoutEmailVerified) {
    const user = useAuthStore(pinia).user

    if (!user || user?.emailVerified) {
      router.push(from.path)
      return false
    }
    return true
  }

  if (to.meta.accessLevel === AccessLevel.DefaultUserWaitingForPhoneVerification) {
    const { fullName, phoneNumber } = useStatePhoneVerification()

    if (!fullName.value || !phoneNumber.value) {
      router.push(from.path)
      return false
    }

    return true
  }
}

export default function routerGuards(this: Router) {
  this.beforeEach(async (to, from) => {
    const useStoreAuth = useAuthStore(pinia)
    onAuthStateChanged(auth, user => {
      if (user && !useStoreAuth.user) {
        getUserClaims()
          .then(claims => {
            const {
              accessToken,
              accessTokenExpirationTime,
              uid,
              firstName,
              lastName,
              role,
              email,
              phoneNumber,
              displayName,
              photoURL,
              emailVerified,
            } = claims as CurrentUserDetails
            useStoreAuth.accessToken = accessToken
            useStoreAuth.accessTokenExpirationTime = accessTokenExpirationTime
            useStoreAuth.user = {
              uid,
              firstName,
              lastName,
              role,
              email,
              phoneNumber,
              displayName,
              photoURL,
              emailVerified,
            }
            setGuards(to, from, this)
            useStoreAuth.isUserReady = true
          })
          .catch(error => {
            console.error(error)
            throw new Error(error)
          })
      } else {
        setGuards(to, from, this)
        useStoreAuth.isUserReady = true
      }
    })
  })
}

async function getUserClaims() {
  try {
    const currentUserDetails = await auth.currentUser?.getIdTokenResult(true)

    return {
      accessToken: currentUserDetails?.token,
      accessTokenExpirationTime: Number(currentUserDetails?.claims.exp),
      uid: currentUserDetails?.claims.user_id,
      email: currentUserDetails?.claims.email,
      displayName: currentUserDetails?.claims.name,
      photoURL: currentUserDetails?.claims.picture,
      emailVerified: currentUserDetails?.claims.email_verified,
      firstName: currentUserDetails?.claims.firstName,
      lastName: currentUserDetails?.claims.lastName,
      role: currentUserDetails?.claims.role,
    }
  } catch (error) {
    console.error(error)
  }
}
