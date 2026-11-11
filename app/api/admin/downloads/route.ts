import { NextResponse } from 'next/server'
import { getDownloadCounts } from '@/lib/downloads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware.

export async function GET() {
  return NextResponse.json({ ok: true, downloads: await getDownloadCounts() })
}
