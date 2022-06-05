export function uniqKey() {
  const uid = Date.now() * Math.floor(Math.random() * 100)
  return uid
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
