import { NextRequest, NextResponse } from 'next/server'
import { getBarbeariaBySlug } from '@/lib/services/tenant'

export async function tenantFromSlug(request: NextRequest, slug: string) {
  try {
    const barbearia = await getBarbeariaBySlug(slug)
    
    if (!barbearia) {
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Adiciona headers com informações do tenant
    const response = NextResponse.next()
    response.headers.set('x-tenant-id', barbearia.id)
    response.headers.set('x-tenant-slug', barbearia.slug)
    response.headers.set('x-tenant-name', barbearia.nome)
    
    return response
  } catch (error) {
    console.error('Erro ao resolver tenant:', error)
    return NextResponse.redirect(new URL('/500', request.url))
  }
}

export function extractSlugFromPath(pathname: string): string | null {
  // Extrai slug de rotas como /{slug} ou /{slug}/painel
  const segments = pathname.split('/').filter(Boolean)
  
  // Ignora rotas administrativas e de API
  if (segments[0] === 'admin' || segments[0] === 'api' || segments[0] === '_next') {
    return null
  }
  
  // Retorna o primeiro segmento como slug
  return segments[0] || null
}

export function isTenantRoute(pathname: string): boolean {
  const slug = extractSlugFromPath(pathname)
  return slug !== null && !['login', 'register', 'auth'].includes(slug)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Ignora arquivos estáticos e rotas de API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Verifica se é uma rota de tenant
  if (isTenantRoute(pathname)) {
    const slug = extractSlugFromPath(pathname)
    if (slug) {
      return await tenantFromSlug(request, slug)
    }
  }
  
  return NextResponse.next()
}