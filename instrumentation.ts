/**
 * Runs once when the server process starts. Used for the one background job
 * the site has: mirroring the YouTube channel (lib/youtube.ts). Keeping it in
 * the site process means nothing else to deploy or keep alive - no cron entry,
 * no secret for an endpoint a cron job would have to call.
 *
 * The import sits inside the NEXT_RUNTIME check so the edge bundle, which has
 * no file system, never pulls it in.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startYoutubeSync } = await import('./lib/youtube-schedule')
    startYoutubeSync()
  }
}
