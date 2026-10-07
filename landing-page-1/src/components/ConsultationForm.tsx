import { useState, type FormEvent } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';

const goals = [
  'Type 2 Diabetes & Prediabetes',
  'Insulin Resistance',
  'Digestive Health',
  'Vitamin D Deficiency',
  'Heart Health',
  'Abdominal / Visceral Fat',
  'High Blood Pressure',
  'PCOS & Hormonal Health',
  'General Wellness',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: Record<string, string>) => {
    const next: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Please enter a valid email.';
    if (!data.phone || data.phone.trim().length < 7) next.phone = 'Please enter your phone number.';
    if (!data.goal) next.goal = 'Please select a goal.';
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: (data.get('name') as string)?.trim(),
      email: (data.get('email') as string)?.trim(),
      phone: (data.get('phone') as string)?.trim(),
      goal: (data.get('goal') as string)?.trim(),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('loading');
    try {
      // Simulate client-side request processing
      await new Promise((resolve) => setTimeout(resolve, 600));
      try {
        const stored = JSON.parse(localStorage.getItem('sa_wellness_consultations') || '[]');
        stored.push({
          ...values,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('sa_wellness_consultations', JSON.stringify(stored));
      } catch {
        // Fallback gracefully if localStorage is unavailable
      }
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-white rounded-hero border border-border p-8 sm:p-10 text-center flex flex-col items-center" role="status" aria-live="polite">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-sand border border-sand-warm mb-5 shadow-xs">
          <Check className="text-brand-deep" size={28} />
        </div>
        <h3 className="font-display font-600 text-ink text-xl mb-2">Thank you for reaching out</h3>
        <p className="text-ink-secondary text-[15px] leading-relaxed max-w-xs">
          Your consultation request has been received. We'll be in touch within 24 hours to schedule your appointment.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-[14px] font-500 text-brand-deep hover:text-brand-primary transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-surface-white rounded-hero border border-border p-6 sm:p-8 shadow-[0_12px_40px_rgba(71,75,55,0.08)]"
      aria-label="Book a consultation"
    >
      <h3 className="font-display font-600 text-ink text-xl mb-1">Book a Consultation</h3>
      <p className="text-ink-secondary text-[14px] mb-6">Take the first step toward better health.</p>

      <div className="flex flex-col gap-5">
        <FormField label="Name" id="name" error={errors.name}>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            className="form-input"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </FormField>

        <FormField label="Email" id="email" error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="form-input"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </FormField>

        <FormField label="Phone" id="phone" error={errors.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            className="form-input"
            placeholder="(555) 123-4567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
        </FormField>

        <FormField label="Select your goal" id="goal" error={errors.goal}>
          <select
            id="goal"
            name="goal"
            className="form-input appearance-none cursor-pointer"
            defaultValue=""
            aria-invalid={!!errors.goal}
            aria-describedby={errors.goal ? 'goal-error' : undefined}
          >
            <option value="" disabled>Choose your primary concern</option>
            {goals.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </FormField>
      </div>

      {status === 'error' && (
        <div className="mt-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200" role="alert">
          <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={16} />
          <p className="text-[13px] text-red-800">Something went wrong. Please try again or email us directly.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-deep text-surface-white text-[15px] font-cta font-500 hover:bg-brand-primary transition-all duration-250 ease-editorial hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 cursor-pointer"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </button>

      <p className="mt-4 text-[12px] text-ink-muted text-center leading-relaxed">
        Your information is private and only used to schedule your consultation.
      </p>

      <style>{`
        .form-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #DFCFC0;
          background: #FAF7F2;
          font-size: 15px;
          color: #262820;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          font-family: inherit;
        }
        .form-input::placeholder { color: #9C988D; }
        .form-input:focus {
          outline: none;
          border-color: #6B7056;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(107, 112, 86, 0.16);
        }
        .form-input:hover:not(:focus) { border-color: #EAE1D5; }
        select.form-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2366635B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
      `}</style>
    </form>
  );
}

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-500 text-ink mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
