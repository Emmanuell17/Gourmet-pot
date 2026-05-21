export type MenuCategoryId = 'rice-bowls' | 'soups-stews' | 'grills' | 'other'

export interface MenuCategory {
  id: MenuCategoryId
  label: string
  menuImageId?: 'menu1' | 'menu2'
}

export interface MenuItem {
  id: number
  name: string
  price: string
  /** null when price varies (e.g. by protein) */
  priceHuf: number | null
  category: MenuCategoryId
  description?: string
}

export const menuCategories: MenuCategory[] = [
  { id: 'rice-bowls', label: 'Rice Bowls', menuImageId: 'menu2' },
  { id: 'soups-stews', label: 'Soups & Stews', menuImageId: 'menu1' },
  { id: 'grills', label: 'Grills', menuImageId: 'menu1' },
  { id: 'other', label: 'Sides & More', menuImageId: 'menu1' },
]

export const menuImages = {
  menu1: {
    src: '/menu1.JPG',
    alt: 'Soups, stews, and sides menu',
  },
  menu2: {
    src: '/menu2.JPG',
    alt: 'Rice bowl menu',
  },
} as const

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Jollof Rice with chicken',
    price: '3500 HUF',
    priceHuf: 3500,
    category: 'rice-bowls',
  },
  {
    id: 2,
    name: 'Jollof Rice with turkey',
    price: '4000 HUF',
    priceHuf: 4000,
    category: 'rice-bowls',
  },
  {
    id: 3,
    name: 'Fried Rice with chicken',
    price: '3500 HUF',
    priceHuf: 3500,
    category: 'rice-bowls',
  },
  {
    id: 4,
    name: 'Fried Rice with turkey',
    price: '4000 HUF',
    priceHuf: 4000,
    category: 'rice-bowls',
  },
  {
    id: 5,
    name: 'Chicken Shawarma',
    price: '2500 HUF',
    priceHuf: 2500,
    category: 'grills',
  },
  {
    id: 6,
    name: 'Egusi Soup 1.5L',
    price: '7000 HUF',
    priceHuf: 7000,
    category: 'soups-stews',
  },
  {
    id: 7,
    name: 'Ogbono Soup 1.5L',
    price: '7000 HUF',
    priceHuf: 7000,
    category: 'soups-stews',
  },
  {
    id: 8,
    name: 'Efo Riro 1.5L',
    price: '7700 HUF',
    priceHuf: 7700,
    category: 'soups-stews',
  },
  {
    id: 9,
    name: 'Beef Suya (8 sticks)',
    price: '5500 HUF',
    priceHuf: 5500,
    category: 'grills',
  },
  {
    id: 10,
    name: 'Tomato Stew',
    price: 'Price varies by protein',
    priceHuf: null,
    category: 'other',
    description: 'Add your protein choice in special instructions.',
  },
]

export function getMenuItemById(id: number): MenuItem | undefined {
  return menuItems.find((item) => item.id === id)
}

export function getItemsByCategory(categoryId: MenuCategoryId): MenuItem[] {
  return menuItems.filter((item) => item.category === categoryId)
}

export function formatItemLineTotal(item: MenuItem, quantity: number): string | null {
  if (item.priceHuf === null) return null
  return `${(item.priceHuf * quantity).toLocaleString()} HUF`
}
