<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { realtorProfile, currentLocale } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'
</script>

<template>
  <div class="sticky-mobile-bar" role="region" aria-label="Quick Mobile Contact Actions">
    <a :href="realtorProfile.phoneHref" class="mobile-action-btn">
      <span class="action-icon">
        <SocialIcon name="phone" :size="18" />
      </span>
      <span class="action-label">{{ currentLocale === 'en' ? 'Call' : 'Llamar' }}</span>
    </a>
    <a :href="realtorProfile.smsHref" class="mobile-action-btn">
      <span class="action-icon">
        <SocialIcon name="sms" :size="18" />
      </span>
      <span class="action-label">{{ currentLocale === 'en' ? 'Text' : 'Texto' }}</span>
    </a>
    <a
      :href="realtorProfile.whatsappHref"
      target="_blank"
      rel="noopener noreferrer"
      class="mobile-action-btn"
    >
      <span class="action-icon action-icon-whatsapp">
        <SocialIcon name="whatsapp" :size="18" />
      </span>
      <span class="action-label">WhatsApp</span>
    </a>
    <RouterLink to="/contact" class="mobile-action-btn primary">
      <span class="action-icon">✨</span>
      <span class="action-label">{{ currentLocale === 'en' ? 'Start Plan' : 'Mi Plan' }}</span>
    </RouterLink>
  </div>
</template>

<style scoped>
.sticky-mobile-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 60;
  background: var(--bg-glass);
  backdrop-filter: blur(18px);
  border-top: 1px solid var(--border-subtle);
  padding: 0.5rem 0.65rem calc(0.55rem + env(safe-area-inset-bottom, 0px));
  grid-template-columns: repeat(4, 1fr);
  gap: 0.45rem;
  box-shadow: 0 -8px 24px rgba(2, 6, 23, 0.35);
}

.mobile-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  gap: 0.15rem;
  padding: 0.4rem 0.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-primary);
  transition: var(--btn-transition);
}

.mobile-action-btn:active {
  transform: var(--btn-active-transform);
}

.action-icon {
  font-size: 0.95rem;
  line-height: 1;
}

.action-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.mobile-action-btn.primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #ffffff;
  border-color: transparent;
  box-shadow: var(--btn-shadow);
}

@media (max-width: 820px) {
  .sticky-mobile-bar {
    display: grid;
  }
}
</style>
