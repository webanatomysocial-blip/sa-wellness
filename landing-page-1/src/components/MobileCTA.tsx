import { useEffect, useState } from 'react';

interface MobileCTAProps {
  onTakeAssessment?: () => void;
  onBookConsultation?: () => void;
}

export default function MobileCTA({ onTakeAssessment, onBookConsultation }: MobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      const footer = document.querySelector('footer');
      let pastFooter = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        pastFooter = footerRect.top < window.innerHeight - 20;
      }
      // Visible once scrolled past hero (250px) and before the footer
      setVisible(scrollPos > 250 && !pastFooter);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBookConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation();
      return;
    }
    const consultationEl =
      document.querySelector('#consultation-form') || document.querySelector('#consultation');
    if (consultationEl) {
      consultationEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:hello@sawellness.com?subject=Book%20a%201-on-1%20Consultation';
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi SA Wellness, I would like to learn more about booking a 1:1 personalised consultation.'
    );
    window.open(`https://wa.me/18005550199?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-editorial ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-surface-white/95 backdrop-blur-md border-t border-border-subtle px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(43,45,36,0.12)] flex items-center gap-2.5">
        {/* WhatsApp Button with Icon */}
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-[#25D366] text-surface-white text-[13px] font-600 hover:bg-[#20ba5a] active:scale-[0.98] transition-all cursor-pointer shadow-xs shrink-0"
          aria-label="Chat on WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="currentColor"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>WhatsApp</span>
        </button>

        {/* Primary Booking Button */}
        <button
          onClick={handleBookConsultation}
          className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-brand-deep text-surface-white text-[13.5px] font-600 hover:bg-brand-primary active:scale-[0.98] transition-all cursor-pointer shadow-xs"
        >
          Book Consultation
        </button>

        {/* Optional Secondary Action on pages with Take Assessment */}
        {onTakeAssessment && (
          <button
            onClick={onTakeAssessment}
            className="hidden xs:inline-flex items-center justify-center px-3 py-3 rounded-xl bg-sand/80 hover:bg-sand text-brand-deep text-[12.5px] font-600 border border-sand-warm active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            Assessment
          </button>
        )}
      </div>
    </div>
  );
}
