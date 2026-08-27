import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import { Button } from '@/components/Button'
import DownloadButton from '@/components/DownloadButton'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { organizationLd, webPageLd } from '@/lib/jsonld'
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
      <JsonLd data={webPageLd({
          name: "About PrivaMesh",
          description: "Who builds PrivaMesh and why.",
          path: '/about',
          type: 'AboutPage',
        })} />
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
          <DownloadButton />
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
            <Link href="/features/no-servers">no account database and no message store</Link> - so
            there is no conversation to subpoena and no inbox to breach. What we do run is one
            worker that pays network fees; <Link href="/architecture">it is named and described</Link>
            {' '}rather than left out of the story.
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
          <p>
            We publish under a project name rather than personal ones. That is a deliberate choice
            for a privacy tool and it is also a fair thing to hold against us: you cannot check our
            CVs. What you can check is everything that actually determines whether the app is
            private - the source, the protocol, the on-chain behaviour, and the cryptographic
            primitives, all of which are public and none of which depend on who we are. We would
            rather be judged on that than on a photograph and a job title.
          </p>

          <h2>What we have not done yet</h2>
          <p>
            PrivaMesh has not been through an independent security audit. It runs on iPhone and,
            since the first desktop build, on Windows - the Windows installer is not code-signed
            yet, and the Android client is written but has no build we are willing to hand out. We
            publish no App Store rating of our own - if you see a rating attributed to us, it did
            not come from us. We would rather state all of that plainly than let a confident
            marketing page imply otherwise.
          </p>
          <p>
            An audit is the single most valuable thing that could be added to this page, and until
            it exists the honest position is that our claims are verifiable in principle - the code
            and protocol are public - but have not been verified by a qualified third party. Treat
            them accordingly.
          </p>

          <h2>The cryptography we build on</h2>
          <p>
            PrivaMesh does not invent cryptography. It composes well-studied primitives that have
            been public and analysed for years:{' '}
            <a
              href="https://signal.org/docs/specifications/x3dh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              X3DH
            </a>{' '}
            for key agreement, the{' '}
            <a
              href="https://signal.org/docs/specifications/doubleratchet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Double Ratchet
            </a>{' '}
            for per-message forward secrecy,{' '}
            <a href="https://csrc.nist.gov/pubs/sp/800/38/d/final" target="_blank" rel="noopener noreferrer">
              AES-256-GCM
            </a>{' '}
            for authenticated encryption, and{' '}
            <a
              href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
              target="_blank"
              rel="noopener noreferrer"
            >
              BIP-39
            </a>{' '}
            for seed phrases. Novel cryptography in a shipping messenger is a warning sign, not a
            feature.
          </p>

          <h2>What we stand for</h2>
          <ul>
            <li>
              <strong>No account database.</strong> The Solana blockchain is the transport, your
              device holds your keys, contacts and history, and the single fee worker we run
              authenticates sends with an anonymous token rather than an account.
            </li>
            <li>
              <strong>No identity.</strong> No phone number, no email - your account is a{' '}
              <Link href="/features/seed-phrase-accounts">BIP-39 seed phrase</Link> you control.
            </li>
            <li>
              <strong>No metadata harvesting.</strong>{' '}
              <Link href="/features/metadata-protection">Stealth addresses</Link> hide who talks to
              whom, and optional cover traffic - off by default - hides when.
            </li>
            <li>
              <strong>Honesty about trade-offs.</strong> Forward secrecy means your seed restores
              your identity, not your chat history. We say so up front, because a tool that hides its trade-offs
              is hiding something.
            </li>
          </ul>

          <h2>How we&rsquo;re funded</h2>
          <p>
            PrivaMesh is a free download with paid tiers. We never sell data - there is none to
            sell. Sending is metered because every message is a Solana transaction with a real
            network fee, which our fee worker pays on your behalf;{' '}
            <Link href="/pricing">the pricing page</Link> shows what that costs and why. Our
            incentives are aligned with your privacy rather than against it.
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
