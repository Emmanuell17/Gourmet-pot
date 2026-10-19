import { siteConfig } from './site'

export type OrderWindowStatus = {
  isOpen: boolean
  title: string
  message: string
}

/** 4:00 PM Budapest — Tuesday cutoff for Wednesday pickup, Thursday cutoff for Friday pickup */
const CUTOFF_HOUR = 16

function getBudapestTime(): { day: number; hour: number } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Budapest',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  })

  const parts = Object.fromEntries(
    formatter.formatToParts(new Date()).map((part) => [part.type, part.value])
  )

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  const hour = parseInt(parts.hour, 10)
  return {
    day: dayMap[parts.weekday] ?? 0,
    hour: hour === 24 ? 0 : hour,
  }
}

/**
 * Two weekly preorder windows (Budapest time):
 * - Sunday through Tuesday 4:00 PM → Wednesday pickup after 3:00 PM
 * - Wednesday through Thursday 4:00 PM → Friday pickup after 3:00 PM
 * Closed Tuesday after 4:00 PM, Thursday after 4:00 PM, Friday, and Saturday.
 */
export function getOrderWindowStatus(): OrderWindowStatus {
  const { day, hour } = getBudapestTime()
  const afterCutoff = hour >= CUTOFF_HOUR

  if (day === 5) {
    return {
      isOpen: false,
      title: 'Pickup day',
      message: `It's Friday — ${siteConfig.pickup.summary} New orders open again on Sunday.`,
    }
  }

  if (day === 6) {
    return {
      isOpen: false,
      title: 'Ordering closed',
      message: 'We are closed for orders this weekend. Ordering reopens Sunday.',
    }
  }

  if (day === 2 && afterCutoff) {
    return {
      isOpen: false,
      title: 'Ordering closed',
      message: `${siteConfig.pickup.cutoff} Ordering reopens Wednesday for Friday pickup.`,
    }
  }

  if (day === 2) {
    return {
      isOpen: true,
      title: 'Last day to order for Wednesday pickup',
      message: `Order before 4:00 PM today (Budapest time). ${siteConfig.pickup.summary}`,
    }
  }

  if (day === 4 && afterCutoff) {
    return {
      isOpen: false,
      title: 'Ordering closed',
      message: `${siteConfig.pickup.cutoff} ${siteConfig.pickup.summary} New orders open again on Sunday.`,
    }
  }

  if (day === 4) {
    return {
      isOpen: true,
      title: 'Last day to order for Friday pickup',
      message: `Order before 4:00 PM today (Budapest time). ${siteConfig.pickup.summary}`,
    }
  }

  return {
    isOpen: true,
    title: 'Now taking orders',
    message: `${siteConfig.pickup.cutoff} ${siteConfig.pickup.summary}`,
  }
}
