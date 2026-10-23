'use client';

import Link from 'next/link';
import { useState } from 'react';
import { POPULAR, PRICES, SITE, bookHref, formatKr } from '@/lib/site';
import { SearchIcon } from './icons';

// Rubrik och sökfält till vänster, priskort till höger. Kortet har fast storlek
// så att inget på sidan hoppar när man söker eller visar alla orter.
const ALL = [
  ...POPULAR.map((name) => PRICES.find(([n]) => n === name)!),
  ...PRICES.filter(([name]) => !POPULAR.includes(name)),
];

export default function PriceList({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // Alla orter i en scrollbar lista, de populäraste överst.
  const shown = q ? PRICES.filter(([name]) => name.toLowerCase().includes(q)) : ALL;

  return (
    <div className="price-grid">
      <div className="price-intro">
        {children}
        <label className="search">
          <span className="sr">Sök resmål</span>
          <SearchIcon />
          <input type="search" placeholder="Sök ort, t.ex. Malmö" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <p className="fine">Saknas din ort? <a href={SITE.phoneHref}>Ring {SITE.phone}</a> så får du ett fast pris direkt.</p>
      </div>

      <div className="price-card">
        <div className="price-card-head">
          <span>{q ? `${shown.length} träffar` : `${PRICES.length} orter`}</span>
          <span>Pris</span>
        </div>
        <ul className="price-list" aria-live="polite">
          {shown.map(([name, price]) => (
            <li key={name}>
              <Link href={bookHref(name)}>
                <span className="name">{name}</span>
                <span className="price">{formatKr(price)} kr</span>
                <span className="book-hint">Boka</span>
              </Link>
            </li>
          ))}
          {shown.length === 0 && (
            <li className="price-empty">
              Ingen fast taxa för &quot;{query}&quot;. <a href={SITE.phoneHref}>Ring oss</a> så får du ett pris.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
