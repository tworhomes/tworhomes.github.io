# Maryin Estefania Dos Ramos — Real Estate Flagship & Standards Memory

This file records both our **Standout Real Estate Website Design Memory** and **Aaron Fleshner's Design, Motion & Engineering Standards** for this Vue 3 + TypeScript application.

---

## 1. Standout Real Estate Website Architecture ("Quiet Luxury + High-Intent Funnel")

1. **Immediate Authority & Trust Signals (First 5 Seconds):**
   - Showcase verified production metrics right above/below the fold: **$17.03M+ Total Career Volume**, **53+ Closed NC Homes**, **6+ Years NC Experience**, **NC License #310847**, **eXp Realty LLC**, and **New Construction & Buyer Specialist** designation.
   - Editorial typography (`Playfair Display` paired with `Inter` and `JetBrains Mono` badges) that feels like an executive real estate flagship rather than a cluttered portal.
2. **Segmented Client Conversion Funnels:**
   - **VIP Buyer & New Construction Funnel:** Captures target NC cities/counties (with open 'Other' option and open budget range), builder incentives, and NC down-payment assistance guidance.
   - **Custom Seller Home Valuation / CMA Funnel:** Replaces inaccurate automated estimates with a bespoke Comparative Market Analysis hand-prepared by Maryin.
   - **Zero-Friction Lead Delivery:** Every funnel supports 1-click SMS (`sms:9197717755`), 1-click Pre-Filled Email (`mailto:maryinhomes@gmail.com`), and 1-click Copy Brief so mobile and desktop visitors can connect instantaneously.
3. **1-Click Bilingual Experience (English / Español):**
   - Reactive site-wide language switcher (`EN` / `ES`) persisted in `localStorage`, empowering both English and Spanish-speaking families across the Research Triangle.
4. **Omnichannel Social & Direct Contact Hub:**
   - Prominent, interactive cards linking directly to Phone `(919) 771-7755`, Email `maryinhomes@gmail.com` / `maryin.dosramos@exprealty.com`, Instagram `@maryin2ramos_realtor`, Facebook, YouTube, Zillow, Realtor.com, and Homes.com.

---

## 2. Motion, Theme & Engineering Standards

- **Tech Stack:** Vue 3 (`<script setup lang="ts">`), TypeScript, Vue Router 4, Vite 6.
- **Dreamy, Fluid & Non-Punchy Motion:**
  - Silky easing curves: `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Buttons: Subtle hover lift (`translateY(-1.5px)`), gentle click press (`translateY(0.5px)`), zero scale distortion.
  - Clean Background: Clean, calm background across all devices (no cursor-following canvas effects), letting the typography, authentic imagery, and conversion funnels shine.
- **Eye-Friendly Light Mode & Rich Dark Mode:**
  - Light mode uses warm natural stone/paper canvases (`#f6f5f1` primary, `#edebe4` secondary), solid elevated cards (`#ffffff`), and deep warm charcoal typography (`#292524`).
  - Dark mode uses deep eXp midnight slate (`#0b0f19` primary, `#151e2e` elevated cards) with oceanic sky (`#38bdf8`) and warm champagne gold (`#f59e0b`) accents.
- **No Internal Jargon in Client-Facing Copy:** Never use internal marketing terminology such as "Funnel" anywhere in user-facing UI copy, subtitles, labels, or placeholders. Always use client-centric phrasing like "Consultation Planner", "Custom Real Estate Plan", or "Formulario de Consulta".
- **Git Safety:** Never run `git commit` or `git push` automatically.
