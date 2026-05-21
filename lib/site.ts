export const siteConfig = {
  name: 'Gourmet pot',
  tagline: 'Where culinary artistry meets authentic tradition',
  description:
    'Authentic Nigerian cuisine in Debrecen — weekly preorder for Friday pickup. Jollof, soups, suya, and more.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gourmetpot.hu',
  instagram: {
    handle: 'gourmet_pot_',
    url: 'https://instagram.com/gourmet_pot_',
  },
  /** Set when you have a business phone — hides Call button if empty */
  phone: '',
  email: '',
  pickup: {
    summary: 'All orders are available for pickup on Fridays.',
    cutoff: 'Orders are accepted throughout the week until Thursday at 6:00 PM.',
    address: 'Debrecen, Hungary',
    mapsUrl: '',
  },
  payment: {
    methods: ['Revolut', 'Bank transfer', 'Cash'],
    note: 'Contact us for payment after placing your order.',
  },
} as const

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}
