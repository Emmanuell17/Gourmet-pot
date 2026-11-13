'use client'

import Link from 'next/link'
import PageBackground from '../components/PageBackground'
import PageHeader from '../components/PageHeader'
import OrderBanner from '../components/OrderBanner'
import { useI18n } from '../components/LocaleProvider'
import { siteConfig, formatPhoneHref } from '@/lib/site'

export default function ContactView() {
  const { messages } = useI18n()

  return (
    <div className="min-h-screen relative">
      <PageBackground />

      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-2xl mx-auto">
          <PageHeader title={messages.contact.title} subtitle={messages.contact.subtitle} />

          <div className="mb-8">
            <OrderBanner />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20 space-y-6">
            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                {messages.contact.instagram}
              </h2>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-lg hover:text-orange-300 transition-colors"
              >
                @{siteConfig.instagram.handle}
              </a>
              <p className="text-white/60 text-sm mt-2">{messages.contact.instagramNote}</p>
            </section>

            {siteConfig.phone ? (
              <section>
                <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                  {messages.contact.phone}
                </h2>
                <a
                  href={formatPhoneHref(siteConfig.phone)}
                  className="text-white text-lg hover:text-orange-300 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </section>
            ) : null}

            {siteConfig.email ? (
              <section>
                <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                  {messages.contact.email}
                </h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white text-lg hover:text-orange-300 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </section>
            ) : null}

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                {messages.contact.pickup}
              </h2>
              <p className="text-white/90 leading-relaxed">{messages.pickup.cutoff}</p>
              <p className="text-white/90 leading-relaxed mt-2">{messages.pickup.summary}</p>
              {siteConfig.pickup.address && (
                <p className="text-white/70 mt-2">{siteConfig.pickup.address}</p>
              )}
              {siteConfig.pickup.mapsUrl ? (
                <a
                  href={siteConfig.pickup.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-orange-400 hover:text-orange-300 text-sm font-medium"
                >
                  {messages.contact.maps}
                </a>
              ) : null}
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                {messages.contact.payment}
              </h2>
              <p className="text-white/90">{messages.payment.note}</p>
              <p className="text-white/70 text-sm mt-2">
                {messages.contact.accepted}: {messages.payment.methods}
              </p>
            </section>

            <Link
              href="/order"
              className="block w-full text-center px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {messages.contact.placeOrder}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
