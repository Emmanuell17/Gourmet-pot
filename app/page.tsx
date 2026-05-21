'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import PageBackground from './components/PageBackground'
import OrderBanner from './components/OrderBanner'
import { siteConfig } from '@/lib/site'
import { menuItems } from '@/data/menu'

const featuredIds = [1, 3, 6]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPickupVisible, setIsPickupVisible] = useState(false)
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false)
  const pickupRef = useRef<HTMLDivElement>(null)
  const favoritesRef = useRef<HTMLDivElement>(null)

  const featured = menuItems.filter((item) => featuredIds.includes(item.id))

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (entry.target === pickupRef.current) setIsPickupVisible(true)
          if (entry.target === favoritesRef.current) setIsFavoritesVisible(true)
        })
      },
      { threshold: 0.15 }
    )

    if (pickupRef.current) observer.observe(pickupRef.current)
    if (favoritesRef.current) observer.observe(favoritesRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen relative">
      <PageBackground variant="hero" />

      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1
            className={`font-display text-6xl md:text-8xl font-extrabold mb-6 text-white tracking-wider transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              letterSpacing: '0.1em',
            }}
          >
            {siteConfig.name}
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 text-white/95 transition-all duration-1000 ease-out delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
          >
            {siteConfig.tagline}
          </p>

          <div
            className={`max-w-lg mx-auto mb-10 transition-all duration-1000 ease-out delay-250 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <OrderBanner />
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/menu"
              className="group relative px-10 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <span className="relative z-10">View Menu</span>
              <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            <Link
              href="/order"
              className="group px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black hover:shadow-2xl"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10 px-6 md:px-16 pb-20 space-y-16 max-w-5xl mx-auto">
        <section
          ref={favoritesRef}
          className={`transition-all duration-1000 ease-out ${
            isFavoritesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-display text-3xl font-semibold text-white text-center mb-8">
            Customer favorites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 text-center"
              >
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-orange-400 mt-1">{item.price}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link
              href="/menu"
              className="text-orange-400 font-medium hover:text-orange-300 transition-colors"
            >
              View full menu →
            </Link>
          </p>
        </section>

        <section
          ref={pickupRef}
          className={`transition-all duration-1000 ease-out ${
            isPickupVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/50 max-w-md mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-gray-800 text-center">
              Pickup
            </h2>
            <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
              {siteConfig.pickup.cutoff}
              <br />
              {siteConfig.pickup.summary}
            </p>
            {siteConfig.pickup.address && (
              <p className="text-gray-600 text-center mt-4 text-sm">{siteConfig.pickup.address}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
