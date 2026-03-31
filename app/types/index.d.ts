import type { AvatarProps } from '@nuxt/ui'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'
export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: {
    name: string
    email?: string
    avatar?: AvatarProps
  }
  body: string
  date: string
}

export type FeedbackStatus = 'pendente' | 'respondido' | 'arquivado'
export type FeedbackCategoria = 'Bug' | 'Sugestão' | 'Elogio' | 'Outro'

export interface Feedback {
  id: number
  usuario: {
    nome: string
    avatar?: string
  }
  mensagem: string
  avaliacao: 1 | 2 | 3 | 4 | 5
  categoria: FeedbackCategoria
  status: FeedbackStatus
  data: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
