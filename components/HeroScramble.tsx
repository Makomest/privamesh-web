'use client'

import { useEffect, useRef, useState } from 'react'

const GLYPHS = '01#$%&*<>{}[]/\\ABCDEF_+=~'

/**
 * One-time "decryption" text-scramble on the highlighted H1 keyword.
 * The site's single signature animation. Respects prefers-reduced-motion.
 */
export default function HeroScramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(text)
      return
    }

    const target = text
    let frame = 0
    const total = 28
    let raf = 0

    const tick = () => {
      const progress = frame / total
      const revealed = Math.floor(progress * target.length)
      let out = ''
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') {
          out += ' '
        } else if (i < revealed) {
          out += target[i]
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setDisplay(out)
      frame++
      if (frame <= total) {
        raf = window.setTimeout(() => {
          raf = requestAnimationFrame(tick)
        }, 45) as unknown as number
      } else {
        setDisplay(target)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(raf)
    }
  }, [text])

  return (
    <span ref={ref} className="text-accent" aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
