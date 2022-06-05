export function uniqKey() {
  const uid = Date.now() * Math.floor(Math.random() * 100)
  return uid
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function splitFullName(fullName: string) {
  const lastIndex = fullName.lastIndexOf(' ')
  const firstName = fullName.slice(0, lastIndex)
  const lastName = fullName.slice(lastIndex + 1)
  return { firstName, lastName }
}
