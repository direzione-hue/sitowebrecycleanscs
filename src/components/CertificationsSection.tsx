import {ArrowRight} from 'lucide-react';
import {motion} from 'motion/react';

interface CertificationsSectionProps {
  onRequestDocs: () => void;
}

function Iso9001BadgeLogo() {
  return (
    <img
      src="/assets/aistudio/iso9001-color__2__f09dea8b.png"
      alt="Logo Certificazione ISO 9001"
      referrerPolicy="no-referrer"
      className="w-14 h-14 object-contain"
    />
  );
}

function AlboAmbientaleBadgeLogo() {
  return (
    <img
      src="/assets/loghi/albo-nazionale-gestori-ambientali.png"
      alt="Logo Albo Nazionale Gestori Ambientali"
      referrerPolicy="no-referrer"
      className="w-14 h-14 object-contain"
    />
  );
}

function AlboForestaleBadgeLogo() {
  return (
    <img
      src="/assets/loghi/albo-forestale.png"
      alt="Logo Regione Autonoma della Sardegna - Albo Forestale"
      referrerPolicy="no-referrer"
      className="w-14 h-14 object-contain"
    />
  );
}

function CriteriCamBadgeLogo() {
  return (
    <img
      src="/assets/loghi/criteri-cam.png"
      alt="Logo CAM - Criteri Ambientali Minimi"
      referrerPolicy="no-referrer"
      className="w-14 h-14 object-contain"
    />
  );
}

function EcolabelBadgeLogo() {
  return (
    <img
      src="/assets/loghi/ecolabel.png"
      alt="Logo EU Ecolabel"
      referrerPolicy="no-referrer"
      className="w-14 h-14 object-contain"
    />
  );
}

function AiOptimizationBadgeLogo() {
  return (
    <img
      src="/assets/aistudio/Screenshot_2026-11-17_175559_ab719e45.png"
      alt="Logo AI-Driven Predictive Optimization"
      referrerPolicy="no-referrer"
      className="w-14 h-14 object-contain rounded-lg bg-white p-0.5"
    />
  );
}

const TRUSTED_CERTIFICATIONS = [
  {
    id: 'iso-9001',
    code: 'Certificazione Qualità',
    title: 'ISO 9001',
    subtitle: 'Sistema di Gestione per la Qualità',
    description:
      'Ogni appalto pubblico e privato segue procedure operative verificate, audit periodici e tracciabilità digitale delle prestazioni in cantiere.',
    tags: ['Audit Periodici', 'Processi Tracciati', 'Standard CAM'],
    renderLogo: () => <Iso9001BadgeLogo />,
  },
  {
    id: 'albo-gestori-ambientali',
    code: 'Abilitazione Ambientale',
    title: 'Albo Nazionale Gestori Ambientali',
    subtitle: 'Trasporto, Sgomberi & Avvio a Recupero',
    description:
      'Iscrizione ufficiale per la gestione e il trasporto autorizzato dei rifiuti provenienti da sgomberi civili, industriali, cantieri edili e strutture sanitarie.',
    tags: ['Trasporto Autorizzato', 'Formulari Tracciati', 'Recupero Rifiuti'],
    renderLogo: () => <AlboAmbientaleBadgeLogo />,
  },
  {
    id: 'albo-forestale-sardegna',
    code: 'Qualifica Regionale',
    title: 'Albo Forestale Regione Sardegna',
    subtitle: 'Impresa Forestale & Manutenzione Verde',
    description:
      'Abilitazione regionale per interventi boschivi, manutenzione parchi comunali, potature ad alto fusto, fasce antincendio e cantieri LavoRas.',
    tags: ['Regione Sardegna', 'Verde & Boschivo', 'Cantieri LavoRas'],
    renderLogo: () => <AlboForestaleBadgeLogo />,
  },
  {
    id: 'criteri-cam',
    code: 'Appalti Verdi PA',
    title: 'Criteri CAM',
    subtitle: 'Criteri Ambientali Minimi Ministeriali',
    description:
      'Piena conformità alle specifiche tecniche ministeriali per pulizie civili e sanitarie, gestione del verde pubblico e acquisti sostenibili nelle gare d’appalto.',
    tags: ['Decreto CAM', 'Gare Pubbliche', 'Basso Impatto'],
    renderLogo: () => <CriteriCamBadgeLogo />,
  },
  {
    id: 'ecolabel-ue',
    code: 'Marchio Europeo',
    title: 'Ecolabel UE',
    subtitle: 'Prodotti & Protocolli Certificati',
    description:
      'Impiego sistematico di detergenti concentrati, dosatori automatici e materiali certificati Ecolabel UE per garantire sicurezza chimica in cliniche, hotel e scuole.',
    tags: ['Ecolabel UE', 'Chimica Sicura', 'Dosaggio Controllato'],
    renderLogo: () => <EcolabelBadgeLogo />,
  },
  {
    id: 'ai-predictive-optimization',
    code: 'Tecnologia & IA',
    title: 'AI-Driven Predictive Optimization',
    subtitle: 'Pianificazione Predittiva & Controllo SLA',
    description:
      'Algoritmi di Intelligenza Artificiale per ottimizzare turnazioni, percorsi dei mezzi, carichi di cantiere e manutenzione preventiva con reportistica digitale in tempo reale.',
    tags: ['Analisi Predittiva', 'Ottimizzazione Rotte', 'Report SLA'],
    renderLogo: () => <AiOptimizationBadgeLogo />,
  },
];

export function CertificationsSection({onRequestDocs}: CertificationsSectionProps) {
  return (
    <section
      id="certificazioni"
      aria-labelledby="certifications-heading"
      className="py-16 lg:py-22 bg-[#F6F7F5] text-[#111A15] border-b border-[#111A15]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#146C43] mb-2">
              Certificazioni, Albi & Idoneità Tecnica
            </p>
            <h2
              id="certifications-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111A15] [text-wrap:balance]"
            >
              Qualifiche ufficiali verificate per Enti Pubblici e imprese.
            </h2>
          </div>

          <button
            type="button"
            onClick={onRequestDocs}
            className="inline-flex items-center gap-2 self-start lg:self-auto px-4 py-2.5 text-sm font-medium text-[#111A15] bg-white hover:bg-[#ECEFEA] border border-[#111A15]/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43]"
          >
            <span>Richiedi Visure e Attestati</span>
            <ArrowRight className="w-4 h-4 text-[#146C43]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUSTED_CERTIFICATIONS.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.35, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1]}}
              className="bg-white border border-[#111A15]/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F6F7F5] border border-[#111A15]/8 inline-flex items-center justify-center shrink-0">
                    {cert.renderLogo()}
                  </div>
                  <span className="font-mono text-xs font-medium text-[#546159]">
                    {cert.code}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#111A15] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-medium text-[#146C43] mt-1">
                    {cert.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#49554E] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#111A15]/8 text-xs text-[#546159]">
                {cert.tags.join(' · ')}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
