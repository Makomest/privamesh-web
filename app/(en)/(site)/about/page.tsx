import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import { Button } from '@/components/Button'
import AppStoreButton from '@/components/AppStoreButton'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { organizationLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'About PrivaMesh - The Team & Mission',
  description:
    'Who builds PrivaMesh and why. An open-source, serverless, end-to-end encrypted messenger on Solana, built to make you trust math instead of companies.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <Container>
      <JsonLd data={organizationLd} />
      <PageHeader
        eyebrow="About"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
        title="Trust math, not companies"
        lead="PrivaMesh exists because privacy shouldn't depend on trusting a company to behave. We removed the company."
      >
        <div className="flex flex-wrap gap-3">
          <AppStoreButton />
          <Button href={SITE.whitepaper} external variant="ghost">
            Read the White Paper
          </Button>
        </div>
      </PageHeader>

      <div className="mt-14">
        <Prose>
          <h2>Our mission</h2>
          <p>
            Most &ldquo;private&rdquo; messengers ask you to trust that their servers won&rsquo;t
            log, leak, or hand over your data. PrivaMesh takes a different position: you
            shouldn&rsquo;t have to trust anyone. We build messaging where privacy is guaranteed by
            cryptography and architecture, not by a promise. There is{' '}
            <Link href="/features/no-servers">no PrivaMesh server</Link> - nothing to subpoena,
            breach, log, or shut down.
          </p>

          <h2>Who builds it</h2>
          <p>
            PrivaMesh is built by a small, privacy-focused team of engineers and cryptography
            practitioners, working in the open. The app is{' '}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              open source on GitHub
            </a>
            , and the full design is documented in our{' '}
            <a href={SITE.whitepaper} target="_blank" rel="noopener noreferrer">
              white paper
            </a>
            . Open source matters for a security tool: you don&rsquo;t have to take our word for how
            it works - you can read the code and the protocol yourself.
          </p>

          <h2>What we stand for</h2>
          <ul>
            <li>
              <strong>No servers.</strong> The Solana blockchain is the transport; your device holds
              your keys, contacts and history.
            </li>
            <li>
              <strong>No identity.</strong> No phone number, no email - your account is a{' '}
              <Link href="/features/seed-phrase-accounts">BIP-39 seed phrase</Link> you control.
            </li>
            <li>
              <strong>No metadata harvesting.</strong>{' '}
              <Link href="/features/metadata-protection">Stealth addresses and cover traffic</Link>{' '}
              hide who talks to whom, and when.
            </li>
            <li>
              <strong>Honesty about trade-offs.</strong> Forward secrecy means your seed restores
              funds, not chat history. We say so up front, because a tool that hides its trade-offs
              is hiding something.
            </li>
          </ul>

          <h2>How we&rsquo;re funded</h2>
          <p>
            PrivaMesh has a free tier and an optional paid tier. We never sell data - there is no
            data to sell, and no server to collect it on. Sending messages costs a tiny Solana
            network fee paid in SOL, not to us. Our incentives are aligned with your privacy, not
            against it.
          </p>

          <h2>Get in touch</h2>
          <p>
            Follow development on{' '}
            <a href={SITE.twitter} target="_blank" rel="noopener noreferrer">
              X
            </a>{' '}
            and{' '}
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            . Contributions, audits and hard questions are welcome - that&rsquo;s how a serious
            privacy tool earns trust.
          </p>
        </Prose>
      </div>

      <RelatedLinks
        links={[
          {
            href: '/privacy',
            label: 'Why PrivaMesh is private',
            blurb: 'The full case: no servers, no phone number, no metadata.',
          },
          {
            href: '/features/no-servers',
            label: 'No servers',
            blurb: 'The serverless architecture that removes the operator you’d otherwise trust.',
          },
          {
            href: '/blog',
            label: 'Blog',
            blurb: 'Plain-English writing on encryption and metadata.',
          },
        ]}
      />
    </Container>
  )
}
