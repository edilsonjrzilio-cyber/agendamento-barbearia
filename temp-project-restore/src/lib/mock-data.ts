// Mock data para desenvolvimento
import { User, Barbearia, Barbeiro, Servico, Agendamento, Cliente, Produto, Plano } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    role: 'admin',
    nome: 'Admin Sistema',
    email: 'admin@agende.me',
    telefone: '(54) 99632-9745',
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    role: 'barbeiro',
    nome: 'João Silva',
    email: 'joao@barbeariamoderna.com',
    telefone: '(11) 98888-8888',
    barbearia_id: '1',
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    role: 'cliente',
    nome: 'Carlos Santos',
    email: 'carlos@email.com',
    telefone: '(11) 97777-7777',
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    role: 'barbeiro',
    nome: 'Maria Oliveira',
    email: 'maria@barbeariamoderna.com',
    telefone: '(11) 96666-6666',
    barbearia_id: '1',
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export const mockBarbearias: Barbearia[] = [
  {
    id: '1',
    nome: 'Barbearia Moderna',
    slug: 'barbearia-moderna',
    logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&h=200&fit=crop&crop=center',
    bio: 'A melhor barbearia da região com profissionais experientes e ambiente moderno.',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    whatsapp: '11988887777',
    cores: {
      primary: '#D4AF37',
      secondary: '#3B82F6',
      accent: '#F5F5F7'
    },
    plano_id: '1',
    plano_expira_em: '2024-12-31T23:59:59Z',
    fotos: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop'
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export const mockBarbeiros: Barbeiro[] = [
  {
    id: '1',
    user_id: '2',
    barbearia_id: '1',
    ativo: true,
    especialidades: ['Corte Masculino', 'Barba', 'Bigode'],
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    nome: 'João Silva',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: '4',
    barbearia_id: '1',
    ativo: true,
    especialidades: ['Corte Feminino', 'Coloração', 'Tratamentos'],
    foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    nome: 'Maria Oliveira',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export const mockServicos: Servico[] = [
  {
    id: '1',
    barbearia_id: '1',
    nome: 'Corte Masculino',
    preco: 35.00,
    duracao_min: 30,
    buffer_min: 10,
    descricao: 'Corte masculino tradicional com acabamento',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    barbearia_id: '1',
    nome: 'Barba Completa',
    preco: 25.00,
    duracao_min: 20,
    buffer_min: 5,
    descricao: 'Aparar e modelar barba com navalha',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    barbearia_id: '1',
    nome: 'Corte + Barba',
    preco: 50.00,
    duracao_min: 45,
    buffer_min: 15,
    descricao: 'Pacote completo: corte + barba',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    barbearia_id: '1',
    nome: 'Sobrancelha',
    preco: 15.00,
    duracao_min: 15,
    buffer_min: 5,
    descricao: 'Design e limpeza de sobrancelha',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export const mockClientes: Cliente[] = [
  {
    id: '1',
    user_id: '3',
    barbearia_id: '1',
    nome: 'Carlos Santos',
    telefone: '(11) 97777-7777',
    email: 'carlos@email.com',
    tags: ['VIP', 'Recorrente'],
    notas: 'Cliente preferencial, sempre pontual',
    ultimo_agendamento: '2024-01-15T10:00:00Z',
    total_agendamentos: 12,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    barbearia_id: '1',
    nome: 'Pedro Oliveira',
    telefone: '(11) 96666-6666',
    email: 'pedro@email.com',
    tags: ['Novo'],
    total_agendamentos: 2,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    barbearia_id: '1',
    nome: 'Ana Silva',
    telefone: '(11) 95555-5555',
    email: 'ana@email.com',
    tags: ['Regular'],
    total_agendamentos: 8,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  }
]

export const mockAgendamentos: Agendamento[] = [
  {
    id: '1',
    barbearia_id: '1',
    barbeiro_id: '1',
    cliente_id: '1',
    servico_id: '1',
    inicio: '2024-01-20T10:00:00Z',
    fim: '2024-01-20T10:30:00Z',
    status: 'confirmed',
    valor: 35.00,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    barbearia_id: '1',
    barbeiro_id: '1',
    cliente_id: '2',
    servico_id: '3',
    inicio: '2024-01-20T14:00:00Z',
    fim: '2024-01-20T14:45:00Z',
    status: 'confirmed',
    valor: 50.00,
    created_at: '2024-01-16T00:00:00Z',
    updated_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    barbearia_id: '1',
    barbeiro_id: '2',
    cliente_id: '3',
    servico_id: '2',
    inicio: '2024-01-21T09:00:00Z',
    fim: '2024-01-21T09:20:00Z',
    status: 'confirmed',
    valor: 25.00,
    created_at: '2024-01-17T00:00:00Z',
    updated_at: '2024-01-17T00:00:00Z'
  }
]

export const mockProdutos: Produto[] = [
  {
    id: '1',
    barbearia_id: '1',
    nome: 'Pomada Modeladora',
    preco: 25.00,
    estoque: 15,
    foto_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
    descricao: 'Pomada para modelar cabelo com fixação forte',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    barbearia_id: '1',
    nome: 'Óleo para Barba',
    preco: 35.00,
    estoque: 8,
    foto_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    descricao: 'Óleo hidratante para barba com fragrância amadeirada',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    barbearia_id: '1',
    nome: 'Shampoo Masculino',
    preco: 18.00,
    estoque: 20,
    foto_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
    descricao: 'Shampoo específico para cabelos masculinos',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    barbearia_id: '1',
    nome: 'Cera para Cabelo',
    preco: 22.00,
    estoque: 12,
    foto_url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=300&fit=crop',
    descricao: 'Cera modeladora com brilho natural',
    ativo: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

export const mockPlanos: Plano[] = [
  {
    id: '1',
    nome: 'Básico',
    preco: 49.90,
    ciclo: 'mensal',
    recursos: [
      'Até 2 barbeiros',
      'Agendamentos ilimitados',
      'Notificações WhatsApp',
      'Relatórios básicos'
    ],
    limite_barbeiros: 2,
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    nome: 'Profissional',
    preco: 89.90,
    ciclo: 'mensal',
    recursos: [
      'Até 5 barbeiros',
      'Agendamentos ilimitados',
      'Notificações WhatsApp',
      'Relatórios avançados',
      'Campanhas de marketing',
      'Loja de produtos'
    ],
    limite_barbeiros: 5,
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    nome: 'Enterprise',
    preco: 149.90,
    ciclo: 'mensal',
    recursos: [
      'Barbeiros ilimitados',
      'Agendamentos ilimitados',
      'Notificações WhatsApp',
      'Relatórios avançados',
      'Campanhas de marketing',
      'Loja de produtos',
      'API personalizada',
      'Suporte prioritário'
    ],
    status: 'ativo',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
]

// Funções helper para simular API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  async getBarbearia(slug: string): Promise<Barbearia | null> {
    await delay(500)
    return mockBarbearias.find(b => b.slug === slug) || null
  },

  async getBarbeiros(barbeariaId: string): Promise<Barbeiro[]> {
    await delay(300)
    return mockBarbeiros.filter(b => b.barbearia_id === barbeariaId && b.ativo)
  },

  async getServicos(barbeariaId: string): Promise<Servico[]> {
    await delay(300)
    return mockServicos.filter(s => s.barbearia_id === barbeariaId && s.ativo)
  },

  async getProdutos(barbeariaId: string): Promise<Produto[]> {
    await delay(300)
    return mockProdutos.filter(p => p.barbearia_id === barbeariaId && p.ativo)
  },

  async getAgendamentos(barbeariaId: string, date?: string): Promise<Agendamento[]> {
    await delay(400)
    let agendamentos = mockAgendamentos.filter(a => a.barbearia_id === barbeariaId)
    
    if (date) {
      agendamentos = agendamentos.filter(a => 
        a.inicio.startsWith(date)
      )
    }
    
    return agendamentos
  },

  async createAgendamento(agendamento: Partial<Agendamento>): Promise<Agendamento> {
    await delay(600)
    const newAgendamento: Agendamento = {
      id: Math.random().toString(36).substr(2, 9),
      barbearia_id: agendamento.barbearia_id!,
      barbeiro_id: agendamento.barbeiro_id!,
      cliente_id: agendamento.cliente_id!,
      servico_id: agendamento.servico_id!,
      inicio: agendamento.inicio!,
      fim: agendamento.fim!,
      status: 'confirmed',
      valor: agendamento.valor,
      notas: agendamento.notas,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    mockAgendamentos.push(newAgendamento)
    return newAgendamento
  },

  async cancelAgendamento(id: string): Promise<void> {
    await delay(400)
    const agendamento = mockAgendamentos.find(a => a.id === id)
    if (agendamento) {
      agendamento.status = 'canceled'
      agendamento.updated_at = new Date().toISOString()
    }
  }
}