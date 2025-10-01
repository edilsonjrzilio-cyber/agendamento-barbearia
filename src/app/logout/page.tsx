'use client'

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LogoutPage() {
  useEffect(() => {
    // Simular logout (limpar sessão, tokens, etc.)
    localStorage.removeItem('user')
    sessionStorage.clear()
    
    // Redirecionar após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = '/barbearia-moderna'
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-[#F5F5F7] flex items-center justify-center p-4">
      <Card className="bg-[#141416] border-[#141416] w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogOut className="w-8 h-8 text-[#D4AF37]" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Logout realizado</h1>
          <p className="text-[#F5F5F7]/70 mb-6">
            Você foi desconectado com sucesso. Redirecionando para a página da barbearia...
          </p>
          
          <div className="space-y-3">
            <div className="w-full bg-[#0C0C0D] rounded-lg p-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-[#F5F5F7]/70">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#D4AF37]"></div>
                <span>Redirecionando em 3 segundos...</span>
              </div>
            </div>
            
            <Link href="/barbearia-moderna">
              <Button className="w-full bg-[#D4AF37] text-[#0C0C0D] hover:bg-[#D4AF37]/90">
                Ir para Barbearia Moderna
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Fazer Login Novamente
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}