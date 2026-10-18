import { ref, computed } from 'vue'
import type { ThemeDefinition } from '@/data/types'
import {
  builtinThemes,
  CSS_VAR_MAP,
  DEFAULT_DARK_THEME_ID,
  DEFAULT_LIGHT_THEME_ID
} from '@/data/themes'

// Central reactive registry of all registered themes
const themeRegistry = ref<Record<string, ThemeDefinition>>({ ...builtinThemes })

// Active theme state
const currentThemeId = ref<string>(DEFAULT_DARK_THEME_ID)

// Computed active ThemeDefinition
const currentTheme = computed<ThemeDefinition>(() => {
  return themeRegistry.value[currentThemeId.value] || builtinThemes[DEFAULT_DARK_THEME_ID]
})

// Convenience computed boolean
const isLight = computed<boolean>(() => {
  return currentTheme.value.colorScheme === 'light'
})

// All registered themes for UI pickers and menus
const availableThemes = computed<ThemeDefinition[]>(() => {
  return Object.values(themeRegistry.value)
})

let transitionTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Applies a theme object to the DOM and document head.
 * Injects CSS custom properties, data attributes, meta tags, and color-scheme.
 */
export function applyTheme(theme: ThemeDefinition, withTransition = true) {
  if (typeof document === 'undefined') return

  if (withTransition) {
    document.documentElement.classList.add('theme-transition')
    if (transitionTimer) clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
      transitionTimer = null
    }, 350)
  }

  // Set DOM attributes
  document.documentElement.setAttribute('data-theme', theme.colorScheme)
  document.documentElement.setAttribute('data-theme-id', theme.id)
  document.documentElement.style.colorScheme = theme.colorScheme === 'light' ? 'only light' : 'dark'
  document.documentElement.style.backgroundColor = theme.colors.bgPrimary
  document.documentElement.style.color = theme.colors.textPrimary

  // Inject CSS custom properties dynamically
  for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
    const value = theme.colors[key as keyof typeof CSS_VAR_MAP]
    if (value) {
      document.documentElement.style.setProperty(cssVar, value)
    }
  }

  // Inject optional custom variables if provided
  if (theme.customVariables) {
    for (const [varKey, varVal] of Object.entries(theme.customVariables)) {
      const prop = varKey.startsWith('--') ? varKey : `--${varKey}`
      document.documentElement.style.setProperty(prop, varVal)
    }
  }

  // Sync mobile browser status/address bar color
  const metaTheme = document.querySelector('meta[name="theme-color"]')
  if (metaTheme) {
    metaTheme.setAttribute('content', theme.metaColor)
  }

  // Update reactive state
  currentThemeId.value = theme.id

  // Persist preference to localStorage
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('maryin-theme-id', theme.id)
      localStorage.setItem('theme-preference', theme.colorScheme)
    } catch {
      // Storage access error handling
    }
  }
}

/**
 * Registers a new theme object into the system.
 */
export function registerTheme(theme: ThemeDefinition) {
  themeRegistry.value[theme.id] = theme
}

/**
 * Switches the site theme effortlessly.
 * Accepts either a registered theme ID string, or a complete custom ThemeDefinition object.
 */
export function setTheme(themeOrId: string | ThemeDefinition, withTransition = true) {
  if (typeof themeOrId === 'string') {
    const target = themeRegistry.value[themeOrId]
    if (target) {
      applyTheme(target, withTransition)
    } else {
      console.warn(`[Theme] Theme ID "${themeOrId}" not found in registry.`)
    }
  } else if (typeof themeOrId === 'object' && themeOrId.id) {
    registerTheme(themeOrId)
    applyTheme(themeOrId, withTransition)
  }
}

/**
 * Toggles between light and dark modes.
 * If currently in a light theme, switches to the primary dark theme; vice versa.
 */
export function toggleTheme(withTransition: boolean | Event = true) {
  const transition = typeof withTransition === 'boolean' ? withTransition : true
  if (isLight.value) {
    setTheme(DEFAULT_DARK_THEME_ID, transition)
  } else {
    setTheme(DEFAULT_LIGHT_THEME_ID, transition)
  }
}

/**
 * Detects the initial theme preference from URL params, localStorage, or system media query.
 */
function resolveInitialTheme(): ThemeDefinition {
  if (typeof window === 'undefined') {
    return builtinThemes[DEFAULT_DARK_THEME_ID]
  }

  try {
    // 1. Allow URL override for instant testing: ?theme=emerald-oaks
    const urlParams = new URLSearchParams(window.location.search)
    const urlTheme = urlParams.get('theme')
    if (urlTheme && builtinThemes[urlTheme]) {
      return builtinThemes[urlTheme]
    }

    // 2. Check saved specific theme ID
    const savedThemeId = localStorage.getItem('maryin-theme-id')
    if (savedThemeId && builtinThemes[savedThemeId]) {
      return builtinThemes[savedThemeId]
    }

    // 3. Check legacy light/dark preference
    const savedPref = localStorage.getItem('theme-preference')
    if (savedPref === 'light') {
      return builtinThemes[DEFAULT_LIGHT_THEME_ID]
    }
    if (savedPref === 'dark') {
      return builtinThemes[DEFAULT_DARK_THEME_ID]
    }

    // 4. Fall back to user's OS / browser color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return builtinThemes[DEFAULT_LIGHT_THEME_ID]
    }
  } catch {
    // Storage access error fallback
  }

  return builtinThemes[DEFAULT_DARK_THEME_ID]
}

let isInitialized = false

/**
 * Initializes the theme system on application startup.
 * Runs instantly before first paint to prevent any theme flicker.
 */
export function initTheme() {
  if (isInitialized || typeof window === 'undefined') return
  isInitialized = true

  const initialTheme = resolveInitialTheme()
  applyTheme(initialTheme, false)

  // Listen to OS device preference changes if no manual preference is saved
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleDeviceThemeChange = (e: MediaQueryListEvent) => {
      const hasExplicitTheme = localStorage.getItem('maryin-theme-id') || localStorage.getItem('theme-preference')
      if (!hasExplicitTheme) {
        setTheme(e.matches ? DEFAULT_LIGHT_THEME_ID : DEFAULT_DARK_THEME_ID, true)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleDeviceThemeChange)
    } else if ('addListener' in mediaQuery) {
      ;(mediaQuery as any).addListener(handleDeviceThemeChange)
    }
  }

  // Expose global developer helper in console for instantaneous experimentation
  ;(window as any).__THEME__ = {
    setTheme,
    toggleTheme,
    registerTheme,
    get currentTheme() {
      return currentTheme.value
    },
    get currentThemeId() {
      return currentThemeId.value
    },
    get availableThemes() {
      return availableThemes.value
    },
    builtinThemes
  }
}

/**
 * Vue Composable for theme management
 */
export function useTheme() {
  return {
    currentTheme,
    currentThemeId,
    isLight,
    availableThemes,
    setTheme,
    toggleTheme,
    registerTheme,
    applyTheme,
    builtinThemes
  }
}
