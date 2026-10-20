# Maryin Estefania Dos Ramos — eXp Realty North Carolina Flagship Website

A Vue 3 + TypeScript client-acquisition and personal brand website built for **Maryin Estefania Dos Ramos** (`NC Real Estate License #310847`), top-producing North Carolina Real Estate Broker with **eXp Realty, LLC** in Raleigh and the Research Triangle.

## Key Features
- **Verified Production & Authority Showcase:** Highlights `$17,037,374+` in closed NC sales volume, `53+` closed homes, **eXp Realty LLC** affiliation, **Doorify MLS** membership, and **True Homes CORE Broker** builder partner status.
- **Interactive 3-Path Consultation Planner (`ClientFunnelWidget.vue`) & Direct Contact Form (`ContactForm.vue`):**
  - *VIP Buyer & New Construction Perks*
  - *Custom Seller Home Valuation (CMA) Request*
  - *NC Relocation & Strategy Call*
  - *Direct Client Note (Quick Form with Name, Email, Subject, Message)*
  - Background asynchronous message delivery via **Formspree** (with **Web3Forms** secondary fallback and `mailto:` tertiary fallback) without forcing visitors to open mail apps.
  - Multi-tier client-side anti-spam defenses (invisible honeypot field + velocity check).
  - Also supports 1-click SMS (`sms:9197717755`), 1-click WhatsApp, and 1-click Summary Copy.
- **1-Click English / Español Toggle:** Instant site-wide bilingual switching persisted in `localStorage`.
- **Eye-Friendly Light & Dark Themes + Dreamy Nebula Canvas (`ArchitecturalCanvasBackground.vue`):** Follows Aaron Fleshner's motion and theme standards (`GEMINI.md`).
- **Subtle Premium Animations (`featureFlags.premiumAnimations`):** Staggered hero entrance, breathing status aura pulse, primary button light sweep, and smooth scroll reveal system (`v-reveal`). Controlled by a dedicated feature flag and disabled automatically when `prefers-reduced-motion` is active.
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

---

## 📬 Asynchronous Contact Form & Lead Delivery

The contact form system (`src/services/contactFormService.ts`, `src/components/ContactForm.vue`, and `src/components/ClientFunnelWidget.vue`) sends client inquiries directly in the background without forcing visitors into an external email application (such as Apple Mail, Outlook, or Thunderbird).

### 1. Delivery Architecture & Resilient Fallback Chain

When a visitor submits a direct inquiry or custom consultation plan:

1. **Formspree (Primary API):** Submits JSON payload directly to the endpoint configured in `VITE_FORMSPREE_ENDPOINT`.
2. **Web3Forms (Secondary Fallback):** If Formspree fails or is unconfigured, the service transparently attempts submission to Web3Forms using `VITE_WEB3FORMS_KEY`.
3. **Native `mailto:` (Tertiary Fallback):** If both APIs fail or neither endpoint is configured, it falls back gracefully to opening a pre-filled `mailto:` link so no inquiries are ever lost.

### 2. Client-Side Anti-Spam Protections

To protect the inbox without requiring friction-heavy third-party captchas:

- **Honeypot Trap Field (`companyWebsite` / `_gotcha`):** An invisible, off-screen input element (`tabindex="-1"`, `aria-hidden="true"`, styled outside the visible viewport). Humans cannot see or tab into it, but automated bots auto-fill it. If populated, submission is silently acknowledged to the user as successful without calling the API.
- **Velocity Check (1.2s Minimum):** Measures the timestamp from when the component mounted to submission. Automated submission scripts typically submit within milliseconds (< 1.2s). If triggered too quickly, it drops the submission silently without calling external APIs.

### 3. Reactive UI States

- **Idle:** Form fields active, submit button enabled with clean icons.
- **Sending:** Form inputs disabled, submit button disabled, with animated SVG spinner and localized loading indicator.
- **Success Confirmation:** Elevated confirmation screen with checkmark badge, localized thank-you message, and buttons to either send another note or call directly.

### 4. Local Setup

Create a `.env.local` file in the root of the project (never committed to git):

```bash
# .env.local
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<YOUR_FORM_ID>
VITE_WEB3FORMS_KEY=your-optional-access-key
```

> **Security Note:** `.env`, `.env.*`, and `.env.local` are strictly ignored by `.gitignore`. Example format is documented in `.env.example`. Never commit live endpoint tokens or API keys to git.

### 5. Production Setup (GitHub Pages / GitHub Actions)

In your GitHub repository:
1. Navigate to **Settings** > **Secrets and variables** > **Actions**.
2. Under **Variables** (or **Secrets**), click **New repository variable** (or secret).
3. Add:
   - Name: `VITE_FORMSPREE_ENDPOINT`
   - Value: `https://formspree.io/f/<YOUR_FORM_ID>`
4. (Optional) Add:
   - Name: `VITE_WEB3FORMS_KEY`
   - Value: `<YOUR_WEB3FORMS_KEY>`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically injects these into Vite during `npm run build`:

```yaml
- name: Build
  env:
    VITE_FORMSPREE_ENDPOINT: ${{ vars.VITE_FORMSPREE_ENDPOINT || secrets.VITE_FORMSPREE_ENDPOINT }}
    VITE_WEB3FORMS_KEY: ${{ vars.VITE_WEB3FORMS_KEY || secrets.VITE_WEB3FORMS_KEY }}
  run: npm run build
```

### 6. Obtaining Form Endpoints

- **Formspree:** Register free at [formspree.io](https://formspree.io), create a new form, set target email (e.g. `maryinhomes@gmail.com`), and copy the unique endpoint URL `https://formspree.io/f/<form_id>`.
- **Web3Forms (Optional Fallback):** Request a free access key at [web3forms.com](https://web3forms.com) by entering the receiving email.

