export interface SeoPageData {
  title: string;
  description: string;
  canonical: string;
  image?: string;
}

export type SeoPageKey =
  | 'home'
  | 'contact'
  | 'residential-buildings'
  | 'commercial-buildings'
  | 'agricultural-buildings'
  | 'aircraft-hangars'
  | 'rv-boat-storage';