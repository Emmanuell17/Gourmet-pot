export const LOCALE_COOKIE = 'gp-locale'
export type Locale = 'en' | 'hu'

export function parseLocale(value: string | undefined | null): Locale {
  return value === 'hu' ? 'hu' : 'en'
}
