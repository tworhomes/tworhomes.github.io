<script setup lang="ts">
import { ref, computed } from 'vue'
import { realtorProfile, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'

const copiedItem = ref<string | null>(null)

// Exclude LinkedIn per client request
const visibleSocialChannels = computed(() =>
  realtorProfile.socialChannels.filter(channel => channel.id !== 'linkedin')
)

async function copyValue(key: string, value: string) {
  try {
    await navigator.clipboard.writeText(value)
    copiedItem.value = key
    setTimeout(() => {
      if (copiedItem.value === key) copiedItem.value = null
    }, 2200)
  } catch {
    copiedItem.value = null
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">
          {{ t(realtorProfile.socialHub.header.eyebrow) }}
        </span>
        <h2 class="section-title">
          {{ t(realtorProfile.socialHub.header.title) }}
        </h2>
        <p class="section-subtitle">
          {{ t(realtorProfile.socialHub.header.subtitle) }}
        </p>
      </div>

      <!-- Direct Phone, WhatsApp & Email Bar -->
      <div class="direct-contact-grid">
        <div v-tilt class="card direct-card whatsapp-highlight-card">
          <div class="direct-card-top">
            <span class="tag tag-gold">{{ t(realtorProfile.socialHub.cards.whatsapp.badge) }}</span>
            <span class="direct-icon direct-icon-whatsapp">
              <SocialIcon name="whatsapp" :size="22" />
            </span>
          </div>
          <h3 class="direct-value">{{ realtorProfile.socialHub.cards.whatsapp.title }}</h3>
          <p class="direct-desc">
            {{ t(realtorProfile.socialHub.cards.whatsapp.desc) }}
          </p>
          <div class="direct-actions">
            <a :href="realtorProfile.whatsappHref" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <SocialIcon name="whatsapp" :size="16" />
              <span>{{ t(realtorProfile.socialHub.cards.whatsapp.btn) }}</span>
            </a>
          </div>
        </div>

        <div v-tilt class="card direct-card">
          <div class="direct-card-top">
            <span class="tag">{{ t(realtorProfile.socialHub.cards.phone.badge) }}</span>
            <span class="direct-icon direct-icon-phone">
              <SocialIcon name="phone" :size="20" />
            </span>
          </div>
          <h3 class="direct-value">{{ realtorProfile.phoneDisplay }}</h3>
          <p class="direct-desc">
            {{ t(realtorProfile.socialHub.cards.phone.desc) }}
          </p>
          <div class="direct-actions">
            <a :href="realtorProfile.phoneHref" class="btn btn-outline">
              <SocialIcon name="phone" :size="14" />
              <span>{{ t(realtorProfile.socialHub.cards.phone.callBtn) }}</span>
            </a>
            <a :href="realtorProfile.smsHref" class="btn btn-outline">
              <SocialIcon name="sms" :size="14" />
              <span>{{ t(realtorProfile.socialHub.cards.phone.textBtn) }}</span>
            </a>
            <button
              type="button"
              class="btn btn-outline"
              @click="copyValue('phone', realtorProfile.phoneDisplay)"
            >
              {{ copiedItem === 'phone' ? '✓' : t(realtorProfile.socialHub.cards.phone.copyBtn) }}
            </button>
          </div>
        </div>

        <div v-tilt class="card direct-card">
          <div class="direct-card-top">
            <span class="tag">{{ t(realtorProfile.socialHub.cards.email.badge) }}</span>
            <span class="direct-icon direct-icon-email">
              <SocialIcon name="email" :size="20" />
            </span>
          </div>
          <h3 class="direct-value email-value">{{ realtorProfile.primaryEmail }}</h3>
          <p class="direct-desc">
            {{ t(realtorProfile.socialHub.cards.email.desc) }}
          </p>
          <div class="direct-actions">
            <a :href="`mailto:${realtorProfile.primaryEmail}`" class="btn btn-primary">
              <SocialIcon name="email" :size="14" />
              <span>{{ t(realtorProfile.socialHub.cards.email.sendBtn) }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Social Media & Real Estate Portals Grid -->
      <div class="social-grid">
        <a
          v-for="channel in visibleSocialChannels"
          :key="channel.id"
          v-tilt
          :href="channel.url"
          target="_blank"
          rel="noopener noreferrer"
          class="card social-card"
        >
          <div class="social-card-header">
            <div class="social-badge-group">
              <span class="social-icon-badge" :class="`badge-${channel.id}`">
                <SocialIcon :name="channel.id" :size="20" />
              </span>
              <span class="tag" :class="{ 'tag-gold': channel.category === 'portal' }">
                {{ t(channel.badge) }}
              </span>
            </div>
            <span class="external-arrow">↗</span>
          </div>
          <h3 class="social-platform">{{ channel.platform }}</h3>
          <p class="social-handle">{{ channel.handle }}</p>
          <p class="social-desc">{{ t(channel.description) }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.direct-contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.whatsapp-highlight-card {
  border-color: rgba(52, 211, 153, 0.35);
  background: linear-gradient(180deg, var(--bg-elevated) 0%, rgba(52, 211, 153, 0.04) 100%);
}

.direct-card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.direct-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.direct-icon {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  flex-shrink: 0;
}

.direct-icon-whatsapp {
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.25);
}

.direct-icon-phone {
  color: var(--accent-primary);
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.25);
}

.direct-icon-email {
  color: var(--accent-gold);
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.25);
}

.direct-value {
  font-family: var(--font-mono);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.email-value {
  font-size: clamp(0.92rem, 1.3vw, 1.12rem);
  white-space: nowrap;
  letter-spacing: -0.015em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.direct-desc {
  color: var(--text-secondary);
  font-size: 0.92rem;
  flex: 1;
}

.direct-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.4rem;
}

.direct-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.15rem;
}

.social-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: var(--btn-transition);
}

.social-card:hover {
  transform: var(--btn-hover-transform);
  border-color: var(--accent-primary);
}

.social-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.social-badge-group {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.social-icon-badge {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--accent-primary);
  flex-shrink: 0;
  transition: transform var(--transition-fast, 0.2s), border-color var(--transition-fast, 0.2s), box-shadow var(--transition-fast, 0.2s);
}

.social-card:hover .social-icon-badge {
  transform: translateY(-1.5px);
  border-color: var(--accent-primary);
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18);
}

.badge-instagram {
  color: #e1306c;
  background: rgba(225, 48, 108, 0.08);
  border-color: rgba(225, 48, 108, 0.2);
}

.badge-facebook {
  color: #1877f2;
  background: rgba(24, 119, 242, 0.08);
  border-color: rgba(24, 119, 242, 0.2);
}

.badge-linkedin {
  color: #0a66c2;
  background: rgba(10, 102, 194, 0.08);
  border-color: rgba(10, 102, 194, 0.2);
}

.badge-linktree {
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
}

.badge-realtor {
  color: var(--accent-gold);
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.2);
}

.badge-homes {
  color: #ea580c;
  background: rgba(234, 88, 12, 0.08);
  border-color: rgba(234, 88, 12, 0.2);
}

.badge-homespotter {
  color: var(--accent-primary);
  background: rgba(56, 189, 248, 0.08);
  border-color: rgba(56, 189, 248, 0.2);
}

.external-arrow {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--accent-primary);
}

.social-platform {
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

.social-handle {
  font-family: var(--font-mono);
  font-size: 0.83rem;
  color: var(--accent-primary);
}

.social-desc {
  font-size: 0.89rem;
  color: var(--text-secondary);
}

@media (max-width: 920px) {
  .direct-contact-grid {
    grid-template-columns: 1fr;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .social-grid {
    grid-template-columns: 1fr;
  }

  .direct-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .direct-actions .btn:first-child {
    grid-column: 1 / -1;
  }
}
</style>
