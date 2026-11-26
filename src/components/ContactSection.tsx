import {useEffect, useState} from 'react';
import {ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, ShieldCheck} from 'lucide-react';
import type {
  QuoteFormData,
  QuoteFormErrors,
  RequesterType,
  ServiceItem,
} from '../types/recyclena';
import {validateQuoteForm} from '../utils/portfolioLogic';

interface ContactSectionProps {
  services: ServiceItem[];
  preselectedServiceId: string;
  onOpenCustomerService: () => void;
}

const REQUESTER_TYPES: RequesterType[] = [
  'Comune / Ente Pubblico',
  'Azienda / Hotel / Clinica',
  'Privato',
];

export function ContactSection({
  services,
  preselectedServiceId,
  onOpenCustomerService,
}: ContactSectionProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    requesterType: 'Comune / Ente Pubblico',
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceId: preselectedServiceId || services[0]?.id || '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [submittedRequest, setSubmittedRequest] = useState<QuoteFormData | null>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({...prev, serviceId: preselectedServiceId}));
    }
  }, [preselectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateQuoteForm(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setSubmittedRequest(formData);
  };

  const selectedServiceTitle =
    services.find((s) => s.id === (submittedRequest?.serviceId ?? formData.serviceId))
      ?.title ?? 'Servizio personalizzato';

  return (
    <section
      id="contatti"
      className="py-20 lg:py-28 bg-white text-[#111A15] border-t border-[#111A15]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#146C43] mb-2">
                Contatti & Preventivi Rapidi
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111A15] [text-wrap:balance]">
                Pianifichiamo il tuo prossimo intervento o cantiere LavoRas.
              </h2>
            </div>

            <p className="text-base text-[#49554E] leading-relaxed">
              Effettuiamo sopralluoghi tecnici gratuiti in tutta la Sardegna per amministrazioni
              comunali, strutture sanitarie, alberghi, aziende logistiche e privati.
            </p>

            <div className="space-y-4 pt-2 border-t border-[#111A15]/10">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-[#546159]">Direzione Operativa</div>
                  <a
                    href="mailto:info@recycleanscs.it"
                    className="text-sm font-semibold text-[#111A15] hover:text-[#146C43]"
                  >
                    info@recycleanscs.it
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#546159]">
                    Servizio Clienti & WhatsApp Operatrice Dedicata
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono font-semibold text-[#111A15]">
                    <a href="tel:+393341935821" className="hover:text-[#146C43]">
                      +39 334 193 5821
                    </a>
                  </div>
                  <p className="text-xs text-[#49554E] flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#146C43] shrink-0" aria-hidden="true" />
                    <span>Assistenza attiva su WhatsApp con operatrice dedicata disponibile</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-[#546159]">Area Operativa</div>
                  <div className="text-sm font-medium text-[#111A15]">
                    Tutto il territorio della Regione Sardegna
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-[#546159]">
                    Qualifiche & Abilitazioni
                  </div>
                  <div className="text-sm text-[#3F4A43]">
                    ISO 9001 · Albo Nazionale Gestori Ambientali · Albo Imprese Forestali Regione
                    Sardegna · Cooperativa Sociale di Tipo B
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenCustomerService}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#146C43] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#146C43]/20 rounded-lg transition-colors cursor-pointer"
              >
                <span>Apri Pagina Numeri Utili & Chat WhatsApp</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F6F7F5] border border-[#111A15]/10 rounded-2xl p-6 sm:p-8">
            {submittedRequest ? (
              <div role="status" className="space-y-5 py-6">
                <div className="flex items-center gap-3 text-[#146C43]">
                  <CheckCircle2 className="w-7 h-7 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold text-[#111A15]">
                    Richiesta registrata correttamente
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#3F4A43] leading-relaxed">
                  Grazie <strong>{submittedRequest.name}</strong>. La direzione tecnica di
                  Recyclean analizzerà la richiesta per{' '}
                  <strong>{selectedServiceTitle}</strong> ({submittedRequest.location}) e ti
                  risponderà all’indirizzo <strong>{submittedRequest.email}</strong>.
                </p>
                <div className="bg-white rounded-xl border border-[#111A15]/10 p-4 text-xs sm:text-sm text-[#49554E] space-y-1">
                  <div>
                    <span className="font-semibold text-[#111A15]">Tipologia: </span>
                    <span>{submittedRequest.requesterType}</span>
                  </div>
                  {submittedRequest.organization && (
                    <div>
                      <span className="font-semibold text-[#111A15]">Ente / Azienda: </span>
                      <span>{submittedRequest.organization}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-[#111A15]">Telefono: </span>
                    <span className="font-mono">{submittedRequest.phone}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRequest(null);
                    setFormData((prev) => ({
                      ...prev,
                      name: '',
                      organization: '',
                      email: '',
                      phone: '',
                      location: '',
                      message: '',
                    }));
                  }}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg cursor-pointer"
                >
                  Invia una nuova richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <span className="block text-xs font-semibold text-[#3F4A43] mb-2">
                    Tipologia di richiedente
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {REQUESTER_TYPES.map((type) => {
                      const active = formData.requesterType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({...prev, requesterType: type}))
                          }
                          className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#111A15] text-white border-[#111A15]'
                              : 'bg-white text-[#3F4A43] border-[#111A15]/15 hover:border-[#111A15]/35'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                    >
                      Nome e Cognome *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                      placeholder="Es. Marco Serra"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                    {errors.name && <p className="text-xs text-[#991B1B] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-org"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                    >
                      Comune, Azienda o Struttura
                    </label>
                    <input
                      id="quote-org"
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData((prev) => ({...prev, organization: e.target.value}))
                      }
                      placeholder="Es. Comune di / Hotel / Clinica"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({...prev, email: e.target.value}))}
                      placeholder="nome@ente.it"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#991B1B] mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                    >
                      Telefono *
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({...prev, phone: e.target.value}))}
                      placeholder="+39 340 0000000"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#991B1B] mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-service"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                    >
                      Servizio di interesse
                    </label>
                    <select
                      id="quote-service"
                      value={formData.serviceId}
                      onChange={(e) =>
                        setFormData((prev) => ({...prev, serviceId: e.target.value}))
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-location"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                    >
                      Comune / Località intervento *
                    </label>
                    <input
                      id="quote-location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({...prev, location: e.target.value}))
                      }
                      placeholder="Es. Cagliari, Olbia, Sassari..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                    {errors.location && (
                      <p className="text-xs text-[#991B1B] mt-1">{errors.location}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-message"
                    className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                  >
                    Dettagli della richiesta *
                  </label>
                  <textarea
                    id="quote-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({...prev, message: e.target.value}))}
                    placeholder="Indica metrature orientative, frequenza, attivazione cantiere LavoRas o tempistiche..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                  />
                  {errors.message && (
                    <p className="text-xs text-[#991B1B] mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm sm:text-base font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43]"
                >
                  Invia Richiesta di Sopralluogo e Preventivo
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
