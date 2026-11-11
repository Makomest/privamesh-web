import { NextResponse } from 'next/server'
import { getUpdates } from '@/lib/updates'
import { getDownloadCounts } from '@/lib/downloads'
import { getUmamiStats, type UmamiRange } from '@/lib/umami'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware.

export async function GET(req: Request) {
  const param = new URL(req.url).searchParams.get('range')
  const range: UmamiRange = param === '24h' || param === '30d' ? param : '7d'

  // Both are network calls to third parties; neither should hold up the other,
  // and neither is allowed to fail the whole panel - each reports its own state.
  const [downloads, traffic] = await Promise.all([getDownloadCounts(), getUmamiStats(range)])

  return NextResponse.json({
    ok: true,
    updates: getUpdates().length,
    downloads,
    traffic,
  })
}
