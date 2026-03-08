import { ImageResponse } from 'next/og'

export const alt = 'JSONShift - Free Data Format Converter'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #111 0%, #1a1a2e 100%)',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: '#fff',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 44,
            fontWeight: 700,
            color: '#111',
            marginBottom: 24,
          }}
        >
          {'{}'}
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 12,
          }}
        >
          JSONShift
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#999',
          }}
        >
          Free Online JSON, CSV, YAML, XML & TOML Converter
        </div>
      </div>
    ),
    { ...size }
  )
}
