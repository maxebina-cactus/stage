export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/partners')) return

  const authUser = useState('authUser')
  if (!authUser.value) {
    return navigateTo('/auth/partners/login')
  }
})
