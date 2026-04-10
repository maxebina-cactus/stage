import { z } from 'zod'

export default defineNuxtPlugin(() => {
  z.config({
    customError: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
          if (issue.input == null) {
            return { message: 'Campo obrigatório' }
          }
          return { message: `Tipo inválido: esperado ${issue.expected}` }

        case 'invalid_format':
          if (issue.format === 'email') return { message: 'E-mail inválido' }
          if (issue.format === 'url')   return { message: 'URL inválida' }
          if (issue.format === 'uuid')  return { message: 'UUID inválido' }
          return { message: 'Formato inválido' }

        case 'too_small':
          if (issue.origin === 'string') {
            if (Number(issue.minimum) === 1) return { message: 'Campo obrigatório' }
            return { message: `Mínimo de ${issue.minimum} caracteres` }
          }
          if (issue.origin === 'number' || issue.origin === 'int') return { message: `Valor mínimo: ${issue.minimum}` }
          if (issue.origin === 'array')  return { message: `Mínimo de ${issue.minimum} itens` }
          return undefined

        case 'too_big':
          if (issue.origin === 'string') return { message: `Máximo de ${issue.maximum} caracteres` }
          if (issue.origin === 'number' || issue.origin === 'int') return { message: `Valor máximo: ${issue.maximum}` }
          if (issue.origin === 'array')  return { message: `Máximo de ${issue.maximum} itens` }
          return undefined

        case 'invalid_value':
          return { message: `Valor inválido. Opções: ${(issue as any).values?.join(', ')}` }

        default:
          return undefined
      }
    }
  })
})
