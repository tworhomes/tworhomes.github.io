<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { realtorProfile, currentLocale, toggleLocale, t } from '@/data/realtorProfile'

const route = useRoute()
const isLight = ref(
  typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') === 'light'
    : false
)
const mobileMenuOpen = ref(false)

const navItems = computed(() => [
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
  },
  {
    label: t({ en: 'Contact', es: 'Contacto' }),
    to: '/contact'
  }
])

function applyTheme(light: boolean) {
  const theme = light ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.backgroundColor = light ? '#f6f5f1' : '#0b0f19'
  document.documentElement.style.color = light ? '#292524' : '#f8fafc'
  const metaTheme = document.querySelector('meta[name="theme-color"]')
  if (metaTheme) metaTheme.setAttribute('content', light ? '#f6f5f1' : '#0b0f19')
}

function toggleTheme() {
  document.documentElement.classList.add('theme-transition')
  isLight.value = !isLight.value
  localStorage.setItem('theme-preference', isLight.value ? 'light' : 'dark')
  applyTheme(isLight.value)
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition')
  }, 350)
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)

onMounted(() => {
  const saved = localStorage.getItem('theme-preference')
  const shouldBeLight = saved === 'light'
  isLight.value = shouldBeLight
  applyTheme(shouldBeLight)
})
</script>

<template>
  <header class="navbar-wrapper">
    <div class="container navbar">
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

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="nav-actions">
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

        <button
          type="button"
          class="theme-btn"
          :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
          @click="toggleTheme"
        >
          <svg v-if="isLight" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

        <RouterLink to="/contact" class="btn btn-primary nav-cta">
          {{ currentLocale === 'en' ? 'Contact' : 'Contacto' }}
        </RouterLink>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-drawer container">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="mobile-link"
        active-class="active"
        @click="closeMobileMenu"
      >
        <span>{{ item.label }}</span>
        <span class="mobile-link-arrow">→</span>
      </RouterLink>

      <div class="mobile-drawer-actions">
        <a :href="realtorProfile.phoneHref" class="btn btn-outline" @click="closeMobileMenu">
          📞 {{ realtorProfile.phoneDisplay }}
        </a>
        <RouterLink to="/contact" class="btn btn-primary" @click="closeMobileMenu">
          ✨ {{ currentLocale === 'en' ? 'Start My Plan' : 'Iniciar Mi Plan' }}
        </RouterLink>
      </div>

      <div class="mobile-drawer-socials">
        <a
          :href="realtorProfile.whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
          class="drawer-social-chip"
        >
          💬 WhatsApp
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
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 0.65rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.brand-name {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  transition: var(--transition-hover);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--accent-glow);
}

.nav-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  min-height: 40px;
  padding: 0 0.62rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--btn-transition);
}

.lang-btn:hover {
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.lang-pill.active {
  color: var(--accent-primary);
  font-weight: 700;
}

.lang-divider {
  opacity: 0.4;
}

.theme-btn,
.mobile-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
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

.nav-phone {
  padding: 0.48rem 0.85rem;
  font-size: 0.84rem;
  font-family: var(--font-mono);
}

.nav-cta {
  padding: 0.5rem 0.95rem;
  font-size: 0.86rem;
}

.mobile-toggle {
  display: none;
}

.mobile-drawer {
  display: none;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 1.25rem;
  gap: 0.4rem;
  border-top: 1px solid var(--border-subtle);
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 46px;
  padding: 0.65rem 0.95rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.96rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
}

.mobile-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
  border-color: var(--border-hover);
}

.mobile-link-arrow {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  opacity: 0.7;
}

.mobile-drawer-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
  margin-top: 0.4rem;
}

.mobile-drawer-socials {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.45rem;
  margin-top: 0.35rem;
}

.drawer-social-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0.35rem 0.4rem;
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
}

@media (max-width: 980px) {
  .navbar {
    justify-content: space-between;
  }

  .nav-links,
  .nav-phone,
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

@media (max-width: 420px) {
  .mobile-drawer-actions {
    grid-template-columns: 1fr;
  }

  .mobile-drawer-socials {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
