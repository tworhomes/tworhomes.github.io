import type { MarketArea } from './types'

/**
 * ----------------------------------------------------------------------------
 * NORTH CAROLINA MARKET COVERAGE AREAS
 * ----------------------------------------------------------------------------
 * 8 North Carolina Counties, communities, price bands, and builder highlights.
 */
export const marketAreas: MarketArea[] = [
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
]

