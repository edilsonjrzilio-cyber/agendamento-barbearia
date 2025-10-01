'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simular login
    setTimeout(() => {
      setLoading(false)
      
      // Remover formatação do número para comparação
      const cleanPhone = phoneNumber.replace(/\D/g, '')
      
      // Verificar credenciais do admin
      if (cleanPhone === '54996329745' && password === '91557498Jr!') {
        window.location.href = '/admin'
      } else {
        // Aqui você pode adicionar outras verificações de usuário
        // Por enquanto, vamos redirecionar para o painel do barbeiro
        window.location.href = '/painel'
      }
    }, 1500)
  }

  const handleGoogleLogin = () => {
    // Implementar login com Google
    console.log('Login com Google')
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
              <Phone className="w-6 h-6 text-[#0C0C0D]" />
            </div>
            <h1 className="text-2xl font-bold">Agende.me</h1>
          </div>
          
          <h2 className="text-xl font-semibold mb-2">Entrar na sua conta</h2>
          <p className="text-[#F5F5F7]/70">
            Acesse seu painel de controle
          </p>
        </div>

        <Card className="bg-[#141416] border-[#141416]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Login */}
            <Button
              onClick={handleGoogleLogin}
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Número do Celular</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
                  required
                  className="bg-[#0C0C0D] border-[#141416] text-[#F5F5F7] placeholder:text-[#F5F5F7]/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

              <Button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <Link href="/esqueci-senha" className="text-sm text-[#D4AF37] hover:text-[#D4AF37]/80">
                Esqueceu sua senha?
              </Link>
              
              <div className="text-sm text-[#F5F5F7]/70">
                Não tem uma conta?{' '}
                <Link href="/cadastro" className="text-[#D4AF37] hover:text-[#D4AF37]/80">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}