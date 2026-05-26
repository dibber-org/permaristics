import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const LOCALE_STORAGE_KEY = 'permaristics-locale'

export type AppLocale = 'fr' | 'en'

const messages = { en, fr }

function readStoredLocale(): AppLocale | null {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') {
    return stored
  }
  return null
}

function detectBrowserLocale(): AppLocale {
  const lang = navigator.language.toLowerCase()
  return lang.startsWith('fr') ? 'fr' : 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: readStoredLocale() ?? detectBrowserLocale(),
  fallbackLocale: 'en',
  messages,
})

export function setAppLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

document.documentElement.lang = i18n.global.locale.value
