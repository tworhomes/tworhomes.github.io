<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { realtorProfile, featureFlags, currentLocale, toggleLocale, t } from '@/data/realtorProfile'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { isLight, toggleTheme, currentTheme, currentThemeId, availableThemes, setTheme } = useTheme()

const mobileMenuOpen = ref(false)
const themeMenuOpen = ref(false)
const themePickerRef = ref<HTMLElement | null>(null)

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI']

const navItems = computed(() => {
  const items = [
    {
      label: t({ en: 'Home', es: 'Inicio' }),
      to: '/'
    },
    {
      label: t({ en: 'About', es: 'Sobre Mí' }),
      to: '/about'
    },
    {
      label: t({ en: 'NC Markets & Perks', es: 'Mercados en NC y Beneficios' }),
      to: '/markets'
    }
  ]

  if (featureFlags.value.neighborhoodVibeMatcher) {
    items.push({
      label: t({ en: 'Community Quiz', es: 'Quiz de Zonas' }),
      to: '/quiz'
    })
  }

  items.push({
    label: t({ en: 'Contact', es: 'Contacto' }),
    to: '/contact'
  })

  return items.map((item, idx) => ({
    ...item,
    numeral: romanNumerals[idx] ?? `${idx + 1}`
  }))
})

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function selectTheme(themeId: string) {
  setTheme(themeId)
  themeMenuOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (themePickerRef.value && !themePickerRef.value.contains(e.target as Node)) {
    themeMenuOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleClickOutside)
  }
})

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
    themeMenuOpen.value = false
  }
)
</script>

<template>
  <header class="navbar-wrapper">
    <div class="container navbar">
      <!-- Luxury Editorial Brand Masthead Link -->
      <RouterLink
        to="/"
        class="brand-link"
        aria-label="Maryin Dos Ramos Real Estate Home"
        @click="closeMobileMenu"
      >
        <span class="brand-title">MARYIN DOS RAMOS</span>
        <span class="brand-subtitle">NC #310847 · eXp REALTY</span>
      </RouterLink>

      <!-- Center Gallery Navigation Links -->
      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="active"
        >
          <span class="nav-numeral">{{ item.numeral }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span class="nav-hairline" aria-hidden="true" />
        </RouterLink>
      </nav>

      <!-- Right Editorial Actions -->
      <div class="nav-actions">
        <!-- Architectural EN / ES Switcher -->
        <button
          type="button"
          class="lang-btn"
          :title="currentLocale === 'en' ? 'Cambiar a Español' : 'Switch to English'"
          @click="toggleLocale"
        >
          <span class="lang-pill" :class="{ active: currentLocale === 'en' }">EN</span>
          <span class="lang-divider">/</span>
          <span class="lang-pill" :class="{ active: currentLocale === 'es' }">ES</span>
        </button>

        <!-- Mode Toggle (Light / Dark) -->
        <button
          v-if="featureFlags.themeToggle"
          type="button"
          class="theme-btn"
          :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
          :title="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
          @click="toggleTheme()"
        >
          <svg v-if="isLight" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>

        <!-- Theme Palette Dropdown -->
        <div
          v-if="featureFlags.themePalettePicker"
          ref="themePickerRef"
          class="theme-picker-wrapper"
        >
          <button
            type="button"
            class="theme-btn theme-palette-btn"
            :class="{ active: themeMenuOpen }"
            :aria-label="currentLocale === 'en' ? 'Select theme palette' : 'Seleccionar paleta de temas'"
            :title="currentLocale === 'en' ? 'Theme Palettes' : 'Paletas de Temas'"
            @click="themeMenuOpen = !themeMenuOpen"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
            </svg>
          </button>

          <Transition name="fade-slide">
            <div v-if="themeMenuOpen" class="theme-dropdown-menu">
              <div class="theme-dropdown-header">
                <span class="theme-dropdown-title">
                  {{ currentLocale === 'en' ? 'Theme Palettes' : 'Paletas de Temas' }}
                </span>
                <span class="theme-current-badge">
                  {{ currentTheme.colorScheme === 'light' ? '☀️ Light' : '🌙 Dark' }}
                </span>
              </div>
              <div class="theme-dropdown-list">
                <button
                  v-for="themeItem in availableThemes"
                  :key="themeItem.id"
                  type="button"
                  class="theme-dropdown-item"
                  :class="{ selected: currentThemeId === themeItem.id }"
                  @click="selectTheme(themeItem.id)"
                >
                  <div class="theme-color-preview">
                    <span class="color-dot" :style="{ backgroundColor: themeItem.colors.bgPrimary, borderColor: themeItem.colors.borderSubtle }" />
                    <span class="color-dot" :style="{ backgroundColor: themeItem.colors.accentPrimary }" />
                    <span class="color-dot" :style="{ backgroundColor: themeItem.colors.accentGold }" />
                  </div>
                  <div class="theme-meta">
                    <span class="theme-name">
                      {{ typeof themeItem.name === 'string' ? themeItem.name : t(themeItem.name) }}
                    </span>
                    <span class="theme-scheme-tag">
                      {{ themeItem.colorScheme }}
                    </span>
                  </div>
                  <span v-if="currentThemeId === themeItem.id" class="theme-active-indicator">✓</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Crisp Private Consultation CTA -->
        <RouterLink to="/contact" class="btn btn-primary nav-cta">
          {{ currentLocale === 'en' ? 'Private Consultation' : 'Consulta Privada' }}
        </RouterLink>

        <!-- Mobile Drawer Toggle -->
        <button
          type="button"
          class="mobile-toggle"
          aria-label="Toggle navigation menu"
          :aria-expanded="mobileMenuOpen"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line v-if="!mobileMenuOpen" x1="3" y1="6" x2="21" y2="6" />
            <line v-if="!mobileMenuOpen" x1="3" y1="12" x2="21" y2="12" />
            <line v-if="!mobileMenuOpen" x1="3" y1="18" x2="21" y2="18" />
            <line v-if="mobileMenuOpen" x1="18" y1="6" x2="6" y2="18" />
            <line v-if="mobileMenuOpen" x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Responsive Architectural Mobile Drawer -->
    <Transition name="fade-slide">
      <div v-if="mobileMenuOpen" class="mobile-drawer container">
        <div class="mobile-links-list">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="mobile-link"
            active-class="active"
            @click="closeMobileMenu"
          >
            <div class="mobile-link-left">
              <span class="mobile-numeral">{{ item.numeral }}</span>
              <span class="mobile-label">{{ item.label }}</span>
            </div>
            <span class="mobile-link-arrow">→</span>
          </RouterLink>
        </div>

        <!-- Mobile Theme Palettes -->
        <div v-if="featureFlags.themePalettePicker" class="mobile-theme-section">
          <span class="mobile-theme-label">
            {{ currentLocale === 'en' ? 'Theme Palette' : 'Paleta de Tema' }}
          </span>
          <div class="mobile-theme-chips">
            <button
              v-for="themeItem in availableThemes"
              :key="themeItem.id"
              type="button"
              class="mobile-theme-chip"
              :class="{ active: currentThemeId === themeItem.id }"
              @click="selectTheme(themeItem.id)"
            >
              <span class="chip-color-dot" :style="{ backgroundColor: themeItem.colors.accentPrimary }" />
              <span>{{ typeof themeItem.name === 'string' ? themeItem.name : t(themeItem.name) }}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Direct Actions -->
        <div class="mobile-drawer-actions">
          <a :href="realtorProfile.phoneHref" class="btn btn-outline mobile-drawer-btn" @click="closeMobileMenu">
            <span>📞 {{ realtorProfile.phoneDisplay }}</span>
          </a>
          <RouterLink to="/contact" class="btn btn-primary mobile-drawer-btn" @click="closeMobileMenu">
            <span>{{ currentLocale === 'en' ? 'Private Consultation' : 'Consulta Privada' }}</span>
          </RouterLink>
        </div>

        <!-- Mobile Direct Channel Chips -->
        <div class="mobile-drawer-socials">
          <a
            :href="realtorProfile.whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="drawer-social-chip"
          >
            WhatsApp Direct
          </a>
          <a
            v-for="channel in realtorProfile.socialChannels"
            :key="channel.id"
            :href="channel.url"
            target="_blank"
            rel="noopener noreferrer"
            class="drawer-social-chip"
          >
            {{ channel.platform }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  gap: 1.25rem;
}

/* Brand Link — Architectural Monograph Masthead */
.brand-link {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  min-width: 0;
  flex-shrink: 0;
  transition: opacity var(--btn-duration) var(--btn-ease);
}

.brand-link:hover {
  opacity: 0.88;
}

.brand-title {
  font-family: var(--font-serif);
  font-size: 1.12rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-primary);
  line-height: 1.15;
}

.brand-subtitle {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-primary);
  line-height: 1.2;
  margin-top: 3px;
}

/* Center Nav Links with Roman Numerals & Hairline Rules */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.55rem 0.85rem;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color var(--btn-duration) var(--btn-ease);
  white-space: nowrap;
}

.nav-numeral {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--accent-primary);
  opacity: 0.85;
}

.nav-hairline {
  position: absolute;
  bottom: 0;
  left: 0.85rem;
  right: 0.85rem;
  height: 1px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--btn-duration) var(--btn-ease);
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover .nav-hairline {
  transform: scaleX(1);
}

.nav-link.active {
  color: var(--text-primary);
}

.nav-link.active .nav-hairline {
  transform: scaleX(1);
}

/* Right Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-shrink: 0;
}

/* Architectural Language Switcher */
.lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  min-height: 38px;
  padding: 0 0.68rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: var(--btn-transition);
}

.lang-btn:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
  transform: var(--btn-hover-transform);
}

.lang-pill.active {
  color: var(--accent-primary);
  font-weight: 700;
}

.lang-divider {
  opacity: 0.35;
}

/* Theme Toggle & Palette Buttons */
.theme-btn,
.mobile-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--btn-transition);
}

.theme-btn:hover,
.mobile-toggle:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.theme-btn:active,
.mobile-toggle:active,
.lang-btn:active {
  transform: var(--btn-active-transform);
  transition-duration: 0.12s;
}

/* Theme Palette Dropdown */
.theme-picker-wrapper {
  position: relative;
}

.theme-palette-btn.active {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background: var(--accent-glow);
}

.theme-dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 275px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: 0.75rem;
  z-index: 1000;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.theme-dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.35rem 0.55rem;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 0.45rem;
}

.theme-dropdown-title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.theme-current-badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--accent-primary);
  background: var(--accent-glow);
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
}

.theme-dropdown-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.theme-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.55rem 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
  transition: var(--btn-transition);
  font-family: var(--font-sans);
}

.theme-dropdown-item:hover {
  background: var(--accent-glow);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.theme-dropdown-item.selected {
  background: var(--accent-glow);
  border-color: var(--accent-primary);
}

.theme-color-preview {
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
}

.color-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.theme-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.12rem;
  min-width: 0;
}

.theme-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-scheme-tag {
  font-size: 0.68rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  color: var(--text-muted);
}

.theme-active-indicator {
  font-weight: 700;
  color: var(--accent-primary);
  font-size: 0.95rem;
}

/* Crisp Private Consultation CTA */
.nav-cta {
  min-height: 40px;
  padding: 0.6rem 1.15rem;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
}

.mobile-toggle {
  display: none;
}

/* Architectural Mobile Drawer */
.mobile-drawer {
  display: none;
  flex-direction: column;
  padding-top: 0.85rem;
  padding-bottom: 1.5rem;
  gap: 0.85rem;
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-primary);
}

.mobile-links-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-subtle);
  transition: var(--btn-transition);
}

.mobile-link:last-child {
  border-bottom: none;
}

.mobile-link-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.mobile-numeral {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--accent-primary);
}

.mobile-label {
  text-transform: uppercase;
}

.mobile-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.mobile-link-arrow {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  opacity: 0.6;
}

.mobile-theme-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.mobile-theme-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.mobile-theme-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.mobile-theme-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.7rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-primary);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--btn-transition);
}

.mobile-theme-chip.active {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
  color: var(--accent-primary);
  font-weight: 600;
}

.chip-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.mobile-drawer-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  padding-top: 0.35rem;
}

.mobile-drawer-btn {
  width: 100%;
  font-size: 0.76rem;
  padding: 0.75rem 0.5rem;
}

.mobile-drawer-socials {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.45rem;
  padding-top: 0.35rem;
}

.drawer-social-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0.35rem 0.45rem;
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
  transition: var(--btn-transition);
}

.drawer-social-chip:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

@media (max-width: 1060px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .mobile-toggle {
    display: inline-flex;
  }

  .mobile-drawer {
    display: flex;
  }
}

@media (max-width: 520px) {
  .brand-title {
    font-size: 1rem;
    letter-spacing: 0.12em;
  }

  .brand-subtitle {
    font-size: 0.62rem;
  }

  .mobile-drawer-actions {
    grid-template-columns: 1fr;
  }

  .mobile-drawer-socials {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
