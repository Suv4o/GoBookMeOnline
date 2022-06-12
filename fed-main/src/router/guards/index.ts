import { RouteLocationNormalized, Router } from 'vue-router'
import { AuthStateUser } from '../../types/interfaces'
import { AuthState } from '../../store/auth'
import { AccessLevel } from '../../types/enums'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { pinia } from '../../main'
import { useAuthStore } from '../../store/auth'

interface CurrentUserDetails {
  accessToken: AuthState['accessToken']
  accessTokenExpirationTime: AuthState['accessTokenExpirationTime']
  uid: AuthStateUser['uid']
  firstName: AuthStateUser['firstName']
  lastName: AuthStateUser['lastName']
  role: AuthStateUser['role']
  email: AuthStateUser['email']
  displayName: AuthStateUser['displayName']
  photoURL: AuthStateUser['photoURL']
  emailVerified: AuthStateUser['emailVerified']
}

function setGuards(to: RouteLocationNormalized, from: RouteLocationNormalized, router: Router) {
  if (to.meta.accessLevel === AccessLevel.AuthenticatedWithoutEmailVerified) {
    const user = useAuthStore(pinia).user

    if (!user || user?.emailVerified) {
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
      if (user) {
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
              displayName,
              photoURL,
              emailVerified,
            }
            setGuards(to, from, this)
          })
          .catch(error => {
            console.error(error)
            throw new Error(error)
          })
      } else {
        setGuards(to, from, this)
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
