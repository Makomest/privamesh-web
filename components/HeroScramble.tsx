'use client'

import { useEffect, useState } from 'react'

const GLYPHS = '01#$%&*<>{}[]/\\ABCDEF_+=~'

/**
 * One-time "decryption" text-scramble on the highlighted H1 keyword.
 *
 * SEO-safe: the REAL text is always the semantic content of the element (a plain
 * text node, present in SSR HTML and never replaced). The scramble is a purely
 * decorative, aria-hidden overlay that fades out — so crawlers/audits always read
 * the real word, never mid-animation glyphs. Respects prefers-reduced-motion.
 */
export default function HeroScramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    setAnimating(true)
    let frame = 0
    const total = 28
    let raf = 0

    const tick = () => {
      const revealed = Math.floor((frame / total) * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') out += ' '
        else if (i < revealed) out += text[i]
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setDisplay(out)
      frame++
      if (frame <= total) {
        raf = window.setTimeout(() => {
          raf = requestAnimationFrame(tick)
        }, 45) as unknown as number
      } else {
        setAnimating(false)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(raf)
    }
  }, [text])

  return (
    <span className="relative inline-block text-accent">
      {/* Real text — always the semantic content in the DOM (SEO + final state).
          Made transparent (not removed) while the overlay animates. */}
      <span className={animating ? 'opacity-0' : undefined}>{text}</span>
      {/* Decorative scramble overlay, fades out; hidden from a11y and crawlers. */}
      {animating && (
        <span aria-hidden="true" className="absolute inset-0">
          {display}
        </span>
      )}
    </span>
  )
}
