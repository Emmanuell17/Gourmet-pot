import type { Metadata } from 'next'
import ContactView from './ContactView'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/requestLocale'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(getRequestLocale())
  return { title: t.contact.title }
}

export default function Contact() {
  return <ContactView />
}
