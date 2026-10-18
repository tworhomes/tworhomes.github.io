# 🎨 Theming System Guide — Maryin Real Estate Flagship

This guide explains how the theme system is structured, how CSS variables and canvas telemetry synchronize with theme objects, and how to create or modify themes with minimal effort.

---

## 📁 Key File Locations

| File | Purpose |
|---|---|
| [`src/data/types.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/data/types.ts#L79-L119) | TypeScript interfaces (`ThemeDefinition`, `ThemeColors`, `ThemeCanvasColors`). |
| [`src/data/themes.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/data/themes.ts) | Built-in theme definitions dictionary (`builtinThemes`), default IDs, and CSS variable mapping (`CSS_VAR_MAP`). |
| [`src/composables/useTheme.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/composables/useTheme.ts) | Reactive theme composable (`setTheme`, `toggleTheme`, `registerTheme`, `currentTheme`, `isLight`). Handles DOM injection, `<meta name="theme-color">`, localStorage persistence, and DevTools console helpers. |
| [`src/components/ArchitecturalCanvasBackground.vue`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/components/ArchitecturalCanvasBackground.vue#L248-L256) | Background canvas reading dynamic `canvasColors` (ambient watermark & highlight bloom) directly from the active theme. |
| [`src/components/NavBar.vue`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/components/NavBar.vue#L125-L200) | UI theme toggle button (1-click Light/Dark) and Theme Palette dropdown menu (`🎨`). |
| [`src/assets/main.css`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/assets/main.css) | Core CSS variables, typography, and card/button styles. |

---

## 🧱 The `ThemeDefinition` Object Anatomy

Every theme is a typed JavaScript/TypeScript object conforming to `ThemeDefinition`:

```ts
export interface ThemeDefinition {
  /** Unique kebab-case identifier (e.g. 'emerald-oaks') */
  id: string

  /** Display name shown in UI (supports bilingual string or BilingualText) */
  name: BilingualText | string

  /** Subtitle/rationale shown in theme picker */
  description?: BilingualText | string

  /** Color scheme mode for browser rendering & styling: 'dark' | 'light' */
  colorScheme: 'light' | 'dark'

  /** Hex color applied to mobile browser address bar (<meta name="theme-color">) */
  metaColor: string

  /** RGB channel triplets ('R, G, B') powering the animated background canvas */
  canvasColors: {
    ambient: string    // Ambient background watermark text color
    highlight: string  // Cursor interactive illumination bloom color
  }

  /** Complete set of CSS variable values */
  colors: {
    bgPrimary: string       // Maps to --bg-primary (body background)
    bgSecondary: string     // Maps to --bg-secondary (footer, secondary blocks)
    bgElevated: string      // Maps to --bg-elevated (cards, modals, inputs)
    bgGlass: string         // Maps to --bg-glass (floating bars, blurs)
    textPrimary: string     // Maps to --text-primary (headings, primary copy)
    textSecondary: string   // Maps to --text-secondary (subtitles, descriptions)
    textMuted: string       // Maps to --text-muted (captions, labels)
    borderSubtle: string    // Maps to --border-subtle (card & divider borders)
    borderHover: string     // Maps to --border-hover (active card hover borders)
    accentPrimary: string   // Maps to --accent-primary (primary buttons, links)
    accentSecondary: string // Maps to --accent-secondary (gradient stops)
    accentGold: string      // Maps to --accent-gold (badges, prestige accents)
    accentGoldGlow: string  // Maps to --accent-gold-glow (ambient gold glows)
    accentEmerald: string   // Maps to --accent-emerald (status dots, verified pills)
    accentGlow: string      // Maps to --accent-glow (button glows, focus rings)
    ambientGlow2: string    // Maps to --ambient-glow-2 (background ambient gradients)
    shadowCard: string      // Maps to --shadow-card (elevated card drop shadows)
    btnShadow: string       // Maps to --btn-shadow (CTA button glow drop shadow)
  }

  /** Optional dictionary for any additional CSS properties */
  customVariables?: Record<string, string>
}
```

---

## 🚀 How to Add a New Theme

Adding a new theme takes less than 2 minutes:

1. Open [`src/data/themes.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/data/themes.ts).
2. Add your new theme definition to the `builtinThemes` object:

```ts
export const builtinThemes: Record<string, ThemeDefinition> = {
  // ... existing themes ...

  'monaco-yacht': {
    id: 'monaco-yacht',
    name: {
      en: 'Monaco Yacht',
      es: 'Yate de Mónaco'
    },
    description: {
      en: 'Ultra-Luxury Deep Navy, Pure Platinum & Gold Accents',
      es: 'Azul Marino Ultra-Lujo, Platino Puro y Acentos de Oro'
    },
    colorScheme: 'dark',
    metaColor: '#060d1f',
    canvasColors: {
      ambient: '147, 197, 253',
      highlight: '59, 130, 246'
    },
    colors: {
      bgPrimary: '#060d1f',
      bgSecondary: '#0a1532',
      bgElevated: '#0f1f48',
      bgGlass: 'rgba(6, 13, 31, 0.94)',
      textPrimary: '#f8fafc',
      textSecondary: '#93c5fd',
      textMuted: '#60a5fa',
      borderSubtle: 'rgba(147, 197, 253, 0.14)',
      borderHover: 'rgba(59, 130, 246, 0.45)',
      accentPrimary: '#3b82f6',
      accentSecondary: '#60a5fa',
      accentGold: '#f59e0b',
      accentGoldGlow: 'rgba(245, 158, 11, 0.16)',
      accentEmerald: '#34d399',
      accentGlow: 'rgba(59, 130, 246, 0.16)',
      ambientGlow2: 'rgba(245, 158, 11, 0.06)',
      shadowCard: '0 12px 32px -12px rgba(2, 6, 23, 0.8)',
      btnShadow: '0 4px 18px -4px rgba(59, 130, 246, 0.45)'
    }
  }
}
```

That's it!
- It automatically appears in the navigation bar's **Theme Palette menu (`🎨`)**.
- It is available in the mobile drawer theme picker.
- It can be selected via `setTheme('monaco-yacht')`.
- You can test it immediately in your browser by visiting `http://localhost:5173/?theme=monaco-yacht`.

---

## 🛠️ How to Modify an Existing Theme

1. Locate the theme key in [`src/data/themes.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/data/themes.ts):
   - `'midnight-slate'` (Default Dark)
   - `'warm-stone'` (Default Light)
   - `'emerald-oaks'` (Dark Forest)
   - `'coastal-breeze'` (Light Coastal)
   - `'champagne-onyx'` (Dark Onyx & Gold)
2. Adjust any color in `colors` or `canvasColors`.
3. Save the file. Vite hot-module reload will update the styling instantly without reloading.

---

## 💻 Programmatic Usage & Composable API

You can import and control themes in any component or service:

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const {
  currentTheme,       // ComputedRef<ThemeDefinition> (current active theme object)
  currentThemeId,     // Ref<string> ('midnight-slate', 'warm-stone', etc.)
  isLight,            // ComputedRef<boolean> (true if colorScheme === 'light')
  availableThemes,    // ComputedRef<ThemeDefinition[]> (list of all registered themes)
  setTheme,           // (themeOrId: string | ThemeDefinition) => void
  toggleTheme         // () => void (toggles between default dark and light)
} = useTheme()

// Example: Switch theme
function pickTheme(id: string) {
  setTheme(id)
}

// Example: Apply a completely custom on-the-fly theme object
function applyTemporaryPromoTheme() {
  setTheme({
    id: 'promo-rose',
    name: 'Rose Gold Exclusive',
    colorScheme: 'dark',
    metaColor: '#120b0e',
    canvasColors: { ambient: '244, 114, 182', highlight: '251, 113, 133' },
    colors: {
      bgPrimary: '#120b0e',
      bgSecondary: '#1c1016',
      bgElevated: '#25161f',
      bgGlass: 'rgba(18, 11, 14, 0.95)',
      textPrimary: '#fff1f2',
      textSecondary: '#fda4af',
      textMuted: '#fb7185',
      borderSubtle: 'rgba(251, 113, 133, 0.15)',
      borderHover: 'rgba(244, 114, 182, 0.45)',
      accentPrimary: '#f43f5e',
      accentSecondary: '#fb7185',
      accentGold: '#fbbf24',
      accentGoldGlow: 'rgba(251, 191, 36, 0.15)',
      accentEmerald: '#34d399',
      accentGlow: 'rgba(244, 63, 94, 0.15)',
      ambientGlow2: 'rgba(251, 191, 36, 0.06)',
      shadowCard: '0 12px 32px -12px rgba(18, 11, 14, 0.8)',
      btnShadow: '0 4px 18px -4px rgba(244, 63, 94, 0.4)'
    }
  })
}
</script>
```

---

## 🔍 Testing & DevTools Shortcuts

### 1. URL Query Parameter
You can preview any theme directly by appending `?theme=<id>` to the URL:
- `http://localhost:5173/?theme=emerald-oaks`
- `http://localhost:5173/?theme=coastal-breeze`
- `http://localhost:5173/?theme=champagne-onyx`

### 2. Browser Console API
`window.__THEME__` is exposed in browser DevTools:
```js
// Check current theme
__THEME__.currentTheme

// Switch theme live
__THEME__.setTheme('emerald-oaks')

// Toggle light / dark
__THEME__.toggleTheme()

// View all available themes
__THEME__.availableThemes
```

---

## 🚩 Feature Flags & Controls

The theming UI buttons are controlled via `featureFlags` in [`src/data/featureFlags.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/data/featureFlags.ts):

| Flag | Default | Description |
|---|---|---|
| `themePalettePicker` | `false` | **Feature-flagged OFF by default.** Controls the Theme Palette dropdown button (`🎨`) in the navigation bar and mobile drawer. |
| `themeToggle` | `true` | Controls the quick 1-click Light/Dark mode toggle button (Sun/Moon). Set to `false` to hide all theme buttons completely. |

### How to Turn the Theming Button ON / OFF

1. **In Code:**
   In [`src/data/featureFlags.ts`](file:///c:/Users/adfle/Dev/WebDev/Mayins%20Site/src/data/featureFlags.ts):
   ```ts
   themePalettePicker: true // or false
   ```

2. **Via URL Parameter (Immediate testing without rebuilding):**
   - Enable palette menu: `http://localhost:5173/?themePicker=true`
   - Disable palette menu: `http://localhost:5173/?themePicker=false`

3. **Via Browser Console / Runtime:**
   ```ts
   import { toggleThemePalettePicker } from '@/data/featureFlags'
   toggleThemePalettePicker(true)
   ```

---

## 📐 Motion & Design Rules (Aaron Fleshner Standards)

When creating new themes, please preserve these key rules:
1. **Light Mode Backgrounds:** Never use harsh, sterile pure white (`#ffffff`) for page backgrounds. Use warm, soothing stone or paper (`#f6f5f1` or `#f4f8fb`) and reserve `#ffffff` for elevated cards.
2. **Dark Mode Backgrounds:** Use deep, refined slates or midnight obsidian (`#0b0f19`, `#05130d`, `#0d0d0f`) rather than washed-out grays.
3. **Contrast:** Ensure `textPrimary` and `textSecondary` maintain high readability on `bgPrimary` and `bgElevated`.
4. **Smooth Transitions:** The system automatically adds `.theme-transition` to `<html>` for 350ms during theme swaps to ensure silky-smooth color shifts without jarring flashes.

