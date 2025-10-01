'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Mail, Phone, ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState<'barbeiro' | 'cliente'>('barbeiro')
  const [loading, setLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptWhatsApp, setAcceptWhatsApp] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) return
    
    setLoading(true)
    
    // Simular cadastro
    setTimeout(() => {
      setLoading(false)
      if (accountType === 'barbeiro') {
        window.location.href = '/painel'
      } else {
        window.location.href = '/cliente'
      }
    }, 2000)
  }

  const handleGoogleSignup = () => {
    // Implementar cadastro com Google
    console.log('Cadastro com Google')
  }

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-[#D4AF37] hover:text-[#D4AF37]/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#0C0C0D]" />
            </div>
            <h1 className="text-2xl font-bold">Agende.me</h1>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Criar sua conta</h2>
          <p className="text-[#F5F5F7]/70">
            Comece seu teste grátis de 14 dias
          </p>
        </div>

        <Card className="bg-[#141416] border-[#141416]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Cadastro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Signup */}
            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full border-[#D4AF37]/30 text-[#F5F5F7] hover:bg-[#D4AF37]/10"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-[#141416]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#141416] px-2 text-[#F5F5F7]/50">ou</span>
              </div>
            </div>

            {/* Account Type Toggle */}
            <div className="flex rounded-lg bg-[#0C0C0D] p-1">
              <button
                type="button"
                onClick={() => setAccountType('barbeiro')}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  accountType === 'barbeiro'
                    ? 'bg-[#D4AF37] text-[#0C0C0D]'
                    : 'text-[#F5F5F7]/70 hover:text-[#F5F5F7]'
                }`}
              >
                Sou Barbeiro
              </button>
              <button
                type="button"
                onClick={() => setAccountType('cliente')}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  accountType === 'cliente'
                    ? 'bg-[#D4AF37] text-[#0C0C0D]'
                    : 'text-[#F5F5F7]/70 hover:text-[#F5F5F7]'
                }`}
              >
                Sou Cliente
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="João"
                    required
                    className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Silva"
                    required
                    className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  required
                  className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50"
                />
              </div>

              {accountType === 'barbeiro' && (
                <div className="space-y-2">
                  <Label htmlFor="barbershop">Nome da Barbearia</Label>
                  <Input
                    id="barbershop"
                    placeholder="Barbearia Moderna"
                    required
                    className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F7]/50 hover:text-[#F5F5F7]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Digite a senha novamente"
                    required
                    className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5F5F7]/50 hover:text-[#F5F5F7]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* LGPD Compliance */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-[#F5F5F7]/90 leading-relaxed">
                    Aceito os{' '}
                    <Link href="/termos" className="text-[#D4AF37] hover:text-[#D4AF37]/80">
                      Termos de Uso
                    </Link>{' '}
                    e{' '}
                    <Link href="/privacidade" className="text-[#D4AF37] hover:text-[#D4AF37]/80">
                      Política de Privacidade
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="whatsapp"
                    checked={acceptWhatsApp}
                    onCheckedChange={(checked) => setAcceptWhatsApp(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="whatsapp" className="text-sm text-[#F5F5F7]/90 leading-relaxed">
                    Aceito receber notificações via WhatsApp sobre meus agendamentos
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90"
                disabled={loading || !acceptTerms}
              >
                {loading ? 'Criando conta...' : 'Criar Conta Grátis'}
              </Button>
            </form>

            <div className="text-center">
              <div className="text-sm text-[#F5F5F7]/70">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-[#D4AF37] hover:text-[#D4AF37]/80">
                  Entrar
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}