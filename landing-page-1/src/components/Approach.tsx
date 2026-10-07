import { useLenis } from 'lenis/react';
import { useReveal } from '@/hooks/useReveal';

const om1 = '/assets/approach/step1-sa-health-risks.png';
const om2 = '/assets/approach/step2-personalize-plan.png';
const om3 = '/assets/approach/step3-food-culture.png';
const om4 = '/assets/approach/step4-american-life.png';
const om5 = '/assets/approach/step5-lasting-habits.png';

interface Step {
  id: string;
  num: string;
  shortLabel: string;
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    id: 'step-01',
    num: '01.',
    shortLabel: 'South Asian Risks',
    title: 'Start with South Asian Health Risks',
    description:
      'South Asian health can require a different lens. We consider factors such as family history, metabolic risk, body composition, lifestyle, and health goals rather than relying on a one-size-fits-all approach.',
    image: om1,
  },
  {
    id: 'step-02',
    num: '02.',
    shortLabel: 'Personalize Plan',
    title: 'Personalize the Plan',
    description:
      "Your age, routine, metabolic markers, health concerns, and day-to-day reality are different from anyone else's. Your nutrition plan and clinical care should be built entirely around you and your schedule.",
    image: om2,
  },
  {
    id: 'step-03',
    num: '03.',
    shortLabel: 'Work with Food',
    title: 'Work with Your Food, Not Against It',
    description:
      "Traditional home-cooked foods don't have to disappear from your plate. We help you make informed, balanced choices around the spices, meals, grains, and authentic eating patterns that matter to your culture.",
    image: om3,
  },
  {
    id: 'step-04',
    num: '04.',
    shortLabel: 'American Life Fit',
    title: 'Make It Work in American Life',
    description:
      'Because life in the U.S. brings its own realities: long workdays, eating out, travel, family responsibilities, social events, and changing food environments. Your nutrition strategy has to work beyond the kitchen.',
    image: om4,
  },
  {
    id: 'step-05',
    num: '05.',
    shortLabel: 'Habits That Last',
    title: 'Build Habits That Last',
    description:
      'No extreme resets or rigid, short-lived restrictions. The goal is to build sustainable, lifelong behavioral shifts and nutrition confidence you can effortlessly maintain long after your initial consultation.',
    image: om5,
  },
];

export default function Approach() {
  const headerRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>({ threshold: 0.12 });
  const lenis = useLenis();

  const scrollToConsultation = () => {
    if (lenis) {
      lenis.scrollTo('#consultation', { offset: -80 });
    } else {
      document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="approach"
      className="relative py-20 lg:py-30 bg-surface-secondary scroll-mt-20 overflow-x-clip sm:overflow-hidden"
    >
      {/* Feather-light background engineering grid with smooth radial fade */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none opacity-60" />

      {/* Subtle ambient central lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[680px] h-[320px] bg-sand/35 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* ============================================================== */}
        {/* HEADER SECTION: Balanced Typo Hierarchy & Clean Alignment      */}
        {/* ============================================================== */}
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-14 mb-12 lg:mb-16"
        >
          {/* Left Column: Eyebrow Badge & Title */}
          <div className="max-w-2xl">
            <span className="text-eyebrow text-brand-deep uppercase">
              WHAT SA WELLNESS DOES DIFFERENTLY
            </span>

            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.12] tracking-tight text-balance">
              A More Complete Approach to <br />
              <span className="bg-gradient-to-r from-brand-deep via-brand-primary to-accent-warm bg-clip-text text-transparent">
                South Asian Health
              </span>
            </h2>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:max-w-md">
            <p className="text-[15px] sm:text-[16px] text-ink-secondary leading-[1.65] text-left lg:text-right">
              Because better health isn't just about what you eat. It is about understanding how your body, your risks, your environment, and your everyday life come together.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5 OPEN CARDS: Mobile Stacking Deck & Desktop Grid              */}
        {/* ============================================================== */}
        <div
          ref={cardsRef}
          className="reveal max-sm:transform-none max-sm:flex max-sm:flex-col max-sm:gap-6 max-sm:pb-8 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 lg:gap-3.5 xl:gap-4.5 w-full items-stretch relative sm:pb-0"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              style={{
                '--stack-top': `calc(80px + ${index * 14}px)`,
                '--stack-z': 10 + index,
              } as React.CSSProperties}
              className="mobile-stack-card group bg-surface-white rounded-2xl p-5 lg:p-4.5 xl:p-5 border border-border-subtle hover:border-brand-primary/40 shadow-[0_10px_28px_rgba(43,45,36,0.08)] sm:shadow-[0_4px_20px_rgba(43,45,36,0.04)] hover:shadow-[0_14px_32px_rgba(43,45,36,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full"
            >
              {/* Card Artwork Image Container */}
              <div className="relative w-full h-[140px] sm:h-[150px] lg:h-[130px] xl:h-[142px] rounded-xl overflow-hidden border border-brand-primary/10 shadow-xs bg-surface-secondary shrink-0">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Inner Content (Title and Description) spaced from image */}
              <div className="mt-4 sm:mt-5 flex flex-col flex-1 justify-between">
                <h3 className="font-display font-600 text-ink text-[16px] xl:text-[17px] leading-[1.3] tracking-tight min-h-[44px] flex items-start text-balance">
                  {step.title}
                </h3>

                <p className="mt-3 text-ink-secondary text-[12.5px] xl:text-[13px] leading-[1.65]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM SECTION: Closing Line & CTA Button                      */}
        {/* ============================================================== */}
        <div className="mt-14 lg:mt-20 text-center max-w-xl mx-auto">
          <p className="text-[16px] sm:text-[18px] font-display font-500 text-ink tracking-tight mb-6">
            Science-informed. South Asian-aware. Built for real life.
          </p>
          <button
            onClick={scrollToConsultation}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-cta font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
          >
            Book a Consultation Now
          </button>
        </div>
      </div>
    </section>
  );
}
