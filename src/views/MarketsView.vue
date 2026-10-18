<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { realtorProfile, featureFlags, currentLocale, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'

const router = useRouter()

// Interactive State
const searchQuery = ref('')
const selectedRegion = ref('all')
const activeCity = ref<string | null>(null)
const activeCounty = ref<string | null>(null)
const selectedTargetArea = ref('Raleigh / Wake County')
const customLocationPreset = ref('')

function goToContact(city?: string, county?: string) {
  if (city && county) {
    selectCity(city, county)
  }
  router.push({
    path: '/contact',
    query: {
      area: selectedTargetArea.value,
      location: customLocationPreset.value || (city ? `${city}, NC` : undefined)
    }
  })
}

// Map selected city/county to consultation area preset
function selectCity(city: string, county: string) {
  if (activeCity.value === city) {
    activeCity.value = null
    activeCounty.value = null
    customLocationPreset.value = ''
    return
  }

  activeCity.value = city
  activeCounty.value = county
  customLocationPreset.value = `${city}, NC`

  // Map to target area preset
  if (county.includes('Wake')) {
    if (['Cary', 'Apex', 'Holly Springs'].includes(city)) {
      selectedTargetArea.value = 'Cary / Apex / Holly Springs'
    } else if (['Zebulon', 'Wendell', 'Rolesville'].includes(city)) {
      selectedTargetArea.value = 'Zebulon / Wendell / Rolesville'
    } else {
      selectedTargetArea.value = 'Raleigh / Wake County'
    }
  } else if (county.includes('Durham')) {
    selectedTargetArea.value = 'Durham / RTP Corridor'
  } else if (county.includes('Johnston')) {
    selectedTargetArea.value = 'Clayton / Johnston County'
  } else if (county.includes('Franklin') || county.includes('Granville')) {
    selectedTargetArea.value = 'Franklin / Granville / Alamance Counties'
  } else if (county.includes('Chatham') || county.includes('Orange') || county.includes('Alamance')) {
    selectedTargetArea.value = 'Chapel Hill / Orange & Chatham Counties'
  } else {
    selectedTargetArea.value = 'Other North Carolina Area / Open to Locations'
  }
}

function clearSelection() {
  activeCity.value = null
  activeCounty.value = null
  customLocationPreset.value = ''
}

function clearFilters() {
  searchQuery.value = ''
  selectedRegion.value = 'all'
  clearSelection()
}

// Filtered regions and matching communities
const filteredMarketAreas = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return realtorProfile.marketAreas.filter(area => {
    if (selectedRegion.value !== 'all' && area.county !== selectedRegion.value) {
      return false
    }
    if (!query) return true

    const countyMatch = area.county.toLowerCase().includes(query)
    const highlightMatch = t(area.highlight).toLowerCase().includes(query)
    const citiesMatch = area.cities.some(c => c.toLowerCase().includes(query))
    return countyMatch || highlightMatch || citiesMatch
  })
})

const totalCitiesCount = computed(() => {
  return filteredMarketAreas.value.reduce((acc, a) => acc + a.cities.length, 0)
})

const whatsappCityHref = computed(() => {
  const city = activeCity.value || 'North Carolina'
  const msg = currentLocale.value === 'en'
    ? `Hello Maryin! I am interested in exploring homes and new-construction opportunities in ${city}, NC. Could you share active options and builder incentives?`
    : `¡Hola Maryin! Me interesa conocer opciones de casas y construcción nueva en ${city}, NC. ¿Podrías compartirme opciones disponibles e incentivos con constructores?`
  return `https://wa.me/${realtorProfile.phoneRaw}?text=${encodeURIComponent(msg)}`
})
</script>

<template>
  <div class="markets-view">
    <!-- SECTION HEADER & COVERAGE OVERVIEW -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            {{ t(realtorProfile.marketsPage.header.eyebrow) }}
          </span>
          <h1 class="section-title">
            {{ t(realtorProfile.marketsPage.header.title) }}
          </h1>
          <p class="section-subtitle">
            {{ t(realtorProfile.marketsPage.header.subtitle) }}
          </p>
        </div>

        <!-- INTERACTIVE SEARCH & REGION SELECTOR BAR -->
        <div class="market-controls-wrapper">
          <div class="market-search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              class="market-search-input"
              :placeholder="currentLocale === 'en' ? 'Search any city, county, or community (e.g. Clayton, Cary, Flowers Plantation, Durham)...' : 'Buscar ciudad, condado o comunidad (ej. Clayton, Cary, Durham)...'"
            >
            <button
              v-if="searchQuery"
              type="button"
              class="search-clear-btn"
              title="Clear search"
              @click="searchQuery = ''"
            >
              ✕
            </button>
          </div>

          <!-- Region Pills -->
          <div class="region-tabs" role="tablist">
            <button
              type="button"
              class="region-tab"
              :class="{ active: selectedRegion === 'all' }"
              @click="selectedRegion = 'all'"
            >
              {{ currentLocale === 'en' ? 'All 8 Counties' : 'Todos los Condados' }} ({{ realtorProfile.marketAreas.length }})
            </button>
            <button
              v-for="area in realtorProfile.marketAreas"
              :key="area.county"
              type="button"
              class="region-tab"
              :class="{ active: selectedRegion === area.county }"
              @click="selectedRegion = area.county"
            >
              {{ area.county.replace(', NC', '') }}
            </button>
          </div>

          <div class="controls-status-row">
            <span class="status-count">
              {{ currentLocale === 'en' ? `Showing ${filteredMarketAreas.length} Region${filteredMarketAreas.length === 1 ? '' : 's'} · ${totalCitiesCount} Communities` : `Mostrando ${filteredMarketAreas.length} Región(es) · ${totalCitiesCount} Comunidades` }}
            </span>
            <div class="controls-status-actions">
              <RouterLink
                v-if="featureFlags.neighborhoodVibeMatcher"
                to="/quiz"
                class="quiz-pill-btn"
              >
                🧭 {{ currentLocale === 'en' ? 'Take Triangle Quiz' : 'Hacer Quiz de Zonas' }} →
              </RouterLink>
              <button
                v-if="searchQuery || selectedRegion !== 'all' || activeCity"
                type="button"
                class="reset-filters-btn"
                @click="clearFilters"
              >
                {{ currentLocale === 'en' ? 'Reset All Filters ↺' : 'Reiniciar Filtros ↺' }}
              </button>
            </div>
          </div>
        </div>

        <!-- INTERACTIVE ACTIVE SELECTION SPOTLIGHT BAR -->
        <Transition name="spotlight-slide">
          <div v-if="activeCity" class="card active-spotlight-card">
            <div class="spotlight-left">
              <div class="spotlight-badge-row">
                <span class="tag tag-gold">{{ activeCounty }}</span>
                <span class="tag tag-emerald">{{ currentLocale === 'en' ? 'Active Selection' : 'Selección Activa' }}</span>
              </div>
              <h2 class="spotlight-city">📍 {{ activeCity }}, NC</h2>
              <p class="spotlight-desc">
                {{ currentLocale === 'en' ? `Ready to explore MLS listings, off-market builder lots, or schedule a tour in ${activeCity}?` : `¿Listo para ver casas disponibles, lotes nuevos o agendar un recorrido en ${activeCity}?` }}
              </p>
            </div>
            <div class="spotlight-actions">
              <button
                type="button"
                class="btn btn-primary spotlight-btn"
                @click="goToContact()"
              >
                🎯 {{ currentLocale === 'en' ? `Plan ${activeCity} Search →` : `Planificar para ${activeCity} →` }}
              </button>
              <a
                :href="whatsappCityHref"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline spotlight-btn"
              >
                <SocialIcon name="whatsapp" :size="16" />
                <span>{{ currentLocale === 'en' ? 'WhatsApp Direct' : 'Chat en WhatsApp' }}</span>
              </a>
              <button
                type="button"
                class="spotlight-close-btn"
                title="Deselect"
                @click="clearSelection"
              >
                ✕
              </button>
            </div>
          </div>
        </Transition>

        <!-- MARKETS GRID -->
        <div v-if="filteredMarketAreas.length > 0" class="markets-grid">
          <article
            v-for="area in filteredMarketAreas"
            :key="area.county"
            class="card market-card"
            :class="{ 'market-card-active': activeCounty === area.county }"
          >
            <div class="market-top">
              <div>
                <h2 class="market-county">{{ area.county }}</h2>
                <span class="market-count-badge">
                  {{ area.cities.length }} {{ currentLocale === 'en' ? 'Communities Covered' : 'Comunidades' }}
                </span>
              </div>
              <span class="tag tag-gold">{{ area.priceRange }}</span>
            </div>

            <p class="market-highlight">{{ t(area.highlight) }}</p>

            <div class="city-chips-section">
              <p class="city-chips-label">
                {{ currentLocale === 'en' ? 'Tap any community to explore & plan:' : 'Toca cualquier comunidad para explorar:' }}
              </p>
              <div class="city-chips">
                <button
                  v-for="city in area.cities"
                  :key="city"
                  type="button"
                  class="city-chip-btn"
                  :class="{ 'city-chip-active': activeCity === city }"
                  @click="selectCity(city, area.county)"
                >
                  <span class="chip-pin">📍</span>
                  <span class="chip-name">{{ city }}</span>
                  <span v-if="activeCity === city" class="chip-check">✓</span>
                </button>
              </div>
            </div>

            <div class="market-card-footer">
              <button
                type="button"
                class="card-action-btn"
                @click="goToContact(area.cities[0], area.county)"
              >
                {{ currentLocale === 'en' ? `Explore ${area.county.replace(', NC', '')} Homes & Builder Perks →` : `Explorar Opciones en ${area.county.replace(', NC', '')} →` }}
              </button>
            </div>
          </article>
        </div>

        <!-- NO RESULTS EMPTY STATE -->
        <div v-else class="card empty-search-card">
          <p class="empty-icon">📍</p>
          <h3 class="empty-title">
            {{ currentLocale === 'en' ? `No communities found matching "${searchQuery}"` : `No se encontraron comunidades con "${searchQuery}"` }}
          </h3>
          <p class="empty-sub">
            {{ currentLocale === 'en' ? 'Maryin helps families across all North Carolina cities and surrounding regions. You can enter any custom city directly into our client planner.' : 'Maryin asesora familias en cualquier ciudad de Carolina del Norte. Puedes ingresar tu ubicación deseada directamente en nuestro planificador.' }}
          </p>
          <div class="empty-actions">
            <button type="button" class="btn btn-outline" @click="clearFilters">
              {{ currentLocale === 'en' ? 'Clear Search & Show All Areas' : 'Limpiar Búsqueda y Ver Todo' }}
            </button>
            <button type="button" class="btn btn-primary" @click="goToContact()">
              {{ currentLocale === 'en' ? 'Open Custom Location Planner →' : 'Abrir Planificador Personalizado →' }}
            </button>
          </div>
        </div>
      </div>
    </section>
 
    <!-- BUILDER INCENTIVES & BUYER/SELLER PROGRAMS -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            {{ t(realtorProfile.marketsPage.programsHeader.eyebrow) }}
          </span>
          <h2 class="section-title">
            {{ t(realtorProfile.marketsPage.programsHeader.title) }}
          </h2>
        </div>

        <div class="pillars-grid">
          <article
            v-for="pillar in realtorProfile.servicePillars"
            :key="pillar.id"
            class="card pillar-card"
          >
            <div class="pillar-top">
              <span class="pillar-code">{{ pillar.code }}</span>
              <span class="tag">{{ t(pillar.badge) }}</span>
            </div>
            <h3 class="pillar-title">{{ t(pillar.title) }}</h3>
            <p class="pillar-subtitle">{{ t(pillar.subtitle) }}</p>
            <ul class="pillar-list">
              <li v-for="(bullet, idx) in pillar.bullets" :key="idx">
                <span class="check-mark">✓</span>
                <span>{{ t(bullet) }}</span>
              </li>
            </ul>
            <RouterLink to="/contact" class="btn btn-outline pillar-btn">
              {{ t(realtorProfile.marketsPage.programsHeader.cta) }}
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Controls & Search */
.market-controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin-bottom: 1.75rem;
}

.market-search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.05rem;
  pointer-events: none;
  opacity: 0.7;
}

.market-search-input {
  width: 100%;
  padding: 0.95rem 2.85rem 0.95rem 3rem;
  font-size: 0.96rem;
  font-family: var(--font-sans);
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  outline: none;
  transition: var(--btn-transition);
}

.market-search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.search-clear-btn {
  position: absolute;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
}

.search-clear-btn:hover {
  color: var(--text-primary);
}

/* Region Tabs */
.region-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.region-tab {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 999px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--btn-transition);
  white-space: nowrap;
}

.region-tab:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.region-tab.active {
  background: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
  box-shadow: var(--btn-shadow);
}

.controls-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 0 0.2rem;
  flex-wrap: wrap;
}

.controls-status-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.quiz-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent-primary);
  background: var(--accent-glow);
  border: 1px solid var(--accent-primary);
  border-radius: 9999px;
  padding: 0.3rem 0.85rem;
  text-decoration: none;
  transition: var(--btn-transition);
}

.quiz-pill-btn:hover {
  background: var(--accent-primary);
  color: #ffffff;
  transform: var(--btn-hover-transform);
}

.reset-filters-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 500;
  font-size: 0.84rem;
}

.reset-filters-btn:hover {
  color: var(--text-primary);
  text-decoration: underline;
}

/* Active Spotlight Card */
.active-spotlight-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.35rem 1.65rem;
  margin-bottom: 1.75rem;
  border-color: var(--accent-primary);
  background: linear-gradient(135deg, var(--bg-elevated) 0%, rgba(56, 189, 248, 0.08) 100%);
  box-shadow: 0 8px 28px -8px var(--accent-glow);
  flex-wrap: wrap;
}

.spotlight-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-width: 260px;
}

.spotlight-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-emerald {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.3);
}

.spotlight-city {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.015em;
}

.spotlight-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.spotlight-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.spotlight-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.spotlight-close-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: var(--btn-transition);
}

.spotlight-close-btn:hover {
  color: var(--text-primary);
  border-color: var(--text-muted);
}

/* Markets Grid */
.markets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.35rem;
}

.market-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.65rem;
  transition: var(--btn-transition);
  position: relative;
}

.market-card:hover {
  transform: var(--btn-hover-transform);
  border-color: var(--border-hover);
}

.market-card-active {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

.market-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.market-county {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.market-count-badge {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-muted);
  display: block;
  margin-top: 0.2rem;
}

.market-highlight {
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

.city-chips-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.city-chips-label {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.city-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.city-chip-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.42rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.84rem;
  font-family: var(--font-sans);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--btn-transition);
  user-select: none;
}

.city-chip-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-1px);
}

.city-chip-btn.city-chip-active {
  background: rgba(56, 189, 248, 0.12);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  font-weight: 600;
  box-shadow: 0 2px 8px var(--accent-glow);
}

.chip-pin {
  font-size: 0.78rem;
  opacity: 0.85;
}

.chip-check {
  color: var(--accent-emerald);
  font-weight: 800;
  font-size: 0.85rem;
}

.market-card-footer {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

.card-action-btn {
  background: none;
  border: none;
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: var(--btn-transition);
}

.card-action-btn:hover {
  color: var(--accent-secondary);
  transform: translateX(3px);
}

/* Empty State */
.empty-search-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 2rem;
  gap: 1rem;
}

.empty-icon {
  font-size: 2.2rem;
}

.empty-title {
  font-size: 1.3rem;
  font-weight: 700;
}

.empty-sub {
  color: var(--text-secondary);
  max-width: 540px;
  font-size: 0.94rem;
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

/* Service Pillars Grid */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.pillar-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.65rem;
}

.pillar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.15rem;
}

.pillar-code {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-primary);
  opacity: 0.85;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.pillar-title {
  font-size: 1.18rem;
  font-weight: 700;
}

.pillar-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.pillar-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.87rem;
  color: var(--text-secondary);
  flex: 1;
}

.pillar-list li {
  display: flex;
  gap: 0.45rem;
}

.check-mark {
  color: var(--accent-emerald);
  font-weight: 700;
}

@media (max-width: 920px) {
  .markets-grid,
  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .active-spotlight-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .spotlight-actions {
    width: 100%;
  }

  .spotlight-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
