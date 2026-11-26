import {RecycleanLogo} from './RecycleanLogo';

interface FooterProps {
  onNavigateHomeSection: (href: string) => void;
  onOpenCustomerService: () => void;
}

export function Footer({
  onNavigateHomeSection,
  onOpenCustomerService,
}: FooterProps) {
  const handleHomeLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigateHomeSection(href);
  };

  return (
    <footer className="bg-[#0F1A15] text-[#C4D1CA] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2.5 font-display text-xl font-bold text-white">
              <RecycleanLogo variant="dark" className="w-6 h-6 shrink-0" />
              <span>Recyclean</span>
            </div>
            <p className="text-xs text-[#9FB0A7] mt-1">
              Cooperativa Sociale di Tipo B · ISO 9001 · Albo Nazionale Gestori Ambientali · Albo
              Imprese Forestali Regione Sardegna
            </p>
          </div>

          <nav aria-label="Collegamenti rapidi" className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href="#qualita-lavoras"
              onClick={(e) => handleHomeLink(e, '#qualita-lavoras')}
              className="hover:text-white transition-colors"
            >
              Qualità & LavoRas
            </a>
            <a
              href="#servizi"
              onClick={(e) => handleHomeLink(e, '#servizi')}
              className="hover:text-white transition-colors"
            >
              Servizi
            </a>
            <a
              href="#prima-dopo"
              onClick={(e) => handleHomeLink(e, '#prima-dopo')}
              className="hover:text-white transition-colors"
            >
              Prima & Dopo
            </a>
            <a
              href="#recensioni"
              onClick={(e) => handleHomeLink(e, '#recensioni')}
              className="hover:text-white transition-colors"
            >
              Recensioni
            </a>
            <a
              href="#numeri-utili"
              onClick={(e) => {
                e.preventDefault();
                onOpenCustomerService();
              }}
              className="text-white font-medium hover:text-[#6EE7B7] transition-colors"
            >
              Numeri Utili
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8FA298]">
          <p>
            © {new Date().getFullYear()} Recyclean Cooperativa Sociale. Tutti i diritti riservati.
          </p>
          <p>
            info@recycleanscs.it · Servizio Clienti +39 334 193 5821 · +39 392 096 3449 (WhatsApp attivo)
          </p>
        </div>
      </div>
    </footer>
  );
}
