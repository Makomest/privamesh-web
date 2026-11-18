import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Button } from '@/components/Button'
import YouTubePlayer from '@/components/YouTubePlayer'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { getVideos, summary, thumb, type Video } from '@/lib/youtube'
import { getMessages } from '@/lib/i18n/messages'
import { getLocale, localePath } from '@/lib/i18n/locales'
import { fill, type Common } from '@/lib/i18n/common'
import type en from '@/messages/en/videos.json'

type T = typeof en
const PAGE = 'videos'
const PATH = '/videos'

export function videosMetadata(locale: string): Metadata {
  const t = getMessages<T>(locale, PAGE)
  return pageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: localePath(locale, PATH),
    locale,
    i18n: { page: PAGE, enPath: PATH },
  })
}

function videoLd(v: Video) {
  return {
    '@type': 'VideoObject',
    name: v.title,
    description: summary(v.description, 300) || v.title,
    thumbnailUrl: [thumb(v.id, 'hq')],
    uploadDate: v.published,
    contentUrl: v.url,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    ...(v.views !== null
      ? {
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'WatchAction' },
            userInteractionCount: v.views,
          },
        }
      : {}),
  }
}

export default function VideosPage({ locale }: { locale: string }) {
  const t = getMessages<T>(locale, PAGE)
  const ui = getMessages<Common>(locale, 'common')
  const tag = getLocale(locale)?.hreflang ?? 'en'
  const date = (iso: string) =>
    new Date(iso).toLocaleDateString(tag, { year: 'numeric', month: 'long', day: 'numeric' })
  const views = (n: number | null) =>
    n === null ? null : fill(t.views, { count: new Intl.NumberFormat(tag).format(n) })

  const all = getVideos()
  const long = all.filter((v) => !v.short)
  const shorts = all.filter((v) => v.short)
  const [latest, ...rest] = long

  return (
    <Container>
      {all.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t.listName,
            itemListElement: all.map((v, i) => ({ '@type': 'ListItem', position: i + 1, item: videoLd(v) })),
          }}
        />
      )}
      <PageHeader
        eyebrow={t.eyebrow}
        crumbLabel={ui.breadcrumb}
        trail={[
          { name: ui.home, path: localePath(locale, '/') },
          { name: t.eyebrow, path: localePath(locale, PATH) },
        ]}
        title={t.title}
        lead={t.lead}
      >
        <Button href={SITE.youtube} external>
          <YouTubeGlyph />
          {t.subscribe}
        </Button>
      </PageHeader>

      {all.length === 0 && <p className="mt-12 text-text-muted">{t.empty}</p>}

      {latest && (
        <section className="mt-12" aria-labelledby="latest-video">
          <h2 id="latest-video" className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            {t.latest}
          </h2>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <YouTubePlayer id={latest.id} title={latest.title} playLabel={fill(t.play, { title: latest.title })} priority />
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-text-primary">{latest.title}</h3>
              <p className="mt-2 font-mono text-xs text-text-muted">
                <time dateTime={latest.published}>{date(latest.published)}</time>
                {views(latest.views) && <> · {views(latest.views)}</>}
              </p>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-text-muted">
                {summary(latest.description)}
              </p>
              <a
                href={latest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-medium text-text-primary hover:underline"
              >
                {t.watch} ↗
              </a>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-16" aria-labelledby="more-videos">
          <h2 id="more-videos" className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            {t.more}
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((v) => (
              <article key={v.id}>
                <YouTubePlayer id={v.id} title={v.title} playLabel={fill(t.play, { title: v.title })} />
                <h3 className="mt-3 font-semibold leading-snug text-text-primary">
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {v.title}
                  </a>
                </h3>
                <p className="mt-1 font-mono text-xs text-text-muted">
                  <time dateTime={v.published}>{date(v.published)}</time>
                  {views(v.views) && <> · {views(v.views)}</>}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {shorts.length > 0 && (
        <section className="mt-16" aria-labelledby="shorts">
          <h2 id="shorts" className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            {t.shorts}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {shorts.map((v) => (
              <article key={v.id}>
                <YouTubePlayer id={v.id} title={v.title} playLabel={fill(t.play, { title: v.title })} vertical />
                <h3 className="mt-2 line-clamp-2 text-sm leading-snug text-text-primary">
                  {v.title.replace(/\s#\S+/g, '')}
                </h3>
                {views(v.views) && <p className="mt-1 font-mono text-xs text-text-muted">{views(v.views)}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {all.length > 0 && <p className="mt-10 text-xs text-text-faint">{t.playerNote}</p>}
    </Container>
  )
}

function YouTubeGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
    </svg>
  )
}
