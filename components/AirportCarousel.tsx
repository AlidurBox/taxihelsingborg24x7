'use client';

import { Children, useRef, useState, type ReactNode } from 'react';

// Rutnät på datorn. I mobil blir det en svepbar karusell med punkter och pilar.
export default function AirportCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const cardStep = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + parseFloat(getComputedStyle(el!).columnGap || '0') : 1;
  };

  const goTo = (i: number) => {
    const index = Math.max(0, Math.min(count - 1, i));
    track.current?.scrollTo({ left: index * cardStep(), behavior: 'smooth' });
  };

  return (
    <div className="carousel">
      <div className="airport-grid" ref={track} onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / cardStep()))}>
        {children}
      </div>
      <div className="carousel-controls">
        <button type="button" className="carousel-arrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Föregående">
          ←
        </button>
        <div className="carousel-dots">
          {Array.from({ length: count }, (_, i) => (
            <button key={i} type="button" className={i === active ? 'on' : ''} onClick={() => goTo(i)} aria-label={`Visa kort ${i + 1}`} />
          ))}
        </div>
        <button type="button" className="carousel-arrow" onClick={() => goTo(active + 1)} disabled={active === count - 1} aria-label="Nästa">
          →
        </button>
      </div>
      <p className="carousel-hint">Svep för fler flygplatser</p>
    </div>
  );
}
