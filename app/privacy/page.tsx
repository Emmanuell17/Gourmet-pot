import type { Metadata } from 'next'
import Link from 'next/link'
import PageBackground from '../components/PageBackground'
import PageHeader from '../components/PageHeader'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy notice',
  description: `How ${siteConfig.name} uses the details you give when you place a pickup order.`,
}

export default function Privacy() {
  return (
    <div className="min-h-screen relative">
      <PageBackground />

      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-2xl mx-auto">
          <PageHeader title="Privacy notice" subtitle="What we keep, and why" />

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20 space-y-8 text-white/90 leading-relaxed">
            <p>
              {siteConfig.name} is a restaurant in Debrecen. This notice explains what happens to
              the details you enter when you place a pickup order on this website.
            </p>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                Who is responsible
              </h2>
              <p>
                {siteConfig.name}, {siteConfig.pickup.address}. For a question about your details,
                message{' '}
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 underline underline-offset-2"
                >
                  @{siteConfig.instagram.handle}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                What we collect
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your name, email address, and phone number</li>
                <li>Any note you add, such as a protein choice</li>
                <li>The dishes, quantities, and total in your order</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                Why we use it
              </h2>
              <p>
                We use these details to prepare your order, contact you about pickup or payment,
                and send you a confirmation email. We do not sell them, and we do not use them for
                advertising.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                Where it is stored
              </h2>
              <p>
                The website does not keep orders in a database. When you submit, the order is sent
                by email to the kitchen, and a confirmation is sent to you. Those emails stay in
                the inboxes until they are deleted.
              </p>
              <p className="mt-3">
                Until you submit, your cart and the details you have typed are saved in this
                browser (local storage) so a refresh does not clear the form. Submitting an order
                clears the cart. You can remove the saved details yourself by clearing this site’s
                data in your browser.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                How long we keep it
              </h2>
              <p>
                We keep an order email long enough to cook, hand over, and sort out payment for
                that week’s pickup, and for a short time after in case you ask about the order.
                Ask us if you want it deleted sooner.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-orange-400 mb-2">
                Your choices
              </h2>
              <p>
                You can ask what details we have about you, ask us to correct them, or ask us to
                delete them. Message @{siteConfig.instagram.handle}. You can also complain to the
                Hungarian data protection authority (NAIH) if you think your details have been
                handled wrongly.
              </p>
            </section>

            <Link
              href="/order"
              className="inline-block text-orange-400 hover:text-orange-300 font-medium"
            >
              ← Back to order
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
