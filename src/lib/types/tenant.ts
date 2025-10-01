export interface Barbearia {
  id: string
  nome: string
  slug: string
  logo?: string
  cores?: {
    primaria: string
    secundaria: string
    fundo: string
  }
  plano_id: string
  plano_expira_em: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  role: 'admin' | 'barbeiro_owner' | 'barbeiro_staff' | 'cliente'
  nome: string
  email: string
  telefone?: string
  senha_hash: string
  barbearia_id?: string
  status: 'ativo' | 'inativo' | 'suspenso'
  created_at: string
  updated_at: string
}

export interface Barbeiro {
  id: string
  user_id: string
  barbearia_id: string
  permissoes: {
    agenda: boolean
    servicos: boolean
    clientes: boolean
    relatorios: boolean
    configuracoes: boolean
    equipe: boolean
  }
  ativo: boolean
  especialidades?: string[]
  foto?: string
  created_at: string
  updated_at: string
}

export interface Cliente {
  id: string
  user_id?: string
  barbearia_id: string
  nome: string
  email?: string
  telefone: string
  tags?: string[]
  notas?: string
  total_agendamentos: number
  created_at: string
  updated_at: string
}

export interface TenantContext {
  barbearia_id: string
  slug: string
  barbearia: Barbearia
}

export interface SlugValidation {
  valid: boolean
  message?: string
  suggestions?: string[]
}

export const RESERVED_SLUGS = [
  'admin', 'api', 'app', 'login', 'logout', 'auth', 'dashboard',
  'painel', 'www', 'mail', 'ftp', 'blog', 'shop', 'store',
  'support', 'help', 'docs', 'dev', 'test', 'staging'
]

export const SLUG_REGEX = /^[a-z0-9-]{3,32}$/