import { Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
const ctabg2 = '/assets/cta/background.png';

const keyBenefits = [
  'South Asian health expertise',
  'Evidence-based nutrition',
  'Personalized care',
  'Real-life practicality',
];

const stats = [
  {
    value: '1,000+',
    label: 'Consultations Completed',
  },
  {
    value: '100%',
    label: 'Online Care in the U.S.',
  },
  {
    value: '4.8/5',
    label: 'Average Patient Rating',
  },
  {
    value: '94%',
    label: 'Habit Retention Rate',
  },
];

export default function FinalCTA() {
  const containerRef = useReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="consultation" className="py-16 sm:py-20 lg:py-28 bg-surface-primary scroll-mt-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div
          ref={containerRef}
          className="reveal relative rounded-3xl lg:rounded-[36px] overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 shadow-[0_24px_64px_rgba(23,32,27,0.24)] border border-white/10"
        >
          {/* Background: /assets/cta/background.png */}
          <img
            src={ctabg2}
            alt="Serene panoramic botanical morning sunlight and nature landscape"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-editorial hover:scale-100"
            loading="eager"
            decoding="async"
            width={2400}
            height={1350}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.triedFallback) {
                target.dataset.triedFallback = 'true';
                target.src = '/assets/cta/background.png';
              }
            }}
          />

          {/* Cinematic Vignette & Brand Palette Gradients for Enhanced Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#262820]/75 to-[#191A14]/94 pointer-events-none" />
          <div className="absolute inset-0 bg-[#262820]/45 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#262820]/25 to-black/65 pointer-events-none" />

          {/* TOP SECTION: Two-Column Split */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-14">
            {/* Left Stack: Heading, Supporting Text, and Key Benefits */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/20 backdrop-blur-md border border-sand/40 text-sand text-[12px] font-500 shadow-sm mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-sand animate-pulse" />
                <span className="tracking-wide text-sand font-500">Personalized Nutrition &amp; Lifestyle</span>
              </div>

              {/* Heading */}
              <h2 className="font-display font-600 text-white text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.12] tracking-tight text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                A More Personalized Approach to Your Health Starts Here.
              </h2>

              {/* Supporting Text */}
              <p className="mt-4 sm:mt-5 text-white/90 text-[16px] sm:text-[17px] leading-[1.65] max-w-xl text-pretty drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                Understand your risks. Understand your needs. Build a plan that fits your life.
              </p>

              {/* Key Benefits List */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl">
                {keyBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2.5 text-[13.5px] sm:text-[14px] text-white/95 font-500 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sand/25 backdrop-blur-sm border border-sand/40 text-sand flex-shrink-0 shadow-xs">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stack: Closing Line & CTA Button */}
            <div className="lg:max-w-md flex flex-col lg:items-end justify-center self-start lg:self-center pt-2 lg:pt-8">
              {/* Closing Line */}
              <p className="text-white/95 font-500 text-[15px] sm:text-[16px] leading-[1.5] mb-5 text-left lg:text-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
                Take the first step toward better health.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => {
                  window.location.href = 'mailto:hello@sawellness.com?subject=Book%20a%201-on-1%20Consultation';
                }}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-surface-white text-ink text-[15px] font-500 hover:bg-sand hover:text-brand-deep transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
              >
                Book a Consultation Now
              </button>
            </div>
          </div>

          {/* BOTTOM SECTION: 4-Column Stat Bar with Dividing Lines (Preserved Exact Alignment) */}
          <div className="relative z-10 pt-16 sm:pt-20 lg:pt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Thin horizontal dividing rule line */}
                  <div className="w-full h-[1px] bg-white/35 mb-3.5 sm:mb-4.5" />

                  {/* Stat Metric */}
                  <span className="font-display font-600 text-white text-[28px] sm:text-[36px] lg:text-[42px] leading-tight tracking-tight tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                    {stat.value}
                  </span>

                  {/* Stat Label */}
                  <span className="mt-1 text-[11px] sm:text-[12px] font-600 tracking-wider uppercase text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
