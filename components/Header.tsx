'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';
import { Icon } from './icons';

export const NAV = [
  ['/priser', 'Priser'],
  ['/#flygtaxi', 'Flygtaxi'],
  ['/#storbil', 'Storbilstaxi'],
  ['/bilder', 'Bilder'],
  ['/#foretag', 'Företag'],
  ['/om-oss', 'Om oss'],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header${open ? ' menu-open' : ''}`}>
      <div className="wrap header-inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label={`${SITE.name}, startsidan`}>
          <Image src="/assets/logo-gul.webp" alt={SITE.name} width={480} height={206} priority />
        </Link>
        <nav className="main-nav" id="main-nav" aria-label="Huvudmeny">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <a className="nav-phone" href={SITE.phoneHref}>
            <Icon name="phone" />
            {SITE.phone}
          </a>
        </nav>
        <a className="btn btn-glass header-call" href={SITE.phoneHref}>
          <Icon name="phone" />
          <span className="call-full">{SITE.phone}</span>
          <span className="call-short">Ring</span>
        </a>
        <Link className="btn btn-yellow header-book" href="/boka">
          Boka taxi
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          <span className="sr">{open ? 'Stäng meny' : 'Öppna meny'}</span>
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
