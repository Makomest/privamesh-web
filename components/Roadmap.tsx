'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ROADMAP, STAGES, TRACKS, type Locale, type Stage, type Track } from '@/lib/roadmap'

const STAGE_LABEL: Record<Stage, Record<Locale, string>> = {
  shipped: { en: 'Shipped', ru: 'Вышло' },
  building: { en: 'Building now', ru: 'Делаем сейчас' },
  next: { en: 'Next', ru: 'Дальше' },
  later: { en: 'Later', ru: 'Потом' },
}

const STAGE_HINT: Record<Stage, Record<Locale, string>> = {
  shipped: { en: 'Out, dated by when it reached people', ru: 'Вышло, с датой, когда дошло до людей' },
  building: { en: 'Written and tested, not yet released', ru: 'Написано и проверено, ещё не вышло' },
  next: { en: 'Queued after the current release', ru: 'В очереди после текущего релиза' },
  later: { en: 'Planned, further out', ru: 'В планах, дальше' },
}

const TRACK_LABEL: Record<Track | 'all', Record<Locale, string>> = {
  all: { en: 'Everything', ru: 'Всё' },
  ios: { en: 'iPhone', ru: 'iPhone' },
  android: { en: 'Android', ru: 'Android' },
  windows: { en: 'Windows', ru: 'Windows' },
  protocol: { en: 'Protocol & audit', ru: 'Протокол и аудит' },
}

const UI = {
  here: { en: 'We are here', ru: 'Мы здесь' },
  noDate: { en: 'No date', ru: 'Без даты' },
  details: { en: 'What is in it', ru: 'Что внутри' },
  empty: { en: 'Nothing on this track at this stage.', ru: 'На этой платформе на этом этапе ничего нет.' },
  filter: { en: 'Show', ru: 'Показать' },
  rail: { en: 'Stages', ru: 'Этапы' },
}

const MONTHS: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
}

// Formatted by hand rather than with Intl, whose month abbreviations differ
// between Node and browsers and would make the server and client HTML disagree.
function formatDate(iso: string, locale: Locale) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[locale][m - 1]} ${y}`
}

function Dot({ stage }: { stage: Stage }) {
  if (stage === 'building') {
    return (
      <span className="relative flex h-3.5 w-3.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-warning opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-warning" />
      </span>
    )
  }
  const cls =
    stage === 'shipped'
      ? 'bg-text-primary'
      : stage === 'next'
        ? 'border-2 border-text-primary bg-bg-base'
        : 'border border-dashed border-text-faint bg-bg-base'
  return <span className={`block h-3.5 w-3.5 rounded-full ${cls}`} aria-hidden="true" />
}

export default function Roadmap({ locale }: { locale: Locale }) {
  const [track, setTrack] = useState<Track | 'all'>('all')
  const visible = ROADMAP.filter((i) => track === 'all' || i.track === track)

  return (
    <div>
      <nav aria-label={UI.rail[locale]} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAGES.map((stage) => {
          const count = visible.filter((i) => i.stage === stage).length
          const current = stage === 'building'
          return (
            <a
              key={stage}
              href={`#stage-${stage}`}
              className={`group rounded-card border p-4 transition-colors ${
                current
                  ? 'border-warning/60 bg-warning/[0.07]'
                  : 'border-border bg-white/[0.03] hover:border-border-hover'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Dot stage={stage} />
                <span className="text-sm font-semibold text-text-primary">
                  {STAGE_LABEL[stage][locale]}
                </span>
              </div>
              <p className="mt-2 font-mono text-2xl font-bold text-text-primary">{count}</p>
              <p className="mt-1 text-[13px] leading-snug text-text-muted">
                {current ? UI.here[locale] : STAGE_HINT[stage][locale]}
              </p>
            </a>
          )
        })}
      </nav>

      <div
        role="group"
        aria-label={UI.filter[locale]}
        className="mt-8 flex flex-wrap gap-2"
      >
        {(['all', ...TRACKS] as const).map((t) => {
          const active = track === t
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setTrack(t)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-text-primary bg-text-primary text-bg-base'
                  : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
              }`}
            >
              {TRACK_LABEL[t][locale]}
            </button>
          )
        })}
      </div>

      <ol className="relative mt-10 max-w-3xl border-l border-border pl-8">
        {STAGES.map((stage) => {
          const items = visible.filter((i) => i.stage === stage)
          return (
            <li key={stage} id={`stage-${stage}`} className="scroll-mt-28 pb-10 last:pb-0">
              {stage === 'building' && (
                <div className="relative -ml-8 mb-6 flex items-center gap-3 pl-8">
                  <span className="absolute -left-[7px] top-1/2 -translate-y-1/2">
                    <Dot stage="building" />
                  </span>
                  <span className="rounded-full border border-warning/60 bg-warning/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-warning">
                    {UI.here[locale]}
                  </span>
                </div>
              )}
              <h2 className="text-xl font-bold tracking-tight text-text-primary">
                {STAGE_LABEL[stage][locale]}
              </h2>
              <p className="mt-1 text-sm text-text-muted">{STAGE_HINT[stage][locale]}</p>

              {items.length === 0 ? (
                <p className="mt-4 text-[15px] text-text-faint">{UI.empty[locale]}</p>
              ) : (
                <ul className="mt-5 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="relative">
                      <span className="absolute -left-[39px] top-6">
                        <Dot stage={item.stage} />
                      </span>
                      <details
                        open={item.stage === 'building'}
                        className={`group rounded-card border p-5 backdrop-blur-sm transition-colors sm:p-6 ${
                          item.stage === 'building'
                            ? 'border-warning/50 bg-warning/[0.05]'
                            : 'border-border bg-white/[0.03] hover:border-border-hover'
                        }`}
                      >
                        <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <h3 className="text-lg font-bold tracking-tight text-text-primary">
                                {item.title[locale]}
                              </h3>
                              <span className="rounded-full border border-border px-2 py-0.5 text-xs text-text-muted">
                                {TRACK_LABEL[item.track][locale]}
                              </span>
                            </div>
                            <p className="mt-1 font-mono text-xs text-text-faint">
                              {item.date ? (
                                <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
                              ) : (
                                UI.noDate[locale]
                              )}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                              {item.summary[locale]}
                            </p>
                          </div>
                          <ChevronDown
                            size={18}
                            className="mt-1 flex-none text-text-muted transition-transform group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>
                        <div className="mt-4 border-t border-border pt-4">
                          <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
                            {UI.details[locale]}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {item.points[locale].map((p) => (
                              <li
                                key={p}
                                className="flex gap-2.5 text-[15px] leading-relaxed text-text-muted"
                              >
                                <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-text-muted" aria-hidden="true" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
