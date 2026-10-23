import Link from 'next/link';
import { SITE } from '@/lib/site';
import BookingForm from './BookingForm';

// Används både som sektion på startsidan och som egen sida på /boka.
// I mobil hamnar telefonnummer och punktlista (book-extra) under formuläret.
export default function BookingSection({ page = false }: { page?: boolean }) {
  const Heading = page ? 'h1' : 'h2';

  return (
    <section className={`section section-dark${page ? ' book-page' : ''}`} id="boka">
      <div className="wrap book-grid book-layout">
        <div className="book-intro">
          <p className="kicker">Boka</p>
          <Heading>{page ? 'Boka taxi' : 'Boka din resa'}</Heading>
          {page && (
            <p className="book-quick">Vill du veta vad resan kostar? <Link href="/priser">Se våra priser</Link></p>
          )}
          <p className="book-text">Fyll i formuläret så bekräftar vi bokningen så snabbt vi kan. Ska du åka nu? Ring oss, det går snabbast.</p>
        </div>
        <div className="book-extra">
          <a className="big-phone" href={SITE.phoneHref}>{SITE.phone}</a>
          <ul className="checklist">
            <li>Bekräftelse via telefon eller e-post</li>
            <li>Betala med Swish, Klarna eller kort</li>
            <li>Fast pris, vi kan alltid komma överens</li>
          </ul>
          {page && (
            <Link className="btn btn-ghost btn-lg book-prices" href="/priser">Se våra priser</Link>
          )}
        </div>
        <div className="book-form">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
