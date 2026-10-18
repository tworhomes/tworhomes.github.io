/**
 * ============================================================================
 * MARYIN ESTEFANIA DOS RAMOS — REAL ESTATE FLAGSHIP CENTRAL REGISTRY
 * ============================================================================
 * This file serves as the main entry point and aggregator for all real estate
 * telemetry, page copy, and configurations across the website.
 *
 * All data has been modularized into domain-specific files for effortless discovery:
 *  - types.ts            -> TypeScript definitions and interfaces
 *  - i18n.ts             -> Language state (EN / ES) and translation helper `t()`
 *  - featureFlags.ts     -> Interactive flags (quiz, card tilt, sheen)
 *  - coreAgent.ts        -> Identity, license, office, phone, email & contact channels
 *  - statsAndBio.ts      -> Production metrics ($17M+, 53+ homes), bio & service pillars
 *  - storiesAndImpact.ts -> 53+ doors banner, milestones & closing table stories marquee
 *  - marketAreas.ts      -> 8 NC counties, communities & builder incentive details
 *  - socialChannels.ts   -> Instagram (52K+), Facebook, Realtor.com, Homes.com & hub
 *  - pagesContent.ts     -> Hero copy, About, Markets, Contact, Footer & consultation planner
 */

import { featureFlags, toggleNeighborhoodVibeMatcher, toggleCardTilt, toggleCardSheen } from './featureFlags'
import { currentLocale, setLocale, toggleLocale, t } from './i18n'
import { coreAgent } from './coreAgent'
import { stats, bio, servicePillarsHeader, servicePillars, commitmentsHeader, clientCommitments } from './statsAndBio'
import { lifeImpact } from './storiesAndImpact'
import { marketAreas } from './marketAreas'
import { socialChannels, socialHub } from './socialChannels'
import { hero, aboutPage, marketsPage, contactPage, footer, funnelConfig } from './pagesContent'

// Aggregated Profile Object (100% backwards compatible with all views & components)
export const realtorProfile = {
  featureFlags,
  ...coreAgent,
  hero,
  stats,
  lifeImpact,
  bio,
  servicePillarsHeader,
  servicePillars,
  commitmentsHeader,
  clientCommitments,
  marketAreas,
  socialChannels,
  socialHub,
  aboutPage,
  marketsPage,
  contactPage,
  footer,
  funnelConfig
}

export type RealtorProfile = typeof realtorProfile

// Re-export i18n utilities
export { currentLocale, setLocale, toggleLocale, t }
export type { Locale, BilingualText } from './types'

// Re-export feature flags and utilities
export { featureFlags, toggleNeighborhoodVibeMatcher, toggleCardTilt, toggleCardSheen }
export type { FeatureFlags } from './types'

// Re-export modular domain data for direct imports if preferred
export * from './coreAgent'
export * from './statsAndBio'
export * from './storiesAndImpact'
export * from './marketAreas'
export * from './socialChannels'
export * from './pagesContent'
export * from './types'
