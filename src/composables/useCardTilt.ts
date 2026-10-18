import { featureFlags, toggleCardTilt, toggleCardSheen } from '@/data/realtorProfile'
import { watchEffect, type Directive } from 'vue'

let isInitialized = false
let activeCard: HTMLElement | null = null

function resetCard(el: HTMLElement) {
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
  el.style.setProperty('--sheen-opacity', '0')
}

/**
 * Initializes global executive 3D card tilt & subtle specular reflection on all .card elements.
 * Independently controlled by:
 *   - featureFlags.value.cardTilt (3D perspective tilt)
 *   - featureFlags.value.cardSheen (specular gloss reflection)
 * Automatically disabled on touch screens to preserve silky finger scrolling.
 */
export function initGlobalCardTilt() {
  if (typeof window === 'undefined' || isInitialized) return
  isInitialized = true

  // Expose helpers on window for live testing in browser console
  try {
    const win = window as any
    win.toggleCardTilt = toggleCardTilt
    win.toggleCardSheen = toggleCardSheen
    win.maryinFeatureFlags = featureFlags
  } catch {
    // ignore in restricted envs
  }

  // Synchronize feature classes on root <html> element for clean CSS scoping
  watchEffect(() => {
    const tiltEnabled = Boolean(featureFlags.value.cardTilt)
    const sheenEnabled = Boolean(featureFlags.value.cardSheen)

    document.documentElement.classList.toggle('feature-card-tilt', tiltEnabled)
    document.documentElement.classList.toggle('feature-card-sheen', sheenEnabled)

    if (activeCard) {
      if (!tiltEnabled) {
        activeCard.style.setProperty('--tilt-x', '0deg')
        activeCard.style.setProperty('--tilt-y', '0deg')
      }
      if (!sheenEnabled) {
        activeCard.style.setProperty('--sheen-opacity', '0')
      }
      if (!tiltEnabled && !sheenEnabled) {
        resetCard(activeCard)
        activeCard = null
      }
    }
  })

  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches

  window.addEventListener(
    'mousemove',
    (e: MouseEvent) => {
      const tiltEnabled = Boolean(featureFlags.value.cardTilt)
      const sheenEnabled = Boolean(featureFlags.value.cardSheen)

      if ((!tiltEnabled && !sheenEnabled) || isTouchDevice()) {
        if (activeCard) {
          resetCard(activeCard)
          activeCard = null
        }
        return
      }

      const target = e.target as HTMLElement | null
      const card = target?.closest('.card, .luxury-tilt-card') as HTMLElement | null

      if (card !== activeCard) {
        if (activeCard) {
          resetCard(activeCard)
        }
        activeCard = card
      }

      if (activeCard) {
        const rect = activeCard.getBoundingClientRect()

        if (tiltEnabled) {
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5

          // Subtle, non-punchy executive tilt angles (max 6 degrees)
          const maxTilt = 6
          const tiltX = (-y * maxTilt).toFixed(2)
          const tiltY = (x * maxTilt).toFixed(2)

          activeCard.style.setProperty('--tilt-x', `${tiltX}deg`)
          activeCard.style.setProperty('--tilt-y', `${tiltY}deg`)
        } else {
          activeCard.style.setProperty('--tilt-x', '0deg')
          activeCard.style.setProperty('--tilt-y', '0deg')
        }

        if (sheenEnabled) {
          const sheenX = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1)
          const sheenY = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1)

          activeCard.style.setProperty('--sheen-x', `${sheenX}%`)
          activeCard.style.setProperty('--sheen-y', `${sheenY}%`)
          activeCard.style.setProperty('--sheen-opacity', '1')
        } else {
          activeCard.style.setProperty('--sheen-opacity', '0')
        }
      }
    },
    { passive: true }
  )

  window.addEventListener('mouseleave', () => {
    if (activeCard) {
      resetCard(activeCard)
      activeCard = null
    }
  })
}

export const vTilt: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('luxury-tilt-card')
  }
}
