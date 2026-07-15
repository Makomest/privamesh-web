import Image from 'next/image'
import { HOME_SCREENSHOTS } from '@/lib/data'

type Shot = { src: string; title: string; alt: string }

/**
 * Auto-scrolling infinite carousel of app screenshots. Pure CSS marquee (the
 * track is duplicated and translated -50% for a seamless loop). Pauses on
 * hover; stops entirely under prefers-reduced-motion. Edges fade out via a mask.
 * Defaults to the clean HOME_SCREENSHOTS set used on the landing page.
 */
export default function ScreenshotGallery({ shots = HOME_SCREENSHOTS }: { shots?: Shot[] }) {
  const items = [...shots, ...shots]
  return (
    <div className="marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
      <div className="marquee-track flex w-max gap-5 sm:gap-6">
        {items.map((s, i) => {
          const dup = i >= shots.length
          return (
            <figure
              key={i}
              aria-hidden={dup}
              className="flex w-[300px] flex-none flex-col items-center sm:w-[380px]"
            >
              <div className="w-full max-w-[340px]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 640px) 300px, 340px"
                  priority={i < 3}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-center text-base font-semibold text-text-primary">
                {s.title}
              </figcaption>
            </figure>
          )
        })}
      </div>
    </div>
  )
}
