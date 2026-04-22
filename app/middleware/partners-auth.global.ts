const GESTOR_ROUTES = ['/partners/dashboard/gestor']

export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/partners')) return

  const authUser = useState('authUser')
  if (!authUser.value) {
    return navigateTo('/auth/partners/login')
  }

  const isGestorRoute = GESTOR_ROUTES.some(r => to.path.startsWith(r))
  if (isGestorRoute && authUser.value?.role !== 'gestor') {
    return navigateTo('/partners')
  }
})
