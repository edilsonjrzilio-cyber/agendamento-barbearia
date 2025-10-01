import { TenantContext, Barbearia } from '@/lib/types/tenant'

// Mock data para desenvolvimento
const mockBarbearias: Barbearia[] = [
  {
    id: '1',
    nome: 'Barbearia Moderna',
    slug: 'barbearia-moderna',
    logo: '/api/placeholder/100/100',
    cores: {
      primaria: '#D4AF37',
      secundaria: '#3B82F6',
      fundo: '#0C0C0D'
    },
    plano_id: '1',
    plano_expira_em: '2024-12-31T23:59:59Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    nome: 'Cortes & Estilo',
    slug: 'cortes-estilo',
    logo: '/api/placeholder/100/100',
    cores: {
      primaria: '#FF6B35',
      secundaria: '#2ECC71',
      fundo: '#1A1A1A'
    },
    plano_id: '2',
    plano_expira_em: '2024-12-31T23:59:59Z',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export async function getBarbeariaBySlug(slug: string): Promise<Barbearia | null> {
  // Em produção, isso seria uma query no banco de dados
  const barbearia = mockBarbearias.find(b => b.slug === slug)
  return barbearia || null
}

export async function createBarbearia(data: {
  nome: string
  slug: string
  logo?: string
  cores?: Barbearia['cores']
  plano_id: string
}): Promise<Barbearia> {
  // Em produção, isso seria uma inserção no banco de dados
  const newBarbearia: Barbearia = {
    id: Math.random().toString(36).substr(2, 9),
    nome: data.nome,
    slug: data.slug,
    logo: data.logo,
    cores: data.cores || {
      primaria: '#D4AF37',
      secundaria: '#3B82F6',
      fundo: '#0C0C0D'
    },
    plano_id: data.plano_id,
    plano_expira_em: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  mockBarbearias.push(newBarbearia)
  return newBarbearia
}

export async function updateBarbearia(id: string, data: Partial<Barbearia>): Promise<Barbearia | null> {
  // Em produção, isso seria uma atualização no banco de dados
  const index = mockBarbearias.findIndex(b => b.id === id)
  if (index === -1) return null

  mockBarbearias[index] = {
    ...mockBarbearias[index],
    ...data,
    updated_at: new Date().toISOString()
  }

  return mockBarbearias[index]
}

export async function checkSlugAvailability(slug: string, excludeId?: string): Promise<boolean> {
  // Em produção, isso seria uma query no banco de dados
  const existing = mockBarbearias.find(b => b.slug === slug && b.id !== excludeId)
  return !existing
}

export async function getAllBarbearias(): Promise<Barbearia[]> {
  // Em produção, isso seria uma query no banco de dados
  return [...mockBarbearias]
}

export function createTenantContext(barbearia: Barbearia): TenantContext {
  return {
    barbearia_id: barbearia.id,
    slug: barbearia.slug,
    barbearia
  }
}