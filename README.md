# Maryin Estefania Dos Ramos — eXp Realty North Carolina Flagship Website

A Vue 3 + TypeScript client-acquisition and personal brand website built for **Maryin Estefania Dos Ramos** (`NC Real Estate License #310847`), top-producing North Carolina Real Estate Broker with **eXp Realty, LLC** in Raleigh and the Research Triangle.

## Key Features
- **Verified Production & Authority Showcase:** Highlights `$17,037,374+` in closed NC sales volume, `53+` closed homes, **eXp Realty LLC** affiliation, **Doorify MLS** membership, and **True Homes CORE Broker** builder partner status.
- **Interactive 3-Path Client Funnel (`ClientFunnelWidget.vue`):**
  - *VIP Buyer & New Construction Perks*
  - *Custom Seller Home Valuation (CMA) Request*
  - *NC Relocation & Strategy Call*
  - Supports 1-click Email (`mailto:maryinhomes@gmail.com`), 1-click SMS (`sms:9197717755`), 1-click WhatsApp, and 1-click Summary Copy.
- **1-Click English / Español Toggle:** Instant site-wide bilingual switching persisted in `localStorage`.
- **Eye-Friendly Light & Dark Themes + Dreamy Nebula Canvas (`ArchitecturalCanvasBackground.vue`):** Follows Aaron Fleshner's motion and theme standards (`GEMINI.md`).
- **Omnichannel Social & Portal Directory (`SocialHubSection.vue`):** Direct links to Instagram (`@maryin2ramos_realtor`), Facebook, YouTube, Zillow, Realtor.com, Homes.com, phone `(919) 771-7755`, and emails.

## 🎨 Theming Architecture

The site uses a dynamic, strongly-typed **Theme Object system** that synchronizes CSS custom properties, `<meta name="theme-color">`, and animated canvas telemetry in real time:

- **Built-in Presets:** Midnight Slate (eXp dark flagship), Warm Stone (executive light paper), Emerald Oaks (Carolina pines dark), Coastal Breeze (light Carolina coast), Champagne Onyx (ultra-luxury dark).
- **Navigation Menu:** Visitors can toggle Light/Dark with 1 click or open the Palette dropdown (`🎨`) to switch palettes.
- **Developer Guide:** See [**`THEMING.md`**](./THEMING.md) for full instructions on adding new themes, modifying palettes, programmatic usage with `useTheme()`, and DevTools shortcuts (`window.__THEME__`).

## Development

```bash
npm install
npm run dev
npm run build
```
