<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { realtorProfile, currentLocale, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'

const containerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const isDragging = ref(false)
const isHovered = ref(false)
const isAnimatingArrow = ref(false)
const activeCardKey = ref<string | null>(null)

let startX = 0
let startScrollLeft = 0
let hasMovedFar = false
let animationFrameId: number | null = null
let singleSetWidth = 2000
let arrowTimeout: number | null = null

const allMarqueeCards = computed(() => {
  const list = realtorProfile.lifeImpact.voicesOfImpact
  return [
    ...list.map(v => ({ ...v, setKey: 'a' })),
    ...list.map(v => ({ ...v, setKey: 'b' })),
    ...list.map(v => ({ ...v, setKey: 'c' })),
    ...list.map(v => ({ ...v, setKey: 'd' }))
  ]
})

function updateDimensions() {
  if (!trackRef.value) return
  // Measure 1 set of the 4 duplicated sets
  const measured = trackRef.value.scrollWidth / 4
  if (measured > 300) {
    singleSetWidth = measured
  }
}

function checkWrap(container: HTMLElement) {
  if (singleSetWidth <= 0) return
  // Keep scrollLeft comfortably centered in middle sets [singleSetWidth, singleSetWidth * 2]
  if (container.scrollLeft >= singleSetWidth * 2) {
    container.scrollLeft -= singleSetWidth
    startScrollLeft -= singleSetWidth
  } else if (container.scrollLeft < singleSetWidth) {
    container.scrollLeft += singleSetWidth
    startScrollLeft += singleSetWidth
  }
}

function startAutoScroll() {
  if (animationFrameId !== null) return

  let lastTime = performance.now()

  const step = (time: number) => {
    const dt = Math.min(32, time - lastTime)
    lastTime = time

    const container = containerRef.value
    // Continuous auto-scroll when not dragging, not animating arrow, not hovered, and no card selected
    if (
      container &&
      !isDragging.value &&
      !isAnimatingArrow.value &&
      !isHovered.value &&
      activeCardKey.value === null
    ) {
      const speedSeconds = realtorProfile.lifeImpact.marquee.speedSeconds || 45
      const setWidth = singleSetWidth || 2000
      const pxPerSec = setWidth / speedSeconds
      container.scrollLeft += (pxPerSec * dt) / 1000
      checkWrap(container)
    }

    animationFrameId = requestAnimationFrame(step)
  }

  animationFrameId = requestAnimationFrame(step)
}

function stopAutoScroll() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function onPointerDown(e: PointerEvent) {
  const container = containerRef.value
  if (!container || e.button !== 0) return

  isDragging.value = true
  hasMovedFar = false
  startX = e.clientX
  startScrollLeft = container.scrollLeft

  try {
    container.setPointerCapture(e.pointerId)
  } catch {}
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const container = containerRef.value
  if (!container) return

  const dx = e.clientX - startX
  if (Math.abs(dx) > 5) {
    hasMovedFar = true
  }

  container.scrollLeft = startScrollLeft - dx
  checkWrap(container)
}

function onPointerUp(e: PointerEvent) {
  if (!isDragging.value) return
  isDragging.value = false

  const container = containerRef.value
  if (container) {
    try {
      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId)
      }
    } catch {}
    checkWrap(container)
  }
}

function onPointerCancel(e: PointerEvent) {
  onPointerUp(e)
}

function onMouseEnter() {
  // Ignore hover lock on mobile touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return
  isHovered.value = true
}

function onMouseLeave() {
  isHovered.value = false
}

function handleCardClick(key: string, e?: MouseEvent) {
  if (hasMovedFar) return
  if (activeCardKey.value === key) {
    activeCardKey.value = null // Deselect -> resumes auto-scroll
  } else {
    activeCardKey.value = key // Select -> holds position

    // Smoothly snap selected card to center of container viewport for effortless reading
    const container = containerRef.value
    const targetCard = e?.currentTarget as HTMLElement | null
    if (container && targetCard) {
      const cardRect = targetCard.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const currentDelta = cardRect.left - containerRect.left
      const desiredLeft = Math.max(0, (containerRect.width - cardRect.width) / 2)
      const shift = currentDelta - desiredLeft
      const targetScrollLeft = container.scrollLeft + shift

      isAnimatingArrow.value = true
      if (arrowTimeout !== null) {
        clearTimeout(arrowTimeout)
      }

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      })

      arrowTimeout = window.setTimeout(() => {
        isAnimatingArrow.value = false
        if (container) {
          checkWrap(container)
        }
      }, 500)
    }
  }
}

function onDocumentPointerDown(e: PointerEvent) {
  if (!activeCardKey.value) return
  const target = e.target as HTMLElement | null
  if (!target?.closest('.voice-card, .marquee-nav-btn')) {
    activeCardKey.value = null // Deselect when clicking outside -> resumes auto-scroll
  }
}

function slide(direction: 'prev' | 'next') {
  activeCardKey.value = null
  const container = containerRef.value
  if (!container) return

  // Pause auto-scroll during arrow animation so browser smooth scrolling executes fully
  isAnimatingArrow.value = true
  if (arrowTimeout !== null) {
    clearTimeout(arrowTimeout)
  }

  const cardWidth = realtorProfile.lifeImpact.marquee.cardWidthPx || 380
  const gap = 20 // 1.25rem gap
  const stepSize = cardWidth + gap
  const delta = direction === 'next' ? stepSize : -stepSize

  container.scrollBy({ left: delta, behavior: 'smooth' })

  arrowTimeout = window.setTimeout(() => {
    isAnimatingArrow.value = false
    if (container) {
      checkWrap(container)
    }
  }, 500)
}

function slidePrev() {
  slide('prev')
}

function slideNext() {
  slide('next')
}

const marqueeStyles = computed(() => {
  const m = realtorProfile.lifeImpact.marquee
  return {
    '--marquee-card-width': `${m.cardWidthPx}px`
  }
})

onMounted(() => {
  nextTick(() => {
    updateDimensions()
    const container = containerRef.value
    if (container && singleSetWidth > 0 && (container.scrollLeft < 50 || container.scrollLeft > singleSetWidth * 2.5)) {
      container.scrollLeft = singleSetWidth
    }
  })

  // Second pass once fonts & images are stabilized
  setTimeout(() => {
    updateDimensions()
    const container = containerRef.value
    if (container && singleSetWidth > 0 && container.scrollLeft < 50) {
      container.scrollLeft = singleSetWidth
    }
  }, 120)

  startAutoScroll()
  window.addEventListener('resize', updateDimensions)
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onUnmounted(() => {
  stopAutoScroll()
  if (arrowTimeout !== null) clearTimeout(arrowTimeout)
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateDimensions)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
    document.removeEventListener('pointerdown', onDocumentPointerDown)
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
        <div>
          <h3 class="voices-title">
            {{ t(realtorProfile.lifeImpact.header.title) }}
          </h3>
          <p class="voices-hint">
            <span class="hint-hand">↔</span>
            <span>{{ currentLocale === 'en' ? 'Drag or swipe to slide · Click any story to hold · Deselect to resume scroll' : 'Desliza para mover · Toca una historia para pausar · Deselecciona para reanudar' }}</span>
          </p>
        </div>

        <div class="voices-controls-row">
          <button
            type="button"
            class="marquee-nav-btn"
            :title="currentLocale === 'en' ? 'Previous Story' : 'Historia Anterior'"
            @click="slidePrev"
          >
            ←
          </button>
          <button
            type="button"
            class="marquee-nav-btn"
            :title="currentLocale === 'en' ? 'Next Story' : 'Siguiente Historia'"
            @click="slideNext"
          >
            →
          </button>
          <RouterLink to="/contact" class="btn btn-primary">
            <SocialIcon name="sparkles" :size="15" />
            <span>{{ t(realtorProfile.lifeImpact.header.ctaBtn) }}</span>
          </RouterLink>
        </div>
      </div>

      <!-- Interactive Continuous Scrolling Marquee of Closing Stories -->
      <div
        ref="containerRef"
        class="voices-marquee-container"
        :class="{ 'is-dragging': isDragging }"
        :style="marqueeStyles"
        aria-label="Closing Stories Carousel"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div ref="trackRef" class="voices-marquee-track">
          <div
            v-for="(voice, idx) in allMarqueeCards"
            :key="`${voice.setKey}-${idx}`"
            class="card voice-card"
            :class="{ 'voice-card-selected': activeCardKey === `${voice.setKey}-${idx}` }"
            @click="handleCardClick(`${voice.setKey}-${idx}`, $event)"
          >
            <div class="voice-card-top">
              <span class="voice-pill">
                <span class="voice-pill-dot" />
                {{ t(voice.badge) }}
              </span>
              <span v-if="activeCardKey === `${voice.setKey}-${idx}`" class="selected-pill">
                ✨ {{ currentLocale === 'en' ? 'Holding · Click to Resume' : 'Pausada · Toca para Reanudar' }}
              </span>
              <span v-else class="voice-quote-icon" aria-hidden="true">“</span>
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
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.35rem;
}

.voices-title {
  font-family: var(--font-serif);
  font-size: clamp(1.35rem, 2.3vw, 1.75rem);
  font-weight: 700;
}

.voices-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-top: 0.35rem;
}

.hint-hand {
  font-size: 0.95rem;
  color: var(--accent-primary);
}

.voices-controls-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-shrink: 0;
}

.marquee-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 1.05rem;
  cursor: pointer;
  transition: var(--btn-transition);
}

.marquee-nav-btn:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: var(--btn-hover-transform);
}

.marquee-nav-btn:active {
  transform: var(--btn-active-transform);
}

.voices-marquee-container {
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0.5rem 0 1rem;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-x;
  scroll-behavior: auto;
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

.voices-marquee-container::-webkit-scrollbar {
  display: none;
}

.voices-marquee-container.is-dragging {
  cursor: grabbing;
}

.voices-marquee-track {
  display: flex;
  gap: 1.25rem;
  width: max-content;
  will-change: transform;
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
  cursor: pointer;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.voice-card:hover {
  border-color: var(--border-hover);
}

.voice-card-selected {
  border-color: var(--accent-gold) !important;
  box-shadow: 0 0 0 2px var(--accent-gold-glow), var(--shadow-card) !important;
  transform: translateY(-2px);
}

.selected-pill {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-gold);
  background: var(--accent-gold-glow);
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(245, 158, 11, 0.35);
  white-space: nowrap;
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
