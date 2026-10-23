'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { SITE } from '@/lib/site';

// Skickar formuläret till /api/send, som mejlar taxibolaget och skickar en bekräftelse till kunden.
// Om mejltjänsten inte är konfigurerad (ingen RESEND_API_KEY) används FormSubmit som reserv.
// FormSubmit skickar första gången ett aktiveringsmejl till SITE.formEmail som måste bekräftas.

type Props = {
  id: string;
  subject: string;
  kind: 'bokning' | 'förfrågan';
  submitLabel: string;
  // Bekräftelsemejl som skickas automatiskt till kundens e-postadress.
  autoresponse?: string;
  light?: boolean;
  footer?: ReactNode;
  children: ReactNode;
};

type Status = { type: 'idle' | 'sending' | 'error' | 'invalid' } | { type: 'done'; name: string };

export function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label>
      <span>{label}{optional && <span className="opt"> (valfritt)</span>}</span>
      {children}
    </label>
  );
}

export default function MailForm({ id, subject, kind, submitLabel, autoresponse, light, footer, children }: Props) {
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [validated, setValidated] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      setStatus({ type: 'invalid' });
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ type: 'sending' });

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: kind === 'bokning' ? 'bokning' : 'foretag', data }),
      });
      if (res.status === 503) {
        await sendWithFormSubmit(data);
      } else if (!res.ok) {
        throw new Error(String(res.status));
      }
      setStatus({ type: 'done', name: (data.Namn ?? '').split(' ')[0] });
    } catch {
      setStatus({ type: 'error' });
    }
  }

  async function sendWithFormSubmit(data: Record<string, string>) {
    const res = await fetch(`https://formsubmit.co/ajax/${SITE.formEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        ...(autoresponse && { _autoresponse: autoresponse }),
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) === 'false') throw new Error(json.message ?? res.status);
  }

  const cardClass = `card form${light ? ' form-light' : ''}`;

  if (status.type === 'done') {
    return (
      <div className={cardClass} id={id}>
        <div className="form-done" role="status">
          <strong>Tack{status.name ? `, ${status.name}` : ''}!</strong>
          <p>
            Vi har tagit emot din {kind} och skickat en bekräftelse till din e-post.
            Brådskande? Ring <a href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form id={id} className={`${cardClass}${validated ? ' was-validated' : ''}`} noValidate onSubmit={onSubmit}>
        <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {children}
        <button
          className={`btn ${light ? 'btn-dark' : 'btn-yellow'} btn-block btn-lg`}
          type="submit"
          disabled={status.type === 'sending'}
        >
          {status.type === 'sending' ? 'Skickar …' : submitLabel}
        </button>
        <p className={`form-status${status.type === 'error' || status.type === 'invalid' ? ' err' : ''}`} role="status" aria-live="polite">
          {status.type === 'invalid' && 'Fyll i de markerade fälten.'}
          {status.type === 'error' && (
            <>Något gick fel. Ring oss på <a href={SITE.phoneHref}>{SITE.phone}</a> så hjälper vi dig direkt.</>
          )}
        </p>
      </form>
      {footer}
    </div>
  );
}
