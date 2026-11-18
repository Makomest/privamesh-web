'use client'

import { useState } from 'react'

/**
 * Click-to-play YouTube embed. Until the reader presses play this is a
 * thumbnail and a button: no player script, no iframe, no youtube.com
 * cookies. The player that loads on click is the youtube-nocookie.com one.
 */
export default function YouTubePlayer({
  id,
  title,
  playLabel,
  vertical = false,
  priority = false,
}: {
  id: string
  title: string
  /** Accessible name of the play button, e.g. "Play: <title>". */
  playLabel: string
  /** Shorts are 9:16. */
  vertical?: boolean
  priority?: boolean
}) {
  const [playing, setPlaying] = useState(false)
  // mqdefault is 16:9 with no letterbox; for Shorts the larger frame is cropped
  // to the vertical box by object-cover.
  const [src, setSrc] = useState(
    `https://i.ytimg.com/vi/${id}/${vertical ? 'hqdefault' : priority ? 'maxresdefault' : 'mqdefault'}.jpg`,
  )

  return (
    <div
      className={`relative w-full overflow-hidden rounded-card border border-border bg-bg-elevated ${
        vertical ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a remote thumbnail; the optimizer would only add a hop */}
          <img
            src={src}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/30 transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
