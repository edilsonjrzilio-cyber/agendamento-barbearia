'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface CalendarBooking15Props {
  barberName: string
  date: string | null
  slots15: TimeSlot[]
  onSelectSlot: (slot: string) => void
  onClose: () => void
  selectedSlot?: string | null
  timezone?: string
}

export default function CalendarBooking15({
  barberName,
  date,
  slots15,
  onSelectSlot,
  onClose,
  selectedSlot = null,
  timezone = 'America/Sao_Paulo'
}: CalendarBooking15Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(date)

  // Função para obter nome do mês
  const getMonthName = (month: number) => {
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
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const isPast = new Date(dateStr) < new Date(new Date().toDateString())
      const isToday = dateStr === new Date().toISOString().split('T')[0]
      const isSelected = dateStr === selectedDate
      
      days.push({
        day,
        date: dateStr,
        available: !isPast,
        isPast,
        isToday,
        isSelected
      })
    }
    
    return days
  }

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr)
  }

  const handleSlotSelect = (slot: string) => {
    onSelectSlot(slot)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0b0f14] rounded-2xl p-6 w-full max-w-5xl border border-[#111827] max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Escolha o Horário</h3>
            <p className="text-blue-400 font-medium">Barbeiro: {barberName}</p>
            {selectedDate && (
              <p className="text-blue-400 font-medium">
                Data: {new Date(selectedDate).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Calendário */}
          <div>
            <div className="bg-[#111827] rounded-xl p-6 border border-gray-700">
              {/* Navegação do Calendário */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h4 className="text-xl font-semibold text-white">
                  {getMonthName(currentMonth)} {currentYear}
                </h4>
                <button 
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Dias da Semana */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-center text-gray-400 text-sm p-2 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendário */}
              <div className="grid grid-cols-7 gap-2">
                {generateCalendar().map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && day.available && handleDateSelect(day.date)}
                    disabled={!day || !day.available}
                    className={`p-3 text-sm rounded-lg transition-all duration-200 min-h-[48px] font-medium ${
                      day 
                        ? day.isSelected
                          ? 'bg-[#3b82f6] text-white shadow-lg'
                          : day.isToday
                          ? 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/50'
                          : day.available
                          ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                          : 'text-gray-600 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {day ? day.day : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Horários */}
          <div>
            <div className="bg-[#111827] rounded-xl p-6 border border-gray-700">
              <h4 className="text-xl font-semibold text-white mb-4">
                Horários Disponíveis (15 min)
              </h4>
              
              {/* Legendas */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#22c55e] rounded"></div>
                  <span className="text-gray-300">Disponível</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#ef4444] rounded"></div>
                  <span className="text-gray-300">Ocupado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#3b82f6] rounded"></div>
                  <span className="text-gray-300">Selecionado</span>
                </div>
              </div>

              {/* Grade de Horários */}
              {selectedDate ? (
                <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {slots15.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => slot.available && handleSlotSelect(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 text-sm rounded-xl font-medium transition-all duration-200 ${
                        selectedSlot === slot.time
                          ? 'bg-[#3b82f6] text-white shadow-lg'
                          : slot.available
                          ? 'bg-[#22c55e] text-white hover:bg-[#16a34a] hover:scale-105'
                          : 'bg-[#ef4444] text-white cursor-not-allowed opacity-75'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">📅</div>
                  <p className="text-gray-400">Selecione uma data para ver os horários disponíveis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}