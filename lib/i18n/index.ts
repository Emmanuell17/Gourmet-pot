import type { Locale } from '@/lib/locale'
import en, { type Messages } from './en'
import hu from './hu'

const dictionaries: Record<Locale, Messages> = { en, hu }

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale]
}

export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  )
}

export type { Messages }
