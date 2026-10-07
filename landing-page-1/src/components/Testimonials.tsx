import { Star, Quote } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface FeaturedTestimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
  avatar: string;
}

interface GridTestimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
}

const featuredTestimonial: FeaturedTestimonial = {
  quote:
    'My blood sugar and cholesterol dropped into the optimal range without giving up roti or rice. SA Wellness understood how my South Asian biology responds to food. Highly compassionate, culturally grounded, and genuinely life-changing.',
  name: 'Dr. Sourav Majumdar',
  role: 'Physician',
  location: 'Palo Alto, CA',
  image: 'https://images.pexels.com/photos/6740511/pexels-photo-6740511.jpeg',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&fit=crop',
};

const gridTestimonials: GridTestimonial[] = [
  {
    quote:
      'Every diet told me to stop eating the foods I grew up with. This was the first clinic that said: let’s work with your food, not against it. My fasting insulin dropped and I have steady energy all day.',
    name: 'Priya Sharma',
    role: 'Software Architect',
    location: 'Bay Area, CA',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=300&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Working 60-hour weeks in Manhattan made healthy eating feel impossible. My dietitian gave me Trader Joe’s shortcuts and restaurant order guides that fit into my actual life.',
    name: 'Arjun Patel',
    role: 'Product Director',
    location: 'New York, NY',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&fit=crop',
    rating: 5,
  },
  {
    quote:
      'I struggled with visceral fat and PCOS symptoms for years. The glycemic sequencing and fiber pairing protocol made a dramatic difference without any restrictive crash diets.',
    name: 'Meera Krishnan',
    role: 'Management Consultant',
    location: 'Chicago, IL',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Within 6 weeks, my post-meal sluggishness vanished and my lab results confirmed my blood sugar stabilized. The 1-on-1 clinician messaging kept me accountable.',
    name: 'Vikram Desai',
    role: 'Tech Executive',
    location: 'Austin, TX',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300&fit=crop',
    rating: 5,
  },
];

export default function Testimonials() {
  const headerRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>({ threshold: 0.12 });

  return (
    <section className="py-20 lg:py-30 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="reveal text-center max-w-2xl mx-auto mb-14 lg:mb-18">
          <span className="text-eyebrow text-brand-deep uppercase">
            Trusted by South Asians Across the U.S.
          </span>
          <h2 className="mt-4 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight text-balance">
            Personalized care. Practical guidance. Real experiences.
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent-warm text-accent-warm" />
              ))}
            </div>
            <span className="text-[14px] font-600 text-ink">4.9/5</span>
            <span className="text-[14px] text-ink-muted">·</span>
            <span className="text-[14px] text-ink-secondary">300+ Verified Patient Reviews</span>
          </div>
        </div>

        {/* Testimonials Layout: Left Featured Photo Card + Right 2x2 Grid */}
        <div
          ref={contentRef}
          className="reveal grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-5 xl:gap-6 items-stretch"
        >
          {/* ========================================================== */}
          {/* LEFT: Featured Testimonial Card with Photographic Backing  */}
          {/* ========================================================== */}
          <div className="group relative rounded-3xl overflow-hidden min-h-[460px] lg:min-h-[520px] flex flex-col justify-end p-6 sm:p-8 xl:p-9 shadow-[0_4px_24px_rgba(23,32,27,0.06)] border border-border-subtle/60">
            {/* Background Image */}
            <img
              src={featuredTestimonial.image}
              alt="Person reflecting in a peaceful mindful living space"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
              loading="lazy"
              width={1200}
              height={900}
            />

            {/* Dark Gradient Overlay for Maximum Readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              aria-hidden="true"
            />

            {/* Inner Content */}
            <div className="relative z-10 flex flex-col justify-end">
              <blockquote className="font-display font-400 text-white text-[18px] sm:text-[20px] xl:text-[22px] leading-[1.45] text-balance drop-shadow-sm">
                &ldquo;{featuredTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author & Large Quotation Mark */}
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={featuredTestimonial.avatar}
                    alt={featuredTestimonial.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/40 shadow-xs"
                    loading="lazy"
                    width={44}
                    height={44}
                  />
                  <div>
                    <div className="font-display font-600 text-white text-[15px] sm:text-[16px] leading-tight">
                      {featuredTestimonial.name}
                    </div>
                    <div className="text-white/80 text-[12.5px] sm:text-[13px] mt-0.5 leading-tight">
                      {featuredTestimonial.role} • {featuredTestimonial.location}
                    </div>
                  </div>
                </div>

                {/* Stylized Quotation Mark Icon */}
                <Quote
                  size={38}
                  className="text-white/25 rotate-180 shrink-0 select-none pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT: 2x2 Grid of Testimonial Cards                       */}
          {/* ========================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5 h-full">
            {gridTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-white rounded-3xl p-6 xl:p-7 border border-border-subtle/80 shadow-[0_2px_14px_rgba(43,45,36,0.04)] hover:shadow-[0_8px_26px_rgba(43,45,36,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* 5-Star Rating */}
                <div>
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="fill-accent-warm text-accent-warm"
                      />
                    ))}
                  </div>

                  {/* Testimonial Quote Text */}
                  <p className="text-ink text-[13.5px] xl:text-[14.5px] leading-[1.65] mt-4 mb-6 font-normal">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle/60">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-border-subtle shrink-0"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                  <div className="min-w-0">
                    <div className="font-display font-600 text-ink text-[14px] leading-tight truncate">
                      {item.name}
                    </div>
                    <div className="text-ink-secondary text-[12px] mt-0.5 leading-tight truncate">
                      {item.role} • {item.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
