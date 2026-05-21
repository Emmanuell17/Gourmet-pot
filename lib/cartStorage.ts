const CART_KEY = 'gourmet-pot-cart'
const CUSTOMER_KEY = 'gourmet-pot-customer'

export type CartQuantities = Record<number, number>

export interface StoredCustomerInfo {
  name: string
  email: string
  phone: string
  address?: string
  notes?: string
}

export function loadCart(): CartQuantities {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as CartQuantities
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function saveCart(quantities: CartQuantities): void {
  if (typeof window === 'undefined') return
  try {
    if (Object.keys(quantities).length === 0) {
      localStorage.removeItem(CART_KEY)
    } else {
      localStorage.setItem(CART_KEY, JSON.stringify(quantities))
    }
  } catch {
    // ignore quota / private mode
  }
}

export function loadCustomerInfo(): StoredCustomerInfo | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredCustomerInfo
  } catch {
    return null
  }
}

export function saveCustomerInfo(info: StoredCustomerInfo): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(info))
  } catch {
    // ignore
  }
}

export function clearCartStorage(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_KEY)
}
