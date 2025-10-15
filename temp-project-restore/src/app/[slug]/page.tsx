'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Scissors,
  User,
  ChevronRight,
  Instagram,
  Facebook,
  MessageCircle
} from 'lucide-react'
import { getBarbeariaBySlug } from '@/lib/services/tenant'
import { Barbearia } from '@/lib/types/tenant'
import { formatCurrency } from '@/lib/utils'

interface Servico {
  id: string
  nome: string
  descricao: string
  preco: number
  duracao: number
  categoria: string
}

interface BarbeiroPublico {
  id: string
  nome: string
  foto?: string
  especialidades: string[]
  avaliacao: number
  total_avaliacoes: number
}

export default function BarbeariaPublicPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [barbearia, setBarbearia] = useState<Barbearia | null>(null)
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  
  // Mock data para desenvolvimento
  const servicos: Servico[] = [
    {
      id: '1',
      nome: 'Corte Masculino',
      descricao: 'Corte moderno e personalizado',
      preco: 35.00,
      duracao: 30,
      categoria: 'Cortes'
    },
    {
      id: '2',
      nome: 'Barba Completa',
      descricao: 'Aparar, modelar e finalizar',
      preco: 25.00,
      duracao: 20,
      categoria: 'Barba'
    },
    {
      id: '3',
      nome: 'Corte + Barba',
      descricao: 'Combo completo',
      preco: 50.00,
      duracao: 45,
      categoria: 'Combos'
    }
  ]

  const barbeiros: BarbeiroPublico[] = [
    {
      id: '1',
      nome: 'João Silva',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      especialidades: ['Cortes Modernos', 'Barba'],
      avaliacao: 4.8,
      total_avaliacoes: 127
    },
    {
      id: '2',
      nome: 'Carlos Santos',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      especialidades: ['Cortes Clássicos', 'Bigode'],
      avaliacao: 4.9,
      total_avaliacoes: 89
    }
  ]

  useEffect(() => {
    async function loadBarbearia() {
      if (!slug) return
      
      try {
        const data = await getBarbeariaBySlug(slug)
        setBarbearia(data)
      } catch (error) {
        console.error('Erro ao carregar barbearia:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadBarbearia()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0D] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!barbearia) {
    return (
      <div className="min-h-screen bg-[#0C0C0D] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Barbearia não encontrada</h1>
          <p className="text-gray-400 mb-6">O link que você acessou não existe ou foi removido.</p>
          <Button onClick={() => window.location.href = '/'}>
            Voltar ao início
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white">
      {/* Header */}
      <header className="bg-[#141416] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {barbearia.logo && (
                <img 
                  src={barbearia.logo} 
                  alt={barbearia.nome}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <h1 className="text-xl font-bold text-white">{barbearia.nome}</h1>
                <p className="text-sm text-gray-400">/{barbearia.slug}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Agende seu horário
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Escolha seu barbeiro, serviço e horário de forma rápida e prática
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
            onClick={() => setShowLogin(true)}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Agora
          </Button>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16 px-4 bg-[#141416]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Nossos Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => (
              <Card key={servico.id} className="bg-[#0C0C0D] border-gray-800 hover:border-blue-600 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{servico.nome}</CardTitle>
                    <Badge className="bg-blue-600/20 text-blue-400">
                      {servico.categoria}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{servico.descricao}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{servico.duracao}min</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(servico.preco)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Barbeiros */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Nossa Equipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {barbeiros.map((barbeiro) => (
              <Card key={barbeiro.id} className="bg-[#141416] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={barbeiro.foto} alt={barbeiro.nome} />
                      <AvatarFallback>
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white">{barbeiro.nome}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white ml-1">{barbeiro.avaliacao}</span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          ({barbeiro.total_avaliacoes} avaliações)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {barbeiro.especialidades.map((esp) => (
                          <Badge key={esp} className="bg-gray-700 text-gray-300 text-xs">
                            {esp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-16 px-4 bg-[#141416]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Contato & Localização</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#0C0C0D] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">contato@{barbearia.slug}.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Rua das Flores, 123 - Centro</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0C0C0D] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Segunda - Sexta</span>
                  <span className="text-white">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sábado</span>
                  <span className="text-white">08:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Domingo</span>
                  <span className="text-red-400">Fechado</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Scissors className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{barbearia.nome}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                <Facebook className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                <MessageCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Powered by <span className="text-blue-400">Agende.me</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-[#141416] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-center">Entrar na {barbearia.nome}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="w-full bg-[#0C0C0D] border border-gray-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-600"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Entrar com WhatsApp
              </Button>
              <div className="text-center">
                <span className="text-gray-400 text-sm">ou</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full border-gray-800 text-white hover:bg-gray-800"
              >
                Continuar com Google
              </Button>
              <div className="flex justify-between pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowLogin(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button 
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Criar conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}