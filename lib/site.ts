export const siteConfig = {
  name: 'Gourmet Pot',
  tagline: 'Where culinary artistry meets authentic tradition',
  description:
    'Authentic Nigerian cuisine in Debrecen — weekly preorder with pickup on Wednesdays and Fridays after 3:00 PM. Jollof, soups, and more.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gourmetpot.hu',
  instagram: {
    handle: 'gourmet_pot_',
    url: 'https://instagram.com/gourmet_pot_',
  },
  /** Set when you have a business phone — hides Call button if empty */
  phone: '',
  email: '',
  pickup: {
    summary: 'Pickups are every Wednesday and Friday after 3:00 PM.',
    cutoff: 'Orders close every Tuesday and Thursday at 4:00 PM.',
    address: 'Debrecen, Hungary',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Szent+Anna+utca%2C+Debrecen%2C+Hungary',
  },
  payment: {
    methods: ['Revolut', 'Bank transfer', 'Cash'],
    note: 'After your order is confirmed by email, we send Revolut or bank transfer details in a follow-up message. Cash is accepted at pickup.',
  },
} as const

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}
