'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order', href: '/order' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-xl sm:text-2xl font-bold">
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-orange-500' : 'text-white hover:text-orange-500'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/order"
              className="text-sm font-semibold px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-white/10 py-4 space-y-1"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-2 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive ? 'text-orange-500 bg-white/5' : 'text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          <Link
            href="/order"
            className="block mt-2 text-center py-3 bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  )
}
