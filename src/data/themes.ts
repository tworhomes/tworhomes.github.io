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
  'midnight-slate': {
    id: 'midnight-slate',
    name: {
      en: 'Midnight Slate',
      es: 'Pizarra Medianoche'
    },
    description: {
      en: 'Executive eXp Slate, Oceanic Sky & Champagne Gold',
      es: 'Pizarra Ejecutiva eXp, Cielo Oceánico y Oro Champaña'
    },
    colorScheme: 'dark',
    metaColor: '#0b0f19',
    canvasColors: {
      ambient: '148, 163, 184',
      highlight: '56, 189, 248'
    },
    colors: {
      bgPrimary: '#0b0f19',
      bgSecondary: '#111827',
      bgElevated: '#151e2e',
      bgGlass: 'rgba(15, 23, 42, 0.95)',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
      borderSubtle: 'rgba(148, 163, 184, 0.14)',
      borderHover: 'rgba(56, 189, 248, 0.45)',
      accentPrimary: '#38bdf8',
      accentSecondary: '#818cf8',
      accentGold: '#f59e0b',
      accentGoldGlow: 'rgba(245, 158, 11, 0.14)',
      accentEmerald: '#34d399',
      accentGlow: 'rgba(56, 189, 248, 0.14)',
      ambientGlow2: 'rgba(245, 158, 11, 0.06)',
      shadowCard: '0 12px 32px -12px rgba(2, 6, 23, 0.7)',
      btnShadow: '0 4px 18px -4px rgba(56, 189, 248, 0.45)'
    }
  },

  'warm-stone': {
    id: 'warm-stone',
    name: {
      en: 'Warm Stone',
      es: 'Piedra Cálida'
    },
    description: {
      en: 'Soothing Paper Canvas, Charcoal & Oceanic Sapphire',
      es: 'Lienzo Cálido de Papel, Carbón y Zafiro Oceánico'
    },
    colorScheme: 'light',
    metaColor: '#f6f5f1',
    canvasColors: {
      ambient: '100, 116, 139',
      highlight: '3, 105, 161'
    },
    colors: {
      bgPrimary: '#f6f5f1',
      bgSecondary: '#edebe4',
      bgElevated: '#ffffff',
      bgGlass: 'rgba(246, 245, 241, 0.92)',
      textPrimary: '#292524',
      textSecondary: '#57534e',
      textMuted: '#78716c',
      borderSubtle: 'rgba(41, 37, 36, 0.09)',
      borderHover: 'rgba(3, 105, 161, 0.35)',
      accentPrimary: '#0369a1',
      accentSecondary: '#1e40af',
      accentGold: '#b45309',
      accentGoldGlow: 'rgba(180, 83, 9, 0.09)',
      accentEmerald: '#047857',
      accentGlow: 'rgba(3, 105, 161, 0.08)',
      ambientGlow2: 'rgba(180, 83, 9, 0.05)',
      shadowCard: '0 4px 20px -2px rgba(41, 37, 36, 0.06), 0 2px 6px -1px rgba(41, 37, 36, 0.04)',
      btnShadow: '0 4px 14px -4px rgba(3, 105, 161, 0.28)'
    }
  },

  'emerald-oaks': {
    id: 'emerald-oaks',
    name: {
      en: 'Emerald Oaks',
      es: 'Robles Esmeralda'
    },
    description: {
      en: 'Deep Carolina Pines, Forest Emerald & Warm Amber',
      es: 'Pinos de Carolina, Esmeralda Bosque y Ámbar Cálido'
    },
    colorScheme: 'dark',
    metaColor: '#05130d',
    canvasColors: {
      ambient: '74, 222, 128',
      highlight: '16, 185, 129'
    },
    colors: {
      bgPrimary: '#05130d',
      bgSecondary: '#0b1d16',
      bgElevated: '#10281e',
      bgGlass: 'rgba(8, 26, 18, 0.94)',
      textPrimary: '#f0fdf4',
      textSecondary: '#a7f3d0',
      textMuted: '#6ee7b7',
      borderSubtle: 'rgba(74, 222, 128, 0.15)',
      borderHover: 'rgba(52, 211, 153, 0.45)',
      accentPrimary: '#10b981',
      accentSecondary: '#059669',
      accentGold: '#d97706',
      accentGoldGlow: 'rgba(217, 119, 6, 0.16)',
      accentEmerald: '#10b981',
      accentGlow: 'rgba(16, 185, 129, 0.16)',
      ambientGlow2: 'rgba(217, 119, 6, 0.08)',
      shadowCard: '0 12px 32px -12px rgba(2, 20, 10, 0.75)',
      btnShadow: '0 4px 18px -4px rgba(16, 185, 129, 0.45)'
    }
  },

  'coastal-breeze': {
    id: 'coastal-breeze',
    name: {
      en: 'Coastal Breeze',
      es: 'Brisa Costera'
    },
    description: {
      en: 'Carolina Sea-Salt, Crisp Slate & Nautical Blue',
      es: 'Sal Marina de Carolina, Pizarra Nítida y Azul Náutico'
    },
    colorScheme: 'light',
    metaColor: '#f4f8fb',
    canvasColors: {
      ambient: '100, 116, 139',
      highlight: '2, 132, 199'
    },
    colors: {
      bgPrimary: '#f4f8fb',
      bgSecondary: '#e8f1f7',
      bgElevated: '#ffffff',
      bgGlass: 'rgba(244, 248, 251, 0.94)',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      borderSubtle: 'rgba(15, 23, 42, 0.08)',
      borderHover: 'rgba(2, 132, 199, 0.4)',
      accentPrimary: '#0284c7',
      accentSecondary: '#2563eb',
      accentGold: '#d97706',
      accentGoldGlow: 'rgba(217, 119, 6, 0.1)',
      accentEmerald: '#059669',
      accentGlow: 'rgba(2, 132, 199, 0.09)',
      ambientGlow2: 'rgba(217, 119, 6, 0.05)',
      shadowCard: '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
      btnShadow: '0 4px 14px -4px rgba(2, 132, 199, 0.32)'
    }
  },

  'champagne-onyx': {
    id: 'champagne-onyx',
    name: {
      en: 'Champagne Onyx',
      es: 'Ónice y Champaña'
    },
    description: {
      en: 'High-Contrast Jet Onyx, Warm Gold & Radiant Glow',
      es: 'Ónice Azabache de Alto Contraste, Oro Cálido y Brillo Radiante'
    },
    colorScheme: 'dark',
    metaColor: '#0d0d0f',
    canvasColors: {
      ambient: '161, 161, 170',
      highlight: '234, 179, 8'
    },
    colors: {
      bgPrimary: '#0d0d0f',
      bgSecondary: '#151419',
      bgElevated: '#1a1921',
      bgGlass: 'rgba(17, 16, 22, 0.95)',
      textPrimary: '#fefcf8',
      textSecondary: '#d4cebe',
      textMuted: '#968f7f',
      borderSubtle: 'rgba(234, 179, 8, 0.14)',
      borderHover: 'rgba(234, 179, 8, 0.45)',
      accentPrimary: '#eab308',
      accentSecondary: '#f59e0b',
      accentGold: '#facc15',
      accentGoldGlow: 'rgba(250, 204, 21, 0.18)',
      accentEmerald: '#34d399',
      accentGlow: 'rgba(234, 179, 8, 0.15)',
      ambientGlow2: 'rgba(234, 179, 8, 0.08)',
      shadowCard: '0 12px 32px -12px rgba(0, 0, 0, 0.8)',
      btnShadow: '0 4px 18px -4px rgba(234, 179, 8, 0.4)'
    }
  }
}

