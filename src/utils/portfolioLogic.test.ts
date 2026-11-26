import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyCustomServiceImages,
  buildWhatsAppUrl,
  clampSliderPosition,
  deleteBeforeAfterProject,
  filterServicesByCategory,
  formatPhoneHref,
  mergeCustomMediaState,
  updateServicePhotoMap,
  upsertBeforeAfterProject,
  validateBeforeAfterInput,
  validateQuoteForm,
  validateReviewInput,
} from './portfolioLogic';
import type {BeforeAfterProject, ServiceItem} from '../types/recyclena';

const sampleServices: ServiceItem[] = [
  {
    id: 'pulizie',
    index: '01',
    title: 'Pulizie e Sanificazioni',
    category: 'Pulizie & Sanificazione',
    shortDescription: 'Sanificazione cliniche e alberghi.',
    fullDescription: 'Descrizione completa.',
    imageUrl: '/default-1.jpg',
    imageAlt: 'Sanificazione',
    highlights: ['CAM'],
    targetClients: ['Hotel'],
    certifications: ['ISO 9001'],
  },
  {
    id: 'verde',
    index: '02',
    title: 'Manutenzione Verde',
    category: 'Verde & Forestale',
    shortDescription: 'Cura parchi e aree boschive.',
    fullDescription: 'Descrizione completa.',
    imageUrl: '/default-2.jpg',
    imageAlt: 'Verde',
    highlights: ['Albo Forestale'],
    targetClients: ['Comuni'],
    certifications: ['Albo Forestali Sardegna'],
  },
];

const sampleProjects: BeforeAfterProject[] = [
  {
    id: 'proj-1',
    title: 'Sgrossatura Cantiere',
    location: 'Cagliari',
    category: 'Pulizie & Sanificazione',
    description: 'Intervento post-cantiere.',
    beforeImageUrl: '/b1.jpg',
    afterImageUrl: '/a1.jpg',
    metrics: '1.200 mq in 48h',
  },
];

test('clampSliderPosition bounds values between 0 and 100 and handles NaN', () => {
  assert.equal(clampSliderPosition(-15), 0);
  assert.equal(clampSliderPosition(132), 100);
  assert.equal(clampSliderPosition(48.6), 49);
  assert.equal(clampSliderPosition(Number.NaN), 50);
});

test('filterServicesByCategory filters correctly and preserves all for Tutti', () => {
  assert.equal(filterServicesByCategory(sampleServices, 'Tutti').length, 2);
  const filtered = filterServicesByCategory(sampleServices, 'Verde & Forestale');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'verde');
});

test('applyCustomServiceImages and updateServicePhotoMap replace and reset service photos', () => {
  const map1 = updateServicePhotoMap({}, 'pulizie', 'https://example.com/custom.jpg');
  const updated = applyCustomServiceImages(sampleServices, map1);
  assert.equal(updated[0].imageUrl, 'https://example.com/custom.jpg');
  assert.equal(updated[1].imageUrl, '/default-2.jpg');

  const mapReset = updateServicePhotoMap(map1, 'pulizie', '');
  const restored = applyCustomServiceImages(sampleServices, mapReset);
  assert.equal(restored[0].imageUrl, '/default-1.jpg');
});

test('upsertBeforeAfterProject and deleteBeforeAfterProject keep safe fallback state', () => {
  const newProj: BeforeAfterProject = {
    id: 'proj-2',
    title: 'Parco Comunale',
    location: 'Oristano',
    category: 'Verde & Forestale',
    description: 'Cantiere LavoRas.',
    beforeImageUrl: '/b2.jpg',
    afterImageUrl: '/a2.jpg',
    metrics: '3.400 mq riqualificati',
    isCustom: true,
  };
  const added = upsertBeforeAfterProject(sampleProjects, newProj);
  assert.equal(added.length, 2);
  assert.equal(added[0].id, 'proj-2');

  const edited = upsertBeforeAfterProject(added, {...newProj, title: 'Parco Rinnovato'});
  assert.equal(edited.length, 2);
  assert.equal(edited[0].title, 'Parco Rinnovato');

  const afterDeleteAll = deleteBeforeAfterProject(
    sampleProjects,
    'proj-1',
    sampleProjects,
  );
  assert.equal(afterDeleteAll.length, 1);
  assert.equal(afterDeleteAll[0].id, 'proj-1');
});

test('validateQuoteForm detects invalid inputs and passes valid Italian submissions', () => {
  const invalidErrors = validateQuoteForm({
    requesterType: 'Comune / Ente Pubblico',
    name: 'A',
    organization: '',
    email: 'not-an-email',
    phone: '123',
    serviceId: 'pulizie',
    location: '',
    message: 'ciao',
  });
  assert.ok(invalidErrors.name);
  assert.ok(invalidErrors.email);
  assert.ok(invalidErrors.phone);
  assert.ok(invalidErrors.location);
  assert.ok(invalidErrors.message);

  const validErrors = validateQuoteForm({
    requesterType: 'Comune / Ente Pubblico',
    name: 'Marco Serra',
    organization: 'Comune di Quartu',
    email: 'ufficio.tecnico@comune.it',
    phone: '+39 070 1234567',
    serviceId: 'verde',
    location: 'Quartu Sant’Elena',
    message: 'Richiesta attivazione cantiere LavoRas per manutenzione verde pubblico.',
  });
  assert.deepEqual(validErrors, {});
});

test('validateBeforeAfterInput and validateReviewInput enforce required fields', () => {
  const baErrors = validateBeforeAfterInput({
    title: '',
    location: 'Nuoro',
    beforeImageUrl: '',
    afterImageUrl: '/a.jpg',
  });
  assert.ok(baErrors.title);
  assert.ok(baErrors.beforeImageUrl);
  assert.equal(baErrors.location, undefined);

  const revErrors = validateReviewInput({
    authorName: 'Giulia',
    organization: 'Clinica San Marco',
    quote: 'Servizio impeccabile e puntuale con prodotti certificati.',
  });
  assert.deepEqual(revErrors, {});
});

test('mergeCustomMediaState recovers gracefully from corrupted JSON', () => {
  const corrupt = mergeCustomMediaState(sampleProjects, '{invalid-json');
  assert.equal(corrupt.beforeAfterProjects.length, 1);
  assert.deepEqual(corrupt.serviceImages, {});

  const valid = mergeCustomMediaState(
    sampleProjects,
    JSON.stringify({
      serviceImages: {pulizie: '/custom.jpg'},
      beforeAfterProjects: [
        ...sampleProjects,
        {
          id: 'c1',
          title: 'Sgombero Archivio',
          location: 'Sassari',
          category: 'Ambiente & Sgomberi',
          description: 'Completato',
          beforeImageUrl: '/b.jpg',
          afterImageUrl: '/a.jpg',
          metrics: '24h',
        },
      ],
      customReviews: [],
    }),
  );
  assert.equal(valid.serviceImages.pulizie, '/custom.jpg');
  assert.equal(valid.beforeAfterProjects.length, 2);
});

test('formatPhoneHref and buildWhatsAppUrl format customer service links cleanly', () => {
  assert.equal(formatPhoneHref('+39 392 096 3449'), 'tel:+393920963449');
  assert.equal(formatPhoneHref('+39 334 193 5821'), 'tel:+393341935821');

  const url = buildWhatsAppUrl(
    '+39 392 096 3449',
    'Attivazione Cantiere LavoRas',
    'Comune di Cagliari',
  );
  assert.ok(url.startsWith('https://wa.me/393920963449?text='));
  assert.ok(url.includes(encodeURIComponent('Attivazione Cantiere LavoRas')));
  assert.ok(url.includes(encodeURIComponent('Comune di Cagliari')));
});

