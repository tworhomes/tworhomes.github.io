<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { currentLocale } from '@/data/realtorProfile'
import { submitContactMessage, type ContactSubmitResult } from '@/services/contactFormService'
import SocialIcon from '@/components/SocialIcon.vue'

type FormStatus = 'idle' | 'sending' | 'success'

// Form fields
const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

// Anti-spam protections
const honeypot = ref('')
const mountTime = ref(0)

// Reactive UI states
const formStatus = ref<FormStatus>('idle')
const lastSubmitResult = ref<ContactSubmitResult | null>(null)
const statusMessage = ref('')

onMounted(() => {
  mountTime.value = Date.now()
})

async function handleSubmit() {
  if (formStatus.value === 'sending') return

  formStatus.value = 'sending'
  statusMessage.value = ''

  try {
    const result = await submitContactMessage({
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
      honeypot: honeypot.value,
      mountTime: mountTime.value,
      preferredLanguage: currentLocale.value === 'en' ? 'English' : 'Español'
    })

    lastSubmitResult.value = result

    if (result.provider === 'mailto') {
      statusMessage.value =
        currentLocale.value === 'en'
          ? 'Opening your email client to send your message...'
          : 'Abriendo tu aplicación de correo para enviar el mensaje...'
    }

    formStatus.value = 'success'
  } catch (error) {
    console.error('[ContactForm] Submission failed:', error)
    formStatus.value = 'idle'
    statusMessage.value =
      currentLocale.value === 'en'
        ? 'Something went wrong. Please call or text (919) 771-7755 directly.'
        : 'Ocurrió un error. Por favor llama o envía un texto al (919) 771-7755.'
  }
}

function handleReset() {
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
  honeypot.value = ''
  mountTime.value = Date.now()
  formStatus.value = 'idle'
  lastSubmitResult.value = null
  statusMessage.value = ''
}
</script>

<template>
  <div class="direct-contact-card card">
    <div class="form-header">
      <span class="eyebrow">
        {{ currentLocale === 'en' ? 'DIRECT CLIENT INQUIRY' : 'CONSULTA DIRECTA' }}
      </span>
      <h3 class="form-title">
        {{ currentLocale === 'en' ? 'Send Maryin a Direct Note' : 'Envía un Mensaje Directo a Maryin' }}
      </h3>
      <p class="form-subtitle">
        {{
          currentLocale === 'en'
            ? 'Have a question about Triangle homes, builder incentives, or scheduling a consultation? Send a secure note directly below.'
            : '¿Tienes dudas sobre el mercado en el Triángulo, incentivos de constructores o deseas agendar una consulta? Escríbele a continuación.'
        }}
      </p>
    </div>

    <!-- SUCCESS CONFIRMATION STATE -->
    <div
      v-if="formStatus === 'success'"
      class="state-panel success-panel"
      role="status"
      aria-live="polite"
    >
      <div class="success-icon-wrap">
        <SocialIcon name="check" :size="28" />
      </div>
      <h4 class="success-title">
        {{ currentLocale === 'en' ? 'Message Sent Successfully!' : '¡Mensaje Enviado con Éxito!' }}
      </h4>
      <p class="success-text">
        {{
          lastSubmitResult?.provider === 'mailto'
            ? currentLocale === 'en'
              ? 'Your email client has been prepared with your message. If it did not open automatically, Maryin is also reachable at maryinhomes@gmail.com or (919) 771-7755.'
              : 'Tu correo ha sido preparado con tu mensaje. Si no se abrió automáticamente, puedes contactar a Maryin en maryinhomes@gmail.com o al (919) 771-7755.'
            : currentLocale === 'en'
              ? 'Thank you! Your inquiry was sent directly to Maryin Estefania Dos Ramos. She will review your details and respond as soon as possible.'
              : '¡Muchas gracias! Tu mensaje fue enviado directamente a Maryin Estefania Dos Ramos. Revisará tus datos y te responderá a la brevedad.'
        }}
      </p>

      <div class="success-actions">
        <button type="button" class="btn btn-outline" @click="handleReset">
          {{ currentLocale === 'en' ? 'Send Another Message' : 'Enviar Otro Mensaje' }}
        </button>
        <a href="tel:9197717755" class="btn btn-primary">
          <SocialIcon name="phone" :size="16" />
          <span>{{ currentLocale === 'en' ? 'Call (919) 771-7755' : 'Llamar (919) 771-7755' }}</span>
        </a>
      </div>
    </div>

    <!-- FORM INPUTS (IDLE & SENDING STATES) -->
    <form v-else class="direct-form" @submit.prevent="handleSubmit">
      <!-- Anti-Spam Honeypot Trap Field (Invisible & Offscreen) -->
      <div class="hp-trap" aria-hidden="true">
        <label for="companyWebsite-hp">Company Website (do not fill)</label>
        <input
          id="companyWebsite-hp"
          v-model="honeypot"
          type="text"
          name="companyWebsite"
          tabindex="-1"
          autocomplete="off"
        >
      </div>

      <div class="field-grid">
        <!-- Name Field -->
        <div class="field-group">
          <label for="contact-name" class="field-label">
            {{ currentLocale === 'en' ? 'Full Name' : 'Nombre Completo' }}
            <span class="required-star" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            v-model="name"
            type="text"
            required
            autocomplete="name"
            class="input-field"
            :disabled="formStatus === 'sending'"
            :placeholder="currentLocale === 'en' ? 'e.g., Sofia Miller' : 'Ej. Sofía Miller'"
          >
        </div>

        <!-- Email Field -->
        <div class="field-group">
          <label for="contact-email" class="field-label">
            {{ currentLocale === 'en' ? 'Email Address' : 'Correo Electrónico' }}
            <span class="required-star" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            v-model="email"
            type="email"
            required
            inputmode="email"
            autocomplete="email"
            class="input-field"
            :disabled="formStatus === 'sending'"
            :placeholder="currentLocale === 'en' ? 'sofia@example.com' : 'sofia@ejemplo.com'"
          >
        </div>

        <!-- Subject Field -->
        <div class="field-group full-width">
          <label for="contact-subject" class="field-label">
            {{ currentLocale === 'en' ? 'Subject' : 'Asunto' }}
            <span class="required-star" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-subject"
            v-model="subject"
            type="text"
            required
            autocomplete="off"
            class="input-field"
            :disabled="formStatus === 'sending'"
            :placeholder="
              currentLocale === 'en'
                ? 'e.g., Question about Raleigh new construction or seller CMA'
                : 'Ej. Pregunta sobre casas nuevas en Raleigh o valoración de propiedad'
            "
          >
        </div>

        <!-- Message Field -->
        <div class="field-group full-width">
          <label for="contact-message" class="field-label">
            {{ currentLocale === 'en' ? 'Message' : 'Mensaje' }}
            <span class="required-star" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            v-model="message"
            required
            rows="5"
            class="input-field textarea-field"
            :disabled="formStatus === 'sending'"
            :placeholder="
              currentLocale === 'en'
                ? 'Share your real estate questions, timing, or areas of interest...'
                : 'Comparte tus dudas inmobiliarias, tiempos o zonas de interés...'
            "
          />
        </div>
      </div>

      <!-- Optional status alert if any -->
      <p v-if="statusMessage" class="form-feedback-message">
        {{ statusMessage }}
      </p>

      <!-- Submit Action Bar -->
      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary submit-btn"
          :disabled="formStatus === 'sending'"
        >
          <template v-if="formStatus === 'sending'">
            <SocialIcon name="spinner" :size="17" />
            <span>{{ currentLocale === 'en' ? 'Sending Message...' : 'Enviando Mensaje...' }}</span>
          </template>
          <template v-else>
            <SocialIcon name="send" :size="16" />
            <span>{{ currentLocale === 'en' ? 'Send Message to Maryin' : 'Enviar Mensaje a Maryin' }}</span>
          </template>
        </button>

        <span class="privacy-note">
          🔒 {{
            currentLocale === 'en'
              ? 'Direct & confidential. No third-party spam.'
              : 'Directo y confidencial. Sin intermediarios ni spam.'
          }}
        </span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.direct-contact-card {
  padding: 2.1rem;
  border: 1px solid var(--border-hover);
  background: var(--bg-elevated);
}

.form-header {
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-title {
  font-family: var(--font-serif);
  font-size: clamp(1.45rem, 2.5vw, 1.95rem);
  font-weight: 700;
  margin: 0;
}

.form-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

/* Offscreen Honeypot Trap */
.hp-trap {
  position: absolute !important;
  left: -9999px !important;
  top: auto !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.25rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field-group.full-width {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required-star {
  color: var(--accent-gold);
}

.textarea-field {
  resize: vertical;
  min-height: 130px;
  line-height: 1.55;
}

.form-actions {
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-subtle);
}

.submit-btn {
  min-width: 210px;
}

.submit-btn:disabled {
  opacity: 0.75;
  cursor: not-allowed;
  transform: none !important;
  filter: none !important;
}

.privacy-note {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.form-feedback-message {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--accent-gold);
}

/* Success Confirmation Panel */
.state-panel.success-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.success-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-emerald-glow, rgba(52, 211, 153, 0.15));
  color: var(--accent-emerald, #10b981);
  margin-bottom: 1.25rem;
  border: 1px solid rgba(52, 211, 153, 0.35);
}

.success-title {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.success-text {
  color: var(--text-secondary);
  font-size: 0.98rem;
  max-width: 540px;
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.success-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: center;
}

@media (max-width: 640px) {
  .direct-contact-card {
    padding: 1.35rem 1.15rem;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .submit-btn {
    width: 100%;
  }

  .success-actions {
    flex-direction: column;
    width: 100%;
  }

  .success-actions .btn {
    width: 100%;
  }
}
</style>

