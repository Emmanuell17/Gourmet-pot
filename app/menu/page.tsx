'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function Menu() {
  const [isLoaded, setIsLoaded] = useState(false)
  const menu1Ref = useRef<HTMLDivElement>(null)
  const menu2Ref = useRef<HTMLDivElement>(null)
  const [isMenu1Visible, setIsMenu1Visible] = useState(false)
  const [isMenu2Visible, setIsMenu2Visible] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === menu1Ref.current) {
              setIsMenu1Visible(true)
            } else if (entry.target === menu2Ref.current) {
              setIsMenu2Visible(true)
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (menu1Ref.current) {
      observer.observe(menu1Ref.current)
    }
    if (menu2Ref.current) {
      observer.observe(menu2Ref.current)
    }

    return () => {
      if (menu1Ref.current) {
        observer.unobserve(menu1Ref.current)
      }
      if (menu2Ref.current) {
        observer.unobserve(menu2Ref.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        {/* Animated overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)] animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          {/* Page title */}
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-wider">
              Menu
            </h1>
            <p className="text-xl text-white/90">Discover our culinary offerings</p>
          </div>

          {/* Menu Images Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* First Menu Image - Rice Bowl */}
            <div 
              ref={menu2Ref}
              className={`group transition-all duration-1000 ease-out ${
                isMenu2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800/50">
                  <Image
                    src="/menu2.jpg"
                    alt="Rice Bowl Menu"
                    fill
                    className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Second Menu Image - Soups & Stews */}
            <div 
              ref={menu1Ref}
              className={`group transition-all duration-1000 ease-out delay-200 ${
                isMenu1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800/50">
                  <Image
                    src="/menu1.jpg"
                    alt="Soups & Stews and Sides Menu"
                    fill
                    className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/order"
              className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
            >
              Order Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

