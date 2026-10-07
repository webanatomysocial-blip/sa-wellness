import { useLenis } from 'lenis/react';

export function useSmoothScroll() {
  const lenis = useLenis();

  const scrollTo = (target: string | HTMLElement, offset: number = -80) => {
    if (lenis) {
      lenis.scrollTo(target, { offset });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { lenis, scrollTo };
}

