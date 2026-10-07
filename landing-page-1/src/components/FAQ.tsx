import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Faq = {
  num: string;
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    num: '01',
    question: 'Do I have to give up rice, roti, or other South Asian foods?',
    answer: 'No. One of the core principles of SA Wellness is working with your food, not against it. Rice, roti, dal, and sabzi are not problems to eliminate — they are part of your culture and your life. We help you enjoy these foods in ways that support your health, with practical adjustments to portions, pairing, and timing rather than elimination.',
  },
  {
    num: '02',
    question: 'Is SA Wellness available to South Asians living in the U.S.?',
    answer: 'Yes. SA Wellness is a 100% online nutrition and lifestyle clinic serving South Asians across the United States. All consultations are virtual, so you can access care from anywhere — no commute, no waiting room, no need to live near a clinic.',
  },
  {
    num: '03',
    question: 'Is SA Wellness just another diet program?',
    answer: 'No. SA Wellness is not a diet program — it is a personalized nutrition and lifestyle practice. We don\'t send you a generic meal plan and ask you to follow it. We work with your biology, your food culture, and your real American life to build sustainable habits that last for years, not 30 days.',
  },
];

function AccordionItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div className="border-b border-border-subtle">
      <button
        className="w-full flex items-center gap-5 py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${faq.num}`}
      >
        <span className="font-display font-500 text-ink-muted text-[15px] tabular-nums w-6 shrink-0">
          {faq.num}
        </span>
        <span className="flex-1 font-display font-600 text-ink text-[16px] sm:text-[18px] leading-snug text-balance">
          {faq.question}
        </span>
        <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-border-subtle text-ink-secondary transition-all duration-300 ease-editorial ${open ? 'rotate-45 bg-sand border-sand-warm text-brand-deep shadow-xs' : 'group-hover:border-brand-primary group-hover:text-brand-deep'}`}>
          <Plus size={16} />
        </span>
      </button>
      <div
        id={`faq-${faq.num}`}
        className="overflow-hidden transition-all duration-300 ease-editorial"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="pl-11 pr-12 pb-6">
          <p className="text-ink-secondary text-[15px] leading-[1.65] max-w-2xl">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section id="faq" className="py-20 lg:py-30 scroll-mt-20">
      <div className="mx-auto max-w-[860px] px-6 lg:px-10">
        <div ref={headerRef} className="reveal mb-10">
          <span className="text-eyebrow text-brand-deep uppercase">Before You Book</span>
          <h2 className="mt-4 font-display font-600 text-ink text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight text-balance">
            Before You Book
          </h2>
        </div>

        <div className="border-t border-border-subtle">
          {faqs.map((faq) => (
            <AccordionItem key={faq.num} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
