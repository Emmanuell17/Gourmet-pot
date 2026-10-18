import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { siteConfig } from '@/lib/site'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

// Used for link previews (Open Graph / Twitter) and structured data.
// Lives in /public, so it is served from the site root.
const SHARE_IMAGE_PATH = '/menu-rice-bowl.jpg'

export const metadata: Metadata = {
  // Resolves relative URLs (like the share image) to absolute ones
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // Favicons are picked up automatically from app/icon.svg and app/favicon.ico
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    type: 'website',
    locale: 'en_GB',
    siteName: siteConfig.name,
    images: [{ url: SHARE_IMAGE_PATH, alt: `${siteConfig.name} — Nigerian cuisine in Debrecen` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [SHARE_IMAGE_PATH],
  },
}

function RestaurantJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${SHARE_IMAGE_PATH}`,
    servesCuisine: 'Nigerian',
    // Only included when set in lib/site.ts
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Debrecen',
      addressCountry: 'HU',
    },
    sameAs: [siteConfig.instagram.url],
  }

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-black">
        <RestaurantJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
