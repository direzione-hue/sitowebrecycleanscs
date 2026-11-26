import type {
  BeforeAfterProject,
  CustomMediaState,
  QuoteFormData,
  QuoteFormErrors,
  ReviewItem,
  ServiceCategory,
  ServiceItem,
} from '../types/recyclena';

export function clampSliderPosition(value: number): number {
  if (!Number.isFinite(value)) {
    return 50;
  }
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function filterServicesByCategory(
  services: ServiceItem[],
  category: ServiceCategory,
): ServiceItem[] {
  if (category === 'Tutti') {
    return services;
  }
  return services.filter((service) => service.category === category);
}

export function applyCustomServiceImages(
  services: ServiceItem[],
  customImages: Record<string, string>,
): ServiceItem[] {
  return services.map((service) => {
    const customUrl = customImages[service.id];
    if (typeof customUrl === 'string' && customUrl.trim().length > 0) {
      return {
        ...service,
        imageUrl: customUrl,
      };
    }
    return service;
  });
}

export function updateServicePhotoMap(
  currentMap: Record<string, string>,
  serviceId: string,
  newImageUrl: string,
): Record<string, string> {
  const trimmed = newImageUrl.trim();
  if (!trimmed) {
    const next = {...currentMap};
    delete next[serviceId];
    return next;
  }
  return {
    ...currentMap,
    [serviceId]: trimmed,
  };
}

export function upsertBeforeAfterProject(
  projects: BeforeAfterProject[],
  project: BeforeAfterProject,
): BeforeAfterProject[] {
  const index = projects.findIndex((item) => item.id === project.id);
  if (index === -1) {
    return [project, ...projects];
  }
  const updated = [...projects];
  updated[index] = project;
  return updated;
}

export function deleteBeforeAfterProject(
  projects: BeforeAfterProject[],
  projectId: string,
  fallbackProjects: BeforeAfterProject[],
): BeforeAfterProject[] {
  const remaining = projects.filter((item) => item.id !== projectId);
  if (remaining.length === 0) {
    return fallbackProjects;
  }
  return remaining;
}

export function validateQuoteForm(data: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Inserisci nome e cognome (almeno 2 caratteri).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
    errors.email = 'Inserisci un indirizzo email valido.';
  }

  const digitsOnly = data.phone.replace(/[^\d]/g, '');
  if (!data.phone.trim() || digitsOnly.length < 7) {
    errors.phone = 'Inserisci un numero di telefono valido (minimo 7 cifre).';
  }

  if (!data.location.trim() || data.location.trim().length < 2) {
    errors.location = 'Indica il Comune o la zona di intervento.';
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Descrivi brevemente il servizio o cantiere richiesto (minimo 10 caratteri).';
  }

  return errors;
}

export function validateBeforeAfterInput(input: {
  title: string;
  location: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.title.trim() || input.title.trim().length < 3) {
    errors.title = 'Inserisci il titolo dell’intervento (minimo 3 caratteri).';
  }
  if (!input.location.trim() || input.location.trim().length < 2) {
    errors.location = 'Inserisci il Comune o la sede dell’intervento.';
  }
  if (!input.beforeImageUrl.trim()) {
    errors.beforeImageUrl = 'Carica o inserisci l’immagine Prima dell’intervento.';
  }
  if (!input.afterImageUrl.trim()) {
    errors.afterImageUrl = 'Carica o inserisci l’immagine Dopo l’intervento.';
  }
  return errors;
}

export function validateReviewInput(input: {
  authorName: string;
  organization: string;
  quote: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.authorName.trim() || input.authorName.trim().length < 2) {
    errors.authorName = 'Inserisci il tuo nome.';
  }
  if (!input.organization.trim() || input.organization.trim().length < 2) {
    errors.organization = 'Indica l’ente, azienda o struttura.';
  }
  if (!input.quote.trim() || input.quote.trim().length < 12) {
    errors.quote = 'Scrivi un breve commento sul servizio ricevuto (almeno 12 caratteri).';
  }
  return errors;
}

export function mergeCustomMediaState(
  defaultProjects: BeforeAfterProject[],
  rawStoredJson: string | null,
): CustomMediaState {
  const fallback: CustomMediaState = {
    serviceImages: {},
    beforeAfterProjects: defaultProjects,
    customReviews: [],
  };

  if (!rawStoredJson) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(rawStoredJson) as Partial<CustomMediaState>;
    const serviceImages: Record<string, string> =
      parsed && typeof parsed.serviceImages === 'object' && parsed.serviceImages !== null
        ? parsed.serviceImages
        : {};

    const validProjects = Array.isArray(parsed?.beforeAfterProjects)
      ? parsed.beforeAfterProjects.filter(
          (item): item is BeforeAfterProject =>
            Boolean(item) &&
            typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.beforeImageUrl === 'string' &&
            typeof item.afterImageUrl === 'string',
        )
      : [];

    const validReviews = Array.isArray(parsed?.customReviews)
      ? parsed.customReviews.filter(
          (item): item is ReviewItem =>
            Boolean(item) &&
            typeof item.id === 'string' &&
            typeof item.authorName === 'string' &&
            typeof item.quote === 'string',
        )
      : [];

    return {
      serviceImages,
      beforeAfterProjects: validProjects.length > 0 ? validProjects : defaultProjects,
      customReviews: validReviews,
    };
  } catch {
    return fallback;
  }
}

export function formatPhoneHref(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export function buildWhatsAppUrl(
  phoneNumber: string,
  topic: string,
  customNote?: string,
): string {
  const digits = phoneNumber.replace(/[^\d]/g, '');
  const trimmedTopic = topic.trim() || 'Richiesta informazioni';
  const trimmedNote = customNote?.trim() ?? '';
  const baseMessage = trimmedNote
    ? `Salve Recyclean, vorrei ricevere assistenza dall'operatrice dedicata per: ${trimmedTopic}. Dettagli: ${trimmedNote}`
    : `Salve Recyclean, vorrei ricevere assistenza dall'operatrice dedicata per: ${trimmedTopic}.`;

  return `https://wa.me/${digits}?text=${encodeURIComponent(baseMessage)}`;
}

