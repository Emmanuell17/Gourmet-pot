'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import PageBackground from '../components/PageBackground'
import PageHeader from '../components/PageHeader'
import {
  menuCategories,
  menuImages,
  menuItems,
  type MenuCategoryId,
} from '@/data/menu'

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
          if (!entry.isIntersecting) return
          if (entry.target === menu1Ref.current) setIsMenu1Visible(true)
          if (entry.target === menu2Ref.current) setIsMenu2Visible(true)
        })
      },
      { threshold: 0.2 }
    )

    if (menu1Ref.current) observer.observe(menu1Ref.current)
    if (menu2Ref.current) observer.observe(menu2Ref.current)

    return () => observer.disconnect()
  }, [])

  const itemsForCategory = (categoryId: MenuCategoryId) =>
    menuItems.filter((item) => item.category === categoryId)

  return (
    <div className="min-h-screen relative">
      <PageBackground />

      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title="Menu"
            subtitle="Discover our culinary offerings"
            isLoaded={isLoaded}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div
              ref={menu2Ref}
              className={`group transition-all duration-1000 ease-out ${
                isMenu2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800/50">
                  <Image
                    src={menuImages.menu2.src}
                    alt={menuImages.menu2.alt}
                    fill
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-white/80 text-center mt-4 text-sm">Rice bowls</p>
              </div>
            </div>

            <div
              ref={menu1Ref}
              className={`group transition-all duration-1000 ease-out delay-200 ${
                isMenu1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800/50">
                  <Image
                    src={menuImages.menu1.src}
                    alt={menuImages.menu1.alt}
                    fill
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-white/80 text-center mt-4 text-sm">Soups, stews & sides</p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {menuCategories.map((category) => {
              const items = itemsForCategory(category.id)
              if (items.length === 0) return null

              return (
                <section
                  key={category.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
                >
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                    {category.label}
                  </h2>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-wrap justify-between gap-2 py-3 border-b border-white/10 last:border-0"
                      >
                        <div>
                          <span className="text-white font-medium">{item.name}</span>
                          {item.description && (
                            <p className="text-white/60 text-sm mt-0.5">{item.description}</p>
                          )}
                        </div>
                        <span className="text-orange-400 font-semibold whitespace-nowrap">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>

          <div className="mt-12 text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
            >
              ← Back to Home
            </Link>
            <Link
              href="/order"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 hover:scale-105 transition-all duration-300"
            >
              Order Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
