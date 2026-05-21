import { menuItems, type MenuItem } from '@/data/menu'

export type CartQuantities = Record<number, number>

export function calculateCartTotal(quantities: CartQuantities): number {
  return menuItems.reduce((total, item) => {
    const quantity = quantities[item.id] || 0
    if (item.priceHuf === null || quantity === 0) return total
    return total + item.priceHuf * quantity
  }, 0)
}

export function getCartItemCount(quantities: CartQuantities): number {
  return Object.values(quantities).reduce((sum, qty) => sum + qty, 0)
}

export function getOrderLineItems(quantities: CartQuantities) {
  return menuItems
    .filter((item) => (quantities[item.id] || 0) > 0)
    .map((item) => {
      const quantity = quantities[item.id]
      return {
        name: item.name,
        quantity,
        price: item.price,
        priceNum: item.priceHuf ?? 0,
      }
    })
}

export function groupMenuByCategory(items: MenuItem[] = menuItems) {
  const groups = new Map<string, MenuItem[]>()
  for (const item of items) {
    const list = groups.get(item.category) ?? []
    list.push(item)
    groups.set(item.category, list)
  }
  return groups
}
