<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { currentTheme, isLight } = useTheme()
const canvasRef = ref<HTMLCanvasElement | null>(null)

// ============================================================================
// 🎛️ CUSTOMIZATION CONTROLS & DREAMY NEBULA PHYSICS SETTINGS
// Isolated, strongly-typed configuration following Aaron's motion standards.
// ============================================================================
const CONFIG = {
  // 1. 🌌 Dreamy Nebula Physics Preset (Slow, celestial glide & viscous trailing wake)
  physics: {
    springTension: 0.018,
    springDamping: 0.92,
    trailTension: 0.009,
    trailDamping: 0.90
  },

  // 2. ✨ Highlight Bloom & Ease-In Curve
  highlight: {
    easeInSpeed: 0.026,
    easeOutSpeed: 0.018,
    radius: 180,
    falloffExponent: 1.5,
    trailIntensity: 0.48,
    threshold: 0.02
  },

  // 3. 📜 Parallax Depth & Page Scrolling
  parallax: {
    speed: 0.28,
    inertia: 0.08
  },

  // 4. 👁️ Watermark Opacity & Readability
  opacity: {
    baseDark: 0.026,
    baseLight: 0.032,
    peakGlowDark: 0.20,
    peakGlowLight: 0.12
  },

  // 5. 🎨 Color Palette (RGB channels as string 'R, G, B')
  colors: {
    darkMode: {
      core: '56, 189, 248',
      mid: '245, 158, 11',
      outer: '203, 213, 225',
      ambient: '148, 163, 184'
    },
    lightMode: {
      highlight: '3, 105, 161',
      ambient: '100, 116, 139'
    }
  },

  // 6. 📐 Grid & Typography Layout (Protected below sticky 70px header)
  typography: {
    fontSize: 12.5,
    lineHeight: 21,
    charWidth: 7.6,
    paddingX: 24,
    headerHeight: 70,
    startY: 92,
    fontFamily: '"JetBrains Mono", Consolas, Menlo, monospace'
  }
}

// ============================================================================
// 🏛️ VERIFIED NORTH CAROLINA REAL ESTATE & MLS REGISTRY LEDGER PER PAGE
// 100% authentic public broker & transaction records for Maryin E. Dos Ramos
// ============================================================================
const PAGE_LEDGERS: Record<string, string[]> = {
  home: [
    '// NORTH CAROLINA REAL ESTATE · VERIFIED BROKER LEDGER',
    'BROKER_NAME        = "Maryin Estefania Dos Ramos"',
    'PRIMARY_BROKERAGE  = "eXp Realty, LLC · Raleigh, NC"',
    'TEAM_AFFILIATION   = "The Vega Team / Michelle Vega Realty at eXp Realty"',
    'BUILDER_PARTNER    = "Top NC Builder Partner · New Construction Advocacy"',
    '',
    '// VERIFIED CAREER PRODUCTION METRICS (HOMES.COM / DOORIFY MLS / REALTOR.COM)',
    'CAREER_VOLUME_USD  = "$17,037,374+"',
    'CLOSED_SALES_COUNT = "53+ Verified North Carolina Transactions"',
    'BUYER_VOLUME_USD   = "$16,697,374 (51 Closed Buyer Representations · $327,399 Avg)"',
    'SELLER_VOLUME_USD  = "$340,000+ (Full-Service Listing Representation)"',
    'PRICE_BAND_RANGE   = "$63,000 – All Tiers Across 8 Research Triangle Counties"',
    'LANGUAGES_SPOKEN   = ["English", "Español (100% Bilingual Representation)"]',
    '',
    '// DIRECT CLIENT & SOCIAL CHANNELS',
    'DIRECT_MOBILE      = "(919) 771-7755" // tel:9197717755 · sms:9197717755',
    'WHATSAPP_DIRECT    = "https://wa.me/19197717755"',
    'CLIENT_EMAIL       = "maryinhomes@gmail.com"',
    'CORPORATE_EMAIL    = "maryin.dosramos@exprealty.com"',
    'INSTAGRAM_HANDLE   = "@maryin2ramos_realtor"',
    'LINKTREE_HUB       = "linktr.ee/maryin_realtor"',
    'FACEBOOK_PROFILE   = "facebook.com/maryinestefania.dosramos"',
    'REALTOR_PROFILE    = "realtor.com/realestateagents/5e3363f167400900139fce8a"',
    'HOMESPOTTER_APP    = "hms.pt/ufaf"'
  ],
  about: [
    '// EXECUTIVE PROFILE & ADVOCACY · MARYIN ESTEFANIA DOS RAMOS',
    'ENTITY             = "Maryin E. Dos Ramos · eXp Realty, LLC (Raleigh, NC)"',
    'COMMUNITY_REGION   = "Research Triangle & Central North Carolina"',
    'OFFICE_COORDINATES = "35.8992° N, 78.6569° W · Raleigh, NC"',
    '',
    '// CORE SPECIALIZATIONS',
    'SPECIALTY_01       = "New Construction Homes & Builder Rate Buydowns"',
    'SPECIALTY_02       = "First-Time Homebuyers & NC Down-Payment Assistance Grants"',
    'SPECIALTY_03       = "Bilingual English/Spanish Negotiation & Relocation Advisory"',
    'SPECIALTY_04       = "Data-Driven Comparative Market Analysis (CMA) & Digital Marketing"'
  ],
  markets: [
    '// NORTH CAROLINA RESEARCH TRIANGLE & PIEDMONT SERVICE CORRIDOR',
    'WAKE_COUNTY        = ["Raleigh", "Cary", "Apex", "Wake Forest", "Holly Springs", "Garner", "Rolesville", "Wendell", "Zebulon"]',
    'DURHAM_COUNTY      = ["Durham", "Research Triangle Park (RTP)", "Brier Creek"]',
    'JOHNSTON_COUNTY    = ["Clayton", "Smithfield", "Selma", "Flowers Plantation"]',
    'FRANKLIN_GRANVILLE = ["Louisburg", "Youngsville", "Creedmoor", "Oxford"]',
    'WEST_CORRIDOR      = ["Chapel Hill", "Pittsboro", "Burlington", "Mebane"]',
    '',
    '// BUILDER PARTNER ADVANTAGE & INCENTIVES',
    'BUILDER_BENEFITS   = "Builder rate buydowns, closing allowances, lot priority & independent walkthrough advocacy"',
    'FINANCING_PROGRAMS = "NC Home Advantage Mortgage · FHA / VA / Conventional / Down-Payment Grants"'
  ],
  contact: [
    '// DIRECT CLIENT ACQUISITION & OMNICHANNEL CONVERSION HUB',
    'VOICE_AND_SMS      = "(919) 771-7755"',
    'PRIMARY_INBOX      = "maryinhomes@gmail.com"',
    'EXP_REALTY_INBOX   = "maryin.dosramos@exprealty.com"',
    'BRANCH_OFFICE      = "5200 Greens Dairy Rd, Raleigh, NC 27616"',
    '',
    '// VERIFIED SYNDICATION & SOCIAL LINKS',
    'INSTAGRAM          = "https://www.instagram.com/maryin2ramos_realtor/"',
    'FACEBOOK           = "https://www.facebook.com/maryinestefania.dosramos"',
    'YOUTUBE            = "https://www.youtube.com/@stephaniedosramos3771"',
    'ZILLOW             = "https://www.zillow.com/profile/Maryin-Dos-Ramos"',
    'REALTOR_DOT_COM    = "https://www.realtor.com/realestateagents/maryin-e-dos-ramos_raleigh_nc_4381831_626829648"',
    'HOMES_DOT_COM      = "https://www.homes.com/realestateagent/maryin-dos-ramos/vdwc92g/"'
  ]
}

const activeLines = computed(() => {
  const name = (route.name as string) || 'home'
  return PAGE_LEDGERS[name] ?? PAGE_LEDGERS.home
})

let animationFrameId = 0
let targetX = -1000
let targetY = -1000
let currentX = -1000
let currentY = -1000
let velocityX = 0
let velocityY = 0
let trailX = -1000
let trailY = -1000
let trailVelX = 0
let trailVelY = 0
let pointerActive = false
let glowPresence = 0
let targetScrollY = 0
let smoothScrollY = 0

function isMobileOrTouch(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.innerWidth <= 820 ||
    window.matchMedia('(pointer: coarse)').matches ||
    ('ontouchstart' in window && window.innerWidth <= 1024)
  )
}

function handleMouseMove(e: MouseEvent) {
  if (isMobileOrTouch()) {
    pointerActive = false
    glowPresence = 0
    return
  }
  targetX = e.clientX
  targetY = e.clientY
  if (currentX < -500 && currentY < -500) {
    currentX = targetX
    currentY = targetY
    trailX = targetX
    trailY = targetY
  }
  pointerActive = true
}

function handleMouseLeave() {
  pointerActive = false
}

function handleScroll() {
  targetScrollY = window.scrollY || document.documentElement.scrollTop
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
}

function renderLoop() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  const isMobile = isMobileOrTouch()

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, width, height)

  // Clip strictly below sticky header (headerHeight: 70px)
  ctx.beginPath()
  ctx.rect(0, CONFIG.typography.headerHeight, width, height - CONFIG.typography.headerHeight)
  ctx.clip()

  // On mobile devices, cursor glow is completely disabled to avoid distraction
  if (isMobile) {
    pointerActive = false
    glowPresence = 0
  } else if (pointerActive) {
    glowPresence += (1 - glowPresence) * CONFIG.highlight.easeInSpeed
  } else {
    glowPresence += (0 - glowPresence) * CONFIG.highlight.easeOutSpeed
  }

  velocityX = (velocityX + (targetX - currentX) * CONFIG.physics.springTension) * CONFIG.physics.springDamping
  velocityY = (velocityY + (targetY - currentY) * CONFIG.physics.springTension) * CONFIG.physics.springDamping
  currentX += velocityX
  currentY += velocityY

  trailVelX = (trailVelX + (currentX - trailX) * CONFIG.physics.trailTension) * CONFIG.physics.trailDamping
  trailVelY = (trailVelY + (currentY - trailY) * CONFIG.physics.trailTension) * CONFIG.physics.trailDamping
  trailX += trailVelX
  trailY += trailVelY

  smoothScrollY += (targetScrollY - smoothScrollY) * CONFIG.parallax.inertia

  const activeIsLight = isLight.value
  const baseAlpha = activeIsLight ? CONFIG.opacity.baseLight : CONFIG.opacity.baseDark
  const peakGlow = activeIsLight ? CONFIG.opacity.peakGlowLight : CONFIG.opacity.peakGlowDark
  const ambientRgb = currentTheme.value.canvasColors?.ambient || (activeIsLight ? CONFIG.colors.lightMode.ambient : CONFIG.colors.darkMode.ambient)
  const highlightRgb = currentTheme.value.canvasColors?.highlight || (activeIsLight ? CONFIG.colors.lightMode.highlight : CONFIG.colors.darkMode.core)

  const activeFontSize = isMobile ? 10.5 : CONFIG.typography.fontSize
  const activeLineHeight = isMobile ? 18 : CONFIG.typography.lineHeight
  const activePaddingX = isMobile ? 14 : CONFIG.typography.paddingX

  ctx.font = `${activeFontSize}px ${CONFIG.typography.fontFamily}`
  ctx.textBaseline = 'top'

  const lines = activeLines.value
  const totalBlockHeight = lines.length * activeLineHeight + 80
  const parallaxOffset = (smoothScrollY * CONFIG.parallax.speed) % totalBlockHeight

  for (let repeat = 0; repeat < 2; repeat++) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line) continue

      const y = CONFIG.typography.startY + repeat * totalBlockHeight + i * activeLineHeight - parallaxOffset
      if (y < CONFIG.typography.headerHeight - 24 || y > height + 24) continue

      const x = activePaddingX
      const lineMidY = y + activeLineHeight * 0.5
      const dyPrimary = Math.abs(lineMidY - currentY)
      const dyTrail = Math.abs(lineMidY - trailY)

      if (isMobile || glowPresence < 0.01 || (dyPrimary > CONFIG.highlight.radius && dyTrail > CONFIG.highlight.radius)) {
        ctx.fillStyle = `rgba(${ambientRgb}, ${baseAlpha})`
        ctx.fillText(line, x, y)
        continue
      }

      // Compute soft radial distance illumination (desktop pointer only)
      const sampleX = Math.max(x, Math.min(currentX, x + line.length * CONFIG.typography.charWidth))
      const distPrimary = Math.hypot(sampleX - currentX, lineMidY - currentY)
      const distTrail = Math.hypot(sampleX - trailX, lineMidY - trailY)

      let intensity = 0
      if (distPrimary < CONFIG.highlight.radius) {
        intensity += Math.pow(1 - distPrimary / CONFIG.highlight.radius, CONFIG.highlight.falloffExponent)
      }
      if (distTrail < CONFIG.highlight.radius) {
        intensity +=
          Math.pow(1 - distTrail / CONFIG.highlight.radius, CONFIG.highlight.falloffExponent) *
          CONFIG.highlight.trailIntensity
      }

      intensity = Math.min(1, intensity) * glowPresence

      if (intensity > CONFIG.highlight.threshold) {
        const alpha = baseAlpha + intensity * peakGlow
        ctx.fillStyle = `rgba(${highlightRgb}, ${alpha.toFixed(3)})`
      } else {
        ctx.fillStyle = `rgba(${ambientRgb}, ${baseAlpha})`
      }

      ctx.fillText(line, x, y)
    }
  }

  ctx.restore()
  animationFrameId = window.requestAnimationFrame(renderLoop)
}

watch(
  () => route.name,
  () => {
    targetScrollY = window.scrollY || 0
  }
)

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('scroll', handleScroll, { passive: true })
  animationFrameId = window.requestAnimationFrame(renderLoop)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('scroll', handleScroll)
  window.cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <canvas ref="canvasRef" class="architectural-canvas" aria-hidden="true" />
</template>

<style scoped>
.architectural-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
</style>
