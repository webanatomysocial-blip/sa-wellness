import { ReactLenis } from 'lenis/react';
import Header from '@/components/Header';
import SecondLandingPage from '@/components/SecondLandingPage';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';

export default function App() {
  const navigateToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToConsultation = () => {
    const el = document.querySelector('#consultation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      <div className="min-h-screen bg-surface-primary">
        <Header
          currentPage="second-page"
          onNavigateHome={navigateToHome}
          onBookConsultation={navigateToConsultation}
        />
        <main>
          <SecondLandingPage />
        </main>
        <Footer />
        <MobileCTA onBookConsultation={navigateToConsultation} />
      </div>
    </ReactLenis>
  );
}
