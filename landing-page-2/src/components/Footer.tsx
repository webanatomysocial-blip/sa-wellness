import { Instagram, Youtube, Facebook } from 'lucide-react';

const footerLinks = [
  { label: 'Health Concerns', href: '#health-concerns' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

// Clean vector icons for WhatsApp and TikTok to match Lucide styling
function WhatsAppIcon({ size = 18 }: { size?: number }) {
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

function TikTokIcon({ size = 18 }: { size?: number }) {
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

export default function Footer() {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center">
              <img
                src="/assets/logo/sa-wellness-logo.png"
                alt="SA Wellness"
                className="h-12 sm:h-14 lg:h-[54px] w-auto object-contain brightness-0 invert opacity-95"
                width={232}
                height={120}
              />
            </div>
            <p className="mt-4 text-surface-white/60 text-[14px] leading-relaxed">
              Personalized nutrition and lifestyle care for South Asians in the United States. 100% online consultations.
            </p>

            {/* Social Media Links with Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-white/10 hover:bg-brand-primary text-surface-white/80 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={`Visit our ${item.name} page`}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <h4 className="font-display font-500 text-surface-white/80 text-[13px] uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleClick(link.href)}
                      className="text-surface-white/60 text-[14px] hover:text-surface-white transition-colors text-left cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-500 text-surface-white/80 text-[13px] uppercase tracking-wider mb-4">
                Get Started
              </h4>
              <button
                onClick={() => handleClick('#consultation')}
                className="text-surface-white/60 text-[14px] hover:text-surface-white transition-colors text-left cursor-pointer"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-white/10 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-surface-white/40 text-[13px]">
            © {new Date().getFullYear()} SA Wellness. All rights reserved.
          </p>
          <p className="text-surface-white/40 text-[13px] max-w-xl sm:text-right leading-relaxed">
            SA Wellness provides nutrition and lifestyle guidance. This is not a substitute for medical diagnosis or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
