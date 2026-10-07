import { useEffect, useRef, useState } from 'react';

interface LifestyleImage {
  src: string;
  alt: string;
}

const lifestyleImages: LifestyleImage[] = [
  {
    src: 'https://images.pexels.com/photos/9345640/pexels-photo-9345640.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'South Asian woman preparing fresh traditional flatbread in warm kitchen',
  },
  {
    src: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*lpAUWnkk__moyqqCd42Vfg.png',
    alt: 'South Asian couple cooking wholesome plant-rich dinner together',
  },
  {
    src: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Active morning jogger supporting cardiovascular and metabolic health',
  },
  {
    src: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Nourishing South Asian bowl with balanced grains, legumes, and fresh greens',
  },
  {
    src: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*aQWaTUhhQkRX0QHxPcRhWw.png',
    alt: 'Professional woman enjoying a calming herbal tea break at home',
  },
  {
    src: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Selecting vibrant fresh organic greens and produce at market',
  },
  {
    src: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*9O07CQanscChpG2pi-SnPg.png',
    alt: 'Morning wellness and active lifestyle routine in sunlit studio',
  },
  {
    src: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
    alt: 'Culturally authentic meal with lentils, spices, and fresh herbs',
  },
];

export default function HeroImageRibbon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const offsetRef = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Repeat sequence 4 times to guarantee seamless infinite wrapping across any screen width
  const repeatedItems = [
    ...lifestyleImages,
    ...lifestyleImages,
    ...lifestyleImages,
    ...lifestyleImages,
  ];

  const [cardWidth, setCardWidth] = useState(250);
  const cardGap = 22;
  const stride = cardWidth + cardGap;
  const loopWidth = lifestyleImages.length * stride;

  // Responsive card size check
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCardWidth(210);
      } else if (w < 1024) {
        setCardWidth(235);
      } else {
        setCardWidth(260);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionPreference);

    // Continuous auto-scroll animation loop (26px per second)
    const SPEED_PX_PER_SEC = 26;

    const updateFrame = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const deltaSec = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      if (!isHoveredRef.current && !prefersReducedMotion) {
        offsetRef.current += SPEED_PX_PER_SEC * deltaSec;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth;
        }
      }

      const container = containerRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const centerX = containerWidth / 2;

        cardElementsRef.current.forEach((el, index) => {
          if (!el) return;

          // Compute horizontal position with circular modulo
          const rawX = index * stride - offsetRef.current - loopWidth;
          const cardCenterX = rawX + cardWidth / 2;
          const distFromCenter = cardCenterX - centerX;

          // Normalized distance from center (-1 at left edge, 0 at center, +1 at right edge)
          const normDist = distFromCenter / (centerX * 0.9);
          const absNorm = Math.abs(normDist);

          // Only render/compute visible or near-visible elements
          if (rawX < -cardWidth * 2 || rawX > containerWidth + cardWidth) {
            el.style.visibility = 'hidden';
            return;
          }

          el.style.visibility = 'visible';

          // Concave 3D Perspective Calculations:
          // Center images face forward (rotateY = 0)
          // Images to left face inwards towards center (rotateY > 0)
          // Images to right face inwards towards center (rotateY < 0)
          const clampedNorm = Math.max(-1.4, Math.min(1.4, normDist));
          const rotateY = -clampedNorm * 15; // 0 to ±15°
          const translateZ = -Math.pow(Math.min(1.2, absNorm), 1.4) * 55; // 0 to -55px depth
          const scale = Math.max(0.88, 1 - Math.min(1.2, absNorm) * 0.1); // 1.0 down to ~0.89
          const opacity = Math.max(0.65, 1 - Math.min(1.2, absNorm) * 0.28); // 1.0 down to ~0.70

          el.style.transform = `translate3d(${rawX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          el.style.opacity = `${opacity}`;
        });
      }

      animationFrameId.current = requestAnimationFrame(updateFrame);
    };

    animationFrameId.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, [cardWidth, loopWidth, stride]);

  return (
    <div
      className="relative w-full py-4 select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[350px] lg:h-[385px] overflow-hidden"
        style={{
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Soft edge masking for smooth cinematic entrance & exit */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to right, #FAF7F2 0%, rgba(250,247,242,0) 8%, rgba(250,247,242,0) 92%, #FAF7F2 100%)',
          }}
          aria-hidden="true"
        />

        {/* Floating Cards */}
        {repeatedItems.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(node) => {
              cardElementsRef.current[index] = node;
            }}
            className="absolute top-4 left-0 will-change-transform rounded-2xl overflow-hidden bg-surface-white border border-border-subtle/80 shadow-[0_10px_28px_rgba(43,45,36,0.08)] transition-shadow duration-300"
            style={{
              width: cardWidth,
              height: cardWidth * 1.28, // ~4:5 portrait ratio
              transformOrigin: '50% 50%',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
