import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/painel?error=auth_failed', request.url))
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    )

    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Aqui você pode salvar os tokens no banco de dados ou session
    // Por enquanto, vamos redirecionar com sucesso
    const redirectUrl = new URL('/painel?google_auth=success', request.url)
    redirectUrl.searchParams.set('access_token', tokens.access_token!)
    redirectUrl.searchParams.set('refresh_token', tokens.refresh_token!)

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Erro na autenticação Google:', error)
    return NextResponse.redirect(new URL('/painel?error=auth_failed', request.url))
  }
}