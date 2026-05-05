export type StatusSaque = 'Aprovado' | 'Pendente' | 'Cancelado'

export interface SaqueSolicitado {
  id: string
  data: string
  hora: string
  metodoNome: string
  metodoEndereco: string
  valorBRL: number
  valorUSD: number
  status: StatusSaque
}

export const saquesMock: SaqueSolicitado[] = [
  {
    id: '145896',
    data: '03/05/2026',
    hora: '15:45:25',
    metodoNome: 'ERC20',
    metodoEndereco: '0x3a4f9c2d1e8b7a56...b8c2',
    valorBRL: 5000,
    valorUSD: 970.87,
    status: 'Aprovado',
  },
  {
    id: '589632',
    data: '02/05/2026',
    hora: '09:12:47',
    metodoNome: 'TRC20',
    metodoEndereco: 'TJmRx7vK9pQw3nLd...K2wP',
    valorBRL: 3200,
    valorUSD: 621.36,
    status: 'Pendente',
  },
  {
    id: '145896',
    data: '01/05/2026',
    hora: '21:33:10',
    metodoNome: 'PIX',
    metodoEndereco: '+55 11 9****-5821',
    valorBRL: 1500,
    valorUSD: 291.26,
    status: 'Aprovado',
  },
  {
    id: '589632',
    data: '28/04/2026',
    hora: '07:58:02',
    metodoNome: 'BEP20',
    metodoEndereco: '0x9c7d4e3f2a1b5c8d...f1a3',
    valorBRL: 8000,
    valorUSD: 1553.40,
    status: 'Cancelado',
  },
  {
    id: '145896',
    data: '25/04/2026',
    hora: '14:20:36',
    metodoNome: 'ERC20',
    metodoEndereco: '0x2b6e8d4c9f7a3e1b...c5d1',
    valorBRL: 2800,
    valorUSD: 543.69,
    status: 'Pendente',
  },
]
