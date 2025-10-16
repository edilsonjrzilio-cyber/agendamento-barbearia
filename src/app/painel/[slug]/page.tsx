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

export default function PainelBarbeiroSlug() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected')
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

  // Estados para o novo sistema de agendamento com horários de 15 em 15 minutos
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [showBarberSelection, setShowBarberSelection] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDateForBooking, setSelectedDateForBooking] = useState(null)
  const [availableHours, setAvailableHours] = useState([])
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

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

  // Estados para dados dinâmicos
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: "Carlos Silva", servico: "Corte + Barba", horario: "09:00", status: "confirmado", telefone: "(11) 98888-8888", valor: 60, data: "2024-01-20", barbeiro: "João Silva" },
    { id: 2, cliente: "Pedro Santos", servico: "Corte Simples", horario: "10:30", status: "confirmado", telefone: "(11) 97777-7777", valor: 35, data: "2024-01-20", barbeiro: "Pedro Santos" },
    { id: 3, cliente: "Lucas Oliveira", servico: "Barba", horario: "14:00", status: "pendente", telefone: "(11) 96666-6666", valor: 25, data: "2024-01-20", barbeiro: "Carlos Oliveira" },
    { id: 4, cliente: "Rafael Costa", servico: "Corte + Barba", horario: "15:30", status: "confirmado", telefone: "(11) 95555-5555", valor: 60, data: "2024-01-20", barbeiro: "João Silva" },
    { id: 5, cliente: "Ana Maria", servico: "Corte Feminino", horario: "11:00", status: "confirmado", telefone: "(11) 94444-4444", valor: 45, data: "2024-01-21", barbeiro: "Pedro Santos" },
    { id: 6, cliente: "José Santos", servico: "Barba", horario: "16:00", status: "pendente", telefone: "(11) 93333-3333", valor: 25, data: "2024-01-21", barbeiro: "Carlos Oliveira" },
    { id: 7, cliente: "Maria Silva", servico: "Corte + Barba", horario: "09:30", status: "confirmado", telefone: "(11) 92222-2222", valor: 60, data: "2024-01-22", barbeiro: "João Silva" },
    { id: 8, cliente: "Paulo Oliveira", servico: "Corte Simples", horario: "13:00", status: "confirmado", telefone: "(11) 91111-1111", valor: 35, data: "2024-01-22", barbeiro: "Pedro Santos" }
  ])

  const [servicos, setServicos] = useState([
    { id: 1, nome: "Corte Simples", preco: 35, duracao: 30, ativo: true },
    { id: 2, nome: "Corte + Barba", preco: 60, duracao: 45, ativo: true },
    { id: 3, nome: "Barba", preco: 25, duracao: 20, ativo: true },
    { id: 4, nome: "Sobrancelha", preco: 15, duracao: 15, ativo: true },
    { id: 5, nome: "Hidratação", preco: 40, duracao: 30, ativo: false }
  ])

  // Função para gerar horários disponíveis de 15 em 15 minutos
  const generateAvailableHours = (date, barberId) => {
    const hours = []
    const startHour = 8
    const endHour = 18
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const isBooked = agendamentos.some(ag => 
          ag.data === date && 
          ag.horario === timeSlot && 
          ag.barbeiro === barbeiros.find(b => b.id === barberId)?.nome
        )
        
        hours.push({
          time: timeSlot,
          available: !isBooked
        })
      }
    }
    
    return hours
  }

  // Função para verificar se uma data está disponível
  const isDateAvailable = (date) => {
    const dayOfWeek = new Date(date).getDay()
    const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
    const dayName = dayNames[dayOfWeek]
    return personalizacaoForm.horarios[dayName]?.aberto || false
  }

  // Função para iniciar novo agendamento
  const startNewAppointment = () => {
    setShowBarberSelection(true)
    setSelectedBarber(null)
    setSelectedDateForBooking(null)
    setSelectedHour(null)
    setAppointmentForm({ cliente: '', servico: '', data: '', horario: '', telefone: '', valor: 0, barbeiro: '' })
  }

  // Função para selecionar barbeiro
  const selectBarber = (barber) => {
    setSelectedBarber(barber)
    setShowBarberSelection(false)
    setShowCalendar(true)
    // Gerar horários para hoje por padrão
    const today = new Date().toISOString().split('T')[0]
    setSelectedDateForBooking(today)
    const hours = generateAvailableHours(today, barber.id)
    setAvailableHours(hours)
  }

  // Função para lidar com seleção de slot no CalendarBooking15
  const handleSlotSelect = (slot) => {
    setSelectedHour(slot)
    setAppointmentForm({
      ...appointmentForm,
      data: selectedDateForBooking,
      horario: slot,
      barbeiro: selectedBarber.nome
    })
    setShowCalendar(false)
    setShowNewAppointmentModal(true)
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

  const handleEditAppointment = (agendamento) => {
    setEditingAppointment(agendamento)
    setAppointmentForm({
      cliente: agendamento.cliente,
      servico: agendamento.servico,
      data: agendamento.data,
      horario: agendamento.horario,
      telefone: agendamento.telefone,
      valor: agendamento.valor,
      barbeiro: agendamento.barbeiro
    })
    setShowNewAppointmentModal(true)
  }

  const handleDeleteAppointment = (id) => {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id))
      alert('Agendamento excluído com sucesso!')
    }
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

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white">
      {/* Header */}
      <div className="bg-[#141416] border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">Painel do Barbeiro - {barbeiro.nome}</h1>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {barbeiro.barbearia}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleVisaoCliente}
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Visão Cliente</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Estatísticas */}
          <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Hoje</h3>
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Agendamentos</span>
                <span className="text-white font-medium">{estatisticas.agendamentosHoje}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Faturamento</span>
                <span className="text-green-400 font-medium">R$ {estatisticas.faturamentoHoje}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Este Mês</h3>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Faturamento</span>
                <span className="text-green-400 font-medium">R$ {estatisticas.faturamentoMes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Clientes Novos</span>
                <span className="text-white font-medium">{estatisticas.clientesNovos}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Avaliação</h3>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Média</span>
                <span className="text-yellow-400 font-medium">{estatisticas.avaliacaoMedia} ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Atendidos</span>
                <span className="text-white font-medium">{estatisticas.clientesAtendidos}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Ações Rápidas</h2>
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

        {/* Agenda do Dia */}
        <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Agenda do Dia</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {agendamentos.slice(0, 6).map((agendamento) => (
              <div key={agendamento.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{agendamento.cliente}</p>
                    <p className="text-sm text-gray-400">{agendamento.servico} • R$ {agendamento.valor}</p>
                    <p className="text-xs text-gray-500">Barbeiro: {agendamento.barbeiro}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAppointment(agendamento)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(agendamento.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Seleção de Barbeiro */}
      {showBarberSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Selecionar Barbeiro</h3>
              <button
                onClick={() => setShowBarberSelection(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              {barbeiros.filter(b => b.ativo).map((barber) => (
                <button
                  key={barber.id}
                  onClick={() => selectBarber(barber)}
                  className="w-full flex items-center space-x-4 p-4 bg-[#0C0C0D] rounded-xl border border-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">{barber.nome}</p>
                    <p className="text-sm text-gray-400">{barber.especialidade}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Calendário com horários de 15 em 15 minutos */}
      {showCalendar && selectedBarber && (
        <CalendarBooking15
          barberName={selectedBarber.nome}
          date={selectedDateForBooking}
          slots15={availableHours}
          onSelectSlot={handleSlotSelect}
          onClose={() => {
            setShowCalendar(false)
            setSelectedBarber(null)
          }}
          selectedSlot={selectedHour}
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