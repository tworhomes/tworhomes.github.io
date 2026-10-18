import type { ImpactMilestone, VoiceOfImpact } from './types'

/**
 * ----------------------------------------------------------------------------
 * LIFE IMPACT, 53+ DOORS BANNER & CLOSING STORIES MARQUEE
 * ----------------------------------------------------------------------------
 * Milestone metrics, community impact banner, and verified client closing table stories.
 */
export const lifeImpact = {
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

  // Scrolling Marquee Parameters
  marquee: {
    speedSeconds: 45,        // Scroll duration in seconds (lower = faster, higher = slower)
    pauseOnHover: true,      // Pause animation on cursor hover or mobile touch
    direction: 'normal' as 'normal' | 'reverse',
    cardWidthPx: 380         // Width per card in pixels
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
}

