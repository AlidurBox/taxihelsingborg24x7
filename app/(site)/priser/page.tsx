import type { Metadata } from 'next';
import Link from 'next/link';
import { AirportsSection, CtaBand, PageHero, PricesSection } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Priser',
  description: 'Fasta taxipriser från Helsingborg. Flygtaxi till Kastrup 1 895 kr, Sturup 1 795 kr och Ängelholm 695 kr. Sök bland 49 orter och boka direkt.',
  alternates: { canonical: '/priser' },
};

export default function PriserPage() {
  return (
    <>
      <PageHero
        kicker="Priser"
        title="Fasta priser, inga överraskningar"
        lead="Du vet vad resan kostar innan du åker. Alla priser gäller personbil från Helsingborg, upp till 4 personer."
      />
      <AirportsSection />
      <PricesSection alt />
      <section className="section">
        <div className="wrap price-info">
          <div>
            <h3>Fler än 4 personer?</h3>
            <p>Vi har storbil för upp till 8 personer. Ring så ger vi dig ett pris.</p>
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
