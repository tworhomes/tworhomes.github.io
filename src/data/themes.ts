import type { ThemeDefinition, ThemeColors } from './types'

export const CSS_VAR_MAP: Record<keyof ThemeColors, string> = {
  bgPrimary: '--bg-primary',
  bgSecondary: '--bg-secondary',
  bgElevated: '--bg-elevated',
  bgGlass: '--bg-glass',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textMuted: '--text-muted',
  borderSubtle: '--border-subtle',
  borderHover: '--border-hover',
  accentPrimary: '--accent-primary',
  accentSecondary: '--accent-secondary',
  accentGold: '--accent-gold',
  accentGoldGlow: '--accent-gold-glow',
  accentEmerald: '--accent-emerald',
  accentGlow: '--accent-glow',
  ambientGlow2: '--ambient-glow-2',
  shadowCard: '--shadow-card',
  btnShadow: '--btn-shadow'
}

export const DEFAULT_DARK_THEME_ID = 'midnight-slate'
export const DEFAULT_LIGHT_THEME_ID = 'warm-stone'

export const builtinThemes: Record<string, ThemeDefinition> = {
  'warm-stone': {
    id: 'warm-stone',
    name: {
      en: 'Limestone Monograph',
      es: 'Monografía Caliza'
    },
    description: {
      en: 'Beverly Hills Alabaster, Travertine Stone, Espresso Ink & Brushed Brass',
      es: 'Alabastro Cálido, Travertino, Tinta Espresso y Latón Cepillado'
    },
    colorScheme: 'light',
    metaColor: '#F6F4EF',
    canvasColors: {
      ambient: '110, 106, 95',
      highlight: '184, 151, 104'
    },
    colors: {
      bgPrimary: '#F6F4EF',
      bgSecondary: '#EAE6DF',
      bgElevated: '#FDFCF9',
      bgGlass: 'rgba(246, 244, 239, 0.94)',
      textPrimary: '#141311',
      textSecondary: '#4A463F',
      textMuted: '#787267',
      borderSubtle: 'rgba(20, 19, 17, 0.12)',
      borderHover: 'rgba(154, 123, 79, 0.55)',
      accentPrimary: '#8C6D3F',
      accentSecondary: '#141311',
      accentGold: '#9A7B4F',
      accentGoldGlow: 'rgba(184, 151, 104, 0.14)',
      accentEmerald: '#2E5A44',
      accentGlow: 'rgba(184, 151, 104, 0.10)',
      ambientGlow2: 'rgba(20, 19, 17, 0.03)',
      shadowCard: '0 10px 30px -10px rgba(20, 19, 17, 0.07)',
      btnShadow: '0 8px 22px -6px rgba(20, 19, 17, 0.18)'
    }
  },

  'midnight-slate': {
    id: 'midnight-slate',
    name: {
      en: 'Espresso Atelier',
      es: 'Atelier Espresso'
    },
    description: {
      en: 'Deep Espresso Ink, Architectural Charcoal & Brushed Champagne Brass',
      es: 'Tinta Espresso Profunda, Carbón Arquitectónico y Latón Champaña'
    },
    colorScheme: 'dark',
    metaColor: '#141311',
    canvasColors: {
      ambient: '163, 158, 147',
      highlight: '184, 151, 104'
    },
    colors: {
      bgPrimary: '#141311',
      bgSecondary: '#1C1A17',
      bgElevated: '#221F1B',
      bgGlass: 'rgba(20, 19, 17, 0.94)',
      textPrimary: '#F6F4EF',
      textSecondary: '#C2BDB2',
      textMuted: '#8A8478',
      borderSubtle: 'rgba(246, 244, 239, 0.13)',
      borderHover: 'rgba(184, 151, 104, 0.55)',
      accentPrimary: '#B89768',
      accentSecondary: '#D4B689',
      accentGold: '#C5A059',
      accentGoldGlow: 'rgba(184, 151, 104, 0.16)',
      accentEmerald: '#529471',
      accentGlow: 'rgba(184, 151, 104, 0.12)',
      ambientGlow2: 'rgba(184, 151, 104, 0.05)',
      shadowCard: '0 16px 40px -12px rgba(0, 0, 0, 0.65)',
      btnShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.5)'
    }
  },

  'emerald-oaks': {
    id: 'emerald-oaks',
    name: {
      en: 'Carolina Estate Pine',
      es: 'Pino de Carolina'
    },
    description: {
      en: 'Deep Carolina Pine, Botanical Slate & Antique Brass',
      es: 'Pino Profundo de Carolina, Pizarra Botánica y Latón Antiguo'
    },
    colorScheme: 'dark',
    metaColor: '#0D1713',
    canvasColors: {
      ambient: '163, 177, 168',
      highlight: '184, 151, 104'
    },
    colors: {
      bgPrimary: '#0D1713',
      bgSecondary: '#13211B',
      bgElevated: '#182922',
      bgGlass: 'rgba(13, 23, 19, 0.94)',
      textPrimary: '#F4F3EE',
      textSecondary: '#B8C4BC',
      textMuted: '#7E8F85',
      borderSubtle: 'rgba(244, 243, 238, 0.13)',
      borderHover: 'rgba(184, 151, 104, 0.5)',
      accentPrimary: '#B89768',
      accentSecondary: '#D4B689',
      accentGold: '#C5A059',
      accentGoldGlow: 'rgba(197, 160, 89, 0.16)',
      accentEmerald: '#529471',
      accentGlow: 'rgba(184, 151, 104, 0.12)',
      ambientGlow2: 'rgba(82, 148, 113, 0.08)',
      shadowCard: '0 16px 40px -12px rgba(4, 10, 8, 0.75)',
      btnShadow: '0 8px 24px -6px rgba(4, 10, 8, 0.55)'
    }
  },

  'coastal-breeze': {
    id: 'coastal-breeze',
    name: {
      en: 'Sotheby’s Parchment',
      es: 'Pergamino Clásico'
    },
    description: {
      en: 'Crisp Gallery Parchment, Heritage Navy & Antique Gold',
      es: 'Pergamino de Galería, Azul Marino Patrimonial y Oro Antiguo'
    },
    colorScheme: 'light',
    metaColor: '#F9F8F6',
    canvasColors: {
      ambient: '90, 98, 112',
      highlight: '11, 22, 38'
    },
    colors: {
      bgPrimary: '#F9F8F6',
      bgSecondary: '#F0EDE6',
      bgElevated: '#FFFFFF',
      bgGlass: 'rgba(249, 248, 246, 0.94)',
      textPrimary: '#0B1626',
      textSecondary: '#3E4856',
      textMuted: '#6C7583',
      borderSubtle: 'rgba(11, 22, 38, 0.12)',
      borderHover: 'rgba(197, 160, 89, 0.55)',
      accentPrimary: '#0B1626',
      accentSecondary: '#1C2D42',
      accentGold: '#9A7B4F',
      accentGoldGlow: 'rgba(197, 160, 89, 0.14)',
      accentEmerald: '#1F563E',
      accentGlow: 'rgba(11, 22, 38, 0.06)',
      ambientGlow2: 'rgba(197, 160, 89, 0.05)',
      shadowCard: '0 10px 30px -10px rgba(11, 22, 38, 0.06)',
      btnShadow: '0 8px 20px -6px rgba(11, 22, 38, 0.2)'
    }
  },

  'champagne-onyx': {
    id: 'champagne-onyx',
    name: {
      en: 'Obsidian & Merlot',
      es: 'Obsidiana y Merlot'
    },
    description: {
      en: 'Gallery Obsidian, Estate Wine & Warm Champagne Gold',
      es: 'Obsidiana de Galería, Vino Reserva y Oro Champaña'
    },
    colorScheme: 'dark',
    metaColor: '#0F0D0D',
    canvasColors: {
      ambient: '168, 152, 148',
      highlight: '212, 175, 55'
    },
    colors: {
      bgPrimary: '#0F0D0D',
      bgSecondary: '#1A1415',
      bgElevated: '#241B1D',
      bgGlass: 'rgba(15, 13, 13, 0.94)',
      textPrimary: '#F7F5F0',
      textSecondary: '#C9BFC1',
      textMuted: '#8F8285',
      borderSubtle: 'rgba(247, 245, 240, 0.13)',
      borderHover: 'rgba(212, 175, 55, 0.5)',
      accentPrimary: '#C5A059',
      accentSecondary: '#D4AF37',
      accentGold: '#D4AF37',
      accentGoldGlow: 'rgba(212, 175, 55, 0.16)',
      accentEmerald: '#529471',
      accentGlow: 'rgba(212, 175, 55, 0.12)',
      ambientGlow2: 'rgba(61, 22, 30, 0.2)',
      shadowCard: '0 16px 40px -12px rgba(0, 0, 0, 0.8)',
      btnShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.6)'
    }
  }
}

