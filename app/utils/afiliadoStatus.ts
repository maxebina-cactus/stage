export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Aprovado':  return 'success'
    case 'Pendente':  return 'warning'
    case 'Cancelado': return 'error'
    default:          return 'neutral'
  }
}
