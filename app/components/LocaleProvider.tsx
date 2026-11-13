'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMessages } from '@/lib/i18n'
import type { Messages } from '@/lib/i18n'
import { LOCALE_COOKIE, type Locale } from '@/lib/locale'

type LocaleContextValue = {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    setLocaleState(initialLocale)
    document.documentElement.lang = initialLocale
  }, [initialLocale])

  const setLocale = useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`
      document.documentElement.lang = next
      setLocaleState(next)
      router.refresh()
    },
    [router]
  )

  const value = useMemo(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale, setLocale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useI18n must be used within LocaleProvider')
  }
  return context
}
