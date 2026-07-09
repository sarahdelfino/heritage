export interface BuildingTypePage {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  benefits: string[];
  sizes: {
    title: string;
    description: string;
  }[];
}

export const BUILDING_TYPE_PAGES: BuildingTypePage[] = [
  {
    slug: 'aircraft-hangars',
    eyebrow: 'Aircraft Hangars',
    title: 'Built to protect what matters most.',
    subtitle:
      'Custom steel aircraft hangars engineered for strength, safety, and long-term performance.',
    metaTitle: 'Aircraft Hangars | Heritage Steel Builds',
    metaDescription:
      'Custom steel aircraft hangars engineered for strength, safety, and long-term performance.',
    heroImage: '/hangar.png',
    benefits: [
      'Clear-span interiors maximize usable aircraft space',
      'Hydraulic, bifold, sliding, and Schweiss door options',
      'Engineered for local wind and snow loads',
      'Designed for aircraft, maintenance, and storage',
    ],
    sizes: [
      {
        title: '40 × 40',
        description: 'Ideal for single-engine aircraft with room for tools and storage.',
      },
      {
        title: '60 × 60',
        description: 'Perfect for larger aircraft or additional workshop space.',
      },
      {
        title: '80 × 80',
        description: 'Designed for business aviation and multiple aircraft.',
      },
    ],
  },

  {
    slug: 'commercial-buildings',
    eyebrow: 'Commercial Buildings',
    title: 'Professional spaces built for your business.',
    subtitle:
      'Custom steel commercial buildings designed for offices, retail, warehouses, and industrial operations.',
    metaTitle: 'Commercial Steel Buildings | Heritage Steel Builds',
    metaDescription:
      'Steel commercial buildings engineered for warehouses, offices, retail spaces, and industrial facilities.',
    heroImage: '/commercial.jpg',
    benefits: [
      'Flexible floor plans for nearly any business',
      'Fast construction minimizes downtime',
      'Durable steel requires minimal maintenance',
      'Expandable designs that grow with your business',
    ],
    sizes: [
      {
        title: '50 × 80',
        description: 'Excellent for retail or light commercial use.',
      },
      {
        title: '60 × 100',
        description: 'Popular warehouse and office combination.',
      },
      {
        title: '80 × 120',
        description: 'Ideal for manufacturing and distribution.',
      },
    ],
  },

  {
    slug: 'workshops',
    eyebrow: 'Workshops',
    title: 'Built for work. Designed to last.',
    subtitle:
      'Functional steel workshops that provide dependable space for projects, equipment, and storage.',
    metaTitle: 'Steel Workshops | Heritage Steel Builds',
    metaDescription:
      'Custom steel workshops for hobbyists, mechanics, contractors, and business owners.',
    heroImage: '/ex3.png',
    benefits: [
      'Completely customizable layouts',
      'Clear-span interiors maximize workspace',
      'Insulated options for year-round comfort',
      'Large overhead doors for vehicles and equipment',
    ],
    sizes: [
      {
        title: '30 × 40',
        description: 'Perfect for hobby projects and home workshops.',
      },
      {
        title: '40 × 60',
        description: 'Great for mechanics and small businesses.',
      },
      {
        title: '50 × 80',
        description: 'Large workspace with dedicated storage areas.',
      },
    ],
  },

  {
    slug: 'agricultural-buildings',
    eyebrow: 'Agricultural Buildings',
    title: 'Built to support your operation.',
    subtitle:
      'Rugged steel agricultural buildings engineered for farms, ranches, livestock, and equipment.',
    metaTitle: 'Agricultural Steel Buildings | Heritage Steel Builds',
    metaDescription:
      'Steel agricultural buildings for equipment storage, livestock, hay barns, and farm operations.',
    heroImage: '/roger-starnes-agricultural-building.jpg',
    benefits: [
      'Protect tractors and equipment from the elements',
      'Large clear-span layouts for maximum flexibility',
      'Engineered for harsh agricultural environments',
      'Custom openings for machinery and livestock access',
    ],
    sizes: [
      {
        title: '40 × 60',
        description: 'Equipment storage for smaller farms.',
      },
      {
        title: '60 × 80',
        description: 'Popular choice for tractors and implements.',
      },
      {
        title: '80 × 120',
        description: 'Large agricultural facility for multiple uses.',
      },
    ],
  },

  {
    slug: 'rv-boat-storage',
    eyebrow: 'RV & Boat Storage',
    title: 'Protect your investment year-round.',
    subtitle:
      'Custom steel storage buildings designed to keep your RVs, boats, trailers, and recreational vehicles protected.',
    metaTitle: 'RV & Boat Storage Buildings | Heritage Steel Builds',
    metaDescription:
      'Steel RV and boat storage buildings with custom doors, heights, and layouts.',
    heroImage: 'rv-storage.png',
    benefits: [
      'Custom door heights for large vehicles',
      'Protection from sun, rain, and corrosion',
      'Room for maintenance, tools, and storage',
      'Expandable designs for growing collections',
    ],
    sizes: [
      {
        title: '20 × 40',
        description: 'Ideal for a single RV or large boat.',
      },
      {
        title: '30 × 50',
        description: 'Room for multiple vehicles and storage.',
      },
      {
        title: '40 × 60',
        description: 'Excellent for RVs, boats, trailers, and workshop space.',
      },
    ],
  },

  {
    slug: 'residential-buildings',
    eyebrow: 'Residential Structures',
    title: 'Modern homes built around your lifestyle.',
    subtitle:
      'Beautiful steel homes and barndominiums designed for durability, efficiency, and lasting value.',
    metaTitle: 'Steel Homes & Barndominiums | Heritage Steel Builds',
    metaDescription:
      'Custom steel homes and barndominiums designed for modern living with exceptional durability.',
    heroImage: '/steven-van-elk-residential.jpg',
    benefits: [
      'Open-concept floor plans',
      'Energy-efficient insulation packages',
      'Low-maintenance steel construction',
      'Designed to match your style and needs',
    ],
    sizes: [
      {
        title: '30 × 50',
        description: 'Comfortable starter barndominium.',
      },
      {
        title: '40 × 60',
        description: 'Popular family home layout.',
      },
      {
        title: 'Custom',
        description: 'Completely custom homes built around your vision.',
      },
    ],
  },
];