export function uniqKey() {
  const uid = Date.now() * Math.floor(Math.random() * 100)
  return uid
}
