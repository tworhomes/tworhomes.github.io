<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { realtorProfile, featureFlags, currentLocale, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'
import heroPortrait from '@/assets/maryin-hero.jpg'
import executivePortrait from '@/assets/maryin-executive.jpg'
import kitchenPortrait from '@/assets/maryin-kitchen.jpg'

let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver?.observe(el)
  })
})

onUnmounted(() => {
  revealObserver?.disconnect()
  revealObserver = null
})

const instagramChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'instagram')
)

const facebookChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'facebook')
)

const realtorChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'realtor')
)

// Curated high-resolution architectural photography matching each NC Enclave
const enclaveImages: Record<string, string> = {
  'Wake County, NC': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
  'Durham County, NC': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
  'Johnston County, NC': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
  'Franklin & Granville Counties, NC': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85',
  'Chatham, Orange & Alamance Counties, NC': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85'
}

function getEnclaveImage(county: string): string {
  return enclaveImages[county] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85'
}
</script>

<template>
  <div class="home-view">
    <!-- =====================================================================
         PLATE I — ASYMMETRIC MONOGRAPH HERO & PRODUCTION LEDGER
         ===================================================================== -->
    <section class="hero-section">
      <div class="container">
        <!-- Architectural Metadata Bar -->
        <div class="plate-meta-bar hero-metadata-bar">
          <div class="plate-meta-left">
            <span>PLATE I · RESEARCH TRIANGLE, NORTH CAROLINA</span>
          </div>
          <div class="plate-meta-right">
            <span>{{ realtorProfile.mlsAffiliation }}</span>
            <span class="meta-dot">·</span>
            <span>{{ realtorProfile.licenseNumber }}</span>
          </div>
        </div>

        <!-- Asymmetric 12-Column Hero Grid -->
        <div class="hero-grid">
          <!-- Left Editorial Column (7 Columns) -->
          <div class="hero-editorial-col">
            <!-- Status & Eyebrow -->
            <div class="hero-status-row">
              <div class="status-pill">
                <span class="status-dot" />
                <span>{{ t(realtorProfile.hero.status) }}</span>
              </div>
              <span class="eyebrow hero-eyebrow">{{ t(realtorProfile.hero.eyebrow) }}</span>
            </div>

            <!-- Monumental Serif Headline -->
            <h1 class="hero-title">
              {{ t(realtorProfile.hero.headline) }}
            </h1>

            <!-- Editorial Lead Subheadline -->
            <p class="hero-subheadline">
              {{ t(realtorProfile.hero.subheadline) }}
            </p>

            <!-- Primary Action Row -->
            <div class="hero-cta-row">
              <RouterLink to="/contact" class="btn btn-primary">
                <SocialIcon name="sparkles" :size="15" />
                <span>{{ t(realtorProfile.hero.primaryCta) }}</span>
              </RouterLink>

              <a :href="realtorProfile.phoneHref" class="btn btn-outline">
                <SocialIcon name="phone" :size="15" />
                <span>{{ t(realtorProfile.hero.secondaryCta) }}</span>
              </a>

              <RouterLink
                v-if="featureFlags.neighborhoodVibeMatcher"
                to="/quiz"
                class="btn btn-outline hero-quiz-btn"
              >
                <span>🧭 {{ currentLocale === 'en' ? '60-Sec Enclave Match' : 'Quiz de Zonas' }}</span>
              </RouterLink>
            </div>

            <!-- Private Client Calling Card Strip -->
            <div class="hero-calling-card">
              <a
                :href="realtorProfile.whatsappHref"
                target="_blank"
                rel="noopener noreferrer"
                class="calling-card-link whatsapp"
                aria-label="Direct WhatsApp Message"
              >
                <SocialIcon name="whatsapp" :size="13" />
                <span>WhatsApp Direct ↗</span>
              </a>

              <a
                v-if="instagramChannel"
                :href="instagramChannel.url"
                target="_blank"
                rel="noopener noreferrer"
                class="calling-card-link instagram"
                aria-label="Instagram Profile"
              >
                <SocialIcon name="instagram" :size="13" />
                <span>{{ instagramChannel.handle }} (52K+) ↗</span>
              </a>

              <a
                :href="`mailto:${realtorProfile.primaryEmail}`"
                class="calling-card-link email"
                aria-label="Send Direct Email"
              >
                <SocialIcon name="email" :size="13" />
                <span>{{ realtorProfile.primaryEmail }}</span>
              </a>

              <a
                v-if="facebookChannel"
                :href="facebookChannel.url"
                target="_blank"
                rel="noopener noreferrer"
                class="calling-card-link facebook"
                aria-label="Facebook Page"
              >
                <SocialIcon name="facebook" :size="13" />
                <span>Facebook ↗</span>
              </a>

              <a
                v-if="realtorChannel"
                :href="realtorChannel.url"
                target="_blank"
                rel="noopener noreferrer"
                class="calling-card-link realtor"
                aria-label="Realtor.com Verified Profile"
              >
                <SocialIcon name="realtor" :size="13" />
                <span>{{ currentLocale === 'en' ? 'Realtor.com Verified' : 'Realtor.com Verificado' }} ↗</span>
              </a>
            </div>

            <!-- 4-Column Production Monograph Ledger -->
            <div class="hero-stats-ledger">
              <div
                v-for="(stat, idx) in realtorProfile.stats"
                :key="idx"
                class="stat-ledger-item"
              >
                <span class="stat-ledger-num">0{{ idx + 1 }}</span>
                <span class="stat-ledger-val">{{ stat.value }}</span>
                <span class="stat-ledger-label">{{ t(stat.label) }}</span>
                <p class="stat-ledger-detail">{{ t(stat.detail) }}</p>
              </div>
            </div>
          </div>

          <!-- Right Dual-Layer Portrait & Architectural Composition (5 Columns) -->
          <div class="hero-composition-col">
            <div class="hero-composition">
              <div class="hero-plates-stage">
                <!-- Primary Tall Editorial Frame -->
                <div class="lux-img-frame hero-primary-plate">
                  <img
                    :src="heroPortrait"
                    :alt="realtorProfile.fullName + ' - Raleigh Broker & REALTOR®'"
                    class="lux-img-zoom hero-portrait-img"
                  />
                </div>

                <!-- Overlapping Secondary Architectural Detail Frame -->
                <div class="lux-img-frame hero-secondary-plate">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85"
                    alt="Luxury North Carolina Modern Estate Residence"
                    class="lux-img-zoom"
                  />
                  <div class="hero-secondary-caption">
                    <span>RALEIGH · CARY · CHAPEL HILL · NEW CONSTRUCTION</span>
                  </div>
                </div>
              </div>

              <!-- Architectural Caption Plate -->
              <div class="hero-caption-plate">
                <div class="caption-identity">
                  <h2 class="caption-name">{{ realtorProfile.fullName }}</h2>
                  <p class="caption-role">{{ t(realtorProfile.hero.portraitRole) }}</p>
                </div>
                <span class="tag tag-gold caption-tag">{{ t(realtorProfile.hero.portraitBadge) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         PLATE II — CURATED NORTH CAROLINA ENCLAVES & BUILDER PORTFOLIO
         ===================================================================== -->
    <section class="section enclaves-section">
      <div class="container">
        <!-- Architectural Metadata Bar -->
        <div class="plate-meta-bar">
          <div class="plate-meta-left">
            <span>PLATE II · ARCHITECTURAL ENCLAVES & BUILDER PORTFOLIO</span>
          </div>
          <div class="plate-meta-right">
            <span>WAKE · DURHAM · JOHNSTON · CHATHAM · FRANKLIN</span>
          </div>
        </div>

        <div class="section-header">
          <span class="eyebrow">
            {{ currentLocale === 'en' ? 'CURATED NORTH CAROLINA REGIONS' : 'REGIONES SELECTAS DE CAROLINA DEL NORTE' }}
          </span>
          <h2 class="section-title">
            {{ currentLocale === 'en' ? 'Curated North Carolina Enclaves' : 'Enclaves Selectos de Carolina del Norte' }}
          </h2>
          <p class="section-subtitle">
            {{ currentLocale === 'en'
              ? 'Deep transactional fluency across 8 high-growth Triangle counties, custom builds, and premier master-planned neighborhoods.'
              : 'Dominio del mercado en 8 condados clave de Carolina del Norte, desarrollos exclusivos y comunidades planeadas de alto valor.'
            }}
          </p>
        </div>

        <!-- Enclaves Showcase Grid -->
        <div class="enclaves-grid">
          <article
            v-for="(area, idx) in realtorProfile.marketAreas"
            :key="area.county"
            class="enclave-card card reveal-on-scroll"
            :class="{ 'enclave-card-featured': idx === 0 }"
            :style="{ transitionDelay: `${idx * 70}ms` }"
          >
            <!-- Enclave Image Frame with Lens Zoom -->
            <div class="lux-img-frame enclave-img-frame">
              <img
                :src="getEnclaveImage(area.county)"
                :alt="area.county + ' Architecture and Communities'"
                class="lux-img-zoom"
                loading="lazy"
              />
              <span class="enclave-index-badge">0{{ idx + 1 }}</span>
              <span class="tag tag-gold enclave-price-tag">{{ area.priceRange }}</span>
            </div>

            <!-- Enclave Details Body -->
            <div class="enclave-body">
              <h3 class="enclave-county-title">{{ area.county }}</h3>

              <!-- City Pills -->
              <div class="enclave-cities-wrap">
                <span
                  v-for="city in area.cities.slice(0, 5)"
                  :key="city"
                  class="enclave-city-chip"
                >
                  {{ city }}
                </span>
                <span v-if="area.cities.length > 5" class="enclave-city-chip more">
                  +{{ area.cities.length - 5 }}
                </span>
              </div>

              <!-- Highlight Copy -->
              <p class="enclave-highlight">{{ t(area.highlight) }}</p>

              <!-- Request Enclave Dossier Action -->
              <RouterLink
                :to="{ path: '/contact', query: { area: area.county } }"
                class="btn btn-outline enclave-cta-btn"
              >
                <span>{{ currentLocale === 'en' ? 'Request Enclave Dossier' : 'Solicitar Dossier' }}</span>
                <span class="enclave-arrow">→</span>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         PLATE III — THE ESPRESSO MONOGRAPH: STANDARD OF CARE
         ===================================================================== -->
    <section class="monograph-dark-section">
      <div class="container">
        <!-- Architectural Metadata Bar (Dark) -->
        <div class="plate-meta-bar monograph-meta-bar">
          <div class="plate-meta-left">
            <span>PLATE III · STANDARD OF CARE & EXECUTIVE ADVOCACY</span>
          </div>
          <div class="plate-meta-right">
            <span>{{ realtorProfile.fullName }} · {{ realtorProfile.licenseNumber }}</span>
          </div>
        </div>

        <div class="monograph-dark-grid">
          <!-- Left: Executive Portrait Plate -->
          <div class="monograph-portrait-col reveal-on-scroll">
            <div class="lux-img-frame monograph-portrait-frame">
              <img
                :src="executivePortrait"
                :alt="realtorProfile.fullName + ' - Executive Representation'"
                class="lux-img-zoom"
                loading="lazy"
              />
              <div class="monograph-portrait-tag">
                <span class="tag tag-gold">{{ currentLocale === 'en' ? 'Executive Broker' : 'Broker Ejecutiva' }}</span>
              </div>
            </div>
            <div class="monograph-portrait-caption">
              <p class="monograph-caption-lead">{{ realtorProfile.fullName }}</p>
              <p class="monograph-caption-sub">{{ realtorProfile.licenseNumber }} · {{ realtorProfile.brokerage }}</p>
            </div>
          </div>

          <!-- Right: Standard of Care & Commitments -->
          <div class="monograph-content-col">
            <span class="eyebrow monograph-eyebrow">{{ t(realtorProfile.commitmentsHeader.eyebrow) }}</span>
            <h2 class="monograph-title">{{ t(realtorProfile.commitmentsHeader.title) }}</h2>
            <p class="monograph-subtitle">{{ t(realtorProfile.commitmentsHeader.subtitle) }}</p>

            <div class="monograph-commitments-grid">
              <div
                v-for="(item, idx) in realtorProfile.clientCommitments"
                :key="item.id"
                class="monograph-commitment-item reveal-on-scroll"
                :style="{ transitionDelay: `${idx * 75}ms` }"
              >
                <div class="commitment-item-header">
                  <span class="commitment-item-num">{{ item.number }}</span>
                  <span class="tag tag-gold">{{ t(item.pill) }}</span>
                </div>
                <h3 class="commitment-item-title">{{ t(item.title) }}</h3>
                <p class="commitment-item-summary">{{ t(item.summary) }}</p>
                <p class="commitment-item-details">{{ t(item.details) }}</p>
              </div>
            </div>

            <div class="monograph-actions">
              <RouterLink to="/about" class="btn btn-gold">
                {{ t(realtorProfile.commitmentsHeader.ctaBio) }}
              </RouterLink>
              <RouterLink to="/contact" class="btn btn-outline monograph-outline-btn">
                {{ t(realtorProfile.commitmentsHeader.ctaConsultation) }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         PLATE IV — PRIVATE CLIENT CONCIERGE GATEWAYS
         ===================================================================== -->
    <section class="section pathways-section">
      <div class="container">
        <!-- Architectural Metadata Bar -->
        <div class="plate-meta-bar">
          <div class="plate-meta-left">
            <span>PLATE IV · PRIVATE CLIENT CONCIERGE GATEWAYS</span>
          </div>
          <div class="plate-meta-right">
            <span>THREE PRIVILEGE-DRIVEN CONCIERGE DOORWAYS</span>
          </div>
        </div>

        <div class="section-header">
          <span class="eyebrow">
            {{ currentLocale === 'en' ? 'BESPOKE REAL ESTATE PLATFORM' : 'PLATAFORMA INMOBILIARIA EXCLUSIVA' }}
          </span>
          <h2 class="section-title">
            {{ currentLocale === 'en' ? 'Where Would You Like to Begin?' : '¿Cómo Deseas Comenzar?' }}
          </h2>
          <p class="section-subtitle">
            {{ currentLocale === 'en'
              ? 'Direct doorways into Maryin’s bespoke consultation, tailored community quiz, and 8-county market guide.'
              : 'Acceso directo a la consulta personalizada con Maryin, test de comunidades y guía de 8 condados.'
            }}
          </p>
        </div>

        <div class="pathways-grid">
          <!-- Gateway 1: VIP Advisory / Start Your Journey -->
          <article class="card pathway-card reveal-on-scroll" style="transition-delay: 0ms;">
            <div class="lux-img-frame pathway-img-frame">
              <img
                :src="kitchenPortrait"
                alt="Maryin Dos Ramos Client Consultation"
                class="lux-img-zoom"
                loading="lazy"
              />
              <span class="pathway-index-badge">01</span>
            </div>

            <div class="pathway-body">
              <div class="pathway-top">
                <span class="tag tag-gold">{{ currentLocale === 'en' ? 'VIP Advisory' : 'Asesoría VIP' }}</span>
              </div>
              <h3 class="pathway-title">
                {{ currentLocale === 'en' ? 'Start Your Journey' : 'Comienza Tu Plan' }}
              </h3>
              <p class="pathway-desc">
                {{ currentLocale === 'en'
                  ? 'Connect directly to plan your home search, receive builder representation, or request a bespoke home valuation CMA.'
                  : 'Planifica tu compra de casa, recibe asesoría para casas nuevas o solicita una valoración CMA de tu propiedad.'
                }}
              </p>
              <RouterLink to="/contact" class="btn btn-primary pathway-btn">
                <span>{{ currentLocale === 'en' ? 'Start Consultation' : 'Iniciar Consulta' }} →</span>
              </RouterLink>
            </div>
          </article>

          <!-- Gateway 2: Community Vibe Matcher Quiz -->
          <article
            v-if="featureFlags.neighborhoodVibeMatcher"
            class="card pathway-card reveal-on-scroll"
            style="transition-delay: 80ms;"
          >
            <div class="lux-img-frame pathway-img-frame">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
                alt="Triangle Neighborhoods & Master Planned Communities"
                class="lux-img-zoom"
                loading="lazy"
              />
              <span class="pathway-index-badge">02</span>
            </div>

            <div class="pathway-body">
              <div class="pathway-top">
                <span class="tag tag-gold">{{ currentLocale === 'en' ? '60-Sec Enclave Match' : 'Test 60 Seg' }}</span>
              </div>
              <h3 class="pathway-title">
                {{ currentLocale === 'en' ? 'Triangle Enclave Match' : 'Quiz de Comunidades' }}
              </h3>
              <p class="pathway-desc">
                {{ currentLocale === 'en'
                  ? 'Answer 3 quick lifestyle questions to discover your tailored Triangle town, school district, and commute pocket.'
                  : 'Responde 3 preguntas rápidas para descubrir tu zona ideal, escuelas y traslados en el Triangle.'
                }}
              </p>
              <RouterLink to="/quiz" class="btn btn-outline pathway-btn">
                <span>{{ currentLocale === 'en' ? 'Take the Quiz' : 'Hacer el Quiz' }} →</span>
              </RouterLink>
            </div>
          </article>

          <!-- Gateway 3: NC Markets & Builder Perks -->
          <article class="card pathway-card reveal-on-scroll" style="transition-delay: 160ms;">
            <div class="lux-img-frame pathway-img-frame">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85"
                alt="North Carolina Modern Architecture & Builder Communities"
                class="lux-img-zoom"
                loading="lazy"
              />
              <span class="pathway-index-badge">03</span>
            </div>

            <div class="pathway-body">
              <div class="pathway-top">
                <span class="tag">{{ currentLocale === 'en' ? '8 NC Counties' : '8 Condados' }}</span>
              </div>
              <h3 class="pathway-title">
                {{ currentLocale === 'en' ? 'NC Markets & Builder Perks' : 'Mercados y Beneficios' }}
              </h3>
              <p class="pathway-desc">
                {{ currentLocale === 'en'
                  ? 'Search 30+ communities across Wake, Durham, Johnston, and Chatham with builder incentives and market insights.'
                  : 'Explora más de 30 ciudades en Wake, Durham, Johnston y Chatham con incentivos de constructoras.'
                }}
              </p>
              <RouterLink to="/markets" class="btn btn-outline pathway-btn">
                <span>{{ currentLocale === 'en' ? 'Explore Markets' : 'Ver Mercados' }} →</span>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============================================================================
   ARCHITECTURAL METADATA BAR (SHARED ACROSS PLATES)
   ============================================================================ */
.plate-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 2.75rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.plate-meta-left {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--accent-primary);
  font-weight: 600;
}

.plate-meta-right {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-muted);
  text-align: right;
}

.meta-dot {
  opacity: 0.4;
}

/* ============================================================================
   PLATE I — ASYMMETRIC MONOGRAPH HERO & PRODUCTION LEDGER
   ============================================================================ */
.hero-section {
  padding: 2.25rem 0 4.5rem;
}

.hero-metadata-bar {
  margin-bottom: 2.25rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 3.5rem;
  align-items: flex-start;
}

.hero-editorial-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-status-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 1.15rem;
}

.hero-eyebrow {
  letter-spacing: 0.16em;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.45rem, 4.6vw, 4.15rem);
  font-weight: 400;
  line-height: 1.06;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}

.hero-subheadline {
  font-size: 1.06rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 630px;
  margin-bottom: 1.85rem;
}

.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

/* Private Client Calling Card Strip */
.hero-calling-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 2.5rem;
  width: 100%;
}

.calling-card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.82rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  transition: var(--btn-transition);
}

.calling-card-link:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
  transform: var(--btn-hover-transform);
}

.calling-card-link:active {
  transform: var(--btn-active-transform);
}

.calling-card-link.whatsapp:hover {
  border-color: #10B981;
  color: #10B981;
}

.calling-card-link.instagram:hover {
  border-color: #E1306C;
  color: #E1306C;
}

.calling-card-link.facebook:hover {
  border-color: #1877F2;
  color: #1877F2;
}

/* 4-Column Production Monograph Ledger */
.hero-stats-ledger {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.stat-ledger-item {
  display: flex;
  flex-direction: column;
  padding: 1.35rem 1rem 1.35rem 0.85rem;
  border-right: 1px solid var(--border-subtle);
}

.stat-ledger-item:first-child {
  padding-left: 0;
}

.stat-ledger-item:last-child {
  border-right: none;
  padding-right: 0;
}

.stat-ledger-num {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--accent-primary);
  margin-bottom: 0.35rem;
}

.stat-ledger-val {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 2.5vw, 2.5rem);
  font-weight: 400;
  line-height: 1.05;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
  letter-spacing: -0.02em;
}

.stat-ledger-label {
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.stat-ledger-detail {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

/* Right Dual-Layer Composition */
.hero-composition-col {
  width: 100%;
}

.hero-composition {
  position: relative;
  width: 100%;
  animation: editorialCurtain 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

.hero-plates-stage {
  position: relative;
  width: 100%;
  padding-bottom: 1.75rem;
}

.hero-primary-plate {
  width: 88%;
  margin-left: auto;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
}

.hero-portrait-img {
  object-position: center top;
}

.hero-secondary-plate {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 55%;
  aspect-ratio: 16 / 10.5;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-hover);
  box-shadow: 0 22px 44px -10px rgba(0, 0, 0, 0.45);
  z-index: 3;
}

.hero-secondary-caption {
  position: absolute;
  bottom: 0.45rem;
  left: 0.45rem;
  right: 0.45rem;
  padding: 0.35rem 0.55rem;
  background: rgba(20, 19, 17, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-primary);
  border: 1px solid rgba(246, 244, 239, 0.12);
}

.hero-caption-plate {
  margin-top: 1.25rem;
  padding-top: 0.95rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.caption-identity {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.caption-name {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.caption-role {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.caption-tag {
  flex-shrink: 0;
}

/* ============================================================================
   PLATE II — CURATED NORTH CAROLINA ENCLAVES & BUILDER PORTFOLIO
   ============================================================================ */
.enclaves-section {
  padding-top: 5rem;
  padding-bottom: 5.5rem;
}

.enclaves-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.65rem;
}

.enclave-card {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.enclave-card-featured {
  grid-column: span 2;
}

.enclave-card-featured .enclave-img-frame {
  aspect-ratio: 21 / 9.5;
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-status-row {
  animation: editorialRevealUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
}

.hero-title {
  animation: editorialRevealUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}

.hero-subheadline {
  animation: editorialRevealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.hero-cta-row {
  animation: editorialRevealUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}

.hero-calling-card {
  animation: editorialRevealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.34s both;
}

.hero-stats-ledger {
  animation: editorialRevealUp 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
}

.enclave-img-frame {
  aspect-ratio: 16 / 10;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
}

.enclave-index-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: #F6F4EF;
  background: rgba(20, 19, 17, 0.8);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(246, 244, 239, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.enclave-price-tag {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.enclave-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.5rem 1.65rem 1.65rem;
  flex: 1;
}

.enclave-county-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.25;
}

.enclave-cities-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.enclave-city-chip {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  padding: 0.22rem 0.55rem;
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}

.enclave-city-chip.more {
  color: var(--accent-primary);
}

.enclave-highlight {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
}

.enclave-cta-btn {
  width: 100%;
  justify-content: space-between;
  margin-top: 0.35rem;
  font-size: 0.74rem;
  padding: 0.7rem 1.15rem;
}

.enclave-arrow {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--accent-primary);
  transition: transform var(--btn-duration) var(--btn-ease);
}

.enclave-cta-btn:hover .enclave-arrow {
  transform: translateX(3px);
}

/* ============================================================================
   PLATE III — THE ESPRESSO MONOGRAPH: STANDARD OF CARE
   ============================================================================ */
.monograph-dark-section {
  background: #141311;
  color: #F6F4EF;
  border-top: 1px solid rgba(246, 244, 239, 0.12);
  border-bottom: 1px solid rgba(246, 244, 239, 0.12);
  padding: 5.5rem 0;
  position: relative;
  overflow: hidden;
}

.monograph-meta-bar {
  border-bottom-color: rgba(246, 244, 239, 0.12);
  margin-bottom: 3.5rem;
}

.monograph-dark-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.35fr;
  gap: 3.5rem;
  align-items: flex-start;
}

.monograph-portrait-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.monograph-portrait-frame {
  aspect-ratio: 4 / 5.2;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(246, 244, 239, 0.14);
  box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.75);
}

.monograph-portrait-tag {
  position: absolute;
  bottom: 0.85rem;
  left: 0.85rem;
}

.monograph-portrait-caption {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(246, 244, 239, 0.12);
}

.monograph-caption-lead {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  color: #F6F4EF;
  font-weight: 600;
}

.monograph-caption-sub {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #B89768;
}

.monograph-content-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.monograph-eyebrow {
  color: #B89768;
  margin-bottom: 0.65rem;
}

.monograph-title {
  font-family: var(--font-serif);
  font-size: clamp(2.1rem, 3.8vw, 3.2rem);
  font-weight: 400;
  line-height: 1.1;
  color: #F6F4EF;
  margin-bottom: 1.15rem;
}

.monograph-subtitle {
  font-size: 1.04rem;
  color: #C2BDB2;
  line-height: 1.7;
  max-width: 660px;
  margin-bottom: 2.25rem;
}

.monograph-commitments-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  width: 100%;
  margin-bottom: 2.5rem;
}

.monograph-commitment-item {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  background: #1C1A17;
  border: 1px solid rgba(246, 244, 239, 0.1);
  border-radius: var(--radius-sm);
  padding: 1.45rem;
  transition: var(--transition-hover);
}

.monograph-commitment-item:hover {
  border-color: rgba(184, 151, 104, 0.45);
}

.commitment-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.commitment-item-num {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #B89768;
  font-weight: 700;
}

.commitment-item-title {
  font-family: var(--font-serif);
  font-size: 1.18rem;
  font-weight: 600;
  color: #F6F4EF;
  line-height: 1.3;
}

.commitment-item-summary {
  font-size: 0.88rem;
  color: #EAE6DF;
  line-height: 1.55;
}

.commitment-item-details {
  font-size: 0.82rem;
  color: #8A8478;
  line-height: 1.5;
  border-top: 1px solid rgba(246, 244, 239, 0.08);
  padding-top: 0.55rem;
  margin-top: 0.35rem;
}

.monograph-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.monograph-outline-btn {
  border-color: rgba(246, 244, 239, 0.25);
  color: #F6F4EF;
}

.monograph-outline-btn:hover {
  border-color: #B89768;
  color: #B89768;
  background: rgba(184, 151, 104, 0.1);
}

/* ============================================================================
   PLATE IV — PRIVATE CLIENT CONCIERGE GATEWAYS
   ============================================================================ */
.pathways-section {
  padding-top: 5rem;
  padding-bottom: 5.5rem;
}

.pathways-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.65rem;
}

.pathway-card {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pathway-img-frame {
  aspect-ratio: 16 / 10;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
}

.pathway-index-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: #F6F4EF;
  background: rgba(20, 19, 17, 0.8);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(246, 244, 239, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.pathway-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.5rem 1.65rem 1.65rem;
  flex: 1;
}

.pathway-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pathway-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.25;
}

.pathway-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
}

.pathway-btn {
  margin-top: 0.5rem;
  width: 100%;
  font-size: 0.76rem;
  padding: 0.75rem 1rem;
}

/* ============================================================================
   RESPONSIVE DESIGN SYSTEM (360PX - 1200PX)
   ============================================================================ */
@media (max-width: 1100px) {
  .hero-grid {
    grid-template-columns: 1.15fr 0.9fr;
    gap: 2.5rem;
  }

  .enclaves-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .enclave-card-featured {
    grid-column: span 2;
  }

  .monograph-dark-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .monograph-portrait-col {
    max-width: 420px;
  }
}

@media (max-width: 960px) {
  .hero-section {
    padding: 1.75rem 0 3rem;
  }

  .hero-grid {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .hero-composition-col {
    order: -1;
    max-width: 480px;
    margin: 0 auto;
  }

  .pathways-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-stats-ledger {
    grid-template-columns: repeat(2, 1fr);
    border-bottom: none;
  }

  .stat-ledger-item {
    padding: 1.15rem 0.85rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .stat-ledger-item:nth-child(2n) {
    border-right: none;
  }

  .enclaves-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }

  .enclave-card-featured {
    grid-column: span 1;
  }

  .enclave-card-featured .enclave-img-frame {
    aspect-ratio: 16 / 10;
  }

  .monograph-commitments-grid {
    grid-template-columns: 1fr;
  }

  .plate-meta-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
    margin-bottom: 1.75rem;
  }
}

@media (max-width: 520px) {
  .hero-title {
    font-size: clamp(2rem, 8vw, 2.6rem);
  }

  .hero-cta-row {
    flex-direction: column;
    width: 100%;
  }

  .hero-cta-row .btn {
    width: 100%;
  }

  .hero-stats-ledger {
    grid-template-columns: 1fr;
  }

  .stat-ledger-item {
    border-right: none;
    padding-left: 0;
    padding-right: 0;
  }

  .hero-secondary-plate {
    width: 62%;
    bottom: 1.2rem;
  }

  .hero-secondary-caption {
    font-size: 0.52rem;
    padding: 0.25rem 0.4rem;
  }

  .monograph-actions {
    flex-direction: column;
    width: 100%;
  }

  .monograph-actions .btn {
    width: 100%;
  }
}
</style>
