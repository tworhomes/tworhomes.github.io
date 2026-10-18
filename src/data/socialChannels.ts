import type { SocialChannel } from './types'

/**
 * ----------------------------------------------------------------------------
 * SOCIAL MEDIA CHANNELS, REAL ESTATE PORTALS & SOCIAL HUB SECTION
 * ----------------------------------------------------------------------------
 * Verified syndication links, social profiles, and direct contact hub cards.
 */

export const socialChannels: SocialChannel[] = [
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
  }
]

export const socialHub = {
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
}

