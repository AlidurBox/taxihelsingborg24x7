import { Resend } from 'resend';
import {
  bookingToCustomer,
  bookingToOwner,
  companyToCustomer,
  companyToOwner,
  type Booking,
  type CompanyRequest,
} from '@/lib/emails';
import { SITE } from '@/lib/site';

// Tar emot bokningar och företagsförfrågningar från formulären och skickar två mejl:
// ett till taxibolaget (MAIL_TO) och en bekräftelse till kunden.
//
// Inställningar i .env.local (se .env.example): RESEND_API_KEY, MAIL_FROM och MAIL_TO.

const FROM = process.env.MAIL_FROM || '24x7Taxi Helsingborg <onboarding@resend.dev>';
const TO = process.env.MAIL_TO || SITE.formEmail;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'not_configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const data = (body.data ?? {}) as Record<string, unknown>;

  // Honeypot: botar fyller i det dolda fältet. Låtsas att allt gick bra.
  if (str(data._honey)) return Response.json({ ok: true });

  const email = str(data.email, 200);
  if (!EMAIL_RE.test(email)) return Response.json({ error: 'invalid_email' }, { status: 400 });

  let owner, customer;
  if (body.type === 'bokning') {
    const b: Booking = {
      from: str(data['Resa från']),
      to: str(data['Resa till']),
      date: str(data.Datum, 20),
      time: str(data.Tid, 10),
      passengers: str(data['Antal personer'], 40),
      name: str(data.Namn, 120),
      phone: str(data.Telefon, 40),
      email,
      message: str(data.Meddelande, 2000),
    };
    if (!b.from || !b.to || !b.date || !b.time || !b.name || !b.phone) {
      return Response.json({ error: 'missing_fields' }, { status: 400 });
    }
    owner = bookingToOwner(b);
    customer = bookingToCustomer(b);
  } else if (body.type === 'foretag') {
    const c: CompanyRequest = {
      company: str(data['Företag'], 200),
      orgNumber: str(data.Organisationsnummer, 20),
      name: str(data.Namn, 120),
      phone: str(data.Telefon, 40),
      email,
      message: str(data.Meddelande, 2000),
    };
    if (!c.company || !c.name || !c.phone) {
      return Response.json({ error: 'missing_fields' }, { status: 400 });
    }
    owner = companyToOwner(c);
    customer = companyToCustomer(c);
  } else {
    return Response.json({ error: 'unknown_type' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Mejlet till taxibolaget måste gå fram, annars får kunden ett felmeddelande.
  const sent = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: owner.subject,
    html: owner.html,
  });
  if (sent.error) {
    console.error('Kunde inte skicka till taxibolaget', sent.error);
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }

  // Bekräftelsen till kunden är bra att ha men inte kritisk.
  const confirmation = await resend.emails.send({
    from: FROM,
    to: email,
    replyTo: TO,
    subject: customer.subject,
    html: customer.html,
  });
  if (confirmation.error) console.error('Kunde inte skicka bekräftelse till kunden', confirmation.error);

  return Response.json({ ok: true, confirmation: !confirmation.error });
}
