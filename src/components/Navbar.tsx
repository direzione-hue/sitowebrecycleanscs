import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {motion, useScroll, useSpring} from 'motion/react';
import {RecycleanLogo} from './RecycleanLogo';

interface NavbarProps {
  activePage: 'home' | 'customer-service';
  onNavigateHomeSection: (href: string) => void;
  onOpenCustomerService: () => void;
  onRequestQuote: () => void;
}

const NAV_LINKS = [
  {href: '#qualita-lavoras', label: 'Qualità & LavoRas'},
  {href: '#servizi', label: 'Servizi'},
  {href: '#prima-dopo', label: 'Prima & Dopo'},
  {href: '#recensioni', label: 'Recensioni'},
  {href: '#contatti', label: 'Contatti'},
];

export function Navbar({
  activePage,
  onNavigateHomeSection,
  onOpenCustomerService,
  onRequestQuote,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateHomeSection(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F7F5]/92 backdrop-blur-md border-b border-[#111A15]/10">
      <motion.div
        aria-hidden="true"
        className="h-[2px] bg-[#146C43] origin-left"
        style={{scaleX}}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          onClick={(e) => handleSectionClick(e, '#top')}
          className="inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-[#111A15] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#146C43]"
        >
          <RecycleanLogo variant="light" className="w-7 h-7 shrink-0" />
          <span>Recyclean</span>
        </a>

        <nav
          aria-label="Navigazione principale"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#3F4A43]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionClick(e, link.href)}
              className="hover:text-[#111A15] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#146C43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#146C43]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#numeri-utili"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onOpenCustomerService();
            }}
            aria-current={activePage === 'customer-service' ? 'page' : undefined}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#146C43] ${
              activePage === 'customer-service'
                ? 'text-[#146C43] font-semibold border-[#146C43]'
                : 'border-transparent hover:text-[#111A15] hover:border-[#146C43]'
            }`}
          >
            Numeri Utili
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43]"
          >
            Richiedi Preventivo
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#111A15]/15 text-[#111A15] hover:bg-[#111A15]/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#111A15]/10 bg-[#F6F7F5] px-4 py-4">
          <nav aria-label="Menu mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
                className="px-3 py-3 text-base font-medium text-[#111A15] rounded-lg hover:bg-[#111A15]/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#numeri-utili"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenCustomerService();
              }}
              aria-current={activePage === 'customer-service' ? 'page' : undefined}
              className={`px-3 py-3 text-base font-medium rounded-lg ${
                activePage === 'customer-service'
                  ? 'bg-[#ECFDF5] text-[#146C43] font-semibold'
                  : 'text-[#111A15] hover:bg-[#111A15]/5'
              }`}
            >
              Numeri Utili & Servizio Clienti
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="mt-2 w-full py-3 px-4 text-sm font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors cursor-pointer"
            >
              Richiedi Preventivo
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
