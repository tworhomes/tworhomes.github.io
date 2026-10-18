<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { realtorProfile, t } from '@/data/realtorProfile'
import ClientFunnelWidget from '@/components/ClientFunnelWidget.vue'
import ImpactStoriesSection from '@/components/ImpactStoriesSection.vue'
import SocialHubSection from '@/components/SocialHubSection.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import heroPortrait from '@/assets/maryin-hero.jpg'

const instagramChannel = computed(() =>
  realtorProfile.socialChannels.find(s => s.id === 'instagram')
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
            <a href="#client-funnel" class="btn btn-primary">
              <SocialIcon name="sparkles" :size="15" />
              <span>{{ t(realtorProfile.hero.primaryCta) }}</span>
            </a>
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
              class="quick-pill"
            >
              <SocialIcon name="instagram" :size="14" />
              <span>{{ instagramChannel.handle }} (52K+) ↗</span>
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
          <div class="portrait-card card">
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

              <div class="portrait-credentials">
                <span
                  v-for="(cred, idx) in realtorProfile.hero.portraitCredentials"
                  :key="idx"
                  class="tag"
                >
                  {{ t(cred) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AUTHORITY & PRODUCTION METRICS BAR -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div
            v-for="stat in realtorProfile.stats"
            :key="stat.value"
            class="card stat-card"
          >
            <p class="stat-value">{{ stat.value }}</p>
            <h3 class="stat-label">{{ t(stat.label) }}</h3>
            <p class="stat-detail">{{ t(stat.detail) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 53+ HOMES SOLD & LIVES CHANGED SPOTLIGHT -->
    <ImpactStoriesSection />

    <!-- INTERACTIVE CLIENT ACQUISITION FUNNEL -->
    <section id="client-funnel" class="section">
      <div class="container">
        <ClientFunnelWidget />
      </div>
    </section>

    <!-- CORE SERVICE PILLARS ("HOW MARYIN WINS FOR CLIENTS") -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            {{ t(realtorProfile.servicePillarsHeader.eyebrow) }}
          </span>
          <h2 class="section-title">
            {{ t(realtorProfile.servicePillarsHeader.title) }}
          </h2>
          <p class="section-subtitle">
            {{ t(realtorProfile.bio.lead) }}
          </p>
        </div>

        <div class="pillars-grid">
          <article
            v-for="pillar in realtorProfile.servicePillars"
            :key="pillar.id"
            class="card pillar-card"
          >
            <div class="pillar-top">
              <span class="pillar-code">{{ pillar.code }}</span>
              <span class="tag tag-gold">{{ t(pillar.badge) }}</span>
            </div>
            <h3 class="pillar-title">{{ t(pillar.title) }}</h3>
            <p class="pillar-subtitle">{{ t(pillar.subtitle) }}</p>
            <ul class="pillar-list">
              <li v-for="(bullet, idx) in pillar.bullets" :key="idx">
                <span class="check-mark">✓</span>
                <span>{{ t(bullet) }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- WHAT TO EXPECT / CLIENT COMMITMENTS -->
    <section class="section">
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
          <RouterLink to="/contact" class="btn btn-primary">
            {{ t(realtorProfile.commitmentsHeader.ctaConsultation) }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- OMNICHANNEL SOCIAL & DIRECT CONTACT HUB -->
    <SocialHubSection />
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

.portrait-credentials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.75rem;
}

.stats-section {
  padding: 1.25rem 0 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.15rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stat-value {
  font-family: var(--font-serif);
  font-size: clamp(1.85rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--accent-primary);
  line-height: 1.1;
}

.stat-label {
  font-size: 0.98rem;
  font-weight: 700;
}

.stat-detail {
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.pillar-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.65rem 1.65rem;
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
  font-size: 1.22rem;
  font-weight: 700;
  line-height: 1.3;
}

.pillar-subtitle {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.pillar-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 0.35rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.pillar-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.check-mark {
  color: var(--accent-emerald);
  font-weight: 700;
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

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }

  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .commitments-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
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

  .stat-card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.6rem;
  }

  .stat-label {
    font-size: 0.88rem;
  }

  .stat-detail {
    font-size: 0.76rem;
    line-height: 1.4;
  }

  .section-cta-row {
    flex-direction: column;
  }

  .section-cta-row .btn {
    width: 100%;
  }
}

@media (max-width: 360px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
