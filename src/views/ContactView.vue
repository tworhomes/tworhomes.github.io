<script setup lang="ts">
import { realtorProfile, t } from '@/data/realtorProfile'
import ClientFunnelWidget from '@/components/ClientFunnelWidget.vue'
import SocialHubSection from '@/components/SocialHubSection.vue'
</script>

<template>
  <div class="contact-view">
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">
            {{ t(realtorProfile.contactPage.header.eyebrow) }}
          </span>
          <h1 class="section-title">
            {{ t(realtorProfile.contactPage.header.title) }}
          </h1>
          <p class="section-subtitle">
            {{ t(realtorProfile.contactPage.header.subtitle) }}
          </p>
        </div>

        <ClientFunnelWidget />

        <!-- Office & License Verification Strip -->
        <div class="card office-strip">
          <div>
            <span class="tag tag-gold">{{ t(realtorProfile.contactPage.officeStrip.tag) }}</span>
            <h3 class="office-title">{{ realtorProfile.officeAddress }}</h3>
            <p class="office-sub">
              {{ realtorProfile.fullName }} · {{ realtorProfile.brokerage }}
            </p>
          </div>
          <div class="office-actions">
            <a
              :href="realtorProfile.officeMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline"
            >
              🗺️ {{ t(realtorProfile.contactPage.officeStrip.mapsBtn) }}
            </a>
            <a :href="realtorProfile.phoneHref" class="btn btn-primary">
              📞 {{ realtorProfile.phoneDisplay }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <SocialHubSection />
  </div>
</template>

<style scoped>
.office-strip {
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.office-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 0.45rem;
}

.office-sub {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.2rem;
}

.office-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
