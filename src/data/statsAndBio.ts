import type { ProductionStat, ServicePillar, ClientCommitment } from './types'

/**
 * ----------------------------------------------------------------------------
 * STATS, BIOGRAPHY, SERVICE PILLARS & CLIENT COMMITMENTS
 * ----------------------------------------------------------------------------
 * Professional credentials, executive bio, core service specializations, and standards of care.
 */

// 1. Production Metrics Bar
export const stats: ProductionStat[] = [
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
]

// 2. Executive Bio & Background
export const bio = {
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
}

// 3. Core Service Pillars
export const servicePillarsHeader = {
  eyebrow: {
    en: 'EXECUTIVE REPRESENTATION & BUILDER PARTNERSHIPS',
    es: 'REPRESENTACIÓN EJECUTIVA Y ALIANZAS CON CONSTRUCTORES'
  },
  title: {
    en: 'How Maryin Delivers a Distinct Advantage in North Carolina',
    es: 'Cómo Maryin Brinda una Ventaja Única en Carolina del Norte'
  }
}

export const servicePillars: ServicePillar[] = [
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
]

// 4. Client Commitments (The Standard of Care)
export const commitmentsHeader = {
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
}

export const clientCommitments: ClientCommitment[] = [
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
]

