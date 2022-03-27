// Assertions
export namespace Assertions {
  export function isHTMLElement<T>(element: T): asserts element {
    if (!element) throw new Error('The element is not a HTMLElement')
    if (!(element instanceof HTMLElement)) throw new Error('The element is not a HTMLElement')
  }
}

// Predicates
export namespace Predicates {
  export function isHTMLElement<T>(element: T | null): element is T {
    return element instanceof HTMLElement
  }
}
