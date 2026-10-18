<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    className?: string
  }>(),
  {
    size: 20,
    className: ''
  }
)

const normalizedSize = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})

const iconKey = computed(() => {
  const clean = props.name.toLowerCase().trim()
  if (clean.includes('insta')) return 'instagram'
  if (clean.includes('face')) return 'facebook'
  if (clean.includes('linkt')) return 'linktree'
  if (clean.includes('linke')) return 'linkedin'
  if (clean.includes('what')) return 'whatsapp'
  if (clean.includes('you') || clean.includes('yt')) return 'youtube'
  if (clean.includes('realt')) return 'realtor'
  if (clean === 'homes' || clean === 'homescom' || clean.includes('homes.com')) return 'homes'
  if (clean.includes('homespot') || clean.includes('spot') || clean.includes('mls')) return 'homespotter'
  if (clean.includes('zill')) return 'zillow'
  if (clean.includes('phone') || clean.includes('tel') || clean.includes('call')) return 'phone'
  if (clean.includes('mail') || clean.includes('inbox')) return 'email'
  if (clean.includes('sms') || clean.includes('text') || clean.includes('chat')) return 'sms'
  if (clean.includes('house') || clean.includes('buyer') || clean === 'home') return 'house'
  if (clean.includes('chart') || clean.includes('seller') || clean.includes('valua') || clean.includes('graph')) return 'chart'
  if (clean.includes('compass') || clean.includes('reloc') || clean.includes('nav')) return 'compass'
  if (clean.includes('copy') || clean.includes('clip')) return 'copy'
  if (clean.includes('check') || clean.includes('done')) return 'check'
  if (clean.includes('spark') || clean.includes('magic')) return 'sparkles'
  return 'default'
})
</script>

<template>
  <svg
    class="theme-social-icon"
    :class="[className, `icon-${iconKey}`]"
    :style="{ width: normalizedSize, height: normalizedSize }"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <!-- INSTAGRAM -->
    <g v-if="iconKey === 'instagram'">
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <circle
        cx="17.25"
        cy="6.75"
        r="1.25"
        fill="currentColor"
      />
    </g>

    <!-- FACEBOOK -->
    <g v-else-if="iconKey === 'facebook'">
      <path
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        fill="currentColor"
      />
    </g>

    <!-- LINKTREE -->
    <g v-else-if="iconKey === 'linktree'">
      <path
        d="m13.736 5.853 4.005-4.117 2.325 2.38-4.2 4.005h5.908v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.76v8.942H10.27v-8.942l-5.74 5.76-2.326-2.334 4.229-4.108H.504V8.121h5.909L2.213 4.116l2.325-2.38 4.005 4.117V0h3.193v5.853z"
        fill="currentColor"
      />
    </g>

    <!-- LINKEDIN -->
    <g v-else-if="iconKey === 'linkedin'">
      <path
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0-.02-3.26 1.63 1.63 0 0 0 .02 3.26M7.85 18.5V10.13H5.06v8.37h2.79z"
        fill="currentColor"
      />
    </g>

    <!-- WHATSAPP -->
    <g v-else-if="iconKey === 'whatsapp'">
      <path
        d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.204 8.204 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.01 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.06s.88 2.39 1 2.56c.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z"
        fill="currentColor"
      />
    </g>

    <!-- YOUTUBE -->
    <g v-else-if="iconKey === 'youtube'">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        fill="currentColor"
      />
    </g>

    <!-- REALTOR.COM (PORTAL RESIDENTIAL ROOF / KEY GLYPH) -->
    <g v-else-if="iconKey === 'realtor'">
      <path
        d="M12 2.5L2 10h3v10.5h14V10h3L12 2.5zm1 14.5h-2v-4h2v4zm3-2h-1v-4h1a1.5 1.5 0 0 0 0-3h-3v9h2v-2h1l1.5 2H19l-2-2.6a2.2 2.2 0 0 0 1-1.9 2 2 0 0 0-2-2.5z"
        fill="currentColor"
      />
    </g>

    <!-- HOMES.COM (PORTAL RESIDENTIAL ROOF WITH FOUNDATION DOT) -->
    <g v-else-if="iconKey === 'homes'">
      <path
        d="M12 2.5L2 10.5h3.2v10h13.6v-10H22L12 2.5zm4.8 16H7.2V11L12 7.15l4.8 3.85v7.5z"
        fill="currentColor"
      />
      <circle cx="12" cy="14" r="2" fill="currentColor" />
    </g>

    <!-- HOMESPOTTER / MLS RADAR SEARCH PIN -->
    <g v-else-if="iconKey === 'homespotter'">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="9"
        r="1.75"
        fill="none"
        stroke="var(--bg-elevated, #fff)"
        stroke-width="1.2"
      />
    </g>

    <!-- ZILLOW -->
    <g v-else-if="iconKey === 'zillow'">
      <path
        d="M12 2L2 9.5h3.2v11h13.6v-11H22L12 2zm3.8 14.2h-7.6v-1.6l4.4-4.8H8.5V8.2h7.3v1.5l-4.4 4.9h4.4v1.6z"
        fill="currentColor"
      />
    </g>

    <!-- PHONE / DIRECT CALL -->
    <g v-else-if="iconKey === 'phone'">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- EMAIL / CLIENT INBOX -->
    <g v-else-if="iconKey === 'email'">
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <path
        d="m3 6.5 9 6.5 9-6.5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- SMS / TEXT MESSAGE -->
    <g v-else-if="iconKey === 'sms'">
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="16" cy="10" r="1" fill="currentColor" />
    </g>

    <!-- HOUSE / RESIDENTIAL BUYER -->
    <g v-else-if="iconKey === 'house'">
      <path
        d="M3 10.25L12 3l9 7.25V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.75z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- CHART / SELLER VALUATION -->
    <g v-else-if="iconKey === 'chart'">
      <polyline
        points="22 7 13.5 15.5 8.5 10.5 2 17"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <polyline
        points="16 7 22 7 22 13"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- COMPASS / RELOCATION & NAVIGATION -->
    <g v-else-if="iconKey === 'compass'">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <polygon
        points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
        fill="currentColor"
      />
    </g>

    <!-- COPY / CLIPBOARD -->
    <g v-else-if="iconKey === 'copy'">
      <rect
        x="9"
        y="9"
        width="13"
        height="13"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- CHECK / SUCCESS CHECKMARK -->
    <g v-else-if="iconKey === 'check'">
      <polyline
        points="20 6 9 17 4 12"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- SPARKLES / PREMIER REAL ESTATE BRIEF -->
    <g v-else-if="iconKey === 'sparkles'">
      <path
        d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="19" cy="19" r="1.5" fill="currentColor" />
    </g>

    <!-- FALLBACK ARROW GLYPH -->
    <g v-else>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M10 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>
</template>

<style scoped>
.theme-social-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  transition: transform var(--transition-fast, 0.2s cubic-bezier(0.16, 1, 0.3, 1)),
              color var(--transition-fast, 0.2s cubic-bezier(0.16, 1, 0.3, 1));
}
</style>

