'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Plus, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Eye,
  Menu,
  X,
  Home,
  CalendarDays,
  Scissors,
  UserCheck,
  MessageSquare,
  BarChart3,
  Palette,
  Store,
  Crown,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Star,
  Package,
  ShoppingCart,
  Zap,
  Link,
  Unlink,
  Send,
  FileText,
  PieChart,
  BarChart,
  Activity,
  Wifi,
  WifiOff,
  Save,
  Upload,
  Image as ImageIcon,
  Palette as PaletteIcon,
  Type,
  Layout,
  Globe,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Lock,
  Shield,
  CreditCard,
  History,
  QrCode,
  Smartphone,
  RefreshCw,
  Copy,
  CheckCheck,
  Clock3,
  AlertTriangle
} from 'lucide-react'
import CalendarBooking15 from '@/components/CalendarBooking15'

export default function PainelBarbeiro() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected') // disconnected, connecting, connected, error
  const [qrCode, setQrCode] = useState('')
  const [showQRModal, setShowQRModal] = useState(false)
  const [connectionAttempts, setConnectionAttempts] = useState(0)
  const [lastConnectionTime, setLastConnectionTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [showBlockTimeModal, setShowBlockTimeModal] = useState(false)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [showNewServiceModal, setShowNewServiceModal] = useState(false)
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [editingClient, setEditingClient] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  // Estados para o novo sistema de agendamento
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [showCalendarBooking, setShowCalendarBooking] = useState(false)
  const [selectedDateForBooking, setSelectedDateForBooking] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Mock data com estados gerenciáveis
  const barbeiro = {
    nome: "João Silva",
    barbearia: "Barbearia Premium",
    plano: "Premium",
    diasRestantes: 15,
    avatar: "/api/placeholder/40/40",
    telefone: "(11) 99999-9999",
    email: "joao@barbeariapremium.com",
    endereco: "Rua das Flores, 123 - Centro"
  }

  // Lista de barbeiros disponíveis
  const barbeiros = [
    { id: 1, nome: "João Silva", especialidade: "Corte Clássico", avatar: "/api/placeholder/40/40", ativo: true },
    { id: 2, nome: "Pedro Santos", especialidade: "Barba & Bigode", avatar: "/api/placeholder/40/40", ativo: true },
    { id: 3, nome: "Carlos Oliveira", especialidade: "Corte Moderno", avatar: "/api/placeholder/40/40", ativo: true },
    { id: 4, nome: "Rafael Costa", especialidade: "Degradê", avatar: "/api/placeholder/40/40", ativo: false }
  ]

  const estatisticas = {
    agendamentosHoje: 8,
    faturamentoHoje: 480,
    clientesAtendidos: 156,
    avaliacaoMedia: 4.8,
    faturamentoMes: 12500,
    clientesNovos: 23,
    servicosMaisVendidos: "Corte + Barba"
  }

  // Estados para formulários
  const [appointmentForm, setAppointmentForm] = useState({
    cliente: '',
    servico: '',
    data: '',
    horario: '',
    telefone: '',
    valor: 0,
    barbeiro: ''
  })

  // Estados para dados dinâmicos
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: "Carlos Silva", servico: "Corte + Barba", horario: "09:00", status: "confirmado", telefone: "(11) 98888-8888", valor: 60, data: "2024-01-20", barbeiro: "João Silva" },
    { id: 2, cliente: "Pedro Santos", servico: "Corte Simples", horario: "10:30", status: "confirmado", telefone: "(11) 97777-7777", valor: 35, data: "2024-01-20", barbeiro: "Pedro Santos" },
    { id: 3, cliente: "Lucas Oliveira", servico: "Barba", horario: "14:00", status: "pendente", telefone: "(11) 96666-6666", valor: 25, data: "2024-01-20", barbeiro: "Carlos Oliveira" },
    { id: 4, cliente: "Rafael Costa", servico: "Corte + Barba", horario: "15:30", status: "confirmado", telefone: "(11) 95555-5555", valor: 60, data: "2024-01-20", barbeiro: "João Silva" }
  ])

  const [servicos, setServicos] = useState([
    { id: 1, nome: "Corte Simples", preco: 35, duracao: 30, ativo: true },
    { id: 2, nome: "Corte + Barba", preco: 60, duracao: 45, ativo: true },
    { id: 3, nome: "Barba", preco: 25, duracao: 20, ativo: true },
    { id: 4, nome: "Sobrancelha", preco: 15, duracao: 15, ativo: true },
    { id: 5, nome: "Hidratação", preco: 40, duracao: 30, ativo: false }
  ])

  // Estados para personalização expandida
  const [personalizacaoForm, setPersonalizacaoForm] = useState({
    nomeBarbearia: barbeiro.barbearia,
    telefone: barbeiro.telefone,
    endereco: barbeiro.endereco,
    logo: null,
    logoPreview: null,
    corPrimaria: '#3B82F6',
    corSecundaria: '#1F2937',
    corTexto: '#FFFFFF',
    corFundo: '#0C0C0D',
    tema: 'escuro',
    fonte: 'Inter',
    linkPublico: 'barbearia-premium',
    statusPagina: 'ativa',
    horarios: {
      segunda: { inicio: '08:00', fim: '18:00', aberto: true },
      terca: { inicio: '08:00', fim: '18:00', aberto: true },
      quarta: { inicio: '08:00', fim: '18:00', aberto: true },
      quinta: { inicio: '08:00', fim: '18:00', aberto: true },
      sexta: { inicio: '08:00', fim: '18:00', aberto: true },
      sabado: { inicio: '08:00', fim: '18:00', aberto: true },
      domingo: { inicio: '08:00', fim: '18:00', aberto: false }
    }
  })

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'agenda', label: 'Agenda', icon: CalendarDays },
    { id: 'servicos', label: 'Serviços', icon: Scissors },
    { id: 'clientes', label: 'Clientes', icon: UserCheck },
    { id: 'loja', label: 'Loja', icon: Store },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'personalizacao', label: 'Personalização', icon: Palette },
    { id: 'suporte', label: 'Suporte', icon: HelpCircle }
  ]

  // Função para gerar horários disponíveis de 15 em 15 minutos
  const generateAvailableSlots = (date) => {
    const slots = []
    const startHour = 8
    const endHour = 18
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const dateStr = date.toISOString().split('T')[0]
        
        // Verificar se o horário está ocupado
        const isBooked = agendamentos.some(ag => 
          ag.data === dateStr && ag.horario === timeSlot
        )
        
        slots.push({
          time: timeSlot,
          available: !isBooked,
          status: isBooked ? 'occupied' : 'available'
        })
      }
    }
    
    return slots
  }

  // Função para iniciar novo agendamento
  const startNewAppointment = () => {
    setSelectedBarber(barbeiros.find(b => b.ativo)) // Seleciona o primeiro barbeiro ativo
    setSelectedDateForBooking(new Date())
    setSelectedSlot(null)
    setShowCalendarBooking(true)
    setAppointmentForm({ cliente: '', servico: '', data: '', horario: '', telefone: '', valor: 0, barbeiro: '' })
  }

  // Função para lidar com seleção de slot no CalendarBooking15
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
    const dateStr = selectedDateForBooking.toISOString().split('T')[0]
    setAppointmentForm({
      ...appointmentForm,
      data: dateStr,
      horario: slot,
      barbeiro: selectedBarber?.nome || ''
    })
    setShowCalendarBooking(false)
    setShowNewAppointmentModal(true)
  }

  // Função para fechar o calendário
  const handleCloseCalendar = () => {
    setShowCalendarBooking(false)
    setSelectedBarber(null)
    setSelectedSlot(null)
  }

  // Funções para gerenciar agendamentos
  const handleSaveAppointment = () => {
    if (!appointmentForm.cliente || !appointmentForm.servico || !appointmentForm.data || !appointmentForm.horario) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (editingAppointment) {
      // Editar agendamento existente
      setAgendamentos(prev => prev.map(agendamento => 
        agendamento.id === editingAppointment.id 
          ? { ...agendamento, ...appointmentForm, id: editingAppointment.id }
          : agendamento
      ))
      alert('Agendamento atualizado com sucesso!')
    } else {
      // Criar novo agendamento
      const newAppointment = {
        id: Date.now(),
        ...appointmentForm,
        status: 'confirmado'
      }
      setAgendamentos(prev => [...prev, newAppointment])
      alert('Agendamento criado com sucesso!')
    }

    setShowNewAppointmentModal(false)
    setEditingAppointment(null)
    setAppointmentForm({ cliente: '', servico: '', data: '', horario: '', telefone: '', valor: 0, barbeiro: '' })
  }

  const acoesRapidas = [
    { 
      label: 'Novo Agendamento', 
      icon: Plus, 
      color: 'bg-blue-600 hover:bg-blue-700',
      action: startNewAppointment
    },
    { 
      label: 'Novo Cliente', 
      icon: UserCheck, 
      color: 'bg-green-600 hover:bg-green-700',
      action: () => alert('Funcionalidade em desenvolvimento')
    },
    { 
      label: 'Bloquear Horário', 
      icon: XCircle, 
      color: 'bg-red-600 hover:bg-red-700',
      action: () => alert('Funcionalidade em desenvolvimento')
    },
    { 
      label: 'Enviar Campanha', 
      icon: MessageSquare, 
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => alert('Funcionalidade em desenvolvimento')
    }
  ]

  const handleLogout = () => {
    router.push('/logout')
  }

  const handleVisaoCliente = () => {
    window.open('/cliente', '_blank')
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hoje</p>
              <p className="text-2xl font-bold text-white">{agendamentos.length}</p>
              <p className="text-xs text-gray-500">agendamentos</p>
            </div>
            <div className="bg-blue-600/20 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Faturamento</p>
              <p className="text-2xl font-bold text-white">R$ {agendamentos.reduce((total, ag) => total + ag.valor, 0)}</p>
              <p className="text-xs text-gray-500">hoje</p>
            </div>
            <div className="bg-green-600/20 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Clientes</p>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-xs text-gray-500">cadastrados</p>
            </div>
            <div className="bg-purple-600/20 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avaliação</p>
              <p className="text-2xl font-bold text-white">{estatisticas.avaliacaoMedia}</p>
              <p className="text-xs text-gray-500">média</p>
            </div>
            <div className="bg-yellow-600/20 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Agenda do Dia */}
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Agenda do Dia</h2>
          <button 
            onClick={startNewAppointment}
            className="bg-[#3B82F6] hover:bg-blue-600 text-white p-2 rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {agendamentos.slice(0, 4).map((agendamento) => (
            <div key={agendamento.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <p className="font-medium text-white">{agendamento.cliente}</p>
                  <p className="text-sm text-gray-400">{agendamento.servico} • R$ {agendamento.valor}</p>
                  <p className="text-xs text-gray-500">Barbeiro: {agendamento.barbeiro}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{agendamento.horario}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  agendamento.status === 'confirmado' 
                    ? 'bg-green-600/20 text-green-400' 
                    : 'bg-yellow-600/20 text-yellow-400'
                }`}>
                  {agendamento.status === 'confirmado' ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {agendamento.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {acoesRapidas.map((acao, index) => (
            <button
              key={index}
              onClick={acao.action}
              className={`${acao.color} text-white p-4 rounded-xl transition-all duration-200 hover:scale-105 flex flex-col items-center space-y-2`}
            >
              <acao.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{acao.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
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
            <h1 className="font-semibold text-white">{barbeiro.barbearia}</h1>
            <div className="flex items-center justify-center space-x-2">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm text-[#D4AF37]">{barbeiro.plano}</span>
              <span className="text-xs text-gray-400">• {barbeiro.diasRestantes} dias</span>
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
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141416] border-r border-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h1 className="text-xl font-bold text-white">{barbeiro.barbearia}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm text-[#D4AF37]">{barbeiro.plano}</span>
                <span className="text-xs text-gray-400">• {barbeiro.diasRestantes} dias</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-6 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-4 right-4 space-y-2">
            <button
              onClick={handleVisaoCliente}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>Visão do Cliente</span>
            </button>
            <button
              onClick={handleLogout}
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
              <h1 className="text-2xl font-bold text-white">Painel do Barbeiro</h1>
              <p className="text-gray-400">Bem-vindo, {barbeiro.nome}</p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleVisaoCliente}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Visão do Cliente</span>
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
                  <span className="text-white">{barbeiro.nome}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#141416] border border-gray-800 rounded-xl shadow-lg z-50">
                    <button 
                      onClick={() => alert('Funcionalidade em desenvolvimento')}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Perfil</span>
                    </button>
                    <button 
                      onClick={() => alert('Funcionalidade em desenvolvimento')}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Configurações</span>
                    </button>
                    <hr className="border-gray-800" />
                    <button
                      onClick={handleLogout}
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

      {/* Modal CalendarBooking15 */}
      {showCalendarBooking && selectedBarber && (
        <CalendarBooking15
          barberName={selectedBarber.nome}
          date={selectedDateForBooking}
          slots15={generateAvailableSlots(selectedDateForBooking)}
          onSelectSlot={handleSlotSelect}
          onClose={handleCloseCalendar}
          selectedSlot={selectedSlot}
        />
      )}

      {/* Modal Novo/Editar Agendamento */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
              </h3>
              <button
                onClick={() => {
                  setShowNewAppointmentModal(false)
                  setEditingAppointment(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {appointmentForm.barbeiro && (
                <div className="bg-[#0C0C0D] rounded-xl p-3 border border-gray-800">
                  <p className="text-sm text-gray-400">Barbeiro selecionado:</p>
                  <p className="text-white font-medium">{appointmentForm.barbeiro}</p>
                  <p className="text-sm text-gray-400">Data: {appointmentForm.data} às {appointmentForm.horario}</p>
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cliente</label>
                <input
                  type="text"
                  placeholder="Nome do cliente"
                  value={appointmentForm.cliente}
                  onChange={(e) => setAppointmentForm({...appointmentForm, cliente: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={appointmentForm.telefone}
                  onChange={(e) => setAppointmentForm({...appointmentForm, telefone: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Serviço</label>
                <select 
                  value={appointmentForm.servico}
                  onChange={(e) => {
                    const selectedService = servicos.find(s => s.nome === e.target.value)
                    setAppointmentForm({
                      ...appointmentForm, 
                      servico: e.target.value,
                      valor: selectedService ? selectedService.preco : 0
                    })
                  }}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="">Selecione um serviço</option>
                  {servicos.filter(s => s.ativo).map(servico => (
                    <option key={servico.id} value={servico.nome}>{servico.nome} - R$ {servico.preco}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Valor</label>
                <input
                  type="number"
                  placeholder="0"
                  value={appointmentForm.valor}
                  onChange={(e) => setAppointmentForm({...appointmentForm, valor: parseFloat(e.target.value) || 0})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowNewAppointmentModal(false)
                    setEditingAppointment(null)
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveAppointment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  {editingAppointment ? 'Atualizar' : 'Agendar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}