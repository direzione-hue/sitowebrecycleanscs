import {useEffect, useMemo, useState} from 'react';
import {BeforeAfterSection} from './components/BeforeAfterSection';
import {CertificationsSection} from './components/CertificationsSection';
import {ContactSection} from './components/ContactSection';
import {CustomerServicePage} from './components/CustomerServicePage';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {QualityLavorasSection} from './components/QualityLavorasSection';
import {ReviewsSection} from './components/ReviewsSection';
import {ServicesSection} from './components/ServicesSection';
import {
  DEFAULT_BEFORE_AFTER_PROJECTS,
  DEFAULT_REVIEWS,
  DEFAULT_SERVICES,
} from './data/recyclenaData';
import type {CustomMediaState} from './types/recyclena';
import {
  applyCustomServiceImages,
  mergeCustomMediaState,
} from './utils/portfolioLogic';

const STORAGE_KEY = 'recyclena_custom_media_v1';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'customer-service'>(() =>
    window.location.hash === '#numeri-utili' ? 'customer-service' : 'home',
  );

  const [mediaState] = useState<CustomMediaState>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return mergeCustomMediaState(DEFAULT_BEFORE_AFTER_PROJECTS, raw);
    } catch {
      return {
        serviceImages: {},
        beforeAfterProjects: DEFAULT_BEFORE_AFTER_PROJECTS,
        customReviews: [],
      };
    }
  });

  const [preselectedServiceId, setPreselectedServiceId] = useState<string>(
    DEFAULT_SERVICES[0].id,
  );

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#numeri-utili') {
        setActivePage('customer-service');
        window.scrollTo({top: 0, behavior: 'instant'});
      } else {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mediaState));
    } catch {
      // Ignore storage quota warnings if very large images are loaded
    }
  }, [mediaState]);

  const services = useMemo(
    () => applyCustomServiceImages(DEFAULT_SERVICES, mediaState.serviceImages),
    [mediaState.serviceImages],
  );

  const allReviews = useMemo(
    () => [...mediaState.customReviews, ...DEFAULT_REVIEWS],
    [mediaState.customReviews],
  );

  const openCustomerServicePage = () => {
    setActivePage('customer-service');
    if (window.location.hash !== '#numeri-utili') {
      window.history.pushState(null, '', '#numeri-utili');
    }
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const navigateHomeSection = (href: string) => {
    setActivePage('home');
    if (window.location.hash === '#numeri-utili') {
      window.history.pushState(null, '', href === '#top' ? '#top' : href);
    }
    window.setTimeout(() => {
      if (href === '#top') {
        window.scrollTo({top: 0, behavior: 'smooth'});
        return;
      }
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    }, 40);
  };

  const scrollToContact = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    }
    navigateHomeSection('#contatti');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F5] text-[#111A15]">
      <Navbar
        activePage={activePage}
        onNavigateHomeSection={navigateHomeSection}
        onOpenCustomerService={openCustomerServicePage}
        onRequestQuote={() => scrollToContact()}
      />

      <main className="flex-1">
        {activePage === 'customer-service' ? (
          <CustomerServicePage
            onBackHome={() => navigateHomeSection('#top')}
            onGoToQuoteForm={() => scrollToContact()}
          />
        ) : (
          <>
            <HeroSection onRequestQuote={() => scrollToContact()} />

            <CertificationsSection onRequestDocs={() => scrollToContact()} />

            <QualityLavorasSection
              onSelectLavorasQuote={() => scrollToContact('facility-management')}
            />

            <ServicesSection
              services={services}
              onRequestServiceQuote={(id) => scrollToContact(id)}
            />

            <BeforeAfterSection projects={mediaState.beforeAfterProjects} />

            <ReviewsSection reviews={allReviews} onLeaveReview={() => scrollToContact()} />

            <ContactSection
              services={services}
              preselectedServiceId={preselectedServiceId}
              onOpenCustomerService={openCustomerServicePage}
            />
          </>
        )}
      </main>

      <Footer
        onNavigateHomeSection={navigateHomeSection}
        onOpenCustomerService={openCustomerServicePage}
      />
    </div>
  );
}
