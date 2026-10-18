<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { realtorProfile, t } from '@/data/realtorProfile'
import ImpactStoriesSection from '@/components/ImpactStoriesSection.vue'
import SocialHubSection from '@/components/SocialHubSection.vue'
import kitchenPortrait from '@/assets/maryin-kitchen.jpg'
</script>

<template>
  <div class="about-view">
    <section class="section">
      <div class="container">
        <div class="about-hero-grid">
          <div class="card about-photo-card">
            <img
              :src="kitchenPortrait"
              :alt="realtorProfile.fullName"
              class="about-photo"
            >
            <div class="about-quick-facts">
              <div
                v-for="(fact, idx) in realtorProfile.aboutPage.quickFacts"
                :key="idx"
                class="fact-row"
              >
                <span class="fact-label">{{ t(fact.label) }}</span>
                <span class="fact-val">{{ fact.value }}</span>
              </div>
            </div>
          </div>

          <div class="about-story">
            <span class="eyebrow">
              {{ t(realtorProfile.aboutPage.eyebrow) }}
            </span>
            <h1 class="section-title">{{ t(realtorProfile.bio.headline) }}</h1>
            <p class="about-lead">{{ t(realtorProfile.bio.lead) }}</p>

            <div class="about-paragraphs">
              <p v-for="(para, index) in realtorProfile.bio.paragraphs" :key="index">
                {{ t(para) }}
              </p>
            </div>

            <div class="credentials-callout card">
              <h3 class="callout-title">
                {{ t(realtorProfile.aboutPage.callout.title) }}
              </h3>
              <p class="callout-body">
                {{ t(realtorProfile.aboutPage.callout.body) }}
              </p>
              <div class="callout-actions">
                <RouterLink to="/contact" class="btn btn-primary">
                  {{ t(realtorProfile.aboutPage.callout.ctaBtn) }}
                </RouterLink>
                <a :href="realtorProfile.phoneHref" class="btn btn-outline">
                  📞 {{ realtorProfile.phoneDisplay }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ImpactStoriesSection />

    <SocialHubSection />
  </div>
</template>

<style scoped>
.about-hero-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.35fr;
  gap: 2.25rem;
  align-items: start;
}

.about-photo-card {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.about-photo {
  width: 100%;
  border-radius: var(--radius-sm);
  aspect-ratio: 4 / 4.8;
  object-fit: cover;
  object-position: center top;
}

.about-quick-facts {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.fact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.84rem;
}

.fact-label {
  color: var(--text-muted);
  white-space: nowrap;
}

.fact-val {
  font-family: var(--font-mono);
  font-weight: 600;
  text-align: right;
  white-space: nowrap;
}

.about-story {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.about-lead {
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--text-primary);
}

.about-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--text-secondary);
}

.credentials-callout {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.callout-title {
  font-size: 1.12rem;
  font-weight: 700;
}

.callout-body {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.callout-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.35rem;
}

@media (max-width: 900px) {
  .about-hero-grid {
    grid-template-columns: 1fr;
  }
}
</style>
