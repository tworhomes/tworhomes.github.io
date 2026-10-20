<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { realtorProfile, currentLocale, t } from '@/data/realtorProfile'
import { submitContactMessage } from '@/services/contactFormService'
import SocialIcon from '@/components/SocialIcon.vue'

const props = defineProps<{
  initialArea?: string
  initialCustomLocation?: string
}>()

type FunnelMode = 'buyer' | 'seller' | 'relocation'

const activeMode = ref<FunnelMode>('buyer')
const copiedBrief = ref(false)
const submittedPreview = ref(false)

// Shared fields
const clientName = ref('')
const clientPhone = ref('')
const clientEmail = ref('')
const preferredLanguage = ref<'English' | 'Español'>('English')

// Buyer fields
const targetArea = ref(props.initialArea || 'Raleigh / Wake County')
const customLocation = ref(props.initialCustomLocation || '')
const budgetRange = ref('$350,000 – $500,000')
const buyerTimeline = ref('Within 1–3 Months')
const buyerProgram = ref('First-Time Homebuyer Guidance & NC Assistance Programs')
const buyerNotes = ref('')
const mustHavesTextareaRef = ref<HTMLTextAreaElement | null>(null)

function adjustTextareaHeight(e?: Event) {
  const el = (e?.target as HTMLTextAreaElement | null) || mustHavesTextareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

watch(buyerNotes, () => {
  nextTick(adjustTextareaHeight)
})

watch(
  () => props.initialArea,
  (newArea) => {
    if (newArea) {
      targetArea.value = newArea
    }
  }
)

watch(
  () => props.initialCustomLocation,
  (newLocation) => {
    if (newLocation !== undefined) {
      customLocation.value = newLocation
    }
  }
)

const effectiveLocation = computed(() => {
  if (targetArea.value.includes('Other') && customLocation.value.trim()) {
    return customLocation.value.trim()
  }
  return targetArea.value
})

// Seller fields
const propertyAddress = ref('')
const propertySpecs = ref('3–4 Beds · Single-Family Home')
const estimatedRange = ref('$350,000 – $500,000')
const sellerTimeline = ref('Ready in 30–60 Days')
const sellerUpgrades = ref('')

// Relocation fields
const movingFrom = ref('')
const relocationGoal = ref('Buying a Home in the Research Triangle')
const relocationNotes = ref('')

const generatedSubject = computed(() => {
  if (activeMode.value === 'buyer') {
    return currentLocale.value === 'en'
      ? `VIP Buyer & Home Search Inquiry — ${clientName.value || 'NC Buyer'} (${effectiveLocation.value})`
      : `Consulta de Compra Inmobiliaria — ${clientName.value || 'Comprador NC'} (${effectiveLocation.value})`
  }
  if (activeMode.value === 'seller') {
    return currentLocale.value === 'en'
      ? `Custom Home Valuation (CMA) Request — ${propertyAddress.value || 'Triangle Homeowner'}`
      : `Solicitud de Valoración de Propiedad (CMA) — ${propertyAddress.value || 'Propietario NC'}`
  }
  return currentLocale.value === 'en'
    ? `NC Relocation & Strategy Call — ${clientName.value || 'Prospective Client'}`
    : `Llamada de Estrategia / Mudanza a NC — ${clientName.value || 'Cliente Potencial'}`
})

const generatedBody = computed(() => {
  const lines: string[] = [
    `Hello Maryin Estefania Dos Ramos,`,
    ``,
    `--- CLIENT PROFILE ---`,
    `Name: ${clientName.value || 'Not provided yet'}`,
    `Phone: ${clientPhone.value || 'Not provided yet'}`,
    `Email: ${clientEmail.value || 'Not provided yet'}`,
    `Preferred Language: ${preferredLanguage.value}`,
    ``
  ]

  if (activeMode.value === 'buyer') {
    lines.push(
      `--- VIP BUYER HOME SEARCH ---`,
      `Target NC Area: ${effectiveLocation.value}`,
      `Target Budget: ${budgetRange.value}`,
      `Timeline: ${buyerTimeline.value}`,
      `Primary Focus: ${buyerProgram.value}`,
      `Additional Goals: ${buyerNotes.value || 'Looking for personalized NC listings & guidance.'}`
    )
  } else if (activeMode.value === 'seller') {
    lines.push(
      `--- CUSTOM SELLER HOME VALUATION (CMA) REQUEST ---`,
      `Property Address / Neighborhood: ${propertyAddress.value || 'Research Triangle, NC'}`,
      `Property Type & Specs: ${propertySpecs.value}`,
      `Estimated Value Band: ${estimatedRange.value}`,
      `Selling Timeline: ${sellerTimeline.value}`,
      `Upgrades / Notes: ${sellerUpgrades.value || 'Requesting a custom, non-automated CMA from Maryin.'}`
    )
  } else {
    lines.push(
      `--- NC RELOCATION & STRATEGY CONSULTATION ---`,
      `Relocating From / Current City: ${movingFrom.value || 'Out of Area / NC'}`,
      `Primary Objective: ${relocationGoal.value}`,
      `Target NC Area: ${targetArea.value}`,
      `Questions / Notes: ${relocationNotes.value || 'Would love to schedule a 15-minute strategy call.'}`
    )
  }

  return lines.join('\n')
})

const mailtoHref = computed(() => {
  return `mailto:${realtorProfile.primaryEmail}?cc=${realtorProfile.expEmail}&subject=${encodeURIComponent(
    generatedSubject.value
  )}&body=${encodeURIComponent(generatedBody.value)}`
})

const smsLinkHref = computed(() => {
  return `sms:${realtorProfile.phoneRaw}?body=${encodeURIComponent(
    `${generatedSubject.value}\n\n${generatedBody.value}`
  )}`
})

const whatsappLinkHref = computed(() => {
  return `${realtorProfile.whatsappHref}?text=${encodeURIComponent(
    `${generatedSubject.value}\n\n${generatedBody.value}`
  )}`
})

function handlePreparePlan() {
  submittedPreview.value = true
}

const honeypot = ref('')
const mountTime = ref(0)
const isSending = ref(false)
const submitNotice = ref('')

onMounted(() => {
  mountTime.value = Date.now()
})

const activeModeDetails = computed<Record<string, string | undefined>>(() => {
  if (activeMode.value === 'buyer') {
    return {
      'Plan Type': 'VIP Buyer & New Construction Search',
      'Target NC Area': effectiveLocation.value,
      'Budget Range': budgetRange.value,
      'Buying Timeline': buyerTimeline.value,
      'Primary Focus': buyerProgram.value,
      'Must-Haves & Notes': buyerNotes.value || 'None specified'
    }
  }
  if (activeMode.value === 'seller') {
    return {
      'Plan Type': 'Custom Seller Home Valuation (CMA)',
      'Property Address': propertyAddress.value || 'Research Triangle, NC',
      'Property Layout & Specs': propertySpecs.value,
      'Estimated Value Range': estimatedRange.value,
      'Selling Timeline': sellerTimeline.value,
      'Recent Upgrades & Goals': sellerUpgrades.value || 'None specified'
    }
  }
  return {
    'Plan Type': 'NC Relocation & Strategy Consultation',
    'Relocating From': movingFrom.value || 'Out of Area / NC',
    'Primary Objective': relocationGoal.value,
    'Target NC Area': effectiveLocation.value,
    'Questions & Notes': relocationNotes.value || 'None specified'
  }
})

async function handleSendEmail() {
  if (isSending.value) return

  // Validation: ensure email is provided so Maryin can send the plan
  if (!clientEmail.value.trim()) {
    submitNotice.value =
      currentLocale.value === 'en'
        ? 'Please enter your email address so Maryin can send you your custom plan.'
        : 'Por favor ingresa tu correo electrónico para que Maryin pueda enviarte tu plan personalizado.'
    submittedPreview.value = true
    return
  }

  isSending.value = true
  submitNotice.value = ''

  try {
    const res = await submitContactMessage({
      name: clientName.value.trim() || (currentLocale.value === 'en' ? 'Prospective NC Client' : 'Cliente Potencial NC'),
      email: clientEmail.value.trim(),
      subject: generatedSubject.value,
      message: generatedBody.value,
      phone: clientPhone.value.trim() || undefined,
      preferredLanguage: preferredLanguage.value,
      honeypot: honeypot.value,
      mountTime: mountTime.value,
      details: {
        ...activeModeDetails.value,
        'Client Name': clientName.value.trim() || 'Not provided',
        'Client Phone': clientPhone.value.trim() || 'Not provided',
        'Client Email': clientEmail.value.trim(),
        'Preferred Language': preferredLanguage.value
      }
    })

    submittedPreview.value = true
    if (res.provider === 'mailto') {
      submitNotice.value =
        currentLocale.value === 'en'
          ? 'Opening your email client with your plan...'
          : 'Abriendo tu aplicación de correo con tu plan...'
    } else {
      submitNotice.value =
        currentLocale.value === 'en'
          ? 'Your consultation plan has been submitted directly to Maryin!'
          : '¡Tu plan de consulta ha sido enviado directamente a Maryin!'
    }
  } catch (err) {
    console.error('[ClientFunnelWidget] Send error:', err)
  } finally {
    isSending.value = false
  }
}

async function copyBriefToClipboard() {
  try {
    await navigator.clipboard.writeText(`${generatedSubject.value}\n\n${generatedBody.value}`)
    copiedBrief.value = true
    setTimeout(() => {
      copiedBrief.value = false
    }, 2600)
  } catch {
    copiedBrief.value = false
  }
}
</script>

<template>
  <div class="consultation-card card">
    <div class="consultation-top">
      <div>
        <span class="eyebrow">
          {{ t(realtorProfile.funnelConfig.eyebrow) }}
        </span>
        <h3 class="consultation-title">
          {{ t(realtorProfile.funnelConfig.title) }}
        </h3>
      </div>

      <div class="mode-tabs" role="tablist">
        <button
          type="button"
          class="mode-tab"
          :class="{ active: activeMode === 'buyer' }"
          @click="activeMode = 'buyer'"
        >
          <SocialIcon :name="realtorProfile.funnelConfig.tabs.buyer.icon" :size="16" />
          <span>{{ t(realtorProfile.funnelConfig.tabs.buyer.label) }}</span>
        </button>
        <button
          type="button"
          class="mode-tab"
          :class="{ active: activeMode === 'seller' }"
          @click="activeMode = 'seller'"
        >
          <SocialIcon :name="realtorProfile.funnelConfig.tabs.seller.icon" :size="16" />
          <span>{{ t(realtorProfile.funnelConfig.tabs.seller.label) }}</span>
        </button>
        <button
          type="button"
          class="mode-tab"
          :class="{ active: activeMode === 'relocation' }"
          @click="activeMode = 'relocation'"
        >
          <SocialIcon :name="realtorProfile.funnelConfig.tabs.relocation.icon" :size="16" />
          <span>{{ t(realtorProfile.funnelConfig.tabs.relocation.label) }}</span>
        </button>
      </div>
    </div>

    <form class="consultation-form" @submit.prevent="handlePreparePlan">
      <!-- Dynamic Mode Banner -->
      <div class="mode-callout">
        <template v-if="activeMode === 'buyer'">
          <span class="tag tag-gold">{{ t(realtorProfile.funnelConfig.tabs.buyer.calloutTag) }}</span>
          <p>{{ t(realtorProfile.funnelConfig.tabs.buyer.calloutText) }}</p>
        </template>
        <template v-else-if="activeMode === 'seller'">
          <span class="tag">{{ t(realtorProfile.funnelConfig.tabs.seller.calloutTag) }}</span>
          <p>{{ t(realtorProfile.funnelConfig.tabs.seller.calloutText) }}</p>
        </template>
        <template v-else>
          <span class="tag">{{ t(realtorProfile.funnelConfig.tabs.relocation.calloutTag) }}</span>
          <p>{{ t(realtorProfile.funnelConfig.tabs.relocation.calloutText) }}</p>
        </template>
      </div>

      <!-- Mode-Specific Inputs -->
      <div v-if="activeMode === 'buyer'" class="field-grid">
        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Target NC Area / County' : 'Área o Condado de Interés en NC' }}
          </label>
          <select v-model="targetArea" class="select-field">
            <option
              v-for="area in realtorProfile.funnelConfig.targetAreas"
              :key="area"
              :value="area"
            >
              {{ area }}
            </option>
          </select>
        </div>

        <div v-if="targetArea.includes('Other')" class="field-group full-width">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Specific City, Town, or Region in NC' : 'Ciudad, Pueblo o Zona en NC' }}
          </label>
          <input
            v-model="customLocation"
            type="text"
            class="input-field"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., Charlotte, Greensboro, Fayetteville, Coast, or open to recommendations'
                : 'Ej. Charlotte, Greensboro, Fayetteville, Costa o abierto a recomendaciones'
            "
          >
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Target Price Range' : 'Rango de Presupuesto' }}
          </label>
          <select v-model="budgetRange" class="select-field">
            <option
              v-for="budget in realtorProfile.funnelConfig.budgetRanges"
              :key="budget"
              :value="budget"
            >
              {{ budget }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Buying Timeline' : 'Tiempo Estimado de Compra' }}
          </label>
          <select v-model="buyerTimeline" class="select-field">
            <option
              v-for="time in realtorProfile.funnelConfig.buyerTimelines"
              :key="time"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Primary Focus / Guidance' : 'Enfoque Principal / Asesoría' }}
          </label>
          <select v-model="buyerProgram" class="select-field">
            <option
              v-for="prog in realtorProfile.funnelConfig.buyerPrograms"
              :key="prog"
              :value="prog"
            >
              {{ prog }}
            </option>
          </select>
        </div>

        <div class="field-group full-width">
          <div class="field-label-row">
            <label class="field-label">
              {{ currentLocale === 'en' ? 'Must-Haves (Beds, Lot Size, School District)' : 'Detalles adicionales (Habitaciones, Lote, etc.)' }}
            </label>
            <span class="char-counter" :class="{ 'char-counter-near': buyerNotes.length >= 450 }">
              {{ buyerNotes.length }}/500
            </span>
          </div>
          <textarea
            ref="mustHavesTextareaRef"
            v-model="buyerNotes"
            maxlength="500"
            rows="2"
            class="input-field textarea-field must-haves-textarea"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., 4 beds, 2-car garage, new build incentives in Clayton or Durham...'
                : 'Ej. 4 habitaciones, garaje doble, incentivos en casa nueva en Clayton o Durham...'
            "
            @input="adjustTextareaHeight"
          />
        </div>
      </div>

      <div v-else-if="activeMode === 'seller'" class="field-grid">
        <div class="field-group full-width">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'North Carolina Property Address or Subdivision' : 'Dirección de la Propiedad o Comunidad en NC' }}
          </label>
          <input
            v-model="propertyAddress"
            type="text"
            class="input-field"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., 123 Oak Ridge Ave, Raleigh / Durham / Clayton, NC'
                : 'Ej. Dirección o vecindario en Raleigh, Durham, Cary, Clayton...'
            "
          >
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Property Layout' : 'Características de la Propiedad' }}
          </label>
          <select v-model="propertySpecs" class="select-field">
            <option
              v-for="spec in realtorProfile.funnelConfig.propertySpecs"
              :key="spec"
              :value="spec"
            >
              {{ spec }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Estimated Value Range' : 'Rango Estimado de Valor' }}
          </label>
          <select v-model="estimatedRange" class="select-field">
            <option
              v-for="range in realtorProfile.funnelConfig.budgetRanges"
              :key="range"
              :value="range"
            >
              {{ range }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Ideal Selling Timeline' : 'Tiempo Estimado para Vender' }}
          </label>
          <select v-model="sellerTimeline" class="select-field">
            <option
              v-for="timeline in realtorProfile.funnelConfig.sellerTimelines"
              :key="timeline"
              :value="timeline"
            >
              {{ timeline }}
            </option>
          </select>
        </div>

        <div class="field-group full-width">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Recent Upgrades or Seller Goals' : 'Mejoras Recientes o Meta de Venta' }}
          </label>
          <input
            v-model="sellerUpgrades"
            type="text"
            class="input-field"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., Updated kitchen, fenced yard, looking to upsize into a new build...'
                : 'Ej. Cocina remodelada, patio cercado, deseamos vender para comprar una casa nueva...'
            "
          >
        </div>
      </div>

      <div v-else class="field-grid">
        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Relocating From (City / State)' : '¿De qué ciudad o estado te mudas?' }}
          </label>
          <input
            v-model="movingFrom"
            type="text"
            class="input-field"
            :placeholder="currentLocale === 'en' ? 'e.g., New York, Florida, California, or Local NC' : 'Ej. Nueva York, Florida, Texas, o dentro de NC'"
          >
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Primary Goal' : 'Objetivo Principal' }}
          </label>
          <select v-model="relocationGoal" class="select-field">
            <option
              v-for="goal in realtorProfile.funnelConfig.relocationGoals"
              :key="goal"
              :value="goal"
            >
              {{ goal }}
            </option>
          </select>
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Target NC Area / Region' : 'Área o Región de Interés en NC' }}
          </label>
          <select v-model="targetArea" class="select-field">
            <option
              v-for="area in realtorProfile.funnelConfig.targetAreas"
              :key="area"
              :value="area"
            >
              {{ area }}
            </option>
          </select>
        </div>

        <div v-if="targetArea.includes('Other')" class="field-group full-width">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Specific City, Town, or Region in NC' : 'Ciudad, Pueblo o Zona en NC' }}
          </label>
          <input
            v-model="customLocation"
            type="text"
            class="input-field"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., Charlotte, Greensboro, Fayetteville, Coast, or open to recommendations'
                : 'Ej. Charlotte, Greensboro, Fayetteville, Costa o abierto a recomendaciones'
            "
          >
        </div>

        <div class="field-group full-width">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Questions for Maryin' : 'Preguntas o Comentarios para Maryin' }}
          </label>
          <input
            v-model="relocationNotes"
            type="text"
            class="input-field"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., Commute to RTP, best new-build incentives, school zones...'
                : 'Ej. Tiempo de traslado a RTP, mejores áreas familiares, opciones de financiamiento...'
            "
          >
        </div>
      </div>

      <!-- Client Contact Info -->
      <div class="field-grid contact-row">
        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Your Name' : 'Tu Nombre Completo' }}
            <span class="required-star" aria-hidden="true">*</span>
          </label>
          <input
            v-model="clientName"
            type="text"
            required
            autocomplete="name"
            class="input-field"
            :placeholder="currentLocale === 'en' ? 'Your full name' : 'Tu nombre y apellido'"
          >
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Mobile Phone' : 'Teléfono Móvil' }}
          </label>
          <input
            v-model="clientPhone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            class="input-field"
            placeholder="(919) 000-0000"
          >
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Email Address' : 'Correo Electrónico' }}
            <span class="required-star" aria-hidden="true">*</span>
          </label>
          <input
            v-model="clientEmail"
            type="email"
            required
            inputmode="email"
            autocomplete="email"
            class="input-field"
            placeholder="you@example.com"
          >
        </div>

        <div class="field-group">
          <label class="field-label">
            {{ currentLocale === 'en' ? 'Preferred Language' : 'Idioma Preferido' }}
          </label>
          <select v-model="preferredLanguage" class="select-field">
            <option value="English">English</option>
            <option value="Español">Español</option>
          </select>
        </div>
      </div>

      <!-- Anti-Spam Honeypot Trap Field -->
      <div class="hp-trap" aria-hidden="true">
        <input v-model="honeypot" type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
      </div>

      <!-- Instant Omnichannel Action Bar -->
      <div class="consultation-actions">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="isSending"
          @click="handleSendEmail"
        >
          <SocialIcon :name="isSending ? 'spinner' : 'email'" :size="15" />
          <span>{{
            isSending
              ? currentLocale === 'en'
                ? 'Sending Plan...'
                : 'Enviando Solicitud...'
              : currentLocale === 'en'
                ? 'Send Plan via Email to Maryin'
                : 'Enviar Solicitud por Correo a Maryin'
          }}</span>
        </button>

        <a :href="smsLinkHref" class="btn btn-gold" @click="handlePreparePlan">
          <SocialIcon name="sms" :size="15" />
          <span>{{
            currentLocale === 'en'
              ? 'Send via Instant Text (919) 771-7755'
              : 'Enviar por Texto Directo (919) 771-7755'
          }}</span>
        </a>

        <a
          :href="whatsappLinkHref"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline"
          @click="handlePreparePlan"
        >
          <SocialIcon name="whatsapp" :size="15" />
          <span>WhatsApp Direct</span>
        </a>

        <button type="button" class="btn btn-outline" @click="copyBriefToClipboard">
          <SocialIcon :name="copiedBrief ? 'check' : 'copy'" :size="15" />
          <span>{{
            copiedBrief
              ? currentLocale === 'en'
                ? 'Copied Summary!'
                : '¡Resumen Copiado!'
              : currentLocale === 'en'
                ? 'Copy Summary'
                : 'Copiar Resumen'
          }}</span>
        </button>
      </div>

      <div v-if="submittedPreview" class="consultation-confirm">
        <SocialIcon name="sparkles" :size="15" />
        <div>
          <strong v-if="submitNotice" class="submit-notice-line">
            {{ submitNotice }}
          </strong>
          <span>{{
            currentLocale === 'en'
              ? 'Your custom real estate brief is ready! You can also call Maryin directly at (919) 771-7755 or DM @maryin2ramos_realtor on Instagram.'
              : '¡Tu resumen personalizado está listo! También puedes llamar directamente a Maryin al (919) 771-7755 o escribirle a @maryin2ramos_realtor en Instagram.'
          }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.consultation-card {
  padding: 2.1rem;
  border: 1px solid var(--border-hover);
}

.consultation-top {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.consultation-title {
  font-family: var(--font-serif);
  font-size: clamp(1.45rem, 2.5vw, 1.95rem);
  margin-top: 0.3rem;
}

.mode-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.mode-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 46px;
  padding: 0.78rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-subtle);
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--btn-transition);
}

.mode-tab:hover {
  border-color: var(--accent-primary);
  color: var(--text-primary);
  transform: var(--btn-hover-transform);
}

.mode-tab.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: #ffffff;
  border-color: transparent;
  box-shadow: var(--btn-shadow);
}

.mode-callout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  margin-bottom: 1.35rem;
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.1rem;
}

.contact-row {
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
}

.field-group.full-width {
  grid-column: 1 / -1;
}

.field-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.char-counter {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
}

.char-counter-near {
  color: var(--accent-gold);
  font-weight: 700;
}

.must-haves-textarea {
  min-height: calc(1.5em * 2 + 1.44rem); /* 2 lines on computer */
  max-height: calc(1.5em * 5 + 1.44rem); /* expands up to 5 lines */
  line-height: 1.5;
  resize: vertical;
  overflow-y: auto;
  font-family: var(--font-sans);
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.required-star {
  color: var(--accent-gold);
  margin-left: 0.2rem;
}

.consultation-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.consultation-actions .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
}

.consultation-confirm {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.3);
  color: var(--accent-emerald);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.5;
}

.consultation-confirm :deep(.theme-social-icon) {
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.submit-notice-line {
  display: block;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.hp-trap {
  position: absolute !important;
  left: -9999px !important;
  top: auto !important;
  width: 1px !important;
  height: 1px !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

@media (max-width: 780px) {
  .mode-tabs,
  .field-grid {
    grid-template-columns: 1fr;
  }

  .consultation-card {
    padding: 1.25rem;
  }

  .consultation-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .consultation-actions .btn {
    width: 100%;
  }

  .must-haves-textarea {
    min-height: calc(1.5em * 3 + 1.44rem); /* 3 lines on mobile */
  }
}
</style>
