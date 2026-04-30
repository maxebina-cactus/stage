export interface LinkDestino {
  id: string
  nome: string
  marca: 'Bet7K' | 'Cassinopix'
  url: string
}

export const linksDestinoMock: LinkDestino[] = [
  { id: '#563', nome: 'Spaceman',      marca: 'Bet7K',      url: 'https://bet7k.com/go?ref=afiliado&game=spaceman&sid=563'          },
  { id: '#564', nome: 'Aviator',       marca: 'Bet7K',      url: 'https://bet7k.com/go?ref=afiliado&game=aviator&sid=564'           },
  { id: '#565', nome: 'Dragon Tiger',  marca: 'Bet7K',      url: 'https://bet7k.com/go?ref=afiliado&game=dragon-tiger&sid=565'      },
  { id: '#566', nome: 'Mines',         marca: 'Bet7K',      url: 'https://bet7k.com/go?ref=afiliado&game=mines&sid=566'             },
  { id: '#567', nome: 'Fortune Tiger', marca: 'Bet7K',      url: 'https://bet7k.com/go?ref=afiliado&game=fortune-tiger&sid=567'     },
  { id: '#568', nome: 'Crash',         marca: 'Bet7K',      url: 'https://bet7k.com/go?ref=afiliado&game=crash&sid=568'             },
  { id: '#569', nome: 'Spaceman',      marca: 'Cassinopix', url: 'https://cassinopix.com/go?ref=afiliado&game=spaceman&sid=569'     },
  { id: '#570', nome: 'Aviator',       marca: 'Cassinopix', url: 'https://cassinopix.com/go?ref=afiliado&game=aviator&sid=570'      },
  { id: '#571', nome: 'Dragon Tiger',  marca: 'Cassinopix', url: 'https://cassinopix.com/go?ref=afiliado&game=dragon-tiger&sid=571' },
  { id: '#572', nome: 'Mines',         marca: 'Cassinopix', url: 'https://cassinopix.com/go?ref=afiliado&game=mines&sid=572'        },
  { id: '#573', nome: 'Fortune Tiger', marca: 'Cassinopix', url: 'https://cassinopix.com/go?ref=afiliado&game=fortune-tiger&sid=573'},
  { id: '#574', nome: 'Crash',         marca: 'Cassinopix', url: 'https://cassinopix.com/go?ref=afiliado&game=crash&sid=574'        },
]
