'use client';

import { useState } from 'react';
import { REVIEWS } from '@/lib/site';

export default function ReviewGrid() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`review-grid${open ? '' : ' collapsed'}`}>
        {REVIEWS.map((r) => (
          <figure className="review" key={r.name}>
            <div className="stars" aria-label="5 av 5 stjärnor">★★★★★</div>
            <blockquote>”{r.text}”</blockquote>
            <figcaption>{r.name}</figcaption>
          </figure>
        ))}
      </div>
      {/* Knappen syns bara i mobil, se .reviews-more i CSS */}
      <button className="btn btn-outline reviews-more" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Visa färre' : `Visa fler recensioner (${REVIEWS.length - 2})`}
      </button>
    </>
  );
}
