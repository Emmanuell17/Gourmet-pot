import { cookies } from 'next/headers'
import { LOCALE_COOKIE, parseLocale, type Locale } from './locale'

export function getRequestLocale(): Locale {
  return parseLocale(cookies().get(LOCALE_COOKIE)?.value)
}
