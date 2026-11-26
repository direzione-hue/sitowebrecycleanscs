import {useRef} from 'react';
import {ArrowDownRight, ArrowRight} from 'lucide-react';
import {motion, useScroll, useTransform} from 'motion/react';
import {CERTIFICATIONS_STRIP, HERO_IMAGE_URL} from '../data/recyclenaData';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  onRequestQuote: () => void;
}

export function HeroSection({onRequestQuote}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative bg-[#0F1A15] text-white overflow-hidden"
    >
      <div className="relative min-h-[600px] lg:min-h-[680px] flex items-end">
        <motion.div
          style={{scale: mediaScale, y: mediaY}}
          className="absolute inset-0 will-change-transform"
        >
          <ResilientImage
            src={HERO_IMAGE_URL}
            alt="Team Recyclean con veicolo elettrico presso struttura e parco mediterraneo in Sardegna"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0A130F] via-[#0A130F]/60 to-[#0A130F]/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0A130F]/88 via-[#0A130F]/38 to-transparent"
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-14 lg:pb-16">
          <motion.div
            initial={{opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-medium text-[#A7F3D0] tracking-wide mb-3 sm:mb-4">
              Sardegna · Cooperativa Sociale di Tipo B · Servizi Ambientali & Facility Management
            </p>

            <h1 className="font-display text-[2.1rem] sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance] mb-4 sm:mb-5">
              Servizi ambientali, igiene e gestione cantieri ad alta precisione.
            </h1>

            <p className="text-base sm:text-lg text-[#D5DFD9] leading-relaxed max-w-2xl mb-8">
              Affianchiamo Comuni, cliniche, strutture alberghiere, aziende e privati con
              protocolli certificati ISO 9001, prodotti CAM ed Ecolabel, tecnologie di
              Intelligenza Artificiale e squadre qualificate per l’inserimento lavorativo.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#146C43] hover:bg-[#198754] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Richiedi un Sopralluogo</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#prima-dopo"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/18 border border-white/20 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Esplora Prima & Dopo</span>
                <ArrowDownRight className="w-4 h-4 text-[#A7F3D0]" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/12 bg-[#111D17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {CERTIFICATIONS_STRIP.map((cert) => (
              <div
                key={cert.code}
                className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r last:border-r-0 border-white/10 pb-4 sm:pb-0 sm:pr-6 last:pr-0"
              >
                <span className="font-mono text-xs font-semibold text-[#6EE7B7] tracking-wide">
                  {cert.code}
                </span>
                <h2 className="font-display text-sm font-semibold text-white">
                  {cert.title}
                </h2>
                <p className="text-xs text-[#AEBDB5] leading-relaxed">{cert.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
