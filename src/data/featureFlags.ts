import { ref } from 'vue'
import type { FeatureFlags } from './types'

function getInitialQuizFlag(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('quiz')) {
      const q = urlParams.get('quiz')
      return q !== 'false' && q !== '0' && q !== 'off'
    }
    const saved = localStorage.getItem('feature-flag-quiz')
    if (saved !== null) {
      return saved === 'true' || saved === '1'
    }
  } catch {
    // ignore
  }
  return true
}

function getInitialFlag(paramKey: string, storageKey: string, defaultValue = false): boolean {
  if (typeof window === 'undefined') return defaultValue
  try {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has(paramKey)) {
      const q = urlParams.get(paramKey)
      return q !== 'false' && q !== '0' && q !== 'off'
    }
    const saved = localStorage.getItem(storageKey)
    if (saved !== null) {
      return saved === 'true' || saved === '1'
    }
  } catch {
    // ignore
  }
  return defaultValue
}

export const featureFlags = ref<FeatureFlags>({
  neighborhoodVibeMatcher: getInitialQuizFlag(),
  cardTilt: false,
  cardSheen: false,
  luxuryCardTilt: false,
  themePalettePicker: getInitialFlag('themePicker', 'feature-flag-theme-picker', false),
  themeToggle: getInitialFlag('themeToggle', 'feature-flag-theme-toggle', true)
})

export function toggleNeighborhoodVibeMatcher(enable?: boolean) {
  const nextVal = enable !== undefined ? enable : !featureFlags.value.neighborhoodVibeMatcher
  featureFlags.value.neighborhoodVibeMatcher = nextVal
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('feature-flag-quiz', String(nextVal))
  }
}

export function toggleCardTilt(enable?: boolean) {
  featureFlags.value.cardTilt = enable !== undefined ? enable : !featureFlags.value.cardTilt
  featureFlags.value.luxuryCardTilt = featureFlags.value.cardTilt
}

export function toggleCardSheen(enable?: boolean) {
  featureFlags.value.cardSheen = enable !== undefined ? enable : !featureFlags.value.cardSheen
}

export function toggleThemePalettePicker(enable?: boolean) {
  const nextVal = enable !== undefined ? enable : !featureFlags.value.themePalettePicker
  featureFlags.value.themePalettePicker = nextVal
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('feature-flag-theme-picker', String(nextVal))
  }
}

export function toggleThemeToggle(enable?: boolean) {
  const nextVal = enable !== undefined ? enable : !featureFlags.value.themeToggle
  featureFlags.value.themeToggle = nextVal
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('feature-flag-theme-toggle', String(nextVal))
  }
}

