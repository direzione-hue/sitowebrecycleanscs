import {useState} from 'react';
import {ArrowUpRight, CheckCircle2} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {QUALITY_PILLARS} from '../data/recyclenaData';

interface QualityLavorasSectionProps {
  onSelectLavorasQuote: () => void;
}

export function QualityLavorasSection({onSelectLavorasQuote}: QualityLavorasSectionProps) {
  const [activePillarId, setActivePillarId] = useState<string>(QUALITY_PILLARS[0].id);

  const activePillar =
    QUALITY_PILLARS.find((pillar) => pillar.id === activePillarId) ?? QUALITY_PILLARS[0];

  return (
    <section
      id="qualita-lavoras"
      className="py-20 lg:py-28 bg-[#0F1A15] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#6EE7B7] mb-3">
                Qualità, LavoRas & Inserimento Lavorativo
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                Efficienza operativa e valore sociale per la Sardegna.
              </h2>
            </div>

            <p className="text-base text-[#C4D1CA] leading-relaxed">
              Come Cooperativa Sociale di Tipo B iscritta agli Albi nazionali e regionali,
              affianchiamo le amministrazioni comunali nell’attivazione di nuovi cantieri LavoRas e
              garantiamo alle imprese private prestazioni misurabili, sostenibili e supportate da
              tecnologie intelligenti.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums">
                  ISO 9001
                </div>
                <p className="text-xs text-[#9FB0A7] mt-1">
                  Gestione qualità certificata su appalti pubblici e privati
                </p>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#6EE7B7] tabular-nums">
                  100% CAM
                </div>
                <p className="text-xs text-[#9FB0A7] mt-1">
                  Protocolli conformi ai Criteri Ambientali Minimi ed Ecolabel
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onSelectLavorasQuote}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F1A15] bg-[#6EE7B7] hover:bg-[#A7F3D0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7]"
              >
                <span>Attiva un Cantiere LavoRas</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              role="tablist"
              aria-label="Pilastri qualità e LavoRas"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {QUALITY_PILLARS.map((pillar) => {
                const isActive = pillar.id === activePillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActivePillarId(pillar.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7] ${
                      isActive
                        ? 'bg-[#172820] border-[#6EE7B7]/60 text-white'
                        : 'bg-[#13201A] border-white/10 text-[#B8C7BF] hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-mono text-xs text-[#6EE7B7] tabular-nums">
                        {pillar.code}
                      </span>
                    </div>
                    <div className="font-display text-base font-semibold leading-snug">
                      {pillar.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl bg-[#17251E] border border-white/12 p-6 sm:p-8 min-h-[290px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -8}}
                  transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                  className="space-y-5"
                >
                  <div>
                    <p className="text-xs font-medium text-[#6EE7B7] mb-1">
                      {activePillar.code}. {activePillar.subtitle}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {activePillar.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#D1DDD6] leading-relaxed">
                    {activePillar.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    {activePillar.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#E4ECE7]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
