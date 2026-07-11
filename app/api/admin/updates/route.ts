import { NextResponse } from 'next/server'
import { addUpdate, deleteUpdate, getUpdates, type UpdateType } from '@/lib/updates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Protected by middleware (admin cookie required).

export async function GET() {
  return NextResponse.json({ ok: true, updates: getUpdates() })
}

export async function POST(req: Request) {
  let body: { type?: string; title?: string; body?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
  const title = String(body.title ?? '').trim()
  const text = String(body.body ?? '').trim()
  const type = (['news', 'update', 'release'].includes(String(body.type)) ? body.type : 'news') as UpdateType
  if (!title || !text) {
    return NextResponse.json({ ok: false, error: 'Title and body required' }, { status: 400 })
  }
  const update = addUpdate({ type, title, body: text })
  return NextResponse.json({ ok: true, update })
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get('id') ?? ''
  const removed = deleteUpdate(id)
  return NextResponse.json({ ok: removed })
}
