import {useState} from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Headset,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  UserCheck,
} from 'lucide-react';
import {motion} from 'motion/react';
import {buildWhatsAppUrl, formatPhoneHref} from '../utils/portfolioLogic';

interface CustomerServicePageProps {
  onBackHome: () => void;
  onGoToQuoteForm: () => void;
}

interface DirectLine {
  id: string;
  badge: string;
  title: string;
  displayValue: string;
  href: string;
  whatsappPhone?: string;
  description: string;
  schedule: string;
  whatsappNote?: string;
}

const CUSTOMER_LINES: DirectLine[] = [
  {
    id: 'linea-1',
    badge: 'Linea 01 · Telefono & WhatsApp',
    title: 'Servizio Clienti & Assistenza Commerciale',
    displayValue: '+39 334 193 5821',
    href: formatPhoneHref('+39 334 193 5821'),
    whatsappPhone: '+39 334 193 5821',
    description:
      'Canale diretto per richieste di preventivo, sopralluoghi gratuiti, pulizie e sanificazioni per privati, strutture ricettive, cliniche e aziende.',
    schedule: 'Lun – Ven · 09:00 – 19:00',
    whatsappNote: 'Chat WhatsApp attiva con operatrice dedicata disponibile',
  },
  {
    id: 'linea-2',
    badge: 'Linea 02 · Telefono & WhatsApp',
    title: 'Coordinamento Cantieri, Enti & Urgenze',
    displayValue: '+39 392 096 3449',
    href: formatPhoneHref('+39 392 096 3449'),
    whatsappPhone: '+39 392 096 3449',
    description:
      'Supporto operativo per Comuni ed Enti Pubblici, cantieri LavoRas, manutenzione verde e forestale, sgomberi autorizzati, trasporti e logistica.',
    schedule: 'Lun – Ven · 09:00 – 19:00 (Reperibilità urgenze attiva)',
    whatsappNote: 'Chat WhatsApp attiva con operatrice dedicata disponibile',
  },
  {
    id: 'email-ufficiale',
    badge: 'Posta Elettronica Ufficiale',
    title: 'Richieste Info, Preventivi & Sopralluoghi',
    displayValue: 'info@recycleanscs.it',
    href: 'mailto:info@recycleanscs.it',
    description:
      'Canale dedicato esclusivamente a richieste di informazioni commerciali, elaborazione preventivi personalizzati e fissazione appuntamenti per sopralluoghi tecnici in tutta la Sardegna.',
    schedule: 'Lun – Ven · 09:00 – 19:00 · Risposta entro 4 ore',
  },
];

const WHATSAPP_TOPICS = [
  'Richiesta Preventivo o Sopralluogo Gratuito',
  'Attivazione Cantiere LavoRas / Enti Pubblici',
  'Pulizie, Sanificazione Cliniche, Hotel o Privati',
  'Sgomberi Autorizzati & Gestione Rifiuti',
  'Manutenzione Verde & Interventi Forestali',
  'Assistenza Clienti & Cantieri Attivi',
];

interface CustomerServiceReview {
  id: string;
  authorName: string;
  role: string;
  organization: string;
  channelUsed: string;
  rating: number;
  headline: string;
  quote: string;
  date: string;
}

const CUSTOMER_SERVICE_REVIEWS: CustomerServiceReview[] = [
  {
    id: 'cs-rev-1',
    authorName: 'Dott.ssa Federica Pinna',
    role: 'Direttrice Sanitaria',
    organization: 'Poliambulatorio San Michele · Cagliari',
    channelUsed: 'WhatsApp Operatrice Dedicata',
    rating: 5,
    headline: 'Risposta su WhatsApp in meno di 3 minuti, cortesia impeccabile.',
    quote:
      'Avevamo necessità di una sanificazione straordinaria urgente prima della riapertura del lunedì. Ho scritto su WhatsApp e l’operatrice dedicata ci ha risposto subito con grande gentilezza, organizzando il sopralluogo in giornata e risolvendo ogni dubbio.',
    date: 'Ottobre 2026',
  },
  {
    id: 'cs-rev-2',
    authorName: 'Ing. Matteo Dessì',
    role: 'Responsabile Ufficio Tecnico',
    organization: 'Comune del Campidano · Cantieri LavoRas',
    channelUsed: 'Linea 02 · +39 392 096 3449',
    rating: 5,
    headline: 'Coordinamento telefonico preciso, zero attese e massima serietà.',
    quote:
      'Collaboriamo con Recyclean su più cantieri comunali. Chiamando la Linea 2 troviamo sempre un interlocutore preparato che conosce già lo stato delle squadre e garantisce interventi rapidissimi. Un servizio clienti raro per affidabilità.',
    date: 'Settembre 2026',
  },
  {
    id: 'cs-rev-3',
    authorName: 'Chiara Sanna',
    role: 'General Manager',
    organization: 'Resort Costa Smeralda · Arzachena',
    channelUsed: 'Email info@recycleanscs.it · Preventivi',
    rating: 5,
    headline: 'Preventivo chiaro in 2 ore e sopralluogo gratuito puntuale.',
    quote:
      'Ho inviato una richiesta a info@recycleanscs.it per la pulizia stagionale e la cura del verde di tutta la struttura. In appena due ore ci hanno ricontattato per fissare il sopralluogo e consegnato un preventivo trasparente, senza costi nascosti.',
    date: 'Agosto 2026',
  },
  {
    id: 'cs-rev-4',
    authorName: 'Antonio Marras',
    role: 'Cliente Privato',
    organization: 'Quartu Sant’Elena',
    channelUsed: 'Linea 01 · +39 334 193 5821',
    rating: 5,
    headline: 'Operatrice gentilissima: mi ha guidato passo dopo passo per lo sgombero.',
    quote:
      'Non sapevo come gestire lo sgombero completo di un immobile di famiglia. Al telefono sul +39 334 193 5821 ho trovato un’operatrice paziente ed efficiente: ho mandato due foto su WhatsApp e il giorno dopo la squadra era già sul posto puntuale al minuto.',
    date: 'Ottobre 2026',
  },
];

export function CustomerServicePage({
  onBackHome,
  onGoToQuoteForm,
}: CustomerServicePageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>(WHATSAPP_TOPICS[0]);
  const [selectedWaPhone, setSelectedWaPhone] = useState<string>('+39 334 193 5821');
  const [customNote, setCustomNote] = useState<string>('');

  const handleCopy = async (id: string, value: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      }
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2200);
    } catch {
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2200);
    }
  };

  const guidedWhatsAppHref = buildWhatsAppUrl(selectedWaPhone, selectedTopic, customNote);

  return (
    <div id="numeri-utili" className="bg-[#F6F7F5] text-[#111A15]">
      <section className="bg-[#0F1A15] text-white border-b border-white/10 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#C4D1CA] hover:text-white transition-colors mb-8 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6EE7B7]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Torna alla Home Recyclean</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm font-medium text-[#6EE7B7]">
                Servizio Clienti & Contatti Diretti · Regione Sardegna
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] text-white [text-wrap:balance]">
                Numeri Utili e Assistenza Dedicata Recyclean.
              </h1>
              <p className="text-base sm:text-lg text-[#D5E0D9] max-w-2xl leading-relaxed">
                Metti in contatto il tuo Comune, la tua impresa o la tua abitazione con il nostro
                centro operativo. Oltre alle linee telefoniche ed email, è attiva l’assistenza
                rapida tramite chat su WhatsApp con operatrice dedicata disponibile.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/6 border border-white/15 rounded-xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#6EE7B7]">
                <UserCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Operatrice Dedicata WhatsApp</span>
              </div>
              <p className="text-xs sm:text-sm text-[#D5E0D9] leading-relaxed">
                Puoi inviarci messaggi, richieste di sopralluogo o fotografie dell’area di
                intervento su entrambi i numeri cellulari aziendali: una nostra operatrice
                dedicata risponde in chat in tempo reale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="recapiti-diretti-heading" className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#146C43] mb-1.5">
                Recapiti Ufficiali Recyclean
              </p>
              <h2
                id="recapiti-diretti-heading"
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111A15]"
              >
                Linee telefoniche dirette, WhatsApp ed email certificata.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#3F4A43] bg-white border border-[#111A15]/10 rounded-lg px-3.5 py-2">
              <Clock className="w-4 h-4 text-[#146C43]" aria-hidden="true" />
              <span>Attivi dal Lunedì al Venerdì · 09:00 – 19:00</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_LINES.map((line, idx) => {
              const isCopied = copiedId === line.id;
              const isEmail = line.id === 'email-ufficiale';

              return (
                <motion.article
                  key={line.id}
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.35, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1]}}
                  className="bg-white border border-[#111A15]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-medium text-[#546159]">
                        {line.badge}
                      </span>
                      <span className="w-9 h-9 rounded-lg bg-[#F6F7F5] border border-[#111A15]/10 inline-flex items-center justify-center shrink-0">
                        {isEmail ? (
                          <Mail className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                        ) : (
                          <Phone className="w-4 h-4 text-[#146C43]" aria-hidden="true" />
                        )}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-[#111A15]">
                        {line.title}
                      </h3>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="font-mono text-lg sm:text-xl font-bold text-[#111A15] tracking-tight break-all">
                          {line.displayValue}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopy(line.id, line.displayValue)}
                          aria-label={`Copia ${line.displayValue}`}
                          className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#111A15] bg-[#F6F7F5] hover:bg-[#E7ECE8] border border-[#111A15]/15 rounded-lg transition-colors shrink-0 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#146C43]" aria-hidden="true" />
                              <span>Copiato</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Copia</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-[#49554E] leading-relaxed">{line.description}</p>

                    {line.whatsappNote ? (
                      <div className="flex items-start gap-2.5 rounded-xl bg-[#ECFDF5] border border-[#146C43]/20 p-3 text-xs font-medium text-[#0F5232]">
                        <MessageCircle
                          className="w-4 h-4 text-[#146C43] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{line.whatsappNote}</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5 rounded-xl bg-[#EFF6FF] border border-[#1D4ED8]/20 p-3 text-xs font-medium text-[#1E3A8A]">
                        <ShieldCheck
                          className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>
                          Canale dedicato a richieste info, preventivi scritti e sopralluoghi gratuiti
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[#111A15]/10">
                    <div className="text-xs text-[#546159]">{line.schedule}</div>

                    <div
                      className={
                        line.whatsappPhone ? 'grid grid-cols-2 gap-2.5' : 'grid grid-cols-1'
                      }
                    >
                      <a
                        href={line.href}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-[#111A15] hover:bg-[#1E2B24] rounded-lg transition-colors whitespace-nowrap"
                      >
                        {isEmail ? (
                          <>
                            <Mail className="w-4 h-4" aria-hidden="true" />
                            <span>Scrivi Email</span>
                          </>
                        ) : (
                          <>
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            <span>Chiama Ora</span>
                          </>
                        )}
                      </a>

                      {line.whatsappPhone && (
                        <a
                          href={buildWhatsAppUrl(
                            line.whatsappPhone,
                            'Assistenza Servizio Clienti Recyclean',
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <section
            aria-labelledby="whatsapp-operatrice-heading"
            className="bg-white border border-[#111A15]/10 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#146C43]">
                <Headset className="w-4 h-4" aria-hidden="true" />
                <span>Assistenza Immediata WhatsApp</span>
              </div>
              <h2
                id="whatsapp-operatrice-heading"
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111A15]"
              >
                Chatta su WhatsApp con la nostra operatrice dedicata.
              </h2>
              <p className="text-sm sm:text-base text-[#49554E] leading-relaxed">
                Seleziona l’argomento della tua richiesta e la linea preferita: apriremo la chat
                WhatsApp già precompilata per metterti subito in contatto con l’operatrice dedicata
                Recyclean, senza attese telefoniche.
              </p>
              <ul className="space-y-2.5 text-sm text-[#3F4A43] pt-1">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Invio rapido di foto per stima sgomberi, pulizie o manutenzioni verdi</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Verifica immediata disponibilità squadre e sopralluoghi in Sardegna</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#146C43] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Aggiornamenti diretti sullo stato dei cantieri LavoRas e degli interventi</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 bg-[#F6F7F5] border border-[#111A15]/10 rounded-xl p-5 sm:p-6 space-y-4">
              <div>
                <label
                  htmlFor="wa-topic"
                  className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                >
                  Motivo del contatto
                </label>
                <select
                  id="wa-topic"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                >
                  {WHATSAPP_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#3F4A43] mb-1.5">
                  Numero WhatsApp Operatrice Dedicata
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {['+39 334 193 5821', '+39 392 096 3449'].map((num) => {
                    const active = selectedWaPhone === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSelectedWaPhone(num)}
                        className={`px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#111A15] text-white border-[#111A15]'
                            : 'bg-white text-[#111A15] border-[#111A15]/15 hover:border-[#111A15]/35'
                        }`}
                      >
                        <div className="font-mono text-sm font-bold">{num}</div>
                        <div
                          className={`text-[11px] ${
                            active ? 'text-[#A7F3D0]' : 'text-[#546159]'
                          }`}
                        >
                          {num === '+39 334 193 5821'
                            ? 'Servizio Clienti & Preventivi'
                            : 'Cantieri, Enti & Urgenze'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="wa-note"
                  className="block text-xs font-semibold text-[#3F4A43] mb-1.5"
                >
                  Comune o breve nota (opzionale)
                </label>
                <input
                  id="wa-note"
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Es. Cagliari, sopralluogo sanificazione struttura..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                />
              </div>

              <a
                href={guidedWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Avvia Chat WhatsApp con Operatrice</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </section>

          <section aria-labelledby="recensioni-servizio-clienti-heading" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#146C43] mb-1.5">
                  <div className="flex items-center gap-0.5 text-[#B45309]" aria-hidden="true">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B45309] text-[#B45309]" />
                    ))}
                  </div>
                  <span>4,9 / 5 su oltre 3.654 richieste gestite · Servizio Clienti Verificato</span>
                </div>
                <h2
                  id="recensioni-servizio-clienti-heading"
                  className="font-display text-xl sm:text-2xl font-bold text-[#111A15]"
                >
                  Cosa dicono i clienti del nostro Servizio Assistenza.
                </h2>
                <p className="text-sm text-[#49554E] mt-1">
                  Valutazioni reali di Enti Pubblici, strutture sanitarie, hotel e privati sulla rapidità di risposta, cortesia e precisione dei sopralluoghi.
                </p>
              </div>
              <button
                type="button"
                onClick={onGoToQuoteForm}
                className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 text-sm font-semibold text-[#111A15] bg-white hover:bg-[#ECEFEA] border border-[#111A15]/15 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <span>Vai al Modulo Preventivo</span>
                <ArrowUpRight className="w-4 h-4 text-[#146C43]" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CUSTOMER_SERVICE_REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className="bg-white border border-[#111A15]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#146C43] bg-[#ECFDF5] border border-[#146C43]/20 px-2.5 py-1 rounded-md">
                        {review.channelUsed}
                      </span>
                      <div
                        className="flex items-center gap-0.5 text-[#B45309]"
                        aria-label={`Valutazione ${review.rating} su 5`}
                      >
                        {Array.from({length: review.rating}).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#B45309] text-[#B45309]"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-[#111A15] leading-snug">
                      {review.headline}
                    </h3>

                    <blockquote className="text-sm text-[#49554E] leading-relaxed">
                      “{review.quote}”
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-[#111A15]/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-display text-sm font-bold text-[#111A15]">
                        {review.authorName}
                      </div>
                      <div className="text-xs text-[#546159]">
                        {review.role} · {review.organization}
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#546159] shrink-0">
                      {review.date}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
