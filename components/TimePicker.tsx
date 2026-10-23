'use client';

import { useEffect, useRef, useState } from 'react';

// Egen tidväljare i sajtens stil istället för webbläsarens inbyggda.
// Värdet ("HH:MM") ligger i ett dolt fält så att det följer med i FormData och valideras som "required".

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

const toMinutes = (h: string, m: string) => Number(h) * 60 + Number(m);

type Props = {
  name: string;
  required?: boolean;
  // Tidigaste tillåtna tid ("HH:MM"), t.ex. nu om datumet är i dag.
  min?: string;
};

export default function TimePicker({ name, required, min }: Props) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = hour && minute ? `${hour}:${minute}` : '';
  const minTotal = min ? toMinutes(min.slice(0, 2), min.slice(3, 5)) : -1;
  const tooEarly = value !== '' && toMinutes(hour, minute) < minTotal;

  useEffect(() => {
    inputRef.current?.setCustomValidity(tooEarly ? 'Välj en senare tid' : '');
  }, [tooEarly]);

  useEffect(() => {
    if (!open) return;
    // Scrolla valt (annars första valbara) värde till mitten av kolumnen.
    // Inte scrollIntoView, som även flyttar sidan.
    rootRef.current?.querySelectorAll<HTMLElement>('.time-col').forEach((col) => {
      const el = col.querySelector<HTMLElement>('[aria-pressed="true"]') ?? col.querySelector<HTMLElement>('button:enabled');
      if (el) col.scrollTop = el.offsetTop - (col.clientHeight - el.offsetHeight) / 2;
    });

    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function pickHour(h: string) {
    setHour(h);
    if (!minute || toMinutes(h, minute) < minTotal) {
      setMinute(MINUTES.find((m) => toMinutes(h, m) >= minTotal) ?? '00');
    }
  }

  function pickMinute(m: string) {
    setMinute(m);
    if (hour) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <span className={`time-picker${open ? ' open' : ''}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`time-trigger${tooEarly ? ' invalid' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? undefined : 'time-placeholder'}>{value || 'Välj tid'}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7Z" />
        </svg>
      </button>
      <input
        ref={inputRef}
        className="time-value"
        name={name}
        required={required}
        value={value}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        onFocus={() => {
          triggerRef.current?.focus();
          setOpen(true);
        }}
      />
      {open && (
        // preventDefault hindrar att klick i panelen räknas som klick på <label> och stänger den.
        <span className="time-pop" role="dialog" aria-label="Välj tid" onClick={(e) => e.preventDefault()}>
          <span className="time-col" role="group" aria-label="Timme">
            <span className="time-head">Tim</span>
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={h === hour}
                disabled={toMinutes(h, '55') < minTotal}
                onClick={() => pickHour(h)}
              >
                {h}
              </button>
            ))}
          </span>
          <span className="time-col" role="group" aria-label="Minut">
            <span className="time-head">Min</span>
            {MINUTES.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={m === minute}
                disabled={hour !== '' && toMinutes(hour, m) < minTotal}
                onClick={() => pickMinute(m)}
              >
                {m}
              </button>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}
