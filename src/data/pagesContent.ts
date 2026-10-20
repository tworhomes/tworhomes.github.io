import type { QuickFact } from './types'

/**
 * ----------------------------------------------------------------------------
 * PAGE-SPECIFIC COPY, HEADERS, FOOTER & CONSULTATION PLANNER PRESETS
 * ----------------------------------------------------------------------------
 * Content for Home, About, Markets, Contact, Footer, and the Consultation Planner form.
 */

// 1. Homepage Hero Section
export const hero = {
  status: {
    en: 'Top-Producing NC Broker · Changing Lives at eXp Realty',
    es: 'Broker Líder en NC · Transformando Vidas con eXp Realty'
  },
  eyebrow: {
    en: 'GUIDING FAMILIES HOME ACROSS RALEIGH · DURHAM · CARY & THE TRIANGLE',
    es: 'GUIANDO FAMILIAS HACIA SU HOGAR EN RALEIGH · DURHAM · CARY Y EL TRIÁNGULO'
  },
  headline: {
    en: 'Your Trusted Partner for Homeownership & Wealth in North Carolina.',
    es: 'Tu Aliada de Confianza para el Hogar y tu Futuro en Carolina del Norte.'
  },
  subheadline: {
    en: 'Behind every closing is a family stepping into stability and a brighter future. As a top-producing eXp Realty Broker, Maryin Estefania Dos Ramos pairs fierce negotiation, builder incentive advantages, and heartfelt bilingual advocacy to guide you home.',
    es: 'Detrás de cada compra hay una familia construyendo estabilidad, patrimonio y un nuevo futuro. Como Broker destacada en eXp Realty, Maryin Estefania Dos Ramos combina negociación experta, incentivos con constructores y un acompañamiento humano inigualable.'
  },
  primaryCta: {
    en: 'Schedule a 1-on-1 Consultation',
    es: 'Agendar una Consulta 1-a-1'
  },
  secondaryCta: {
    en: 'Call or Text (919) 771-7755',
    es: 'Llamar o Enviar Texto (919) 771-7755'
  },
  portraitBadge: {
    en: 'Bilingual NC Broker · eXp Realty',
    es: 'Broker Bilingüe en NC · eXp Realty'
  },
  portraitRole: {
    en: 'Licensed NC Real Estate Broker · REALTOR®',
    es: 'Broker Inmobiliaria Licenciada en NC · REALTOR®'
  }
}

// 2. About Page Configuration
export const aboutPage = {
  eyebrow: {
    en: 'EXECUTIVE PROFILE & CURRENT POSITION AT EXP REALTY',
    es: 'PERFIL EJECUTIVO Y POSICIÓN ACTUAL EN EXP REALTY'
  },
  quickFacts: [
    {
      label: { en: 'Full Name', es: 'Nombre Completo' },
      value: 'Maryin Estefania Dos Ramos'
    },
    {
      label: { en: 'Track Record', es: 'Trayectoria' },
      value: '6+ Years NC Broker'
    },
    {
      label: { en: 'Specialization', es: 'Especialidad' },
      value: 'New Build & Buyer Advocacy'
    },
    {
      label: { en: 'Instagram Reach', es: 'Comunidad Instagram' },
      value: '52K+ Community'
    },
    {
      label: { en: 'Current Brokerage', es: 'Brokerage Actual' },
      value: 'eXp Realty, LLC'
    }
  ] as QuickFact[],
  callout: {
    title: {
      en: 'Current Position & Network Strength at eXp Realty, LLC',
      es: 'Posición Actual y Respaldo en eXp Realty, LLC'
    },
    body: {
      en: 'Operating out of eXp Realty’s Raleigh hub (5200 Greens Dairy Rd, Raleigh, NC 27616) and affiliated with The Vega Team / Michelle Vega Realty, Maryin combines cloud-first global syndication with hands-on local advocacy across 8 North Carolina counties.',
      es: 'Operando desde la sede de eXp Realty en Raleigh (5200 Greens Dairy Rd, Raleigh, NC 27616) y afiliada a The Vega Team / Michelle Vega Realty, Maryin combina tecnología inmobiliaria global con atención personalizada en 8 condados de Carolina del Norte.'
    },
    ctaBtn: {
      en: 'Book a 1-on-1 Consultation',
      es: 'Agendar Consulta 1-a-1'
    }
  }
}

// 3. Markets Page Configuration
export const marketsPage = {
  header: {
    eyebrow: {
      en: 'NORTH CAROLINA RESEARCH TRIANGLE & PIEDMONT COVERAGE',
      es: 'COBERTURA EN EL TRIÁNGULO Y CENTRO DE CAROLINA DEL NORTE'
    },
    title: {
      en: '8 Counties. 19+ Cities. Hyper-Local Market Command.',
      es: '8 Condados. 19+ Ciudades. Dominio Hiperlocal del Mercado.'
    },
    subtitle: {
      en: 'From booming tech corridors in Raleigh, Durham, and Cary to high-value new-construction communities in Clayton, Zebulon, Rolesville, Wendell, and Pittsboro—Maryin guides you to the strongest neighborhoods and builder incentives.',
      es: 'Desde los corredores tecnológicos de Raleigh, Durham y Cary hasta las comunidades de casas nuevas en Clayton, Zebulon, Rolesville, Wendell y Pittsboro—Maryin te guía hacia las mejores zonas e incentivos.'
    }
  },
  programsHeader: {
    eyebrow: {
      en: 'BUILDER INCENTIVES & CLIENT ADVOCACY',
      es: 'INCENTIVOS DE CONSTRUCTORES Y PROGRAMAS DE COMPRA'
    },
    title: {
      en: 'Specialized Programs Tailored to Your Transaction',
      es: 'Programas Especializados para Tu Compra o Venta'
    },
    cta: {
      en: 'Request Custom List & Perks →',
      es: 'Solicitar Lista e Incentivos →'
    }
  }
}

// 4. Contact Page Configuration
export const contactPage = {
  header: {
    eyebrow: {
      en: 'START YOUR NORTH CAROLINA REAL ESTATE JOURNEY',
      es: 'COMIENZA TU CAMINO INMOBILIARIO EN CAROLINA DEL NORTE'
    },
    title: {
      en: 'Work Directly With Maryin Estefania Dos Ramos',
      es: 'Trabaja Directamente con Maryin Estefania Dos Ramos'
    },
    subtitle: {
      en: 'Use the interactive consultation planner below to request your VIP buyer list, new-construction builder incentives, or a custom Comparative Market Analysis (CMA)—or reach out immediately by phone, text, email, or social media.',
      es: 'Usa el planificador interactivo de consulta a continuación para solicitar tu lista VIP de propiedades, incentivos de casas nuevas o una valoración de tu propiedad—o contáctala al instante por llamada, texto, correo o redes sociales.'
    }
  },
  officeStrip: {
    tag: {
      en: 'eXp Realty, LLC · Raleigh Flagship',
      es: 'eXp Realty, LLC · Sede de Raleigh'
    },
    mapsBtn: {
      en: 'Open in Google Maps ↗',
      es: 'Abrir en Google Maps ↗'
    }
  }
}

// 5. Footer & Bottom Navigation Configuration
export const footer = {
  role: {
    en: 'Licensed Real Estate Broker · REALTOR® · eXp Realty, LLC',
    es: 'Broker de Bienes Raíces Licenciada · REALTOR® · eXp Realty, LLC'
  },
  headings: {
    directContact: { en: 'Direct Contact', es: 'Contacto Directo' },
    socialAndPortals: { en: 'Social & Portals', es: 'Redes y Portales' }
  },
  legalNote: {
    en: 'Equal Housing Opportunity. All production stats verified via Doorify MLS, Homes.com & Realtor.com.',
    es: 'Igualdad de Oportunidades en la Vivienda. Estadísticas verificadas en Doorify MLS, Homes.com y Realtor.com.'
  },
  bottomLinks: [
    { to: '/about', label: { en: 'Track Record', es: 'Trayectoria' } },
    { to: '/markets', label: { en: 'NC Markets', es: 'Mercados NC' } },
    { to: '/quiz', label: { en: 'Match Quiz', es: 'Quiz de Zonas' } },
    { to: '/contact', label: { en: 'Schedule Call', es: 'Agendar Llamada' } }
  ]
}

// 6. Consultation Planner Presets & Goal Configuration
export const funnelConfig = {
  eyebrow: {
    en: 'START YOUR JOURNEY',
    es: 'COMIENZA TU PLAN'
  },
  title: {
    en: 'Choose Your North Carolina Real Estate Goal',
    es: 'Selecciona Tu Meta Inmobiliaria en Carolina del Norte'
  },
  tabs: {
    buyer: {
      label: { en: 'Buy / New Construction', es: 'Comprar / Casa Nueva' },
      icon: 'house',
      calloutTag: { en: 'Dedicated Buyer Representation', es: 'Representación Dedicada al Comprador' },
      calloutText: {
        en: 'Explore available MLS listings, first-time homebuyer assistance options, and new construction across North Carolina with full independent advocacy.',
        es: 'Explora casas en el MLS, programas de ayuda para el enganche y casas nuevas en Carolina del Norte con asesoría profesional independiente.'
      }
    },
    seller: {
      label: { en: 'Free Home Valuation (CMA)', es: 'Valorar y Vender Mi Casa' },
      icon: 'chart',
      calloutTag: { en: 'eXp Realty Cloud Marketing', es: 'Marketing Digital eXp Realty' },
      calloutText: {
        en: 'Skip inaccurate automated estimates. Request a custom Comparative Market Analysis (CMA) hand-prepared by Maryin for your North Carolina home.',
        es: 'Evita estimaciones automáticas inexactas. Solicita un Análisis Comparativo de Mercado (CMA) hecho a medida por Maryin para vender al máximo valor.'
      }
    },
    relocation: {
      label: { en: 'Relocate / Strategy Call', es: 'Mudanza a NC / Consulta' },
      icon: 'compass',
      calloutTag: { en: '100% Bilingual · EN / ES', es: '100% Bilingüe · ES / EN' },
      calloutText: {
        en: 'Relocating to Raleigh, Durham, Cary, Clayton, or surrounding counties? Book a personalized 1-on-1 strategy session with Maryin.',
        es: '¿Te mudas a Raleigh, Durham, Cary, Clayton o alrededores? Agenda una sesión estratégica personalizada 1-a-1 con Maryin en Español o Inglés.'
      }
    }
  },
  targetAreas: [
    'Raleigh / Wake County',
    'Durham / RTP Corridor',
    'Cary / Apex / Holly Springs',
    'Clayton / Johnston County',
    'Zebulon / Wendell / Rolesville',
    'Chapel Hill / Orange & Chatham Counties',
    'Franklin / Granville / Alamance Counties',
    'Other North Carolina Area / Open to Locations'
  ],
  budgetRanges: [
    'Under $250,000',
    '$250,000 – $350,000',
    '$350,000 – $500,000',
    '$500,000 – $750,000',
    '$750,000 – $1,000,000',
    '$1,000,000 – $1,500,000',
    '$1,500,000 – $2,500,000',
    '$2,500,000+'
  ],
  buyerTimelines: [
    'Immediately (Within 30 Days)',
    'Within 1–3 Months',
    'Within 3–6 Months',
    'Just Researching & Planning'
  ],
  buyerPrograms: [
    'First-Time Homebuyer Guidance & NC Assistance Programs',
    'New Construction Walkthrough & Independent Representation',
    'Move-Up Resale Home in Desirable Neighborhood',
    'Competitive Offer Strategy & Negotiation',
    'Investment Property & Equity Building',
    'General Home Buying & Relocation Guidance'
  ],
  propertySpecs: [
    '3–4 Beds · Single-Family Home',
    '4–5+ Beds · Executive Residence',
    '2–3 Beds · Townhome / Condo',
    'Acreage / Land Parcel'
  ],
  sellerTimelines: [
    'Ready in 30–60 Days',
    'Selling & Buying Simultaneously',
    'Within 3–6 Months',
    'Curious About Current Equity Value'
  ],
  relocationGoals: [
    'Buying a Home in the Research Triangle',
    'New Construction Tour & Builder Comparison',
    'Selling & Relocating Simultaneously',
    'First-Time Buyer Strategy Consultation'
  ]
}

