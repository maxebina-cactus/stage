export interface MediaItem {
  id: number
  nome: string
  arquivo: string
  imagem: string
  dataCriacao: string
  tamanho: string
}

export const mediaMock: MediaItem[] = [
  { id: 1, nome: 'Fortune Tiger',  arquivo: 'Fortune Tiger.jpg',  imagem: '/banner-fortune-tiger.png', dataCriacao: '27/05/2025', tamanho: '198 kb' },
  { id: 2, nome: 'Bet7K Logo',     arquivo: 'Bet7K Logo.png',     imagem: '/logo-7k.png',              dataCriacao: '15/04/2025', tamanho: '84 kb'  },
  { id: 3, nome: 'BRX Logo',       arquivo: 'BRX Logo.png',       imagem: '/logo-brx.png',             dataCriacao: '02/03/2025', tamanho: '76 kb'  },
  { id: 4, nome: 'Bulls Bet',      arquivo: 'Bulls Bet.png',      imagem: '/logo-bulls-bet.png',       dataCriacao: '10/01/2025', tamanho: '112 kb' },
  { id: 5, nome: 'Fortune Tiger 2', arquivo: 'Fortune Tiger 2.jpg', imagem: '/banner-fortune-tiger.png', dataCriacao: '18/05/2025', tamanho: '204 kb' },
  { id: 6, nome: 'Bet7K Banner',   arquivo: 'Bet7K Banner.jpg',   imagem: '/logo-7k.png',              dataCriacao: '22/04/2025', tamanho: '95 kb'  },
]
