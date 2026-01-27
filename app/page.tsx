'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPickupVisible, setIsPickupVisible] = useState(false)
  const pickupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPickupVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (pickupRef.current) {
      observer.observe(pickupRef.current)
    }

    return () => {
      if (pickupRef.current) {
        observer.unobserve(pickupRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Background image for entire page */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
        {/* Dark/Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10">
        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Restaurant name with animation */}
          <h1 
            className={`text-7xl md:text-8xl font-extrabold mb-6 text-white tracking-wider transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              letterSpacing: '0.1em'
            }}
          >
            Gourmet pot
          </h1>
          
          {/* Tagline with animation */}
          <p 
            className={`text-xl md:text-2xl mb-10 text-white/95 transition-all duration-1000 ease-out delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
          >
            Where culinary artistry meets authentic tradition
          </p>
          
          {/* CTA Buttons with animation */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Primary CTA - View Menu */}
            <Link 
              href="/menu"
              className="group relative px-10 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <span className="relative z-10">View Menu</span>
              <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            
            {/* Secondary CTA - Order Now */}
            <Link 
              href="/order"
              className="group px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black hover:shadow-2xl"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          {/* Pickup section */}
          <div 
            ref={pickupRef}
            className={`transition-all duration-1000 ease-out ${
              isPickupVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/50 max-w-md mx-auto">
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-gray-800 text-center">
                Pickup
              </h2>
              <p 
                className="text-lg md:text-xl text-gray-700 text-center leading-relaxed"
                style={{ lineHeight: '1.8' }}
              >
                Orders are accepted throughout the week until Thursday at 6:00 PM.<br />
                All orders are available for pickup on Fridays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

