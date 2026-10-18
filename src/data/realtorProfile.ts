import { ref } from 'vue'

export type Locale = 'en' | 'es'

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('maryin-locale')
    if (saved === 'es' || saved === 'en') {
      return saved
    }

    // Inspect user device / browser languages (e.g. 'es', 'es-US', 'es-419', 'es-MX', etc.)
    const preferredLangs = navigator.languages || [navigator.language || '']
    for (const l of preferredLangs) {
      if (l && l.toLowerCase().startsWith('es')) {
        return 'es'
      }
    }
  } catch {
    // Storage or navigator access error fallback
  }
  return 'en'
}

export const currentLocale = ref<Locale>(detectInitialLocale())

if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('lang', currentLocale.value)
}

export function setLocale(locale: Locale) {
  currentLocale.value = locale
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('maryin-locale', locale)
    } catch {}
    document.documentElement.setAttribute('lang', locale)
  }
}

export function toggleLocale() {
  setLocale(currentLocale.value === 'en' ? 'es' : 'en')
}

export interface BilingualText {
  en: string
  es: string
}

export function t(text: BilingualText): string {
  return text[currentLocale.value]
}

export interface SocialChannel {
  id: string
  platform: string
  handle: string
  url: string
  category: 'social' | 'portal' | 'direct'
  badge: BilingualText
  description: BilingualText
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

/**
 * ============================================================================
 * MARYIN ESTEFANIA DOS RAMOS — CENTRAL REAL ESTATE FLAGSHIP CONFIGURATION
 * ============================================================================
 * This single file controls all content, contact information, social links,
 * marquee scroll parameters, copy, and page options across the entire website.
 *
 * To change any content, simply update the appropriate section below.
 * Everything is automatically bilingual (English & Español).
 */
export const realtorProfile = {
  // --------------------------------------------------------------------------
  // 1. CORE AGENT & BROKERAGE TELEMETRY
  // --------------------------------------------------------------------------
  fullName: 'Maryin Estefania Dos Ramos',
  displayName: 'Maryin Dos Ramos',
  shortName: 'Maryin E. Dos Ramos',
  initials: 'MDR',
  licenseNumber: 'NC License #310847',
  mlsAffiliation: 'Doorify MLS (Research Triangle, NC)',
  brokerage: 'eXp Realty, LLC',
  teamAffiliation: 'The Vega Team / Michelle Vega Realty at eXp Realty',
  specialDesignation: 'New Construction & Buyer Specialist',
  officeAddress: '9121 Anson Way, Suite 200, Raleigh, NC 27615',
  officeMapsUrl: 'https://maps.google.com/?q=9121+Anson+Way+Suite+200+Raleigh+NC+27615',

  // --------------------------------------------------------------------------
  // 2. DIRECT CLIENT CONTACT CHANNELS
  // --------------------------------------------------------------------------
  phoneDisplay: '(919) 771-7755',
  phoneRaw: '9197717755',
  phoneHref: 'tel:9197717755',
  smsHref: 'sms:9197717755',
  whatsappHref: 'https://wa.me/19197717755',
  primaryEmail: 'maryinhomes@gmail.com',
  expEmail: 'maryin.dosramos@exprealty.com',
  headshotUrl: 'https://ap.rdcpix.com/626829648/8dd161148e8e37a0c181d3bd8fb7d4b6a-e0rd-w1024_h1024.webp',
  headshotFallbackUrl: 'https://ap.rdcpix.com/626829648/8dd161148e8e37a0c181d3bd8fb7d4b6a-e0rd-w260_h260.webp',

  // --------------------------------------------------------------------------
  // 3. HOMEPAGE HERO SECTION
  // --------------------------------------------------------------------------
  hero: {
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
      en: 'Start Your Custom Plan',
      es: 'Iniciar Tu Plan Personalizado'
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
    },
    portraitCredentials: [
      { en: 'New Construction Specialist', es: 'Especialista en Casas Nuevas' },
      { en: '6+ Years NC Experience', es: '6+ Años de Experiencia en NC' },
      { en: '52K+ Community', es: 'Comunidad de 52K+' }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. PRODUCTION METRICS BAR
  // --------------------------------------------------------------------------
  stats: [
    {
      value: '53+',
      label: {
        en: 'Families Guided Home',
        es: 'Familias con Casa Propia'
      },
      detail: {
        en: 'North Carolina families successfully handed the keys to their future',
        es: 'Familias en Carolina del Norte que hoy disfrutan de su propio hogar'
      }
    },
    {
      value: '$17M+',
      label: {
        en: 'Total Closed Volume',
        es: 'Volumen Total Cerrado'
      },
      detail: {
        en: 'Demonstrated transaction strength and proven market mastery across NC',
        es: 'Sólida experiencia y dominio comprobado del mercado inmobiliario'
      }
    },
    {
      value: '150+',
      label: {
        en: 'Lives Directly Impacted',
        es: 'Vidas Impactadas Directamente'
      },
      detail: {
        en: 'Parents, children & multi-generational households planted in thriving NC communities',
        es: 'Padres, hijos y familias enteras creciendo con estabilidad en el Triángulo de NC'
      }
    },
    {
      value: '19+ Cities',
      label: {
        en: 'Across 8 NC Counties',
        es: 'En 8 Condados de NC'
      },
      detail: {
        en: 'Top-producing eXp Realty Broker serving buyers & sellers in English & Español',
        es: 'Broker destacada en eXp Realty asesorando compradores y vendedores en Español e Inglés'
      }
    }
  ] as ProductionStat[],

  // --------------------------------------------------------------------------
  // 5. LIFE IMPACT, 53+ DOORS BANNER & CUSTOMIZABLE CLOSING STORIES MARQUEE
  // --------------------------------------------------------------------------
  lifeImpact: {
    eyebrow: {
      en: 'MORE THAN TRANSACTIONS — A LEGACY OF CHANGED LIVES',
      es: 'MÁS QUE TRANSACCIONES — UN LEGADO DE VIDAS TRANSFORMADAS'
    },
    title: {
      en: 'Real Estate Rooted in Community, Family & Long-Term Stability.',
      es: 'Bienes Raíces Basados en Comunidad, Familia y Estabilidad a Largo Plazo.'
    },
    subtitle: {
      en: 'For Maryin Estefania Dos Ramos, real estate isn’t just numbers on a board—it is measured in the emotion at the closing table, children choosing their bedrooms for the first time, and families planting permanent roots.',
      es: 'Para Maryin Estefania Dos Ramos, el éxito no son solo números—se mide en la emoción en la mesa de cierre, los niños eligiendo su habitación por primera vez y familias echando raíces permanentes.'
    },

    // 53+ Doors / Community Banner
    doorsBanner: {
      tag1: {
        en: '🔑 Community Impact',
        es: '🔑 Impacto Comunitario'
      },
      tag2: {
        en: '150+ Lives Guided',
        es: '150+ Vidas Guiadas'
      },
      title: {
        en: 'Every Home Sold Is a Family’s Future Transformed',
        es: 'Cada Casa Vendida Es el Futuro de una Familia Transformado'
      },
      desc: {
        en: 'From first-time homeowners to growing families building new construction, Maryin has helped more than 150 parents, children, and loved ones plant permanent roots across 8 North Carolina counties.',
        es: 'Desde familias que compran por primera vez hasta quienes construyen casas nuevas, Maryin ha acompañado a más de 150 personas a echar raíces propias en 8 condados de Carolina del Norte.'
      },
      keysCaption: {
        en: 'Representing families guided home · Ready to welcome yours next',
        es: 'Familias guiadas a su nuevo hogar · Lista para guiar al tuyo'
      }
    },

    // 4 Key Milestones of Impact
    milestones: [
      {
        metric: '50+',
        unit: {
          en: 'Buyer Families Guided Home',
          es: 'Familias Compradoras con Llaves en Mano'
        },
        highlight: {
          en: 'Bespoke Buyer Representation & Guidance',
          es: 'Acompañamiento y Representación Personalizada'
        },
        story: {
          en: 'From first-time buyers navigating financing to growing families upgrading into brand-new homes, Maryin personally guides each client across the finish line with dedicated care.',
          es: 'Desde primeros compradores hasta familias creciendo en casas nuevas, Maryin lleva de la mano a cada hogar hasta recibir sus llaves con atención dedicada.'
        },
        tag: {
          en: 'Generational Stability',
          es: 'Estabilidad Generacional'
        }
      },
      {
        metric: '100%',
        unit: {
          en: 'Bilingual Empowerment (EN / ES)',
          es: 'Empoderamiento Bilingüe (ES / EN)'
        },
        highlight: {
          en: 'Fluent Protection in English & Spanish',
          es: 'Protección Fluida en Español e Inglés'
        },
        story: {
          en: 'Maryin eliminates fear and language barriers at every stage of the transaction. Contracts, inspections, and closing disclosures are thoroughly explained so families sign with complete confidence.',
          es: 'Maryin elimina las barreras de idioma en cada etapa. Contratos, inspecciones y documentos de cierre se explican con total transparencia para firmar con seguridad absoluta.'
        },
        tag: {
          en: 'Total Inclusivity',
          es: 'Inclusión Total'
        }
      },
      {
        metric: 'New Build',
        unit: {
          en: 'Builder Partner & New Construction Advantage',
          es: 'Ventaja con Constructores y Casas Nuevas'
        },
        highlight: {
          en: 'Independent Representation & Builder Credits Across NC',
          es: 'Representación Independiente y Créditos con Constructores'
        },
        story: {
          en: 'From lot selection to pre-drywall walk-throughs and builder rate buydowns, Maryin negotiates top-tier builder incentives and safeguards client investments through independent construction inspections.',
          es: 'Desde la selección del lote hasta inspecciones de pre-drywall y créditos de tasas de interés, Maryin negocia los mejores incentivos con los constructores y protege a sus clientes con inspecciones independientes.'
        },
        tag: {
          en: 'New Construction',
          es: 'Construcción Nueva'
        }
      },
      {
        metric: '$17M+',
        unit: {
          en: 'Every Family Treated Like Luxury',
          es: 'Cada Familia Recibe Trato de Lujo'
        },
        highlight: {
          en: 'From Starter Homes & Land to Executive Residences',
          es: 'Desde el Primer Hogar hasta Residencias Ejecutivas'
        },
        story: {
          en: 'Whether helping a family secure their starter home in Durham or negotiating a premier residence in Wake County, Maryin brings the exact same relentless energy, protection, and celebration to every single life she touches.',
          es: 'Ya sea ayudando a una familia a comprar su primer hogar en Durham o negociando una residencia en Wake County, Maryin entrega la misma pasión, protección y celebración a cada familia.'
        },
        tag: {
          en: '53+ Lives Changed',
          es: '53+ Vidas Cambiadas'
        }
      }
    ] as ImpactMilestone[],

    // ========================================================================
    // 🎠 CUSTOMIZABLE SCROLLING MARQUEE SETTINGS
    // ========================================================================
    // Adjust these parameters to change the speed, pause, direction, and card width:
    marquee: {
      speedSeconds: 45,        // Change this number to adjust scroll speed (lower = faster, higher = slower)
      pauseOnHover: true,      // Set to false to disable pause when hovering or touching cards
      direction: 'normal' as 'normal' | 'reverse', // 'normal' = right-to-left, 'reverse' = left-to-right
      cardWidthPx: 380         // Card width in pixels (e.g. 360, 380, 420)
    },

    // Carousel Section Header
    header: {
      title: {
        en: 'How Maryin Changes Lives at the Closing Table',
        es: 'Cómo Maryin Transforma Vidas en la Mesa de Cierre'
      },
      ctaBtn: {
        en: 'Begin Your Journey — Start Today',
        es: 'Inicia Tu Camino — Comenzar Hoy'
      }
    },

    // Real, respectful, and anonymous closing milestones
    voicesOfImpact: [
      {
        badge: {
          en: 'First-Time Homebuyers',
          es: 'Primeros Compradores'
        },
        quote: {
          en: '“We spent years paying rent thinking owning a home in North Carolina was out of reach for our family. Maryin walked us through every step in our language, helped us explore down-payment assistance options, and guided us across the finish line.”',
          es: '“Pasamos años pagando renta pensando que tener casa propia en Carolina del Norte era inalcanzable. Maryin nos guió en cada paso en nuestro idioma, nos ayudó a explorar opciones de financiamiento y nos llevó hasta la meta.”'
        },
        outcome: {
          en: 'Milestone: Transitioned from renting to proud first-time North Carolina homeownership',
          es: 'Logro: De pagar renta a propietarios de su primer hogar en Carolina del Norte'
        }
      },
      {
        badge: {
          en: 'Months of Diligent Dedication',
          es: 'Meses de Esfuerzo Compartido'
        },
        quote: {
          en: '“After months of hard work, credit preparation, and persistent house hunting, we finally sat at the closing table. Having someone in our corner who never gave up on our family turned what felt impossible into reality.”',
          es: '“Después de varios meses de trabajo constante, preparación financiera y búsqueda incansable, finalmente llegamos al cierre. Contar con alguien que nunca se rindió con nuestra familia hizo realidad lo que parecía imposible.”'
        },
        outcome: {
          en: 'Milestone: Overcame complex financing requirements through steady, patient advocacy',
          es: 'Logro: Superaron requisitos financieros complejos gracias a un acompañamiento paciente y constante'
        }
      },
      {
        badge: {
          en: 'New Construction Journey',
          es: 'Construcción Nueva Desde Cero'
        },
        quote: {
          en: '“Building a new home felt overwhelming until Maryin stepped in. She represented us at every builder meeting, walked the site during framing, and made sure every single punch-list item was perfected before closing.”',
          es: '“Construir una casa nueva parecía abrumador hasta que Maryin tomó el control. Nos representó en cada junta con el constructor, revisó la obra en obra gris y exigió que cada detalle estuviera perfecto antes de cerrar.”'
        },
        outcome: {
          en: 'Milestone: Secured builder credits and moved into a custom-built home with total peace of mind',
          es: 'Logro: Consiguieron créditos con el constructor y estrenaron su casa con absoluta tranquilidad'
        }
      },
      {
        badge: {
          en: 'Generational Milestone',
          es: 'Hito Generacional'
        },
        quote: {
          en: '“Coming to this country and being able to give our children a spacious backyard, safe community, and a place we truly own is a feeling words cannot describe. Maryin treated our family with dignity and love from day one.”',
          es: '“Llegar a este país y poder darle a nuestros hijos un patio amplio, una comunidad segura y un techo propio es un sentimiento inexplicable. Maryin trató a nuestra familia con un respeto y cariño incondicional.”'
        },
        outcome: {
          en: 'Milestone: Established permanent multi-generational family roots in North Carolina',
          es: 'Logro: Establecieron raíces familiares permanentes y patrimonio generacional en Carolina del Norte'
        }
      },
      {
        badge: {
          en: 'Competitive Triangle Market',
          es: 'Mercado Competitivo del Triángulo'
        },
        quote: {
          en: '“In a fast-moving market with multiple offers, Maryin’s strategic advice and swift communication made our contract stand out without overpaying. She protected our deposit and kept us confident throughout escrow.”',
          es: '“En un mercado con múltiples ofertas y mucha competencia, la estrategia de Maryin y su rapidez hicieron que nuestra oferta fuera elegida sin pagar de más. Protegió nuestro dinero y nos dio seguridad en todo momento.”'
        },
        outcome: {
          en: 'Milestone: Won preferred home against competing bids with safeguarded terms',
          es: 'Logro: Ganaron la casa deseada frente a otras ofertas protegiendo sus plazos e inversión'
        }
      }
    ] as VoiceOfImpact[]
  },

  // --------------------------------------------------------------------------
  // 6. BIOGRAPHY & EXECUTIVE PROFILE
  // --------------------------------------------------------------------------
  bio: {
    headline: {
      en: 'Why Families & Investors Across North Carolina Trust Maryin',
      es: 'Por Qué las Familias e Inversionistas en Carolina del Norte Confían en Maryin'
    },
    lead: {
      en: 'As a top-producing Broker and REALTOR® with eXp Realty LLC in Raleigh and the Research Triangle, Maryin Estefania Dos Ramos has built a reputation for turning complex real estate goals into smooth, high-confidence closings.',
      es: 'Como Broker y REALTOR® de alto rendimiento con eXp Realty LLC en Raleigh y el área del Triángulo, Maryin Estefania Dos Ramos ha construido una trayectoria sólida convirtiendo metas inmobiliarias en cierres seguros y exitosos.'
    },
    paragraphs: [
      {
        en: 'With over $17,037,374 in closed North Carolina volume and more than 53 families guided home, Maryin commands deep market fluency across Wake, Durham, Johnston, Franklin, Granville, Chatham, Orange, and Alamance counties. Affiliated with eXp Realty and The Vega Team, she leverages cloud-powered digital marketing, data-driven pricing analytics, and fierce contract negotiation.',
        es: 'Con más de $17,037,374 en volumen de ventas cerradas en Carolina del Norte y más de 53 familias asesoradas con éxito, Maryin domina el mercado en los condados de Wake, Durham, Johnston, Franklin, Granville, Chatham, Orange y Alamance. Afiliada a eXp Realty y The Vega Team, utiliza marketing digital avanzado, análisis preciso de precios y negociación estratégica.'
      },
      {
        en: 'Specializing in new-construction homes and builder relationships across North Carolina, Maryin provides buyers with a distinct competitive edge—negotiating builder rate buydowns, closing cost incentives, lot selection strategy, and conducting independent walkthrough inspections across fast-growing Triangle communities like Clayton, Zebulon, Durham, Rolesville, Wendell, and Pittsboro.',
        es: 'Especializada en casas nuevas y alianzas con constructores en Carolina del Norte, Maryin brinda a sus compradores una ventaja competitiva única—negociando reducción de tasas, incentivos de cierre, selección estratégica de lotes e inspecciones independientes en comunidades de alto crecimiento como Clayton, Zebulon, Durham, Rolesville, Wendell y Pittsboro.'
      },
      {
        en: 'Equally passionate about first-time homebuyers, seasoned move-up sellers, and bilingual Hispanic families, Maryin educates every client on North Carolina down-payment assistance programs, financing strategies, and long-term equity building.',
        es: 'Apasionada tanto por primeros compradores como por vendedores e inversionistas, Maryin educa a cada cliente sobre programas de ayuda para el enganche (down payment) en Carolina del Norte, estrategias de financiamiento y creación de patrimonio familiar a largo plazo.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 7. CORE SERVICE PILLARS
  // --------------------------------------------------------------------------
  servicePillarsHeader: {
    eyebrow: {
      en: 'EXECUTIVE REPRESENTATION & BUILDER PARTNERSHIPS',
      es: 'REPRESENTACIÓN EJECUTIVA Y ALIANZAS CON CONSTRUCTORES'
    },
    title: {
      en: 'How Maryin Delivers a Distinct Advantage in North Carolina',
      es: 'Cómo Maryin Brinda una Ventaja Única en Carolina del Norte'
    }
  },
  servicePillars: [
    {
      id: 'new-construction',
      code: '01',
      title: {
        en: 'New Construction & Builder Partner Incentives',
        es: 'Construcción Nueva e Incentivos de Constructores'
      },
      subtitle: {
        en: 'Direct builder relationships across the Research Triangle that secure you rate buydowns, closing credits, and upgrade allowances.',
        es: 'Relaciones directas con constructores en el Triángulo que consiguen mejores tasas, créditos de cierre y mejoras de acabados.'
      },
      bullets: [
        {
          en: 'Aggressive negotiation for builder rate buydowns, closing cost credits, and design upgrades',
          es: 'Negociación estratégica de tasas preferenciales, créditos de cierre y mejoras de diseño'
        },
        {
          en: 'Independent representation during pre-drywall & final builder walkthroughs',
          es: 'Representación independiente en inspecciones de pre-drywall y entrega final'
        },
        {
          en: 'Access to quick-move-in inventory & early lot releases in Wake, Durham & Johnston counties',
          es: 'Acceso prioritario a casas de entrega rápida y nuevos lotes en Wake, Durham y Johnston'
        }
      ],
      badge: {
        en: 'Builder Advantage',
        es: 'Ventaja Constructores'
      }
    },
    {
      id: 'buyer-representation',
      code: '02',
      title: {
        en: '51+ Closed Buyer Representations ($16.7M+ Volume)',
        es: '51+ Compradores Representados ($16.7M+ en Volumen)'
      },
      subtitle: {
        en: 'Step-by-step guidance from lender pre-approval and down-payment grant matching to winning offer negotiation.',
        es: 'Acompañamiento paso a paso desde la pre-aprobación y ayudas de enganche hasta la entrega de tus llaves.'
      },
      bullets: [
        {
          en: 'NC Home Advantage & first-time buyer down-payment assistance navigation',
          es: 'Orientación en programas de ayuda para primeros compradores en NC'
        },
        {
          en: 'Trusted network of bilingual lenders, home inspectors, and NC closing attorneys',
          es: 'Red confiable de prestamistas bilingües, inspectores y abogados de cierre'
        },
        {
          en: 'Proven track record across $200K–$585K+ homes with an average purchase of $327,399',
          es: 'Experiencia comprobada en propiedades de $200K a $585K+ (promedio de $327,399)'
        }
      ],
      badge: {
        en: '51+ Buyers Guided',
        es: '51+ Familias'
      }
    },
    {
      id: 'seller-marketing',
      code: '03',
      title: {
        en: 'eXp Realty Cloud Marketing & Custom Home Valuation',
        es: 'Marketing Digital eXp Realty y Valoración Profesional'
      },
      subtitle: {
        en: 'Position your North Carolina property in front of local Triangle buyers and out-of-state relocators for maximum net proceeds.',
        es: 'Posiciona tu propiedad frente a compradores locales y familias mudándose a Carolina del Norte para obtener el máximo valor.'
      },
      bullets: [
        {
          en: 'Hand-crafted Comparative Market Analysis (CMA) tailored to your street & upgrades',
          es: 'Análisis Comparativo de Mercado (CMA) personalizado según las mejoras de tu casa'
        },
        {
          en: 'High-converting Instagram, Facebook & YouTube video exposure (@maryin2ramos_realtor)',
          es: 'Promoción en video de alto impacto en Instagram, Facebook y YouTube'
        },
        {
          en: 'Syndication across Doorify MLS, Zillow, Realtor.com, Homes.com & eXp global network',
          es: 'Distribución global en Doorify MLS, Zillow, Realtor.com, Homes.com y la red eXp'
        }
      ],
      badge: {
        en: 'Max Seller Equity',
        es: 'Máxima Plusvalía'
      }
    }
  ] as ServicePillar[],

  // --------------------------------------------------------------------------
  // 8. CLIENT COMMITMENTS ("THE STANDARD OF CARE")
  // --------------------------------------------------------------------------
  commitmentsHeader: {
    eyebrow: {
      en: 'THE STANDARD OF CARE',
      es: 'NUESTRO ESTÁNDAR DE SERVICIO'
    },
    title: {
      en: 'What You Can Expect Working With Maryin',
      es: 'Lo Que Puedes Esperar al Trabajar con Maryin'
    },
    subtitle: {
      en: 'Every client, transaction, and family goal is unique. Here is the unwavering standard of representation and care you will experience from day one.',
      es: 'Cada cliente, familia y situación es única. Este es el compromiso de atención, defensa y transparencia que recibirás desde el primer día.'
    },
    ctaBio: {
      en: 'Read Full Bio & Background →',
      es: 'Conoce Más Sobre Maryin →'
    },
    ctaConsultation: {
      en: 'Schedule a 1-on-1 Consultation',
      es: 'Agendar una Consulta 1-a-1'
    }
  },
  clientCommitments: [
    {
      id: 'personalized-strategy',
      number: '01',
      title: {
        en: 'A Tailored Strategy Built Around Your Life',
        es: 'Una Estrategia Personalizada Según Tu Vida'
      },
      summary: {
        en: 'No two moves are identical. Maryin listens first to design a roadmap matched to your comfort level, timing, and unique priorities.',
        es: 'Ninguna compra o venta es igual. Maryin escucha primero para diseñar un plan adaptado a tus tiempos, comodidad y prioridades.'
      },
      details: {
        en: 'Whether you are exploring brand-new construction, looking for an established neighborhood, or preparing to sell, your goals set the pace.',
        es: 'Ya sea que explores casas nuevas, busques vecindarios establecidos o prepares una venta, tus metas marcan el camino.'
      },
      pill: {
        en: 'Client-First Alignment',
        es: 'A Tu Medida'
      }
    },
    {
      id: 'clear-guidance',
      number: '02',
      title: {
        en: 'Clear Guidance & Total Transparency',
        es: 'Claridad Total y Transparencia en Cada Paso'
      },
      summary: {
        en: 'Real estate contracts and decisions should never feel intimidating. You receive clear, honest communication at every milestone.',
        es: 'Los contratos y trámites inmobiliarios no tienen por qué ser abrumadores. Recibes explicaciones claras en cada etapa.'
      },
      details: {
        en: 'Every document, timeline, and option is explained thoroughly in English or Español so you always feel informed, confident, and in control.',
        es: 'Cada documento, plazo y alternativa se explica detalladamente en Español o Inglés para que tomes decisiones con total seguridad.'
      },
      pill: {
        en: 'Bilingual Clarity',
        es: 'Claridad Bilingüe'
      }
    },
    {
      id: 'fierce-advocacy',
      number: '03',
      title: {
        en: 'Dedicated Representation & Protection',
        es: 'Defensa Dedicada y Protección de Tus Intereses'
      },
      summary: {
        en: 'From contract writing and inspections to builder walk-throughs, Maryin protects your interests with uncompromising attention to detail.',
        es: 'Desde la oferta e inspecciones hasta la entrega de la casa, Maryin defiende tus intereses con atención cuidadosa a cada detalle.'
      },
      details: {
        en: 'Having a trusted, experienced broker by your side means having an advocate whose primary mission is protecting your hard-earned investment.',
        es: 'Tener una profesional de confianza a tu lado significa contar con alguien cuya única misión es cuidar tu patrimonio e inversión.'
      },
      pill: {
        en: 'Unwavering Advocacy',
        es: 'Protección Total'
      }
    },
    {
      id: 'long-term-relationship',
      number: '04',
      title: {
        en: 'A Partnership That Continues After Closing',
        es: 'Una Relación que Continúa Después del Cierre'
      },
      summary: {
        en: 'Handing over the keys is just the beginning. Maryin remains your go-to local resource long after move-in day.',
        es: 'Recibir las llaves es solo el comienzo. Maryin continúa siendo tu contacto de confianza en Carolina del Norte mucho después del cierre.'
      },
      details: {
        en: 'From trusted local contractor referrals to ongoing market insights, you always have a dedicated real estate partner in your corner.',
        es: 'Desde recomendaciones de confianza hasta consultas sobre el valor de tu propiedad, siempre tendrás una aliada dispuesta a apoyarte.'
      },
      pill: {
        en: 'Lifelong Support',
        es: 'Apoyo Continuo'
      }
    }
  ] as ClientCommitment[],

  // --------------------------------------------------------------------------
  // 9. NORTH CAROLINA MARKET COVERAGE AREAS
  // --------------------------------------------------------------------------
  marketAreas: [
    {
      county: 'Wake County, NC',
      cities: ['Raleigh', 'Cary', 'Apex', 'Wake Forest', 'Holly Springs', 'Garner', 'Rolesville', 'Wendell', 'Zebulon'],
      highlight: {
        en: 'State capital hub with booming tech employment, top-rated schools, and master-planned communities.',
        es: 'Epicentro económico y tecnológico con excelentes escuelas y comunidades planeadas de alta plusvalía.'
      },
      priceRange: '$280K – Custom Luxury'
    },
    {
      county: 'Durham County, NC',
      cities: ['Durham', 'Research Triangle Park (RTP)', 'Brier Creek Perimeter'],
      highlight: {
        en: 'Vibrant innovation corridor near Duke & RTP with strong appreciation, urban infill, and modern townhomes.',
        es: 'Corredor de innovación junto a RTP y Duke con alta valorización, casas modernas y excelente conectividad.'
      },
      priceRange: '$245K – All Tiers'
    },
    {
      county: 'Johnston County, NC',
      cities: ['Clayton', 'Smithfield', 'Selma', 'Flowers Plantation'],
      highlight: {
        en: 'Premier destination for spacious new-construction homes, major builder incentives, and master-planned neighborhoods like Flowers Plantation.',
        es: 'Destino líder para casas nuevas amplias, incentivos de constructores y comunidades planeadas como Flowers Plantation.'
      },
      priceRange: '$240K – All Tiers'
    },
    {
      county: 'Franklin & Granville Counties, NC',
      cities: ['Louisburg', 'Youngsville', 'Franklinton', 'Creedmoor', 'Oxford'],
      highlight: {
        en: 'Larger lots, peaceful acreage, and exceptional value within easy commuting distance of North Raleigh & Durham.',
        es: 'Terrenos más amplios, tranquilidad y excelente valor por pie cuadrado a pocos minutos del norte de Raleigh y Durham.'
      },
      priceRange: '$185K – All Tiers'
    },
    {
      county: 'Chatham, Orange & Alamance Counties, NC',
      cities: ['Chapel Hill', 'Pittsboro', 'Mebane', 'Burlington'],
      highlight: {
        en: 'West Triangle expansion corridor featuring Chatham Park, university towns, and high-growth commuter neighborhoods.',
        es: 'Corredor oeste del Triángulo con desarrollos como Chatham Park, ciudades universitarias y gran crecimiento.'
      },
      priceRange: '$230K – Custom Estates'
    }
  ] as MarketArea[],

  // --------------------------------------------------------------------------
  // 10. SOCIAL MEDIA CHANNELS & REAL ESTATE PORTALS
  // --------------------------------------------------------------------------
  socialChannels: [
    {
      id: 'instagram',
      platform: 'Instagram (52K+)',
      handle: '@maryin2ramos_realtor',
      url: 'https://www.instagram.com/maryin2ramos_realtor/',
      category: 'social',
      badge: {
        en: '52K+ Community',
        es: 'Comunidad 52K+'
      },
      description: {
        en: 'Join 52,000+ followers on @maryin2ramos_realtor for daily new-construction walkthroughs, closing celebrations, and bilingual NC buyer education.',
        es: 'Únete a más de 52,000 seguidores en @maryin2ramos_realtor para ver recorridos de casas nuevas, entregas de llaves y educación inmobiliaria en NC.'
      }
    },
    {
      id: 'facebook',
      platform: 'Facebook',
      handle: 'Maryin Estefania Dos Ramos',
      url: 'https://www.facebook.com/maryinestefania.dosramos',
      category: 'social',
      badge: {
        en: 'Community & Listings',
        es: 'Comunidad y Propiedades'
      },
      description: {
        en: 'Connect on Facebook for Triangle market updates, down-payment assistance workshops, and active NC listings.',
        es: 'Conéctate en Facebook para actualizaciones del mercado, programas de ayuda y propiedades disponibles.'
      }
    },
    {
      id: 'linktree',
      platform: 'Linktree Hub',
      handle: 'linktr.ee/maryin_realtor',
      url: 'https://linktr.ee/maryin_realtor',
      category: 'social',
      badge: {
        en: 'Official Links Hub',
        es: 'Enlaces Oficiales'
      },
      description: {
        en: 'Access Maryin’s official link-in-bio hub with quick access to direct WhatsApp chat, Instagram, and active guides.',
        es: 'Accede al concentrador oficial de enlaces de Maryin con acceso directo a WhatsApp, Instagram y guías.'
      }
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      handle: 'Maryin Estefania Dos Ramos',
      url: 'https://www.linkedin.com/in/maryin-estefania-dos-ramos-7303b395/',
      category: 'social',
      badge: {
        en: 'Professional Bio',
        es: 'Perfil Profesional'
      },
      description: {
        en: 'Connect on LinkedIn for professional background, industry network, and real estate partnerships in North Carolina.',
        es: 'Conéctate en LinkedIn para ver su trayectoria profesional, alianzas y red en Carolina del Norte.'
      }
    },
    {
      id: 'realtor',
      platform: 'Realtor.com',
      handle: 'Maryin E. Dos Ramos',
      url: 'https://www.realtor.com/realestateagents/5e3363f167400900139fce8a',
      category: 'portal',
      badge: {
        en: 'Verified REALTOR®',
        es: 'REALTOR® Verificada'
      },
      description: {
        en: 'Connect through Maryin’s official Realtor.com profile with eXp Realty LLC serving the greater Triangle.',
        es: 'Conéctate mediante el perfil oficial de Maryin en Realtor.com con eXp Realty LLC.'
      }
    },
    {
      id: 'homes',
      platform: 'Homes.com',
      handle: 'Maryin Dos Ramos',
      url: 'https://www.homes.com/real-estate-agents/maryin-dos-ramos/h2jwce1/',
      category: 'portal',
      badge: {
        en: 'Homes.com Verified',
        es: 'Verificada en Homes.com'
      },
      description: {
        en: 'View Maryin’s verified Homes.com agent profile, active Triangle listings, and verified sales history with eXp Realty LLC.',
        es: 'Consulta el perfil verificado de Maryin en Homes.com, propiedades activas en el Triángulo e historial de ventas con eXp Realty LLC.'
      }
    },
    {
      id: 'homespotter',
      platform: 'HomeSpotter MLS App',
      handle: 'Maryin’s Client App',
      url: 'http://hms.pt/ufaf',
      category: 'portal',
      badge: {
        en: 'Official MLS App',
        es: 'App Oficial MLS'
      },
      description: {
        en: 'Download or open Maryin’s official HomeSpotter app to search live Triangle MLS listings, save favorites, and message her directly.',
        es: 'Descarga o abre la app oficial HomeSpotter de Maryin para buscar casas en tiempo real en el MLS y chatear directamente.'
      }
    }
  ] as SocialChannel[],

  // --------------------------------------------------------------------------
  // 11. SOCIAL HUB SECTION CONFIGURATION
  // --------------------------------------------------------------------------
  socialHub: {
    header: {
      eyebrow: {
        en: 'OMNICHANNEL SOCIAL MEDIA & DIRECT CONTACT HUB',
        es: 'REDES SOCIALES OFICIALES Y CONTACTO DIRECTO'
      },
      title: {
        en: 'Connect With Maryin Across Every Platform',
        es: 'Conéctate con Maryin en Todas Sus Plataformas'
      },
      subtitle: {
        en: 'Whether you prefer a quick WhatsApp chat, direct call, text message, email, or exploring her Linktree and social channels—connect with Maryin directly below.',
        es: 'Ya sea por chat directo de WhatsApp, llamada, mensaje de texto, correo electrónico o explorando su Linktree y redes—conéctate con Maryin al instante.'
      }
    },
    cards: {
      whatsapp: {
        badge: { en: 'Instant Client Chat', es: 'Chat Instantáneo de Clientes' },
        title: 'WhatsApp Direct',
        desc: {
          en: 'Maryin’s primary mobile messaging channel. Start a real-time conversation about new construction, questions, or showings.',
          es: 'El canal principal de mensajería de Maryin. Inicia una conversación directa sobre casas nuevas, preguntas o citas.'
        },
        btn: { en: 'Open WhatsApp Chat', es: 'Abrir Chat de WhatsApp' }
      },
      phone: {
        badge: { en: 'Direct Mobile & SMS', es: 'Móvil Directo y SMS' },
        desc: {
          en: 'Call or send a standard SMS text message directly to Maryin for immediate real estate assistance.',
          es: 'Llama o envía un mensaje de texto SMS directo para atención inmediata.'
        },
        callBtn: { en: 'Call', es: 'Llamar' },
        textBtn: { en: 'Text', es: 'Texto' },
        copyBtn: { en: 'Copy', es: 'Copiar' }
      },
      email: {
        badge: { en: 'Client Inbox', es: 'Correo de Clientes' },
        desc: {
          en: 'Send detailed inquiries, pre-approval letters, or documents directly to Maryin’s inbox.',
          es: 'Envía consultas detalladas, preaprobaciones o documentos directo a su correo.'
        },
        sendBtn: { en: 'Send Email', es: 'Enviar Correo' },
        copyBtn: { en: 'Copy', es: 'Copiar' }
      }
    }
  },

  // --------------------------------------------------------------------------
  // 12. ABOUT PAGE CONFIGURATION
  // --------------------------------------------------------------------------
  aboutPage: {
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
    ],
    callout: {
      title: {
        en: 'Current Position & Network Strength at eXp Realty, LLC',
        es: 'Posición Actual y Respaldo en eXp Realty, LLC'
      },
      body: {
        en: 'Operating out of eXp Realty’s Raleigh hub (9121 Anson Way, Suite 200, Raleigh, NC 27615) and affiliated with The Vega Team / Michelle Vega Realty, Maryin combines cloud-first global syndication with hands-on local advocacy across 8 North Carolina counties.',
        es: 'Operando desde la sede de eXp Realty en Raleigh (9121 Anson Way, Suite 200, Raleigh, NC 27615) y afiliada a The Vega Team / Michelle Vega Realty, Maryin combina tecnología inmobiliaria global con atención personalizada en 8 condados de Carolina del Norte.'
      },
      ctaBtn: {
        en: 'Book a 1-on-1 Consultation',
        es: 'Agendar Consulta 1-a-1'
      }
    }
  },

  // --------------------------------------------------------------------------
  // 13. MARKETS PAGE CONFIGURATION
  // --------------------------------------------------------------------------
  marketsPage: {
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
  },

  // --------------------------------------------------------------------------
  // 14. CONTACT PAGE CONFIGURATION
  // --------------------------------------------------------------------------
  contactPage: {
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
        en: 'Use the interactive funnel below to request your VIP buyer list, new-construction builder incentives, or a custom Comparative Market Analysis (CMA)—or reach out immediately by phone, text, email, or social media.',
        es: 'Usa el formulario interactivo a continuación para solicitar tu lista VIP de propiedades, incentivos de casas nuevas o una valoración de tu propiedad—o contáctala al instante por llamada, texto, correo o redes sociales.'
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
  },

  // --------------------------------------------------------------------------
  // 15. FOOTER & NAVIGATION CONFIGURATION
  // --------------------------------------------------------------------------
  footer: {
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
      { to: '/contact', label: { en: 'Schedule Call', es: 'Agendar Llamada' } }
    ]
  },

  // --------------------------------------------------------------------------
  // 16. CLIENT ACQUISITION FUNNEL CONFIGURATION & PRESETS
  // --------------------------------------------------------------------------
  funnelConfig: {
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
}
