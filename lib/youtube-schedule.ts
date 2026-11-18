import { syncYoutube } from './youtube'

const FIRST_RUN_MS = 20_000
const EVERY_MS = 10 * 60_000

/** Check the channel shortly after boot, then every ten minutes. Production server only. */
export function startYoutubeSync() {
  if (process.env.NODE_ENV !== 'production') return
  if (process.env.NEXT_PHASE === 'phase-production-build') return

  const run = () => {
    syncYoutube()
      .then((r) => {
        if (r.posted.length) console.log(`[youtube] posted ${r.posted.length} new video(s) to /news`)
        if (!r.ok) console.warn(`[youtube] sync failed: ${r.error}`)
      })
      .catch((e) => console.warn('[youtube] sync crashed', e))
  }
  setTimeout(run, FIRST_RUN_MS).unref()
  setInterval(run, EVERY_MS).unref()
}
