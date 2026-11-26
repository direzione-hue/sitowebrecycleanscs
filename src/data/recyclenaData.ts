import type {
  BeforeAfterProject,
  QualityPillar,
  ReviewItem,
  ServiceCategory,
  ServiceItem,
} from '../types/recyclena';

export const HERO_IMAGE_URL = '/src/assets/images/hero_recyclena_sardegna_1794932144824.jpg';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Tutti',
  'Pulizie & Sanificazione',
  'Verde & Forestale',
  'Ambiente & Sgomberi',
  'Facility & Logistica',
  'Servizi alla Persona & Guardiania',
];

export const CERTIFICATIONS_STRIP = [
  {
    code: 'ISO 9001',
    title: 'Sistema Qualità Certificato',
    detail: 'Processi tracciati e verificati su ogni cantiere pubblico e privato.',
  },
  {
    code: 'Albo Gestori Ambientali',
    title: 'Trasporto & Gestione Rifiuti',
    detail: 'Iscrizione ufficiale per sgomberi, recupero e conferimento normato.',
  },
  {
    code: 'Albo Forestale Sardegna',
    title: 'Impresa Forestale Regionale',
    detail: 'Abilitazione per manutenzione boschiva, verde urbano e prevenzione incendi.',
  },
  {
    code: 'Coop. Sociale Tipo B',
    title: 'Inserimento Lavorativo & LavoRas',
    detail: 'Attivazione nuovi cantieri LavoRas per Comuni e percorsi inclusivi qualificati.',
  },
];

export const QUALITY_PILLARS: QualityPillar[] = [
  {
    id: 'lavoras',
    code: '01',
    title: 'Cantieri LavoRas & Comuni',
    subtitle: 'Nuove attivazioni e gestione integrata in Sardegna',
    description:
      'Affianchiamo Comuni ed Enti Pubblici nella progettazione operativa, attivazione e conduzione completa dei cantieri LavoRas. Come Cooperativa Sociale di Tipo B garantiamo l’inserimento lavorativo strutturato di persone svantaggiate, affiancate da capisquadra tecnici e tutor dedicati.',
    deliverables: [
      'Avvio rapido di nuovi cantieri occupazionali comunali',
      'Tutoraggio operativo e inserimento lavorativo certificato (L. 381/91)',
      'Fornitura completa di DPI, attrezzature e rendicontazione per l’Ente',
      'Manutenzione patrimonio pubblico, verde urbano e decoro cittadino',
    ],
  },
  {
    id: 'cam-ecolabel',
    code: '02',
    title: 'Criteri CAM & Prodotti Ecolabel',
    subtitle: 'Sostenibilità ambientale misurabile su ogni intervento',
    description:
      'Ogni protocollo operativo Recyclean rispetta rigorosamente i Criteri Ambientali Minimi (CAM) per gli appalti pubblici verdi e utilizza esclusivamente detergenti e formulati certificati Ecolabel UE, riducendo l’impatto idrico e chimico in cliniche, scuole, alberghi ed edifici comunali.',
    deliverables: [
      'Schede tecniche e conformità CAM per gare e affidamenti pubblici',
      'Chimica biodegradabile certificata Ecolabel UE ad alta efficacia',
      'Riduzione dei consumi idrici grazie a sistemi a vapore e microfibra calibrata',
      'Flotta operativa e attrezzature a batteria a basse emissioni acustiche',
    ],
  },
  {
    id: 'ai-tech',
    code: '03',
    title: 'Tecnologie Avanzate & IA',
    subtitle: 'Pianificazione intelligente e controllo qualità digitale',
    description:
      'Integriamo sistemi di Intelligenza Artificiale per l’ottimizzazione dei percorsi di raccolta e sgombero, la programmazione predittiva degli interventi di manutenzione e la verifica fotografica geo-localizzata dello stato dei cantieri prima e dopo l’esecuzione.',
    deliverables: [
      'Ottimizzazione algoritmica di turni, squadre e logistica mezzi',
      'Reportistica digitale in tempo reale per RUP, Direttori Lavori e privati',
      'Tracciamento puntuale dei formulari rifiuti e dei volumi avviati a recupero',
      'Controllo qualità certificato ISO 9001 con checklist digitali di cantiere',
    ],
  },
  {
    id: 'team-formazione',
    code: '04',
    title: 'Personale Qualificato e Formato',
    subtitle: 'Competenze certificate, sicurezza e discrezione operativa',
    description:
      'La qualità del risultato nasce dalla preparazione delle persone. Ogni operatore Recyclean segue percorsi obbligatori su sicurezza D.Lgs. 81/08, protocolli di sanificazione sanitaria, tecniche forestali e gestione etica negli ambienti sensibili.',
    deliverables: [
      'Formazione continua su rischio biologico, chimico e lavori in quota',
      'Squadre dedicate per cliniche sanitarie, strutture ricettive e residenze',
      'Protocolli di riservatezza per guardiania non armata e assistenza anziani',
      'Supervisione costante di preposti e coordinatori tecnici sul campo',
    ],
  },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'pulizie-sanificazioni',
    index: '01',
    title: 'Pulizie, Igienizzazione e Sanificazione',
    category: 'Pulizie & Sanificazione',
    shortDescription:
      'Interventi ordinari, sanificazioni certificate e sgrossature post-cantiere per Comuni, cliniche, alberghi e privati.',
    fullDescription:
      'Protocolli su misura ad altissimo standard igienico per strutture sanitarie, cliniche private, hotel, uffici comunali e abitazioni. Eseguiamo sanificazioni con vapore saturo e presidi medico-chirurgici a basso impatto ambientale (CAM ed Ecolabel), oltre a sgrossature profonde post-cantiere per la consegna immediata di nuovi immobili.',
    imageUrl: '/assets/services/pulizie-sanificazioni.jpg',
    imageAlt: 'Specialista Recyclean esegue sanificazione a vapore in struttura moderna',
    highlights: [
      'Sgrossature post-cantiere e ripristino vetrate e pavimentazioni pregiate',
      'Sanificazione certificata per cliniche, ambulatori, hotel e B&B',
      'Protocolli CAM ed Ecolabel UE con tracciabilità ISO 9001',
    ],
    targetClients: ['Comuni ed Enti', 'Cliniche e Studi Medici', 'Alberghi e Resort', 'Privati e Imprese'],
    certifications: ['ISO 9001', 'Conformità CAM', 'Ecolabel UE'],
  },
  {
    id: 'verde-forestale',
    index: '02',
    title: 'Manutenzione Verde & Ingegneria Forestale',
    category: 'Verde & Forestale',
    shortDescription:
      'Cura parchi comunali, potature, sfalci antincendio e cantieri iscritti all’Albo Forestali della Regione Sardegna.',
    fullDescription:
      'Squadre specializzate nella progettazione, manutenzione e rigenerazione del verde pubblico, aziendale e condominiale. L’iscrizione all’Albo delle Imprese Forestali della Regione Sardegna ci abilita a interventi boschivi, fasce tagliafuoco, arboricoltura e cantieri LavoRas dedicati al patrimonio ambientale sardo.',
    imageUrl: '/assets/services/verde-forestale.jpg',
    imageAlt: 'Squadra forestale Recyclean in manutenzione verde e potatura pini in Sardegna',
    highlights: [
      'Sfalci, decespugliamento e messa in sicurezza fasce antincendio',
      'Potatura alberature ad alto fusto e recupero parchi comunali',
      'Cippature e valorizzazione sostenibile delle biomasse vegetali',
    ],
    targetClients: ['Comuni della Sardegna', 'Resort e Campeggi', 'Consorzi e Privati'],
    certifications: ['Albo Forestali Sardegna', 'ISO 9001', 'Cantieri LavoRas'],
  },
  {
    id: 'sgomberi-rifiuti',
    index: '03',
    title: 'Gestione Rifiuti, Sgomberi e Trasporti',
    category: 'Ambiente & Sgomberi',
    shortDescription:
      'Sgomberi completi, bonifica locali, raccolta differenziata e trasporto rifiuti con Albo Nazionale Gestori Ambientali.',
    fullDescription:
      'Servizio rapido e completamente tracciato per lo sgombero di cantine, capannoni industriali, uffici pubblici, archivi e cantieri edili. Operiamo in piena conformità normativa grazie all’iscrizione all’Albo Nazionale Gestori Ambientali, garantendo il corretto conferimento, il recupero dei materiali e il trasporto dedicato.',
    imageUrl: '/assets/services/sgomberi-rifiuti.jpg',
    imageAlt: 'Spazio commerciale completamente sgomberato e bonificato',
    highlights: [
      'Sgomberi civili, commerciali e industriali chiavi in mano',
      'Trasporto rifiuti autorizzato con emissione e tracciamento formulari',
      'Pianificazione logistica supportata da algoritmi di ottimizzazione IA',
    ],
    targetClients: ['Imprese Edili', 'Enti Pubblici', 'Aziende', 'Privati'],
    certifications: ['Albo Nazionale Gestori Ambientali', 'ISO 9001'],
  },
  {
    id: 'facility-management',
    index: '04',
    title: 'Facility Management & Cantieri LavoRas',
    category: 'Facility & Logistica',
    shortDescription:
      'Gestione integrata di immobili, manutenzioni multiservizio e attivazione di nuovi cantieri LavoRas per Enti.',
    fullDescription:
      'Un unico interlocutore affidabile per la gestione tecnica, igienica e operativa di complessi direzionali, scuole, municipi e strutture ricettive. Progettiamo e gestiamo inoltre l’attivazione di nuovi cantieri LavoRas e percorsi di inserimento lavorativo in qualità di Cooperativa Sociale di Tipo B.',
    imageUrl: '/assets/services/facility-management.jpg',
    imageAlt: 'Coordinatori Recyclean presso complesso immobiliare e parco curato',
    highlights: [
      'Regia unica per pulizie, verde, piccola manutenzione e presidio',
      'Attivazione e conduzione cantieri LavoRas con inserimento Tipo B',
      'Monitoraggio digitale SLA e audit qualità periodici',
    ],
    targetClients: ['Comuni e Province', 'Complessi Direzionali', 'Strutture Sanitarie'],
    certifications: ['Coop. Sociale Tipo B', 'ISO 9001', 'Cantieri LavoRas'],
  },
  {
    id: 'facchinaggio-logistica',
    index: '05',
    title: 'Facchinaggio, Movimentazione Merci e Trasporti',
    category: 'Facility & Logistica',
    shortDescription:
      'Carico, scarico, allestimenti, traslochi aziendali e movimentazione merci con personale qualificato e assicurato.',
    fullDescription:
      'Squadre organizzate per attività di facchinaggio interno ed esterno, movimentazione pallet, gestione magazzini, traslochi di uffici comunali e aziende, oltre al trasporto merci dedicato su tutto il territorio regionale con mezzi attrezzati e personale formato sulla sicurezza.',
    imageUrl: '/assets/services/facchinaggio-logistica.jpg',
    imageAlt: 'Operatori logistici Recyclean movimentano merci su transpallet elettrico',
    highlights: [
      'Movimentazione merci con attrezzature elettriche silenziose',
      'Traslochi di archivi pubblici, uffici, alberghi e magazzini',
      'Flessibilità turni e copertura picchi stagionali in Sardegna',
    ],
    targetClients: ['Aziende Logistiche', 'GDO e Retail', 'Hotel', 'Enti Pubblici'],
    certifications: ['ISO 9001', 'Sicurezza D.Lgs. 81/08'],
  },
  {
    id: 'guardiania-assistenza',
    index: '06',
    title: 'Guardiania Non Armata & Assistenza Anziani',
    category: 'Servizi alla Persona & Guardiania',
    shortDescription:
      'Portierato fiduciario, custodia sedi e cantieri, insieme a servizi dedicati di supporto e assistenza agli anziani.',
    fullDescription:
      'Uniamo il presidio affidabile degli spazi alla cura delle persone. Offriamo servizi di guardiania non armata, controllo accessi e custodia notturna/diurna per cantieri, hotel ed edifici pubblici; parallelamente garantiamo assistenza qualificata agli anziani, supporto domiciliare, accompagnamento e igiene ambientale dedicata.',
    imageUrl: '/assets/services/guardiania-assistenza.jpg',
    imageAlt: 'Area civica sorvegliata e curata per il benessere della comunità',
    highlights: [
      'Guardiania non armata, portierato e controllo varchi per cantieri e sedi',
      'Assistenza agli anziani attenta, umana e con personale selezionato',
      'Integrazione tra cura domestica, sicurezza e decoro degli spazi',
    ],
    targetClients: ['Famiglie e Privati', 'Cantieri Pubblici', 'Comuni', 'Strutture Residenziali'],
    certifications: ['Coop. Sociale Tipo B', 'ISO 9001'],
  },
];

export const DEFAULT_BEFORE_AFTER_PROJECTS: BeforeAfterProject[] = [
  {
    id: 'sgrossatura-polo-cagliari',
    title: 'Sgrossatura Post-Cantiere & Ripristino Vetrate',
    location: 'Cagliari · Polo Direzionale',
    category: 'Pulizie & Sanificazione',
    description:
      'Rimozione completa di residui edili, polveri sottili, imballaggi e aloni da superfici vetrate a tutta altezza con sgombero certificato e lucidatura finale ecologica CAM.',
    beforeImageUrl: '/src/assets/images/before_cantiere_sgrossatura_1794932146596.jpg',
    afterImageUrl: '/src/assets/images/after_cantiere_sgrossatura_1794932147031.jpg',
    beforeLabel: 'Prima · Fine Cantiere',
    afterLabel: 'Dopo · Consegna Recyclean',
    metrics: '1.850 mq bonificati e sanificati in 72 ore',
  },
  {
    id: 'riqualificazione-lavoras-parco',
    title: 'Riqualificazione Parco Urbano — Cantiere LavoRas',
    location: 'Sardegna · Area Verde Comunale',
    category: 'Verde & Forestale',
    description:
      'Intervento di ripristino integrale eseguito da squadra forestale e lavoratori inseriti tramite cantiere LavoRas: decespugliamento antincendio, potature selettive e recupero percorsi pedonali.',
    beforeImageUrl: '/src/assets/images/before_parco_abbandonato_1794932146981.jpg',
    afterImageUrl: '/src/assets/images/after_parco_riqualificato_1794932148264.jpg',
    beforeLabel: 'Prima · Area Incolta',
    afterLabel: 'Dopo · Cantiere LavoRas',
    metrics: '4.200 mq recuperati · 6 inserimenti lavorativi Tipo B',
  },
  {
    id: 'sanificazione-struttura-ricettiva',
    title: 'Sgombero, Sanificazione & Allestimento Struttura',
    location: 'Olbia · Struttura Ricettiva & Clinica',
    category: 'Ambiente & Sgomberi',
    description:
      'Sgombero rapido delle aree di servizio, movimentazione arredi con squadra facchinaggio e sanificazione profonda a vapore saturo conforme ai protocolli CAM ed Ecolabel.',
    beforeImageUrl: '/src/assets/images/before_cantiere_sgrossatura_1794932146596.jpg',
    afterImageUrl: '/src/assets/images/service_sanificazione_1794932145530.jpg',
    beforeLabel: 'Prima · Ristrutturazione',
    afterLabel: 'Dopo · Sanificato Ecolabel',
    metrics: '100% conformità audit igienico-sanitario',
  },
];

export const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Ing. Matteo Sanna',
    role: 'Responsabile Area Tecnica',
    organization: 'Ente Locale Provincia di Cagliari',
    sector: 'Cantieri LavoRas & Verde Pubblico',
    rating: 5,
    beforeContext: 'Aree verdi periferiche soggette a degrado e necessità di attivare un cantiere LavoRas rapido.',
    outcome: 'Cantiere avviato nei tempi previsti, 8 operatori formati e parchi restituiti alla cittadinanza.',
    quote:
      'Recyclean ha gestito l’attivazione del nostro cantiere LavoRas con rigore amministrativo e qualità tecnica impeccabile. La sinergia tra squadra forestale e inserimento sociale di Tipo B ha prodotto risultati concreti e misurabili.',
    date: 'Ottobre 2026',
  },
  {
    id: 'rev-2',
    authorName: 'Dott.ssa Chiara Melis',
    role: 'Direttrice Sanitaria',
    organization: 'Poliambulatorio Medico San Lorenzo',
    sector: 'Sanificazione Cliniche & Protocolli CAM',
    rating: 5,
    beforeContext: 'Esigenza di protocolli certificati a basso impatto chimico per sale mediche e aree attesa.',
    outcome: 'Zero non conformità negli audit igienici e riduzione sensibile degli odori chimici residui.',
    quote:
      'Personale discreto, puntuale e formato sulle procedure sanitarie. L’uso di prodotti Ecolabel e la tracciabilità digitale degli interventi ci garantiscono tranquillità quotidiana per pazienti e medici.',
    date: 'Settembre 2026',
  },
  {
    id: 'rev-3',
    authorName: 'Lorenzo Fadda',
    role: 'Direttore Operativo',
    organization: 'Costa Smeralda Hospitality Group',
    sector: 'Pulizie Alberghi, Sgrossature & Facchinaggio',
    rating: 5,
    beforeContext: 'Tempi stretti tra fine lavori di ristrutturazione e apertura stagionale della struttura.',
    outcome: 'Sgrossatura completa di 64 camere e hall completata con 48 ore di anticipo sull’inaugurazione.',
    quote:
      'Dalla sgrossatura post-cantiere fino alla movimentazione degli arredi e alla guardiania non armata notturna, avere un unico partner certificato ISO 9001 ha fatto la differenza.',
    date: 'Agosto 2026',
  },
  {
    id: 'rev-4',
    authorName: 'Elena Piras',
    role: 'Responsabile Logistica',
    organization: 'Centro Distribuzione Tirreno',
    sector: 'Sgomberi, Rifiuti & Movimentazione Merci',
    rating: 5,
    beforeContext: 'Accumulo di imballaggi industriali e necessità di supporto facchinaggio su picchi settimanali.',
    outcome: 'Magazzino sgomberato, tracciabilità rifiuti al 100% e continuità operativa senza fermi.',
    quote:
      'Rapidità di intervento e massima trasparenza sui formulari grazie all’iscrizione all’Albo Gestori Ambientali. Un’impresa moderna che unisce efficienza industriale e valore sociale.',
    date: 'Luglio 2026',
  },
];
