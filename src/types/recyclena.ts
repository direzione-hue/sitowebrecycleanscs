export type ServiceCategory =
  | 'Tutti'
  | 'Pulizie & Sanificazione'
  | 'Verde & Forestale'
  | 'Ambiente & Sgomberi'
  | 'Facility & Logistica'
  | 'Servizi alla Persona & Guardiania';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: Exclude<ServiceCategory, 'Tutti'>;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  highlights: string[];
  targetClients: string[];
  certifications: string[];
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  category: Exclude<ServiceCategory, 'Tutti'>;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  metrics: string;
  isCustom?: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  role: string;
  organization: string;
  sector: string;
  rating: number;
  beforeContext: string;
  outcome: string;
  quote: string;
  date: string;
}

export type RequesterType = 'Comune / Ente Pubblico' | 'Azienda / Hotel / Clinica' | 'Privato';

export interface QuoteFormData {
  requesterType: RequesterType;
  name: string;
  organization: string;
  email: string;
  phone: string;
  serviceId: string;
  location: string;
  message: string;
}

export interface QuoteFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
}

export interface QualityPillar {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface CustomMediaState {
  serviceImages: Record<string, string>;
  beforeAfterProjects: BeforeAfterProject[];
  customReviews: ReviewItem[];
}
