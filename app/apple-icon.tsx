import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
// Reads app/icon.svg from disk, which the edge runtime cannot do.
export const runtime = 'nodejs'

export default async function AppleIcon() {
  const file = await readFile(path.join(process.cwd(), 'app/icon.svg'), 'utf8')
  // Size the root <svg> itself. A child shape's width attribute must not count.
  const svg = file.replace(
    /<svg\b(?![^>]*\bwidth=)/,
    `<svg width="${size.width}" height="${size.height}"`
  )
  // charset is required so the image renderer can decode the data URI and read the viewBox.
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <img src={src} width={size.width} height={size.height} />
      </div>
    ),
    { ...size }
  )
}
