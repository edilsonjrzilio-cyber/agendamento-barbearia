'use client'

import { useState } from 'react'
import { Bell, User, Calendar, DollarSign, Clock, Star, Plus, Phone, MapPin, Scissors, Users, History, Settings, Info, Edit, Trash2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

export default function PainelCliente() {
  const [activeTab, setActiveTab] = useState('agendamentos')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAgendamentoModal, setShowAgendamentoModal] = useState(false)
  const [selectedBarbeiro, setSelectedBarbeiro] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [editingAgendamento, setEditingAgendamento] = useState(null)

  // Estados para o calendário
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDateForBooking, setSelectedDateForBooking] = useState(null)

  // Estados para configurações
  const [showConfiguracoes, setShowConfiguracoes] = useState(false)
  const [notificacoesEmail, setNotificacoesEmail] = useState(true)
  const [notificacoesSMS, setNotificacoesSMS] = useState(false)
  const [notificacoesPush, setNotificacoesPush] = useState(true)

  // Dados mockados
  const clienteData = {
    nome: 'João Silva',
    totalVisitas: 12,
    totalGasto: 480.00,
    proximosAgendamentos: 2,
    pontos: 150
  }

  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      data: '2024-01-15',
      hora: '14:00',
      servico: 'Corte + Barba',
      profissional: 'Carlos Silva',
      preco: 45.00,
      status: 'Confirmado'
    },
    {
      id: 2,
      data: '2024-01-20',
      hora: '16:30',
      servico: 'Corte Simples',
      profissional: 'João Santos',
      preco: 25.00,
      status: 'Pendente'
    }
  ])

  const barbeiros = [
    { id: 1, nome: 'Carlos Silva', especialidade: 'Corte e Barba' },
    { id: 2, nome: 'João Santos', especialidade: 'Corte Moderno' },
    { id: 3, nome: 'Pedro Costa', especialidade: 'Barba e Bigode' }
  ]

  const servicos = [
    { id: 1, nome: 'Corte Simples', preco: 25.00, duracao: '30min' },
    { id: 2, nome: 'Corte + Barba', preco: 45.00, duracao: '60min' },
    { id: 3, nome: 'Barba', preco: 20.00, duracao: '30min' },
    { id: 4, nome: 'Sobrancelha', preco: 15.00, duracao: '15min' }
  ]

  const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  const notificacoes = [
    { id: 1, titulo: 'Agendamento Confirmado', mensagem: 'Seu agendamento para amanhã às 14:00 foi confirmado', tempo: '2h atrás', lida: false },
    { id: 2, titulo: 'Lembrete', mensagem: 'Você tem um agendamento hoje às 16:30', tempo: '1 dia atrás', lida: true },
    { id: 3, titulo: 'Promoção', mensagem: 'Desconto de 20% em cortes nesta semana!', tempo: '3 dias atrás', lida: false }
  ]

  // Função para gerar calendário
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
      const isPast = new Date(date) < new Date(new Date().toDateString())
      
      days.push({
        day,
        date,
        available: !isPast,
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

  const handleNovoAgendamento = () => {
    if (selectedBarbeiro && selectedDate && selectedTime && selectedService) {
      if (editingAgendamento) {
        // Editar agendamento existente
        setAgendamentos(prev => prev.map(agendamento => 
          agendamento.id === editingAgendamento.id 
            ? { 
                ...agendamento, 
                profissional: selectedBarbeiro,
                data: selectedDate,
                hora: selectedTime,
                servico: selectedService,
                preco: servicos.find(s => s.nome === selectedService)?.preco || 0
              }
            : agendamento
        ))
        alert('Agendamento atualizado com sucesso!')
      } else {
        // Criar novo agendamento
        const newAgendamento = {
          id: Date.now(),
          data: selectedDate,
          hora: selectedTime,
          servico: selectedService,
          profissional: selectedBarbeiro,
          preco: servicos.find(s => s.nome === selectedService)?.preco || 0,
          status: 'Confirmado'
        }
        setAgendamentos(prev => [...prev, newAgendamento])
        alert('Agendamento criado com sucesso!')
      }
      
      setShowAgendamentoModal(false)
      setEditingAgendamento(null)
      // Reset form
      setSelectedBarbeiro('')
      setSelectedDate('')
      setSelectedTime('')
      setSelectedService('')
    } else {
      alert('Por favor, preencha todos os campos')
    }
  }

  const handleEditAgendamento = (agendamento) => {
    setEditingAgendamento(agendamento)
    setSelectedBarbeiro(agendamento.profissional)
    setSelectedDate(agendamento.data)
    setSelectedTime(agendamento.hora)
    setSelectedService(agendamento.servico)
    setShowAgendamentoModal(true)
  }

  const handleDeleteAgendamento = (id) => {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id))
      alert('Agendamento excluído com sucesso!')
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'agendamentos':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Próximos Agendamentos</h3>
              <button
                onClick={() => {
                  setEditingAgendamento(null)
                  setSelectedBarbeiro('')
                  setSelectedDate('')
                  setSelectedTime('')
                  setSelectedService('')
                  setShowAgendamentoModal(true)
                }}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Agendamento
              </button>
            </div>
            
            <div className="space-y-3">
              {agendamentos.map((agendamento) => (
                <div key={agendamento.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium">{agendamento.servico}</h4>
                      <p className="text-gray-300 text-sm">com {agendamento.profissional}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        agendamento.status === 'Confirmado' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {agendamento.status}
                      </span>
                      <button
                        onClick={() => handleEditAgendamento(agendamento)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAgendamento(agendamento.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4 text-gray-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {agendamento.hora}
                      </span>
                    </div>
                    <span className="text-[#3B82F6] font-medium">
                      R$ {agendamento.preco.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'loja':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Loja</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicos.map((servico) => (
                <div key={servico.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
                  <h4 className="text-white font-medium mb-2">{servico.nome}</h4>
                  <p className="text-gray-300 text-sm mb-3">Duração: {servico.duracao}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#3B82F6] font-bold">R$ {servico.preco.toFixed(2)}</span>
                    <button className="bg-[#3B82F6] text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                      Agendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'historico':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Histórico de Agendamentos</h3>
            <div className="bg-[#1F2937] rounded-lg p-6 border border-gray-600 text-center">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-300">Nenhum histórico encontrado</p>
            </div>
          </div>
        )

      case 'perfil':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Meu Perfil</h3>
            
            <div className="bg-[#1F2937] rounded-lg p-6 border border-gray-600">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">{clienteData.nome}</h4>
                  <p className="text-gray-300">Cliente desde Janeiro 2024</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nome Completo</label>
                  <input
                    type="text"
                    defaultValue={clienteData.nome}
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="joao@email.com"
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Telefone</label>
                  <input
                    type="tel"
                    defaultValue="(11) 99999-9999"
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  />
                </div>

                <button className="bg-[#3B82F6] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300">
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )

      case 'sobre':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Sobre a Barbearia</h3>
            <div className="bg-[#1F2937] rounded-lg p-6 border border-gray-600">
              <h4 className="text-white font-medium text-lg mb-4">BarberShop Premium</h4>
              <p className="text-gray-300 mb-4">
                A melhor barbearia da cidade, oferecendo serviços de qualidade com profissionais experientes.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <Phone className="w-5 h-5 text-[#3B82F6]" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <MapPin className="w-5 h-5 text-[#3B82F6]" />
                  <span>Rua das Flores, 123 - Centro</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <Clock className="w-5 h-5 text-[#3B82F6]" />
                  <span>Seg-Sex: 9h às 18h | Sáb: 9h às 17h</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      {/* Header */}
      <header className="bg-[#1F2937] border-b border-gray-600 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">BarberShop</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notificações */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-300 hover:text-white transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {notificacoes.filter(n => !n.lida).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificacoes.filter(n => !n.lida).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1F2937] rounded-lg shadow-lg border border-gray-600 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-600">
                    <h4 className="text-white font-medium">Notificações</h4>
                  </div>
                  {notificacoes.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 hover:bg-gray-600 transition-colors ${!notif.lida ? 'bg-gray-700' : ''}`}>
                      <h5 className="text-white text-sm font-medium">{notif.titulo}</h5>
                      <p className="text-gray-300 text-xs mt-1">{notif.mensagem}</p>
                      <span className="text-gray-400 text-xs">{notif.tempo}</span>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-600">
                    <button className="text-[#3B82F6] text-sm hover:text-blue-400">
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Menu do Perfil */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block">{clienteData.nome}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1F2937] rounded-lg shadow-lg border border-gray-600 py-2 z-50">
                  <button
                    onClick={() => {
                      setActiveTab('perfil')
                      setShowProfileMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-gray-200 hover:text-white hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Meu Perfil
                  </button>
                  <button 
                    onClick={() => {
                      setShowConfiguracoes(true)
                      setShowProfileMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-gray-200 hover:text-white hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configurações
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-200 hover:text-white hover:bg-gray-600 transition-colors">
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Seção de Boas-vindas */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1F2937] to-[#374151] rounded-lg p-6 border border-gray-600">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Olá, {clienteData.nome}! 👋
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#3B82F6]" />
                    <span>(11) 99999-9999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#3B82F6]" />
                    <span>Rua das Flores, 123</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setEditingAgendamento(null)
                  setSelectedBarbeiro('')
                  setSelectedDate('')
                  setSelectedTime('')
                  setSelectedService('')
                  setShowAgendamentoModal(true)
                }}
                className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Novo Agendamento
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Total de Visitas</p>
                <p className="text-white font-bold text-lg">{clienteData.totalVisitas}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Total Gasto</p>
                <p className="text-white font-bold text-lg">R$ {clienteData.totalGasto.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Próximos</p>
                <p className="text-white font-bold text-lg">{clienteData.proximosAgendamentos}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Pontos</p>
                <p className="text-white font-bold text-lg">{clienteData.pontos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação por Abas */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-[#1F2937] p-2 rounded-lg border border-gray-600">
            {[
              { id: 'agendamentos', label: 'Meus Agendamentos', icon: Calendar },
              { id: 'loja', label: 'Loja', icon: Scissors },
              { id: 'historico', label: 'Histórico', icon: History },
              { id: 'perfil', label: 'Meu Perfil', icon: User },
              { id: 'sobre', label: 'Sobre a Barbearia', icon: Info }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-[#3B82F6] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div className="bg-[#1F2937] rounded-lg p-6 border border-gray-600">
          {renderContent()}
        </div>
      </div>

      {/* Modal de Configurações */}
      {showConfiguracoes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1F2937] rounded-lg p-6 w-full max-w-md border border-gray-600">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Configurações</h3>
              <button
                onClick={() => setShowConfiguracoes(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-4">Notificações</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email</span>
                    <button
                      onClick={() => setNotificacoesEmail(!notificacoesEmail)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notificacoesEmail ? 'bg-[#3B82F6]' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notificacoesEmail ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SMS</span>
                    <button
                      onClick={() => setNotificacoesSMS(!notificacoesSMS)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notificacoesSMS ? 'bg-[#3B82F6]' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notificacoesSMS ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Push</span>
                    <button
                      onClick={() => setNotificacoesPush(!notificacoesPush)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notificacoesPush ? 'bg-[#3B82F6]' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notificacoesPush ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Privacidade</h4>
                <div className="space-y-3">
                  <button className="w-full text-left text-gray-300 hover:text-white py-2">
                    Alterar Senha
                  </button>
                  <button className="w-full text-left text-gray-300 hover:text-white py-2">
                    Excluir Conta
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfiguracoes(false)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowConfiguracoes(false)
                  alert('Configurações salvas com sucesso!')
                }}
                className="flex-1 bg-[#3B82F6] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Novo Agendamento com Calendário */}
      {showAgendamentoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1F2937] rounded-lg p-6 w-full max-w-4xl border border-gray-600 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingAgendamento ? 'Editar Agendamento' : 'Novo Agendamento'}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna Esquerda - Calendário */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Escolha a Data</h4>
                
                {/* Navegação do Calendário */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h4 className="font-semibold text-white">
                    {getMonthName(currentMonth)} {currentYear}
                  </h4>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Calendário */}
                <div className="bg-[#374151] rounded-lg p-4 border border-gray-500">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} className="text-center text-gray-300 text-sm p-2">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendar().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (day && day.available) {
                            setSelectedDate(day.date)
                            setSelectedDateForBooking(day.date)
                          }
                        }}
                        disabled={!day || !day.available}
                        className={`p-2 text-sm rounded-lg transition-colors ${
                          day && day.available
                            ? selectedDate === day.date
                              ? 'bg-[#3B82F6] text-white'
                              : 'bg-gray-600 text-white hover:bg-gray-500'
                            : day && day.isPast
                            ? 'text-gray-500 cursor-not-allowed'
                            : day
                            ? 'text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {day ? day.day : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Formulário */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Barbeiro</label>
                  <select
                    value={selectedBarbeiro}
                    onChange={(e) => setSelectedBarbeiro(e.target.value)}
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Selecione um barbeiro</option>
                    {barbeiros.map((barbeiro) => (
                      <option key={barbeiro.id} value={barbeiro.nome}>
                        {barbeiro.nome} - {barbeiro.especialidade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Serviço</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Selecione um serviço</option>
                    {servicos.map((servico) => (
                      <option key={servico.id} value={servico.nome}>
                        {servico.nome} - R$ {servico.preco.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Data Selecionada</label>
                  <input
                    type="text"
                    value={selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''}
                    readOnly
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white"
                    placeholder="Selecione uma data no calendário"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Horário</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#374151] border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Selecione um horário</option>
                    {horarios.map((horario) => (
                      <option key={horario} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Resumo do Agendamento */}
                {selectedBarbeiro && selectedService && selectedDate && selectedTime && (
                  <div className="bg-[#374151] rounded-lg p-4 border border-gray-500">
                    <h5 className="text-white font-medium mb-2">Resumo do Agendamento</h5>
                    <div className="space-y-1 text-sm text-gray-200">
                      <p><strong>Barbeiro:</strong> {selectedBarbeiro}</p>
                      <p><strong>Serviço:</strong> {selectedService}</p>
                      <p><strong>Data:</strong> {new Date(selectedDate).toLocaleDateString('pt-BR')}</p>
                      <p><strong>Horário:</strong> {selectedTime}</p>
                      <p><strong>Valor:</strong> R$ {servicos.find(s => s.nome === selectedService)?.preco.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAgendamentoModal(false)
                  setEditingAgendamento(null)
                }}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleNovoAgendamento}
                className="flex-1 bg-[#3B82F6] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
              >
                {editingAgendamento ? 'Atualizar' : 'Agendar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}