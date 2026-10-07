import { useState, useEffect, useRef, type FormEvent } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Leaf,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Target,
  Utensils,
  Home,
  ArrowRight,
  MapPin,
  Lightbulb,
  BarChart2,
  Plus,
} from 'lucide-react';
const founderImg = '/assets/founder/hena-nafis-portrait.png';

interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  member: string;
  city: string;
  diagnosis: string;
  goal: string;
  strategy: string;
  result: string;
  image: string;
  mobileImage?: string;
  mobileImagePosition?: string;
  alt: string;
  imagePosition?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'case-01',
    tag: 'Card 1',
    title: 'Bridal & Sangeet Prep',
    member: 'Meera K.',
    city: 'San Francisco, CA',
    diagnosis: 'Bridal & Sangeet Prep',
    goal: 'Reduce persistent abdominal bloat, improve skin clarity, and maintain high stamina through long events.',
    strategy:
      'Adjusted macro ratios for home-cooked meals, added targeted gut-support nutrients, and applied a specialized 7-day pre-event hydration plan.',
    result:
      'Heavy bridal lengha fit effortlessly with zero waistline tightness; sustained full energy through late-night functions.',
    image: '/assets/wedding/bridal-sangeet-desktop.png',
    mobileImage: '/assets/wedding/bridal-sangeet-mobile.png',
    alt: 'Bridal & Sangeet Prep client celebration',
  },
  {
    id: 'case-02',
    tag: 'Card 2',
    title: 'Milestone Anniversary & Hosting',
    member: 'Sanjay & Neha P.',
    city: 'Dallas, TX',
    diagnosis: '25th Wedding Anniversary Gala',
    goal: 'Shed stubborn midsection weight while hosting weekend dinner parties for visiting family.',
    strategy:
      'Structuring event-day meal timing and pairing traditional party foods with metabolic-balancing choices earlier in the day.',
    result:
      'Both reduced waist circumference and felt light, active, and relaxed during their entire hosting week.',
    image: '/assets/wedding/anniversary-hosting.png',
    alt: 'Milestone Anniversary & Hosting celebration',
  },
  {
    id: 'case-03',
    tag: 'Card 3',
    title: 'Family Reunion & Travel',
    member: 'Anjali R.',
    city: 'Northern New Jersey',
    diagnosis: 'Milestone Birthday & Multi-City Reunion',
    goal: 'Eliminate post-meal sluggishness and feel light in tailored traditional wear.',
    strategy:
      'Optimized digestion with simple spice-pairing adjustments and an anti-inflammatory routine for frequent travel days.',
    result:
      'Total digestive ease, balanced daily energy, and full confidence in every photo.',
    image: '/assets/wedding/family-reunion.png',
    alt: 'Family Reunion & Travel celebration outcome',
  },
];

const comparisons = [
  {
    usual: 'A standard plan for everyone',
    sa: 'Guidance based on your individual goals',
  },
  {
    usual: 'Focused mainly on what to cut out',
    sa: 'Focus on what you can add, adjust, and improve',
  },
  {
    usual: "Doesn't always fit your everyday routine",
    sa: 'Built around your lifestyle and food preferences',
  },
  {
    usual: 'Short-term changes for a specific date',
    sa: 'A realistic approach for your occasion and beyond',
  },
  {
    usual: 'Generic nutrition advice',
    sa: 'Personalised, evidence-informed guidance',
  },
];

const faqItems = [
  {
    question: 'What happens during the consultation?',
    answer:
      'You’ll have a 1:1 conversation about your goals, health, lifestyle, food preferences, and upcoming occasion.',
  },
  {
    question: 'Is the consultation online?',
    answer:
      'Yes. Your consultation is conducted online, so you can connect from anywhere in the U.S.',
  },
  {
    question: 'Do I need to follow a strict diet?',
    answer:
      'No. We focus on realistic changes that can fit into your lifestyle and the foods you enjoy.',
  },
  {
    question: 'Is this only for weddings?',
    answer:
      'Not at all. You can book a consultation for an engagement, milestone celebration, special event, or any occasion that matters to you.',
  },
  {
    question: 'When should I book?',
    answer:
      'Starting early gives you more time to work towards your goals without relying on last-minute changes. However, your timeline can be discussed during the consultation.',
  },
  {
    question: 'What happens after the consultation?',
    answer:
      'You’ll have a clearer understanding of your goals, what may be realistic for your timeline, and the next steps that may be right for you.',
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  eventDate: string;
  notes: string;
}

function SecondPageSkeleton() {
  return (
    <div className="min-h-screen bg-surface-primary pt-[100px] sm:pt-[130px] pb-24 px-6 lg:px-10 max-w-[1280px] mx-auto animate-pulse transition-opacity duration-300">
      {/* Hero grid skeleton */}
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-16 items-center">
        <div className="w-full h-[320px] sm:h-[480px] rounded-hero skeleton-shimmer order-1 lg:order-2" />
        <div className="space-y-4 order-2 lg:order-1">
          <div className="w-48 h-4 rounded-full skeleton-shimmer" />
          <div className="w-full max-w-lg h-12 rounded-xl skeleton-shimmer" />
          <div className="w-3/4 h-8 rounded-xl skeleton-shimmer" />
          <div className="space-y-2.5 pt-2">
            <div className="w-full h-4 rounded skeleton-shimmer" />
            <div className="w-11/12 h-4 rounded skeleton-shimmer" />
            <div className="w-4/5 h-4 rounded skeleton-shimmer" />
          </div>
          <div className="w-52 h-12 rounded-xl skeleton-shimmer pt-3" />
          <div className="w-72 h-4 rounded skeleton-shimmer pt-2" />
        </div>
      </div>

      {/* 3 Pillars skeleton */}
      <div className="mt-14 pt-10 border-t border-border-subtle grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="w-24 h-4 rounded skeleton-shimmer" />
            <div className="w-44 h-6 rounded skeleton-shimmer" />
            <div className="w-full h-4 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Fast speed count-up hook so final numerical values resolve quickly and cleanly
function useCountUp(target: number, duration: number = 650, trigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Snappy ease-out curve for fast, energetic counting that settles immediately
      const easeOut = 1 - Math.pow(1 - progress, 2);
      setCount(Math.round(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, trigger]);

  return count;
}

export default function SecondLandingPage() {
  const [isReady, setIsReady] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Section 2 Stats Fast Speed Count-Up (Cards 1, 2, 3 only)
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    const node = statsSectionRef.current;
    if (!node) return;

    const handleCheck = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.95 && rect.bottom >= 0) {
        setStatsAnimated(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStatsAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: '120px 0px 60px 0px',
      }
    );

    observer.observe(node);
    window.addEventListener('scroll', handleCheck, { passive: true });
    // Check immediately and on a short delay to account for layout settling
    handleCheck();
    const t = setTimeout(handleCheck, 250);

    return () => {
      clearTimeout(t);
      observer.disconnect();
      window.removeEventListener('scroll', handleCheck);
    };
  }, [isReady]);

  // Snappy durations: ~650ms, ~550ms, ~400ms for swift visual resolution
  const countConsultations = useCountUp(5000, 650, statsAnimated);
  const countYears = useCountUp(30, 550, statsAnimated);
  const countCare = useCountUp(1, 400, statsAnimated);

  // Form State
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    eventDate: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  // Proven Outcomes Carousel State (Manual Controls & Hand Swipe - No auto-scroll)
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);
  const [outcomesTouchStartX, setOutcomesTouchStartX] = useState<number | null>(null);
  const [outcomesTouchStartY, setOutcomesTouchStartY] = useState<number | null>(null);

  const changeSlide = (next: number) => {
    setSlideVisible(false);
    setTimeout(() => {
      setActiveSlide(next);
      setSlideVisible(true);
    }, 180);
  };

  const handlePrevSlide = () => {
    changeSlide(activeSlide === 0 ? caseStudies.length - 1 : activeSlide - 1);
  };

  const handleNextSlide = () => {
    changeSlide((activeSlide + 1) % caseStudies.length);
  };

  const handleSelectSlide = (index: number) => {
    if (index !== activeSlide) changeSlide(index);
  };

  const handleOutcomesTouchStart = (e: React.TouchEvent) => {
    setOutcomesTouchStartX(e.touches[0].clientX);
    setOutcomesTouchStartY(e.touches[0].clientY);
  };

  const handleOutcomesTouchEnd = (e: React.TouchEvent) => {
    if (outcomesTouchStartX === null || outcomesTouchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = outcomesTouchStartX - touchEndX;
    const diffY = outcomesTouchStartY - touchEndY;

    // Trigger swipe when horizontal swipe dominates and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    setOutcomesTouchStartX(null);
    setOutcomesTouchStartY(null);
  };

  // Subtle skeleton loader / fade-in transition on initial page mount/switch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 180);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll & text scrolling reveal animations on all .reveal and .reveal-scale elements
  useEffect(() => {
    if (!isReady) return;

    const elements = document.querySelectorAll('.reveal, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isReady]);

  const scrollToConsultation = () => {
    const el = document.querySelector('#consultation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errors.phone = 'Please enter your phone number.';
    }
    if (!formData.occasion.trim()) {
      errors.occasion = "Please let us know what occasion you're preparing for.";
    }
    return errors;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const existing = JSON.parse(
        localStorage.getItem('sa_wellness_occasion_consultations') || '[]'
      );
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(
        'sa_wellness_occasion_consultations',
        JSON.stringify(existing)
      );
      setFormStatus('success');
    } catch {
      setFormStatus('success');
    }
  };

  if (!isReady) {
    return <SecondPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-surface-primary text-ink font-sans antialiased selection:bg-brand-soft selection:text-ink transition-opacity duration-500 ease-editorial opacity-100">
      {/* ============================================================== */}
      {/* SECTION 1: HERO & OCCASION POSITIONING */}
      {/* ============================================================== */}
      <section
        id="top"
        className="relative pt-[112px] sm:pt-[130px] pb-16 lg:pt-[140px] lg:pb-24 overflow-hidden border-b border-border-subtle"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Visual Column: Editorial 3-Card Collage + Floating Consultation Layer (Top on mobile, Right on desktop) */}
            <div className="relative reveal-scale order-1 lg:order-2 w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[560px] lg:max-w-[580px] h-[480px] xs:h-[530px] sm:h-[600px] lg:h-[610px] select-none mx-auto lg:mr-0">
                {/* Organic botanical & blob shapes */}
                <div className="absolute -top-4 -right-4 w-[200px] xs:w-[240px] sm:w-[280px] h-[200px] xs:h-[240px] sm:h-[280px] bg-[#788863]/30 rounded-[58%_42%_62%_38%/42%_58%_42%_58%] pointer-events-none" />
                <div className="absolute top-8 xs:top-10 left-4 xs:left-8 w-[240px] xs:w-[290px] sm:w-[350px] h-[240px] xs:h-[290px] sm:h-[350px] bg-[#EFE8DD] rounded-[50%_50%_42%_58%/56%_44%_56%_44%] pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-[220px] xs:w-[260px] sm:w-[320px] h-[200px] xs:h-[240px] sm:h-[290px] bg-[#71805D]/30 rounded-[52%_48%_40%_60%/40%_60%_50%_50%] pointer-events-none" />
                <div className="absolute bottom-4 right-0 w-[180px] xs:w-[210px] sm:w-[240px] h-[150px] xs:h-[180px] sm:h-[200px] bg-[#EBE3D5] rounded-[55%_45%_60%_40%/45%_55%_45%_55%] pointer-events-none" />
                {/* Delicate botanical outline on left */}
                <svg className="hidden xs:block absolute -left-6 top-20 w-32 h-44 opacity-25 text-[#9A8B78] pointer-events-none" viewBox="0 0 100 140" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M50 140 Q 50 70 45 10 M 45 40 Q 25 30 20 20 M 47 60 Q 70 50 75 40 M 48 80 Q 25 70 20 60 M 49 100 Q 75 90 80 80" />
                </svg>

                {/* ================= TOP ROW ================= */}
                {/* Card 1: YOUR GOAL (Upper Left, Depth Level 1, tilted -4deg) */}
                <div className="absolute top-1 left-1 w-[53%] sm:w-[52%] h-[280px] xs:h-[315px] sm:h-[355px] lg:h-[365px] z-10 -rotate-[4deg] rounded-[24px] sm:rounded-[28px] overflow-hidden border-[2px] border-white/60 shadow-[0_18px_38px_rgba(20,24,18,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(20,24,18,0.20)] group cursor-pointer">
                  <img
                    src="/assets/wedding/hero-collage-fitness.png"
                    alt="Active lifestyle and fitness preparation"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-103"
                    loading="eager"
                  />
                  {/* Subtle dark bottom gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  <div className="absolute inset-0 p-3.5 xs:p-4.5 sm:p-5 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/35 text-white text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-700 tracking-wider uppercase shadow-2xs">
                        <Target size={12} className="text-white shrink-0" />
                        <span className="text-white">YOUR GOAL</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-600 text-white text-[14px] xs:text-[15.5px] sm:text-[17.5px] leading-snug drop-shadow-xs">
                        Feel confident for the moments ahead.
                      </h3>
                      <div className="w-7 h-[2px] bg-white/80 rounded-full mt-2" />
                    </div>
                  </div>
                </div>

                {/* Card 2: YOUR FOOD (Upper Right, Depth Level 2, tilted +3.5deg, overlaps YOUR GOAL) */}
                <div className="absolute top-6 xs:top-8 sm:top-10 right-0 w-[52%] sm:w-[51%] h-[250px] xs:h-[280px] sm:h-[315px] lg:h-[325px] z-20 rotate-[3.5deg] rounded-[24px] sm:rounded-[28px] overflow-hidden border-[2px] border-white/60 shadow-[0_18px_38px_rgba(20,24,18,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(20,24,18,0.22)] group cursor-pointer">
                  <img
                    src="/assets/wedding/hero-collage-nutrition.png"
                    alt="Traditional South Asian nutrition and joyful meals"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-103"
                    loading="eager"
                  />
                  {/* Subtle dark bottom gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  <div className="absolute inset-0 p-3.5 xs:p-4.5 sm:p-5 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full bg-white/45 backdrop-blur-md border border-white/50 text-[#2B2D24] text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-700 tracking-wider uppercase shadow-2xs">
                        <Utensils size={12} className="text-[#2B2D24] shrink-0" />
                        <span>YOUR FOOD</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-600 text-white text-[14px] xs:text-[15.5px] sm:text-[17.5px] leading-snug drop-shadow-xs">
                        Keep the food you actually love.
                      </h3>
                      <div className="w-7 h-[2px] bg-white/80 rounded-full mt-2" />
                    </div>
                  </div>
                </div>

                {/* ================= BOTTOM CARD ================= */}
                {/* Card 3: YOUR LIFE (Grounding Anchor, tilted -2.5deg) */}
                <div className="absolute bottom-2 left-1 sm:left-2 w-[72%] h-[195px] xs:h-[220px] sm:h-[250px] lg:h-[255px] z-10 -rotate-[2.5deg] rounded-[24px] sm:rounded-[28px] overflow-hidden border-[2px] border-white/60 shadow-[0_16px_36px_rgba(20,24,18,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(20,24,18,0.20)] group cursor-pointer">
                  <img
                    src="/assets/wedding/hero-collage-lifestyle.png"
                    alt="South Asian everyday lifestyle and celebration"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-103"
                    loading="eager"
                  />
                  {/* Subtle dark bottom gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  <div className="absolute inset-0 p-3.5 xs:p-4.5 sm:p-5 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full bg-white/45 backdrop-blur-md border border-white/50 text-[#2B2D24] text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-700 tracking-wider uppercase shadow-2xs">
                        <Home size={12} className="text-[#2B2D24] shrink-0" />
                        <span>YOUR LIFE</span>
                      </div>
                    </div>
                    <div className="max-w-[62%]">
                      <h3 className="font-display font-600 text-white text-[13.5px] xs:text-[15px] sm:text-[17px] leading-snug drop-shadow-xs">
                        Build something you can live with.
                      </h3>
                      <div className="w-7 h-[2px] bg-white/80 rounded-full mt-2" />
                    </div>
                  </div>
                </div>

                {/* ================= FLOATING CONSULTATION CARD ================= */}
                <div
                  onClick={scrollToConsultation}
                  className="absolute bottom-8 xs:bottom-12 sm:bottom-16 lg:bottom-18 right-0 sm:-right-2 lg:-right-4 w-[230px] xs:w-[260px] sm:w-[285px] lg:w-[295px] z-30 bg-white rounded-[22px] sm:rounded-[24px] p-3.5 xs:p-4 sm:p-4.5 border border-border-subtle/80 shadow-[0_20px_45px_rgba(43,45,36,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_rgba(43,45,36,0.22)] cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1B704C] shrink-0" />
                    <span className="text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-700 uppercase tracking-wider text-[#1B704C]">
                      FREE 20-MIN CONSULT
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2.5 xs:gap-3">
                    <div>
                      <p className="font-display font-600 text-ink text-[13.5px] xs:text-[15px] sm:text-[16px] leading-snug">
                        1:1 with a real coach
                      </p>
                      <p className="text-[11px] xs:text-[11.5px] sm:text-[12px] text-ink-secondary mt-0.5 xs:mt-1 leading-snug">
                        No forms. No bots.<br />Culturally tailored.
                      </p>
                    </div>

                    <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full bg-[#EDE7DF] text-[#3E4233] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#DFD7CB] transition-colors">
                      <ArrowRight size={16} className="text-[#3E4233] sm:w-[18px] sm:h-[18px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Content Column: Lean, Emotionally Grounded & High-Converting */}
            <div className="flex flex-col order-2 lg:order-1">
              {/* Eyebrow */}
              <div className="reveal">
                <span className="text-eyebrow text-brand-deep uppercase tracking-wider">
                  Occasion &amp; Milestone Wellness Care
                </span>
              </div>

              {/* Primary Headline: Unified Hierarchy & Alignment */}
              <h1 className="reveal delay-100 mt-4 font-display font-600 text-ink text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.14] tracking-tight max-w-xl">
                <span>Your Food Is Part of Your Life.</span>
                <span className="block mt-1 sm:mt-1.5">Your Nutrition Should Be, Too.</span>
              </h1>

              {/* Supporting Headline */}
              <h2 className="reveal delay-200 mt-4 font-display font-500 text-brand-deep text-[20px] sm:text-[23px] lg:text-[25px] leading-snug">
                Say Hello to Empathetic, Cultural Wellness Care.
              </h2>

              {/* Body Copy */}
              <div className="reveal delay-300 mt-4 sm:mt-5 space-y-3 sm:space-y-3.5 text-ink-secondary text-[14.5px] sm:text-[16.5px] leading-[1.6] sm:leading-[1.68] max-w-xl text-pretty">
                <p className="hidden sm:block">
                  Whether you’re preparing for a wedding, engagement, milestone celebration, or another important occasion, you deserve more than a last-minute diet.
                </p>
                <p>
                  Get personalised nutrition and wellness guidance based on your health, lifestyle, food, goals, and the time you have before your event.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="reveal delay-400 mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={scrollToConsultation}
                  className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-xl bg-brand-deep text-surface-white text-[15px] sm:text-[15.5px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
                >
                  <span>Book Your Consultation</span>
                </button>
              </div>

              {/* Proof Hierarchy: 3 Key Pillars + Verified Stat */}
              <div className="reveal delay-500 mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-border-subtle space-y-3 sm:space-y-3.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12.5px] sm:text-[13.5px] text-ink font-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={13.5} className="text-brand-deep shrink-0" />
                    1:1 Personalized Care
                  </span>
                  <span className="text-accent-warm hidden xs:inline">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={13.5} className="text-brand-deep shrink-0" />
                    Online Across the U.S.
                  </span>
                  <span className="text-accent-warm hidden xs:inline">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={13.5} className="text-brand-deep shrink-0" />
                    South Asian Expertise
                  </span>
                </div>

                <div className="flex items-center sm:items-baseline gap-3 pt-1">
                  <span className="font-display font-600 text-brand-deep text-[30px] sm:text-[32px] leading-none shrink-0">
                    91%
                  </span>
                  <p className="text-[12.5px] sm:text-[13.5px] text-ink-secondary leading-snug">
                    of clients report feeling lighter, more energetic, and camera-ready within 4 weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: PERSONALISED CONSULTATION & FORM ON RIGHT SIDE */}
      {/* ============================================================== */}
      <section
        id="how-it-works"
        className="py-10 sm:py-16 lg:py-24 bg-surface-secondary/40 border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_minmax(460px,540px)] gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading, Supporting Content & Large Stats */}
            <div className="flex flex-col justify-between h-full pt-1">
              <div>
                {/* Section Badge 2 */}
                <div className="reveal">
                  <span className="text-eyebrow text-brand-deep uppercase">
                    1:1 Personalised Consultation
                  </span>
                </div>

                <h2 className="reveal delay-100 mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.15] tracking-tight">
                  Let’s Make a Plan That Works for You
                </h2>

                <div className="reveal delay-200 mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-ink-secondary text-[14.5px] sm:text-[16.5px] leading-[1.6] sm:leading-[1.68]">
                  <p className="hidden sm:block">
                    When you have an important occasion coming up, it’s easy to feel unsure about where to start.
                  </p>
                  <p className="hidden sm:block">
                    You may have tried diets before. You may be wondering what to eat, what to change, or how to make it work around your everyday life.
                  </p>
                  <p>
                    Your consultation is a chance to talk through your goals, food, and timeline with a professional — and find an approach that makes sense for you.
                  </p>
                </div>
              </div>

              {/* Trust Statistics with Count-Up Animation for 3 Cards (Card 4 Static) */}
              <div ref={statsSectionRef} className="reveal delay-300 mt-10 pt-8 border-t border-border-subtle">
                <div className="grid grid-cols-2 gap-7 sm:gap-9">
                  {/* Card 1: 5000+ */}
                  <div>
                    <div className="font-display font-500 text-ink text-[34px] sm:text-[42px] leading-none tracking-tight tabular-nums">
                      {statsAnimated ? `${countConsultations}+` : '0+'}
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-2">
                      Consultations
                    </div>
                  </div>

                  {/* Card 2: 30+ */}
                  <div>
                    <div className="font-display font-500 text-ink text-[34px] sm:text-[42px] leading-none tracking-tight tabular-nums">
                      {statsAnimated ? `${countYears}+` : '0+'}
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-2">
                      Years of Experience
                    </div>
                  </div>

                  {/* Card 3: 1:1 */}
                  <div>
                    <div className="font-display font-500 text-ink text-[34px] sm:text-[42px] leading-none tracking-tight tabular-nums">
                      {statsAnimated ? `${countCare}:1` : '0:1'}
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-2">
                      Personalised Care
                    </div>
                  </div>

                  {/* Card 4: South Asian (STATIC - No Animation) */}
                  <div>
                    <div className="font-display text-brand-deep text-[22px] sm:text-[26px] leading-snug font-600">
                      South Asian
                    </div>
                    <div className="text-[13.5px] font-500 text-ink-secondary mt-1">
                      Nutrition Expertise
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2.5 text-[12.5px] sm:text-[13px] text-ink-secondary">
                  <ShieldCheck size={18} className="text-emerald-600 fill-emerald-100/60 shrink-0" />
                  <span>100% Online &amp; HIPAA-Compliant Telehealth Across the U.S.</span>
                </div>
              </div>
            </div>

            {/* Right-Side Form */}
            <div id="consultation-form" className="scroll-mt-28 w-full reveal delay-150">
              <div className="bg-surface-white rounded-hero border border-border-subtle p-6 sm:p-7 lg:p-8 shadow-[0_14px_38px_rgba(43,45,36,0.07)]">
                <div className="mb-4 pb-3 border-b border-border-subtle">
                  <span className="text-[11.5px] font-600 uppercase tracking-wider text-brand-deep block mb-0.5">
                    Direct Booking
                  </span>
                  <h3 className="font-display font-600 text-ink text-[20px] sm:text-[22px] leading-tight">
                    Start With a Personalised Consultation
                  </h3>
                </div>

                {formStatus === 'success' ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center mx-auto">
                      <CheckCircle2 size={30} />
                    </div>
                    <h4 className="font-display font-600 text-ink text-[20px]">
                      Consultation Request Received
                    </h4>
                    <p className="text-[14.5px] text-ink-secondary max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. We have received your request for your upcoming{' '}
                      <span className="font-500 text-ink">{formData.occasion}</span>. We will reach out within 24 hours to schedule your consultation.
                    </p>
                    <button
                      onClick={() => {
                        setFormStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          occasion: '',
                          eventDate: '',
                          notes: '',
                        });
                      }}
                      className="mt-3 text-[13.5px] font-500 text-brand-deep underline cursor-pointer"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-3.5">
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-[13px] font-500 text-ink mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                          }}
                          placeholder="e.g. Priya Sharma"
                          className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none transition-colors ${
                            formErrors.name
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                          }`}
                          aria-invalid={!!formErrors.name}
                          aria-describedby={formErrors.name ? 'name-error' : undefined}
                        />
                        {formErrors.name && (
                          <p id="name-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>{formErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-[13px] font-500 text-ink mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                          }}
                          placeholder="priya@example.com"
                          className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none transition-colors ${
                            formErrors.email
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                          }`}
                          aria-invalid={!!formErrors.email}
                          aria-describedby={formErrors.email ? 'email-error' : undefined}
                        />
                        {formErrors.email && (
                          <p id="email-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone Number and Event Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {/* Phone Number */}
                      <div>
                        <label htmlFor="phone" className="block text-[13px] font-500 text-ink mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                          }}
                          placeholder="(555) 234-5678"
                          className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none transition-colors ${
                            formErrors.phone
                              ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                              : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                          }`}
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                        />
                        {formErrors.phone && (
                          <p id="phone-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                            <AlertCircle size={12} />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      {/* Event date (if any) */}
                      <div>
                        <label htmlFor="eventDate" className="block text-[13px] font-500 text-ink mb-1">
                          Event date <span className="text-ink-muted font-normal">(if any)</span>
                        </label>
                        <input
                          type="text"
                          id="eventDate"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          placeholder="e.g. Nov 2026 / 3 mos"
                          className="w-full h-[46px] px-3.5 rounded-xl border border-border-subtle bg-surface-white text-[14.5px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand-primary focus:bg-surface-primary/30 transition-colors"
                        />
                      </div>
                    </div>

                    {/* What's coming up? */}
                    <div>
                      <label htmlFor="occasion" className="block text-[13px] font-500 text-ink mb-1">
                        What&apos;s coming up?
                      </label>
                      <select
                        id="occasion"
                        value={formData.occasion}
                        onChange={(e) => {
                          setFormData({ ...formData, occasion: e.target.value });
                          if (formErrors.occasion) setFormErrors({ ...formErrors, occasion: '' });
                        }}
                        className={`w-full h-[46px] px-3.5 rounded-xl border bg-surface-white text-[14.5px] text-ink focus:outline-none transition-colors cursor-pointer ${
                          formErrors.occasion
                            ? 'border-red-400 bg-red-50/20 focus:border-red-500'
                            : 'border-border-subtle focus:border-brand-primary focus:bg-surface-primary/30'
                        }`}
                        aria-invalid={!!formErrors.occasion}
                        aria-describedby={formErrors.occasion ? 'occasion-error' : undefined}
                      >
                        <option value="">Select your upcoming occasion</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Milestone Celebration">Milestone Celebration</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Family Reunion">Family Reunion</option>
                        <option value="Special Event">Special Event</option>
                      </select>
                      {formErrors.occasion && (
                        <p id="occasion-error" className="mt-1 text-[12px] text-red-600 flex items-center gap-1">
                          <AlertCircle size={12} />
                          <span>{formErrors.occasion}</span>
                        </p>
                      )}
                    </div>

                    {/* Anything we should know? */}
                    <div>
                      <label htmlFor="notes" className="block text-[13px] font-500 text-ink mb-1">
                        Anything we should know?
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Share dietary preferences, goals, or questions..."
                        className="w-full min-h-[72px] p-3 rounded-xl border border-border-subtle bg-surface-white text-[14px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand-primary focus:bg-surface-primary/30 transition-colors resize-none"
                      />
                    </div>

                    {/* Button - Book Your Consultation */}
                    <div className="pt-1.5">
                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full h-[48px] rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'loading' ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Book Your Consultation</span>
                        )}
                      </button>
                    </div>

                    <p className="text-[12px] text-ink-muted text-center pt-0.5">
                      No referral required · 100% confidential &amp; secure
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: YOUR LIFE DOESN'T HAVE TO GO ON HOLD */}
      {/* 3 Image Feature Cards: Non-overlapping, clean alignment, no text badge */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-16 lg:py-24 bg-surface-primary border-b border-border-subtle">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="reveal text-left sm:text-center max-w-3xl sm:mx-auto">
            {/* Section Badge 3 */}
            <span className="text-eyebrow text-brand-deep uppercase block">
              Realistic Preparation
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.16] tracking-tight">
              Your Life Doesn’t Have to Go on Hold.
            </h2>
            <div className="mt-4 space-y-2 text-ink-secondary text-[15.5px] sm:text-[17px] leading-[1.65]">
              <p>
                Preparing for an important occasion shouldn&apos;t mean putting your life, social plans, or favorite foods aside.
              </p>
              <p>
                Your approach should work alongside your schedule, your relationships, your food, and the moments you&apos;re looking forward to.
              </p>
            </div>
          </div>

          {/* 3 Image Feature Cards with Staggered Scroll Reveal */}
          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Card 01: Flexible, Not Restrictive */}
            <div className="reveal delay-100 bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ease-editorial hover:-translate-y-1">
              <div>
                {/* Top Image */}
                <div className="relative h-[210px] sm:h-[230px] w-full bg-surface-secondary overflow-hidden">
                  <img
                    src="/assets/wedding/gallery-1.jpeg"
                    alt="Flexible, not restrictive South Asian meal prep and nutrition"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge */}
                <div className="relative px-6">
                  <div className="-mt-6 w-12 h-12 rounded-full bg-[#E5ECE1] border-[3px] border-white text-brand-deep flex items-center justify-center shadow-xs z-10 relative">
                    <Leaf size={20} className="text-brand-deep" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-4 pb-4">
                  <span className="text-[12.5px] font-600 text-ink-muted block mb-1">
                    01
                  </span>
                  <h3 className="font-display font-600 text-ink text-[21px] sm:text-[23px] leading-snug">
                    Flexible, Not Restrictive
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-ink-secondary leading-relaxed">
                    Enjoy the foods you love and make changes without an all-or-nothing approach.
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="px-6 pb-6 pt-2">
                <div className="w-8 h-[2.5px] bg-[#8F9E8B] rounded-full" />
              </div>
            </div>

            {/* Card 02: Personal, Not Prescribed */}
            <div className="reveal delay-200 bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ease-editorial hover:-translate-y-1">
              <div>
                {/* Top Image */}
                <div className="relative h-[210px] sm:h-[230px] w-full bg-surface-secondary overflow-hidden">
                  <img
                    src="/assets/wedding/gallery-2.jpeg"
                    alt="Personalized lifestyle and nutrition planning"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge */}
                <div className="relative px-6">
                  <div className="-mt-6 w-12 h-12 rounded-full bg-[#FCEAE6] border-[3px] border-white text-[#B85D4D] flex items-center justify-center shadow-xs z-10 relative">
                    <User size={20} className="text-[#B85D4D]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-4 pb-4">
                  <span className="text-[12.5px] font-600 text-ink-muted block mb-1">
                    02
                  </span>
                  <h3 className="font-display font-600 text-ink text-[21px] sm:text-[23px] leading-snug">
                    Personal, Not Prescribed
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-ink-secondary leading-relaxed">
                    Your recommendations are based on your goals, needs and lifestyle — not a one-size-fits-all plan.
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="px-6 pb-6 pt-2">
                <div className="w-8 h-[2.5px] bg-[#C47C70] rounded-full" />
              </div>
            </div>

            {/* Card 03: Sustainable, Not Short-Term */}
            <div className="reveal delay-300 bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ease-editorial hover:-translate-y-1">
              <div>
                {/* Top Image */}
                <div className="relative h-[210px] sm:h-[230px] w-full bg-surface-secondary overflow-hidden">
                  <img
                    src="/assets/wedding/gallery-3.jpeg"
                    alt="Sustainable habits for celebration and beyond"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Badge */}
                <div className="relative px-6">
                  <div className="-mt-6 w-12 h-12 rounded-full bg-[#E5ECE1] border-[3px] border-white text-brand-deep flex items-center justify-center shadow-xs z-10 relative">
                    <Calendar size={20} className="text-brand-deep" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pt-4 pb-4">
                  <span className="text-[12.5px] font-600 text-ink-muted block mb-1">
                    03
                  </span>
                  <h3 className="font-display font-600 text-ink text-[21px] sm:text-[23px] leading-snug">
                    Sustainable, Not Short-Term
                  </h3>
                  <p className="mt-2.5 text-[14.5px] text-ink-secondary leading-relaxed">
                    Build habits that support you beyond the date on your calendar — so you can feel your best, now and later.
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="px-6 pb-6 pt-2">
                <div className="w-8 h-[2.5px] bg-[#5B735F] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: PROVEN OUTCOMES */}
      {/* Centered Section Header + Separate Left Image & Right Card */}
      {/* ============================================================== */}
      <section
        id="outcomes"
        className="py-10 sm:py-16 lg:py-20 relative overflow-hidden bg-[#F5F1EB] border-b border-border-subtle scroll-mt-20"
      >
        {/* Serene soft mist cloud background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_35%_50%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_70%)]" />

        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
          {/* Centered Section Header: Section Badge, Title & Description in Middle */}
          <div className="reveal text-left sm:text-center max-w-3xl sm:mx-auto mb-7 sm:mb-10">
            <span className="text-eyebrow text-brand-deep uppercase block">
              Proven Outcomes
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.16] tracking-tight">
              Real transformation built around real celebrations.
            </h2>

            <p className="mt-3.5 text-ink-secondary text-[14.5px] sm:text-[15.5px] leading-[1.65] max-w-xl sm:mx-auto">
              Every occasion is personal. We create evidence-informed nutrition strategies tailored to your celebrations, family foods, and timeline.
            </p>
          </div>

          {/* Proven Outcomes Card: Combined Single Card on Mobile, 2-Column on Desktop with Hand Swipe */}
          {(() => {
            const currentCase = caseStudies[activeSlide];
            return (
              <div
                className={`select-none transition-opacity duration-150 ${slideVisible ? 'opacity-100' : 'opacity-0'}`}
                onTouchStart={handleOutcomesTouchStart}
                onTouchEnd={handleOutcomesTouchEnd}
              >
                {/* ================= MOBILE COMBINED CARD (< lg) ================= */}
                {/* Combines the image at the top and below text content into ONE seamless card */}
                <div className="block lg:hidden bg-surface-white rounded-[26px] border border-border-subtle/80 shadow-[0_12px_36px_rgba(43,45,36,0.06)] overflow-hidden transition-all duration-300 max-w-xl mx-auto">
                  {/* Top: Combined Case Study Image */}
                  <div className="relative h-[230px] sm:h-[270px] w-full bg-surface-secondary overflow-hidden border-b border-border-subtle/60">
                    <img
                      key={`mob-${currentCase.id}`}
                      src={currentCase.mobileImage || currentCase.image}
                      alt={currentCase.alt}
                      style={{
                        objectPosition:
                          currentCase.mobileImagePosition ||
                          (currentCase.mobileImage ? 'center center' : currentCase.id === 'case-01' ? 'center top' : 'center center'),
                      }}
                      className="w-full h-full object-cover transition-all duration-500 ease-editorial"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom: The Outcome Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between min-h-[340px]">
                    {/* Header Row: MEMBER, Name, and City Badge with MapPin */}
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-700 uppercase tracking-widest text-[#7C7A72] block">
                            MEMBER
                          </span>
                          <h3 className="font-display font-600 text-ink text-[21px] sm:text-[24px] leading-tight mt-0.5">
                            {currentCase.member}
                          </h3>
                        </div>

                        {/* City Badge with MapPin */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EFE9] text-ink text-[11.5px] font-500 border border-border-subtle/60 shrink-0 mt-1">
                          <MapPin size={12} className="text-[#6E7065] shrink-0" />
                          <span>{currentCase.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Center Detail Rows */}
                    <div className="my-3.5 space-y-2.5">
                      {/* Row 1: DIAGNOSIS */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="w-8 h-8 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                          <Calendar size={14.5} strokeWidth={1.9} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                            DIAGNOSIS
                          </span>
                          <p className="text-[13.5px] font-500 text-ink leading-snug">
                            {currentCase.diagnosis}
                          </p>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[#EDE7DF] w-full" />

                      {/* Row 2: GOALS */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="w-8 h-8 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                          <Target size={14.5} strokeWidth={1.9} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                            GOALS
                          </span>
                          <p className="text-[12.5px] text-[#55534C] leading-normal">
                            {currentCase.goal}
                          </p>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[#EDE7DF] w-full" />

                      {/* Row 3: THE STRATEGY */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="w-8 h-8 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                          <Lightbulb size={14.5} strokeWidth={1.9} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                            THE STRATEGY
                          </span>
                          <p className="text-[12.5px] text-[#55534C] leading-normal">
                            {currentCase.strategy}
                          </p>
                        </div>
                      </div>

                      <div className="h-[1px] bg-[#EDE7DF] w-full" />

                      {/* Row 4: RESULT */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="w-8 h-8 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                          <BarChart2 size={14.5} strokeWidth={1.9} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                            RESULT
                          </span>
                          <p className="text-[12.5px] text-ink font-500 leading-normal">
                            {currentCase.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Founder Box with Avatar */}
                    <div className="rounded-2xl bg-[#F5F0E9] border border-[#E9E2D8] px-3.5 py-3 flex items-center gap-3 mt-1">
                      <img
                        src={founderImg}
                        alt="Dr. Hena Nafis"
                        className="w-9 h-9 rounded-full object-cover object-top ring-1 ring-border-subtle shrink-0"
                      />
                      <div className="h-7 w-[1px] bg-[#DFD8CE] shrink-0" />
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[9px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none">
                          SHARED BY
                        </span>
                        <span className="font-display font-600 text-ink text-[13px] leading-snug mt-0.5">
                          Dr. Hena Nafis
                        </span>
                        <span className="text-[10.5px] text-[#66635B] leading-none mt-0.5">
                          Chief Nutritionist &amp; Registered Dietitian
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= DESKTOP 2-COLUMN LAYOUT (lg and above) ================= */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-8 items-stretch max-w-4xl lg:max-w-[960px] mx-auto">
                  {/* Left Side: Image Placeholder */}
                  <div className="reveal delay-100 h-full">
                    <div className="h-full min-h-[460px] rounded-[26px] sm:rounded-[28px] overflow-hidden border border-border-subtle/80 shadow-[0_12px_36px_rgba(43,45,36,0.06)] bg-surface-white relative group">
                      <img
                        key={currentCase.id}
                        src={currentCase.image}
                        alt={currentCase.alt}
                        style={{ objectPosition: currentCase.id === 'case-01' ? 'center top' : 'center center' }}
                        className={`w-full h-full object-cover ${currentCase.id === 'case-01' ? 'object-top' : 'object-center'} transition-all duration-500 ease-editorial group-hover:scale-102`}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Right Side: The Outcome Card matching attached design */}
                  <div className="reveal delay-150 h-full">
                    <div className="bg-surface-white rounded-[26px] sm:rounded-[28px] border border-border-subtle/80 shadow-[0_12px_36px_rgba(43,45,36,0.06)] p-6 sm:p-7 lg:px-7.5 lg:py-6 h-full flex flex-col justify-between transition-all duration-300">
                      {/* Header Row: MEMBER, Name, and City Badge with MapPin */}
                      <div className="shrink-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] sm:text-[10.5px] font-700 uppercase tracking-widest text-[#7C7A72] block">
                              MEMBER
                            </span>
                            <h3 className="font-display font-600 text-ink text-[22px] sm:text-[26px] lg:text-[27px] leading-tight mt-0.5">
                              {currentCase.member}
                            </h3>
                          </div>

                          {/* City Badge with MapPin */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EFE9] text-ink text-[11.5px] sm:text-[12px] font-500 border border-border-subtle/60 shrink-0 mt-1">
                            <MapPin size={12.5} className="text-[#6E7065] shrink-0" />
                            <span>{currentCase.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Center Detail Rows: Evenly distributed with balanced gaps and paddings */}
                      <div className="flex-1 flex flex-col justify-between my-3 sm:my-4 py-0.5">
                        {/* Row 1: DIAGNOSIS */}
                        <div className="flex items-center gap-3.5 sm:gap-4 py-1.5 sm:py-2">
                          <div className="w-9 h-9 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                            <Calendar size={15.5} strokeWidth={1.9} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] sm:text-[10.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                              DIAGNOSIS
                            </span>
                            <p className="text-[14px] sm:text-[14.5px] font-500 text-ink leading-snug">
                              {currentCase.diagnosis}
                            </p>
                          </div>
                        </div>

                        {/* Divider 1 */}
                        <div className="h-[1px] bg-[#EDE7DF] w-full" />

                        {/* Row 2: GOALS */}
                        <div className="flex items-center gap-3.5 sm:gap-4 py-1.5 sm:py-2">
                          <div className="w-9 h-9 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                            <Target size={15.5} strokeWidth={1.9} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] sm:text-[10.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                              GOALS
                            </span>
                            <p className="text-[12.5px] sm:text-[13px] text-[#55534C] leading-normal">
                              {currentCase.goal}
                            </p>
                          </div>
                        </div>

                        {/* Divider 2 */}
                        <div className="h-[1px] bg-[#EDE7DF] w-full" />

                        {/* Row 3: THE STRATEGY */}
                        <div className="flex items-center gap-3.5 sm:gap-4 py-1.5 sm:py-2">
                          <div className="w-9 h-9 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                            <Lightbulb size={15.5} strokeWidth={1.9} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] sm:text-[10.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                              THE STRATEGY
                            </span>
                            <p className="text-[12.5px] sm:text-[13px] text-[#55534C] leading-normal">
                              {currentCase.strategy}
                            </p>
                          </div>
                        </div>

                        {/* Divider 3 */}
                        <div className="h-[1px] bg-[#EDE7DF] w-full" />

                        {/* Row 4: RESULT */}
                        <div className="flex items-center gap-3.5 sm:gap-4 py-1.5 sm:py-2">
                          <div className="w-9 h-9 rounded-full bg-[#EFEAE2] text-[#55574C] flex items-center justify-center shrink-0 shadow-2xs">
                            <BarChart2 size={15.5} strokeWidth={1.9} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] sm:text-[10.5px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none mb-1">
                              RESULT
                            </span>
                            <p className="text-[12.5px] sm:text-[13px] text-ink font-500 leading-normal">
                              {currentCase.result}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Founder Box with Avatar and Vertical Divider */}
                      <div className="shrink-0 rounded-2xl bg-[#F5F0E9] border border-[#E9E2D8] px-4 py-3 sm:py-3.5 flex items-center gap-3.5 sm:gap-4">
                        <img
                          src={founderImg}
                          alt="Dr. Hena Nafis"
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-top ring-1 ring-border-subtle shrink-0"
                        />
                        <div className="h-8 w-[1px] bg-[#DFD8CE] shrink-0" />
                        <div className="flex flex-col justify-center min-w-0">
                          <span className="text-[9.5px] sm:text-[10px] font-700 uppercase tracking-wider text-[#7C7A72] block leading-none">
                            SHARED BY
                          </span>
                          <span className="font-display font-600 text-ink text-[13.5px] sm:text-[14px] leading-snug mt-1">
                            Dr. Hena Nafis
                          </span>
                          <span className="text-[11px] sm:text-[11.5px] text-[#66635B] leading-none mt-0.5">
                            Chief Nutritionist &amp; Registered Dietitian
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Carousel Controls: Left & Right Buttons, Dots, and Slide Indicator (Auto-scroll removed) */}
          <div className="max-w-xl mx-auto mt-6 sm:mt-7 flex items-center justify-between gap-4 px-2 select-none">
            {/* Left Button */}
            <button
              onClick={handlePrevSlide}
              className="w-10 h-10 rounded-full bg-surface-white border border-border-subtle shadow-xs hover:bg-surface-secondary flex items-center justify-center text-ink hover:text-brand-deep active:scale-95 transition-all cursor-pointer"
              aria-label="Previous outcome"
              title="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Center: Pagination Dots & Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSlide(i)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      activeSlide === i
                        ? 'w-7 h-2.5 bg-brand-deep'
                        : 'w-2.5 h-2.5 bg-border-subtle hover:bg-ink-secondary/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-[12px] font-500 text-ink-secondary hidden xs:inline tabular-nums">
                {activeSlide + 1} / {caseStudies.length}
              </span>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNextSlide}
              className="w-10 h-10 rounded-full bg-surface-white border border-border-subtle shadow-xs hover:bg-surface-secondary flex items-center justify-center text-ink hover:text-brand-deep active:scale-95 transition-all cursor-pointer"
              aria-label="Next outcome"
              title="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Centered Book Your Consultation Button */}
          <div className="mt-8 text-center reveal">
            <button
              onClick={scrollToConsultation}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
            >
              <span>Book Your Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: WHY SA WELLNESS IS DIFFERENT */}
      {/* ============================================================== */}
      <section
        id="why-sa-wellness"
        className="py-10 sm:py-16 lg:py-24 bg-surface-primary border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="reveal text-left sm:text-center max-w-3xl sm:mx-auto">
            {/* Section Badge 5 */}
            <span className="text-eyebrow text-brand-deep uppercase block">
              Why SA Wellness Is Different
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[28px] sm:text-[38px] lg:text-[42px] leading-[1.16] tracking-tight">
              You Don’t Need a More Restrictive Plan. You Need a More Personal One.
            </h2>
            <p className="mt-3 sm:mt-4 font-display font-500 text-brand-deep text-[17px] sm:text-[20px]">
              Your Occasion Is the Reason to Start - Not a Reason to Rush.
            </p>
          </div>

          {/* ================= MOBILE COMPARISON CARDS (< sm) ================= */}
          {/* Separate Top (The Usual Approach) and Bottom (The SA Wellness Approach) Cards */}
          <div className="block sm:hidden mt-8 space-y-4 max-w-xl mx-auto reveal delay-150">
            {/* Top Card: The Usual Approach */}
            <div className="bg-[#FAF7F2] rounded-[22px] border border-border-subtle p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border-subtle">
                <div>
                  <span className="text-[10px] font-700 uppercase tracking-wider text-ink-muted block leading-none">
                    TRADITIONAL METHOD
                  </span>
                  <h3 className="font-display font-600 text-ink text-[18px] mt-1">
                    The Usual Approach
                  </h3>
                </div>
                <span className="w-7 h-7 rounded-full bg-surface-secondary/70 border border-border-subtle text-ink-muted flex items-center justify-center shrink-0 text-[12px] font-bold">
                  ✕
                </span>
              </div>

              <div className="space-y-3">
                {comparisons.map((row, idx) => (
                  <div key={`usual-${idx}`} className="flex items-start gap-3 text-[13.5px] text-ink-secondary leading-snug">
                    <span className="w-5 h-5 rounded-full border border-border-subtle bg-surface-white text-ink-muted flex items-center justify-center shrink-0 mt-0.5 text-[10.5px]">
                      ✕
                    </span>
                    <span>{row.usual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle Divider / VS Bridge */}
            <div className="flex items-center justify-center py-0.5">
              <div className="h-[1px] bg-border-subtle/80 flex-1" />
              <span className="px-3 py-1 text-[10.5px] font-700 tracking-wider text-brand-deep bg-surface-secondary rounded-full border border-border-subtle uppercase mx-2 shadow-2xs">
                VS
              </span>
              <div className="h-[1px] bg-border-subtle/80 flex-1" />
            </div>

            {/* Bottom Card: The SA Wellness Approach (Elevated & Highlighted) */}
            <div className="bg-surface-white rounded-[24px] border-2 border-brand-primary/45 p-5 shadow-[0_12px_32px_rgba(71,75,55,0.08)] ring-1 ring-brand-primary/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border-subtle">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-700 uppercase tracking-wider text-brand-deep bg-brand-soft/70 px-2 py-0.5 rounded-md leading-none">
                    OUR SOLUTION
                  </span>
                  <h3 className="font-display font-600 text-ink text-[18px] mt-1">
                    The SA Wellness Approach
                  </h3>
                </div>
                <span className="w-7 h-7 rounded-full bg-brand-deep text-white flex items-center justify-center shrink-0 text-[12px] font-bold shadow-2xs">
                  ✓
                </span>
              </div>

              <div className="space-y-3">
                {comparisons.map((row, idx) => (
                  <div key={`sa-${idx}`} className="flex items-start gap-3 text-[13.5px] text-ink font-500 leading-snug">
                    <span className="w-5 h-5 rounded-full bg-brand-deep text-white flex items-center justify-center shrink-0 mt-0.5 text-[10.5px] shadow-2xs">
                      ✓
                    </span>
                    <span>{row.sa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= DESKTOP COMPARISON TABLE (sm and above) ================= */}
          <div className="hidden sm:block reveal delay-150 mt-12 lg:mt-14 max-w-4xl mx-auto bg-surface-white rounded-editorial border border-border-subtle overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-2 border-b border-border-subtle text-[13.5px] font-600">
              <div className="p-4 sm:p-5 text-ink-secondary bg-surface-primary/60">
                The Usual Approach
              </div>
              <div className="p-4 sm:p-5 text-brand-deep bg-brand-soft/40 border-l border-border-subtle">
                The SA Wellness Approach
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border-subtle">
              {comparisons.map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 text-[14.5px]">
                  {/* Left Column (The Usual Approach) */}
                  <div className="p-4 sm:p-5 text-ink-secondary flex items-start gap-3 bg-surface-white">
                    <span className="w-5 h-5 rounded-full border border-border-subtle text-ink-secondary flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      ✕
                    </span>
                    <span>{row.usual}</span>
                  </div>

                  {/* Right Column (The SA Wellness Approach) */}
                  <div className="p-4 sm:p-5 text-ink font-500 flex items-start gap-3 bg-surface-secondary/30 border-l border-border-subtle">
                    <span className="w-5 h-5 rounded-full bg-brand-deep text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                      ✓
                    </span>
                    <span>{row.sa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Copy & Button */}
          <div className="reveal delay-200 mt-10 sm:mt-12 text-left sm:text-center max-w-2xl sm:mx-auto">
            <p className="text-[15.5px] sm:text-[16px] text-ink-secondary leading-[1.65]">
              At SA Wellness, we look beyond a meal plan to understand your health, lifestyle, food preferences, goals, and the occasion you&apos;re preparing for.
            </p>
            <div className="mt-7 flex sm:justify-center">
              <button
                onClick={scrollToConsultation}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
              >
                <span>Book Your Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: WHO’S BEHIND SA WELLNESS */}
      {/* ============================================================== */}
      <section
        id="about"
        className="py-10 sm:py-16 lg:py-24 bg-surface-secondary/40 border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Dr. Hena Nafis Image on Left Side - reduced radius on mobile */}
            <div className="relative reveal-scale">
              <div className="overflow-hidden rounded-xl sm:rounded-editorial border border-border-subtle shadow-md bg-surface-white">
                <img
                  src={founderImg}
                  alt="Dr. Hena Nafis, Founder, SA Wellness"
                  className="w-full h-[380px] sm:h-[500px] object-cover object-top"
                  loading="lazy"
                  width={900}
                  height={600}
                />
              </div>
            </div>

            {/* Founder Statement and Attribution */}
            <div className="reveal delay-150">
              {/* Section Badge 6 */}
              <span className="text-eyebrow text-brand-deep uppercase block mb-3 sm:mb-4">
                WHO’S BEHIND SA WELLNESS
              </span>

              <div className="pl-4 sm:pl-5 border-l-2 border-brand-primary">
                <blockquote className="font-display font-500 text-ink text-[19px] sm:text-[25px] lg:text-[27px] leading-[1.3] text-balance">
                  &ldquo;I built SA Wellness to help South Asians take care of their health without feeling like they have to give up the food, culture, and experiences that are part of their lives. I believe nutrition should fit into your life - not take it over.&rdquo;
                </blockquote>
              </div>

              <div className="mt-5 sm:mt-7">
                <div className="font-display font-600 text-ink text-[18px] sm:text-[19px]">
                  Dr. Hena Nafis
                </div>
                <div className="text-[13.5px] sm:text-[14px] text-ink-secondary mt-0.5 font-500">
                  Founder, SA Wellness
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: FAQ */}
      {/* ============================================================== */}
      <section
        id="faq"
        className="py-10 sm:py-16 lg:py-24 bg-surface-primary border-b border-border-subtle scroll-mt-20"
      >
        <div className="mx-auto max-w-[960px] px-6 lg:px-10">
          <div className="reveal text-left sm:text-center max-w-2xl sm:mx-auto mb-7 sm:mb-14">
            {/* Section Badge 7 */}
            <span className="text-eyebrow text-brand-deep uppercase block">
              Frequently Asked Questions
            </span>

            <h2 className="mt-3 font-display font-600 text-ink text-[26px] sm:text-[38px] leading-[1.16] tracking-tight">
              A Few Things You May Be Wondering
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`reveal bg-surface-white rounded-[20px] sm:rounded-2xl border transition-all duration-250 overflow-hidden ${
                    isOpen
                      ? 'border-brand-primary/40 shadow-sm ring-1 ring-brand-primary/10'
                      : 'border-border-subtle hover:border-border hover:shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between gap-3.5 sm:gap-4 cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-600 text-ink text-[15.5px] sm:text-[17px] leading-snug group-hover:text-brand-deep transition-colors">
                      {item.question}
                    </span>
                    <span
                      className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full border border-border-subtle flex items-center justify-center shrink-0 transition-all duration-300 ease-editorial ${
                        isOpen
                          ? 'rotate-45 bg-sand text-brand-deep border-sand-warm shadow-2xs'
                          : 'bg-surface-secondary/50 text-ink-secondary group-hover:bg-sand/40 group-hover:text-brand-deep'
                      }`}
                    >
                      <Plus size={15} strokeWidth={2.2} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-3.5 sm:px-6 sm:pb-6 sm:pt-4 text-ink-secondary text-[14px] sm:text-[15px] leading-[1.65] border-t border-border-subtle/60 animate-fade-in">
                      <p className="max-w-2xl">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Small line below FAQ & Book Your Consultation */}
          <div className="reveal delay-100 mt-8 sm:mt-12 text-center p-5 sm:p-8 rounded-[22px] sm:rounded-editorial bg-surface-secondary/40 border border-border-subtle">
            <p className="text-[15.5px] sm:text-[16px] font-500 text-ink">
              Still have questions? Start with a conversation.
            </p>
            <div className="mt-4">
              <button
                onClick={scrollToConsultation}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 shadow-xs cursor-pointer"
              >
                <span>Book Your Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
