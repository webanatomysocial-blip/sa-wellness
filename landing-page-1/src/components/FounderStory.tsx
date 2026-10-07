import { useReveal } from '@/hooks/useReveal';

const founderImage = '/assets/founder/hena-nafis-portrait.png';

export default function FounderStory() {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 lg:py-30 bg-surface-secondary scroll-mt-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div ref={leftRef} className="reveal-scale relative">
            <div className="overflow-hidden rounded-editorial">
              <img
                src={founderImage}
                alt="Hena Nafis, Founder of SA Wellness"
                className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover"
                loading="lazy"
                width={900}
                height={600}
              />
            </div>
            <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-surface-white rounded-xl2 border border-border-subtle px-5 py-4 shadow-[0_8px_30px_rgba(43,45,36,0.1)]">
              <div className="font-display font-600 text-ink text-[15px]">Hena Nafis</div>
              <div className="text-ink-secondary text-[13px]">Founder, SA Wellness</div>
            </div>
          </div>

          <div ref={rightRef} className="reveal">
            <span className="text-eyebrow text-brand-deep uppercase">SA Wellness Was Born from a Simple Belief</span>
            <h2 className="mt-4 font-display font-600 text-ink text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.15] tracking-tight text-balance">
              Better health shouldn't feel out of reach. It should feel possible.
            </h2>
            <div className="mt-6 space-y-5 text-ink-secondary text-[16px] leading-[1.65]">
              <p>
                SA Wellness was founded by Hena Nafis — a nutrition and lifestyle consultant who saw a gap that generic advice couldn't fill. South Asians living in the U.S. were being told to follow plans that didn't account for their biology, their food culture, or the realities of American life.
              </p>
              <p>
                Too many people were caught between two worlds: the foods and traditions they loved, and health advice that asked them to abandon both. Hena built SA Wellness to bridge that gap — combining South Asian health expertise with personalized, evidence-based nutrition that works in real American life.
              </p>
            </div>

            <div className="mt-8 pl-5 border-l-2 border-brand-primary">
              <p className="font-display font-500 text-ink text-[18px] sm:text-[20px] leading-snug text-balance">
                &ldquo;Better health shouldn't feel out of reach. It should feel possible.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
