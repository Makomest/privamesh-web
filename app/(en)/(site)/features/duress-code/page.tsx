import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import { Prose, RelatedLinks } from '@/components/Prose'
import FadeUp from '@/components/FadeUp'
import { Button } from '@/components/Button'
import JsonLd from '@/components/JsonLd'
import PageFaq from '@/components/PageFaq'
import { pageMetadata } from '@/lib/seo'
import { FEATURE_FAQ } from '@/lib/faq'
import { softwareApplicationLd } from '@/lib/jsonld'

export const metadata: Metadata = pageMetadata({
  title: 'Duress Code - A Second Passcode That Wipes the Account',
  description:
    'Two passcodes instead of one. The first opens PrivaMesh; the second erases every message, contact and key on the device, showing nothing to say which you typed.',
  path: '/features/duress-code',
  languages: { en: '/features/duress-code', ru: '/ru/features/duress-code' },
})

type Platform = {
  name: string
  status: string
  detail: string
  shipped: boolean
}

const PLATFORMS: Platform[] = [
  {
    name: 'Windows',
    status: 'Shipped in 1.0.0',
    detail:
      'Both codes are set in Settings. The wipe deletes the local database, reopens it empty, and clears the keys held by Windows DPAPI. The app returns to its first-run state.',
    shipped: true,
  },
  {
    name: 'Android',
    status: 'Shipped in 0.1',
    detail:
      'The wipe closes the database first, then deletes its files together with the write-ahead log, the preference files and the caches, and cancels the background workers that would otherwise reopen them.',
    shipped: true,
  },
  {
    name: 'iPhone',
    status: 'In the source, not yet in the App Store',
    detail:
      'The code is written, tested and public, but the current App Store build is 1.0 from 7 August 2026 and predates it. It arrives in the next release. Until then, the duress code exists on the desktop and Android clients only.',
    shipped: false,
  },
]

export default function DuressCodePage() {
  return (
    <Container>
      <JsonLd data={softwareApplicationLd} />
      <PageHeader
        eyebrow="Duress code"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features/no-servers' },
          { name: 'Duress code', path: '/features/duress-code' },
        ]}
        title="A second passcode that empties the account"
        lead="Set two codes instead of one. The first opens the app. The second erases every message, contact and key on the device and signs you out - no warning, no confirmation, nothing on screen to show which one you typed."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/download">Get PrivaMesh</Button>
          <Button href="/threat-model" variant="ghost">
            When this helps
          </Button>
        </div>
      </PageHeader>

      <p className="mt-8 max-w-3xl border-l-2 border-border-accent pl-5 text-lg leading-relaxed text-text-secondary">
        Encryption answers the question &ldquo;can they read this?&rdquo; It does not answer
        &ldquo;what happens when someone is standing over you asking for the passcode?&rdquo; A
        duress code is an answer to the second question, and a narrow one. Read what it does not do
        before you rely on it.
      </p>

      <div className="mt-12 max-w-3xl">
        <Prose>
          <h2>What happens when you type it</h2>
          <p>
            The lock screen accepts both codes. Typing the real one unlocks the app. Typing the
            duress one runs the wipe and then shows the welcome screen, exactly as a freshly
            installed app would - the same screen, the same wording, no message, no delay, no trace
            of the account that was there a second earlier.
          </p>
          <p>
            The wipe is deliberately ordered so that what is visible goes first. Messages and
            contacts are deleted before keys, so a process killed halfway through leaves a broken
            install rather than a readable conversation. The seed phrase goes out of the Keychain,
            both passcodes are deleted, and biometric unlock is turned off with them.
          </p>
          <p>
            The failed-attempt counter is cleared on the way out too. An app that has just been
            wiped but still refuses passcodes for four minutes is visibly not a fresh install, and
            that detail is the whole point.
          </p>

          <h2>Why the two codes cannot be told apart</h2>
          <p>
            A duress code is worthless if the app behaves differently for it. Two things protect
            that.
          </p>
          <p>
            First, both hashes are stored under the same salt, so entering a code derives one hash
            and compares it against both, in constant time. An earlier version gave the duress code
            its own salt, which meant a second key derivation on every unlock: it doubled the wait
            for everyone, and skipping it on a mismatch would have made the duress path measurably
            faster to someone holding the phone and watching the screen.
          </p>
          <p>
            Second, the duress code must be the same length as your passcode. The keypad submits as
            soon as the last digit is entered, so a code of any other length could never be typed
            at all - it would be a setting that silently did nothing, discovered at the worst
            possible moment. Setting a mismatched length is refused.
          </p>
          <p>
            The passcode itself cannot be changed into the duress code either. The check tests the
            real passcode first, so a collision would resolve as &ldquo;unlock&rdquo; and the duress
            code would quietly stop working. That change is refused.
          </p>

          <h2>What it does not do</h2>
          <p>
            <strong>It does not erase anything off the chain.</strong> Ciphertext already published
            is permanent and public. Without the keys nobody can read it, but the fact that an
            address sent messages, and when, stays visible forever. The duress code destroys the
            copy on your device. It does not unsend.
          </p>
          <p>
            <strong>It does not wipe your phone or computer.</strong> Only PrivaMesh&rsquo;s own
            data goes. Photos, other messengers and everything else are untouched.
          </p>
          <p>
            <strong>It does not warn anyone.</strong> There is no silent alarm, no message to a
            contact and no server to notify - there is{' '}
            <Link href="/features/no-servers">no server at all</Link>. The wipe is the entire
            action.
          </p>
          <p>
            <strong>It does not show a decoy account.</strong> Some tools open a second, innocuous
            profile instead. PrivaMesh empties the real one and shows a first-run app. Which of
            those is safer depends on who is asking and what they already know; ours is the simpler
            promise, and the one we can actually keep.
          </p>
          <p>
            <strong>It cannot help if the device was already imaged.</strong> Someone who copied the
            storage before you typed anything holds that copy. The duress code protects the moment
            you are asked to unlock, not the time before it.
          </p>
          <p>
            <strong>It is not reversible.</strong> Your recovery phrase restores your identity and
            contacts on a new device, never the conversations -{' '}
            <Link href="/limitations">forward secrecy destroys those keys after use</Link>. Typing
            the duress code by accident costs you your history permanently. Choose two codes that
            cannot be confused under pressure.
          </p>

          <h2>Guessing is throttled, both codes alike</h2>
          <p>
            Five wrong entries start an escalating cooldown - 30 seconds, a minute, two, four, on up
            to an hour - shown on screen so the wait is visible rather than mysterious. Biometric
            unlock is refused while a cooldown is running, so it cannot be used to step around the
            wait. The codes are stretched with a slow key derivation before being compared, which is
            what makes guessing a short numeric code expensive for someone holding a copy of the
            storage.
          </p>
          <p>
            Confirming your passcode inside Settings - to reveal the phrase, or to change a code -
            does not count against that throttle. Protecting an already-unlocked app against
            guessing buys nothing, and letting a mistype lock you out of your own account costs
            something real. That check also refuses the duress code: it is not a passcode, and
            accepting it there would let it authorise changes to the setting it exists to protect.
          </p>
        </Prose>
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-text-primary">
        Where it works today
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {PLATFORMS.map((p, i) => (
          <FadeUp
            key={p.name}
            delay={i * 60}
            className="rounded-card border border-border bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold tracking-tight text-text-primary">{p.name}</h3>
            <p
              className={`mt-1 text-sm font-medium ${
                p.shipped ? 'text-text-secondary' : 'text-text-muted'
              }`}
            >
              {p.status}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">{p.detail}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-12 max-w-3xl">
        <Prose>
          <p>
            The behaviour is the same on every client that has it: same two codes, same equal-length
            rule, same constant-time comparison, same cooldown. The differences are only in what a
            wipe has to delete on each system, because a Windows database, an Android database and
            an iOS keychain fail in different ways when you delete them carelessly.
          </p>
          <p>
            All three implementations are open source and can be read before you trust them:{' '}
            <Link href="https://github.com/Makomest/PrivaMesh">iOS</Link>,{' '}
            <Link href="https://github.com/Makomest/privamesh-windows">Windows</Link> and{' '}
            <Link href="https://github.com/Makomest/privamesh-android">Android</Link>.
          </p>
        </Prose>
      </div>

      <PageFaq items={FEATURE_FAQ['duress-code']} />

      <RelatedLinks
        links={[
          {
            href: '/threat-model',
            label: 'Threat model',
            blurb: 'Adversary by adversary, including the one holding your unlocked phone.',
          },
          {
            href: '/limitations',
            label: 'Known limitations',
            blurb: 'What PrivaMesh does not protect you from, stated plainly.',
          },
          {
            href: '/features/seed-phrase-accounts',
            label: 'Seed phrase accounts',
            blurb: 'What a wipe leaves behind, and what twelve words can restore.',
          },
        ]}
      />
    </Container>
  )
}
