import { siteConfig } from './site'

export type OrderWindowStatus = {
  isOpen: boolean
  title: string
  message: string
}

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

  return {
    day: dayMap[parts.weekday] ?? 0,
    hour: parseInt(parts.hour, 10),
  }
}

/** Weekly preorder: open Sun–Thu until 18:00 Budapest; closed Thu evening through Sat */
export function getOrderWindowStatus(): OrderWindowStatus {
  const { day, hour } = getBudapestTime()

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

  if (day === 4 && hour >= 18) {
    return {
      isOpen: false,
      title: 'Ordering closed for this week',
      message: `${siteConfig.pickup.cutoff} Pickup is on Friday.`,
    }
  }

  if (day === 4) {
    return {
      isOpen: true,
      title: 'Last day to order',
      message: `Order before 6:00 PM today (Budapest time). ${siteConfig.pickup.summary}`,
    }
  }

  return {
    isOpen: true,
    title: 'Now taking orders',
    message: `${siteConfig.pickup.cutoff} ${siteConfig.pickup.summary}`,
  }
}
