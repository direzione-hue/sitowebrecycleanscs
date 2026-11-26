import {useState} from 'react';
import {ArrowRight, Check, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {SERVICE_CATEGORIES} from '../data/recyclenaData';
import type {ServiceCategory, ServiceItem} from '../types/recyclena';
import {filterServicesByCategory} from '../utils/portfolioLogic';
import {ResilientImage} from './ResilientImage';

interface ServicesSectionProps {
  services: ServiceItem[];
  onRequestServiceQuote: (serviceId: string) => void;
}

export function ServicesSection({
  services,
  onRequestServiceQuote,
}: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Tutti');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const visibleServices = filterServicesByCategory(services, selectedCategory);

  return (
    <section id="servizi" className="py-20 lg:py-28 bg-[#F6F7F5] text-[#111A15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-[#146C43] mb-2">
            Servizi Operativi Certificati
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111A15] [text-wrap:balance]">
            Soluzioni integrate per Enti, imprese, strutture sanitarie e privati.
          </h2>
        </div>

        <div
          role="group"
          aria-label="Filtra servizi per categoria"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {SERVICE_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43] ${
                  isSelected
                    ? 'bg-[#111A15] text-white'
                    : 'bg-white text-[#3F4A43] border border-[#111A15]/12 hover:border-[#111A15]/30 hover:text-[#111A15]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service) => (
            <motion.article
              key={service.id}
              layout
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
              className="group bg-white border border-[#111A15]/10 rounded-xl overflow-hidden flex flex-col h-full"
            >
              <div className="relative overflow-hidden bg-[#17251E] aspect-[4/3] shrink-0">
                <ResilientImage
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  fallbackTitle={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-6 flex flex-col justify-between gap-5 flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#546159]">
                    <span className="font-mono font-semibold text-[#146C43] tabular-nums">
                      {service.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{service.category}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#111A15] leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#49554E] leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-medium text-[#546159]">
                    {service.certifications.join(' · ')}
                  </div>

                  <div className="pt-4 border-t border-[#111A15]/8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveService(service)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#146C43] hover:text-[#0F5232] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43]"
                    >
                      <span>Scheda servizio</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRequestServiceQuote(service.id)}
                      className="text-xs font-medium text-[#3F4A43] hover:text-[#111A15] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Richiedi preventivo
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{opacity: 0, scale: 0.97, y: 10}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.97, y: 10}}
              transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#111A15]/15"
            >
              <div className="aspect-[16/9] relative bg-[#17251E]">
                <ResilientImage
                  src={activeService.imageUrl}
                  alt={activeService.imageAlt}
                  fallbackTitle={activeService.title}
                />
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  aria-label="Chiudi scheda servizio"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-xs font-medium text-[#146C43] mb-1">
                    {activeService.index} · {activeService.category}
                  </p>
                  <h3
                    id="service-modal-title"
                    className="font-display text-2xl font-bold text-[#111A15]"
                  >
                    {activeService.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#3F4A43] leading-relaxed">
                  {activeService.fullDescription}
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-sm font-semibold text-[#111A15]">
                    Ambiti operativi principali
                  </h4>
                  <ul className="space-y-2">
                    {activeService.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#3F4A43]">
                        <Check
                          className="w-4 h-4 text-[#146C43] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#111A15]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#546159]">
                  <div>
                    <span className="font-semibold text-[#111A15] block mb-1">Destinatari</span>
                    <span>{activeService.targetClients.join(' · ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#111A15] block mb-1">
                      Certificazioni & Requisiti
                    </span>
                    <span>{activeService.certifications.join(' · ')}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveService(null)}
                    className="px-4 py-2.5 text-sm font-medium text-[#3F4A43] hover:text-[#111A15] rounded-lg border border-[#111A15]/15 cursor-pointer"
                  >
                    Chiudi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const id = activeService.id;
                      setActiveService(null);
                      onRequestServiceQuote(id);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Richiedi Preventivo</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
