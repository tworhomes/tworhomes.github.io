<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { realtorProfile, currentLocale, t } from '@/data/realtorProfile'
import SocialIcon from '@/components/SocialIcon.vue'

const router = useRouter()

const emit = defineEmits<{
  (e: 'match-selected', area: string): void
}>()

const currentStep = ref(1)

// Selected question indices
const selectedVibe = ref<number | null>(null)
const selectedWork = ref<number | null>(null)
const selectedHome = ref<number | null>(null)

interface QuizOption {
  icon: string
  title: { en: string; es: string }
  detail: { en: string; es: string }
}

interface Question {
  number: string
  eyebrow: { en: string; es: string }
  title: { en: string; es: string }
  options: QuizOption[]
}

const questions: Question[] = [
  {
    number: '01',
    eyebrow: { en: 'WEEKEND RHYTHM & LIFESTYLE', es: 'RITMO DE FIN DE SEMANA Y ESTILO DE VIDA' },
    title: { en: 'What does your ideal Saturday look like?', es: '¿Cómo imaginas tu sábado ideal?' },
    options: [
      {
        icon: 'house',
        title: { en: 'Spacious Yard & Scenic Greenways', es: 'Patio Amplio y Senderos Naturales' },
        detail: {
          en: 'Peaceful acreage, master-planned new builds, community pools, and backyard gatherings (Clayton, Flowers Plantation, Wendell, Zebulon).',
          es: 'Tranquilidad, casas nuevas en comunidades planeadas, alberca comunitaria y parrilladas familiares (Clayton, Flowers Plantation, Wendell).'
        }
      },
      {
        icon: 'chart',
        title: { en: 'Executive Balance & Master Communities', es: 'Prestigio Familiar y Excelentes Escuelas' },
        detail: {
          en: 'Top-tier schools, pristine community parks, greenway networks, and master-planned prestige (Cary, Apex, Holly Springs).',
          es: 'Escuelas de primer nivel, parques impecables, lagos y comunidades exclusivas (Cary, Apex, Holly Springs).'
        }
      },
      {
        icon: 'compass',
        title: { en: 'Urban Energy, Dining & Culture', es: 'Energía Urbana, Gastronomía y Arte' },
        detail: {
          en: 'Local coffee roasters, art walks, craft dining, live music, and walkable city parks (Downtown Raleigh, Durham, North Hills).',
          es: 'Cafeterías de especialidad, galerías de arte, restaurantes galardonados y vida nocturna activa (Raleigh, Durham).'
        }
      },
      {
        icon: 'sparkles',
        title: { en: 'Historic Charm & University Soul', es: 'Encanto Histórico y Entorno Universitario' },
        detail: {
          en: 'Wooded acreage, farmers markets, university architecture, and independent boutiques (Chapel Hill, Pittsboro, Hillsborough).',
          es: 'Naturaleza boscosa, mercaditos locales, arquitectura universitaria y ambiente bohemio (Chapel Hill, Pittsboro).'
        }
      }
    ]
  },
  {
    number: '02',
    eyebrow: { en: 'COMMUTE & DAILY DESTINATIONS', es: 'UBICACIÓN Y TRASLADOS DIARIOS' },
    title: { en: 'What is your primary commute or routine?', es: '¿Cuál es tu destino habitual o estilo de trabajo?' },
    options: [
      {
        icon: 'chart',
        title: { en: 'Research Triangle Park (RTP) & Tech Corridors', es: 'Research Triangle Park (RTP) y Corredor Tecnológico' },
        detail: {
          en: 'Quick access to global tech headquarters, Apple campus, biopharma hubs, and I-40 / I-540 corridors.',
          es: 'Acceso rápido a las sedes de gigantes tecnológicos, farmacéuticas y autopistas I-40 / I-540.'
        }
      },
      {
        icon: 'compass',
        title: { en: 'Healthcare & University Medical Networks', es: 'Centros Médicos y Redes Universitarias' },
        detail: {
          en: 'Minutes from Duke Health, UNC Hospitals, WakeMed Raleigh, or university campuses.',
          es: 'A minutos del sistema de salud de Duke, hospitales de UNC o sedes de WakeMed.'
        }
      },
      {
        icon: 'house',
        title: { en: 'Remote / Work-From-Home Freedom', es: 'Libertad de Trabajo Remoto (Home Office)' },
        detail: {
          en: 'High-speed fiber internet, quiet dedicated office space, and maximum lot size over daily drive time.',
          es: 'Internet de fibra de alta velocidad, oficina privada en casa y máxima amplitud de terreno.'
        }
      },
      {
        icon: 'sparkles',
        title: { en: 'State Capital & Downtown Raleigh Metro', es: 'Gobierno Estatal y Centro de Raleigh' },
        detail: {
          en: 'Close proximity to government hubs, downtown offices, conventions, and central Wake commerce.',
          es: 'Cercanía al distrito de gobierno, centros corporativos y comercios del corazón de Wake.'
        }
      }
    ]
  },
  {
    number: '03',
    eyebrow: { en: 'HOME ARCHITECTURE & PERKS', es: 'ESTILO DE CASA Y BENEFICIOS' },
    title: { en: 'What kind of home excites you most?', es: '¿Qué tipo de propiedad te entusiasma más?' },
    options: [
      {
        icon: 'house',
        title: { en: 'Brand-New Construction with Builder Rate Credits', es: 'Casa Nueva con Incentivos y Reducción de Tasa' },
        detail: {
          en: 'Modern open floor plans, 10-year structural warranty, energy efficiency, and builder rate buydowns (e.g. 4.99%).',
          es: 'Distribución moderna, garantía de construcción nueva, ahorro de energía y descuentos en tasa de interés (ej. 4.99%).'
        }
      },
      {
        icon: 'sparkles',
        title: { en: 'Established Neighborhood with Mature Trees', es: 'Comunidad Establecida con Árboles Frondosos' },
        detail: {
          en: 'Generous lot size, established privacy, custom craftsmanship, and classic Triangle charm.',
          es: 'Lotes amplios, privacidad garantizada, acabados tradicionales y árboles maduros.'
        }
      },
      {
        icon: 'chart',
        title: { en: 'Low-Maintenance Luxury Townhome', es: 'Townhome Moderno de Bajo Mantenimiento' },
        detail: {
          en: 'Lock-and-leave lifestyle, modern gourmet kitchen, community clubhouse, pool, and zero yard chores.',
          es: 'Vida práctica sin preocuparte por podar el pasto, con alberca, acabados de lujo y gimnasio comunitario.'
        }
      },
      {
        icon: 'compass',
        title: { en: 'Acreage, Homestead Freedom & No Strict HOA', es: 'Terreno Amplio, Libertad y Sin HOA Restrictivo' },
        detail: {
          en: 'Half-acre or multi-acre lot, room for RV/boat parking, workshops, and peaceful quiet mornings.',
          es: 'Medio acre o más, espacio para taller o estacionamiento amplio, aire puro y total autonomía.'
        }
      }
    ]
  }
]

interface CommunityMatch {
  id: string
  title: string
  score: string
  badge: { en: string; es: string }
  headline: { en: string; es: string }
  description: { en: string; es: string }
  priceBand: string
  topAdvantage: { en: string; es: string }
  targetArea: string
  cities: string[]
}

const communityMatches: Record<string, CommunityMatch> = {
  johnston: {
    id: 'johnston',
    title: 'Clayton & Johnston County (Flowers Plantation)',
    score: '98%',
    badge: { en: 'Top Match: High-Value Growth & Big Yards', es: 'Tu Mejor Opción: Gran Plusvalía y Espacio' },
    headline: {
      en: 'The #1 Destination for Spacious New Builds & Major Builder Incentives',
      es: 'El Destino #1 para Casas Nuevas Amplias e Incentivos Exclusivos de Constructores'
    },
    description: {
      en: 'If you want maximum square footage, modern open-concept layouts, peaceful neighborhood walking trails, and significant builder financing credits (like 2-1 interest rate buydowns), Johnston County offers extraordinary value just 25 minutes from Raleigh.',
      es: 'Si buscas el máximo metraje, diseños abiertos, senderos naturales y grandes incentivos de constructores (como reducción de tasa de interés), el condado de Johnston te ofrece el mejor valor a solo 25 minutos de Raleigh.'
    },
    priceBand: '$260K – $525K+',
    topAdvantage: {
      en: 'Builder rate credits + lowest county property tax rate in the Triangle perimeter.',
      es: 'Incentivos de constructores y los impuestos a la propiedad más competitivos del área.'
    },
    targetArea: 'Clayton / Johnston County',
    cities: ['Clayton', 'Flowers Plantation', 'Smithfield', 'Selma']
  },
  caryApex: {
    id: 'caryApex',
    title: 'Cary, Apex & Holly Springs',
    score: '97%',
    badge: { en: 'Top Match: Executive Prestige & Top Schools', es: 'Tu Mejor Opción: Prestigio Familiar y Escuelas de Élite' },
    headline: {
      en: 'Nationally Ranked Quality of Life, Premier Parks & Minutes to RTP',
      es: 'Calidad de Vida Reconocida a Nivel Nacional, Parques de Primera y Cercanía a RTP'
    },
    description: {
      en: 'Consistently ranked among the safest and most family-friendly towns in the United States. Featuring master-planned lake communities, greenway networks connecting to RTP, and top-tier school districts.',
      es: 'Catalogadas entre las ciudades más seguras y con mejor calidad de vida de todo EE. UU. Destacan por sus comunidades planeadas, parques hermosos y acceso inmediato a RTP.'
    },
    priceBand: '$420K – $950K+',
    topAdvantage: {
      en: 'Exceptional historic resale appreciation and direct proximity to global tech employers.',
      es: 'Plusvalía histórica sobresaliente y cercanía inigualable a empresas globales de tecnología.'
    },
    targetArea: 'Cary / Apex / Holly Springs',
    cities: ['Cary', 'Apex', 'Holly Springs']
  },
  durhamRtp: {
    id: 'durhamRtp',
    title: 'Durham & Research Triangle Park Corridor',
    score: '96%',
    badge: { en: 'Top Match: Tech Innovation & Foodie Soul', es: 'Tu Mejor Opción: Innovación Tecnológica y Vida Urbana' },
    headline: {
      en: 'Dynamic Healthcare Hub, Vibrant Arts Scene & Modern Infill Living',
      es: 'Polo de Innovación Médica y Tecnológica con una Escena Gastronómica Única'
    },
    description: {
      en: 'Ideal for tech leaders, healthcare professionals, and anyone who loves award-winning culinary culture. Modern townhomes and established neighborhoods thrive side-by-side near Duke University and the RTP campus.',
      es: 'Perfecto para profesionales de la tecnología y la salud que aman la vida cultural y gastronómica. Casas y townhomes contemporáneos con excelente ubicación junto a Duke y RTP.'
    },
    priceBand: '$290K – $650K+',
    topAdvantage: {
      en: 'Immediate commutes to Apple, Cisco, Biogen, and Duke Health medical campus.',
      es: 'Traslados mínimos a sedes de Apple, Cisco, laboratorios biotecnológicos y Duke.'
    },
    targetArea: 'Durham / RTP Corridor',
    cities: ['Durham', 'RTP Corridor', 'Brier Creek']
  },
  raleighWake: {
    id: 'raleighWake',
    title: 'Raleigh & Central Wake County',
    score: '95%',
    badge: { en: 'Top Match: Capital Energy & Suburban Harmony', es: 'Tu Mejor Opción: Energía de la Capital y Comodidad' },
    headline: {
      en: 'The Bustling Heart of North Carolina with Endless Neighborhood Varieties',
      es: 'El Corazón de Carolina del Norte con Opciones para Cada Estilo de Vida'
    },
    description: {
      en: 'From the tech employment and state capital energy to vibrant suburban pockets like North Hills, Garner, and Wake Forest, Raleigh offers unmatched metropolitan variety with strong investment fundamentals.',
      es: 'Desde el epicentro económico y de gobierno hasta zonas suburbanas familiares como Wake Forest y Garner, Raleigh combina conveniencia urbana con alta plusvalía patrimonial.'
    },
    priceBand: '$320K – $850K+',
    topAdvantage: {
      en: 'Highest liquidity and strongest long-term rental & resale market velocity.',
      es: 'La mayor liquidez del mercado con gran demanda tanto para vivir como para invertir.'
    },
    targetArea: 'Raleigh / Wake County',
    cities: ['Raleigh', 'Wake Forest', 'Garner', 'Rolesville']
  },
  chathamPittsboro: {
    id: 'chathamPittsboro',
    title: 'Pittsboro, Chatham Park & Chapel Hill',
    score: '94%',
    badge: { en: 'Top Match: West Triangle Expansion & Eco-Living', es: 'Tu Mejor Opción: Expansión Oeste y Estilo de Vida Sustentable' },
    headline: {
      en: 'Master-Planned Visionaries, University Heritage & Scenic Horizons',
      es: 'Comunidades Futuristas, Tradición Universitaria y Belleza Natural'
    },
    description: {
      en: 'The west side of the Triangle is experiencing transformative growth, anchored by Chatham Park’s high-tech master plan and the historic university charm of Chapel Hill. Ideal for long-term equity and nature lovers.',
      es: 'El corredor oeste del Triángulo experimenta un crecimiento extraordinario gracias al desarrollo de Chatham Park y el prestigio universitario de Chapel Hill.'
    },
    priceBand: '$380K – $980K+',
    topAdvantage: {
      en: 'Massive long-term capital appreciation corridor with multi-mile trail networks.',
      es: 'Corredor de enorme plusvalía futura con parques y amenidades ecológicas de primer nivel.'
    },
    targetArea: 'Chapel Hill / Orange & Chatham Counties',
    cities: ['Pittsboro', 'Chatham Park', 'Chapel Hill', 'Mebane']
  }
}

const computedMatch = computed<CommunityMatch>(() => {
  const v = selectedVibe.value ?? 0
  const w = selectedWork.value ?? 0
  const h = selectedHome.value ?? 0

  if (v === 0 && h === 0) return communityMatches.johnston
  if (v === 1 || w === 0) return communityMatches.caryApex
  if (v === 2 && w === 1) return communityMatches.durhamRtp
  if (v === 3 || h === 3) return communityMatches.chathamPittsboro
  if (w === 3 || v === 2) return communityMatches.raleighWake

  return communityMatches.johnston
})

const isAdvancing = ref(false)
const pendingOption = ref<number | null>(null)

function isOptionSelected(idx: number): boolean {
  if (pendingOption.value === idx) return true
  if (currentStep.value === 1) return selectedVibe.value === idx
  if (currentStep.value === 2) return selectedWork.value === idx
  if (currentStep.value === 3) return selectedHome.value === idx
  return false
}

function handleSelectOption(index: number) {
  if (isAdvancing.value) return
  pendingOption.value = index
  isAdvancing.value = true

  setTimeout(() => {
    if (currentStep.value === 1) {
      selectedVibe.value = index
      currentStep.value = 2
    } else if (currentStep.value === 2) {
      selectedWork.value = index
      currentStep.value = 3
    } else if (currentStep.value === 3) {
      selectedHome.value = index
      currentStep.value = 4
    }
    pendingOption.value = null
    isAdvancing.value = false
  }, 160)
}

function handlePrevious() {
  if (isAdvancing.value || currentStep.value <= 1) return
  currentStep.value--
}

function resetQuiz() {
  selectedVibe.value = null
  selectedWork.value = null
  selectedHome.value = null
  pendingOption.value = null
  isAdvancing.value = false
  currentStep.value = 1
}

function applyMatchToConsultation() {
  const area = computedMatch.value.targetArea
  emit('match-selected', area)
  router.push({
    path: '/contact',
    query: { area }
  })
}

const matchSmsHref = computed(() => {
  const area = computedMatch.value.title
  const text = currentLocale.value === 'en'
    ? `Hi Maryin, I just took your Triangle Vibe Matcher and matched with ${area}! What builder incentives or homes do you have there?`
    : `Hola Maryin, realicé el test de comunidades en tu sitio y mi resultado fue ${area}. ¿Qué casas o incentivos de constructores tienes disponibles allí?`
  return `sms:${realtorProfile.phoneRaw}?body=${encodeURIComponent(text)}`
})

const matchWhatsappHref = computed(() => {
  const area = computedMatch.value.title
  const text = currentLocale.value === 'en'
    ? `Hi Maryin, I just took your Triangle Vibe Matcher and matched with ${area}! What builder incentives or homes do you have there?`
    : `Hola Maryin, realicé el test de comunidades en tu sitio y mi resultado fue ${area}. ¿Qué casas o incentivos de constructores tienes disponibles allí?`
  return `${realtorProfile.whatsappHref}?text=${encodeURIComponent(text)}`
})
</script>

<template>
  <div class="card vibe-matcher-card">
    <div class="matcher-header">
      <div class="header-tag-row">
        <span class="tag tag-gold">
          ✨ {{ currentLocale === 'en' ? 'Interactive Explorer' : 'Explorador Interactivo' }}
        </span>
        <span class="step-indicator">
          {{ currentStep <= 3 ? (currentLocale === 'en' ? `Step ${currentStep} of 3` : `Paso ${currentStep} de 3`) : (currentLocale === 'en' ? 'Your Recommendation' : 'Tu Recomendación') }}
        </span>
      </div>

      <h3 class="matcher-title">
        {{
          currentStep <= 3
            ? (currentLocale === 'en' ? 'Find Your Perfect North Carolina Pocket in 30 Seconds' : 'Descubre Tu Zona Ideal en Carolina del Norte en 30 Segundos')
            : (currentLocale === 'en' ? 'Your Tailored Triangle Neighborhood Match' : 'Tu Comunidad Recomendada en el Triángulo')
        }}
      </h3>

      <p class="matcher-subtitle">
        {{
          currentStep <= 3
            ? (currentLocale === 'en'
                ? 'Answer 3 quick questions about your weekend rhythm, commute, and home style to pinpoint the best NC communities and builder incentives for your family.'
                : 'Responde 3 preguntas sobre tus fines de semana, traslados y estilo de casa deseado para conocer las comunidades con mayor afinidad y mejores incentivos.')
            : (currentLocale === 'en'
                ? 'Based on your lifestyle and housing priorities, here is the strongest community match hand-analyzed for North Carolina buyers.'
                : 'Basado en tus preferencias de vida y presupuesto, esta es la zona con mayor sintonía y mejores oportunidades de compra.')
        }}
      </p>

      <!-- Progress bar -->
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" :style="{ width: `${Math.min(100, (currentStep / 3) * 100)}%` }" />
      </div>
    </div>

    <!-- QUESTIONS STEPS (1-3) & RESULT (4) -->
    <Transition name="step-fade" mode="out-in">
      <div v-if="currentStep <= 3" :key="currentStep" class="quiz-body">
        <div class="question-header">
          <span class="question-number">{{ questions[currentStep - 1].number }}</span>
          <div>
            <span class="eyebrow question-eyebrow">{{ t(questions[currentStep - 1].eyebrow) }}</span>
            <h4 class="question-title">{{ t(questions[currentStep - 1].title) }}</h4>
          </div>
        </div>

        <div class="options-grid">
          <button
            v-for="(opt, idx) in questions[currentStep - 1].options"
            :key="idx"
            type="button"
            class="card option-card"
            :class="{ 'is-selected': isOptionSelected(idx) }"
            :disabled="isAdvancing"
            @click="handleSelectOption(idx)"
          >
            <div class="option-icon-box">
              <SocialIcon :name="opt.icon" :size="20" />
            </div>
            <div class="option-content">
              <h5 class="option-title">{{ t(opt.title) }}</h5>
              <p class="option-detail">{{ t(opt.detail) }}</p>
            </div>
            <span class="option-arrow">→</span>
          </button>
        </div>

        <div v-if="currentStep > 1" class="quiz-back-row">
          <button
            type="button"
            class="btn btn-outline btn-back"
            :disabled="isAdvancing"
            @click="handlePrevious"
          >
            ← {{ currentLocale === 'en' ? 'Previous Question' : 'Pregunta Anterior' }}
          </button>
        </div>
      </div>

      <!-- STEP 4: RESULT CARD -->
      <div v-else :key="'result'" class="result-body">
        <div class="result-badge-row">
          <span class="tag tag-gold">{{ t(computedMatch.badge) }}</span>
          <span class="match-score-pill">
            ✨ {{ computedMatch.score }} {{ currentLocale === 'en' ? 'Lifestyle Match' : 'Afinidad' }}
          </span>
        </div>

        <h4 class="result-city-name">{{ computedMatch.title }}</h4>
        <p class="result-headline">{{ t(computedMatch.headline) }}</p>
        <p class="result-description">{{ t(computedMatch.description) }}</p>

        <div class="result-metrics-grid">
          <div class="result-metric-box">
            <span class="metric-label">{{ currentLocale === 'en' ? 'Target Price Band' : 'Rango de Precios Habitual' }}</span>
            <span class="metric-val">{{ computedMatch.priceBand }}</span>
          </div>
          <div class="result-metric-box">
            <span class="metric-label">{{ currentLocale === 'en' ? 'Top Advantage' : 'Ventaja Principal' }}</span>
            <span class="metric-val highlight-val">{{ t(computedMatch.topAdvantage) }}</span>
          </div>
        </div>

        <div class="result-cities-row">
          <span class="cities-label">{{ currentLocale === 'en' ? 'Key Neighborhoods:' : 'Comunidades Clave:' }}</span>
          <span v-for="c in computedMatch.cities" :key="c" class="city-pill">
            📍 {{ c }}
          </span>
        </div>

        <!-- Action Row -->
        <div class="result-actions">
          <button type="button" class="btn btn-primary" @click="applyMatchToConsultation">
            <SocialIcon name="sparkles" :size="15" />
            <span>{{ currentLocale === 'en' ? `Match Homes in ${computedMatch.cities[0]} →` : `Buscar Casas en ${computedMatch.cities[0]} →` }}</span>
          </button>

          <a :href="matchWhatsappHref" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <SocialIcon name="whatsapp" :size="15" />
            <span>{{ currentLocale === 'en' ? 'Ask Maryin on WhatsApp' : 'Preguntar a Maryin por WhatsApp' }}</span>
          </a>

          <a :href="matchSmsHref" class="btn btn-outline">
            <SocialIcon name="sms" :size="15" />
            <span>{{ currentLocale === 'en' ? 'Text Maryin Directly' : 'Mensaje de Texto Directo' }}</span>
          </a>

          <button type="button" class="btn btn-outline btn-retake" @click="resetQuiz">
            ↺ {{ currentLocale === 'en' ? 'Retake Quiz' : 'Reiniciar Test' }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.vibe-matcher-card {
  padding: 2.2rem;
  border: 1px solid var(--border-hover);
  background: var(--bg-elevated);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.matcher-header {
  margin-bottom: 1.6rem;
}

.header-tag-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
  flex-wrap: nowrap;
}

.step-indicator {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-primary);
  opacity: 0.85;
  white-space: nowrap;
  flex-shrink: 0;
}

.matcher-title {
  font-family: var(--font-serif);
  font-size: clamp(1.45rem, 2.5vw, 1.95rem);
  font-weight: 700;
  line-height: 1.25;
}

.matcher-subtitle {
  font-size: 0.94rem;
  color: var(--text-secondary);
  margin-top: 0.4rem;
  max-width: 720px;
  line-height: 1.55;
}

.progress-bar-wrap {
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: var(--border-subtle);
  margin-top: 1.15rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-gold));
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.question-header {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}

.question-number {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent-primary);
  opacity: 0.9;
  line-height: 1;
  padding-top: 0.15rem;
}

.question-eyebrow {
  display: block;
  margin-bottom: 0.15rem;
}

.question-title {
  font-family: var(--font-serif);
  font-size: 1.22rem;
  font-weight: 700;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.15rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
}

.option-card:hover:not(:disabled) {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
  transform: translateY(-1.5px);
}

.option-card:active:not(:disabled) {
  transform: translateY(0.5px);
}

.option-card.is-selected {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
  box-shadow: 0 0 0 1.5px var(--accent-primary);
  transform: translateY(-1px);
}

.option-card:disabled {
  cursor: default;
}

.option-icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--accent-primary);
  flex-shrink: 0;
}

.option-content {
  flex: 1;
  min-width: 0;
}

.option-title {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.option-detail {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
  line-height: 1.45;
}

.option-arrow {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--accent-primary);
  opacity: 0.6;
  flex-shrink: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.option-card:hover .option-arrow,
.option-card.is-selected .option-arrow {
  transform: translateX(4px);
  opacity: 1;
  color: var(--accent-primary);
}

.quiz-back-row {
  margin-top: 1.25rem;
}

.btn-back {
  padding: 0.45rem 0.95rem;
  font-size: 0.85rem;
}

/* Step transition */
.step-fade-enter-active,
.step-fade-leave-active {
  transition:
    opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

/* RESULT STYLES */
.result-body {
  animation: fadeInResult 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInResult {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-badge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

.match-score-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.result-city-name {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.result-headline {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-top: 0.35rem;
}

.result-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 0.6rem;
  line-height: 1.6;
  max-width: 780px;
}

.result-metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin-top: 1.25rem;
}

.result-metric-box {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.metric-val {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
}

.highlight-val {
  font-size: 0.92rem;
  color: var(--accent-primary);
}

.result-cities-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.86rem;
}

.cities-label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.84rem;
}

.city-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  font-size: 0.78rem;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-subtle);
}

.result-actions .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
}

.btn-retake {
  margin-left: auto;
}

@media (max-width: 820px) {
  .options-grid {
    grid-template-columns: 1fr;
  }

  .result-metrics-grid {
    grid-template-columns: 1fr;
  }

  .result-actions {
    flex-direction: column;
  }

  .result-actions .btn {
    width: 100%;
  }

  .btn-retake {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .vibe-matcher-card {
    padding: 1.25rem;
  }
}
</style>

