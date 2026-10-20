<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { realtorProfile, featureFlags, currentLocale, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'
import heroPortrait from '@/assets/maryin-hero.jpg'

const instagramChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'instagram')
)

const facebookChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'facebook')
)

const realtorChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'realtor')
)
</script>

<template>
  <div class="home-view">
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="status-pill">
            <span class="status-dot" />
            <span>{{ t(realtorProfile.hero.status) }}</span>
          </div>

          <p class="eyebrow hero-eyebrow">{{ t(realtorProfile.hero.eyebrow) }}</p>

          <h1 class="hero-title">
            {{ t(realtorProfile.hero.headline) }}
          </h1>

          <p class="hero-subtitle">
            {{ t(realtorProfile.hero.subheadline) }}
          </p>

          <div class="hero-cta-row">
            <RouterLink to="/contact" class="btn btn-primary">
              <SocialIcon name="sparkles" :size="15" />
              <span>{{ t(realtorProfile.hero.primaryCta) }}</span>
            </RouterLink>
            <RouterLink
              v-if="featureFlags.neighborhoodVibeMatcher"
              to="/quiz"
              class="btn btn-outline hero-quiz-btn"
            >
              <span>🧭 {{ currentLocale === 'en' ? 'Take the Quiz' : 'Hacer el Quiz' }}</span>
            </RouterLink>
            <a :href="realtorProfile.phoneHref" class="btn btn-outline">
              <SocialIcon name="phone" :size="15" />
              <span>{{ t(realtorProfile.hero.secondaryCta) }}</span>
            </a>
          </div>

          <div class="hero-quick-links">
            <a :href="`mailto:${realtorProfile.primaryEmail}`" class="quick-pill">
              <SocialIcon name="email" :size="14" />
              <span>{{ realtorProfile.primaryEmail }}</span>
            </a>
            <a
              :href="realtorProfile.whatsappHref"
              target="_blank"
              rel="noopener noreferrer"
              class="quick-pill quick-pill-whatsapp"
            >
              <SocialIcon name="whatsapp" :size="14" />
              <span>WhatsApp Direct ↗</span>
            </a>
            <a
              v-if="instagramChannel"
              :href="instagramChannel.url"
              target="_blank"
              rel="noopener noreferrer"
              class="quick-pill quick-pill-instagram"
            >
              <SocialIcon name="instagram" :size="14" />
              <span>{{ instagramChannel.handle }} (52K+) ↗</span>
            </a>
            <a
              v-if="facebookChannel"
              :href="facebookChannel.url"
              target="_blank"
              rel="noopener noreferrer"
              class="quick-pill quick-pill-facebook"
            >
              <SocialIcon name="facebook" :size="14" />
              <span>Facebook ↗</span>
            </a>
            <a
              v-if="realtorChannel"
              :href="realtorChannel.url"
              target="_blank"
              rel="noopener noreferrer"
              class="quick-pill"
            >
              <SocialIcon name="realtor" :size="14" />
              <span>{{ t(realtorChannel.badge) }} ↗</span>
            </a>
          </div>
        </div>

        <div class="hero-portrait-col">
          <div v-tilt class="portrait-card card">
            <div class="portrait-image-wrap">
              <img
                :src="heroPortrait"
                :alt="realtorProfile.fullName"
                class="portrait-img"
              >
              <div class="portrait-badge-overlay">
                <span class="tag tag-gold">{{ t(realtorProfile.hero.portraitBadge) }}</span>
              </div>
            </div>

            <div class="portrait-caption">
              <div class="portrait-name-row">
                <div>
                  <h2 class="portrait-name">{{ realtorProfile.fullName }}</h2>
                  <p class="portrait-role">
                    {{ t(realtorProfile.hero.portraitRole) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DIRECT DOORS TO EVERY PART OF THE SITE -->
    <section class="section pathways-section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            {{ currentLocale === 'en' ? 'EXPLORE MARYIN’S PLATFORM' : 'EXPLORA LA PLATAFORMA' }}
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
          <article v-tilt class="card pathway-card pathway-card-highlight">
            <div class="pathway-top">
              <span class="pathway-icon">✨</span>
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
          </article>

          <article
            v-if="featureFlags.neighborhoodVibeMatcher"
            v-tilt
            class="card pathway-card"
          >
            <div class="pathway-top">
              <span class="pathway-icon">🧭</span>
              <span class="tag tag-gold">{{ currentLocale === 'en' ? '60-Sec Test' : 'Test 60 Seg' }}</span>
            </div>
            <h3 class="pathway-title">
              {{ currentLocale === 'en' ? 'Triangle Match Quiz' : 'Quiz de Comunidades' }}
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
          </article>

          <article v-tilt class="card pathway-card">
            <div class="pathway-top">
              <span class="pathway-icon">🗺️</span>
              <span class="tag">{{ currentLocale === 'en' ? '8 NC Counties' : '8 Condados' }}</span>
            </div>
            <h3 class="pathway-title">
              {{ currentLocale === 'en' ? 'NC Markets & Perks' : 'Mercados y Beneficios' }}
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
          </article>
        </div>
      </div>
    </section>

    <!-- WHAT TO EXPECT / CLIENT COMMITMENTS -->
    <section class="section commitments-section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            {{ t(realtorProfile.commitmentsHeader.eyebrow) }}
          </span>
          <h2 class="section-title">
            {{ t(realtorProfile.commitmentsHeader.title) }}
          </h2>
          <p class="section-subtitle">
            {{ t(realtorProfile.commitmentsHeader.subtitle) }}
          </p>
        </div>

        <div class="commitments-grid">
          <article
            v-for="item in realtorProfile.clientCommitments"
            :key="item.id"
            v-tilt
            class="card commitment-card"
          >
            <div class="commitment-top">
              <span class="commitment-num">{{ item.number }}</span>
              <span class="tag tag-gold">{{ t(item.pill) }}</span>
            </div>
            <h3 class="commitment-title">{{ t(item.title) }}</h3>
            <p class="commitment-summary">{{ t(item.summary) }}</p>
            <p class="commitment-details">{{ t(item.details) }}</p>
          </article>
        </div>

        <div class="section-cta-row">
          <RouterLink to="/about" class="btn btn-outline">
            {{ t(realtorProfile.commitmentsHeader.ctaBio) }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding: 3.75rem 0 2.5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: 2.5rem;
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.05rem;
}

.hero-eyebrow {
  margin-top: 0.2rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.15rem, 4.2vw, 3.35rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.08rem;
  color: var(--text-secondary);
  max-width: 630px;
}

.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.35rem;
}

.hero-quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.45rem;
}

.quick-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.78rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  transition: var(--btn-transition);
}

.quick-pill:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.quick-pill-whatsapp:hover {
  border-color: #10b981;
  color: #10b981;
}

.quick-pill-facebook:hover {
  border-color: #1877f2;
  color: #1877f2;
}

.quick-pill-instagram:hover {
  border-color: #e1306c;
  color: #e1306c;
}

.portrait-card {
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.portrait-image-wrap {
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  aspect-ratio: 4 / 4.2;
  background: var(--bg-secondary);
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.portrait-badge-overlay {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  z-index: 2;
}

.portrait-badge-overlay .tag {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  font-weight: 600;
}

[data-theme='light'] .portrait-badge-overlay .tag {
  background: rgba(255, 255, 255, 0.94);
  color: #78350f;
  border: 1px solid rgba(180, 83, 9, 0.35);
  box-shadow: 0 4px 14px rgba(41, 37, 36, 0.15);
}

.portrait-name-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.portrait-name {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
}

.portrait-role {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Pathways Gateway Section */
.pathways-section {
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
}

.pathways-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.pathway-card {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  padding: 1.85rem 1.65rem;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.pathway-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
}

.pathway-card-highlight {
  border-color: rgba(245, 158, 11, 0.35);
  background: linear-gradient(180deg, var(--bg-card) 0%, rgba(245, 158, 11, 0.03) 100%);
}

.pathway-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.pathway-icon {
  font-size: 1.65rem;
  line-height: 1;
}

.pathway-title {
  font-family: var(--font-serif);
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  margin: 0;
}

.pathway-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
  flex: 1;
}

.pathway-btn {
  margin-top: 0.5rem;
  width: 100%;
  justify-content: center;
  font-size: 0.88rem;
  padding: 0.65rem 1rem;
}

.commitments-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.commitment-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.75rem;
}

.commitment-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.commitment-num {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-primary);
  opacity: 0.8;
}

.commitment-title {
  font-family: var(--font-serif);
  font-size: 1.22rem;
  font-weight: 700;
  line-height: 1.3;
}

.commitment-summary {
  font-size: 0.94rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.commitment-details {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.55;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
  margin-top: 0.35rem;
}

.section-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.75rem;
}

@media (max-width: 960px) {
  .hero-section {
    padding: 1.75rem 0 1.5rem;
  }

  .hero-grid {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .hero-portrait-col {
    order: -1;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }

  .pathways-grid {
    grid-template-columns: 1fr;
  }

  .commitments-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .pathways-grid {
    grid-template-columns: 1fr;
  }
  .hero-section {
    padding: 1.15rem 0 1.25rem;
  }

  .portrait-card {
    padding: 0.9rem;
    gap: 0.75rem;
  }

  .hero-title {
    font-size: clamp(1.8rem, 7vw, 2.35rem);
  }

  .hero-subtitle {
    font-size: 0.98rem;
  }

  .hero-cta-row {
    width: 100%;
    flex-direction: column;
  }

  .hero-cta-row .btn {
    width: 100%;
  }

  .portrait-image-wrap {
    aspect-ratio: 4 / 3.6;
  }

  .section-cta-row {
    flex-direction: column;
  }

  .section-cta-row .btn {
    width: 100%;
  }
}
</style>
