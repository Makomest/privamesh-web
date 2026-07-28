import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Mail } from 'lucide-react'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FAQ from '@/components/FAQ'
import FadeUp from '@/components/FadeUp'
import JsonLd from '@/components/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { faqPageLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Support',
  description:
    'Help with PrivaMesh: contact us, recovery phrase and new-device questions, adding contacts, subscriptions, deleting your account, and reporting abuse.',
  path: '/support',
  languages: { en: '/support', ru: '/ru/support' },
})

const FAQS = [
  {
    q: 'I reinstalled the app / got a new phone. Where are my chats?',
    a: 'Contacts and chat history are stored only on your device and are never uploaded anywhere, so they cannot be transferred to a new device. Entering your 12-word recovery phrase restores your identity and handle, so people can reach you again, but past conversations stay on the old device. This is a deliberate privacy property, not a bug.',
  },
  {
    q: 'I lost my recovery phrase. Can you restore my account?',
    a: 'No. There is no account server and no copy of your keys anywhere but your device. Without the phrase the account cannot be recovered by anyone, including us. Write the phrase down and store it offline.',
  },
  {
    q: 'How do I sign in on a new device?',
    a: 'On the welcome screen tap "Restore from recovery phrase", enter your 12 words in order, then set a passcode. Do not tap "Create account" - that generates a different, empty account.',
  },
  {
    q: 'How do I add a contact?',
    a: 'Tap + on the main screen and either scan the other person’s QR code or search for their handle. Both sides must add each other before messages can flow.',
  },
  {
    q: 'A message will not send.',
    a: 'Check that you are online, that the contact has been added successfully, and that you still have messages left in your allowance (shown at the top of the main screen). If sending still fails, email us with the time of the attempt and we will look into it.',
  },
  {
    q: 'How do I manage or cancel a subscription?',
    a: 'Subscriptions and message packs are billed by Apple. Open the iOS Settings app, tap your name, then Subscriptions to change or cancel. Refunds are handled by Apple at reportaproblem.apple.com.',
  },
  {
    q: 'How do I delete my account and data?',
    a: 'Profile, then "Reset account", erases the keys, contacts and message history from the device. Because nothing is stored on a server, that removes everything there is.',
  },
  {
    q: 'How do I report abuse or a security issue?',
    a: 'Block the contact from their profile screen, then email privamesh@proton.me with details. For security vulnerabilities, write to the same address with "security" in the subject line.',
  },
]

export default function SupportPage() {
  return (
    <>
      <JsonLd data={faqPageLd(FAQS)} />
      <Container>
        <PageHeader
          eyebrow="Support"
          trail={[
            { name: 'Home', path: '/' },
            { name: 'Support', path: '/support' },
          ]}
          title="Support"
          lead="Questions, bug reports, and account help for PrivaMesh."
        />

        <div className="mt-12 max-w-3xl">
          <FadeUp className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">Contact us</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
              Email{' '}
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="font-medium text-accent hover:underline"
              >
                {SITE.supportEmail}
              </a>
              . We reply within <strong className="text-text-secondary">2 business days</strong>, in
              English or Russian.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
              To help us answer faster, include your device model, your iOS version, and what you
              were doing when the problem happened.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-btn border border-border-accent bg-accent/[0.06] p-4">
              <AlertTriangle
                size={18}
                className="mt-0.5 flex-none text-accent"
                aria-hidden="true"
              />
              <p className="text-[15px] leading-relaxed text-text-secondary">
                Never send us your 12-word recovery phrase. We will never ask for it, and anyone who
                does is trying to steal your account.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                <Mail size={15} aria-hidden="true" />
                Email support
              </a>
              <Link href="/privacy-policy" className="text-text-muted hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-text-muted hover:text-accent">
                Terms of Use
              </Link>
            </div>
          </FadeUp>
        </div>

        <section className="mt-16" aria-labelledby="support-faq">
          <h2
            id="support-faq"
            className="mb-6 text-2xl font-bold tracking-tight text-text-primary"
          >
            Frequently asked questions
          </h2>
          <FAQ items={FAQS} />
        </section>

        <div className="mt-12 max-w-3xl">
          <Prose>
            <p>
              Subscription refunds are handled by Apple, not by us — use{' '}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                reportaproblem.apple.com
              </a>
              . For anything else, email{' '}
              <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>.
            </p>
          </Prose>
        </div>

        <RelatedLinks
          links={[
            {
              href: '/privacy-policy',
              label: 'Privacy Policy',
              blurb: 'Exactly what PrivaMesh does and does not collect - in plain language.',
            },
            {
              href: '/terms',
              label: 'Terms of Use',
              blurb: 'Acceptable use, the block and report tools, and subscription terms.',
            },
            {
              href: '/features/seed-phrase-accounts',
              label: 'Seed phrase accounts',
              blurb: 'Why there is no password reset, and what your 12 words actually control.',
            },
          ]}
        />
      </Container>
    </>
  )
}
