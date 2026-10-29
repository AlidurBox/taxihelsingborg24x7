import Image from 'next/image';
import Link from 'next/link';
import BookButton from '@/components/BookButton';
import BookingSection from '@/components/BookingSection';
import CompanyForm from '@/components/CompanyForm';
import {
  AirportsSection,
  BenefitsSection,
  BookTaxiButton,
  CallButton,
  CtaBand,
  GallerySection,
  PricesSection,
  ReviewsSection,
  ServicesSection,
  Stats,
  StepsSection,
  Title,
  TrustBar,
  VehiclesSection,
} from '@/components/sections';
import { Icon, WhatsAppIcon } from '@/components/icons';
import { AIRPORTS, PHOTOS, SITE, bookHref, formatKr } from '@/lib/site';

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
        <Image className="bg-photo" src={PHOTOS.hero.src} alt="" fill priority sizes="100vw" />
        <div className="wrap hero-inner">
          <div className="hero-text">
            <p className="eyebrow"><span className="dot" />Öppet nu, dygnet runt</p>
            <h1>Taxi i Helsingborg, <em>tryggt fram</em></h1>
            <p className="lead">Fast pris innan du åker, erfarna lokalkända chaufförer och bilar för 1–8 personer. Boka online eller ring, vi kör alla dagar året om.</p>
            <div className="hero-cta">
              <BookTaxiButton />
              <CallButton />
              <a className="btn btn-glass btn-whatsapp btn-lg" href={SITE.whatsapp} target="_blank" rel="noopener">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
            <p className="hero-van">
              <Image className="hero-van-img" src={PHOTOS.van.src} alt="" width={64} height={44} />
              <span>Fler än fyra? <Link href={bookHref(undefined, { storbil: true })}>Boka storbilstaxi för 5–8 personer</Link></span>
            </p>
            <div className="hero-chips">
              <p>Flygtaxi, fast pris</p>
              {AIRPORTS.map((a) => (
                <BookButton key={a.code} destination={a.dest} className="chip">
                  <Icon name="plane" />
                  {a.short} <strong>{formatKr(a.price)} kr</strong>
                </BookButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />
      <BenefitsSection />
      <VehiclesSection />
      <GallerySection />
      <AirportsSection />
      <PricesSection featured alt />
      <StepsSection />
      <BookingSection />
      <ServicesSection />

      {/* FÖRETAG */}
      <section className="section" id="foretag">
        <div className="wrap book-grid">
          <div className="book-intro">
            <p className="kicker">Företag</p>
            <Title text="Bli" accent="avtalskund" />
            <p>Åker ditt företag taxi ofta? Med ett avtal får ni bättre priser och enklare administration.</p>
            <ul className="checklist">
              <li>Förmånliga avtalspriser</li>
              <li>En samlad faktura per månad</li>
              <li>Tydlig översikt över alla resor</li>
              <li>Prioriterad service dygnet runt</li>
            </ul>
            <p className="fine">Vill du hellre prata direkt? <a href={SITE.phoneHref}>Ring {SITE.phone}</a></p>
          </div>
          <CompanyForm />
        </div>
      </section>

      {/* OM OSS */}
      <section className="section section-alt" id="om-oss">
        <div className="wrap about-grid">
          <div className="about-photo">
            <Image src={PHOTOS.city.src} alt={PHOTOS.city.alt} fill sizes="(max-width: 860px) 100vw, 560px" />
          </div>
          <div>
            <p className="kicker">Om oss</p>
            <Title text="Lokalt taxibolag i" accent="Helsingborg" />
            <p>Vi kör taxi och flygtaxi i Helsingborg, nordvästra Skåne och hela Öresundsregionen. Dygnet runt, årets alla dagar.</p>
            <p>Våra chaufförer är erfarna, punktliga och lokalkända. Sedan 2019 satsar vi på bränslesnåla fordon för en hållbar och bekväm resa.</p>
            <Stats />
            <p className="more-link"><Link href="/om-oss">Läs mer om oss</Link></p>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="section section-tight whatsapp-band">
        <div className="wrap whatsapp-inner">
          <p><strong>Hellre skriva?</strong> Chatta med oss på WhatsApp, så svarar vi så snart vi kan.</p>
          <a className="btn btn-glass" href={SITE.whatsapp} target="_blank" rel="noopener">
            <WhatsAppIcon />
            Chatta på WhatsApp
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
