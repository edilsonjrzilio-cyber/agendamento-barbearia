'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  Users, 
  Smartphone, 
  MessageCircle, 
  BarChart3,
  Star,
  Check,
  ArrowRight,
  Scissors,
  MapPin,
  Phone,
  Mail,
  Shield,
  Zap,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  const features = [
    {
      icon: Calendar,
      title: 'Agenda Inteligente',
      description: 'Sistema completo de agendamentos com visualização em tempo real'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integrado',
      description: 'Notificações automáticas e campanhas de marketing via WhatsApp'
    },
    {
      icon: Users,
      title: 'Gestão de Clientes',
      description: 'Histórico completo, tags personalizadas e notas importantes'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Avançados',
      description: 'Acompanhe receita, ocupação e performance da sua barbearia'
    },
    {
      icon: Smartphone,
      title: 'App Mobile PWA',
      description: 'Experiência nativa no celular, funciona offline'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Dados protegidos com criptografia e backup automático'
    }
  ]

  const plans = [
    {
      name: 'Básico',
      price: 49.90,
      period: '/mês',
      description: 'Ideal para barbearias pequenas',
      features: [
        'Até 2 barbeiros',
        'Agendamentos ilimitados',
        'Notificações WhatsApp',
        'Relatórios básicos',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Profissional',
      price: 89.90,
      period: '/mês',
      description: 'Para barbearias em crescimento',
      features: [
        'Até 5 barbeiros',
        'Agendamentos ilimitados',
        'Notificações WhatsApp',
        'Relatórios avançados',
        'Campanhas de marketing',
        'Loja de produtos',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 149.90,
      period: '/mês',
      description: 'Para redes de barbearias',
      features: [
        'Barbeiros ilimitados',
        'Múltiplas unidades',
        'API personalizada',
        'Relatórios customizados',
        'Integração avançada',
        'Suporte 24/7',
        'Gerente de conta'
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'João Silva',
      business: 'Barbearia Moderna',
      content: 'Aumentei 40% na minha receita depois que comecei a usar o Agende.me. Os clientes adoram a praticidade!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Carlos Mendes',
      business: 'Barbershop Premium',
      content: 'O sistema de WhatsApp é incrível. Reduziu drasticamente os no-shows e melhorou a comunicação.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Pedro Santos',
      business: 'Corte & Estilo',
      content: 'Interface muito fácil de usar. Meus clientes conseguem agendar sozinhos sem problemas.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7]">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0C0C0D]/80 backdrop-blur-md border-b border-[#141416]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-[#0C0C0D]" />
            </div>
            <span className="text-xl font-bold">Agende.me</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-[#F5F5F7]/70 hover:text-[#D4AF37] transition-colors">
              Recursos
            </a>
            <a href="#planos" className="text-[#F5F5F7]/70 hover:text-[#D4AF37] transition-colors">
              Planos
            </a>
            <a href="#depoimentos" className="text-[#F5F5F7]/70 hover:text-[#D4AF37] transition-colors">
              Depoimentos
            </a>
            <a href="#contato" className="text-[#F5F5F7]/70 hover:text-[#D4AF37] transition-colors">
              Contato
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-[#F5F5F7] hover:text-[#D4AF37]">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90 transition-all duration-300 hover:scale-105">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-6 bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
              <Zap className="w-4 h-4 mr-2" />
              Sistema Completo para Barbearias
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F5F5F7] to-[#D4AF37] bg-clip-text text-transparent">
              Transforme sua barbearia em um negócio digital
            </h1>
            
            <p className="text-xl md:text-2xl text-[#F5F5F7]/70 mb-8 max-w-3xl mx-auto">
              Sistema completo de agendamentos com WhatsApp integrado, relatórios avançados e experiência premium para seus clientes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/cadastro">
                <Button size="lg" className="bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90 transition-all duration-300 hover:scale-105 text-lg px-8 py-6">
                  Começar Teste Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-lg px-8 py-6">
                  Ver Demonstração
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-[#F5F5F7]/50">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#D4AF37] mr-2" />
                <span>14 dias grátis</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#D4AF37] mr-2" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-[#D4AF37] mr-2" />
                <span>Suporte incluído</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-4 bg-[#141416]/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que sua barbearia precisa
            </h2>
            <p className="text-xl text-[#F5F5F7]/70 max-w-2xl mx-auto">
              Recursos profissionais para modernizar seu negócio e aumentar sua receita
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#141416] border-[#141416] hover:border-[#D4AF37]/30 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[#F5F5F7]/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos que cabem no seu bolso
            </h2>
            <p className="text-xl text-[#F5F5F7]/70 max-w-2xl mx-auto">
              Escolha o plano ideal para o tamanho da sua barbearia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative bg-[#141416] border-[#141416] transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-[#D4AF37] shadow-2xl shadow-[#D4AF37]/20' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#D4AF37] text-[#0C0C0D] px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-[#F5F5F7]/70 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-[#D4AF37]">
                        R$ {plan.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[#F5F5F7]/70 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-[#D4AF37] mr-3 flex-shrink-0" />
                        <span className="text-[#F5F5F7]/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90' 
                        : 'bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90'
                    }`}
                    size="lg"
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-4 bg-[#141416]/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-[#F5F5F7]/70 max-w-2xl mx-auto">
              Histórias reais de barbeiros que transformaram seus negócios
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#141416] border-[#141416] hover:border-[#D4AF37]/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-[#F5F5F7]/90 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-[#F5F5F7]/70 text-sm">{testimonial.business}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-to-r from-[#D4AF37]/10 to-[#3B82F6]/10 border-[#D4AF37]/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para modernizar sua barbearia?
              </h2>
              <p className="text-xl text-[#F5F5F7]/70 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de barbeiros que já aumentaram sua receita com o Agende.me
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cadastro">
                  <Button size="lg" className="bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90 transition-all duration-300 hover:scale-105 text-lg px-8 py-6">
                    <Heart className="mr-2 w-5 h-5" />
                    Começar Teste Grátis
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button size="lg" variant="outline" className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 text-lg px-8 py-6">
                    Falar com Especialista
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-16 px-4 bg-[#141416]/50 border-t border-[#141416]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-[#0C0C0D]" />
                </div>
                <span className="text-xl font-bold">Agende.me</span>
              </div>
              <p className="text-[#F5F5F7]/70 mb-4">
                Sistema completo de agendamentos para barbearias modernas.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">
                  <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-[#F5F5F7]/70">
                <li><a href="#recursos" className="hover:text-[#D4AF37] transition-colors">Recursos</a></li>
                <li><a href="#planos" className="hover:text-[#D4AF37] transition-colors">Planos</a></li>
                <li><a href="/demo" className="hover:text-[#D4AF37] transition-colors">Demonstração</a></li>
                <li><a href="/api" className="hover:text-[#D4AF37] transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-[#F5F5F7]/70">
                <li><a href="/ajuda" className="hover:text-[#D4AF37] transition-colors">Central de Ajuda</a></li>
                <li><a href="/contato" className="hover:text-[#D4AF37] transition-colors">Contato</a></li>
                <li><a href="/status" className="hover:text-[#D4AF37] transition-colors">Status</a></li>
                <li><a href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-[#F5F5F7]/70">
                <li><a href="/sobre" className="hover:text-[#D4AF37] transition-colors">Sobre</a></li>
                <li><a href="/privacidade" className="hover:text-[#D4AF37] transition-colors">Privacidade</a></li>
                <li><a href="/termos" className="hover:text-[#D4AF37] transition-colors">Termos</a></li>
                <li><a href="/carreiras" className="hover:text-[#D4AF37] transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#141416] mt-12 pt-8 text-center text-[#F5F5F7]/50">
            <p>&copy; 2024 Agende.me. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}