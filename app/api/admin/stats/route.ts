import { NextResponse } from 'next/server'
import { getTraffic, RANGES, type UmamiRange } from '@/lib/umami'
import { getUpdates } from '@/lib/updates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware.

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  const param = params.get('range') as UmamiRange | null
  const range: UmamiRange = param && RANGES.includes(param) ? param : '7d'

  return NextResponse.json({
    ok: true,
    traffic: await getTraffic(range, params.get('tz')),
    updates: getUpdates().length,
  })
}
