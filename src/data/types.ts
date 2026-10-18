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

