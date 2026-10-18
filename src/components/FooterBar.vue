<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { realtorProfile, featureFlags, currentLocale, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'

const visibleBottomLinks = computed(() =>
  realtorProfile.footer.bottomLinks.filter(
    link => link.to !== '/quiz' || featureFlags.value.neighborhoodVibeMatcher
  )
)

const visibleSocialChannels = computed(() =>
  realtorProfile.socialChannels.filter(social => social.id !== 'linkedin')
)
</script>

<template>
  <footer class="footer-wrapper">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="brand-text">
          <p class="footer-name">{{ realtorProfile.fullName }}</p>
          <p class="footer-role">
            {{ t(realtorProfile.footer.role) }}
          </p>
        </div>
        <p class="footer-meta">
          {{ realtorProfile.brokerage }} · {{ realtorProfile.specialDesignation }}
        </p>
        <p class="footer-office">
          <a :href="realtorProfile.officeMapsUrl" target="_blank" rel="noopener noreferrer">
            📍 {{ realtorProfile.officeAddress }}
          </a>
        </p>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">
          {{ t(realtorProfile.footer.headings.directContact) }}
        </h3>
        <ul class="footer-list">
          <li>
            <a :href="realtorProfile.phoneHref">
              <SocialIcon name="phone" :size="15" />
              <span>{{ realtorProfile.phoneDisplay }}</span>
            </a>
          </li>
          <li>
            <a :href="realtorProfile.smsHref">
              <SocialIcon name="sms" :size="15" />
              <span>{{ currentLocale === 'en' ? 'Text / SMS Direct' : 'Mensaje de Texto Directo' }}</span>
            </a>
          </li>
          <li>
            <a :href="`mailto:${realtorProfile.primaryEmail}`">
              <SocialIcon name="email" :size="15" />
              <span>{{ realtorProfile.primaryEmail }}</span>
            </a>
          </li>
          <li>
            <a :href="`mailto:${realtorProfile.expEmail}`">
              <SocialIcon name="email" :size="15" />
              <span>{{ realtorProfile.expEmail }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-heading">
          {{ t(realtorProfile.footer.headings.socialAndPortals) }}
        </h3>
        <ul class="footer-list">
          <li v-for="social in visibleSocialChannels" :key="social.id">
            <a :href="social.url" target="_blank" rel="noopener noreferrer">
              <SocialIcon :name="social.id" :size="15" />
              <span>{{ social.platform }} ↗</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>
        © {{ new Date().getFullYear() }} {{ realtorProfile.fullName }} · {{ realtorProfile.brokerage }}.
        {{ t(realtorProfile.footer.legalNote) }}
      </p>
      <div class="footer-bottom-links">
        <RouterLink
          v-for="link in visibleBottomLinks"
          :key="link.to"
          :to="link.to"
        >
          {{ t(link.label) }}
        </RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  padding: 3.5rem 0 5.5rem;
  margin-top: 3rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.15rem;
}

.footer-role {
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.footer-meta {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-primary);
}

.footer-office a {
  font-size: 0.86rem;
  color: var(--text-secondary);
}

.footer-office a:hover {
  color: var(--accent-primary);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer-heading {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.88rem;
}

.footer-list a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.footer-list a:hover {
  color: var(--accent-primary);
}

.footer-bottom {
  border-top: 1px solid var(--border-subtle);
  padding-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.footer-bottom-links {
  display: flex;
  gap: 1.25rem;
}

.footer-bottom-links a {
  color: var(--text-muted);
}

.footer-bottom-links a:hover {
  color: var(--accent-primary);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}
</style>
