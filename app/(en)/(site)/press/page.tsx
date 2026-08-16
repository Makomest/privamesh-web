import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import JsonLd from '@/components/JsonLd'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { pageMetadata } from '@/lib/seo'
import { webPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { APP_STORE } from '@/lib/appstore.generated'

export const metadata: Metadata = pageMetadata({
  title: 'Press kit',
  description:
    'Facts, boilerplate, logo and screenshots for writing about PrivaMesh - including the claims we ask you not to repeat because they would overstate the product.',
  path: '/press',
})

export default function PressPage() {
  return (
    <Container>
      <JsonLd data={webPageLd({
          name: "PrivaMesh press kit",
          description: "Facts, boilerplate and assets for writing about PrivaMesh.",
          path: '/press',
          type: 'WebPage',
        })} />
      <PageHeader
        eyebrow="Press"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Press', path: '/press' },
        ]}
        title="Press kit"
        lead="Everything needed to write about PrivaMesh accurately, including the parts that are less flattering than the marketing."
      />

      <div className="mt-12 max-w-3xl">
        <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-lg font-bold tracking-tight text-text-primary">Fast facts</h2>
          <dl className="mt-4 space-y-3 text-[15px]">
            {[
              ['Product', APP_STORE.name],
              ['Publisher', APP_STORE.seller],
              ['Platform', `iOS ${APP_STORE.minimumOsVersion} or later, iPhone only`],
              ['Version', APP_STORE.version],
              ['Released', APP_STORE.releasedAt.slice(0, 10)],
              ['Price', `${APP_STORE.formattedPrice} download; Plus $${SITE.price.plus}/mo, Pro $${SITE.price.pro}/mo`],
              ['Languages', APP_STORE.languages.join(', ')],
              ['Independent audit', 'Not completed'],
              ['Contact', SITE.supportEmail],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-wrap justify-between gap-4 border-b border-border pb-2 last:border-0">
                <dt className="text-text-muted">{k}</dt>
                <dd className="text-right font-medium text-text-secondary">{v}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>

      <div className="mt-14 max-w-3xl">
        <Prose>
          <h2>Boilerplate</h2>
          <p>
            PrivaMesh is an end-to-end encrypted iOS messenger with no account database and no
            message store. Accounts are BIP-39 recovery phrases generated on the device rather than
            phone numbers, messages travel as encrypted blobs in Solana transaction memos addressed
            to one-time stealth addresses, and the only server the publisher runs is a worker that
            sponsors network fees and never sees plaintext or recipients.
          </p>

          <h2>Please do not write</h2>
          <ul>
            <li>
              <strong>&ldquo;PrivaMesh runs no servers.&rdquo;</strong> It runs one: a fee worker
              that sees an account and a timestamp. The accurate phrasing is no account database and
              no message store.
            </li>
            <li>
              <strong>&ldquo;Audited&rdquo; or &ldquo;battle-tested.&rdquo;</strong> The primitives
              are well studied; this implementation has had no independent audit.
            </li>
            <li>
              <strong>&ldquo;Completely anonymous.&rdquo;</strong> The RPC provider sees your IP,
              and the chain records transaction timing permanently.
            </li>
            <li>
              <strong>&ldquo;Cover traffic hides your timing.&rdquo;</strong> It is optional and off
              by default.
            </li>
          </ul>

          <h2>Assets</h2>
          <p>
            Logo: <a href="/logo.png">logo.png</a>. Screenshots:{' '}
            <a href="/screenshots/01.png">01</a>, <a href="/screenshots/02.png">02</a>,{' '}
            <a href="/screenshots/03.png">03</a>, <a href="/screenshots/04.png">04</a>,{' '}
            <a href="/screenshots/05.png">05</a>. All may be used in coverage without asking.
          </p>

          <h2>Technical detail</h2>
          <p>
            For anything deeper, <Link href="/architecture">the architecture page</Link> lists every
            component and what it observes, <Link href="/threat-model">the threat model</Link> works
            adversary by adversary, and <Link href="/limitations">limitations</Link> is the list of
            what the product does not do. Questions to{' '}
            <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
          </p>
        </Prose>
      </div>

      <RelatedLinks
        links={[
          { href: '/architecture', label: 'Architecture', blurb: 'Every component and what it observes.' },
          { href: '/limitations', label: 'Known limitations', blurb: 'What PrivaMesh does not protect you from.' },
          { href: '/transparency', label: 'Transparency report', blurb: 'Legal requests received, and what could be produced.' },
        ]}
      />
    </Container>
  )
}
