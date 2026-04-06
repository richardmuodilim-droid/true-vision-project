import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default async function handler() {
  const logoUrl = 'https://www.truevisionproject.com/og-logo.png'

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
        },
        children: [
          // Outer frame
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '28px', left: '28px', right: '28px', bottom: '28px',
                border: '1px solid rgba(255,255,255,0.06)',
              },
            },
          },
          // Logo
          {
            type: 'img',
            props: {
              src: logoUrl,
              width: 150,
              height: 150,
              style: { objectFit: 'contain', filter: 'invert(1)', marginBottom: '28px' },
            },
          },
          // Title
          {
            type: 'p',
            props: {
              style: {
                margin: '0 0 10px',
                fontSize: '28px',
                color: '#ffffff',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
              },
              children: 'TRUE VISION PROJECT',
            },
          },
          // Tagline
          {
            type: 'p',
            props: {
              style: {
                margin: '0 0 36px',
                fontSize: '13px',
                color: '#444444',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
              },
              children: 'BUILT FROM NOTHING',
            },
          },
          // Divider
          {
            type: 'div',
            props: {
              style: {
                width: '1px',
                height: '36px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '36px',
              },
            },
          },
          // Drop label
          {
            type: 'p',
            props: {
              style: {
                margin: '0',
                fontSize: '11px',
                color: '#333333',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
              },
              children: 'DROP 001 — ARCHIVE ACCESS OPEN',
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  )
}
