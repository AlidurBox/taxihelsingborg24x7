import Image from 'next/image';
import Link from 'next/link';
import { AIRPORTS, SITE } from '@/lib/site';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Image src="/assets/logo-gul.webp" alt={SITE.name} width={480} height={206} />
          <p>Taxi och flygtaxi i Helsingborg. Dygnet runt.</p>
          <div className="social">
            <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook"><FacebookIcon /></a>
            <a href={SITE.instagram} target="_blank" rel="noopener" aria-label="Instagram"><InstagramIcon /></a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon /></a>
          </div>
        </div>
        <div>
          <h3>Flygtaxi</h3>
          <ul>
            {AIRPORTS.map((a) => (
              <li key={a.code}><Link href="/priser#flygtaxi">{a.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Snabblänkar</h3>
          <ul>
            <li><Link href="/boka">Boka resa</Link></li>
            <li><Link href="/priser">Priser</Link></li>
            <li><Link href="/om-oss">Om oss</Link></li>
            <li><a href="/#foretag">Bli avtalskund</a></li>
            <li><Link href="/integritetspolicy">Integritetspolicy</Link></li>
          </ul>
        </div>
        <div>
          <h3>Kontakt</h3>
          <ul>
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>{SITE.street}<br />{SITE.postalCode} {SITE.city}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} {SITE.legalName}</p>
        <p className="pay">Swish · Klarna · Visa · Mastercard · American Express</p>
      </div>
  </footer>
);
}
