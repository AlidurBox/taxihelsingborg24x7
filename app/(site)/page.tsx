import Image from 'next/image';
import Link from 'next/link';
import BookButton from '@/components/BookButton';
import BookingSection from '@/components/BookingSection';
import CompanyForm from '@/components/CompanyForm';
import {
  AirportsSection,
  CallButton,
  CtaBand,
  PricesSection,
  ReviewsSection,
  ServicesSection,
  Stats,
} from '@/components/sections';
import { CalendarIcon, WhatsAppIcon } from '@/components/icons';
import { AIRPORTS, SITE, formatKr } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/assets/icon-512.png`,
  image: `${SITE.url}/assets/og.jpg`,
  telephone: '+46-42-18-09-00',
  email: SITE.email,
  priceRange: 'kr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.street,
    postalCode: SITE.postalCode,
    addressLocality: SITE.city,
    addressCountry: 'SE',
  },
  areaServed: ['Helsingborg', 'Skåne', 'Öresundsregionen'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  paymentAccepted: 'Swish, Klarna, Visa, Mastercard, American Express',
  sameAs: [SITE.facebook, SITE.instagram],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-panel" />
          <div className="hero-speed"><span /><span /><span /></div>
          <Image className="hero-car" src="/assets/bil-tonad.webp" alt="" width={407} height={424} priority />
        </div>
        <div className="wrap hero-inner">
          <div className="hero-text">
            <h1>Taxi i Helsingborg<br /><span>dygnet runt.</span></h1>
            <p className="lead">Ring så kommer vi, eller boka i förväg. Erfarna chaufförer och fasta priser, årets alla dagar.</p>
            <div className="hero-cta">
              <CallButton />
              <BookButton className="btn btn-ghost btn-lg"><CalendarIcon />Boka resa</BookButton>
              <a className="btn btn-ghost btn-whatsapp btn-lg" href={SITE.whatsapp} target="_blank" rel="noopener">
                <WhatsAppIcon />
                Chatta på WhatsApp
              </a>
            </div>
            <div className="hero-chips">
              <p>Flygtaxi, fast pris</p>
              {AIRPORTS.map((a) => (
                <BookButton key={a.code} destination={a.dest} className="chip">
                  {a.short} <strong>{formatKr(a.price)} kr</strong>
                </BookButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="usp" aria-label="Därför väljer kunder oss">
        <div className="wrap usp-grid">
          <div className="usp-item"><strong>Öppet 24/7</strong><span>Dag, natt och helg</span></div>
          <div className="usp-item"><strong>Fasta priser</strong><span>Inga överraskningar</span></div>
          <div className="usp-item"><strong>Swish, Klarna &amp; kort</strong><span>Betala som du vill</span></div>
          <div className="usp-item"><strong>Sedan 2019</strong><span>Tusentals nöjda kunder</span></div>
        </div>
      </section>

      <AirportsSection />

      {/* BOKA */}
      <BookingSection />

      <PricesSection link />

      <ServicesSection />

      {/* FÖRETAG */}
      <section className="section section-alt" id="foretag">
        <div className="wrap book-grid">
          <div className="book-intro">
            <p className="kicker">Företag</p>
            <h2>Bli avtalskund</h2>
            <p>Åker ditt företag taxi ofta? Med ett avtal får ni bättre priser och enklare administration.</p>
            <ul className="checklist checklist-dark">
              <li>Förmånliga avtalspriser</li>
              <li>En samlad faktura per månad</li>
              <li>Tydlig översikt över alla resor</li>
              <li>Prioriterad service dygnet runt</li>
            </ul>
          </div>
          <CompanyForm />
        </div>
      </section>

      {/* OM OSS */}
      <section className="section section-dark" id="om-oss">
        <div className="wrap about-grid">
          <div>
            <p className="kicker">Om oss</p>
            <h2>Lokalt taxibolag i Helsingborg</h2>
            <p>Vi kör taxi och flygtaxi i Helsingborg, nordvästra Skåne och hela Öresundsregionen. Dygnet runt, årets alla dagar.</p>
            <p>Våra chaufförer är erfarna, punktliga och lokalkända. Sedan 2019 satsar vi på bränslesnåla fordon för en hållbar och bekväm resa.</p>
            <p className="more-link"><Link href="/om-oss">Läs mer om oss</Link></p>
          </div>
          <Stats />
        </div>
      </section>

      <ReviewsSection />

      <CtaBand />
    </>
  );
}
