<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { realtorProfile, t, currentLocale } from '@/data/realtorProfile'
import ContactForm from '@/components/ContactForm.vue'
import ClientFunnelWidget from '@/components/ClientFunnelWidget.vue'
import SocialHubSection from '@/components/SocialHubSection.vue'
import SocialIcon from '@/components/SocialIcon.vue'

const route = useRoute()

// Default to the Custom Real Estate Plan; allow switching to direct form via query param if desired
const activeFormTab = ref<'planner' | 'direct'>(
  route.query.tab === 'direct' || route.query.mode === 'direct' ? 'direct' : 'planner'
)
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

        <!-- Navigation Tabs: Custom Real Estate Plan vs Quick Direct Message -->
        <div class="contact-mode-selector" role="tablist" :aria-label="currentLocale === 'en' ? 'Contact Form Selection' : 'Selección de Formulario de Contacto'">
          <button
            type="button"
            role="tab"
            :aria-selected="activeFormTab === 'planner'"
            class="mode-choice-btn"
            :class="{ active: activeFormTab === 'planner' }"
            @click="activeFormTab = 'planner'"
          >
            <SocialIcon name="house" :size="16" />
            <span>{{ currentLocale === 'en' ? 'Custom Real Estate Plan (Buyer · Seller · Relocation)' : 'Plan Inmobiliario (Comprador · Vendedor)' }}</span>
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="activeFormTab === 'direct'"
            class="mode-choice-btn"
            :class="{ active: activeFormTab === 'direct' }"
            @click="activeFormTab = 'direct'"
          >
            <SocialIcon name="email" :size="16" />
            <span>{{ currentLocale === 'en' ? 'Direct Note (Quick Form)' : 'Mensaje Directo (Rápido)' }}</span>
          </button>
        </div>

        <!-- Dynamic Form Rendering -->
        <transition name="form-fade" mode="out-in">
          <ClientFunnelWidget
            v-if="activeFormTab === 'planner'"
            key="planner-form"
            :initial-area="(route.query.area as string) || undefined"
            :initial-custom-location="(route.query.location as string) || undefined"
          />
          <ContactForm v-else key="direct-form" />
        </transition>

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
.contact-mode-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
}

.mode-choice-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 44px;
  padding: 0.72rem 1.15rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--btn-transition);
}

.mode-choice-btn:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
  background: var(--accent-glow);
}

.mode-choice-btn.active {
  background: var(--accent-glow);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  box-shadow: 0 0 12px var(--accent-glow);
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.form-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.form-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

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

@media (max-width: 640px) {
  .contact-mode-selector {
    flex-direction: column;
  }

  .mode-choice-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
