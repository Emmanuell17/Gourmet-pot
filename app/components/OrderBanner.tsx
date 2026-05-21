'use client'

import { useEffect, useState } from 'react'
import { getOrderWindowStatus, type OrderWindowStatus } from '@/lib/orderWindow'

export default function OrderBanner() {
  const [status, setStatus] = useState<OrderWindowStatus | null>(null)

  useEffect(() => {
    setStatus(getOrderWindowStatus())
  }, [])

  if (!status) return null

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-center text-sm md:text-base ${
        status.isOpen
          ? 'border-green-500/40 bg-green-500/15 text-green-50'
          : 'border-amber-500/40 bg-amber-500/15 text-amber-50'
      }`}
      role="status"
    >
      <p className="font-semibold">{status.title}</p>
      <p className="mt-1 text-white/85">{status.message}</p>
    </div>
  )
}
