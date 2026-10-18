import { watchEffect } from 'vue'
import { featureFlags, togglePremiumAnimations } from '@/data/realtorProfile'

let isInitialized = false

/**
 * Initializes executive subtle premium animation bindings.
 * Automatically synchronizes root HTML class `feature-animations` with `featureFlags.value.premiumAnimations`.
 * Guarantees zero content is ever hidden or blocked.
 */
export function initPremiumAnimations() {
  if (typeof window === 'undefined' || isInitialized) return
  isInitialized = true

  // Expose toggle helper on window for quick browser console testing
  try {
    const win = window as any
    win.togglePremiumAnimations = togglePremiumAnimations
  } catch {
    // restricted env fallback
  }

  // Synchronize root <html> class for clean, non-intrusive CSS scoping
  watchEffect(() => {
    const enabled = Boolean(featureFlags.value.premiumAnimations)
    document.documentElement.classList.toggle('feature-animations', enabled)
  })
}

/**
 * Vue composable for accessing animation state
 */
export function usePremiumAnimations() {
  return {
    featureFlags,
    togglePremiumAnimations
  }
}
