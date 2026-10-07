import { Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const b1 = '/assets/consultations/online.png';
const b2 = '/assets/consultations/convenient.png';
const b3 = '/assets/consultations/private.png';
const b4 = '/assets/consultations/personalized.png';

interface PillarCard {
  id: string;
  title: string;
  image: string;
}

const pillars: PillarCard[] = [
  {
    id: 'online',
    title: 'Online',
    image: b1,
  },
  {
    id: 'private',
    title: 'Private',
    image: b3,
  },
  {
    id: 'convenient',
    title: 'Convenient',
    image: b2,
  },
  {
    id: 'personalized',
    title: 'Personalized',
    image: b4,
  },
];

export default function OnlineConsultations() {
  const headerRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const footerRef = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="consultations" className="py-20 lg:py-30 scroll-mt-20 bg-surface-secondary/40 overflow-x-clip">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* ============================================================== */}
        {/* SECTION HEADER: Two-Column Split Aligned With Our Methodology */}
        {/* ============================================================== */}
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-14 mb-12 lg:mb-16"
        >
          {/* Left Column: Eyebrow Badge & Title Stack */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              100% Online Consultations
            </span>

            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-tight text-balance">
              Expert Nutrition Guidance, <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-accent-warm bg-clip-text text-transparent">
                Wherever You Are
              </span>
            </h2>
          </div>

          {/* Right Column: Description Stack */}
          <div className="lg:max-w-md">
            <h3 className="font-display font-600 text-ink text-[17px] sm:text-[18px] leading-snug mb-2 text-left lg:text-right">
              100% Online Consultations for South Asians Across the U.S.
            </h3>
            <p className="text-[14.5px] sm:text-[15px] text-ink-secondary leading-[1.65] text-left lg:text-right">
              Connect with the SA Wellness team from the comfort of your home. Serving South Asians across the U.S. and globally.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4 PHOTOGRAPHIC PILLAR CARDS (Mobile Stacking & Desktop Grid)   */}
        {/* ============================================================== */}
        <div
          ref={cardsRef}
          className="reveal max-sm:transform-none max-sm:flex max-sm:flex-col max-sm:gap-6 max-sm:pb-8 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 lg:gap-6 relative sm:pb-0"
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              onClick={() => scrollTo('#consultation')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollTo('#consultation')}
              aria-label={`Book consultation for ${pillar.title}`}
              style={{
                '--stack-top': `calc(84px + ${index * 16}px)`,
                '--stack-z': 10 + index,
              } as React.CSSProperties}
              className="mobile-stack-card group relative rounded-[26px] overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] cursor-pointer shadow-[0_12px_32px_rgba(43,45,36,0.18)] sm:shadow-[0_8px_24px_rgba(43,45,36,0.08)] hover:shadow-[0_20px_48px_rgba(43,45,36,0.2)] transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 select-none bg-ink border border-white/10"
            >
              {/* Background Photography */}
              <img
                src={pillar.image}
                alt={pillar.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-108"
                loading="lazy"
                width={800}
                height={1000}
              />

              {/* Dark Gradient Vignette for pristine white text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[#262820]/25 mix-blend-multiply" />

              {/* Bottom Content: Clean Display Typography */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 z-10 flex flex-col justify-end">
                <h3 className="font-display font-600 text-surface-white text-[22px] sm:text-[24px] lg:text-[25px] leading-[1.18] tracking-tight whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {pillar.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ACTION BAR: Telehealth Reassurance & Booking Trigger */}
        {/* ============================================================== */}
        <div
          ref={footerRef}
          className="reveal mt-12 sm:mt-16 p-6 sm:p-8 rounded-[24px] bg-surface-white border border-border-subtle shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-7 text-ink text-[14px] font-500">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sand border border-sand-warm text-brand-deep shadow-xs">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span>No commute.</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sand border border-sand-warm text-brand-deep shadow-xs">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span>No waiting room.</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sand border border-sand-warm text-brand-deep shadow-xs">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span>No need to live near a clinic.</span>
            </div>
          </div>

          <button
            onClick={() => scrollTo('#consultation')}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-cta font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs shrink-0 cursor-pointer"
          >
            Book a Consultation Now
          </button>
        </div>
      </div>
    </section>
  );
}
