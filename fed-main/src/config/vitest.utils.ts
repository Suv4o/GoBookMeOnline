export async function createUserWithNotVerifiedEmail() {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/signup-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@test.com',
      firstName: 'Foo',
      lastName: 'Bar',
    }),
  })
}
