const GESTOR_ROUTES   = ['/partners/dashboard/gestor']
const AFILIADO_ROUTES = ['/partners/dashboard/afiliados']
const ADMIN_ROUTES    = ['/partners/admin']

export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/partners')) return

  const authUser = useState('authUser')
  if (!authUser.value) {
    return navigateTo('/auth/partners/login')
  }

  const isGestorRoute = GESTOR_ROUTES.some(r => to.path.startsWith(r))
  if (isGestorRoute && !['gestor', 'admin-master'].includes(authUser.value?.role)) {
    return navigateTo('/partners')
  }

  const isAfiliadoRoute = AFILIADO_ROUTES.some(r => to.path.startsWith(r))
  if (isAfiliadoRoute && !['afiliado', 'admin-master'].includes(authUser.value?.role)) {
    return navigateTo('/partners')
  }

  const isAdminRoute = ADMIN_ROUTES.some(r => to.path.startsWith(r))
  if (isAdminRoute && authUser.value?.role !== 'admin-master') {
    return navigateTo('/partners')
  }
})
