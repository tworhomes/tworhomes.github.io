import { realtorProfile } from '@/data/realtorProfile'

export interface ContactFormPayload {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
  mountTime: number
  phone?: string
  preferredLanguage?: string
  details?: Record<string, string | undefined>
}

export interface ContactSubmitResult {
  success: boolean
  provider: 'formspree' | 'web3forms' | 'mailto' | 'silent_drop'
  message?: string
}

/** Minimum interaction threshold to prevent automated bot scripts (1.2s) */
const BOT_VELOCITY_THRESHOLD_MS = 1200

/**
 * Default testing endpoint provided for local development if Vite dev server
 * has not yet restarted to read .env.local.
 */
const DEV_FALLBACK_ENDPOINT = 'https://formspree.io/f/xqpeowqq'

/**
 * Resolves the active Formspree endpoint URL.
 */
function resolveFormspreeEndpoint(): string | undefined {
  const configured = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()
  if (configured && configured.length > 0) return configured
  // In local Vite development mode, fall back to the provided test endpoint
  if (import.meta.env.DEV) return DEV_FALLBACK_ENDPOINT
  return undefined
}

/**
 * Returns true if an asynchronous submission provider (Formspree or Web3Forms) is configured.
 */
export function isAsyncConfigured(): boolean {
  const formspree = resolveFormspreeEndpoint()
  const web3forms = import.meta.env.VITE_WEB3FORMS_KEY
  return Boolean((formspree && formspree.trim().length > 0) || (web3forms && web3forms.trim().length > 0))
}

/**
 * Submits the contact message asynchronously in the background.
 * Order of operations:
 * 1. Anti-spam honeypot check (silently drop bot submission)
 * 2. Anti-spam velocity check (< 1.2s silently drop bot submission)
 * 3. Primary endpoint: Formspree (VITE_FORMSPREE_ENDPOINT)
 * 4. Secondary fallback: Web3Forms (VITE_WEB3FORMS_KEY)
 * 5. Tertiary fallback: Native mailto: link if APIs fail or are unconfigured
 */
export async function submitContactMessage(payload: ContactFormPayload): Promise<ContactSubmitResult> {
  // 1. Anti-Spam Check: Honeypot Trap
  // If the hidden off-screen field is populated, bot detected -> silently succeed
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return {
      success: true,
      provider: 'silent_drop',
      message: 'Submission received.'
    }
  }

  // 2. Anti-Spam Check: Velocity Check
  // Measure elapsed time between component mount and submission
  const elapsedMs = Date.now() - payload.mountTime
  if (elapsedMs < BOT_VELOCITY_THRESHOLD_MS) {
    return {
      success: true,
      provider: 'silent_drop',
      message: 'Submission received.'
    }
  }

  const formspreeEndpoint = resolveFormspreeEndpoint()
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY?.trim()

  // 3. Primary API: Formspree
  if (formspreeEndpoint) {
    try {
      console.log('[ContactForm] Submitting to Formspree endpoint:', formspreeEndpoint)
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _replyto: payload.email,
          subject: payload.subject,
          message: payload.message,
          phone: payload.phone || undefined,
          language: payload.preferredLanguage || undefined,
          ...payload.details
        })
      })

      if (response.ok) {
        console.log('[ContactForm] Formspree submission successful (200 OK)')
        return {
          success: true,
          provider: 'formspree'
        }
      }
      console.warn(`[ContactForm] Formspree returned status ${response.status}. Attempting secondary fallback...`)
    } catch (err) {
      console.warn('[ContactForm] Formspree network error. Attempting secondary fallback...', err)
    }
  }

  // 4. Secondary API: Web3Forms
  if (web3formsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          phone: payload.phone || undefined,
          language: payload.preferredLanguage || undefined,
          from_name: 'Maryin Estefania Dos Ramos - Client Acquisition',
          ...payload.details
        })
      })

      const data = await response.json()
      if (response.ok && data.success) {
        return {
          success: true,
          provider: 'web3forms'
        }
      }
      console.warn('[ContactForm] Web3Forms returned failure. Falling back to mailto...', data)
    } catch (err) {
      console.warn('[ContactForm] Web3Forms network error. Falling back to mailto...', err)
    }
  }

  // 5. Tertiary Fallback: Native mailto: link
  const mailLines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : '',
    payload.preferredLanguage ? `Preferred Language: ${payload.preferredLanguage}` : '',
    '',
    'Message:',
    payload.message
  ].filter(Boolean)

  const mailtoUrl = `mailto:${realtorProfile.primaryEmail}?cc=${realtorProfile.expEmail}&subject=${encodeURIComponent(
    payload.subject
  )}&body=${encodeURIComponent(mailLines.join('\n'))}`

  window.location.href = mailtoUrl

  return {
    success: true,
    provider: 'mailto',
    message: 'Opening email client...'
  }
}

