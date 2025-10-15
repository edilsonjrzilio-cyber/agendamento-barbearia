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

  // Estados para WhatsApp
  const [whatsappSettings, setWhatsappSettings] = useState({
    autoConfirmation: true,
    reminderTime: 24, // horas antes
    welcomeMessage: 'Olá! Obrigado por agendar conosco. Seu horário foi confirmado!',
    reminderMessage: 'Olá! Lembramos que você tem um agendamento amanhã às {horario}. Confirme sua presença!',
    cancelationMessage: 'Seu agendamento foi cancelado. Entre em contato para reagendar.',
    businessHours: {
      start: '08:00',
      end: '18:00'
    }
  })

  const [messageLogs, setMessageLogs] = useState([
    {
      id: 1,
      cliente: 'Carlos Silva',
      telefone: '(11) 98888-8888',
      tipo: 'confirmacao',
      mensagem: 'Olá Carlos! Seu agendamento para hoje às 14:00 foi confirmado.',
      status: 'enviado',
      timestamp: '2024-01-20 13:30',
      agendamentoId: 1
    },
    {
      id: 2,
      cliente: 'Pedro Santos',
      telefone: '(11) 97777-7777',
      tipo: 'lembrete',
      mensagem: 'Olá Pedro! Lembramos que você tem um agendamento amanhã às 10:30.',
      status: 'entregue',
      timestamp: '2024-01-19 18:00',
      agendamentoId: 2
    },
    {
      id: 3,
      cliente: 'Lucas Oliveira',
      telefone: '(11) 96666-6666',
      tipo: 'campanha',
      mensagem: 'Promoção especial: Corte + Barba por apenas R$ 50! Válido até sexta.',
      status: 'lido',
      timestamp: '2024-01-18 10:15',
      agendamentoId: null
    }
  ])

  // Estados para o novo sistema de agendamento
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [showBarberSelection, setShowBarberSelection] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDateForBooking, setSelectedDateForBooking] = useState(null)
  const [availableHours, setAvailableHours] = useState([])
  const [selectedHour, setSelectedHour] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Estados para agenda - calendário interativo
  const [agendaCurrentMonth, setAgendaCurrentMonth] = useState(new Date().getMonth())
  const [agendaCurrentYear, setAgendaCurrentYear] = useState(new Date().getFullYear())
  const [selectedAgendaDate, setSelectedAgendaDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedBarbeirFilter, setSelectedBarbeirFilter] = useState('todos')
  const [agendaView, setAgendaView] = useState('calendario') // calendario, lista

  // Estados para perfil, configurações e plano
  const [perfilForm, setPerfilForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  })

  const [configForm, setConfigForm] = useState({
    notificacaoEmail: true,
    notificacaoPush: true,
    lembreteAgendamento: true,
    relatorioSemanal: false,
    perfilPublico: true,
    mostrarEstatisticas: true,
    permitirAvaliacoes: true
  })

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

  const [clientForm, setClientForm] = useState({
    nome: '',
    telefone: '',
    email: ''
  })

  const [serviceForm, setServiceForm] = useState({
    nome: '',
    preco: 0,
    duracao: 0,
    ativo: true
  })

  const [productForm, setProductForm] = useState({
    nome: '',
    preco: 0,
    estoque: 0,
    categoria: '',
    ativo: true
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

  // Estados para suporte
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      assunto: 'Problema com agendamentos', 
      categoria: 'Problema Técnico',
      descricao: 'Os clientes não conseguem agendar pelo site...',
      status: 'pendente',
      data: '2024-01-15 14:30',
      resposta: null
    },
    { 
      id: 2, 
      assunto: 'Dúvida sobre relatórios', 
      categoria: 'Dúvida',
      descricao: 'Como exportar relatórios mensais?',
      status: 'resolvido',
      data: '2024-01-12 10:15',
      resposta: 'Para exportar relatórios, acesse a aba Relatórios e clique em Exportar no canto superior direito.'
    }
  ])

  const [ticketForm, setTicketForm] = useState({
    assunto: '',
    categoria: 'Problema Técnico',
    descricao: ''
  })

  // Estados para dados dinâmicos
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: "Carlos Silva", servico: "Corte + Barba", horario: "09:00", status: "confirmado", telefone: "(11) 98888-8888", valor: 60, data: "2024-01-20", barbeiro: "João Silva" },
    { id: 2, cliente: "Pedro Santos", servico: "Corte Simples", horario: "10:15", status: "confirmado", telefone: "(11) 97777-7777", valor: 35, data: "2024-01-20", barbeiro: "Pedro Santos" },
    { id: 3, cliente: "Lucas Oliveira", servico: "Barba", horario: "14:30", status: "pendente", telefone: "(11) 96666-6666", valor: 25, data: "2024-01-20", barbeiro: "Carlos Oliveira" },
    { id: 4, cliente: "Rafael Costa", servico: "Corte + Barba", horario: "15:45", status: "confirmado", telefone: "(11) 95555-5555", valor: 60, data: "2024-01-20", barbeiro: "João Silva" },
    { id: 5, cliente: "Ana Maria", servico: "Corte Feminino", horario: "11:30", status: "confirmado", telefone: "(11) 94444-4444", valor: 45, data: "2024-01-21", barbeiro: "Pedro Santos" },
    { id: 6, cliente: "José Santos", servico: "Barba", horario: "16:15", status: "pendente", telefone: "(11) 93333-3333", valor: 25, data: "2024-01-21", barbeiro: "Carlos Oliveira" },
    { id: 7, cliente: "Maria Silva", servico: "Corte + Barba", horario: "09:45", status: "confirmado", telefone: "(11) 92222-2222", valor: 60, data: "2024-01-22", barbeiro: "João Silva" },
    { id: 8, cliente: "Paulo Oliveira", servico: "Corte Simples", horario: "13:15", status: "confirmado", telefone: "(11) 91111-1111", valor: 35, data: "2024-01-22", barbeiro: "Pedro Santos" }
  ])

  const [clientes, setClientes] = useState([
    { id: 1, nome: "Carlos Silva", telefone: "(11) 98888-8888", email: "carlos@email.com", ultimoCorte: "2024-01-15", totalGasto: 480, avaliacoes: 5 },
    { id: 2, nome: "Pedro Santos", telefone: "(11) 97777-7777", email: "pedro@email.com", ultimoCorte: "2024-01-10", totalGasto: 210, avaliacoes: 4.8 },
    { id: 3, nome: "Lucas Oliveira", telefone: "(11) 96666-6666", email: "lucas@email.com", ultimoCorte: "2024-01-08", totalGasto: 150, avaliacoes: 4.9 },
    { id: 4, nome: "Rafael Costa", telefone: "(11) 95555-5555", email: "rafael@email.com", ultimoCorte: "2024-01-12", totalGasto: 360, avaliacoes: 5 }
  ])

  const [servicos, setServicos] = useState([
    { id: 1, nome: "Corte Simples", preco: 35, duracao: 30, ativo: true },
    { id: 2, nome: "Corte + Barba", preco: 60, duracao: 45, ativo: true },
    { id: 3, nome: "Barba", preco: 25, duracao: 20, ativo: true },
    { id: 4, nome: "Sobrancelha", preco: 15, duracao: 15, ativo: true },
    { id: 5, nome: "Hidratação", preco: 40, duracao: 30, ativo: false }
  ])

  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Pomada Modeladora", preco: 25, estoque: 15, categoria: "Cabelo", ativo: true },
    { id: 2, nome: "Óleo para Barba", preco: 35, estoque: 8, categoria: "Barba", ativo: true },
    { id: 3, nome: "Shampoo Masculino", preco: 20, estoque: 12, categoria: "Cabelo", ativo: true },
    { id: 4, nome: "Cera Modeladora", preco: 30, estoque: 6, categoria: "Cabelo", ativo: false }
  ])

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

  // Inicializar formulário de perfil com dados do barbeiro
  useEffect(() => {
    setPerfilForm({
      nome: barbeiro.nome,
      email: barbeiro.email,
      telefone: barbeiro.telefone,
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: ''
    })
  }, [])

  // Simular geração de QR Code
  const generateQRCode = () => {
    const qrData = `whatsapp-web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setQrCode(`data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <g fill="black">
          ${Array.from({length: 20}, (_, i) => 
            Array.from({length: 20}, (_, j) => 
              Math.random() > 0.5 ? `<rect x="${j*10}" y="${i*10}" width="10" height="10"/>` : ''
            ).join('')
          ).join('')}
        </g>
        <text x="100" y="190" text-anchor="middle" font-size="8" fill="gray">QR Code WhatsApp</text>
      </svg>
    `)}`)}
    return qrData
  }

  // Função para conectar WhatsApp
  const connectWhatsApp = () => {
    setWhatsappStatus('connecting')
    setConnectionAttempts(prev => prev + 1)
    setShowQRModal(true)
    generateQRCode()
    
    // Simular processo de conexão
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% chance de sucesso
      if (success) {
        setWhatsappStatus('connected')
        setWhatsappConnected(true)
        setLastConnectionTime(new Date())
        setShowQRModal(false)
        alert('✅ WhatsApp conectado com sucesso! Agora você pode enviar notificações automáticas.')
      } else {
        setWhatsappStatus('error')
        setTimeout(() => {
          setWhatsappStatus('disconnected')
          setShowQRModal(false)
        }, 3000)
      }
    }, 5000)
  }

  const disconnectWhatsApp = () => {
    setWhatsappConnected(false)
    setWhatsappStatus('disconnected')
    setQrCode('')
    setLastConnectionTime(null)
    alert('WhatsApp desconectado!')
  }

  // Função para recarregar QR Code
  const refreshQRCode = () => {
    if (whatsappStatus === 'connecting') {
      generateQRCode()
    }
  }

  // Função para copiar número de telefone
  const copyPhoneNumber = (phone) => {
    navigator.clipboard.writeText(phone.replace(/\D/g, ''))
    alert('Número copiado para a área de transferência!')
  }

  // Função para enviar mensagem manual
  const sendManualMessage = (cliente, telefone, tipo = 'manual') => {
    const newMessage = {
      id: Date.now(),
      cliente,
      telefone,
      tipo,
      mensagem: `Mensagem enviada manualmente para ${cliente}`,
      status: 'enviado',
      timestamp: new Date().toLocaleString('pt-BR'),
      agendamentoId: null
    }
    setMessageLogs(prev => [newMessage, ...prev])
    alert(`Mensagem enviada para ${cliente}!`)
  }

  // Função para enviar lembrete automático
  const sendReminder = (agendamento) => {
    const message = whatsappSettings.reminderMessage.replace('{horario}', agendamento.horario)
    const newMessage = {
      id: Date.now(),
      cliente: agendamento.cliente,
      telefone: agendamento.telefone,
      tipo: 'lembrete',
      mensagem: message,
      status: 'enviado',
      timestamp: new Date().toLocaleString('pt-BR'),
      agendamentoId: agendamento.id
    }
    setMessageLogs(prev => [newMessage, ...prev])
    alert(`Lembrete enviado para ${agendamento.cliente}!`)
  }

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
  }

  // Função para selecionar data
  const selectDate = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDateForBooking(date)
      const hours = generateAvailableHours(date, selectedBarber.id)
      setAvailableHours(hours)
    }
  }

  // Função para selecionar horário
  const selectHour = (hour) => {
    if (hour.available) {
      setSelectedHour(hour.time)
      setAppointmentForm({
        ...appointmentForm,
        data: selectedDateForBooking,
        horario: hour.time,
        barbeiro: selectedBarber.nome
      })
      setShowCalendar(false)
      setShowNewAppointmentModal(true)
    }
  }

  // Funções para navegação do calendário
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Funções para navegação do calendário da agenda
  const agendaPreviousMonth = () => {
    if (agendaCurrentMonth === 0) {
      setAgendaCurrentMonth(11)
      setAgendaCurrentYear(agendaCurrentYear - 1)
    } else {
      setAgendaCurrentMonth(agendaCurrentMonth - 1)
    }
  }

  const agendaNextMonth = () => {
    if (agendaCurrentMonth === 11) {
      setAgendaCurrentMonth(0)
      setAgendaCurrentYear(agendaCurrentYear + 1)
    } else {
      setAgendaCurrentMonth(agendaCurrentMonth + 1)
    }
  }

  // Função para gerar calendário da agenda
  const generateAgendaCalendar = () => {
    const firstDay = new Date(agendaCurrentYear, agendaCurrentMonth, 1)
    const lastDay = new Date(agendaCurrentYear, agendaCurrentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Dias vazios do início do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${agendaCurrentYear}-${(agendaCurrentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const dayAgendamentos = agendamentos.filter(ag => ag.data === date)
      const isToday = date === new Date().toISOString().split('T')[0]
      const isSelected = date === selectedAgendaDate
      
      days.push({
        day,
        date,
        agendamentos: dayAgendamentos,
        isToday,
        isSelected
      })
    }
    
    return days
  }

  // Função para obter agendamentos filtrados
  const getFilteredAgendamentos = () => {
    let filtered = agendamentos.filter(ag => ag.data === selectedAgendaDate)
    
    if (selectedBarbeirFilter !== 'todos') {
      filtered = filtered.filter(ag => ag.barbeiro === selectedBarbeirFilter)
    }
    
    return filtered.sort((a, b) => a.horario.localeCompare(b.horario))
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
      action: () => {
        setEditingClient(null)
        setClientForm({ nome: '', telefone: '', email: '' })
        setShowNewClientModal(true)
      }
    },
    { 
      label: 'Bloquear Horário', 
      icon: XCircle, 
      color: 'bg-red-600 hover:bg-red-700',
      action: () => setShowBlockTimeModal(true)
    },
    { 
      label: 'Enviar Campanha', 
      icon: MessageSquare, 
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => setShowCampaignModal(true)
    }
  ]

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
      
      // Enviar confirmação automática se WhatsApp estiver conectado
      if (whatsappConnected && whatsappSettings.autoConfirmation) {
        const confirmationMessage = {
          id: Date.now() + 1,
          cliente: appointmentForm.cliente,
          telefone: appointmentForm.telefone,
          tipo: 'confirmacao',
          mensagem: whatsappSettings.welcomeMessage,
          status: 'enviado',
          timestamp: new Date().toLocaleString('pt-BR'),
          agendamentoId: newAppointment.id
        }
        setMessageLogs(prev => [confirmationMessage, ...prev])
      }
      
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

  // Funções para gerenciar clientes
  const handleSaveClient = () => {
    if (!clientForm.nome || !clientForm.telefone) {
      alert('Por favor, preencha nome e telefone.')
      return
    }

    if (editingClient) {
      // Editar cliente existente
      setClientes(prev => prev.map(cliente => 
        cliente.id === editingClient.id 
          ? { ...cliente, ...clientForm, id: editingClient.id }
          : cliente
      ))
      alert('Cliente atualizado com sucesso!')
    } else {
      // Criar novo cliente
      const newClient = {
        id: Date.now(),
        ...clientForm,
        ultimoCorte: new Date().toISOString().split('T')[0],
        totalGasto: 0,
        avaliacoes: 5
      }
      setClientes(prev => [...prev, newClient])
      alert('Cliente cadastrado com sucesso!')
    }

    setShowNewClientModal(false)
    setEditingClient(null)
    setClientForm({ nome: '', telefone: '', email: '' })
  }

  const handleEditClient = (cliente) => {
    setEditingClient(cliente)
    setClientForm({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email || ''
    })
    setShowNewClientModal(true)
  }

  const handleDeleteClient = (id) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes(prev => prev.filter(cliente => cliente.id !== id))
      alert('Cliente excluído com sucesso!')
    }
  }

  // Funções para gerenciar serviços
  const handleSaveService = () => {
    if (!serviceForm.nome || !serviceForm.preco || !serviceForm.duracao) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    if (editingService) {
      // Editar serviço existente
      setServicos(prev => prev.map(servico => 
        servico.id === editingService.id 
          ? { ...servico, ...serviceForm, id: editingService.id }
          : servico
      ))
      alert('Serviço atualizado com sucesso!')
    } else {
      // Criar novo serviço
      const newService = {
        id: Date.now(),
        ...serviceForm
      }
      setServicos(prev => [...prev, newService])
      alert('Serviço criado com sucesso!')
    }

    setShowNewServiceModal(false)
    setEditingService(null)
    setServiceForm({ nome: '', preco: 0, duracao: 0, ativo: true })
  }

  const handleEditService = (servico) => {
    setEditingService(servico)
    setServiceForm({
      nome: servico.nome,
      preco: servico.preco,
      duracao: servico.duracao,
      ativo: servico.ativo
    })
    setShowNewServiceModal(true)
  }

  const handleDeleteService = (id) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      setServicos(prev => prev.filter(servico => servico.id !== id))
      alert('Serviço excluído com sucesso!')
    }
  }

  const handleToggleServiceStatus = (id) => {
    setServicos(prev => prev.map(servico => 
      servico.id === id 
        ? { ...servico, ativo: !servico.ativo }
        : servico
    ))
  }

  // Funções para gerenciar produtos
  const handleSaveProduct = () => {
    if (!productForm.nome || !productForm.preco || !productForm.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (editingProduct) {
      // Editar produto existente
      setProdutos(prev => prev.map(produto => 
        produto.id === editingProduct.id 
          ? { ...produto, ...productForm, id: editingProduct.id }
          : produto
      ))
      alert('Produto atualizado com sucesso!')
    } else {
      // Criar novo produto
      const newProduct = {
        id: Date.now(),
        ...productForm
      }
      setProdutos(prev => [...prev, newProduct])
      alert('Produto criado com sucesso!')
    }

    setShowNewProductModal(false)
    setEditingProduct(null)
    setProductForm({ nome: '', preco: 0, estoque: 0, categoria: '', ativo: true })
  }

  const handleEditProduct = (produto) => {
    setEditingProduct(produto)
    setProductForm({
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      categoria: produto.categoria,
      ativo: produto.ativo
    })
    setShowNewProductModal(true)
  }

  const handleDeleteProduct = (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => prev.filter(produto => produto.id !== id))
      alert('Produto excluído com sucesso!')
    }
  }

  const handleToggleProductStatus = (id) => {
    setProdutos(prev => prev.map(produto => 
      produto.id === id 
        ? { ...produto, ativo: !produto.ativo }
        : produto
    ))
  }

  // Função para upload de logo
  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPersonalizacaoForm({
          ...personalizacaoForm,
          logo: file,
          logoPreview: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Função para salvar personalização
  const handleSavePersonalizacao = () => {
    // Simular salvamento das configurações
    alert('✅ Configurações salvas com sucesso! Suas alterações foram aplicadas.')
    console.log('Configurações salvas:', personalizacaoForm)
  }

  // Função para gerar link público
  const generatePublicLink = () => {
    const baseUrl = window.location.origin
    const publicLink = `${baseUrl}/cliente/${personalizacaoForm.linkPublico}`
    navigator.clipboard.writeText(publicLink)
    alert(`✅ Link copiado para a área de transferência!\n${publicLink}`)
  }

  // Função para preview da página
  const previewPage = () => {
    const baseUrl = window.location.origin
    const previewUrl = `${baseUrl}/cliente/${personalizacaoForm.linkPublico}?preview=true`
    window.open(previewUrl, '_blank')
  }

  // Função para enviar ticket de suporte
  const handleSendTicket = () => {
    if (!ticketForm.assunto || !ticketForm.descricao) {
      alert('Por favor, preencha assunto e descrição.')
      return
    }

    const newTicket = {
      id: Date.now(),
      ...ticketForm,
      status: 'pendente',
      data: new Date().toLocaleString('pt-BR'),
      resposta: null
    }

    setTickets(prev => [newTicket, ...prev])
    setTicketForm({ assunto: '', categoria: 'Problema Técnico', descricao: '' })
    setShowTicketModal(false)
    alert('✅ Ticket enviado com sucesso! Nossa equipe entrará em contato em breve.')
  }

  const handleLogout = () => {
    router.push('/logout')
  }

  const handleVisaoCliente = () => {
    window.open('/cliente', '_blank')
  }

  // Função para gerar calendário com navegação
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Dias vazios do início do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const isAvailable = isDateAvailable(date)
      const isPast = new Date(date) < new Date(new Date().toDateString())
      
      days.push({
        day,
        date,
        available: isAvailable && !isPast,
        isPast
      })
    }
    
    return days
  }

  // Função para obter nome do mês
  const getMonthName = (month) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    return months[month]
  }

  // Funções para o menu de perfil
  const handlePerfil = () => {
    setActiveSection('perfil')
    setShowProfileMenu(false)
  }

  const handleConfiguracoes = () => {
    setActiveSection('configuracoes')
    setShowProfileMenu(false)
  }

  const handleGerenciarPlano = () => {
    setActiveSection('plano')
    setShowProfileMenu(false)
  }

  // Funções para salvar perfil e configurações
  const handleSavePerfil = () => {
    if (perfilForm.novaSenha && perfilForm.novaSenha !== perfilForm.confirmarSenha) {
      alert('As senhas não coincidem!')
      return
    }
    
    if (perfilForm.novaSenha && !perfilForm.senhaAtual) {
      alert('Digite sua senha atual para alterar a senha!')
      return
    }

    // Simular salvamento
    alert('✅ Perfil atualizado com sucesso!')
    console.log('Dados do perfil salvos:', perfilForm)
  }

  const handleSaveConfiguracoes = () => {
    // Simular salvamento
    alert('✅ Configurações salvas com sucesso!')
    console.log('Configurações salvas:', configForm)
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
              <p className="text-2xl font-bold text-white">{clientes.length}</p>
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
                {item.id === 'whatsapp' && whatsappConnected && (
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                )}
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
                      onClick={handlePerfil}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Perfil</span>
                    </button>
                    <button 
                      onClick={handleConfiguracoes}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Configurações</span>
                    </button>
                    <button 
                      onClick={handleGerenciarPlano}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <Crown className="w-4 h-4 text-[#D4AF37]" />
                      <span>Gerenciar Plano</span>
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

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 bg-[#141416] border border-gray-800 rounded-xl shadow-lg z-50 lg:top-20">
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-semibold text-white">Notificações</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-3 bg-[#0C0C0D] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <p className="text-sm text-white">Novo agendamento confirmado</p>
              <p className="text-xs text-gray-400">há 5 minutos</p>
            </div>
            <div className="p-3 bg-[#0C0C0D] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <p className="text-sm text-white">Cliente cancelou agendamento</p>
              <p className="text-xs text-gray-400">há 1 hora</p>
            </div>
            <div className="p-3 bg-[#0C0C0D] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <p className="text-sm text-white">Lembrete: Plano expira em 15 dias</p>
              <p className="text-xs text-gray-400">há 2 horas</p>
            </div>
          </div>
        </div>
      )}

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

      {/* Modal Calendário com horários de 15 em 15 minutos e legendas coloridas */}
      {showCalendar && selectedBarber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 w-full max-w-6xl border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">Escolha o Horário</h3>
                <p className="text-blue-400 font-medium">Barbeiro: {selectedBarber.nome}</p>
                {selectedDateForBooking && (
                  <p className="text-blue-400 font-medium">Data: {new Date(selectedDateForBooking).toLocaleDateString('pt-BR')}</p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowCalendar(false)
                  setSelectedBarber(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendário */}
              <div className="bg-[#0f0f23] rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <h4 className="text-xl font-semibold text-white">
                    {getMonthName(currentMonth)} {currentYear}
                  </h4>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <div key={day} className="text-center text-gray-400 text-sm p-3 font-medium">{day}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {generateCalendar().map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && selectDate(day.date)}
                      disabled={!day || !day.available}
                      className={`p-3 text-sm rounded-lg transition-all duration-200 font-medium ${
                        day && day.available
                          ? selectedDateForBooking === day.date
                            ? 'bg-blue-500 text-white shadow-lg scale-105'
                            : 'bg-gray-700 text-white hover:bg-gray-600 hover:scale-105'
                          : day && day.isPast
                          ? 'text-gray-600 cursor-not-allowed'
                          : day
                          ? 'text-gray-500 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {day ? day.day : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horários de 15 em 15 minutos com legendas coloridas */}
              <div className="bg-[#0f0f23] rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white">
                    {selectedDateForBooking ? 'Horários Disponíveis' : 'Selecione uma data'}
                  </h4>
                </div>
                
                {/* Legendas coloridas */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-[#1a1a2e] rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-300">Disponível</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-300">Ocupado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-300">Selecionado</span>
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {selectedDateForBooking ? (
                    <div className="grid grid-cols-4 gap-3">
                      {availableHours.map((hour, index) => (
                        <button
                          key={index}
                          onClick={() => selectHour(hour)}
                          disabled={!hour.available}
                          className={`p-3 text-sm rounded-lg transition-all duration-200 font-medium ${
                            hour.available
                              ? selectedHour === hour.time
                                ? 'bg-blue-500 text-white shadow-lg scale-105'
                                : 'bg-green-500 text-white hover:bg-green-400 hover:scale-105'
                              : 'bg-red-500/80 text-red-200 cursor-not-allowed'
                          }`}
                        >
                          {hour.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">Selecione uma data para ver os horários disponíveis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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