import fs from 'node:fs'
import path from 'node:path'

export type UpdateType = 'news' | 'update' | 'release'

export type Update = {
  id: string
  type: UpdateType
  title: string
  body: string
  date: string // ISO
}

const FILE = path.join(process.cwd(), 'data', 'updates.json')

function ensureDir() {
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
}

export function getUpdates(): Update[] {
  try {
    if (!fs.existsSync(FILE)) return []
    const arr = JSON.parse(fs.readFileSync(FILE, 'utf8')) as Update[]
    return arr.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  } catch {
    return []
  }
}

export function addUpdate(input: { type: UpdateType; title: string; body: string }): Update {
  const all = getUpdates()
  const update: Update = {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    type: input.type,
    title: input.title.trim(),
    body: input.body.trim(),
    date: new Date().toISOString(),
  }
  ensureDir()
  fs.writeFileSync(FILE, JSON.stringify([update, ...all], null, 2), 'utf8')
  return update
}

export function deleteUpdate(id: string): boolean {
  const all = getUpdates()
  const next = all.filter((u) => u.id !== id)
  if (next.length === all.length) return false
  ensureDir()
  fs.writeFileSync(FILE, JSON.stringify(next, null, 2), 'utf8')
  return true
}

export function typeLabel(t: UpdateType): string {
  return t === 'release' ? 'Release' : t === 'update' ? 'Update' : 'News'
}
