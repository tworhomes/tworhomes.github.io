<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { realtorProfile, currentLocale, t } from '@/data/realtorProfile'
import NeighborhoodVibeMatcher from '@/components/NeighborhoodVibeMatcher.vue'
import SocialIcon from '@/components/SocialIcon.vue'
</script>

<template>
  <div class="quiz-view">
    <section class="section">
      <div class="container">
        <!-- Page Header -->
        <div class="section-header">
          <div class="header-badge-row">
            <span class="eyebrow">
              {{ currentLocale === 'en' ? 'Interactive Explorer' : 'Explorador Interactivo' }}
            </span>
            <span class="tag tag-gold">
              {{ currentLocale === 'en' ? '60-Second Match' : 'Test en 60 Segundos' }}
            </span>
          </div>
          <h1 class="section-title">
            {{ currentLocale === 'en' ? 'Find Your Perfect North Carolina Community' : 'Encuentra Tu Comunidad Ideal en Carolina del Norte' }}
          </h1>
          <p class="section-subtitle">
            {{ currentLocale === 'en'
              ? 'Answer 3 quick questions about your lifestyle, commute priorities, and home preferences to uncover your tailored Triangle community match.'
              : 'Responde 3 preguntas rápidas sobre tu estilo de vida, prioridades de traslado y preferencias de hogar para descubrir tu comunidad ideal en el Triangle.'
            }}
          </p>

          <!-- Quick Telemetry Badges -->
          <div class="quiz-meta-row">
            <span class="meta-pill">📍 {{ currentLocale === 'en' ? '8 NC Counties Covered' : '8 Condados en NC' }}</span>
            <span class="meta-pill">🏡 {{ currentLocale === 'en' ? '30+ Triangle Towns' : 'Más de 30 Ciudades' }}</span>
            <span class="meta-pill">🎯 {{ currentLocale === 'en' ? 'Tailored MLS & Builder Match' : 'Conexión con MLS y Casas Nuevas' }}</span>
          </div>
        </div>

        <!-- The Interactive Vibe Matcher Quiz -->
        <div class="quiz-container">
          <NeighborhoodVibeMatcher />
        </div>

        <!-- Fallback / Alternative Pathway -->
        <div class="card quiz-fallback-strip">
          <div class="fallback-copy">
            <span class="tag tag-gold">{{ currentLocale === 'en' ? 'Direct Alternative' : 'Opción Directa' }}</span>
            <h3 class="fallback-title">
              {{ currentLocale === 'en' ? 'Already have an exact neighborhood or builder in mind?' : '¿Ya tienes en mente una zona o constructor específico?' }}
            </h3>
            <p class="fallback-sub">
              {{ currentLocale === 'en'
                ? 'Skip the quiz and let Maryin hand-curate active MLS listings and off-market builder incentives for your target address.'
                : 'Salta el test y permítele a Maryin preparar un análisis personalizado con propiedades activas e incentivos de constructores.'
              }}
            </p>
          </div>
          <div class="fallback-actions">
            <RouterLink to="/markets" class="btn btn-outline">
              🗺️ {{ currentLocale === 'en' ? 'Explore 8-County Directory' : 'Ver Directorio de 8 Condados' }}
            </RouterLink>
            <RouterLink to="/contact" class="btn btn-primary">
              <SocialIcon name="sparkles" :size="15" />
              <span>{{ currentLocale === 'en' ? 'Schedule Custom Consultation' : 'Agendar Consulta' }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quiz-view {
  min-height: calc(100vh - 120px);
  padding-bottom: 3.5rem;
}

.header-badge-row {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

.quiz-meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 1.25rem;
}

.meta-pill {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
}

.quiz-container {
  width: 100%;
  margin: 0 auto 2.5rem;
}

.quiz-fallback-strip {
  width: 100%;
  margin: 0 auto;
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
}

.fallback-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.45rem 0 0.25rem;
}

.fallback-sub {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.fallback-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .quiz-fallback-strip {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.35rem 1.15rem;
  }

  .fallback-actions {
    width: 100%;
    flex-direction: column;
  }

  .fallback-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

