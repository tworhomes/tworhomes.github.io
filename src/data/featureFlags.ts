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

export const featureFlags = ref<FeatureFlags>({
  neighborhoodVibeMatcher: getInitialQuizFlag(),
  cardTilt: false,
  cardSheen: false,
  luxuryCardTilt: false
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

