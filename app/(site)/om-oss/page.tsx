import type { Metadata } from 'next';
import Image from 'next/image';
import { BenefitsSection, CtaBand, PageHero, ReviewsSection, ServicesSection, Stats, VehiclesSection } from '@/components/sections';
import { PHOTOS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Om oss',
  description: '24x7Taxi Helsingborg är ett lokalt taxibolag i Helsingborg. Erfarna chaufförer, fasta priser och öppet dygnet runt sedan 2019.',
  alternates: { canonical: '/om-oss' },
};

export default function OmOssPage() {
  return (
    <>
      <PageHero
        kicker="Om oss"
        title="Lokalt taxibolag i"
        accent="Helsingborg"
        lead="Vi kör taxi och flygtaxi i Helsingborg, nordvästra Skåne och hela Öresundsregionen. Dygnet runt, årets alla dagar."
      />

      <section className="section">
        <div className="wrap about-grid">
          <div className="about-photo">
            <Image src={PHOTOS.city.src} alt={PHOTOS.city.alt} fill sizes="(max-width: 860px) 100vw, 560px" />
          </div>
          <div>
            <h2>Trygga resor sedan 2019</h2>
            <p>24x7Taxi Helsingborg startade 2019 med en enkel idé: det ska vara lätt att få tag på en taxi i Helsingborg, oavsett tid på dygnet.</p>
            <p>Våra chaufförer är erfarna, punktliga och lokalkända. Vi hämtar dig vid dörren, hjälper till med bagaget och ser till att du kommer fram i tid.</p>
            <p>Vi satsar på bränslesnåla fordon för en hållbar och bekväm resa, och vi kör alltid till fast pris så att du vet vad resan kostar.</p>
            <Stats />
          </div>
        </div>
      </section>

      <BenefitsSection />
      <VehiclesSection />
      <ServicesSection />
      <ReviewsSection />
      <CtaBand />
    </>
  );
}
