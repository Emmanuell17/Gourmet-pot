'use client'

import { useI18n } from './LocaleProvider'
import type { Locale } from '@/lib/locale'

const options: { id: Locale; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'hu', label: 'HU' },
]

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, messages } = useI18n()

  return (
    <div className={`inline-flex rounded-lg border border-white/20 p-0.5 ${className}`} role="group" aria-label={messages.nav.language}>
      {options.map((option) => {
        const selected = locale === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLocale(option.id)}
            aria-pressed={selected}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              selected ? 'bg-orange-500 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
