'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import PageBackground from '../components/PageBackground'
import PageHeader from '../components/PageHeader'
import OrderBanner from '../components/OrderBanner'
import { menuItems, formatItemLineTotal } from '@/data/menu'
import {
  calculateCartTotal,
  getCartItemCount,
  getOrderLineItems,
} from '@/lib/menuOrder'
import {
  loadCart,
  saveCart,
  loadCustomerInfo,
  saveCustomerInfo,
  clearCartStorage,
  type StoredCustomerInfo,
} from '@/lib/cartStorage'
import { getOrderWindowStatus } from '@/lib/orderWindow'
import { siteConfig, formatPhoneHref } from '@/lib/site'

type CustomerInfo = StoredCustomerInfo

export default function Order() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [orderOpen, setOrderOpen] = useState(true)
  const [hydrated, setHydrated] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    setQuantities(loadCart())
    const saved = loadCustomerInfo()
    if (saved) setCustomerInfo(saved)
    setOrderOpen(getOrderWindowStatus().isOpen)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveCart(quantities)
  }, [quantities, hydrated])

  useEffect(() => {
    if (!hydrated) return
    saveCustomerInfo(customerInfo)
  }, [customerInfo, hydrated])

  useEffect(() => {
    if (submitStatus === 'success' && getCartItemCount(quantities) === 0 && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [submitStatus, quantities])

  const updateQuantity = (id: number, change: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0
      const newQuantity = Math.max(0, current + change)
      if (newQuantity === 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newQuantity }
    })
  }

  const itemCount = getCartItemCount(quantities)
  const total = calculateCartTotal(quantities)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderOpen) {
      setSubmitStatus('error')
      setSubmitMessage('Ordering is closed for this week. Check back Sunday or message us on Instagram.')
      return
    }

    if (itemCount === 0) {
      setSubmitStatus('error')
      setSubmitMessage('Please select at least one item to order.')
      return
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setSubmitStatus('error')
      setSubmitMessage('Please fill in all required fields (Name, Email, Phone).')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const orderItems = getOrderLineItems(quantities)

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo,
          orderItems,
          total,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setSubmitMessage(
          `Order sent successfully. ${siteConfig.payment.note} (${siteConfig.payment.methods.join(', ')}).`
        )
        setQuantities({})
        clearCartStorage()
        setCustomerInfo({
          name: '',
          email: '',
          phone: '',
          address: '',
          notes: '',
        })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.message || 'Failed to send order. Please try again or contact us.')
      }
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Failed to send order. Please try again or contact us.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen relative pb-28 md:pb-16">
      <PageBackground />

      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <PageHeader title="Order Now" subtitle="Select items from our menu" isLoaded={isLoaded} />

          <div className="mb-8">
            <OrderBanner />
          </div>

          {itemCount === 0 && submitStatus === 'success' && (
            <div
              ref={successRef}
              className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-green-500/50 mb-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/30 text-green-400 mb-6 text-4xl">
                ✓
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Order placed
              </h2>
              <p className="text-white/95 text-lg mb-2">{submitMessage}</p>
              <p className="text-white/70 text-sm">
                {siteConfig.pickup.cutoff} {siteConfig.pickup.summary}
              </p>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 mb-8">
            <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Menu Items</h2>
            {!orderOpen && (
              <p className="text-amber-200/90 text-center text-sm mb-6 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                Ordering is currently closed. You can still browse the menu — check the banner above
                for when we reopen.
              </p>
            )}
            <div className="space-y-4">
              {menuItems.map((item) => {
                const quantity = quantities[item.id] || 0
                return (
                  <div
                    key={item.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <span className="text-orange-500 font-bold text-lg">{item.id}.</span>
                          <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                        </div>
                        <p className="text-white/70 ml-8 mt-1">{item.price}</p>
                        {item.description && (
                          <p className="text-white/50 ml-8 mt-1 text-sm">{item.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-10 h-10 rounded-lg bg-white/20 text-white font-bold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={quantity === 0}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>
                        <span className="text-white font-bold text-lg w-8 text-center" aria-live="polite">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-10 h-10 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
                          disabled={!orderOpen}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {itemCount > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {menuItems.map((item) => {
                  const quantity = quantities[item.id] || 0
                  if (quantity === 0) return null
                  const lineTotal = formatItemLineTotal(item, quantity)
                  return (
                    <div key={item.id} className="flex justify-between text-white gap-4">
                      <span>
                        {item.name} × {quantity}
                      </span>
                      {lineTotal && <span>{lineTotal}</span>}
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total:</span>
                  <span>{total.toLocaleString()} HUF</span>
                </div>
              </div>
            </div>
          )}

          {itemCount > 0 && (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Customer Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 font-medium">
                    Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2 font-medium">
                    Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-white mb-2 font-medium">
                    Phone <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+36 20 123 4567"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-white mb-2 font-medium">
                    Address (Optional)
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Pickup reference or delivery address"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="notes" className="block text-white mb-2 font-medium">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="notes"
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Protein choice for Tomato Stew, allergies, etc."
                />
              </div>

              {submitStatus !== 'idle' && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                      : 'bg-red-500/20 border border-red-500/50 text-red-100'
                  }`}
                  role="alert"
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !orderOpen}
                className="w-full px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending Order...' : orderOpen ? 'Submit Order' : 'Ordering Closed'}
              </button>

              <p className="text-white/70 text-center mt-4 text-sm">
                {siteConfig.pickup.cutoff}
                <br />
                {siteConfig.pickup.summary}
              </p>
            </form>
          )}

          {itemCount === 0 && submitStatus !== 'success' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Order Information</h2>
              <p className="text-white/90 text-center mb-6 leading-relaxed">
                Select items from the menu above to place an order.
                <br />
                {siteConfig.pickup.cutoff}
                <br />
                {siteConfig.pickup.summary}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {siteConfig.phone ? (
                  <a
                    href={formatPhoneHref(siteConfig.phone)}
                    className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold text-center hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                  >
                    Call to Order
                  </a>
                ) : (
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold text-center hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                  >
                    Order via Instagram
                  </a>
                )}
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold text-center hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black/95 border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4 safe-area-pb">
          <div>
            <p className="text-white/70 text-xs">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
            <p className="text-white font-bold">{total.toLocaleString()} HUF</p>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold shrink-0"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}
