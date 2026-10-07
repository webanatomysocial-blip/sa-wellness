import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
const logoImg = '/assets/logo/sa-wellness-logo.png';

const homeNavLinks = [
  { label: 'Health Concerns', href: '#health-concerns' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

const secondPageNavLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why SA Wellness', href: '#why-sa-wellness' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

interface HeaderProps {
  currentPage?: 'home' | 'second-page';
  onNavigateHome?: () => void;
  onNavigateSecondPage?: () => void;
  onBookConsultation?: () => void;
}

export default function Header({
  currentPage = 'home',
  onNavigateHome,
  onNavigateSecondPage,
  onBookConsultation,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  const navLinks = currentPage === 'second-page' ? secondPageNavLinks : homeNavLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === '#top') {
      if (currentPage === 'second-page') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (onNavigateHome) {
        onNavigateHome();
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleLandingPage = () => {
    setOpen(false);
    if (currentPage === 'second-page') {
      if (onNavigateHome) {
        onNavigateHome();
      } else {
        window.location.hash = '#home';
      }
    } else {
      if (onNavigateSecondPage) {
        onNavigateSecondPage();
      } else {
        window.location.hash = '#2nd-page';
      }
    }
  };

  const handleConsultationClick = () => {
    setOpen(false);
    if (onBookConsultation) {
      onBookConsultation();
    } else {
      const el = document.querySelector(currentPage === 'second-page' ? '#consultation-form' : '#consultation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-editorial ${
        scrolled
          ? 'bg-surface-primary/90 backdrop-blur-md border-b border-border-subtle shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[74px]' : 'h-[88px]'}`}>
          <button
            onClick={() => handleNavClick('#top')}
            className="flex items-center group py-1 cursor-pointer text-left"
            aria-label="SA Wellness home"
          >
            <img
              src="/assets/logo/sa-wellness-logo.png"
              alt="SA Wellness"
              className="h-12 sm:h-14 lg:h-[58px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              width={232}
              height={120}
            />
          </button>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[14px] font-450 text-ink-secondary hover:text-ink transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Small CTA in the navbar: '2nd Page' / '1st Page' - hidden in mobile nav header */}
            <button
              onClick={handleToggleLandingPage}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-brand-deep/25 bg-surface-white/90 hover:bg-surface-secondary text-brand-deep text-[12.5px] sm:text-[13.5px] font-500 hover:border-brand-deep transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5"
              aria-label={currentPage === 'second-page' ? 'Go to 1st page' : 'Go to 2nd page'}
              title={currentPage === 'second-page' ? 'Switch to 1st Landing Page' : 'Switch to 2nd Landing Page'}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              <span>{currentPage === 'second-page' ? '1st Page' : '2nd Page'}</span>
            </button>

            <button
              onClick={handleConsultationClick}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-deep text-surface-white text-[14px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 cursor-pointer shadow-2xs"
            >
              {currentPage === 'second-page' ? 'Book Your Consultation' : 'Book a Consultation'}
            </button>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink hover:bg-surface-secondary transition-colors cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-surface-primary border-b border-border-subtle shadow-md">
          <nav className="mx-auto max-w-[1280px] px-6 py-4 flex flex-col gap-1.5" aria-label="Mobile">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2.5 px-3 text-[15px] font-450 text-ink-secondary hover:text-ink hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 mt-1 border-t border-border-subtle flex items-center justify-between px-2">
              <span className="text-[13px] text-ink-secondary">Landing Page:</span>
              <button
                onClick={handleToggleLandingPage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-deep/30 bg-surface-white text-brand-deep text-[13px] font-600 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <span>{currentPage === 'second-page' ? 'Switch to 1st Page' : 'Switch to 2nd Page'}</span>
              </button>
            </div>

            <button
              onClick={handleConsultationClick}
              className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 cursor-pointer"
            >
              {currentPage === 'second-page' ? 'Book Your Consultation' : 'Book a Consultation'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
