#!/usr/bin/env node
/**
 * Bing Webmaster Tools report.
 *
 * privamesh.org is already verified with Bing (the msvalidate.01 tag is in the
 * root layout metadata), so this works as soon as an API key exists - no
 * further verification step. Bing also feeds Microsoft Copilot, so this is the
 * only search-engine data available before Google Search Console is set up.
 *
 * Get a key: Bing Webmaster Tools -> Settings -> API access -> API key.
 *
 * Usage:
 *   BING_WEBMASTER_API_KEY=xxx node scripts/bing-report.mjs
 *   BING_WEBMASTER_API_KEY=xxx node scripts/bing-report.mjs --json
 *
 * The key is read from the environment or ~/.config/claude-seo/backlinks-api.json
 * ("bing_api_key"). It is never written to the repo.
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const SITE = 'https://privamesh.org'
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json'
const asJson = process.argv.includes('--json')

function loadKey() {
  if (process.env.BING_WEBMASTER_API_KEY) return process.env.BING_WEBMASTER_API_KEY
  const cfg = path.join(os.homedir(), '.config', 'claude-seo', 'backlinks-api.json')
  try {
    if (fs.existsSync(cfg)) {
      const j = JSON.parse(fs.readFileSync(cfg, 'utf8'))
      if (j.bing_api_key) return j.bing_api_key
    }
  } catch {
    /* fall through to the error below */
  }
  return null
}

const KEY = loadKey()
if (!KEY) {
  console.error(`No Bing Webmaster API key found.

Get one:
  1. https://www.bing.com/webmasters  (privamesh.org is already verified)
  2. Settings -> API access -> API key
  3. Then either:
       export BING_WEBMASTER_API_KEY="..."
     or add {"bing_api_key": "..."} to
       ~/.config/claude-seo/backlinks-api.json
`)
  process.exit(1)
}

async function call(method, params = {}) {
  const qs = new URLSearchParams({ apikey: KEY, siteUrl: SITE, ...params })
  const res = await fetch(`${BASE}/${method}?${qs}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  const text = await res.text()
  if (!res.ok) return { __error: `HTTP ${res.status}: ${text.slice(0, 200)}` }
  try {
    return JSON.parse(text).d ?? JSON.parse(text)
  } catch {
    return { __error: `unparseable response: ${text.slice(0, 200)}` }
  }
}

/** Bing returns dates as "/Date(1719792000000)/". */
const bingDate = (v) => {
  const m = typeof v === 'string' && v.match(/\/Date\((\d+)\)\//)
  return m ? new Date(+m[1]).toISOString().slice(0, 10) : v
}

const section = (t) => {
  if (!asJson) console.log(`\n=== ${t} ===`)
}

const out = {}

// --- Rank and traffic -------------------------------------------------------
section('Rank & traffic (last 6 months)')
const traffic = await call('GetRankAndTrafficStats')
out.traffic = traffic
if (!asJson) {
  if (traffic.__error) console.log('  ', traffic.__error)
  else if (!Array.isArray(traffic) || traffic.length === 0) {
    console.log('   No data yet. Normal for a site Bing has not accumulated history for.')
  } else {
    const recent = traffic.slice(-8)
    console.log('   date        impressions  clicks  CTR')
    for (const r of recent) {
      const ctr = r.Impressions ? ((r.Clicks / r.Impressions) * 100).toFixed(1) + '%' : '-'
      console.log(
        `   ${bingDate(r.Date)}  ${String(r.Impressions ?? 0).padStart(11)}  ${String(r.Clicks ?? 0).padStart(6)}  ${ctr}`,
      )
    }
    const totI = traffic.reduce((s, r) => s + (r.Impressions ?? 0), 0)
    const totC = traffic.reduce((s, r) => s + (r.Clicks ?? 0), 0)
    console.log(`   TOTAL: ${totI} impressions, ${totC} clicks`)
  }
}

// --- Query performance ------------------------------------------------------
section('Top queries')
const queries = await call('GetQueryStats')
out.queries = queries
if (!asJson) {
  if (queries.__error) console.log('  ', queries.__error)
  else if (!Array.isArray(queries) || queries.length === 0) console.log('   No query data yet.')
  else {
    const top = [...queries].sort((a, b) => (b.Impressions ?? 0) - (a.Impressions ?? 0)).slice(0, 25)
    console.log('   impressions  clicks  avg pos  query')
    for (const q of top) {
      console.log(
        `   ${String(q.Impressions ?? 0).padStart(11)}  ${String(q.Clicks ?? 0).padStart(6)}  ${String(
          (q.AvgImpressionPosition ?? 0).toFixed?.(1) ?? '-',
        ).padStart(7)}  ${q.Query}`,
      )
    }
  }
}

// --- Indexation -------------------------------------------------------------
section('Indexed URL count')
const indexed = await call('GetUrlCounts')
out.indexed = indexed
if (!asJson) {
  if (indexed.__error) console.log('  ', indexed.__error)
  else console.log('  ', JSON.stringify(indexed).slice(0, 400))
}

// --- Crawl health -----------------------------------------------------------
section('Crawl stats')
const crawl = await call('GetCrawlStats')
out.crawl = crawl
if (!asJson) {
  if (crawl.__error) console.log('  ', crawl.__error)
  else if (!Array.isArray(crawl) || crawl.length === 0) console.log('   No crawl data yet.')
  else {
    const r = crawl.at(-1)
    console.log(
      `   latest ${bingDate(r.Date)}: crawled=${r.CrawledPages ?? 0} inIndex=${r.InIndex ?? 0} ` +
        `blockedByRobots=${r.BlockedByRobotsTxt ?? 0} 404=${r.CrawlErrors ?? 0}`,
    )
  }
}

// --- Backlinks --------------------------------------------------------------
section('Inbound links')
const links = await call('GetLinkCounts', { page: '0' })
out.links = links
if (!asJson) {
  if (links.__error) console.log('  ', links.__error)
  else console.log('  ', JSON.stringify(links).slice(0, 600))
}

// --- SEO issues Bing found --------------------------------------------------
section('Bing SEO issues')
const seo = await call('GetSeoReports')
out.seo = seo
if (!asJson) {
  if (seo.__error) console.log('  ', seo.__error)
  else if (!Array.isArray(seo) || seo.length === 0) console.log('   No issues reported.')
  else for (const s of seo.slice(0, 20)) console.log(`   [${s.Severity}] ${s.Description}`)
}

if (asJson) console.log(JSON.stringify(out, null, 2))
else console.log('\nDone. Re-run after deploying for numbers that reflect the current build.\n')
