import { ref } from 'vue'
import type { Locale, BilingualText } from './types'

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('maryin-locale')
    if (saved === 'es' || saved === 'en') {
      return saved
    }

    // Inspect user device / browser languages (e.g. 'es', 'es-US', 'es-419', 'es-MX', etc.)
    const preferredLangs = navigator.languages || [navigator.language || '']
    for (const l of preferredLangs) {
      if (l && l.toLowerCase().startsWith('es')) {
        return 'es'
      }
    }
  } catch {
    // Storage or navigator access error fallback
  }
  return 'en'
}

export const currentLocale = ref<Locale>(detectInitialLocale())

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', currentLocale.value)
}

export function setLocale(locale: Locale) {
  currentLocale.value = locale
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('maryin-locale', locale)
    } catch {}
    document.documentElement.setAttribute('lang', locale)
  }
}

export function toggleLocale() {
  setLocale(currentLocale.value === 'en' ? 'es' : 'en')
}

export function t(text: BilingualText): string {
  return text[currentLocale.value]
}

