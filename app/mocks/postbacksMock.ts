export type StatusPostback = 'Aprovado' | 'Pendente' | 'Cancelado'

export interface Postback {
  id: string
  nome: string
  tipoPostback: string
  tipoGatilho: string
  url: string
  criadoEm: string
  criadoAs: string
  status: StatusPostback
}

export const postbacksMock: Postback[] = [
  {
    id: '145896',
    nome: 'Registro - BR',
    tipoPostback: 'Registro',
    tipoGatilho: 'Lead',
    url: 'https://track.example.com/pb?deal_id={{deal_id}}&afp={{afp}}&status={{status}}',
    criadoEm: '23/10/2025',
    criadoAs: '15:45:25',
    status: 'Aprovado',
  },
  {
    id: '589632',
    nome: 'FTD - Global',
    tipoPostback: 'Primeiro Depósito',
    tipoGatilho: 'Sale',
    url: 'https://track.example.com/pb?event=ftd&click_id={{click_id}}&payout={{payout}}',
    criadoEm: '22/10/2025',
    criadoAs: '09:12:47',
    status: 'Aprovado',
  },
  {
    id: '145896',
    nome: 'Depósito - Latam',
    tipoPostback: 'Depósito',
    tipoGatilho: 'Conversão',
    url: 'https://track.example.com/pb?type=deposit&deal_id={{deal_id}}&amount={{amount}}',
    criadoEm: '20/10/2025',
    criadoAs: '21:33:10',
    status: 'Pendente',
  },
  {
    id: '589632',
    nome: 'CPA - Global',
    tipoPostback: 'CPA',
    tipoGatilho: 'Ativação',
    url: 'https://track.example.com/pb?goal=cpa&afp={{afp}}&sub1={{sub1}}&sub2={{sub2}}',
    criadoEm: '18/10/2025',
    criadoAs: '07:58:02',
    status: 'Cancelado',
  },
  {
    id: '145896',
    nome: 'RevShare - BR',
    tipoPostback: 'RevShare',
    tipoGatilho: 'Impressão',
    url: 'https://track.example.com/pb?event=revshare&deal_id={{deal_id}}&rev={{revenue}}',
    criadoEm: '15/10/2025',
    criadoAs: '14:20:36',
    status: 'Pendente',
  },
]
