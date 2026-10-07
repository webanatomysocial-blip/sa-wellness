import { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Home,
  Printer,
  Sparkles,
  CalendarCheck,
  ShieldAlert,
  Activity,
  Award,
  Stethoscope,
  Utensils,
  Dumbbell,
  Instagram,
  Youtube,
  Facebook,
  User,
  Mail,
  Phone
} from 'lucide-react';

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.652-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { name: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'WhatsApp', href: 'https://whatsapp.com', icon: WhatsAppIcon },
];

interface AssessmentPageProps {
  onGoHome: () => void;
  onBookConsultation: () => void;
}

export default function AssessmentPage({ onGoHome, onBookConsultation }: AssessmentPageProps) {
  // Navigation / Step state: 1 to 6 (1: Basics, 2: Medical/Family, 3: Lifestyle, 4: Women's Health, 5: Labs, 6: Results)
  const [currentStep, setCurrentStep] = useState(1);
  // Mini-sections within each step: 1 or 2
  const [currentSubStep, setCurrentSubStep] = useState(1);

  const getMaxSubSteps = (step: number) => {
    if (step >= 1 && step <= 5) {
      if (step === 4 && sex === 'male') return 0;
      return 2;
    }
    return 1;
  };

  // Unit toggle: 'imperial' (inches, lbs) or 'metric' (cm, kg)
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');

  // Step 1: User Demographics & Body Measurements
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<string>('');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('8');
  const [weightKg, setWeightKg] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [waistCm, setWaistCm] = useState<string>('');
  const [waistIn, setWaistIn] = useState<string>('');
  const [bpSystolic, setBpSystolic] = useState<string>('');
  const [bpDiastolic, setBpDiastolic] = useState<string>('');

  // Step 2: Family & Medical History (values: 'yes' | 'no' | 'dont_know')
  const [history, setHistory] = useState<Record<string, string>>({
    prediabetes: 'no',
    diabetes: 'no',
    hypertension: 'no',
    lipids: 'no',
    fattyLiver: 'no',
    cvd: 'no',
    sleepApnea: 'no',
    pcos: 'no',
  });

  const [familyDiabetes, setFamilyDiabetes] = useState<string>('no');
  const [familyHeartDisease, setFamilyHeartDisease] = useState<string>('no');

  // Step 3: Daily Habits
  const [physicalActivity, setPhysicalActivity] = useState<string>('150_plus'); // 'under_75' | '75_149' | '150_plus'
  const [strengthExercise, setStrengthExercise] = useState<string>('2_plus'); // 'never' | 'once_week' | '2_plus'
  const [sittingTime, setSittingTime] = useState<string>('under_6'); // 'under_6' | '6_to_8' | 'over_8'
  const [sugaryDrinks, setSugaryDrinks] = useState<string>('rarely'); // 'rarely' | '1_to_3' | '4_to_6' | 'daily'
  const [sweetsDesserts, setSweetsDesserts] = useState<string>('under_2'); // 'under_2' | '2_to_4' | '5_plus'
  const [refinedCarbs, setRefinedCarbs] = useState<string>('occasionally'); // 'occasionally' | 'once_day' | 'twice_plus'
  const [vegLegumes, setVegLegumes] = useState<string>('3_plus'); // 'under_1' | '1_to_2' | '3_plus'
  const [sleepDuration, setSleepDuration] = useState<string>('7_to_9'); // 'under_6' | '6_to_7' | '7_to_9' | 'over_9'

  // Step 4: Women's Health
  const [gestationalDiabetes, setGestationalDiabetes] = useState<string>('no'); // 'yes' | 'no' | 'never' | 'dont_know'
  const [deliveredLargeBaby, setDeliveredLargeBaby] = useState<string>('no'); // 'yes' | 'no' | 'dont_know'

  // Step 5: Optional Labs
  const [labA1c, setLabA1c] = useState<string>('');
  const [labGlucose, setLabGlucose] = useState<string>('');
  const [labTriglycerides, setLabTriglycerides] = useState<string>('');
  const [labHdl, setLabHdl] = useState<string>('');
  const [labLdl, setLabLdl] = useState<string>('');
  const [labAltAst, setLabAltAst] = useState<string>('');
  const [labInsulin, setLabInsulin] = useState<string>('');
  const [labHomaIr, setLabHomaIr] = useState<string>('');

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Height and Weight conversions & BMI calculations
  const totalHeightInches = useMemo(() => {
    if (unitSystem === 'imperial') {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      return ft * 12 + inch;
    } else {
      const cm = parseFloat(heightCm) || 0;
      return cm / 2.54;
    }
  }, [unitSystem, heightFt, heightIn, heightCm]);

  const totalHeightCm = useMemo(() => {
    return totalHeightInches * 2.54;
  }, [totalHeightInches]);

  const totalWeightKg = useMemo(() => {
    if (unitSystem === 'imperial') {
      const lbs = parseFloat(weightLbs) || 0;
      return lbs * 0.453592;
    } else {
      return parseFloat(weightKg) || 0;
    }
  }, [unitSystem, weightLbs, weightKg]);

  const totalWaistInches = useMemo(() => {
    if (unitSystem === 'imperial') {
      return parseFloat(waistIn) || 0;
    } else {
      return (parseFloat(waistCm) || 0) / 2.54;
    }
  }, [unitSystem, waistIn, waistCm]);

  const totalWaistCm = useMemo(() => {
    return totalWaistInches * 2.54;
  }, [totalWaistInches]);

  // Derived Anthropometrics
  const calculatedBmi = useMemo(() => {
    if (totalHeightCm > 50 && totalWeightKg > 20) {
      const heightM = totalHeightCm / 100;
      return Number((totalWeightKg / (heightM * heightM)).toFixed(1));
    }
    return 0;
  }, [totalHeightCm, totalWeightKg]);

  const calculatedWhtr = useMemo(() => {
    if (totalHeightCm > 50 && totalWaistCm > 20) {
      return Number((totalWaistCm / totalHeightCm).toFixed(2));
    }
    return 0;
  }, [totalWaistCm, totalHeightCm]);

  // Scoring Engine based on the Official Scoring Sheet
  // A. Anthropometric Subtotal (Max 5 pts)
  const anthropometricScore = useMemo(() => {
    let pts = 0;
    if (calculatedBmi >= 27.5) pts += 2;
    else if (calculatedBmi >= 23) pts += 1;

    if (sex === 'male' && totalWaistCm >= 90) pts += 2;
    if (sex === 'female' && totalWaistCm >= 80) pts += 2;

    if (calculatedWhtr >= 0.50) pts += 1;

    return Math.min(pts, 5);
  }, [calculatedBmi, calculatedWhtr, totalWaistCm, sex]);

  // B. Medical / Family History Subtotal
  const medicalFamilyScore = useMemo(() => {
    let pts = 0;
    if (familyDiabetes === 'yes') pts += 2;
    if (history.prediabetes === 'yes') pts += 2;
    if (history.hypertension === 'yes') pts += 1;
    if (history.lipids === 'yes') pts += 1;
    if (history.fattyLiver === 'yes') pts += 1;
    if (sex === 'female' && history.pcos === 'yes') pts += 1;
    if (history.sleepApnea === 'yes') pts += 1;
    if (history.cvd === 'yes') pts += 2;
    if (sex === 'female' && gestationalDiabetes === 'yes') pts += 2;

    return pts;
  }, [familyDiabetes, history, sex, gestationalDiabetes]);

  // C. Lifestyle Subtotal (Max 14 pts)
  const lifestyleScore = useMemo(() => {
    let pts = 0;
    if (physicalActivity === 'under_75') pts += 2;
    else if (physicalActivity === '75_149') pts += 1;

    if (strengthExercise === 'never' || strengthExercise === 'once_week') pts += 1;

    if (sittingTime === 'over_8') pts += 2;
    else if (sittingTime === '6_to_8') pts += 1;

    if (sugaryDrinks === 'daily' || sugaryDrinks === '4_to_6') pts += 2;
    else if (sugaryDrinks === '1_to_3') pts += 1;

    if (sweetsDesserts === '5_plus') pts += 2;
    else if (sweetsDesserts === '2_to_4') pts += 1;

    if (refinedCarbs === 'twice_plus') pts += 2;
    else if (refinedCarbs === 'once_day') pts += 1;

    if (vegLegumes === 'under_1') pts += 2;
    else if (vegLegumes === '1_to_2') pts += 1;

    if (sleepDuration === 'under_6' || sleepDuration === '6_to_7') pts += 1;

    return Math.min(pts, 14);
  }, [physicalActivity, strengthExercise, sittingTime, sugaryDrinks, sweetsDesserts, refinedCarbs, vegLegumes, sleepDuration]);

  // Total Score
  const totalScore = anthropometricScore + medicalFamilyScore + lifestyleScore;
  const maxPossibleScore = sex === 'female' ? 32 : 30;

  // Clinical Flags Detection
  const clinicalFlags = useMemo(() => {
    const flags: string[] = [];

    // Lab HbA1c
    const a1cNum = parseFloat(labA1c);
    if (!isNaN(a1cNum)) {
      if (a1cNum >= 6.5) flags.push('Diabetes-range HbA1c test (≥6.5%)');
      else if (a1cNum >= 5.7) flags.push('Prediabetes-range HbA1c test (5.7% – 6.4%)');
    }

    // Fasting Glucose
    const glucoseNum = parseFloat(labGlucose);
    if (!isNaN(glucoseNum)) {
      if (glucoseNum >= 126) flags.push('Diabetes-range Fasting Glucose (≥126 mg/dL)');
      else if (glucoseNum >= 100) flags.push('Prediabetes-range Fasting Glucose (100–125 mg/dL)');
    }

    // Blood Pressure
    const sys = parseFloat(bpSystolic);
    const dia = parseFloat(bpDiastolic);
    if ((!isNaN(sys) && sys >= 130) || (!isNaN(dia) && dia >= 80) || history.hypertension === 'yes') {
      flags.push('Elevated Blood Pressure / Hypertension (≥130/80 mmHg)');
    }

    // Lipids
    const tg = parseFloat(labTriglycerides);
    const hdl = parseFloat(labHdl);
    if ((!isNaN(tg) && tg > 250) || (!isNaN(hdl) && hdl < 35) || history.lipids === 'yes') {
      flags.push('Abnormal Cholesterol / Triglycerides');
    }

    // Waist
    if ((sex === 'male' && totalWaistCm >= 90) || (sex === 'female' && totalWaistCm >= 80) || calculatedWhtr >= 0.50) {
      flags.push('Increased Waist Circumference / Central Adiposity');
    }

    // Fatty Liver
    if (history.fattyLiver === 'yes') {
      flags.push('Known Fatty Liver (MASLD)');
    }

    // Heart Disease
    if (history.cvd === 'yes') {
      flags.push('Known Cardiovascular Disease / Stroke history');
    }

    // Gestational Diabetes
    if (sex === 'female' && gestationalDiabetes === 'yes') {
      flags.push('History of Gestational Diabetes');
    }

    return flags;
  }, [labA1c, labGlucose, bpSystolic, bpDiastolic, history, labTriglycerides, labHdl, sex, totalWaistCm, calculatedWhtr, gestationalDiabetes]);

  // Risk Classification
  const riskProfile = useMemo(() => {
    const hasDiabetesFlag = clinicalFlags.some((f) => f.includes('Diabetes-range'));
    if (hasDiabetesFlag || totalScore >= 18) {
      return {
        level: 'VERY HIGH RISK / CLINICAL FLAG',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        textColor: 'text-rose-950',
        bgColor: 'bg-rose-50/80',
        accentColor: '#E11D48',
        gaugePercent: 92,
        summary: 'Multiple metabolic risk factors and/or clinical flags identified.',
        action: 'Arrange a prompt medical evaluation with a healthcare professional to review your blood sugar, blood pressure, lipid panel, and comprehensive cardiometabolic profile. Do not rely on questionnaire score alone.',
      };
    } else if (totalScore >= 12 || clinicalFlags.length >= 2) {
      return {
        level: 'HIGHER RISK',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        textColor: 'text-amber-950',
        bgColor: 'bg-amber-50/80',
        accentColor: '#D97706',
        gaugePercent: 68,
        summary: 'Multiple anthropometric, family, medical or lifestyle risk factors are present.',
        action: 'Recommend medical review and dedicated South Asian metabolic screening (fasting insulin, ApoB, HbA1c, and liver enzymes). Targeted nutritional intervention is strongly advised.',
      };
    } else if (totalScore >= 7 || clinicalFlags.length === 1) {
      return {
        level: 'INCREASED RISK',
        badgeColor: 'bg-sand text-brand-deep border-sand-warm',
        textColor: 'text-brand-deep',
        bgColor: 'bg-sand/40',
        accentColor: '#B57C48',
        gaugePercent: 44,
        summary: 'Several risk factors are present but no major clinical abnormality identified.',
        action: 'Consider discussing blood sugar/HbA1c, blood pressure, and cholesterol testing with your physician. Initiating proactive dietary and physical activity adjustments can halt progression.',
      };
    } else {
      return {
        level: 'LOWER CURRENT RISK',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        textColor: 'text-emerald-950',
        bgColor: 'bg-emerald-50/80',
        accentColor: '#10B981',
        gaugePercent: 20,
        summary: 'Fewer recognized risk factors and no major clinical flags.',
        action: 'Continue regular physical activity, a balanced South Asian diet, restorative sleep, and routine annual preventive health screenings.',
      };
    }
  }, [totalScore, clinicalFlags]);

  // Top 3 Modifiable Priorities generated based on user responses
  const topPriorities = useMemo(() => {
    const list: { title: string; desc: string; icon: typeof Utensils }[] = [];

    if (calculatedWhtr >= 0.50 || (sex === 'male' && totalWaistCm >= 90) || (sex === 'female' && totalWaistCm >= 80)) {
      list.push({
        title: 'Target Abdominal Visceral Adiposity',
        desc: 'South Asian genetics prioritize visceral fat around the liver and pancreas. Targeted fiber sequencing and meal pacing halt deeper adipose accumulation.',
        icon: Activity,
      });
    }
    if (refinedCarbs === 'twice_plus' || refinedCarbs === 'once_day') {
      list.push({
        title: 'Optimize Carbohydrate Architecture',
        desc: 'Pair traditional rotis and basmati rice with double portions of dal and seasonal sabzi to dampen post-meal glucose spikes.',
        icon: Utensils,
      });
    }
    if (strengthExercise === 'never' || strengthExercise === 'once_week') {
      list.push({
        title: 'Build Muscle Glucose Reservoirs',
        desc: 'Resistance training 2–3 times weekly expands skeletal muscle glycogen capacity, reducing insulin demand.',
        icon: Dumbbell,
      });
    }
    if (sugaryDrinks === 'daily' || sugaryDrinks === '4_to_6' || sugaryDrinks === '1_to_3') {
      list.push({
        title: 'Calibrate Sweetened Chai & Beverages',
        desc: 'Substitute table sugar and condensed milk with unsweetened cardamom, ginger, and cinnamon infusions.',
        icon: Utensils,
      });
    }
    if (sweetsDesserts === '5_plus' || sweetsDesserts === '2_to_4') {
      list.push({
        title: 'Reserve Traditional Mithai for Occasions',
        desc: 'Reduce routine mithai and bakery biscuits, swapping daily cravings for roasted makhana, walnuts, and berries.',
        icon: Utensils,
      });
    }
    if (physicalActivity === 'under_75' || physicalActivity === '75_149') {
      list.push({
        title: 'Elevate Weekly Movement to 150+ Mins',
        desc: 'Brisk 15-minute walks directly after meals activate GLUT4 receptors independently of insulin.',
        icon: Activity,
      });
    }

    return list.slice(0, 3);
  }, [calculatedWhtr, sex, totalWaistCm, refinedCarbs, strengthExercise, sugaryDrinks, sweetsDesserts, physicalActivity]);

  // Step names
  const stepsList = [
    { num: 1, title: 'Basic Information' },
    { num: 2, title: 'Medical & Family' },
    { num: 3, title: 'Daily Habits' },
    { num: 4, title: "Women's Health", hide: sex === 'male' },
    { num: 5, title: 'Know Your Numbers' },
    { num: 6, title: 'Your Scorecard' },
  ].filter((s) => !s.hide);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Auto-scroll active section badge into center view smoothly
  useEffect(() => {
    const activeTab = tabRefs.current[currentStep];
    if (activeTab && tabsContainerRef.current) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    const maxSub = getMaxSubSteps(currentStep);
    if (currentSubStep < maxSub) {
      setCurrentSubStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentSubStep(1);
    if (sex === 'male' && currentStep === 3) {
      setCurrentStep(5);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep > 1) {
      const prevStep = sex === 'male' && currentStep === 5 ? 3 : currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentSubStep(getMaxSubSteps(prevStep));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-surface-primary text-ink flex flex-col selection:bg-sand-warm selection:text-ink">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-surface-white/95 backdrop-blur-md border-b border-border-subtle print:hidden">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between relative">
          {/* Left: Logo */}
          <div className="flex items-center">
            <button
              onClick={onGoHome}
              className="flex items-center group cursor-pointer focus:outline-none"
              aria-label="Return to SA Wellness home"
            >
              <img
                src="/assets/logo/sa-wellness-logo.png"
                alt="SA Wellness"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                width={180}
                height={48}
              />
            </button>
          </div>

          {/* Center: Health Assessment Badge */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="text-[12px] sm:text-[13px] font-600 bg-sand px-3.5 py-1 rounded-full border border-sand-warm text-brand-deep shadow-xs tracking-wide">
              Health Assessment
            </span>
          </div>

          {/* Right: Step Indicator (Exit to Home CTA removed) */}
          <div className="flex items-center gap-2">
            {currentStep < 6 && (
              <span className="text-[12.5px] sm:text-[13px] font-500 text-ink-secondary bg-surface-secondary/70 px-3 py-1 rounded-full border border-border-subtle">
                Step {currentStep} of {sex === 'male' ? 5 : 6}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-secondary h-1.5">
          <div
            className="bg-brand-primary h-full transition-all duration-300"
            style={{
              width: `${
                currentStep === 6
                  ? 100
                  : Math.min((((currentStep - 1) * 2 + currentSubStep) / (sex === 'male' ? 8 : 10)) * 100, 95)
              }%`,
            }}
          />
        </div>
      </header>

      {/* Main Questionnaire Container */}
      <main className="flex-1 py-8 sm:py-12 pb-28 sm:pb-12 px-4 sm:px-6 lg:px-8 print:p-0 print:py-0 print:m-0">
        <div className="mx-auto max-w-[820px] print:max-w-none print:w-full">
          {/* Section Wise Navigation Tabs (Clickable to jump with smooth auto-scroll & visual hierarchy) */}
          <div className="mb-8 print:hidden relative">
            <div
              ref={tabsContainerRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 px-1 scroll-smooth no-scrollbar scrollbar-none text-[13px] font-500 touch-pan-x"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {stepsList.map((s) => {
                const isActive = currentStep === s.num;
                const isPast = currentStep > s.num;
                return (
                  <button
                    key={s.num}
                    ref={(el) => {
                      tabRefs.current[s.num] = el;
                    }}
                    onClick={() => {
                      setCurrentStep(s.num);
                      setCurrentSubStep(1);
                    }}
                    className={`group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl border whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                        : isPast
                        ? 'bg-surface-white border-brand-primary/35 text-brand-deep hover:bg-sand/30 hover:border-brand-primary/60'
                        : 'bg-surface-white/80 border-border-subtle text-ink-secondary hover:text-ink hover:bg-surface-secondary/70'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-600 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isPast
                          ? 'bg-sand text-brand-deep'
                          : 'bg-surface-secondary text-ink-muted group-hover:text-ink-secondary'
                      }`}
                    >
                      {isPast ? '✓' : s.num}
                    </span>
                    <span className={isActive ? 'font-600' : ''}>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 1: BASIC INFORMATION */}
          {currentStep === 1 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              {/* MINI-SECTION 1: DEMOGRAPHICS (Name, Email, Phone, Biological Sex & Age) */}
              {currentSubStep === 1 && (
                <div key="step1-part1" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      1. Basic Demographics
                    </h2>
                    <p className="text-[13px] sm:text-[13.5px] text-ink-secondary mt-1">
                      Enter your personal details to receive your customized metabolic health analysis.
                    </p>
                  </div>

                  {/* Contact Information (Name, Email, Phone) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div className="sm:col-span-2">
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          placeholder="e.g. rahul@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                          <Phone size={18} />
                        </span>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Biological Demographics (Sex & Age) */}
                  <div className="pt-2 border-t border-border-subtle/70">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Biological Sex
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSex('male')}
                          className={`p-3.5 rounded-xl border text-center font-500 text-[14px] transition-all cursor-pointer ${
                            sex === 'male'
                              ? 'bg-sand/50 border-brand-primary text-ink ring-1 ring-brand-primary font-600'
                              : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                          }`}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setSex('female')}
                          className={`p-3.5 rounded-xl border text-center font-500 text-[14px] transition-all cursor-pointer ${
                            sex === 'female'
                              ? 'bg-sand/50 border-brand-primary text-ink ring-1 ring-brand-primary font-600'
                              : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                          }`}
                        >
                          Female
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        placeholder="e.g. 38"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

              {/* MINI-SECTION 2: BODY MEASUREMENTS & VITALS */}
              {currentSubStep === 2 && (
                <div key="step1-part2" className="space-y-7 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      Body Measurements &amp; Vitals
                    </h2>

                    {/* Unit Switcher */}
                    <div className="inline-flex p-1 bg-surface-secondary rounded-xl border border-border-subtle text-[12.5px] font-500 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setUnitSystem('imperial')}
                        className={`w-36 text-center justify-center inline-flex items-center py-1.5 rounded-lg transition-all cursor-pointer ${
                          unitSystem === 'imperial'
                            ? 'bg-surface-white text-ink shadow-xs font-600'
                            : 'text-ink-secondary hover:text-ink'
                        }`}
                      >
                        Imperial (in / lbs)
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnitSystem('metric')}
                        className={`w-36 text-center justify-center inline-flex items-center py-1.5 rounded-lg transition-all cursor-pointer ${
                          unitSystem === 'metric'
                            ? 'bg-surface-white text-ink shadow-xs font-600'
                            : 'text-ink-secondary hover:text-ink'
                        }`}
                      >
                        Metric (cm / kg)
                      </button>
                    </div>
                  </div>

                  {/* Height & Weight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Height {unitSystem === 'imperial' ? '(ft & in)' : '(cm)'}
                      </label>
                      {unitSystem === 'imperial' ? (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <input
                              type="number"
                              placeholder="Feet"
                              value={heightFt}
                              onChange={(e) => setHeightFt(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                            />
                            <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">ft</span>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              placeholder="Inches"
                              value={heightIn}
                              onChange={(e) => setHeightIn(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                            />
                            <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">in</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="e.g. 172"
                            value={heightCm}
                            onChange={(e) => setHeightCm(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          />
                          <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">cm</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Weight {unitSystem === 'imperial' ? '(lbs)' : '(kg)'}
                      </label>
                      {unitSystem === 'imperial' ? (
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="e.g. 165"
                            value={weightLbs}
                            onChange={(e) => setWeightLbs(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          />
                          <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">lbs</span>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="e.g. 75"
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          />
                          <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">kg</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Real-time calculated indicators if entered */}
                  {(calculatedBmi > 0 || calculatedWhtr > 0) && (
                    <div className="p-3.5 rounded-xl bg-sand/35 border border-sand-warm flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
                      <div className="flex items-center gap-3">
                        <span className="font-600 text-brand-deep">Calculated Live:</span>
                        {calculatedBmi > 0 && (
                          <span className="px-2.5 py-0.5 rounded-md bg-surface-white border border-border-subtle font-600 text-ink">
                            BMI: {calculatedBmi}
                          </span>
                        )}
                        {calculatedWhtr > 0 && (
                          <span className="px-2.5 py-0.5 rounded-md bg-surface-white border border-border-subtle font-600 text-ink">
                            Waist-to-Height: {calculatedWhtr}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Waist Circumference & Blood Pressure */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Waist Circumference (at navel)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder={unitSystem === 'imperial' ? 'e.g. 34' : 'e.g. 86'}
                          value={unitSystem === 'imperial' ? waistIn : waistCm}
                          onChange={(e) => (unitSystem === 'imperial' ? setWaistIn(e.target.value) : setWaistCm(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3.5 text-[12px] text-ink-secondary">
                          {unitSystem === 'imperial' ? 'in' : 'cm'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13.5px] font-500 text-ink mb-1.5">
                        Blood Pressure, if known (mmHg)
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="Systolic (120)"
                            value={bpSystolic}
                            onChange={(e) => setBpSystolic(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          />
                          <span className="absolute right-2.5 top-3.5 text-[11px] text-ink-muted">Sys</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="Diastolic (80)"
                            value={bpDiastolic}
                            onChange={(e) => setBpDiastolic(e.target.value)}
                            className="w-full px-3.5 py-3 rounded-xl border border-border-subtle bg-surface-white text-ink text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                          />
                          <span className="absolute right-2.5 top-3.5 text-[11px] text-ink-muted">Dia</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: FAMILY & MEDICAL HISTORY */}
          {currentStep === 2 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              {/* MINI-SECTION 1: PERSONAL MEDICAL HISTORY */}
              {currentSubStep === 1 && (
                <div key="step2-part1" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      2. Personal Medical History
                    </h2>
                  </div>

                  {/* Personal Conditions Matrix */}
                  <div>
                    <h3 className="text-[14px] font-600 text-ink mb-3">
                      Have you ever been told by a doctor that you have:
                    </h3>

                    <div className="divide-y divide-border-subtle/70 border border-border-subtle rounded-2xl overflow-hidden">
                      {[
                        { key: 'prediabetes', label: 'Prediabetes or high blood sugar' },
                        { key: 'diabetes', label: 'Diabetes' },
                        { key: 'hypertension', label: 'High blood pressure' },
                        { key: 'lipids', label: 'High cholesterol or triglycerides' },
                        { key: 'fattyLiver', label: 'Fatty liver' },
                        { key: 'cvd', label: 'Heart disease or stroke' },
                        { key: 'sleepApnea', label: 'Sleep apnea' },
                        ...(sex === 'female'
                          ? [{ key: 'pcos', label: 'Polycystic ovary syndrome (PCOS)' }]
                          : []),
                      ].map((condition) => (
                        <div
                          key={condition.key}
                          className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-white hover:bg-surface-secondary/40 transition-colors"
                        >
                          <span className="text-[14px] font-500 text-ink">{condition.label}</span>

                          <div className="inline-flex rounded-xl bg-surface-secondary p-1 border border-border-subtle self-start sm:self-auto">
                            {(['yes', 'no', 'dont_know'] as const).map((val) => {
                              const isSelected = history[condition.key] === val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setHistory((prev) => ({ ...prev, [condition.key]: val }))}
                                  className={`px-3.5 py-1.5 rounded-lg text-[13px] font-500 transition-all cursor-pointer ${
                                    isSelected
                                      ? val === 'yes'
                                        ? 'bg-brand-deep text-white shadow-xs font-600'
                                        : 'bg-surface-white text-ink shadow-xs font-600'
                                      : 'text-ink-secondary hover:text-ink'
                                  }`}
                                >
                                  {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : "Don't know"}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MINI-SECTION 2: FAMILY HISTORY */}
              {currentSubStep === 2 && (
                <div key="step2-part2" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      Family Medical History
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 rounded-2xl border border-border-subtle bg-surface-secondary/40 space-y-3">
                      <span className="text-[13.5px] font-500 text-ink block">
                        Does a parent, brother or sister have diabetes?
                      </span>
                      <div className="flex gap-2">
                        {[
                          { val: 'yes', label: 'Yes' },
                          { val: 'no', label: 'No' },
                          { val: 'dont_know', label: "Don't know" },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setFamilyDiabetes(item.val)}
                            className={`flex-1 py-2 rounded-xl text-[13px] font-500 border transition-all cursor-pointer ${
                              familyDiabetes === item.val
                                ? 'bg-brand-deep text-white border-brand-deep shadow-xs font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-border-subtle bg-surface-secondary/40 space-y-3">
                      <span className="text-[13.5px] font-500 text-ink block">
                        Does a close family member have heart disease or stroke?
                      </span>
                      <div className="flex gap-2">
                        {[
                          { val: 'yes', label: 'Yes' },
                          { val: 'no', label: 'No' },
                          { val: 'dont_know', label: "Don't know" },
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => setFamilyHeartDisease(item.val)}
                            className={`flex-1 py-2 rounded-xl text-[13px] font-500 border transition-all cursor-pointer ${
                              familyHeartDisease === item.val
                                ? 'bg-brand-deep text-white border-brand-deep shadow-xs font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: DAILY HABITS */}
          {currentStep === 3 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              {/* MINI-SECTION 1: PHYSICAL ACTIVITY & SITTING (Questions A, B, C) */}
              {currentSubStep === 1 && (
                <div key="step3-part1" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      3. Physical Activity &amp; Movement
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {/* A. Physical Activity */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        A. How much moderate physical activity do you usually get each week?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'under_75', label: 'Less than 75 minutes' },
                          { id: '75_149', label: '75–149 minutes' },
                          { id: '150_plus', label: '150 minutes or more' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setPhysicalActivity(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              physicalActivity === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* B. Strength Exercise */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        B. How often do you do strength or resistance exercise?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'never', label: 'Never' },
                          { id: 'once_week', label: 'About once a week' },
                          { id: '2_plus', label: '2 or more times a week' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setStrengthExercise(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              strengthExercise === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* C. Sitting Time */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        C. Approximately how many hours do you spend sitting on a typical day?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'under_6', label: 'Less than 6 hours' },
                          { id: '6_to_8', label: '6–8 hours' },
                          { id: 'over_8', label: 'More than 8 hours' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSittingTime(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              sittingTime === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MINI-SECTION 2: DIETARY PATTERNS & SLEEP (Questions D, E, F, G, H) */}
              {currentSubStep === 2 && (
                <div key="step3-part2" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      Dietary Patterns &amp; Sleep
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {/* D. Sugary drinks */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        D. How often do you drink sweetened drinks (soft drinks, sweet chai/coffee, juices)?
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { id: 'rarely', label: 'Rarely/never' },
                          { id: '1_to_3', label: '1–3 times a week' },
                          { id: '4_to_6', label: '4–6 times a week' },
                          { id: 'daily', label: 'Daily' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSugaryDrinks(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              sugaryDrinks === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* E. Sweets and desserts */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        E. How often do you eat mithai, sweets, cakes, biscuits or desserts?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'under_2', label: 'Less than twice a week' },
                          { id: '2_to_4', label: '2–4 times a week' },
                          { id: '5_plus', label: '5 or more times a week' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSweetsDesserts(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              sweetsDesserts === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* F. Refined carbohydrates */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        F. How often do white rice, maida, naan, or paratha make up a major part of your meals?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'occasionally', label: 'Occasionally' },
                          { id: 'once_day', label: 'About once a day' },
                          { id: 'twice_plus', label: 'Twice a day or more' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setRefinedCarbs(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              refinedCarbs === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* G. Vegetables and legumes */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        G. How often do you eat vegetables, dal, beans, chickpeas or legumes?
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'under_1', label: 'Less than once a day' },
                          { id: '1_to_2', label: '1–2 times a day' },
                          { id: '3_plus', label: '3 or more times a day' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setVegLegumes(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              vegLegumes === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* H. Sleep */}
                    <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-2.5">
                      <span className="text-[14px] font-600 text-ink block">
                        H. How much do you usually sleep at night?
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { id: 'under_6', label: 'Less than 6 hours' },
                          { id: '6_to_7', label: '6–7 hours' },
                          { id: '7_to_9', label: '7–9 hours' },
                          { id: 'over_9', label: 'More than 9 hours' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSleepDuration(opt.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              sleepDuration === opt.id
                                ? 'bg-sand/60 border-brand-primary text-ink shadow-xs ring-1 ring-brand-primary font-600'
                                : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                            }`}
                          >
                            <div className="text-[13.5px]">{opt.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: WOMEN'S HEALTH (Only active for Female) */}
          {currentStep === 4 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              {/* MINI-SECTION 1: GESTATIONAL DIABETES */}
              {currentSubStep === 1 && (
                <div key="step4-part1" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      4. Pregnancy-Related Blood Sugar
                    </h2>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-3">
                    <span className="text-[14px] font-600 text-ink block">
                      Have you ever had diabetes during pregnancy (gestational diabetes)?
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { val: 'yes', label: 'Yes' },
                        { val: 'no', label: 'No' },
                        { val: 'never', label: 'Never pregnant' },
                        { val: 'dont_know', label: "Don't know" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setGestationalDiabetes(item.val)}
                          className={`py-3 px-3 rounded-xl text-[13.5px] font-500 border transition-all cursor-pointer ${
                            gestationalDiabetes === item.val
                              ? 'bg-brand-deep text-white border-brand-deep shadow-xs font-600'
                              : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MINI-SECTION 2: INFANT BIRTH WEIGHT */}
              {currentSubStep === 2 && (
                <div key="step4-part2" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      Infant Birth Weight
                    </h2>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-secondary/40 border border-border-subtle space-y-3">
                    <span className="text-[14px] font-600 text-ink block">
                      Have you ever delivered a baby weighing approximately 4 kg (9 lb) or more?
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { val: 'yes', label: 'Yes' },
                        { val: 'no', label: 'No' },
                        { val: 'dont_know', label: "Don't know" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setDeliveredLargeBaby(item.val)}
                          className={`py-3 px-3 rounded-xl text-[13.5px] font-500 border transition-all cursor-pointer ${
                            deliveredLargeBaby === item.val
                              ? 'bg-brand-deep text-white border-brand-deep shadow-xs font-600'
                              : 'bg-surface-white border-border-subtle text-ink-secondary hover:bg-surface-secondary'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 5: KNOW YOUR NUMBERS (LABS) */}
          {currentStep === 5 && (
            <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 sm:p-8 shadow-sm space-y-7 animate-fade-in">
              {/* MINI-SECTION 1: GLUCOSE & LIPIDS */}
              {currentSubStep === 1 && (
                <div key="step5-part1" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      5. Blood Sugar &amp; Lipid Profile
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        HbA1c (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          placeholder="e.g. 5.6"
                          value={labA1c}
                          onChange={(e) => setLabA1c(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        Fasting glucose (mg/dL)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 95"
                          value={labGlucose}
                          onChange={(e) => setLabGlucose(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        Triglycerides (mg/dL)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 150"
                          value={labTriglycerides}
                          onChange={(e) => setLabTriglycerides(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        HDL cholesterol (mg/dL)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 45"
                          value={labHdl}
                          onChange={(e) => setLabHdl(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        LDL cholesterol (mg/dL)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="e.g. 110"
                          value={labLdl}
                          onChange={(e) => setLabLdl(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                        />
                        <span className="absolute right-3.5 top-3 text-[11px] text-ink-muted">mg/dL</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MINI-SECTION 2: LIVER ENZYMES & ADVANCED MARKERS */}
              {currentSubStep === 2 && (
                <div key="step5-part2" className="space-y-6 animate-fade-in">
                  <div className="border-b border-border-subtle pb-4">
                    <h2 className="font-display font-600 text-[22px] sm:text-[24px] text-ink">
                      Liver Enzymes &amp; Insulin Sensitivity
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div className="sm:col-span-2">
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        ALT / AST
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 28 / 24"
                        value={labAltAst}
                        onChange={(e) => setLabAltAst(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        Fasting insulin, if available
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 8.5"
                        value={labInsulin}
                        onChange={(e) => setLabInsulin(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-500 text-ink mb-1">
                        HOMA-IR, if available
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 1.8"
                        value={labHomaIr}
                        onChange={(e) => setLabHomaIr(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border-subtle text-[14px] focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 6: REDESIGNED MODERN & ENGAGING FINAL SCORECARD */}
          {currentStep === 6 && (
            <div id="assessment-scorecard" className="space-y-8 animate-fade-in bg-surface-primary/15 p-2 sm:p-5 rounded-[36px] print:bg-white print:p-0 print:border-none print:shadow-none">
              {/* Print-Only Clinical Header */}
              <div className="hidden print:flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
                <img
                  src="/assets/logo/sa-wellness-logo.png"
                  alt="SA Wellness"
                  className="h-10 w-auto object-contain"
                  width={150}
                  height={40}
                />
                <div className="text-right">
                  <span className="text-[13px] font-700 text-brand-deep block">
                    Metabolic Risk Profile Report
                  </span>
                  {fullName.trim() && (
                    <span className="text-[12px] font-600 text-ink block">
                      Patient: {fullName.trim()}
                    </span>
                  )}
                  <span className="text-[11px] text-ink-secondary block">
                    Report Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Modern Radial Scorecard Hero */}
              <div className="bg-surface-white rounded-[32px] border border-border-subtle p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left Column: Greeting, Tier & Summary */}
                  <div className="space-y-4 max-w-xl text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-600 bg-sand text-brand-deep border border-sand-warm">
                      <Sparkles size={13} />
                      <span>Metabolic Risk Assessment Report</span>
                    </div>

                    <h2 className="font-display font-600 text-ink text-[28px] sm:text-[36px] leading-[1.12]">
                      {fullName.trim() ? `${fullName.trim()}'s Metabolic Health Profile` : 'Your Metabolic Health Profile'}
                    </h2>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                      <span className={`px-4 py-1.5 rounded-full text-[13.5px] font-700 border shadow-xs tracking-wide ${riskProfile.badgeColor}`}>
                        {riskProfile.level}
                      </span>
                    </div>

                    <p className="text-[14.5px] text-ink leading-relaxed font-450">
                      {riskProfile.summary} {riskProfile.action}
                    </p>
                  </div>

                  {/* Right Column: Visual Circular Gauge Score Display */}
                  <div className="relative flex flex-col items-center justify-center shrink-0 p-4">
                    <svg className="w-44 h-44 sm:w-48 sm:h-48 transform -rotate-90" viewBox="0 0 160 160">
                      {/* Background circle track */}
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke="#E8E5DD"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      {/* Active progress arc */}
                      <circle
                        cx="80"
                        cy="80"
                        r="66"
                        stroke={riskProfile.accentColor}
                        strokeWidth="12"
                        strokeDasharray={414}
                        strokeDashoffset={414 - (414 * Math.min(riskProfile.gaugePercent, 100)) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[12px] font-600 text-ink-muted">
                        Risk Score
                      </span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-[38px] sm:text-[42px] font-display font-700 text-ink leading-none">
                          {totalScore}
                        </span>
                        <span className="text-[15px] font-500 text-ink-muted">
                          /{maxPossibleScore}
                        </span>
                      </div>
                      <span className="text-[11px] font-500 text-ink-secondary mt-0.5">
                        Weighted Index
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subscore Pillar Meters */}
                <div className="mt-10 pt-8 border-t border-border-subtle">
                  <h4 className="text-[14px] font-600 text-ink-secondary mb-4">
                    Metabolic Risk Domain Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-brand-deep" />
                          <span className="text-[13px] font-600 text-ink">Anthropometrics</span>
                        </div>
                        <span className="text-[13px] font-700 text-brand-deep">{anthropometricScore} / 5</span>
                      </div>
                      <div className="w-full bg-surface-white h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${(anthropometricScore / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] text-ink-secondary mt-2 block">
                        BMI: {calculatedBmi > 0 ? calculatedBmi : '—'} · WHtR: {calculatedWhtr > 0 ? calculatedWhtr : '—'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Stethoscope size={16} className="text-brand-deep" />
                          <span className="text-[13px] font-600 text-ink">Medical &amp; Genetics</span>
                        </div>
                        <span className="text-[13px] font-700 text-brand-deep">{medicalFamilyScore} pts</span>
                      </div>
                      <div className="w-full bg-surface-white h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min((medicalFamilyScore / 11) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] text-ink-secondary mt-2 block">
                        Family diabetes &amp; personal history
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-secondary/50 border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Utensils size={16} className="text-brand-deep" />
                          <span className="text-[13px] font-600 text-ink">Lifestyle Habits</span>
                        </div>
                        <span className="text-[13px] font-700 text-brand-deep">{lifestyleScore} / 14</span>
                      </div>
                      <div className="w-full bg-surface-white h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${(lifestyleScore / 14) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11.5px] text-ink-secondary mt-2 block">
                        Refined carbs, activity, sitting &amp; sleep
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clinical Flags Screeners */}
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <h4 className="text-[14px] font-600 text-ink-secondary mb-3">
                    Identified Clinical Flags &amp; Indicators
                  </h4>
                  {clinicalFlags.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {clinicalFlags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/90 text-rose-900 text-[13px] font-500 flex items-center gap-2.5"
                        >
                          <AlertTriangle size={16} className="text-rose-600 shrink-0" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] font-500 flex items-center gap-2.5">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      <span>No critical clinical flags identified based on your provided parameters.</span>
                    </div>
                  )}
                </div>

                {/* Top Modifiable Priorities */}
                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-brand-deep" />
                    <h4 className="text-[15px] font-600 text-ink">
                      Your Top Modifiable Priorities
                    </h4>
                  </div>
                  <p className="text-[13.5px] text-ink-secondary mb-4">
                    High-leverage lifestyle shifts grounded in South Asian biology:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {topPriorities.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-sand/35 border border-sand-warm flex flex-col justify-between"
                        >
                          <div>
                            <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-brand-deep mb-3">
                              <Icon size={16} />
                            </div>
                            <h5 className="font-display font-600 text-ink text-[15px] mb-1">
                              {item.title}
                            </h5>
                            <p className="text-[12.5px] text-ink-secondary leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What Should I Do Next? */}
                <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
                  <h4 className="text-[14px] font-600 text-ink-secondary">
                    What Should I Do Next?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
                    <div className="p-4 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
                      <span className="font-600 text-ink block text-[14px]">1. Clinical Bloodwork</span>
                      <p className="text-ink-secondary leading-relaxed">
                        Request a dedicated panel: Fasting insulin, ApoB, HbA1c, and fasting glucose rather than basic cholesterol alone.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
                      <span className="font-600 text-ink block text-[14px]">2. Cultural Meal Sequencing</span>
                      <p className="text-ink-secondary leading-relaxed">
                        Keep your rotis and daal. Consume non-starchy vegetables and protein first, leaving refined starches for the final third of the meal.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-secondary border border-border-subtle space-y-2">
                      <span className="font-600 text-ink block text-[14px]">3. 1-on-1 Virtual Care</span>
                      <p className="text-ink-secondary leading-relaxed">
                        Partner with an accredited South Asian dietitian who specializes in insulin sensitivity and cultural dietary sustainability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Educational Takeaway Reminder */}
                <div className="mt-8 p-5 rounded-2xl bg-brand-deep text-white space-y-2">
                  <div className="flex items-center gap-2 text-sand text-[13px] font-600">
                    <ShieldAlert size={16} className="text-sand" />
                    <span>Remember</span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-white/95">
                    <strong>You do not have to wait for diabetes to take action.</strong> For South Asians, metabolic risk can occur at lower BMI levels and is often accompanied by hidden abdominal visceral fat. Knowing your numbers early gives you an opportunity to act before disease develops.
                  </p>
                </div>
              </div>

              {/* Bottom Sticky-ready Action CTA Bar */}
              <div className="p-6 sm:p-8 rounded-[28px] bg-surface-white border border-border-subtle shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onGoHome}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-deep text-white text-[15px] font-600 hover:bg-brand-primary transition-all shadow-xs cursor-pointer"
                  >
                    <Home size={18} />
                    <span>Go to Home</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-secondary hover:bg-surface-secondary/80 text-ink text-[14px] font-500 border border-border-subtle transition-all cursor-pointer"
                    title="Print or save scorecard"
                  >
                    <Printer size={16} />
                    <span className="hidden sm:inline">Print / Save Scorecard</span>
                  </button>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  <button
                    onClick={onBookConsultation}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sand hover:bg-sand-warm text-brand-deep text-[14.5px] font-600 border border-sand-warm transition-all cursor-pointer shadow-xs"
                  >
                    <CalendarCheck size={16} />
                    <span>Book 1-on-1 Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons (Back / Save & Next) for Steps 1 through 5 */}
          {currentStep < 6 && (
            <div className="fixed bottom-0 inset-x-0 z-40 bg-surface-white/95 backdrop-blur-md border-t border-border-subtle px-4 py-3 pb-[calc(14px+env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:static sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:p-0 sm:shadow-none sm:mt-8 flex items-center justify-between w-full print:hidden">
              {/* Back / Cancel Button */}
              {currentStep > 1 || currentSubStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl text-[14px] font-500 text-ink hover:text-ink bg-surface-secondary/80 hover:bg-surface-secondary sm:bg-transparent border border-border-subtle sm:border-transparent active:scale-95 transition-all cursor-pointer"
                  aria-label="Back to previous section"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onGoHome}
                  className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl text-[14px] font-500 text-ink hover:text-ink bg-surface-secondary/80 hover:bg-surface-secondary sm:bg-transparent border border-border-subtle sm:border-transparent active:scale-95 transition-all cursor-pointer"
                  aria-label="Cancel and go home"
                >
                  <Home size={16} />
                  <span className="hidden sm:inline">Cancel &amp; Go Home</span>
                  <span className="sm:hidden">Cancel</span>
                </button>
              )}

              {/* Primary Save & Next CTA Button */}
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-brand-deep text-white text-[14px] sm:text-[14.5px] font-600 sm:font-500 hover:bg-brand-primary active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer ml-auto"
              >
                <span>
                  {currentStep === 5 && currentSubStep === 2 ? (
                    <>
                      <span className="sm:hidden">Calculate Results</span>
                      <span className="hidden sm:inline">Calculate Score &amp; View Results</span>
                    </>
                  ) : currentSubStep < getMaxSubSteps(currentStep) ? (
                    'Save & Continue'
                  ) : (
                    'Save & Next'
                  )}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer (hidden on mobile) */}
      <footer className="hidden sm:block py-6 border-t border-border-subtle bg-surface-white text-[12.5px] text-ink-secondary print:hidden">
        <div className="mx-auto max-w-[1180px] px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} SA Wellness · Dedicated South Asian Nutrition &amp; Cardiometabolic Care
          </span>
          <div className="flex items-center gap-2.5">
            {socialLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-secondary hover:bg-brand-primary text-ink-secondary hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                  aria-label={`Visit our ${item.name} page`}
                >
                  <IconComp size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
