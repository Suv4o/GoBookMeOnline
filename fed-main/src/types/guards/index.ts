import { FirebaseError } from '@firebase/util'
import { UserCredential, getRedirectResult } from '@firebase/auth'

// Assertions
export namespace Assertions {
  export function isHTMLElement<T>(element: T): asserts element {
    if (!element) throw new Error('The element is not a HTMLElement')
    if (!(element instanceof HTMLElement)) throw new Error('The element is not a HTMLElement')
  }
  export function isFirebaseError(error: unknown): asserts error is FirebaseError {
    if (!(error instanceof FirebaseError)) throw new Error('The element is not a Firebase Error')
  }
}

// Predicates
export namespace Predicates {
  export function isHTMLElement<T>(element: T | null): element is T {
    return element instanceof HTMLElement
  }
}
