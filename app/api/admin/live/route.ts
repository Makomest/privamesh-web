import { NextResponse } from 'next/server'
import { getLive } from '@/lib/umami'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware. Polled every few seconds by the admin panel.

export async function GET() {
  return NextResponse.json({ ok: true, live: await getLive() })
}
