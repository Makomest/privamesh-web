import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

function logoDataUri() {
  const buf = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  return `data:image/png;base64,${buf.toString('base64')}`
}

/**
 * Shared text OG card (dark, teal, logo + title). Used by per-route
 * opengraph-image files so shared links show the actual page, not the homepage.
 */
export function ogImage(title: string, eyebrow?: string) {
  const logoSrc = logoDataUri()
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0B0F',
          padding: '68px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 85% 20%, rgba(0,168,150,0.26), transparent 55%), radial-gradient(circle at 95% 90%, rgba(0,192,168,0.18), transparent 55%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={54} height={54} alt="" style={{ borderRadius: 13 }} />
          <span style={{ color: '#F2F3F5', fontSize: 30, fontWeight: 700 }}>PrivaMesh</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          {eyebrow ? (
            <span
              style={{
                color: '#14D9B4',
                fontSize: 24,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 2,
                marginBottom: 18,
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <div
            style={{
              display: 'flex',
              color: '#F2F3F5',
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <span style={{ color: '#14D9B4', fontSize: 24, fontWeight: 600 }}>
            Trust math, not companies.
          </span>
          <span style={{ color: '#8B90A0', fontSize: 22 }}>privamesh.org</span>
        </div>
      </div>
    ),
    ogSize,
  )
}
