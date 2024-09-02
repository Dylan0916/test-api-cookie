export default defineEventHandler(async (event) => {
  const { username } = await readBody(event)

  setCookie(event, 'mySession', username, {
    httpOnly: true,
    expires: new Date('2025-12-31'),
    domain: 'localhost',
    path: '/api',
  })

  return { message: 'Login successful' }
})
