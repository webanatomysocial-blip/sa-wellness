import { Star, ArrowRight } from 'lucide-react';
import HeroVideo from './HeroVideo';
import HeroImageRibbon from './HeroImageRibbon';

interface HeroProps {
  onTakeAssessment?: () => void;
}

export default function Hero({ onTakeAssessment }: HeroProps) {
  const handleClickAssessment = () => {
    if (onTakeAssessment) {
      onTakeAssessment();
    } else {
      window.location.hash = '#assessment';
    }
  };

  return (
    <section id="top" className="relative pt-[120px] pb-16 lg:pt-[140px] lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          <div className="flex flex-col">
            {/* Mobile Hero Video Visual: Replaced hero image placeholder with video on mobile */}
            <div className="lg:hidden mb-6 -mt-2 opacity-start animate-fade-in" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
              <HeroVideo
                aspectRatio="aspect-[16/10] sm:aspect-[16/9] max-h-[380px]"
                className="shadow-[0_8px_30px_rgba(43,45,36,0.12)] rounded-2xl"
              />
            </div>

            <span className="text-eyebrow text-brand-deep uppercase opacity-start animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              Personalized Nutrition &amp; Lifestyle Care
            </span>

            <h1 className="mt-5 font-display font-600 text-ink text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.1] tracking-tight text-balance opacity-start animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Your South Asian Health Deserves More Than Generic Nutrition Advice.
            </h1>

            <p className="mt-6 text-ink-secondary text-[16px] lg:text-[17px] leading-[1.65] max-w-xl text-pretty opacity-start animate-fade-up" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
              SA Wellness is a 100% online nutrition and lifestyle clinic built specifically for South Asians living in the United States. We understand your biology, your food, and your real life — so you can build sustainable habits without giving up who you are.
            </p>

            <div className="mt-8 opacity-start animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <button
                onClick={handleClickAssessment}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer group"
                aria-label="Take South Asian Health Risk Assessment"
              >
                <span>Take Assessment</span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3 opacity-start animate-fade-up" style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-warm text-accent-warm" />
                ))}
              </div>
              <span className="text-[14px] font-500 text-ink">4.8/5</span>
              <span className="text-[14px] text-ink-muted">·</span>
              <span className="text-[14px] text-ink-secondary">300+ Customer Reviews</span>
            </div>
          </div>

          {/* Right Column: High-Hierarchy Video Showcase (Desktop only, mobile renders video in top placeholder) */}
          <div className="hidden lg:block opacity-start animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <HeroVideo />
          </div>
        </div>

        {/* Bottom Hero Image Ribbon: Panoramic 3D Auto-Scrolling Ribbon */}
        <div
          className="mt-14 lg:mt-20 -mx-6 lg:-mx-10 opacity-start animate-fade-in"
          style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
        >
          <HeroImageRibbon />
        </div>
      </div>
    </section>
  );
}
