#!/usr/bin/env node
/**
 * IndexNow submitter - pings Bing/Yandex (and other IndexNow engines) with the
 * site's URLs so new/changed pages get crawled fast.
 *
 * Usage:  node scripts/indexnow.mjs [--origin http://localhost:3111] [--dry]
 * Run it after each deploy.
 *
 * URLs come from the live sitemap rather than a list kept by hand. The hand
 * list had drifted badly: it was submitting /features/sol-transfers months
 * after that page became a 301, and none of the pages added since were in it.
 * Reading the sitemap means the two can never disagree again.
 *
 * The key file must be reachable at https://privamesh.org/<KEY>.txt
 * (it lives in /public, so it deploys automatically).
 */

const HOST = 'privamesh.org'
const KEY = 'ce90d171572ed440f80dc66fb15ef9eb'
const ORIGIN = `https://${HOST}`

const args = process.argv.slice(2)
const flag = (name) => {
  const i = args.indexOf(name)
  return i === -1 ? null : args[i + 1]
}
// Where to READ the sitemap from. Defaults to production; point it at a local
// server to check what would be submitted before a deploy.
const readFrom = flag('--origin') ?? ORIGIN
const dry = args.includes('--dry')

const xml = await fetch(`${readFrom}/sitemap.xml`).then((r) => {
  if (!r.ok) throw new Error(`sitemap.xml returned HTTP ${r.status} from ${readFrom}`)
  return r.text()
})

// Rewrite to the production origin: a sitemap read from localhost still lists
// canonical https://privamesh.org URLs, but be explicit rather than assume it.
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim().replace(/^https?:\/\/[^/]+/, ORIGIN))
  .filter((u, i, all) => all.indexOf(u) === i)

if (urlList.length === 0) throw new Error('sitemap.xml contained no <loc> entries')

const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }

if (dry) {
  console.log(`IndexNow dry run - ${urlList.length} URLs from ${readFrom}/sitemap.xml`)
  for (const u of urlList) console.log(`  ${u}`)
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

console.log(`IndexNow: HTTP ${res.status} - submitted ${urlList.length} URLs`)
if (!res.ok) {
  console.error(await res.text())
  process.exitCode = 1
}
