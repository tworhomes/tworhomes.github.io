export type Locale = 'en' | 'es'

export interface BilingualText {
  en: string
  es: string
}

export interface FeatureFlags {
  /** The 30-second Interactive Triangle Neighborhood Vibe Matcher quiz */
  neighborhoodVibeMatcher: boolean
  /** 3D card tilt perspective effect on desktop cards */
  cardTilt: boolean
  /** Specular reflection sheen effect across cards following the cursor */
  cardSheen: boolean
  /** Theme palette selector menu button in navigation bar */
  themePalettePicker: boolean
  /** Quick 1-click Light / Dark mode toggle button in navigation bar */
  themeToggle: boolean
  /** @deprecated Kept for backwards compatibility */
  luxuryCardTilt?: boolean
}

export interface SocialChannel {
  id: string
  platform: string
  handle: string
  url: string
  category: 'social' | 'portal' | 'direct'
  badge: BilingualText
  description: BilingualText
  hidden?: boolean
}

export interface ProductionStat {
  value: string
  label: BilingualText
  detail: BilingualText
}

export interface ClientCommitment {
  id: string
  number: string
  title: BilingualText
  summary: BilingualText
  details: BilingualText
  pill: BilingualText
}

export interface MarketArea {
  county: string
  cities: string[]
  highlight: BilingualText
  priceRange: string
}

export interface ServicePillar {
  id: string
  code: string
  title: BilingualText
  subtitle: BilingualText
  bullets: BilingualText[]
  badge: BilingualText
}

export interface VoiceOfImpact {
  badge: BilingualText
  quote: BilingualText
  outcome: BilingualText
}

export interface ImpactMilestone {
  metric: string
  unit: BilingualText
  highlight: BilingualText
  story: BilingualText
  tag: BilingualText
}

export interface QuickFact {
  label: BilingualText
  value: string
}

export interface ThemeCanvasColors {
  /** Ambient watermark text color in RGB channels ('R, G, B') */
  ambient: string
  /** Cursor interactive highlight color in RGB channels ('R, G, B') */
  highlight: string
}

export interface ThemeColors {
  bgPrimary: string
  bgSecondary: string
  bgElevated: string
  bgGlass: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  borderSubtle: string
  borderHover: string
  accentPrimary: string
  accentSecondary: string
  accentGold: string
  accentGoldGlow: string
  accentEmerald: string
  accentGlow: string
  ambientGlow2: string
  shadowCard: string
  btnShadow: string
}

export interface ThemeDefinition {
  id: string
  name: BilingualText | string
  description?: BilingualText | string
  colorScheme: 'light' | 'dark'
  metaColor: string
  canvasColors: ThemeCanvasColors
  colors: ThemeColors
  customVariables?: Record<string, string>
}

