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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
}

function RestaurantJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: siteConfig.description,
    servesCuisine: 'Nigerian',
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
