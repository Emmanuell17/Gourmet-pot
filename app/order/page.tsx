'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface MenuItem {
  id: number
  name: string
  price: string
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Jollof Rice with chicken', price: '3500 HUF' },
  { id: 2, name: 'Jollof Rice with turkey', price: '4000 HUF' },
  { id: 3, name: 'Fried Rice with chicken', price: '3500 HUF' },
  { id: 4, name: 'Fried Rice with turkey', price: '4000 HUF' },
  { id: 5, name: 'Chicken Shawarma', price: '2500 HUF' },
  { id: 6, name: 'Egusi Soup 1.5L', price: '7000 HUF' },
  { id: 7, name: 'Ogbono Soup 1.5L', price: '7000 HUF' },
  { id: 8, name: 'Efo Riro 1.5L', price: '7700 HUF' },
  { id: 9, name: 'Beef Suya (8 sticks)', price: '5500 HUF' },
  { id: 10, name: 'Tomato Stew', price: 'Price varies by protein' },
]

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address?: string
  notes?: string
}

export default function Order() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
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
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (submitStatus === 'success' && getItemCount() === 0 && successRef.current) {
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

  const getTotal = () => {
    return menuItems.reduce((total, item) => {
      const quantity = quantities[item.id] || 0
      if (item.price.includes('varies')) return total
      const price = parseInt(item.price.replace(/[^0-9]/g, ''))
      return total + price * quantity
    }, 0)
  }

  const getItemCount = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
  }

  const getOrderItems = () => {
    return menuItems
      .filter((item) => quantities[item.id] > 0)
      .map((item) => {
        const quantity = quantities[item.id]
        const priceNum = item.price.includes('varies')
          ? 0
          : parseInt(item.price.replace(/[^0-9]/g, ''))
        return {
          name: item.name,
          quantity,
          price: item.price,
          priceNum,
        }
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (getItemCount() === 0) {
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
      const orderItems = getOrderItems()
      const total = getTotal()

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          orderItems,
          total,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setSubmitMessage('Order sent successfully, contact us for payment via Revolut, Bank transfer or Cash.')
        // Reset form
        setQuantities({})
        setCustomerInfo({
          name: '',
          email: '',
          phone: '',
          address: '',
          notes: '',
        })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(data.message || 'Failed to send order. Please try again or call us.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Failed to send order. Please try again or call us.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-wider">
              Order Now
            </h1>
            <p className="text-xl text-white/90">Select items from our menu</p>
          </div>

          {/* Order placed success - show at top after successful submit */}
          {getItemCount() === 0 && submitStatus === 'success' && (
            <div ref={successRef} className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-green-500/50 mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/30 text-green-400 mb-6 text-4xl">
                ✓
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Order placed</h2>
              <p className="text-white/95 text-lg mb-2">{submitMessage}</p>
              <p className="text-white/70 text-sm">
                Orders are accepted until Thursday 6:00 PM. Pickup on Fridays.
              </p>
            </div>
          )}

          {/* Order List */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Menu Items</h2>
            <div className="space-y-4">
              {menuItems.map((item) => {
                const quantity = quantities[item.id] || 0
                return (
                  <div
                    key={item.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-orange-500 font-bold text-lg">{item.id}.</span>
                          <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                        </div>
                        <p className="text-white/70 ml-8 mt-1">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-10 h-10 rounded-lg bg-white/20 text-white font-bold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={quantity === 0}
                        >
                          −
                        </button>
                        <span className="text-white font-bold text-lg w-8 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-10 h-10 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
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

          {/* Order Summary */}
          {getItemCount() > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {menuItems.map((item) => {
                  const quantity = quantities[item.id] || 0
                  if (quantity === 0) return null
                  return (
                    <div key={item.id} className="flex justify-between text-white">
                      <span>
                        {item.name} × {quantity}
                      </span>
                      {!item.price.includes('varies') && (
                        <span>
                          {(
                            parseInt(item.price.replace(/[^0-9]/g, '')) * quantity
                          ).toLocaleString()} HUF
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total:</span>
                  <span>{getTotal().toLocaleString()} HUF</span>
                </div>
              </div>
            </div>
          )}

          {/* Customer Information Form */}
          {getItemCount() > 0 && (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
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
                    placeholder="Delivery address"
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
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              {/* Submit Status Message */}
              {submitStatus !== 'idle' && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-100'
                      : 'bg-red-500/20 border border-red-500/50 text-red-100'
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-orange-500 text-white rounded-lg font-semibold text-lg hover:bg-orange-600 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending Order...' : 'Submit Order'}
              </button>

              <p className="text-white/70 text-center mt-4 text-sm">
                Orders are accepted throughout the week until Thursday at 6:00 PM.<br />
                All orders are available for pickup on Fridays.
              </p>
            </form>
          )}

          {/* Order Instructions - Show when no items selected and no recent success */}
          {getItemCount() === 0 && submitStatus !== 'success' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Order Information</h2>
              <p className="text-white/90 text-center mb-6 leading-relaxed">
                Select items from the menu above to place an order.<br />
                Orders are accepted throughout the week until Thursday at 6:00 PM.<br />
                All orders are available for pickup on Fridays.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+1234567890"
                  className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold text-center hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                >
                  Call to Order
                </a>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold text-center hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {/* Back to home link */}
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
    </div>
  )
}



