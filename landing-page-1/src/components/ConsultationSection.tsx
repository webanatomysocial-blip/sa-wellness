import ConsultationForm from './ConsultationForm';

export default function ConsultationSection() {
  return (
    <section id="consultation" className="relative py-16 sm:py-20 lg:py-24 bg-surface-secondary/40 border-t border-border-subtle scroll-mt-20">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_minmax(380px,460px)] gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-eyebrow text-brand-deep uppercase">
              100% Online Consultations
            </span>
            <h2 className="mt-4 font-display font-600 text-ink text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.12] tracking-tight text-balance">
              Book Your 1-on-1 Consultation Today
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] text-ink-secondary leading-[1.65] max-w-xl text-pretty">
              Get direct access to certified dietitians and nutritionists who specialize in South Asian biology, cultural diets, and sustainable habit formation.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-[13.5px] font-500 text-ink">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                <span>Serving All 50 U.S. States</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                <span>HIPAA-Compliant Telehealth</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                <span>No Referral Required</span>
              </div>
            </div>
          </div>

          <div>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
