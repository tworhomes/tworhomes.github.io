<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { realtorProfile, t } from '@/data/realtorProfile'

// Dynamic Marquee Settings controlled via realtorProfile.lifeImpact.marquee
const marqueeStyles = computed(() => {
  const m = realtorProfile.lifeImpact.marquee
  return {
    '--marquee-speed': `${m.speedSeconds}s`,
    '--marquee-direction': m.direction === 'reverse' ? 'reverse' : 'normal',
    '--marquee-hover-state': m.pauseOnHover ? 'paused' : 'running',
    '--marquee-card-width': `${m.cardWidthPx}px`
  }
})
</script>

<template>
  <section class="section impact-section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">{{ t(realtorProfile.lifeImpact.eyebrow) }}</span>
        <h2 class="section-title">{{ t(realtorProfile.lifeImpact.title) }}</h2>
        <p class="section-subtitle">{{ t(realtorProfile.lifeImpact.subtitle) }}</p>
      </div>

      <!-- Visual 53+ Keys / Doors Impact Banner -->
      <div class="card doors-banner">
        <div class="doors-banner-left">
          <div class="doors-badge-row">
            <span class="tag tag-gold">
              {{ t(realtorProfile.lifeImpact.doorsBanner.tag1) }}
            </span>
            <span class="tag">
              {{ t(realtorProfile.lifeImpact.doorsBanner.tag2) }}
            </span>
          </div>
          <h3 class="doors-banner-title">
            {{ t(realtorProfile.lifeImpact.doorsBanner.title) }}
          </h3>
          <p class="doors-banner-desc">
            {{ t(realtorProfile.lifeImpact.doorsBanner.desc) }}
          </p>
        </div>

        <div class="doors-visual-counter" aria-label="Families Helped Grid">
          <div class="keys-grid">
            <span
              v-for="n in 53"
              :key="n"
              class="key-dot"
              :class="{ gold: n > 45 }"
              :title="`North Carolina Family #${n}`"
            />
          </div>
          <p class="keys-caption">
            {{ t(realtorProfile.lifeImpact.doorsBanner.keysCaption) }}
          </p>
        </div>
      </div>

      <!-- 4 Life-Changing Impact Milestones -->
      <div class="milestones-grid">
        <article
          v-for="item in realtorProfile.lifeImpact.milestones"
          :key="item.metric"
          class="card milestone-card"
        >
          <div class="milestone-top">
            <span class="milestone-metric">{{ item.metric }}</span>
            <span class="tag">{{ t(item.tag) }}</span>
          </div>
          <h3 class="milestone-unit">{{ t(item.unit) }}</h3>
          <p class="milestone-highlight">{{ t(item.highlight) }}</p>
          <p class="milestone-story">{{ t(item.story) }}</p>
        </article>
      </div>

      <!-- Voices of Impact / Family Stories Header -->
      <div class="voices-header">
        <h3 class="voices-title">
          {{ t(realtorProfile.lifeImpact.header.title) }}
        </h3>
        <RouterLink to="/contact" class="btn btn-primary">
          ✨ {{ t(realtorProfile.lifeImpact.header.ctaBtn) }}
        </RouterLink>
      </div>

      <!-- Continuous Smooth Scrolling Marquee of Closing Stories (Right to Left) -->
      <div
        class="voices-marquee-container"
        :style="marqueeStyles"
        aria-label="Closing Stories Carousel"
      >
        <div class="voices-marquee-track">
          <!-- First set of cards -->
          <div
            v-for="(voice, idx) in realtorProfile.lifeImpact.voicesOfImpact"
            :key="`a-${idx}`"
            class="card voice-card"
          >
            <div class="voice-card-top">
              <span class="voice-pill">
                <span class="voice-pill-dot" />
                {{ t(voice.badge) }}
              </span>
              <span class="voice-quote-icon" aria-hidden="true">“</span>
            </div>
            <blockquote class="voice-quote">{{ t(voice.quote) }}</blockquote>
            <p class="voice-outcome">✓ {{ t(voice.outcome) }}</p>
          </div>

          <!-- Duplicate set for seamless infinite loop -->
          <div
            v-for="(voice, idx) in realtorProfile.lifeImpact.voicesOfImpact"
            :key="`b-${idx}`"
            class="card voice-card"
            aria-hidden="true"
          >
            <div class="voice-card-top">
              <span class="voice-pill">
                <span class="voice-pill-dot" />
                {{ t(voice.badge) }}
              </span>
              <span class="voice-quote-icon" aria-hidden="true">“</span>
            </div>
            <blockquote class="voice-quote">{{ t(voice.quote) }}</blockquote>
            <p class="voice-outcome">✓ {{ t(voice.outcome) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.doors-banner {
  display: grid;
  grid-template-columns: 1.35fr 0.95fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1.5rem;
  border-color: var(--border-hover);
}

.doors-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.doors-banner-title {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  font-weight: 700;
  margin-bottom: 0.55rem;
}

.doors-banner-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.doors-visual-counter {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.keys-grid {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 0.42rem;
}

.key-dot {
  height: 12px;
  border-radius: 4px;
  background: var(--accent-primary);
  opacity: 0.82;
  transition: var(--transition-hover);
}

.key-dot.gold {
  background: var(--accent-gold);
  opacity: 0.95;
}

.key-dot:hover {
  opacity: 1;
  transform: translateY(-1.5px);
}

.keys-caption {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: center;
}

.milestones-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-bottom: 2.25rem;
}

.milestone-card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.milestone-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.2rem;
}

.milestone-metric {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-primary);
  line-height: 1.1;
  white-space: nowrap;
}

.milestone-unit {
  font-size: 1.12rem;
  font-weight: 700;
}

.milestone-highlight {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-emerald);
}

.milestone-story {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

.voices-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.voices-title {
  font-family: var(--font-serif);
  font-size: clamp(1.35rem, 2.3vw, 1.75rem);
  font-weight: 700;
}

.voices-marquee-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0.5rem 0 1rem;
  /* Soft gradient fade on left and right edges */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 4%,
    black 96%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 4%,
    black 96%,
    transparent 100%
  );
}

.voices-marquee-track {
  display: flex;
  gap: 1.25rem;
  width: max-content;
  animation: marquee-scroll var(--marquee-speed, 45s) linear infinite;
  animation-direction: var(--marquee-direction, normal);
  will-change: transform;
}

/* Pause on hover/touch if enabled in settings */
.voices-marquee-container:hover .voices-marquee-track {
  animation-play-state: var(--marquee-hover-state, paused);
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.voice-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.6rem 1.65rem;
  width: var(--marquee-card-width, 380px);
  max-width: 85vw;
  flex-shrink: 0;
  user-select: none;
}

.voice-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.75rem;
}

.voice-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
  padding: 0.38rem 0.78rem;
  border-radius: var(--radius-sm);
  background: var(--accent-gold-glow);
  color: var(--accent-gold);
  border: 1px solid rgba(245, 158, 11, 0.28);
  white-space: nowrap;
}

.voice-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-gold);
  flex-shrink: 0;
}

.voice-quote-icon {
  font-family: var(--font-serif);
  font-size: 2.1rem;
  line-height: 0.8;
  color: var(--accent-gold);
  opacity: 0.4;
  user-select: none;
}

.voice-quote {
  font-size: 0.94rem;
  color: var(--text-primary);
  font-style: italic;
  line-height: 1.65;
  flex: 1;
  margin: 0;
}

.voice-outcome {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--accent-emerald);
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
  width: 100%;
  margin: 0;
}

@media (max-width: 920px) {
  .doors-banner,
  .milestones-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .keys-grid {
    grid-template-columns: repeat(9, 1fr);
    gap: 0.35rem;
  }

  .voices-header {
    flex-direction: column;
    align-items: stretch;
  }

  .voices-header .btn {
    width: 100%;
  }
}
</style>
