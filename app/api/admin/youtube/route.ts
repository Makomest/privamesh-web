import { NextResponse } from 'next/server'
import { getVideos, syncYoutube, youtubeStatus } from '@/lib/youtube'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware.

export async function GET() {
  return NextResponse.json({ ok: true, status: youtubeStatus(), latest: getVideos().slice(0, 5) })
}

/** "Check now" in the admin panel: run the sync immediately instead of waiting for the timer. */
export async function POST() {
  const result = await syncYoutube()
  return NextResponse.json({ ok: true, result, status: youtubeStatus(), latest: getVideos().slice(0, 5) })
}
