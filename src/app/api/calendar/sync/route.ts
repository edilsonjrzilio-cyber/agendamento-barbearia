import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { createGoogleCalendarEvent, getGoogleCalendarEvents } from '@/lib/google-calendar'

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken, event } = await request.json()

    if (!accessToken || !refreshToken || !event) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const googleEvent = await createGoogleCalendarEvent(accessToken, refreshToken, event)

    return NextResponse.json({ success: true, event: googleEvent })
  } catch (error) {
    console.error('Error creating Google Calendar event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Missing tokens' }, { status: 400 })
    }

    const events = await getGoogleCalendarEvents(accessToken, refreshToken)

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}