import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: 140,
            height: 140,
          }}
        >
          <div
            style={{
              width: 18,
              height: 14,
              background: '#f97316',
              borderRadius: 6,
              marginBottom: 4,
            }}
          />
          <div
            style={{
              width: 108,
              height: 16,
              background: '#fb923c',
              borderRadius: 16,
              marginBottom: 4,
            }}
          />
          <div
            style={{
              width: 112,
              height: 78,
              background: '#f97316',
              borderRadius: '6px 6px 18px 18px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
