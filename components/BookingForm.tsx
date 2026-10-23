'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MailForm, { Field } from './MailForm';
import TimePicker from './TimePicker';

const localDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const localTime = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export default function BookingForm() {
  const [to, setTo] = useState('');
  const [today, setToday] = useState('');
  const [date, setDate] = useState('');
  const fromRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const now = localDate(new Date());
    setToday(now);
    setDate(now);
    const till = new URLSearchParams(window.location.search).get('till');
    if (till) {
      setTo(till);
      fromRef.current?.focus({ preventScroll: true });
    }
  }, []);

  return (
    <MailForm
      id="booking-form"
      subject="Ny bokning: Taxi Helsingborg 24x7"
      kind="bokning"
      submitLabel="Skicka bokning"
      autoresponse="Tack för din bokning hos Taxi Helsingborg 24x7! Vi har tagit emot din förfrågan och bekräftar resan så snart vi kan. Bråttom? Ring oss på 042-18 09 00."
      footer={
        <p className="form-note">
          Genom att skicka godkänner du att vi behandlar dina uppgifter för att hantera bokningen.{' '}
          <Link href="/integritetspolicy">Integritetspolicy</Link>
        </p>
      }
    >
      <input type="hidden" name="Typ" value="Bokning" />
      <div className="row">
        <Field label="Från">
          <input ref={fromRef} name="Resa från" type="text" required autoComplete="street-address" placeholder="Adress eller plats" />
        </Field>
        <Field label="Till">
          <input name="Resa till" type="text" required placeholder="Adress, flygplats eller ort" value={to} onChange={(e) => setTo(e.target.value)} />
        </Field>
      </div>
      <div className="row row-3">
        <Field label="Datum">
          <input name="Datum" type="date" required min={today || undefined} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Tid">
          <TimePicker name="Tid" required min={date && date === today ? localTime(new Date()) : undefined} />
        </Field>
        <Field label="Antal personer">
          <select name="Antal personer" defaultValue="1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5-8 (storbil)</option>
          </select>
        </Field>
      </div>
      <div className="row row-pair">
        <Field label="Namn">
          <input name="Namn" type="text" required autoComplete="name" />
        </Field>
        <Field label="Telefon">
          <input name="Telefon" type="tel" required autoComplete="tel" inputMode="tel" />
        </Field>
      </div>
      <Field label="E-post">
        <input name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Meddelande" optional>
        <textarea name="Meddelande" rows={3} />
      </Field>
    </MailForm>
  );
}
