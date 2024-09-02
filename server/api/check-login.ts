export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, 'mySession')

  if (cookie) {
    return { loggedIn: true, message: 'User is logged in' }
  }

  setResponseStatus(event, 401, 'User is not logged in')
})
