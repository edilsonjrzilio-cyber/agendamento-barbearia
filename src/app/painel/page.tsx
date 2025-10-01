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
  UserPlus
} from 'lucide-react'

export default function PainelBarbeiro() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [showBlockTimeModal, setShowBlockTimeModal] = useState(false)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [showNewServiceModal, setShowNewServiceModal] = useState(false)
  const [showNewProductModal, setShowNewProductModal] = useState(false)
  const [showNewTeamMemberModal, setShowNewTeamMemberModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [editingClient, setEditingClient] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingTeamMember, setEditingTeamMember] = useState(null)

  // Estados para o novo sistema de agendamento
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [showBarberSelection, setShowBarberSelection] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDateForBooking, setSelectedDateForBooking] = useState(null)
  const [availableHours, setAvailableHours] = useState([])
  const [selectedHour, setSelectedHour] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

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

  // Estados para equipe
  const [teamMemberForm, setTeamMemberForm] = useState({
    nome: '',
    especialidade: '',
    telefone: '',
    email: '',
    salario: 100,
    comissao: 10,
    ativo: true
  })

  const [equipe, setEquipe] = useState([
    { id: 1, nome: "João Silva", especialidade: "Corte Clássico", telefone: "(11) 99999-9999", email: "joao@barbearia.com", salario: 100, comissao: 15, ativo: true },
    { id: 2, nome: "Pedro Santos", especialidade: "Barba & Bigode", telefone: "(11) 98888-8888", email: "pedro@barbearia.com", salario: 100, comissao: 12, ativo: true },
    { id: 3, nome: "Carlos Oliveira", especialidade: "Corte Moderno", telefone: "(11) 97777-7777", email: "carlos@barbearia.com", salario: 100, comissao: 10, ativo: true },
    { id: 4, nome: "Rafael Costa", especialidade: "Degradê", telefone: "(11) 96666-6666", email: "rafael@barbearia.com", salario: 100, comissao: 8, ativo: false }
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
    { id: 2, cliente: "Pedro Santos", servico: "Corte Simples", horario: "10:30", status: "confirmado", telefone: "(11) 97777-7777", valor: 35, data: "2024-01-20", barbeiro: "Pedro Santos" },
    { id: 3, cliente: "Lucas Oliveira", servico: "Barba", horario: "14:00", status: "pendente", telefone: "(11) 96666-6666", valor: 25, data: "2024-01-20", barbeiro: "Carlos Oliveira" },
    { id: 4, cliente: "Rafael Costa", servico: "Corte + Barba", horario: "15:30", status: "confirmado", telefone: "(11) 95555-5555", valor: 60, data: "2024-01-20", barbeiro: "João Silva" }
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
    { id: 'equipe', label: 'Equipe', icon: Users },
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

  // Função para gerar horários disponíveis
  const generateAvailableHours = (date, barberId) => {
    const hours = []
    const startHour = 8
    const endHour = 18
    
    for (let hour = startHour; hour < endHour; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`
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

  // Funções para gerenciar equipe
  const handleSaveTeamMember = () => {
    if (!teamMemberForm.nome || !teamMemberForm.especialidade || !teamMemberForm.telefone) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    if (editingTeamMember) {
      // Editar membro existente
      setEquipe(prev => prev.map(membro => 
        membro.id === editingTeamMember.id 
          ? { ...membro, ...teamMemberForm, id: editingTeamMember.id }
          : membro
      ))
      alert('Membro da equipe atualizado com sucesso!')
    } else {
      // Criar novo membro
      const newTeamMember = {
        id: Date.now(),
        ...teamMemberForm
      }
      setEquipe(prev => [...prev, newTeamMember])
      alert('Membro da equipe adicionado com sucesso!')
    }

    setShowNewTeamMemberModal(false)
    setEditingTeamMember(null)
    setTeamMemberForm({ nome: '', especialidade: '', telefone: '', email: '', salario: 100, comissao: 10, ativo: true })
  }

  const handleEditTeamMember = (membro) => {
    setEditingTeamMember(membro)
    setTeamMemberForm({
      nome: membro.nome,
      especialidade: membro.especialidade,
      telefone: membro.telefone,
      email: membro.email || '',
      salario: membro.salario,
      comissao: membro.comissao,
      ativo: membro.ativo
    })
    setShowNewTeamMemberModal(true)
  }

  const handleDeleteTeamMember = (id) => {
    if (confirm('Tem certeza que deseja excluir este membro da equipe?')) {
      setEquipe(prev => prev.filter(membro => membro.id !== id))
      alert('Membro da equipe excluído com sucesso!')
    }
  }

  const handleToggleTeamMemberStatus = (id) => {
    setEquipe(prev => prev.map(membro => 
      membro.id === id 
        ? { ...membro, ativo: !membro.ativo }
        : membro
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

  const connectWhatsApp = () => {
    setWhatsappConnected(true)
    alert('WhatsApp conectado com sucesso!')
  }

  const disconnectWhatsApp = () => {
    setWhatsappConnected(false)
    alert('WhatsApp desconectado!')
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

  const renderAgenda = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Agenda Completa</h2>
          <div className="flex space-x-2">
            <button 
              onClick={startNewAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Agendamento</span>
            </button>
          </div>
        </div>

        {/* Calendário Simples */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="text-center text-gray-400 text-sm p-2">{day}</div>
          ))}
          {Array.from({length: 35}, (_, i) => (
            <button
              key={i}
              className={`p-2 text-sm rounded-lg transition-colors ${
                i === 15 ? 'bg-blue-600 text-white' : 'bg-[#0C0C0D] text-gray-400 hover:bg-gray-700'
              }`}
            >
              {i + 1 <= 31 ? i + 1 : ''}
            </button>
          ))}
        </div>

        {/* Lista de Agendamentos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Agendamentos de Hoje</h3>
          {agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <p className="font-medium text-white">{agendamento.cliente}</p>
                  <p className="text-sm text-gray-400">{agendamento.servico} • {agendamento.telefone}</p>
                  <p className="text-xs text-gray-500">Barbeiro: {agendamento.barbeiro}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-white">{agendamento.horario}</p>
                  <p className="text-sm text-green-400">R$ {agendamento.valor}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditAppointment(agendamento)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteAppointment(agendamento.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderServicos = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Gerenciar Serviços</h2>
          <button 
            onClick={() => {
              setEditingService(null)
              setServiceForm({ nome: '', preco: 0, duracao: 0, ativo: true })
              setShowNewServiceModal(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Serviço</span>
          </button>
        </div>

        <div className="space-y-4">
          {servicos.map((servico) => (
            <div key={servico.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <Scissors className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{servico.nome}</p>
                  <p className="text-sm text-gray-400">{servico.duracao} min • R$ {servico.preco}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleToggleServiceStatus(servico.id)}
                  className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                    servico.ativo ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                  }`}
                >
                  {servico.ativo ? 'Ativo' : 'Inativo'}
                </button>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditService(servico)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteService(servico.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderClientes = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Gerenciar Clientes</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                className="bg-[#0C0C0D] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            <button 
              onClick={() => {
                setEditingClient(null)
                setClientForm({ nome: '', telefone: '', email: '' })
                setShowNewClientModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Cliente</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {clientes.map((cliente) => (
            <div key={cliente.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <p className="font-medium text-white">{cliente.nome}</p>
                  <p className="text-sm text-gray-400">{cliente.telefone}</p>
                  <p className="text-xs text-gray-500">Último corte: {cliente.ultimoCorte}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-400">R$ {cliente.totalGasto} total</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-white">{cliente.avaliacoes}</span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => handleEditClient(cliente)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://wa.me/${cliente.telefone.replace(/\D/g, '')}`)}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClient(cliente.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEquipe = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Gerenciar Equipe</h2>
          <button 
            onClick={() => {
              setEditingTeamMember(null)
              setTeamMemberForm({ nome: '', especialidade: '', telefone: '', email: '', salario: 100, comissao: 10, ativo: true })
              setShowNewTeamMemberModal(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Membro</span>
          </button>
        </div>

        <div className="space-y-4">
          {equipe.map((membro) => (
            <div key={membro.id} className="flex items-center justify-between p-4 bg-[#0C0C0D] rounded-xl border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-xl">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{membro.nome}</p>
                  <p className="text-sm text-gray-400">{membro.especialidade}</p>
                  <p className="text-xs text-gray-500">{membro.telefone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-green-400">R$ {membro.salario}</p>
                  <p className="text-xs text-gray-400">{membro.comissao}% comissão</p>
                </div>
                <button
                  onClick={() => handleToggleTeamMemberStatus(membro.id)}
                  className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                    membro.ativo ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                  }`}
                >
                  {membro.ativo ? 'Ativo' : 'Inativo'}
                </button>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditTeamMember(membro)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => window.open(`https://wa.me/${membro.telefone.replace(/\D/g, '')}`)}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTeamMember(membro.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLoja = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Gerenciar Loja</h2>
          <button 
            onClick={() => {
              setEditingProduct(null)
              setProductForm({ nome: '', preco: 0, estoque: 0, categoria: '', ativo: true })
              setShowNewProductModal(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-[#0C0C0D] rounded-xl border border-gray-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-600/20 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-purple-400" />
                </div>
                <button
                  onClick={() => handleToggleProductStatus(produto.id)}
                  className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                    produto.ativo ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                  }`}
                >
                  {produto.ativo ? 'Ativo' : 'Inativo'}
                </button>
              </div>
              <h3 className="font-medium text-white mb-2">{produto.nome}</h3>
              <p className="text-sm text-gray-400 mb-2">{produto.categoria}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-green-400">R$ {produto.preco}</span>
                <span className="text-sm text-gray-400">Estoque: {produto.estoque}</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditProduct(produto)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDeleteProduct(produto.id)}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderWhatsApp = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">WhatsApp Center</h2>
        
        {/* Status da Conexão */}
        <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${whatsappConnected ? 'bg-green-600/20' : 'bg-red-600/20'}`}>
                {whatsappConnected ? (
                  <Wifi className="w-6 h-6 text-green-400" />
                ) : (
                  <WifiOff className="w-6 h-6 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {whatsappConnected ? 'WhatsApp Conectado' : 'WhatsApp Desconectado'}
                </h3>
                <p className="text-sm text-gray-400">
                  {whatsappConnected ? 'Pronto para enviar mensagens' : 'Conecte seu WhatsApp para começar'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {whatsappConnected ? (
                <button
                  onClick={disconnectWhatsApp}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
                >
                  <Unlink className="w-4 h-4" />
                  <span>Desconectar</span>
                </button>
              ) : (
                <button
                  onClick={connectWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
                >
                  <Link className="w-4 h-4" />
                  <span>Conectar</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Campanhas */}
        <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Campanhas</h3>
            <button 
              onClick={() => setShowCampaignModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Nova Campanha</span>
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#141416] rounded-lg">
              <div>
                <p className="text-white font-medium">Lembrete de Agendamento</p>
                <p className="text-sm text-gray-400">Enviado para 25 clientes</p>
              </div>
              <span className="text-xs text-green-400">Enviado</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#141416] rounded-lg">
              <div>
                <p className="text-white font-medium">Promoção Corte + Barba</p>
                <p className="text-sm text-gray-400">Enviado para 50 clientes</p>
              </div>
              <span className="text-xs text-blue-400">Agendado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRelatorios = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Relatórios</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0C0C0D] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600/20 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Faturamento Mensal</p>
                <p className="text-xl font-bold text-white">R$ {estatisticas.faturamentoMes}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0C0C0D] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Clientes Novos</p>
                <p className="text-xl font-bold text-white">{estatisticas.clientesNovos}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0C0C0D] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600/20 p-2 rounded-lg">
                <Scissors className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Serviço Mais Vendido</p>
                <p className="text-lg font-bold text-white">{estatisticas.servicosMaisVendidos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4">Faturamento por Dia</h3>
            <div className="h-48 flex items-end justify-between space-x-2">
              {[120, 180, 90, 250, 200, 300, 280].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-blue-600 w-8 rounded-t"
                    style={{ height: `${(value / 300) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4">Serviços Mais Vendidos</h3>
            <div className="space-y-4">
              {[
                { nome: 'Corte + Barba', vendas: 45, cor: 'bg-blue-600' },
                { nome: 'Corte Simples', vendas: 32, cor: 'bg-green-600' },
                { nome: 'Barba', vendas: 18, cor: 'bg-purple-600' },
                { nome: 'Sobrancelha', vendas: 12, cor: 'bg-yellow-600' }
              ].map((servico, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${servico.cor}`}></div>
                    <span className="text-white">{servico.nome}</span>
                  </div>
                  <span className="text-gray-400">{servico.vendas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPersonalizacao = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Personalização</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Configurações */}
          <div className="space-y-6">
            {/* Logo da Barbearia */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Logo da Barbearia</span>
              </h3>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-600 transition-colors"
                  onClick={() => document.getElementById('logo-upload').click()}
                >
                  {personalizacaoForm.logoPreview ? (
                    <div className="space-y-2">
                      <img 
                        src={personalizacaoForm.logoPreview} 
                        alt="Logo Preview" 
                        className="w-20 h-20 object-contain mx-auto rounded-lg"
                      />
                      <p className="text-green-400 text-sm">Logo carregado com sucesso!</p>
                      <p className="text-gray-500 text-xs">Clique para alterar</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Clique para fazer upload do logo</p>
                      <p className="text-gray-500 text-xs mt-1">PNG, JPG até 2MB</p>
                    </div>
                  )}
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>

            {/* Esquema de Cores */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                <PaletteIcon className="w-5 h-5" />
                <span>Esquema de Cores</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Cor Primária</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={personalizacaoForm.corPrimaria}
                      onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, corPrimaria: e.target.value})}
                      className="w-12 h-10 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={personalizacaoForm.corPrimaria}
                      onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, corPrimaria: e.target.value})}
                      className="flex-1 bg-[#141416] border border-gray-800 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Cor Secundária</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={personalizacaoForm.corSecundaria}
                      onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, corSecundaria: e.target.value})}
                      className="w-12 h-10 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={personalizacaoForm.corSecundaria}
                      onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, corSecundaria: e.target.value})}
                      className="flex-1 bg-[#141416] border border-gray-800 rounded-lg px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Informações da Barbearia */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Informações da Barbearia</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome da Barbearia</label>
                  <input
                    type="text"
                    value={personalizacaoForm.nomeBarbearia}
                    onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, nomeBarbearia: e.target.value})}
                    className="w-full bg-[#141416] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={personalizacaoForm.telefone}
                    onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, telefone: e.target.value})}
                    className="w-full bg-[#141416] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Endereço</label>
                  <input
                    type="text"
                    value={personalizacaoForm.endereco}
                    onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, endereco: e.target.value})}
                    className="w-full bg-[#141416] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Link Público */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Link Público</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">URL Personalizada</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">{typeof window !== 'undefined' ? window.location.origin : ''}/cliente/</span>
                    <input
                      type="text"
                      value={personalizacaoForm.linkPublico}
                      onChange={(e) => setPersonalizacaoForm({...personalizacaoForm, linkPublico: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                      className="flex-1 bg-[#141416] border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-600"
                      placeholder="minha-barbearia"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Apenas letras minúsculas, números e hífens</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={generatePublicLink}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm flex items-center justify-center space-x-2"
                  >
                    <Link className="w-4 h-4" />
                    <span>Copiar Link</span>
                  </button>
                  <button 
                    onClick={previewPage}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Horário de Funcionamento</h3>
              <div className="space-y-3">
                {Object.entries(personalizacaoForm.horarios).map(([dia, horario]) => (
                  <div key={dia} className="flex items-center justify-between">
                    <span className="text-white w-20 capitalize">{dia}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={horario.inicio}
                        onChange={(e) => setPersonalizacaoForm({
                          ...personalizacaoForm,
                          horarios: {
                            ...personalizacaoForm.horarios,
                            [dia]: { ...horario, inicio: e.target.value }
                          }
                        })}
                        className="bg-[#141416] border border-gray-800 rounded-lg px-3 py-1 text-white text-sm"
                      />
                      <span className="text-gray-400">às</span>
                      <input
                        type="time"
                        value={horario.fim}
                        onChange={(e) => setPersonalizacaoForm({
                          ...personalizacaoForm,
                          horarios: {
                            ...personalizacaoForm.horarios,
                            [dia]: { ...horario, fim: e.target.value }
                          }
                        })}
                        className="bg-[#141416] border border-gray-800 rounded-lg px-3 py-1 text-white text-sm"
                      />
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={horario.aberto}
                          onChange={(e) => setPersonalizacaoForm({
                            ...personalizacaoForm,
                            horarios: {
                              ...personalizacaoForm.horarios,
                              [dia]: { ...horario, aberto: e.target.checked }
                            }
                          })}
                          className="rounded" 
                        />
                        <span className="text-sm text-gray-400">Aberto</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Ações e Preview */}
          <div className="space-y-6">
            {/* Ações */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Ações</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleSavePersonalizacao}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
                <button 
                  onClick={previewPage}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Visualizar Página</span>
                </button>
                <button 
                  onClick={generatePublicLink}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Copiar Link Público</span>
                </button>
              </div>
            </div>

            {/* Status da Página */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Status da Página</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Ativa</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Link</span>
                  <span className="text-blue-400">/{personalizacaoForm.linkPublico}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Última atualização</span>
                  <span className="text-gray-300">Hoje, 14:30</span>
                </div>
              </div>
            </div>

            {/* Preview da Página */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Preview da Página</h3>
              <div className="bg-[#141416] rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  {personalizacaoForm.logoPreview ? (
                    <img 
                      src={personalizacaoForm.logoPreview} 
                      alt="Logo" 
                      className="w-8 h-8 object-contain rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <Scissors className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-medium text-sm">{personalizacaoForm.nomeBarbearia}</h4>
                    <p className="text-gray-400 text-xs">{personalizacaoForm.telefone}</p>
                  </div>
                </div>
                <div 
                  className="w-full h-2 rounded-full mb-2"
                  style={{ backgroundColor: personalizacaoForm.corPrimaria }}
                ></div>
                <div className="text-xs text-gray-400">
                  <p>📍 {personalizacaoForm.endereco}</p>
                  <p className="mt-1">🕒 Seg-Sex: 08:00-18:00</p>
                </div>
              </div>
            </div>

            {/* Dicas de Personalização */}
            <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
              <h3 className="font-semibold text-white mb-4">Dicas de Personalização</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use cores que representem sua marca e criem uma identidade visual forte.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mantenha as informações sempre atualizadas para melhor experiência do cliente.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Configure os horários de funcionamento corretamente para evitar agendamentos fora do horário.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Teste o link público regularmente para garantir que está funcionando corretamente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSuporte = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Suporte</h2>
          <button 
            onClick={() => setShowTicketModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Ticket</span>
          </button>
        </div>

        {/* Tickets Recentes */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-[#0C0C0D] rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{ticket.assunto}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ticket.status === 'pendente' 
                    ? 'bg-yellow-600/20 text-yellow-400' 
                    : ticket.status === 'resolvido'
                    ? 'bg-green-600/20 text-green-400'
                    : 'bg-blue-600/20 text-blue-400'
                }`}>
                  {ticket.status === 'pendente' ? 'Pendente' : 
                   ticket.status === 'resolvido' ? 'Resolvido' : 'Em Andamento'}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{ticket.descricao}</p>
              <p className="text-xs text-gray-500">Criado em {ticket.data}</p>
              {ticket.resposta && (
                <div className="mt-3 p-3 bg-[#141416] rounded-lg border-l-4 border-green-600">
                  <p className="text-sm text-green-400 font-medium mb-1">Resposta do Suporte:</p>
                  <p className="text-sm text-gray-300">{ticket.resposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Novas seções para perfil, configurações e plano
  const renderPerfil = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Meu Perfil</h2>
        
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-gray-300" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{barbeiro.nome}</h3>
            <p className="text-gray-400">{barbeiro.email}</p>
            <p className="text-sm text-gray-500">{barbeiro.barbearia}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nome Completo</label>
              <input
                type="text"
                value={perfilForm.nome}
                onChange={(e) => setPerfilForm({...perfilForm, nome: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={perfilForm.email}
                onChange={(e) => setPerfilForm({...perfilForm, email: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Telefone</label>
              <input
                type="tel"
                value={perfilForm.telefone}
                onChange={(e) => setPerfilForm({...perfilForm, telefone: e.target.value})}
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Senha Atual</label>
              <input
                type="password"
                value={perfilForm.senhaAtual}
                onChange={(e) => setPerfilForm({...perfilForm, senhaAtual: e.target.value})}
                placeholder="Digite sua senha atual"
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nova Senha</label>
              <input
                type="password"
                value={perfilForm.novaSenha}
                onChange={(e) => setPerfilForm({...perfilForm, novaSenha: e.target.value})}
                placeholder="Digite a nova senha"
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirmar Nova Senha</label>
              <input
                type="password"
                value={perfilForm.confirmarSenha}
                onChange={(e) => setPerfilForm({...perfilForm, confirmarSenha: e.target.value})}
                placeholder="Confirme a nova senha"
                className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            onClick={handleSavePerfil}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )

  const renderConfiguracoes = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Configurações</h2>
        
        <div className="space-y-6">
          {/* Notificações */}
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificações</span>
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Notificações por email</span>
                <input 
                  type="checkbox" 
                  checked={configForm.notificacaoEmail}
                  onChange={(e) => setConfigForm({...configForm, notificacaoEmail: e.target.checked})}
                  className="rounded" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Notificações push</span>
                <input 
                  type="checkbox" 
                  checked={configForm.notificacaoPush}
                  onChange={(e) => setConfigForm({...configForm, notificacaoPush: e.target.checked})}
                  className="rounded" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Lembrete de agendamentos</span>
                <input 
                  type="checkbox" 
                  checked={configForm.lembreteAgendamento}
                  onChange={(e) => setConfigForm({...configForm, lembreteAgendamento: e.target.checked})}
                  className="rounded" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Relatórios semanais</span>
                <input 
                  type="checkbox" 
                  checked={configForm.relatorioSemanal}
                  onChange={(e) => setConfigForm({...configForm, relatorioSemanal: e.target.checked})}
                  className="rounded" 
                />
              </label>
            </div>
          </div>

          {/* Privacidade */}
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacidade</span>
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Perfil público</span>
                <input 
                  type="checkbox" 
                  checked={configForm.perfilPublico}
                  onChange={(e) => setConfigForm({...configForm, perfilPublico: e.target.checked})}
                  className="rounded" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Mostrar estatísticas</span>
                <input 
                  type="checkbox" 
                  checked={configForm.mostrarEstatisticas}
                  onChange={(e) => setConfigForm({...configForm, mostrarEstatisticas: e.target.checked})}
                  className="rounded" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Permitir avaliações</span>
                <input 
                  type="checkbox" 
                  checked={configForm.permitirAvaliacoes}
                  onChange={(e) => setConfigForm({...configForm, permitirAvaliacoes: e.target.checked})}
                  className="rounded" 
                />
              </label>
            </div>
          </div>

          {/* Backup */}
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Backup e Dados</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Backup automático</p>
                  <p className="text-sm text-gray-500">Último backup: hoje às 03:00</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Fazer Backup
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Exportar dados</p>
                  <p className="text-sm text-gray-500">Baixar todos os seus dados</p>
                </div>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Exportar
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleSaveConfiguracoes}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors"
            >
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPlano = () => (
    <div className="space-y-6">
      <div className="bg-[#141416] rounded-2xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Gerenciar Plano</h2>
        
        {/* Plano Atual */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-xl p-6 border border-yellow-600/30 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-600/20 p-3 rounded-xl">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Plano {barbeiro.plano}</h3>
                <p className="text-yellow-400">Expira em {barbeiro.diasRestantes} dias</p>
                <p className="text-sm text-gray-400">Renovação automática ativa</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">R$ 49,90</p>
              <p className="text-sm text-gray-400">por mês</p>
            </div>
          </div>
        </div>

        {/* Recursos do Plano Atual */}
        <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800 mb-6">
          <h3 className="font-semibold text-white mb-4">Recursos Inclusos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Agendamentos ilimitados</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">WhatsApp integrado</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Relatórios avançados</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Suporte prioritário</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Personalização completa</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Backup automático</span>
            </div>
          </div>
        </div>

        {/* Outros Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plano Básico */}
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">Básico</h3>
              <p className="text-2xl font-bold text-white mt-2">R$ 19,90</p>
              <p className="text-sm text-gray-400">por mês</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Até 50 agendamentos/mês</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Relatórios básicos</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-400">WhatsApp integrado</span>
              </div>
            </div>
            <button 
              onClick={() => alert('Funcionalidade de downgrade será implementada em breve!')}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm"
            >
              Downgrade
            </button>
          </div>

          {/* Plano Premium (Atual) */}
          <div className="bg-gradient-to-b from-yellow-600/20 to-yellow-500/10 rounded-xl p-6 border-2 border-yellow-600/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-600 text-black px-3 py-1 rounded-full text-xs font-semibold">
                PLANO ATUAL
              </span>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">Premium</h3>
              <p className="text-2xl font-bold text-white mt-2">R$ 49,90</p>
              <p className="text-sm text-gray-400">por mês</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Agendamentos ilimitados</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">WhatsApp integrado</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Relatórios avançados</span>
              </div>
            </div>
            <button 
              onClick={() => alert('Plano renovado com sucesso!')}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black py-2 rounded-lg text-sm font-semibold"
            >
              Renovar Agora
            </button>
          </div>

          {/* Plano Pro */}
          <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">Pro</h3>
              <p className="text-2xl font-bold text-white mt-2">R$ 99,90</p>
              <p className="text-sm text-gray-400">por mês</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Tudo do Premium +</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Múltiplas barbearias</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">API personalizada</span>
              </div>
            </div>
            <button 
              onClick={() => alert('Funcionalidade de upgrade será implementada em breve!')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Histórico de Pagamentos */}
        <div className="bg-[#0C0C0D] rounded-xl p-6 border border-gray-800 mt-6">
          <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Histórico de Pagamentos</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#141416] rounded-lg">
              <div>
                <p className="text-white font-medium">Plano Premium - Janeiro 2024</p>
                <p className="text-sm text-gray-400">15/01/2024</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-medium">R$ 49,90</p>
                <span className="text-xs text-green-400">Pago</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#141416] rounded-lg">
              <div>
                <p className="text-white font-medium">Plano Premium - Dezembro 2023</p>
                <p className="text-sm text-gray-400">15/12/2023</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-medium">R$ 49,90</p>
                <span className="text-xs text-green-400">Pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'agenda':
        return renderAgenda()
      case 'servicos':
        return renderServicos()
      case 'clientes':
        return renderClientes()
      case 'equipe':
        return renderEquipe()
      case 'loja':
        return renderLoja()
      case 'whatsapp':
        return renderWhatsApp()
      case 'relatorios':
        return renderRelatorios()
      case 'personalizacao':
        return renderPersonalizacao()
      case 'suporte':
        return renderSuporte()
      case 'perfil':
        return renderPerfil()
      case 'configuracoes':
        return renderConfiguracoes()
      case 'plano':
        return renderPlano()
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

      {/* Modal Novo/Editar Membro da Equipe */}
      {showNewTeamMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingTeamMember ? 'Editar Membro' : 'Novo Membro da Equipe'}
              </h3>
              <button
                onClick={() => {
                  setShowNewTeamMemberModal(false)
                  setEditingTeamMember(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={teamMemberForm.nome}
                  onChange={(e) => setTeamMemberForm({...teamMemberForm, nome: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Especialidade</label>
                <input
                  type="text"
                  placeholder="Ex: Corte Clássico"
                  value={teamMemberForm.especialidade}
                  onChange={(e) => setTeamMemberForm({...teamMemberForm, especialidade: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={teamMemberForm.telefone}
                  onChange={(e) => setTeamMemberForm({...teamMemberForm, telefone: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email (opcional)</label>
                <input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={teamMemberForm.email}
                  onChange={(e) => setTeamMemberForm({...teamMemberForm, email: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Salário (R$)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={teamMemberForm.salario}
                    onChange={(e) => setTeamMemberForm({...teamMemberForm, salario: parseFloat(e.target.value) || 100})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Comissão (%)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={teamMemberForm.comissao}
                    onChange={(e) => setTeamMemberForm({...teamMemberForm, comissao: parseFloat(e.target.value) || 10})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={teamMemberForm.ativo}
                    onChange={(e) => setTeamMemberForm({...teamMemberForm, ativo: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-400">Membro ativo</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowNewTeamMemberModal(false)
                    setEditingTeamMember(null)
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveTeamMember}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  {editingTeamMember ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
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

      {/* Modal Calendário */}
      {showCalendar && selectedBarber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">Escolha o Horário</h3>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendário */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h4 className="font-semibold text-white">
                    {getMonthName(currentMonth)} {currentYear}
                  </h4>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="bg-[#0C0C0D] rounded-xl p-4 border border-gray-800">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} className="text-center text-gray-400 text-sm p-2">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendar().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => day && selectDate(day.date)}
                        disabled={!day || !day.available}
                        className={`p-2 text-sm rounded-lg transition-colors ${
                          day && day.available
                            ? selectedDateForBooking === day.date
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-white hover:bg-gray-600'
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
              </div>

              {/* Horários */}
              <div>
                <h4 className="font-semibold text-white mb-4">
                  {selectedDateForBooking ? 'Horários Disponíveis' : 'Selecione uma data primeiro'}
                </h4>
                <div className="bg-[#0C0C0D] rounded-xl p-4 border border-gray-800">
                  {selectedDateForBooking ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableHours.map((hour, index) => (
                        <button
                          key={index}
                          onClick={() => selectHour(hour)}
                          disabled={!hour.available}
                          className={`p-2 text-sm rounded-lg transition-colors ${
                            hour.available
                              ? selectedHour === hour.time
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                              : 'bg-red-900/20 text-red-400 cursor-not-allowed'
                          }`}
                        >
                          {hour.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Selecione uma data para ver os horários disponíveis</p>
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
              {!appointmentForm.barbeiro && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Data</label>
                    <input
                      type="date"
                      value={appointmentForm.data}
                      onChange={(e) => setAppointmentForm({...appointmentForm, data: e.target.value})}
                      className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Horário</label>
                    <input
                      type="time"
                      value={appointmentForm.horario}
                      onChange={(e) => setAppointmentForm({...appointmentForm, horario: e.target.value})}
                      className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}
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

      {/* Modal Novo/Editar Cliente */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h3>
              <button
                onClick={() => {
                  setShowNewClientModal(false)
                  setEditingClient(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome</label>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={clientForm.nome}
                  onChange={(e) => setClientForm({...clientForm, nome: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={clientForm.telefone}
                  onChange={(e) => setClientForm({...clientForm, telefone: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email (opcional)</label>
                <input
                  type="email"
                  placeholder="cliente@email.com"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowNewClientModal(false)
                    setEditingClient(null)
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveClient}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  {editingClient ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo/Editar Serviço */}
      {showNewServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingService ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>
              <button
                onClick={() => {
                  setShowNewServiceModal(false)
                  setEditingService(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome do Serviço</label>
                <input
                  type="text"
                  placeholder="Ex: Corte Masculino"
                  value={serviceForm.nome}
                  onChange={(e) => setServiceForm({...serviceForm, nome: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={serviceForm.preco}
                    onChange={(e) => setServiceForm({...serviceForm, preco: parseFloat(e.target.value) || 0})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Duração (min)</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={serviceForm.duracao}
                    onChange={(e) => setServiceForm({...serviceForm, duracao: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={serviceForm.ativo}
                    onChange={(e) => setServiceForm({...serviceForm, ativo: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-400">Serviço ativo</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowNewServiceModal(false)
                    setEditingService(null)
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveService}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  {editingService ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo/Editar Produto */}
      {showNewProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button
                onClick={() => {
                  setShowNewProductModal(false)
                  setEditingProduct(null)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome do Produto</label>
                <input
                  type="text"
                  placeholder="Ex: Pomada Modeladora"
                  value={productForm.nome}
                  onChange={(e) => setProductForm({...productForm, nome: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Categoria</label>
                <select
                  value={productForm.categoria}
                  onChange={(e) => setProductForm({...productForm, categoria: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Cabelo">Cabelo</option>
                  <option value="Barba">Barba</option>
                  <option value="Cuidados">Cuidados</option>
                  <option value="Acessórios">Acessórios</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={productForm.preco}
                    onChange={(e) => setProductForm({...productForm, preco: parseFloat(e.target.value) || 0})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Estoque</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={productForm.estoque}
                    onChange={(e) => setProductForm({...productForm, estoque: parseInt(e.target.value) || 0})}
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.ativo}
                    onChange={(e) => setProductForm({...productForm, ativo: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-400">Produto ativo</span>
                </label>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowNewProductModal(false)
                    setEditingProduct(null)
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  {editingProduct ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bloquear Horário */}
      {showBlockTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Bloquear Horário</h3>
              <button
                onClick={() => setShowBlockTimeModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Motivo</label>
                <input
                  type="text"
                  placeholder="Ex: Almoço, Reunião, etc."
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Data</label>
                  <input
                    type="date"
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Horário Início</label>
                  <input
                    type="time"
                    className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Horário Fim</label>
                <input
                  type="time"
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowBlockTimeModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowBlockTimeModal(false)
                    alert('Horário bloqueado com sucesso!')
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition-colors"
                >
                  Bloquear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Campanha */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Nova Campanha</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Título da Campanha</label>
                <input
                  type="text"
                  placeholder="Ex: Promoção de Janeiro"
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Mensagem</label>
                <textarea
                  placeholder="Digite sua mensagem aqui..."
                  rows={4}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Público Alvo</label>
                <select className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600">
                  <option>Todos os clientes</option>
                  <option>Clientes ativos</option>
                  <option>Clientes inativos</option>
                  <option>Clientes VIP</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowCampaignModal(false)
                    alert('Campanha enviada com sucesso!')
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ticket */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141416] rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Novo Ticket de Suporte</h3>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Assunto</label>
                <input
                  type="text"
                  placeholder="Descreva brevemente o problema"
                  value={ticketForm.assunto}
                  onChange={(e) => setTicketForm({...ticketForm, assunto: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Categoria</label>
                <select 
                  value={ticketForm.categoria}
                  onChange={(e) => setTicketForm({...ticketForm, categoria: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="Problema Técnico">Problema Técnico</option>
                  <option value="Dúvida">Dúvida</option>
                  <option value="Sugestão">Sugestão</option>
                  <option value="Reclamação">Reclamação</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Descrição</label>
                <textarea
                  placeholder="Descreva detalhadamente o problema ou dúvida..."
                  rows={4}
                  value={ticketForm.descricao}
                  onChange={(e) => setTicketForm({...ticketForm, descricao: e.target.value})}
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendTicket}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}