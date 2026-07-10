#!/usr/bin/env node
/**
 * IndexNow submitter — pings Bing/Yandex (and other IndexNow engines) with the
 * site's URLs so new/changed pages get crawled fast.
 *
 * Usage:  node scripts/indexnow.mjs
 * Run it after each deploy (or wire into a Vercel deploy hook / CI step).
 *
 * The key file must be reachable at https://privamesh.org/<KEY>.txt
 * (it lives in /public, so it deploys automatically).
 */

const HOST = 'privamesh.org'
const KEY = 'ce90d171572ed440f80dc66fb15ef9eb'
const ORIGIN = `https://${HOST}`

const PATHS = [
  '/',
  '/ru',
  '/privacy',
  '/features/no-servers',
  '/features/e2e-encryption',
  '/features/metadata-protection',
  '/features/seed-phrase-accounts',
  '/features/sol-transfers',
  '/compare/privamesh-vs-signal',
  '/compare/privamesh-vs-telegram',
  '/compare/privamesh-vs-session',
  '/best-private-messaging-apps',
  '/alternatives',
  '/guides',
  '/glossary',
  '/about',
  '/blog',
  '/blog/how-double-ratchet-encryption-works',
  '/blog/why-a-messenger-with-servers-can-never-be-fully-private',
]

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList: PATHS.map((p) => `${ORIGIN}${p === '/' ? '' : p}`),
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

console.log(`IndexNow: HTTP ${res.status} — submitted ${body.urlList.length} URLs`)
if (!res.ok) process.exitCode = 1
