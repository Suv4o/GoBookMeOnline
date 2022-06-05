export function uniqKey() {
  const uid = Date.now() * Math.floor(Math.random() * 100)
  return uid
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function splitFullName(fullName: string) {
  const name = fullName.trim()
  const lastIndex = name.lastIndexOf(' ')
  const firstName = name.slice(0, lastIndex)
  const lastName = name.slice(lastIndex + 1)
  return { firstName, lastName }
}
