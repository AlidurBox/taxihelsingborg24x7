import type { Metadata } from 'next';
import { CtaBand, PageHero, ReviewsSection, ServicesSection, Stats } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Om oss',
  description: 'Taxi Helsingborg 24x7 är ett lokalt taxibolag i Helsingborg. Erfarna chaufförer, fasta priser och öppet dygnet runt sedan 2019.',
  alternates: { canonical: '/om-oss' },
};

export default function OmOssPage() {
  return (
    <>
      <PageHero
        kicker="Om oss"
        title="Lokalt taxibolag i Helsingborg"
        lead="Vi kör taxi och flygtaxi i Helsingborg, nordvästra Skåne och hela Öresundsregionen. Dygnet runt, årets alla dagar."
      />

      <section className="section">
        <div className="wrap about-grid about-light">
          <div>
            <h2>Trygga resor sedan 2019</h2>
            <p>Taxi Helsingborg 24x7 startade 2019 med en enkel idé: det ska vara lätt att få tag på en taxi i Helsingborg, oavsett tid på dygnet.</p>
            <p>Våra chaufförer är erfarna, punktliga och lokalkända. Vi hämtar dig vid dörren, hjälper till med bagaget och ser till att du kommer fram i tid.</p>
            <p>Vi satsar på bränslesnåla fordon för en hållbar och bekväm resa, och vi kör alltid till fast pris så att du vet vad resan kostar.</p>
          </div>
          <Stats />
        </div>
      </section>

      <ServicesSection />
      <ReviewsSection />
      <CtaBand />
    </>
  );
}
