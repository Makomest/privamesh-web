import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'PrivaMesh - Private, end-to-end encrypted messenger. Trust math, not companies.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function dataUri(rel: string) {
  const buf = readFileSync(join(process.cwd(), 'public', rel))
  return `data:image/png;base64,${buf.toString('base64')}`
}

export default function OgImage() {
  const logoSrc = dataUri('logo.png')
  const phoneSrc = dataUri('screenshots/01.png')

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        background: '#000000',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* teal glow backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 78% 30%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 95% 85%, rgba(255,255,255,0.07), transparent 55%)',
        }}
      />

      {/* left: copy */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 700,
          height: '100%',
          padding: '64px',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={56} height={56} alt="" style={{ borderRadius: 13 }} />
          <span style={{ color: '#F2F3F5', fontSize: 32, fontWeight: 700 }}>PrivaMesh</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              color: '#F2F3F5',
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              maxWidth: 600,
            }}
          >
            <span style={{ marginRight: 14 }}>The private messenger that knows</span>
            <span style={{ color: '#FFFFFF', marginRight: 14 }}>nothing</span>
            <span>about you</span>
          </div>
          <div style={{ display: 'flex', color: '#B4B8C5', fontSize: 25, marginTop: 22 }}>
            No servers · No phone number · End-to-end encrypted
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 600 }}>
            Trust math, not companies.
          </span>
          <span style={{ color: '#8B90A0', fontSize: 22, marginTop: 6 }}>privamesh.org</span>
        </div>
      </div>

      {/* right: phone screenshot peeking in */}
      <div
        style={{
          position: 'absolute',
          right: 20,
          top: 70,
          display: 'flex',
          transform: 'rotate(-7deg)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={phoneSrc}
          width={520}
          height={520}
          alt=""
          style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.55))' }}
        />
      </div>
    </div>,
    size,
  )
}
