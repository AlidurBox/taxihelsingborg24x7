import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AirportsSection, CtaBand, PageHero, PricesSection, VehiclesSection } from '@/components/sections';
import { PHOTOS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Priser',
  description: 'Fasta taxipriser från Helsingborg. Flygtaxi till Kastrup 1 945 kr, Sturup 1 795 kr och Ängelholm 695 kr. Sök bland 51 orter och boka direkt.',
  alternates: { canonical: '/priser' },
};

export default function PriserPage() {
  return (
    <>
      <PageHero
        kicker="Priser"
        title="Fasta priser,"
        accent="inga överraskningar"
        lead="Du vet vad resan kostar innan du åker. Priserna gäller personbil från Helsingborg, upp till 4 personer. Storbil för 5–8 personer: ring för pris."
        photo={PHOTOS.malmo}
      />
      <PricesSection />
      <AirportsSection />
      <VehiclesSection />
      <section className="section">
        <div className="wrap price-info">
          <div className="price-info-van">
            <Image src={PHOTOS.van.src} alt={PHOTOS.van.alt} width={400} height={274} />
            <h3>Fler än 4 personer?</h3>
            <p>Vi har storbil för upp till 8 personer. <Link href="/boka?storbil=1">Boka storbilstaxi</Link> eller ring så ger vi dig ett pris.</p>
          </div>
          <div>
            <h3>Betala som du vill</h3>
            <p>Swish, Klarna eller kort (Visa, Mastercard, American Express).</p>
          </div>
          <div>
            <h3>Företag?</h3>
            <p>Avtalskunder får förmånliga priser och en samlad faktura. <Link href="/#foretag">Bli avtalskund</Link></p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
