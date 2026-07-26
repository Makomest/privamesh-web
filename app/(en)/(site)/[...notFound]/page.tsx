import { notFound } from 'next/navigation'

/**
 * With two root layouts there is no app/not-found.tsx Next can fall back to,
 * so unmatched URLs would render Next's unstyled built-in 404. This catch-all
 * pulls them into the (en) group and triggers app/(en)/not-found.tsx instead.
 * Real routes still win — a catch-all is the lowest-priority match.
 */
export default function CatchAllNotFound() {
  notFound()
}
