export interface StatusItem {
  name: string
  value: number
}

// ── Usuários ───────────────────────────────────────────────────────────────

export const usuariosStatusMock: StatusItem[] = [
  { name: 'Aprovados',  value: 470 },
  { name: 'Pendentes',  value: 700 },
  { name: 'Bloqueados', value: 398 },
  { name: 'Suspensos',  value: 605 },
  { name: 'Inativos',   value: 310 },
  { name: 'Reprovados', value: 620 },
]

// ── Saques ─────────────────────────────────────────────────────────────────

export const saquesStatusMock = {
  items: [
    { name: 'Aprovados',  value: 75 },
    { name: 'Pendentes',  value: 35 },
    { name: 'Reprovados', value: 18 },
  ] satisfies StatusItem[],
  total: 128,
}

// ── Método ─────────────────────────────────────────────────────────────────

export const metodoStatusMock = {
  items: [
    { name: 'Aprovados',  value: 80 },
    { name: 'Pendentes',  value: 145 },
    { name: 'Reprovados', value: 140  },
  ] satisfies StatusItem[],
  total: 365,
}

// ── Saques ─────────────────────────────────────────────────────────────────

export type SaqueStatus = 'Aprovado' | 'Pendente' | 'Cancelado'
export type SaqueMetodo = 'PIX' | 'TED' | 'USDT ERC20' | 'USDT TRC20'

export interface Saque {
  id: number
  data: string
  metodo: SaqueMetodo
  valorBRL: number
  valorUSD: number
  usuarioNome: string
  usuarioEmail: string
  usuario: { nome: string; email: string }
  status: SaqueStatus
  tipoChave: string
  chave: string
  documento: string
  titular: string
}

export const saquesMock: Saque[] = [
  { id: 1,  data: '2026-04-15', metodo: 'PIX',        valorBRL: 1500.00,  valorUSD: 273.45,  usuarioNome: 'João Silva',       usuarioEmail: 'joao.silva@email.com',       usuario: { nome: 'João Silva',       email: 'joao.silva@email.com'       }, status: 'Aprovado',  tipoChave: 'general.international_transfer', chave: '8c0f113f-cdbd-4673-b87f-04a4976116c1',      documento: '55.162.955/0001-37', titular: 'LRR ATA'            },
  { id: 2,  data: '2026-04-14', metodo: 'TED',        valorBRL: 3200.00,  valorUSD: 582.91,  usuarioNome: 'Maria Oliveira',   usuarioEmail: 'maria.oliveira@email.com',   usuario: { nome: 'Maria Oliveira',   email: 'maria.oliveira@email.com'   }, status: 'Pendente',  tipoChave: 'general.bank_transfer',          chave: 'a3d92c1e-5f87-4b2a-9e64-8c1234567890',     documento: '23.456.789/0001-01', titular: 'OLIVEIRA CORP LTDA' },
  { id: 3,  data: '2026-04-13', metodo: 'USDT ERC20', valorBRL: 800.00,   valorUSD: 145.76,  usuarioNome: 'Pedro Santos',     usuarioEmail: 'pedro.santos@email.com',     usuario: { nome: 'Pedro Santos',     email: 'pedro.santos@email.com'     }, status: 'Cancelado', tipoChave: 'crypto.usdt_erc20',              chave: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', documento: '34.567.890/0001-12', titular: 'SANTOS DIGITAL SA'  },
  { id: 4,  data: '2026-04-12', metodo: 'PIX',        valorBRL: 2100.50,  valorUSD: 382.55,  usuarioNome: 'Ana Costa',        usuarioEmail: 'ana.costa@email.com',        usuario: { nome: 'Ana Costa',        email: 'ana.costa@email.com'        }, status: 'Aprovado',  tipoChave: 'pix.email',                      chave: 'b5e83d2f-1a94-4c3b-8765-9d2345678901',     documento: '45.678.901/0001-23', titular: 'COSTA VENTURES ME'  },
  { id: 5,  data: '2026-04-11', metodo: 'USDT TRC20', valorBRL: 950.00,   valorUSD: 173.05,  usuarioNome: 'Carlos Mendes',    usuarioEmail: 'carlos.mendes@email.com',    usuario: { nome: 'Carlos Mendes',    email: 'carlos.mendes@email.com'    }, status: 'Pendente',  tipoChave: 'crypto.usdt_trc20',              chave: 'TLyqzVGLV1srkB7dToTAEqgDFfzGs4Wb1D',       documento: '56.789.012/0001-34', titular: 'MENDES HOLDINGS'    },
  { id: 6,  data: '2026-04-10', metodo: 'TED',        valorBRL: 4500.00,  valorUSD: 819.70,  usuarioNome: 'Fernanda Lima',    usuarioEmail: 'fernanda.lima@email.com',    usuario: { nome: 'Fernanda Lima',    email: 'fernanda.lima@email.com'    }, status: 'Aprovado',  tipoChave: 'general.bank_transfer',          chave: 'c7f94e3a-2b05-5d4c-9876-0e3456789012',     documento: '67.890.123/0001-45', titular: 'LIMA FINANCEIRA SA' },
  { id: 7,  data: '2026-04-09', metodo: 'PIX',        valorBRL: 670.00,   valorUSD: 122.03,  usuarioNome: 'Ricardo Souza',    usuarioEmail: 'ricardo.souza@email.com',    usuario: { nome: 'Ricardo Souza',    email: 'ricardo.souza@email.com'    }, status: 'Cancelado', tipoChave: 'pix.phone',                      chave: 'd8a05f4b-3c16-6e5d-0987-1f4567890123',     documento: '78.901.234/0001-56', titular: 'SOUZA AGÊNCIA LTDA' },
  { id: 8,  data: '2026-04-08', metodo: 'USDT ERC20', valorBRL: 12000.00, valorUSD: 2185.60, usuarioNome: 'Juliana Ferreira', usuarioEmail: 'juliana.ferreira@email.com', usuario: { nome: 'Juliana Ferreira', email: 'juliana.ferreira@email.com' }, status: 'Aprovado',  tipoChave: 'crypto.usdt_erc20',              chave: '0xAbC123dEf456aBc123DEF456AbC123DEF456AbC1', documento: '89.012.345/0001-67', titular: 'FERREIRA TECH ME'   },
  { id: 9,  data: '2026-04-07', metodo: 'PIX',        valorBRL: 340.00,   valorUSD: 61.93,   usuarioNome: 'Marcos Almeida',   usuarioEmail: 'marcos.almeida@email.com',   usuario: { nome: 'Marcos Almeida',   email: 'marcos.almeida@email.com'   }, status: 'Pendente',  tipoChave: 'pix.random_key',                 chave: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',     documento: '90.123.456/0001-78', titular: 'ALMEIDA GROUP SA'   },
  { id: 10, data: '2026-04-06', metodo: 'USDT TRC20', valorBRL: 7800.00,  valorUSD: 1420.56, usuarioNome: 'Camila Rodrigues', usuarioEmail: 'camila.rodrigues@email.com', usuario: { nome: 'Camila Rodrigues', email: 'camila.rodrigues@email.com' }, status: 'Aprovado',  tipoChave: 'crypto.usdt_trc20',              chave: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',       documento: '01.234.567/0001-89', titular: 'RODRIGUES CRYPTO'   },
  { id: 11, data: '2026-04-05', metodo: 'TED',        valorBRL: 1100.00,  valorUSD: 200.42,  usuarioNome: 'Beatriz Lopes',    usuarioEmail: 'beatriz.lopes@email.com',    usuario: { nome: 'Beatriz Lopes',    email: 'beatriz.lopes@email.com'    }, status: 'Cancelado', tipoChave: 'general.international_transfer', chave: 'e9b16a5c-4d27-7f6e-1098-2f5678901234',     documento: '11.223.344/0001-55', titular: 'LOPES BANK LTDA'    },
  { id: 12, data: '2026-04-04', metodo: 'PIX',        valorBRL: 5600.00,  valorUSD: 1020.16, usuarioNome: 'André Martins',    usuarioEmail: 'andre.martins@email.com',    usuario: { nome: 'André Martins',    email: 'andre.martins@email.com'    }, status: 'Pendente',  tipoChave: 'pix.cnpj',                       chave: 'f0c27b6d-5e38-8a7f-2109-3a6789012345',     documento: '12.345.678/0001-90', titular: 'MARTINS LTDA'       },
]

// ── Últimos Afiliados ──────────────────────────────────────────────────────

export type AfiliadoStatus = 'Aprovado' | 'Pendente' | 'Cancelado'

export interface Afiliado {
  id: number
  nome: string
  email: string
  internacional: boolean
  status: AfiliadoStatus // Agora ele aceita qualquer um dos três
}

export const ultimosAfiliadosMock: Afiliado[] = [
  { id: 1,  nome: 'João Silva',       email: 'joao.silva@email.com',       internacional: false, status: 'Aprovado' },
  { id: 2,  nome: 'Maria Oliveira',   email: 'maria.oliveira@email.com',   internacional: true,  status: 'Cancelado' },
  { id: 3,  nome: 'Pedro Santos',     email: 'pedro.santos@email.com',     internacional: false, status: 'Aprovado' },
  { id: 4,  nome: 'Ana Costa',        email: 'ana.costa@email.com',        internacional: true,  status: 'Aprovado' },
  { id: 5,  nome: 'Carlos Mendes',    email: 'carlos.mendes@email.com',    internacional: false, status: 'Pendente' },
  { id: 6,  nome: 'Fernanda Lima',    email: 'fernanda.lima@email.com',    internacional: false, status: 'Aprovado' },
  { id: 7,  nome: 'Ricardo Souza',    email: 'ricardo.souza@email.com',    internacional: true,  status: 'Cancelado' },
  { id: 8,  nome: 'Juliana Ferreira', email: 'juliana.ferreira@email.com', internacional: false, status: 'Cancelado' },
  { id: 9,  nome: 'Marcos Almeida',   email: 'marcos.almeida@email.com',   internacional: true,  status: 'Aprovado' },
  { id: 10, nome: 'Camila Rodrigues', email: 'camila.rodrigues@email.com', internacional: false, status: 'Pendente' },
  { id: 11, nome: 'Beatriz Lopes', email: 'beatriz.lopes@email.com', internacional: true, status: 'Pendente' },
  { id: 12, nome: 'André Martins', email: 'andre.martins@email.com', internacional: false, status: 'Aprovado' },
  { id: 13, nome: 'Patrícia Lima', email: 'patricia.lima@email.com', internacional: false, status: 'Cancelado' },
  { id: 14, nome: 'Gustavo Rocha', email: 'gustavo.rocha@email.com', internacional: true, status: 'Aprovado' },
  { id: 15, nome: 'Letícia Dias', email: 'leticia.dias@email.com', internacional: false, status: 'Pendente' },
  { id: 16, nome: 'Renato Garcia', email: 'renato.garcia@email.com', internacional: false, status: 'Aprovado' },
  { id: 17, nome: 'Sônia Vieira', email: 'sonia.vieira@email.com', internacional: true, status: 'Cancelado' },
  { id: 18, nome: 'Felipe Neves', email: 'felipe.neves@email.com', internacional: false, status: 'Aprovado' },
  { id: 19, nome: 'Larissa Moura', email: 'larissa.moura@email.com', internacional: true, status: 'Pendente' },
  { id: 20, nome: 'Bruno Castro', email: 'bruno.castro@email.com', internacional: false, status: 'Aprovado' },
  { id: 21, nome: 'Tatiane Pires', email: 'tatiane.pires@email.com', internacional: true, status: 'Aprovado' },
  { id: 22, nome: 'Hugo Gomes', email: 'hugo.gomes@email.com', internacional: false, status: 'Cancelado' },
  { id: 23, nome: 'Vanessa Borges', email: 'vanessa.borges@email.com', internacional: false, status: 'Pendente' },
  { id: 24, nome: 'Daniel Farias', email: 'daniel.farias@email.com', internacional: true, status: 'Aprovado' },
  { id: 25, nome: 'Aline Ramos', email: 'aline.ramos@email.com', internacional: false, status: 'Aprovado' },
  { id: 26, nome: 'Sérgio Freitas', email: 'sergio.freitas@email.com', internacional: false, status: 'Pendente' },
  { id: 27, nome: 'Mônica Leal', email: 'monica.leal@email.com', internacional: true, status: 'Cancelado' },
  { id: 28, nome: 'Caio Silveira', email: 'caio.silveira@email.com', internacional: false, status: 'Aprovado' },
  { id: 29, nome: 'Bianca Nuñes', email: 'bianca.nunes@email.com', internacional: true, status: 'Pendente' },
  { id: 30, nome: 'Thiago Cardoso', email: 'thiago.cardoso@email.com', internacional: false, status: 'Aprovado' },
  { id: 31, nome: 'Priscila Duarte', email: 'priscila.duarte@email.com', internacional: true, status: 'Aprovado' },
  { id: 32, nome: 'Igor Viana', email: 'igor.viana@email.com', internacional: false, status: 'Cancelado' },
  { id: 33, nome: 'Kelly Montenegro', email: 'kelly.montenegro@email.com', internacional: false, status: 'Pendente' },
  { id: 34, nome: 'Marcelo Peixoto', email: 'marcelo.peixoto@email.com', internacional: true, status: 'Aprovado' },
  { id: 35, nome: 'Sabrina Fontes', email: 'sabrina.fontes@email.com', internacional: false, status: 'Aprovado' },
  { id: 36, nome: 'Vitor Macedo', email: 'vitor.macedo@email.com', internacional: false, status: 'Pendente' },
  { id: 37, nome: 'Cláudia Ramos', email: 'claudia.ramos@email.com', internacional: true, status: 'Cancelado' },
  { id: 38, nome: 'Eduardo Paiva', email: 'eduardo.paiva@email.com', internacional: false, status: 'Aprovado' },
  { id: 39, nome: 'Jéssica Carvalho', email: 'jessica.carvalho@email.com', internacional: true, status: 'Pendente' },
  { id: 40, nome: 'Leonardo Malta', email: 'leonardo.malta@email.com', internacional: false, status: 'Aprovado' },
  { id: 41, nome: 'Raquel Nazário', email: 'raquel.nazario@email.com', internacional: true, status: 'Aprovado' },
  { id: 42, nome: 'Davi Telles', email: 'davi.telles@email.com', internacional: false, status: 'Cancelado' },
  { id: 43, nome: 'Bruna Loreto', email: 'bruna.loreto@email.com', internacional: false, status: 'Pendente' },
  { id: 44, nome: 'Samuel Trindade', email: 'samuel.trindade@email.com', internacional: true, status: 'Aprovado' },
  { id: 45, nome: 'Lorena Xavier', email: 'lorena.xavier@email.com', internacional: false, status: 'Aprovado' },
  { id: 46, nome: 'Otávio Mesquita', email: 'otavio.mesquita@email.com', internacional: false, status: 'Pendente' },
  { id: 47, nome: 'Gisele Bündchen', email: 'gisele.b@email.com', internacional: true, status: 'Cancelado' },
  { id: 48, nome: 'Arthur Aguiar', email: 'arthur.a@email.com', internacional: false, status: 'Aprovado' },
  { id: 49, nome: 'Milena Falcão', email: 'milena.falcao@email.com', internacional: true, status: 'Pendente' },
  { id: 50, nome: 'Jorge Aragão', email: 'jorge.aragao@email.com', internacional: false, status: 'Aprovado' },
  { id: 51, nome: 'Paola Oliveira', email: 'paola.o@email.com', internacional: true, status: 'Aprovado' },
  { id: 52, nome: 'Murilo Rosa', email: 'murilo.r@email.com', internacional: false, status: 'Cancelado' },
  { id: 53, nome: 'Debora Secco', email: 'debora.s@email.com', internacional: false, status: 'Pendente' },
  { id: 54, nome: 'Cauã Reymond', email: 'caua.r@email.com', internacional: true, status: 'Aprovado' },
  { id: 55, nome: 'Isis Valverde', email: 'isis.v@email.com', internacional: false, status: 'Aprovado' },
  { id: 56, nome: 'Lázaro Ramos', email: 'lazaro.r@email.com', internacional: false, status: 'Pendente' },
  { id: 57, nome: 'Taís Araújo', email: 'tais.a@email.com', internacional: true, status: 'Cancelado' },
  { id: 58, nome: 'Rodrigo Hilbert', email: 'rodrigo.h@email.com', internacional: false, status: 'Aprovado' },
  { id: 59, nome: 'Fernanda Lima', email: 'fernanda.l@email.com', internacional: true, status: 'Pendente' },
  { id: 60, nome: 'Wagner Moura', email: 'wagner.m@email.com', internacional: false, status: 'Aprovado' },
]

// ── Gerentes ───────────────────────────────────────────────────────────────

export type GerenteStatus = 'Aprovado' | 'Pendente' | 'Cancelado'

export interface Gerente {
  id: number
  nome: string
  email: string
  funcao: string
  funcaoDescricao: string
  ultimoLogin: string // ISO 8601
  status: GerenteStatus
}

export const gerentesMock: Gerente[] = [
  { id: 1,  nome: 'João Silva',       email: 'joao.silva@email.com',       funcao: 'Administrador', funcaoDescricao: 'Gestão e configurações gerais',  ultimoLogin: '2026-04-18T09:21:44', status: 'Aprovado'  },
  { id: 2,  nome: 'Maria Oliveira',   email: 'maria.oliveira@email.com',   funcao: 'Supervisor',    funcaoDescricao: 'Supervisão de equipes',           ultimoLogin: '2026-04-18T08:33:10', status: 'Pendente'  },
  { id: 3,  nome: 'Pedro Santos',     email: 'pedro.santos@email.com',     funcao: 'Suporte',       funcaoDescricao: 'Atendimento ao cliente',          ultimoLogin: '2026-04-17T16:05:58', status: 'Cancelado' },
  { id: 4,  nome: 'Ana Costa',        email: 'ana.costa@email.com',        funcao: 'Analista',      funcaoDescricao: 'Análise de dados e relatórios',   ultimoLogin: '2026-04-18T06:47:22', status: 'Aprovado'  },
  { id: 5,  nome: 'Carlos Mendes',    email: 'carlos.mendes@email.com',    funcao: 'Moderador',     funcaoDescricao: 'Moderação de conteúdo',           ultimoLogin: '2026-04-16T11:19:03', status: 'Pendente'  },
  { id: 6,  nome: 'Fernanda Lima',    email: 'fernanda.lima@email.com',    funcao: 'Administrador', funcaoDescricao: 'Gestão e configurações gerais',   ultimoLogin: '2026-04-18T09:28:51', status: 'Aprovado'  },
  { id: 7,  nome: 'Ricardo Souza',    email: 'ricardo.souza@email.com',    funcao: 'Suporte',       funcaoDescricao: 'Atendimento ao cliente',          ultimoLogin: '2026-04-15T14:52:37', status: 'Cancelado' },
  { id: 8,  nome: 'Juliana Ferreira', email: 'juliana.ferreira@email.com', funcao: 'Analista',      funcaoDescricao: 'Análise de dados e relatórios',   ultimoLogin: '2026-04-18T09:03:15', status: 'Aprovado'  },
  { id: 9,  nome: 'Marcos Almeida',   email: 'marcos.almeida@email.com',   funcao: 'Supervisor',    funcaoDescricao: 'Supervisão de equipes',           ultimoLogin: '2026-04-18T05:30:44', status: 'Pendente'  },
  { id: 10, nome: 'Camila Rodrigues', email: 'camila.rodrigues@email.com', funcao: 'Moderador',     funcaoDescricao: 'Moderação de conteúdo',           ultimoLogin: '2026-04-17T22:11:29', status: 'Aprovado'  },
  { id: 11, nome: 'Beatriz Lopes',    email: 'beatriz.lopes@email.com',    funcao: 'Analista',      funcaoDescricao: 'Análise de dados e relatórios',   ultimoLogin: '2026-04-14T08:44:00', status: 'Cancelado' },
  { id: 12, nome: 'André Martins',    email: 'andre.martins@email.com',    funcao: 'Suporte',       funcaoDescricao: 'Atendimento ao cliente',          ultimoLogin: '2026-04-18T07:58:36', status: 'Pendente'  },
]
