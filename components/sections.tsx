// Sektioner som återanvänds på startsidan, /priser och /om-oss.
import Link from 'next/link';
import AirportCarousel from './AirportCarousel';
import BookButton from './BookButton';
import PriceList from './PriceList';
import ReviewGrid from './ReviewGrid';
import { CalendarIcon, PhoneIcon } from './icons';
import { AIRPORTS, SITE, formatKr } from '@/lib/site';

export const SERVICES = [
  ['Lokala resor', 'Till jobbet, krogen eller hem efter middagen. I hela Helsingborg med omnejd.'],
  ['Flygtaxi', 'Kastrup, Sturup och Ängelholm till fast pris, dygnet runt.'],
  ['Företagsresor', 'Från hotell till kontor och mellan möten. Samlad faktura för avtalskunder.'],
  ['Evenemang', 'Transport för bröllop, fester och affärsmöten.'],
  ['Längre resor', 'Göteborg, Stockholm eller Köpenhamn. Vi kör hela vägen till fast pris.'],
  ['Hittegods', 'Glömt något i bilen? Hör av dig så får du tillbaka det snabbt.'],
];

export function CallButton({ className = 'btn btn-yellow btn-lg' }: { className?: string }) {
  return (
    <a className={className} href={SITE.phoneHref}>
      <PhoneIcon />
      Ring {SITE.phone}
    </a>
  );
}

// Mörk rubrikdel överst på undersidor.
export function PageHero({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="hero-cta">
          <CallButton />
          <BookButton className="btn btn-ghost btn-lg"><CalendarIcon />Boka resa</BookButton>
        </div>
      </div>
    </section>
  );
}

export function AirportsSection({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section" id="flygtaxi">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Flygtaxi</p>
          {heading ? <h2>Fast pris till flyget</h2> : <h2>Flygtaxi till fast pris</h2>}
          <p>Från Helsingborg, personbil upp till 4 personer. Vi hämtar vid dörren och ser till att du hinner med flyget.</p>
        </div>
        <AirportCarousel>
          {AIRPORTS.map((a) => (
            <article className="airport" key={a.code}>
              <p className="airport-code">{a.code}</p>
              <h3>{a.name}</h3>
              <p className="airport-price"><span>{formatKr(a.price)}</span> kr</p>
              <BookButton destination={a.dest}>Boka {a.short}</BookButton>
            </article>
          ))}
        </AirportCarousel>
      </div>
    </section>
  );
}

export function PricesSection({ alt = false, link = false }: { alt?: boolean; link?: boolean }) {
  return (
    <section className={`section${alt ? ' section-alt' : ''}`} id="priser">
      <div className="wrap">
        <PriceList>
          <p className="kicker">Priser</p>
          <h2>Fasta priser från Helsingborg</h2>
          <p className="price-lead">Personbil, upp till 4 personer. Klicka på en ort för att boka.</p>
          {link && <p className="more-link"><Link href="/priser">Se alla priser och flygtaxi</Link></p>}
        </PriceList>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section" id="tjanster">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Tjänster</p>
          <h2>Vi tar dig dit du behöver åka</h2>
        </div>
        <div className="service-grid">
          {SERVICES.map(([title, text]) => (
            <article className="service" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="stats">
      <div className="stat"><strong>24/7</strong><span>Öppet alla dagar</span></div>
      <div className="stat"><strong>2019</strong><span>I tjänst sedan</span></div>
      <div className="stat"><strong>4&nbsp;880+</strong><span>Nöjda kunder</span></div>
      <div className="stat"><strong>3</strong><span>Flygplatser</span></div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="section" id="recensioner">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Recensioner</p>
          <h2>Det säger våra kunder</h2>
        </div>
        <ReviewGrid />
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="section cta-band" id="kontakt">
      <div className="wrap">
        <h2>Behöver du taxi?</h2>
        <p>Ring oss, dygnet runt.</p>
        <div className="hero-cta cta-center">
          <CallButton className="btn btn-dark btn-lg" />
          <BookButton className="btn btn-outline btn-lg"><CalendarIcon />Boka resa</BookButton>
        </div>
        <ul className="contact-line">
          <li><a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><a href={SITE.mapsUrl} target="_blank" rel="noopener">{SITE.street}, {SITE.city}</a></li>
        </ul>
      </div>
    </section>
  );
}
