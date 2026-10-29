// Sektioner som återanvänds på startsidan, /priser och /om-oss.
import Image from 'next/image';
import Link from 'next/link';
import BookButton from './BookButton';
import PriceList from './PriceList';
import ReviewGrid from './ReviewGrid';
import { Icon, type IconName } from './icons';
import { AIRPORTS, DESTINATIONS, GALLERY, PHOTOS, PRICES, SITE, bookHref, formatKr, priceFor } from '@/lib/site';

type Photo = { src: string; alt: string };

export const SERVICES: [IconName, string, string][] = [
  ['pin', 'Lokala resor', 'Till jobbet, krogen eller hem efter middagen. I hela Helsingborg med omnejd.'],
  ['plane', 'Flygtaxi', 'Kastrup, Sturup och Ängelholm till fast pris. Vi hämtar vid dörren, dygnet runt.'],
  ['users', 'Storbilstaxi', 'Upp till 8 personer i samma bil. För familjer, grupper, lag och kollegor.'],
  ['briefcase', 'Företagsresor', 'Från hotell till kontor och mellan möten. Samlad faktura för avtalskunder.'],
  ['star', 'Evenemang', 'Transport till och från bröllop, fester och affärsmöten.'],
  ['road', 'Längre resor', 'Göteborg, Stockholm eller Köpenhamn. Vi kör hela vägen till fast pris.'],
];

const BENEFITS: [IconName, string, string][] = [
  ['tag', 'Fast pris innan du åker', 'Priset står i prislistan och i din bokningsbekräftelse. Du vet vad resan kostar innan du sätter dig i bilen.'],
  ['clock', 'Öppet dygnet runt', 'Tidig morgonflight eller sen hemfärd. Vi kör alla dagar, året om.'],
  ['wheel', 'Erfarna, lokalkända chaufförer', 'Punktliga förare som hittar rätt, hjälper till med bagaget och kör tryggt.'],
  ['card', 'Betala som du vill', 'Swish, Klarna eller kort. Vi tar Visa, Mastercard och American Express.'],
];

const STEPS: [string, string][] = [
  ['Fyll i din resa', 'Från, till, datum och tid. Välj storbil om ni är fler än fyra.'],
  ['Vi bekräftar', 'Du får en bekräftelse via telefon eller e-post så snart vi kan.'],
  ['Vi hämtar dig', 'Chauffören möter dig på utsatt tid och plats och kör dig hela vägen fram.'],
];

// Rubrik med ett kursivt, gult ord på slutet: <Title text="Fasta priser," accent="inga överraskningar" />
export function Title({ as: Tag = 'h2', text, accent }: { as?: 'h1' | 'h2'; text: string; accent?: string }) {
  return (
    <Tag>
      {text}
      {accent && <> <em>{accent}</em></>}
    </Tag>
  );
}

export function CallButton({ className = 'btn btn-glass btn-lg' }: { className?: string }) {
  return (
    <a className={className} href={SITE.phoneHref}>
      <Icon name="phone" />
      Ring {SITE.phone}
    </a>
  );
}

export function BookTaxiButton({ className = 'btn btn-yellow btn-lg', destination }: { className?: string; destination?: string }) {
  return (
    <BookButton className={className} destination={destination}>
      <Icon name="calendar" />
      Boka taxi
    </BookButton>
  );
}

export function BookVanButton({ className = 'btn btn-glass btn-lg' }: { className?: string }) {
  return (
    <Link className={className} href={bookHref(undefined, { storbil: true })}>
      <Icon name="users" />
      Boka storbilstaxi
    </Link>
  );
}

// Rubrikdel överst på undersidor, med foto i bakgrunden.
export function PageHero({ kicker, title, accent, lead, photo = PHOTOS.hero }: { kicker: string; title: string; accent?: string; lead: string; photo?: Photo }) {
  return (
    <section className="page-hero">
      <Image className="bg-photo" src={photo.src} alt="" fill priority sizes="100vw" />
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <Title as="h1" text={title} accent={accent} />
        <p className="lead">{lead}</p>
        <div className="hero-cta">
          <BookTaxiButton />
          <CallButton />
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  return (
    <section className="trust" aria-label="Därför väljer kunder oss">
      <div className="wrap trust-grid">
        <div><Icon name="clock" /><p><strong>Öppet 24/7</strong><span>Dag, natt och helg</span></p></div>
        <div><Icon name="tag" /><p><strong>Fasta priser</strong><span>Inga överraskningar</span></p></div>
        <div><Icon name="users" /><p><strong>1–8 personer</strong><span>Personbil och storbil</span></p></div>
        <div><Icon name="shield" /><p><strong>Sedan 2019</strong><span>4&nbsp;880+ nöjda kunder</span></p></div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head center-head">
          <p className="kicker">Därför väljer resenärer oss</p>
          <Title text="Tryggt, bekvämt och" accent="tydligt pris" />
        </div>
        <div className="benefit-grid">
          {BENEFITS.map(([icon, title, text], i) => (
            <article className="benefit" key={title}>
              <span className="benefit-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Personbil och storbilstaxi sida vid sida. id="storbil" används av menyn.
export function VehiclesSection() {
  return (
    <section className="section section-alt" id="storbil">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Våra bilar</p>
          <Title text="Rätt bil för" accent="varje sällskap" />
          <p>Åker du ensam eller med hela familjen? Välj personbil för upp till 4 personer eller storbilstaxi för upp till 8.</p>
        </div>
        <div className="vehicle-grid">
          <article className="vehicle">
            <div className="vehicle-photo vehicle-photo-car">
              <Image src={PHOTOS.car.src} alt={PHOTOS.car.alt} fill sizes="(max-width: 860px) 100vw, 560px" />
            </div>
            <div className="vehicle-body">
              <p className="vehicle-tag"><Icon name="user" />1–4 personer</p>
              <h3>Taxi</h3>
              <p>Bekväm personbil för vardagen, kvällen ute och resan till flyget.</p>
              <ul className="checklist">
                <li>Fast pris till {PRICES.length} orter</li>
                <li>Plats för resväskorna</li>
                <li>Hämtning vid dörren, dygnet runt</li>
              </ul>
              <div className="vehicle-cta">
                <BookTaxiButton className="btn btn-yellow" />
                <Link className="btn btn-glass" href="/priser">Se priser</Link>
              </div>
            </div>
          </article>
          <article className="vehicle vehicle-van">
            <div className="vehicle-photo">
              <Image src={PHOTOS.van.src} alt={PHOTOS.van.alt} fill sizes="(max-width: 860px) 100vw, 560px" />
              <span className="vehicle-badge">För grupp och familj</span>
            </div>
            <div className="vehicle-body">
              <p className="vehicle-tag"><Icon name="users" />5–8 personer</p>
              <h3>Storbilstaxi</h3>
              <p>Hela sällskapet i samma bil. För familjer, gäng på väg ut, kollegor och resor till flyget med mycket bagage.</p>
              <ul className="checklist">
                <li>Upp till 8 passagerare</li>
                <li>Mer plats för bagage</li>
                <li>En bil i stället för två</li>
              </ul>
              <div className="vehicle-cta">
                <BookVanButton className="btn btn-yellow" />
                <a className="btn btn-glass" href={SITE.phoneHref}>Ring för pris</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function AirportsSection() {
  return (
    <section className="section" id="flygtaxi">
      <div className="wrap split">
        <div className="split-photo">
          <Image src={PHOTOS.flight.src} alt={PHOTOS.flight.alt} fill sizes="(max-width: 860px) 100vw, 520px" />
        </div>
        <div>
          <p className="kicker">Flygtaxi</p>
          <Title text="Hinn med flyget," accent="utan stress" />
          <p className="section-lead">Vi hämtar dig vid dörren och kör dig direkt till terminalen, till fast pris. Lika enkelt vid tidiga avgångar som sena landningar.</p>
          <ul className="airport-list">
            {AIRPORTS.map((a) => (
              <li key={a.code}>
                <Link href={bookHref(a.dest)}>
                  <span className="airport-code">{a.code}</span>
                  <span className="airport-name">{a.name}</span>
                  <span className="airport-price">{formatKr(a.price)} kr</span>
                  <span className="airport-go" aria-hidden="true"><Icon name="arrow" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="fine">Personbil från Helsingborg, 1–4 personer. Fler resenärer? <Link href={bookHref(undefined, { storbil: true })}>Boka storbilstaxi</Link> eller <a href={SITE.phoneHref}>ring för pris</a>.</p>
        </div>
      </div>
    </section>
  );
}

// Fotokort för populära resmål, plus ett kort som leder till hela prislistan.
function Destinations() {
  return (
    <div className="dest-grid">
      {DESTINATIONS.map((d) => {
        const price = priceFor(d.name);
        return (
          <Link className="dest" href={bookHref(d.name)} key={d.name}>
            <Image src={d.photo.src} alt={d.photo.alt} fill sizes="(max-width: 860px) 100vw, 380px" />
            <span className="dest-info">
              <span className="dest-route">Helsingborg <Icon name="arrow" /> {d.label}</span>
              {price && <strong>{formatKr(price)} kr</strong>}
            </span>
            <span className="dest-go" aria-hidden="true"><Icon name="arrow" /></span>
          </Link>
        );
      })}
    </div>
  );
}

export function PricesSection({ alt = false, featured = false }: { alt?: boolean; featured?: boolean }) {
  return (
    <section className={`section${alt ? ' section-alt' : ''}`} id="priser">
      <div className="wrap">
        {featured && (
          <>
            <div className="section-head">
              <p className="kicker">Populära resor</p>
              <Title text="Fasta priser," accent="inga överraskningar" />
              <p>Du vet vad resan kostar innan du åker. Klicka på ett resmål för att boka direkt.</p>
            </div>
            <Destinations />
          </>
        )}
        <PriceList>
          <p className="kicker">Prislista</p>
          <h2>Sök bland {PRICES.length} orter</h2>
          <p className="price-lead">Personbil från Helsingborg, upp till 4 personer. Klicka på en ort för att boka. Storbil för 5–8 personer? <a href={SITE.phoneHref}>Ring för pris</a>.</p>
        </PriceList>
      </div>
    </section>
  );
}

// Galleri med egna bilder, på startsidan och på /bilder.
export function GallerySection({ page = false }: { page?: boolean }) {
  return (
    <section className={`section${page ? '' : ' section-alt'}`} id="bilder">
      <div className="wrap">
        {!page && (
          <div className="section-head gallery-head">
            <div>
              <p className="kicker">Bilder</p>
              <Title text="Våra bilar i" accent="Helsingborg" />
            </div>
            <p className="more-link"><Link href="/bilder">Se alla bilder</Link></p>
          </div>
        )}
        <div className="gallery-grid">
          {GALLERY.map(({ photo, caption }, i) => (
            <figure className="gallery-item" key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes={i % 2 ? '(max-width: 860px) 100vw, 390px' : '(max-width: 860px) 100vw, 780px'} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StepsSection() {
  return (
    <section className="section section-tight">
      <div className="wrap">
        <div className="section-head center-head">
          <p className="kicker">Så funkar det</p>
          <Title text="Boka på" accent="tre steg" />
        </div>
        <ol className="steps">
          {STEPS.map(([title, text], i) => (
            <li key={title}>
              <span className="step-num">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section section-alt" id="tjanster">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Tjänster</p>
          <Title text="Vi tar dig dit du" accent="behöver åka" />
        </div>
        <div className="service-grid">
          {SERVICES.map(([icon, title, text]) => (
            <article className={`service${icon === 'users' ? ' service-photo' : ''}`} key={title}>
              {icon === 'users' && (
                <Link className="service-img" href={bookHref(undefined, { storbil: true })} aria-label="Boka storbilstaxi">
                  <Image src={PHOTOS.van.src} alt={PHOTOS.van.alt} fill sizes="(max-width: 860px) 100vw, 380px" />
                </Link>
              )}
              <Icon name={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="fine service-note">Glömt något i bilen? <a href={SITE.phoneHref}>Ring oss</a> så hjälper vi dig att få tillbaka det.</p>
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
      <div className="stat"><strong>1–8</strong><span>Personer per bil</span></div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="section" id="recensioner">
      <div className="wrap">
        <div className="section-head center-head">
          <p className="kicker">Recensioner</p>
          <Title text="Vad våra" accent="resenärer säger" />
        </div>
        <ReviewGrid />
        <p className="center fine">
          Har du åkt med oss? <a href={SITE.googleReview} target="_blank" rel="noopener">Lämna en recension på Google</a>
        </p>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band" id="kontakt">
      <Image className="bg-photo" src={PHOTOS.karnan.src} alt="" fill sizes="100vw" />
      <div className="wrap">
        <p className="kicker">Dygnet runt</p>
        <Title text="Vart ska du" accent="åka?" />
        <p className="lead">Boka online eller ring oss, vi kör alla dagar året om. Fasta priser och bilar för 1–8 personer.</p>
        <div className="hero-cta cta-center">
          <BookTaxiButton />
          <BookVanButton />
          <CallButton />
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
