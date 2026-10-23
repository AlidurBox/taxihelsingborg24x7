import { bookingToCustomer, bookingToOwner, companyToCustomer, companyToOwner } from '@/lib/emails';

// Förhandsvisning av mejlen under utveckling, t.ex. /mejl-preview/bokning-kund.
// Finns inte i produktion.

const booking = {
  from: 'Drottninggatan 12, Helsingborg',
  to: 'Köpenhamn Kastrup Airport',
  date: '2026-11-03',
  time: '05:30',
  passengers: '2',
  name: 'Anna Svensson',
  phone: '070-123 45 67',
  email: 'anna@example.se',
  message: 'Flyg SK1421 kl. 08:15. Två resväskor och en barnvagn.',
};

const company = {
  company: 'Öresund Bygg AB',
  orgNumber: '556123-4567',
  name: 'Johan Lind',
  phone: '042-12 34 56',
  email: 'johan@oresundbygg.se',
  message: 'Vi åker ungefär 30 resor i månaden, mest Helsingborg till Kastrup och Malmö.',
};

const MALLAR = {
  'bokning-agare': () => bookingToOwner(booking),
  'bokning-kund': () => bookingToCustomer(booking),
  'foretag-agare': () => companyToOwner(company),
  'foretag-kund': () => companyToCustomer(company),
};

export async function GET(_request: Request, { params }: { params: Promise<{ mall: string }> }) {
  if (process.env.NODE_ENV === 'production') return new Response('Not found', { status: 404 });

  const { mall } = await params;
  const render = MALLAR[mall as keyof typeof MALLAR];
  if (!render) {
    const links = Object.keys(MALLAR).map((k) => `<li><a href="/mejl-preview/${k}">${k}</a></li>`).join('');
    return new Response(`<ul style="font-family:sans-serif">${links}</ul>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  const { subject, html } = render();
  return new Response(html.replace('<title>', `<title>${subject} | `), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
