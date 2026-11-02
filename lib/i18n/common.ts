import type en from '@/messages/en/common.json'

/** Shape of messages/<locale>/common.json: the site chrome. */
export type Common = typeof en

/** Fills {name} placeholders. */
export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
}
