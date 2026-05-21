import Link from 'next/link'
import { siteConfig, formatPhoneHref } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-20 border-t border-white/10 bg-black/90 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl font-bold mb-3">{siteConfig.name}</p>
          <p className="text-white/70 text-sm leading-relaxed">{siteConfig.tagline}</p>
        </div>

        <div>
          <h2 className="font-semibold text-orange-400 mb-3">Pickup</h2>
          <p className="text-white/70 text-sm leading-relaxed">{siteConfig.pickup.cutoff}</p>
          <p className="text-white/70 text-sm leading-relaxed mt-2">{siteConfig.pickup.summary}</p>
          {siteConfig.pickup.address && (
            <p className="text-white/70 text-sm mt-2">{siteConfig.pickup.address}</p>
          )}
        </div>

        <div>
          <h2 className="font-semibold text-orange-400 mb-3">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-orange-400 transition-colors"
              >
                @{siteConfig.instagram.handle}
              </a>
            </li>
            {siteConfig.phone ? (
              <li>
                <a
                  href={formatPhoneHref(siteConfig.phone)}
                  className="text-white/80 hover:text-orange-400 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
            ) : null}
            {siteConfig.email ? (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/80 hover:text-orange-400 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            ) : null}
          </ul>
          <p className="text-white/50 text-xs mt-4">
            Pay via {siteConfig.payment.methods.join(', ')}.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <p>© {year} {siteConfig.name}</p>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="hover:text-orange-400 transition-colors">
            Home
          </Link>
          <Link href="/menu" className="hover:text-orange-400 transition-colors">
            Menu
          </Link>
          <Link href="/order" className="hover:text-orange-400 transition-colors">
            Order
          </Link>
          <Link href="/contact" className="hover:text-orange-400 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
