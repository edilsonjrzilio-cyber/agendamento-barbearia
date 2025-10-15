'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Users,
  Settings,
  Plus,
  Edit,
  Eye,
  LogOut,
  Scissors,
  CreditCard,
  MessageSquare,
  ExternalLink,
  Shield,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Receipt,
  Palette,
  Globe,
  Upload,
  Save,
  Menu,
  X,
  Bell,
  ChevronDown,
  Crown,
  Home,
  BarChart3,
  Building,
  Link,
  Copy,
  AlertTriangle
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { mockUsers, mockBarbeiros, mockPlanos, mockClientes } from '@/lib/mock-data'
import { validateSlug, generateSlugSuggestions, formatSlugInput } from '@/lib/utils/slug'
import { getAllBarbearias, createBarbearia, updateBarbearia, checkSlugAvailability } from '@/lib/services/tenant'
import { Barbearia } from '@/lib/types/tenant'

interface Ticket {
  id: string
  autor: string
  barbearia: string
  categoria: string
  titulo: string
  status: 'aberto' | 'em_atendimento' | 'resolvido'
  created_at: string
}

interface Transacao {
  id: string
  barbeiro: string
  barbearia: string
  plano: string
  valor: number
  status: 'pago' | 'pendente' | 'cancelado'
  data: string
  metodo_pagamento: string
}

interface ConfiguracaoSite {
  nome_site: string
  logo_url: string
  cor_primaria: string
  cor_secundaria: string
  cor_fundo: string
  texto_hero: string
  subtexto_hero: string
  email_contato: string
  telefone_contato: string
  endereco: string
  meta_title: string
  meta_description: string
  google_analytics: string
  facebook_pixel: string
}

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [showCreateBarbeiro, setShowCreateBarbeiro] = useState(false)
  const [showCreatePlano, setShowCreatePlano] = useState(false)
  const [showCreateBarbearia, setShowCreateBarbearia] = useState(false)
  const [showEditBarbeiro, setShowEditBarbeiro] = useState(false)
  const [showEditPlano, setShowEditPlano] = useState(false)
  const [showEditBarbearia, setShowEditBarbearia] = useState(false)
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<any>(null)
  const [selectedPlano, setSelectedPlano] = useState<any>(null)
  const [selectedBarbearia, setSelectedBarbearia] = useState<Barbearia | null>(null)
  const [barbeiros, setBarbeiros] = useState(mockBarbeiros)
  const [planos, setPlanos] = useState(mockPlanos)
  const [clientes, setClientes] = useState(mockClientes)
  const [barbearias, setBarbearias] = useState<Barbearia[]>([])
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      autor: 'João Silva',
      barbearia: 'Barbearia Moderna',
      categoria: 'Técnico',
      titulo: 'Problema com notificações WhatsApp',
      status: 'aberto',
      created_at: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      autor: 'Carlos Santos',
      barbearia: 'Barbearia Moderna',
      categoria: 'Geral',
      titulo: 'Dúvida sobre cancelamento',
      status: 'em_atendimento',
      created_at: '2024-01-19T15:30:00Z'
    }
  ])

  const [transacoes, setTransacoes] = useState<Transacao[]>([
    {
      id: '1',
      barbeiro: 'João Silva',
      barbearia: 'Barbearia Moderna',
      plano: 'Plano Premium',
      valor: 97.90,
      status: 'pago',
      data: '2024-01-20T10:00:00Z',
      metodo_pagamento: 'Cartão de Crédito'
    },
    {
      id: '2',
      barbeiro: 'Carlos Santos',
      barbearia: 'Cortes & Estilo',
      plano: 'Plano Básico',
      valor: 47.90,
      status: 'pendente',
      data: '2024-01-19T15:30:00Z',
      metodo_pagamento: 'PIX'
    },
    {
      id: '3',
      barbeiro: 'Pedro Oliveira',
      barbearia: 'Barber Shop Elite',
      plano: 'Plano Premium',
      valor: 97.90,
      status: 'pago',
      data: '2024-01-18T09:15:00Z',
      metodo_pagamento: 'Boleto'
    }
  ])

  const [configuracao, setConfiguracao] = useState<ConfiguracaoSite>({
    nome_site: 'Agende.me',
    logo_url: '/icon.svg',
    cor_primaria: '#D4AF37',
    cor_secundaria: '#3B82F6',
    cor_fundo: '#0C0C0D',
    texto_hero: 'Transforme sua barbearia com agendamentos inteligentes',
    subtexto_hero: 'Sistema completo de agendamentos para barbearias modernas',
    email_contato: 'contato@agende.me',
    telefone_contato: '(11) 99999-9999',
    endereco: 'São Paulo, SP',
    meta_title: 'Agende.me - Sistema de Agendamentos para Barbearias',
    meta_description: 'Plataforma completa de agendamentos online para barbearias. Gerencie clientes, horários e pagamentos em um só lugar.',
    google_analytics: '',
    facebook_pixel: ''
  })

  const [newBarbeiro, setNewBarbeiro] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    barbearia: '',
    especialidades: ''
  })

  const [newPlano, setNewPlano] = useState({
    nome: '',
    preco: '',
    ciclo: 'mensal',
    recursos: '',
    limite_barbeiros: ''
  })

  const [newBarbearia, setNewBarbearia] = useState({
    nome: '',
    slug: '',
    plano_id: '',
    logo: '',
    cor_primaria: '#D4AF37',
    cor_secundaria: '#3B82F6',
    cor_fundo: '#0C0C0D',
    usuario_email: '',
    usuario_senha: ''
  })

  const [slugValidation, setSlugValidation] = useState({ valid: true, message: '' })
  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([])

  const admin = {
    nome: "Admin Sistema",
    email: "admin@agende.me",
    avatar: "/api/placeholder/40/40"
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'barbearias', label: 'Barbearias', icon: Building },
    { id: 'transacoes', label: 'Transações', icon: Receipt },
    { id: 'barbeiros', label: 'Barbeiros', icon: Users },
    { id: 'clientes', label: 'Clientes', icon: User },
    { id: 'planos', label: 'Planos', icon: CreditCard },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare },
    { id: 'configuracao', label: 'Configurações', icon: Palette }
  ]

  const stats = {
    totalBarbearias: barbearias.length,
    totalBarbeiros: barbeiros.length,
    totalClientes: clientes.length,
    ticketsAbertos: tickets.filter(t => t.status === 'aberto').length,
    receitaMensal: transacoes.filter(t => t.status === 'pago').reduce((acc, t) => acc + t.valor, 0)
  }

  useEffect(() => {
    async function loadBarbearias() {
      try {
        const data = await getAllBarbearias()
        setBarbearias(data)
      } catch (error) {
        console.error('Erro ao carregar barbearias:', error)
      }
    }
    
    loadBarbearias()
  }, [])

  const handleSlugChange = async (value: string) => {
    const formattedSlug = formatSlugInput(value)
    setNewBarbearia({ ...newBarbearia, slug: formattedSlug })
    
    if (formattedSlug) {
      const validation = validateSlug(formattedSlug)
      if (validation.valid) {
        const available = await checkSlugAvailability(formattedSlug)
        if (!available) {
          setSlugValidation({ valid: false, message: 'Este slug já está em uso' })
          setSlugSuggestions(generateSlugSuggestions(newBarbearia.nome))
        } else {
          setSlugValidation({ valid: true, message: 'Slug disponível!' })
          setSlugSuggestions([])
        }
      } else {
        setSlugValidation(validation)
        if (validation.suggestions) {
          setSlugSuggestions(validation.suggestions)
        }
      }
    }
  }

  const handleCreateBarbearia = async () => {
    try {
      const barbearia = await createBarbearia({
        nome: newBarbearia.nome,
        slug: newBarbearia.slug,
        plano_id: newBarbearia.plano_id,
        logo: newBarbearia.logo,
        cores: {
          primaria: newBarbearia.cor_primaria,
          secundaria: newBarbearia.cor_secundaria,
          fundo: newBarbearia.cor_fundo
        }
      })
      
      setBarbearias([...barbearias, barbearia])
      setNewBarbearia({
        nome: '',
        slug: '',
        plano_id: '',
        logo: '',
        cor_primaria: '#D4AF37',
        cor_secundaria: '#3B82F6',
        cor_fundo: '#0C0C0D',
        usuario_email: '',
        usuario_senha: ''
      })
      setShowCreateBarbearia(false)
    } catch (error) {
      console.error('Erro ao criar barbearia:', error)
    }
  }

  const handleEditBarbearia = async () => {
    if (!selectedBarbearia) return
    
    try {
      const updated = await updateBarbearia(selectedBarbearia.id, selectedBarbearia)
      if (updated) {
        setBarbearias(barbearias.map(b => 
          b.id === selectedBarbearia.id ? updated : b
        ))
        setShowEditBarbearia(false)
        setSelectedBarbearia(null)
      }
    } catch (error) {
      console.error('Erro ao atualizar barbearia:', error)
    }
  }

  const handleCreateBarbeiro = () => {
    const barbeiro = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: Math.random().toString(36).substr(2, 9),
      barbearia_id: '1',
      nome: newBarbeiro.nome,
      email: newBarbeiro.email,
      telefone: newBarbeiro.telefone,
      ativo: true,
      especialidades: newBarbeiro.especialidades.split(',').map(e => e.trim()),
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    setBarbeiros([...barbeiros, barbeiro])
    setNewBarbeiro({ nome: '', email: '', telefone: '', senha: '', barbearia: '', especialidades: '' })
    setShowCreateBarbeiro(false)
  }

  const handleEditBarbeiro = () => {
    setBarbeiros(barbeiros.map(b => 
      b.id === selectedBarbeiro.id 
        ? { ...b, ...selectedBarbeiro }
        : b
    ))
    setShowEditBarbeiro(false)
    setSelectedBarbeiro(null)
  }

  const handleCreatePlano = () => {
    const plano = {
      id: Math.random().toString(36).substr(2, 9),
      nome: newPlano.nome,
      preco: parseFloat(newPlano.preco),
      ciclo: newPlano.ciclo as 'mensal' | 'anual',
      recursos: newPlano.recursos.split('\n').filter(r => r.trim()),
      limite_barbeiros: parseInt(newPlano.limite_barbeiros) || undefined,
      status: 'ativo' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    setPlanos([...planos, plano])
    setNewPlano({ nome: '', preco: '', ciclo: 'mensal', recursos: '', limite_barbeiros: '' })
    setShowCreatePlano(false)
  }

  const handleEditPlano = () => {
    setPlanos(planos.map(p => 
      p.id === selectedPlano.id 
        ? { ...p, ...selectedPlano }
        : p
    ))
    setShowEditPlano(false)
    setSelectedPlano(null)
  }

  const handleTicketStatusChange = (ticketId: string, newStatus: 'aberto' | 'em_atendimento' | 'resolvido') => {
    setTickets(tickets.map(t => 
      t.id === ticketId 
        ? { ...t, status: newStatus }
        : t
    ))
  }

  const handleSaveConfiguracao = () => {
    alert('Configurações salvas com sucesso!')
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Barbearias</p>
              <p className="text-2xl font-bold text-white">{stats.totalBarbearias}</p>
              <p className="text-xs text-gray-500">ativas</p>
            </div>
            <div className="bg-purple-600/20 p-3 rounded-xl">
              <Building className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Barbeiros</p>
              <p className="text-2xl font-bold text-white">{stats.totalBarbeiros}</p>
              <p className="text-xs text-gray-500">cadastrados</p>
            </div>
            <div className="bg-blue-600/20 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Clientes</p>
              <p className="text-2xl font-bold text-white">{stats.totalClientes}</p>
              <p className="text-xs text-gray-500">total</p>
            </div>
            <div className="bg-green-600/20 p-3 rounded-xl">
              <User className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tickets</p>
              <p className="text-2xl font-bold text-white">{stats.ticketsAbertos}</p>
              <p className="text-xs text-gray-500">abertos</p>
            </div>
            <div className="bg-red-600/20 p-3 rounded-xl">
              <MessageSquare className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(stats.receitaMensal)}</p>
              <p className="text-xs text-gray-500">mensal</p>
            </div>
            <div className="bg-yellow-600/20 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Tickets Recentes</h2>
          <button 
            onClick={() => setCurrentTab('tickets')}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Ver todos
          </button>
        </div>
        
        <div className="space-y-4">
          {tickets.slice(0, 5).map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{ticket.titulo}</p>
                  <p className="text-sm text-gray-400">
                    {ticket.autor} • {ticket.barbearia}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={
                  ticket.status === 'aberto' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : ticket.status === 'em_atendimento'
                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                }>
                  {ticket.status === 'aberto' ? 'Aberto' : 
                   ticket.status === 'em_atendimento' ? 'Em Atendimento' : 'Resolvido'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBarbearias = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Barbearias</h2>
        <Dialog open={showCreateBarbearia} onOpenChange={setShowCreateBarbearia}>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nova Barbearia</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#141416] border border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Criar Nova Barbearia</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome da Barbearia</label>
                  <input
                    value={newBarbearia.nome}
                    onChange={(e) => {
                      setNewBarbearia({...newBarbearia, nome: e.target.value})
                      if (!newBarbearia.slug) {
                        const suggestions = generateSlugSuggestions(e.target.value)
                        if (suggestions.length > 0) {
                          setNewBarbearia(prev => ({...prev, slug: suggestions[0]}))
                        }
                      }
                    }}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Plano</label>
                  <select
                    value={newBarbearia.plano_id}
                    onChange={(e) => setNewBarbearia({...newBarbearia, plano_id: e.target.value})}
                    className="w-full p-2 bg-[#0C0C0D] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Selecione um plano</option>
                    {planos.map((plano) => (
                      <option key={plano.id} value={plano.id}>
                        {plano.nome} - {formatCurrency(plano.preco)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Slug (URL da barbearia)
                  <span className="text-xs text-gray-500 ml-2">
                    agende.me/<strong>{newBarbearia.slug || 'seu-slug'}</strong>
                  </span>
                </label>
                <input
                  value={newBarbearia.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className={`w-full bg-[#0C0C0D] border rounded-xl px-4 py-2 text-white focus:outline-none ${
                    slugValidation.valid ? 'border-gray-800 focus:border-blue-600' : 'border-red-600 focus:border-red-600'
                  }`}
                  placeholder="minha-barbearia"
                />
                {slugValidation.message && (
                  <p className={`text-xs mt-1 ${slugValidation.valid ? 'text-green-400' : 'text-red-400'}`}>
                    {slugValidation.message}
                  </p>
                )}
                {slugSuggestions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-2">Sugestões:</p>
                    <div className="flex flex-wrap gap-2">
                      {slugSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setNewBarbearia({...newBarbearia, slug: suggestion})}
                          className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-600/30"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dados do Usuário Dono */}
              <div className="border-t border-gray-800 pt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Dados do Usuário (Dono da Barbearia)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email do Usuário</label>
                    <input
                      type="email"
                      value={newBarbearia.usuario_email}
                      onChange={(e) => setNewBarbearia({...newBarbearia, usuario_email: e.target.value})}
                      className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                      placeholder="dono@barbearia.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Senha do Usuário</label>
                    <input
                      type="password"
                      value={newBarbearia.usuario_senha}
                      onChange={(e) => setNewBarbearia({...newBarbearia, usuario_senha: e.target.value})}
                      className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                      placeholder="Senha para acesso"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Logo URL (opcional)</label>
                <input
                  value={newBarbearia.logo}
                  onChange={(e) => setNewBarbearia({...newBarbearia, logo: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Cores da Barbearia</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Primária</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={newBarbearia.cor_primaria}
                        onChange={(e) => setNewBarbearia({...newBarbearia, cor_primaria: e.target.value})}
                        className="w-12 h-8 p-1 bg-[#0C0C0D] border border-gray-800 rounded cursor-pointer"
                      />
                      <input
                        value={newBarbearia.cor_primaria}
                        onChange={(e) => setNewBarbearia({...newBarbearia, cor_primaria: e.target.value})}
                        className="flex-1 bg-[#0C0C0D] border border-gray-800 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Secundária</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={newBarbearia.cor_secundaria}
                        onChange={(e) => setNewBarbearia({...newBarbearia, cor_secundaria: e.target.value})}
                        className="w-12 h-8 p-1 bg-[#0C0C0D] border border-gray-800 rounded cursor-pointer"
                      />
                      <input
                        value={newBarbearia.cor_secundaria}
                        onChange={(e) => setNewBarbearia({...newBarbearia, cor_secundaria: e.target.value})}
                        className="flex-1 bg-[#0C0C0D] border border-gray-800 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Fundo</label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={newBarbearia.cor_fundo}
                        onChange={(e) => setNewBarbearia({...newBarbearia, cor_fundo: e.target.value})}
                        className="w-12 h-8 p-1 bg-[#0C0C0D] border border-gray-800 rounded cursor-pointer"
                      />
                      <input
                        value={newBarbearia.cor_fundo}
                        onChange={(e) => setNewBarbearia({...newBarbearia, cor_fundo: e.target.value})}
                        className="flex-1 bg-[#0C0C0D] border border-gray-800 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={handleCreateBarbearia} 
                  disabled={!slugValidation.valid || !newBarbearia.nome || !newBarbearia.plano_id || !newBarbearia.usuario_email || !newBarbearia.usuario_senha}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-xl transition-colors"
                >
                  Criar Barbearia
                </button>
                <button 
                  onClick={() => setShowCreateBarbearia(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {barbearias.map((barbearia) => (
          <div key={barbearia.id} className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  {barbearia.logo ? (
                    <img src={barbearia.logo} alt={barbearia.nome} className="w-10 h-10 rounded-full" />
                  ) : (
                    <Building className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{barbearia.nome}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Link className="w-3 h-3 mr-1" />
                      /{barbearia.slug}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Expira: {new Date(barbearia.plano_expira_em).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: barbearia.cores?.primaria }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: barbearia.cores?.secundaria }}
                    ></div>
                    <span className="text-xs text-gray-500">Cores personalizadas</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/${barbearia.slug}`
                    navigator.clipboard.writeText(link)
                    alert('Link copiado!')
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-xl transition-colors"
                  title="Copiar link público"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`/${barbearia.slug}`, '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl transition-colors"
                  title="Ver página pública"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`/${barbearia.slug}/painel`, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors"
                  title="Acessar painel"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedBarbearia(barbearia)
                    setShowEditBarbearia(true)
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-xl transition-colors"
                  title="Editar barbearia"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Barbearia Dialog */}
      <Dialog open={showEditBarbearia} onOpenChange={setShowEditBarbearia}>
        <DialogContent className="bg-[#141416] border border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Barbearia</DialogTitle>
          </DialogHeader>
          {selectedBarbearia && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome da Barbearia</label>
                  <input
                    value={selectedBarbearia.nome}
                    onChange={(e) => setSelectedBarbearia({...selectedBarbearia, nome: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Slug
                    <span className="text-xs text-red-400 ml-2">⚠️ Apenas Admin pode alterar</span>
                  </label>
                  <input
                    value={selectedBarbearia.slug}
                    onChange={(e) => setSelectedBarbearia({...selectedBarbearia, slug: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Logo URL</label>
                <input
                  value={selectedBarbearia.logo || ''}
                  onChange={(e) => setSelectedBarbearia({...selectedBarbearia, logo: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Cores</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Primária</label>
                    <input
                      type="color"
                      value={selectedBarbearia.cores?.primaria || '#D4AF37'}
                      onChange={(e) => setSelectedBarbearia({
                        ...selectedBarbearia, 
                        cores: { ...selectedBarbearia.cores, primaria: e.target.value }
                      })}
                      className="w-full h-8 p-1 bg-[#0C0C0D] border border-gray-800 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Secundária</label>
                    <input
                      type="color"
                      value={selectedBarbearia.cores?.secundaria || '#3B82F6'}
                      onChange={(e) => setSelectedBarbearia({
                        ...selectedBarbearia, 
                        cores: { ...selectedBarbearia.cores, secundaria: e.target.value }
                      })}
                      className="w-full h-8 p-1 bg-[#0C0C0D] border border-gray-800 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Fundo</label>
                    <input
                      type="color"
                      value={selectedBarbearia.cores?.fundo || '#0C0C0D'}
                      onChange={(e) => setSelectedBarbearia({
                        ...selectedBarbearia, 
                        cores: { ...selectedBarbearia.cores, fundo: e.target.value }
                      })}
                      className="w-full h-8 p-1 bg-[#0C0C0D] border border-gray-800 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={handleEditBarbearia} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={() => setShowEditBarbearia(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderTransacoes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Transações</h2>
        <div className="flex space-x-2">
          <select className="p-2 bg-[#141416] border border-gray-800 rounded-xl text-white text-sm">
            <option value="todos">Todos os Status</option>
            <option value="pago">Pago</option>
            <option value="pendente">Pendente</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <select className="p-2 bg-[#141416] border border-gray-800 rounded-xl text-white text-sm">
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Último ano</option>
          </select>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Recebido</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(transacoes.filter(t => t.status === 'pago').reduce((acc, t) => acc + t.valor, 0))}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendente</p>
              <p className="text-2xl font-bold text-yellow-400">
                {formatCurrency(transacoes.filter(t => t.status === 'pendente').reduce((acc, t) => acc + t.valor, 0))}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cancelado</p>
              <p className="text-2xl font-bold text-red-400">
                {formatCurrency(transacoes.filter(t => t.status === 'cancelado').reduce((acc, t) => acc + t.valor, 0))}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="space-y-4">
        {transacoes.map((transacao) => (
          <div key={transacao.id} className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <Receipt className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{transacao.barbeiro}</h3>
                  <p className="text-sm text-gray-400">
                    {transacao.barbearia} • {transacao.plano}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transacao.data).toLocaleDateString('pt-BR')} • {transacao.metodo_pagamento}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">{formatCurrency(transacao.valor)}</p>
                <Badge className={
                  transacao.status === 'pago' 
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : transacao.status === 'pendente'
                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }>
                  {transacao.status === 'pago' ? 'Pago' : 
                   transacao.status === 'pendente' ? 'Pendente' : 'Cancelado'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderConfiguracoes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Configurações do Site</h2>
        <button 
          onClick={handleSaveConfiguracao}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Configurações</span>
        </button>
      </div>

      <div className="grid gap-6">
        {/* Configurações Gerais */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Configurações Gerais</span>
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome do Site</label>
                <input
                  value={configuracao.nome_site}
                  onChange={(e) => setConfiguracao({...configuracao, nome_site: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">URL do Logo</label>
                <input
                  value={configuracao.logo_url}
                  onChange={(e) => setConfiguracao({...configuracao, logo_url: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Texto Principal (Hero)</label>
              <input
                value={configuracao.texto_hero}
                onChange={(e) => setConfiguracao({...configuracao, texto_hero: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Subtexto (Hero)</label>
              <input
                value={configuracao.subtexto_hero}
                onChange={(e) => setConfiguracao({...configuracao, subtexto_hero: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Configurações de Cores */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Cores do Site</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Cor Primária</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={configuracao.cor_primaria}
                  onChange={(e) => setConfiguracao({...configuracao, cor_primaria: e.target.value})}
                  className="w-16 h-10 p-1 bg-[#0C0C0D] border border-gray-800 rounded-xl cursor-pointer"
                />
                <input
                  value={configuracao.cor_primaria}
                  onChange={(e) => setConfiguracao({...configuracao, cor_primaria: e.target.value})}
                  className="flex-1 bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Cor Secundária</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={configuracao.cor_secundaria}
                  onChange={(e) => setConfiguracao({...configuracao, cor_secundaria: e.target.value})}
                  className="w-16 h-10 p-1 bg-[#0C0C0D] border border-gray-800 rounded-xl cursor-pointer"
                />
                <input
                  value={configuracao.cor_secundaria}
                  onChange={(e) => setConfiguracao({...configuracao, cor_secundaria: e.target.value})}
                  className="flex-1 bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Cor de Fundo</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={configuracao.cor_fundo}
                  onChange={(e) => setConfiguracao({...configuracao, cor_fundo: e.target.value})}
                  className="w-16 h-10 p-1 bg-[#0C0C0D] border border-gray-800 rounded-xl cursor-pointer"
                />
                <input
                  value={configuracao.cor_fundo}
                  onChange={(e) => setConfiguracao({...configuracao, cor_fundo: e.target.value})}
                  className="flex-1 bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Informações de Contato</span>
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email de Contato</label>
                <input
                  type="email"
                  value={configuracao.email_contato}
                  onChange={(e) => setConfiguracao({...configuracao, email_contato: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Telefone de Contato</label>
                <input
                  value={configuracao.telefone_contato}
                  onChange={(e) => setConfiguracao({...configuracao, telefone_contato: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Endereço</label>
              <input
                value={configuracao.endereco}
                onChange={(e) => setConfiguracao({...configuracao, endereco: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>SEO e Meta Tags</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Meta Title</label>
              <input
                value={configuracao.meta_title}
                onChange={(e) => setConfiguracao({...configuracao, meta_title: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Meta Description</label>
              <textarea
                value={configuracao.meta_description}
                onChange={(e) => setConfiguracao({...configuracao, meta_description: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Analytics e Tracking</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Google Analytics ID</label>
              <input
                value={configuracao.google_analytics}
                onChange={(e) => setConfiguracao({...configuracao, google_analytics: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Facebook Pixel ID</label>
              <input
                value={configuracao.facebook_pixel}
                onChange={(e) => setConfiguracao({...configuracao, facebook_pixel: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                placeholder="123456789012345"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBarbeiros = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Barbeiros</h2>
        <Dialog open={showCreateBarbeiro} onOpenChange={setShowCreateBarbeiro}>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Novo Barbeiro</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#141416] border border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Criar Novo Barbeiro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome</label>
                  <input
                    value={newBarbeiro.nome}
                    onChange={(e) => setNewBarbeiro({...newBarbeiro, nome: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={newBarbeiro.email}
                    onChange={(e) => setNewBarbeiro({...newBarbeiro, email: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                  <input
                    value={newBarbeiro.telefone}
                    onChange={(e) => setNewBarbeiro({...newBarbeiro, telefone: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Senha</label>
                  <input
                    type="password"
                    value={newBarbeiro.senha}
                    onChange={(e) => setNewBarbeiro({...newBarbeiro, senha: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Barbearia</label>
                <select
                  value={newBarbeiro.barbearia}
                  onChange={(e) => setNewBarbeiro({...newBarbeiro, barbearia: e.target.value})}
                  className="w-full p-2 bg-[#0C0C0D] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="">Selecione uma barbearia</option>
                  {barbearias.map((barbearia) => (
                    <option key={barbearia.id} value={barbearia.id}>
                      {barbearia.nome} (/{barbearia.slug})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Especialidades (separadas por vírgula)</label>
                <input
                  value={newBarbeiro.especialidades}
                  onChange={(e) => setNewBarbeiro({...newBarbeiro, especialidades: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  placeholder="Corte Masculino, Barba, Bigode"
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCreateBarbeiro} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  Criar Barbeiro
                </button>
                <button 
                  onClick={() => setShowCreateBarbeiro(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {barbeiros.map((barbeiro) => (
          <div key={barbeiro.id} className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{barbeiro.nome || 'Nome não definido'}</h3>
                  <p className="text-sm text-gray-400">
                    {barbeiro.especialidades?.join(', ') || 'Sem especialidades'}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      Link: /barbearia-moderna
                    </span>
                    <Badge className={barbeiro.ativo ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
                      {barbeiro.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open('/barbearia-moderna', '_blank')}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedBarbeiro(barbeiro)
                    setShowEditBarbeiro(true)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.location.href = '/painel'}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Barbeiro Dialog */}
      <Dialog open={showEditBarbeiro} onOpenChange={setShowEditBarbeiro}>
        <DialogContent className="bg-[#141416] border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Barbeiro</DialogTitle>
          </DialogHeader>
          {selectedBarbeiro && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome</label>
                  <input
                    value={selectedBarbeiro.nome || ''}
                    onChange={(e) => setSelectedBarbeiro({...selectedBarbeiro, nome: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={selectedBarbeiro.email || ''}
                    onChange={(e) => setSelectedBarbeiro({...selectedBarbeiro, email: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                  <input
                    value={selectedBarbeiro.telefone || ''}
                    onChange={(e) => setSelectedBarbeiro({...selectedBarbeiro, telefone: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nova Senha (deixe em branco para manter)</label>
                  <input
                    type="password"
                    placeholder="Nova senha"
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Barbearia</label>
                <select
                  value={selectedBarbeiro.barbearia_id || ''}
                  onChange={(e) => setSelectedBarbeiro({...selectedBarbeiro, barbearia_id: e.target.value})}
                  className="w-full p-2 bg-[#0C0C0D] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="">Selecione uma barbearia</option>
                  {barbearias.map((barbearia) => (
                    <option key={barbearia.id} value={barbearia.id}>
                      {barbearia.nome} (/{barbearia.slug})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Especialidades</label>
                <input
                  value={selectedBarbeiro.especialidades?.join(', ') || ''}
                  onChange={(e) => setSelectedBarbeiro({
                    ...selectedBarbeiro, 
                    especialidades: e.target.value.split(',').map(s => s.trim())
                  })}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleEditBarbeiro} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={() => setShowEditBarbeiro(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderClientes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Clientes</h2>
      <div className="space-y-4">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{cliente.nome}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {cliente.telefone}
                    </span>
                    <span className="flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {cliente.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {cliente.tags?.map((tag) => (
                      <Badge key={tag} className="bg-blue-600/20 text-blue-400 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    <span className="text-xs text-gray-500">
                      {cliente.total_agendamentos} agendamentos
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-xl transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPlanos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Planos</h2>
        <Dialog open={showCreatePlano} onOpenChange={setShowCreatePlano}>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Novo Plano</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#141416] border border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Criar Novo Plano</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome do Plano</label>
                  <input
                    value={newPlano.nome}
                    onChange={(e) => setNewPlano({...newPlano, nome: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPlano.preco}
                    onChange={(e) => setNewPlano({...newPlano, preco: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Ciclo</label>
                  <select
                    value={newPlano.ciclo}
                    onChange={(e) => setNewPlano({...newPlano, ciclo: e.target.value})}
                    className="w-full p-2 bg-[#0C0C0D] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="mensal">Mensal</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Limite de Barbeiros</label>
                  <input
                    type="number"
                    value={newPlano.limite_barbeiros}
                    onChange={(e) => setNewPlano({...newPlano, limite_barbeiros: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                    placeholder="Deixe vazio para ilimitado"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Recursos (um por linha)</label>
                <textarea
                  value={newPlano.recursos}
                  onChange={(e) => setNewPlano({...newPlano, recursos: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600 resize-none"
                  placeholder="Agendamentos ilimitados&#10;Notificações WhatsApp&#10;Relatórios básicos"
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCreatePlano} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  Criar Plano
                </button>
                <button 
                  onClick={() => setShowCreatePlano(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white">{plano.nome}</h3>
                <p className="text-2xl font-bold text-blue-400 mb-2">
                  {formatCurrency(plano.preco)}<span className="text-sm text-gray-400">/{plano.ciclo}</span>
                </p>
                <div className="space-y-1">
                  {plano.recursos.map((recurso, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      {recurso}
                    </div>
                  ))}
                </div>
                {plano.limite_barbeiros && (
                  <p className="text-xs text-gray-500 mt-2">
                    Limite: {plano.limite_barbeiros} barbeiros
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Badge className={plano.status === 'ativo' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
                  {plano.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </Badge>
                <button
                  onClick={() => {
                    setSelectedPlano(plano)
                    setShowEditPlano(true)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plano Dialog */}
      <Dialog open={showEditPlano} onOpenChange={setShowEditPlano}>
        <DialogContent className="bg-[#141416] border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Plano</DialogTitle>
          </DialogHeader>
          {selectedPlano && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome do Plano</label>
                  <input
                    value={selectedPlano.nome}
                    onChange={(e) => setSelectedPlano({...selectedPlano, nome: e.target.value})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedPlano.preco}
                    onChange={(e) => setSelectedPlano({...selectedPlano, preco: parseFloat(e.target.value)})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Recursos</label>
                <textarea
                  value={selectedPlano.recursos.join('\n')}
                  onChange={(e) => setSelectedPlano({
                    ...selectedPlano, 
                    recursos: e.target.value.split('\n').filter(r => r.trim())
                  })}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600 resize-none"
                  rows={4}
                />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleEditPlano} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={() => setShowEditPlano(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderTickets = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tickets de Suporte</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{ticket.titulo}</h3>
                  <p className="text-sm text-gray-400">
                    {ticket.autor} • {ticket.barbearia} • {ticket.categoria}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={ticket.status}
                  onChange={(e) => handleTicketStatusChange(ticket.id, e.target.value as any)}
                  className="p-2 bg-[#0C0C0D] border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-600"
                >
                  <option value="aberto">Aberto</option>
                  <option value="em_atendimento">Em Atendimento</option>
                  <option value="resolvido">Resolvido</option>
                </select>
                <Badge className={
                  ticket.status === 'aberto' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : ticket.status === 'em_atendimento'
                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                }>
                  {ticket.status === 'aberto' ? 'Aberto' : 
                   ticket.status === 'em_atendimento' ? 'Em Atendimento' : 'Resolvido'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return renderDashboard()
      case 'barbearias':
        return renderBarbearias()
      case 'transacoes':
        return renderTransacoes()
      case 'configuracao':
        return renderConfiguracoes()
      case 'barbeiros':
        return renderBarbeiros()
      case 'clientes':
        return renderClientes()
      case 'planos':
        return renderPlanos()
      case 'tickets':
        return renderTickets()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#141416] border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h1 className="font-semibold text-white">Painel Admin</h1>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Sistema</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-white hover:text-gray-300"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative"
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Layout Fixo */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141416] border-r border-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h1 className="text-xl font-bold text-white">Painel Admin</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Sistema Agende.me</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu de Navegação - Abas Fixas */}
          <nav className="mt-6 px-4 h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="absolute bottom-6 left-4 right-4 space-y-2">
            <button
              onClick={() => window.open('/barbearia-moderna', '_blank')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>Minha Página</span>
            </button>
            <button
              onClick={() => window.location.href = '/painel'}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Scissors className="w-5 h-5" />
              <span>Painel Barbeiro</span>
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between p-6 bg-[#141416] border-b border-gray-800">
            <div>
              <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-gray-400">Bem-vindo, {admin.nome}</p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/barbearia-moderna', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visão do Cliente</span>
              </button>

              <button
                onClick={() => window.open('/barbearia-moderna', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Minha Página</span>
              </button>

              <button
                onClick={() => window.location.href = '/painel'}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <Scissors className="w-4 h-4" />
                <span>Painel Barbeiro</span>
              </button>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-white hover:text-gray-300"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-white">{admin.nome}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#141416] border border-gray-800 rounded-xl shadow-lg z-[99999]">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Perfil</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Configurações</span>
                    </button>
                    <hr className="border-gray-800" />
                    <button
                      onClick={() => window.location.href = '/'}
                      className="w-full text-left px-4 py-3 hover:bg-red-900/20 text-red-400 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Notifications Dropdown - Z-index Alto */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 bg-[#141416] border border-gray-800 rounded-xl shadow-lg z-[99999] lg:top-20">
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-semibold text-white">Notificações</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-3 bg-[#0C0C0D] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <p className="text-sm text-white">Novo ticket de suporte</p>
              <p className="text-xs text-gray-400">há 5 minutos</p>
            </div>
            <div className="p-3 bg-[#0C0C0D] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <p className="text-sm text-white">Pagamento processado</p>
              <p className="text-xs text-gray-400">há 1 hora</p>
            </div>
            <div className="p-3 bg-[#0C0C0D] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <p className="text-sm text-white">Novo barbeiro cadastrado</p>
              <p className="text-xs text-gray-400">há 2 horas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}