// HTML-mejl för bokningar och företagsförfrågningar.
// Byggda med tabeller och inline-stilar så att de ser rätt ut i Gmail, Outlook och Apple Mail,
// och med en media query som gör dem enkolumniga i mobil.
import { AIRPORTS, PRICES, SITE, formatKr } from './site';

export type Booking = {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
};

export type CompanyRequest = {
  company: string;
  orgNumber?: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
};

type Mail = { subject: string; html: string };

const C = {
  ink: '#111111',
  yellow: '#f6b91e',
  paper: '#ffffff',
  bg: '#f2f0ea',
  line: '#d9d5cb',
  muted: '#46443f',
  text: '#1a1a1a',
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const esc = (s = '') =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const nl2br = (s = '') => esc(s).replace(/\n/g, '<br>');

export function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  const text = d.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Fast pris om resmålet finns i prislistan eller är en flygplats.
export function fixedPrice(destination: string) {
  const d = destination.trim().toLowerCase();
  const airport = AIRPORTS.find((a) => a.dest.toLowerCase() === d || a.name.toLowerCase() === d);
  if (airport) return airport.price;
  return PRICES.find(([name]) => name.toLowerCase() === d)?.[1];
}

/* ---------- Byggstenar ---------- */

function button(href: string, label: string, bg = C.yellow, fg = C.ink) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn">
      <tr><td align="center" bgcolor="${bg}" style="border-radius:999px;">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:16px;font-weight:700;color:${fg};text-decoration:none;border-radius:999px;white-space:nowrap;">${label}</a>
      </td></tr>
    </table>`;
}

function rows(items: [string, string | undefined][]) {
  return items
    .filter(([, v]) => v && v.trim())
    .map(
      ([label, value], i) => `
      <tr>
        <td class="row-label" valign="top" style="padding:14px 0;${i ? `border-top:1px solid ${C.line};` : ''}width:38%;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};">${label}</td>
        <td class="row-value" valign="top" style="padding:14px 0;${i ? `border-top:1px solid ${C.line};` : ''}font-family:${FONT};font-size:16px;color:${C.text};">${value}</td>
      </tr>`,
    )
    .join('');
}

function detailsTable(items: [string, string | undefined][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows(items)}</table>`;
}

// Resekort: Från/Till med datum och tid, i mörk stil.
function tripCard(b: Booking, price?: number) {
  const priceRow = price
    ? `<tr><td colspan="2" style="padding:18px 24px;border-top:1px solid #333333;font-family:${FONT};font-size:15px;color:#e9e7e1;">
         Fast pris <span style="float:right;font-size:22px;font-weight:800;color:${C.yellow};">${formatKr(price)} kr</span>
       </td></tr>`
    : '';
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ink}" style="background:${C.ink};border-radius:14px;">
    <tr><td style="padding:22px 24px 6px;font-family:${FONT};">
      <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bdbab3;">Från</div>
      <div style="font-size:19px;font-weight:700;color:#ffffff;padding-top:4px;">${esc(b.from)}</div>
    </td></tr>
    <tr><td style="padding:2px 24px;font-family:${FONT};font-size:20px;line-height:20px;color:${C.yellow};">&#8595;</td></tr>
    <tr><td style="padding:6px 24px 20px;font-family:${FONT};">
      <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bdbab3;">Till</div>
      <div style="font-size:19px;font-weight:700;color:#ffffff;padding-top:4px;">${esc(b.to)}</div>
    </td></tr>
    <tr><td style="padding:0 24px 22px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="col" width="50%" valign="top" style="padding:14px 16px;background:#222222;border-radius:10px;font-family:${FONT};">
            <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bdbab3;">Datum</div>
            <div style="font-size:16px;font-weight:700;color:#ffffff;padding-top:4px;">${esc(formatDate(b.date))}</div>
          </td>
          <td class="col-gap" width="12" style="width:12px;font-size:0;">&nbsp;</td>
          <td class="col" width="50%" valign="top" style="padding:14px 16px;background:#222222;border-radius:10px;font-family:${FONT};">
            <div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bdbab3;">Tid</div>
            <div style="font-size:16px;font-weight:700;color:${C.yellow};padding-top:4px;">kl. ${esc(b.time)}</div>
          </td>
        </tr>
      </table>
    </td></tr>
    ${priceRow}
  </table>`;
}

// Gemensam <head> med mobilanpassning för alla mejl.
function docHead(title: string) {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
<style>
  body { margin:0; padding:0; background:${C.bg}; -webkit-text-size-adjust:100%; }
  a { color:${C.ink}; }
  @media (max-width: 620px) {
    .container { width:100% !important; border-radius:0 !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
    .title { font-size:24px !important; }
    .col { display:block !important; width:100% !important; box-sizing:border-box; }
    .col-gap { display:block !important; width:100% !important; height:10px !important; }
    .row-label, .row-value { display:block !important; width:100% !important; }
    .row-label { padding-bottom:2px !important; }
    .row-value { padding-top:0 !important; border-top:0 !important; }
    .btn, .btn td, .btn a { width:100% !important; box-sizing:border-box; }
    .btn-gap { display:block !important; height:10px !important; width:100% !important; }
    .btn-cell { display:block !important; width:100% !important; padding-right:0 !important; }
    .btn-fill { display:none !important; }
  }
</style>
</head>
`;
}

function layout({ preheader, badge, title, intro, body }: {
  preheader: string;
  badge: string;
  title: string;
  intro: string;
  body: string;
}) {
  return `${docHead(title)}<body style="margin:0;padding:0;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
    <tr><td align="center" style="padding:32px 12px;" class="outer">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.paper};border-radius:18px;overflow:hidden;">
        <tr><td bgcolor="${C.ink}" style="background:${C.ink};padding:26px 32px;" class="px">
          <a href="${SITE.url}" style="font-family:${FONT};font-size:22px;font-weight:900;color:#ffffff;text-decoration:none;">Taxi Helsingborg <span style="color:${C.yellow};">24x7</span></a>
        </td></tr>
        <tr><td bgcolor="${C.yellow}" style="background:${C.yellow};height:6px;line-height:6px;font-size:0;">&nbsp;</td></tr>
        <tr><td class="px" style="padding:36px 40px 8px;font-family:${FONT};">
          <span style="display:inline-block;background:${C.yellow};color:${C.ink};font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border-radius:6px;">${badge}</span>
          <h1 class="title" style="margin:18px 0 10px;font-size:28px;line-height:1.2;font-weight:800;color:${C.text};">${title}</h1>
          <p style="margin:0;font-size:16px;line-height:1.6;color:${C.muted};">${intro}</p>
        </td></tr>
        <tr><td class="px" style="padding:24px 40px 36px;font-family:${FONT};">
          ${body}
        </td></tr>
        <tr><td bgcolor="${C.ink}" class="px" style="background:${C.ink};padding:28px 40px;font-family:${FONT};font-size:14px;line-height:1.7;color:#d6d3cc;">
          <strong style="color:#ffffff;">${SITE.name}</strong><br>
          Taxi och flygtaxi i Helsingborg, dygnet runt.<br>
          <a href="${SITE.phoneHref}" style="color:${C.yellow};text-decoration:none;font-weight:700;">${PHONE}</a>
          &nbsp;·&nbsp; <a href="mailto:${SITE.email}" style="color:#ffffff;">${SITE.email}</a><br>
          ${SITE.street}, ${SITE.postalCode} ${SITE.city}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ---------- Mörk layout för mejlen till taxibolaget ---------- */

// Enkel svart ruta med ljusare grå sektioner och vit text, utan header och etikett.
const D = { card: '#111111', panel: '#2b2b2b', line: '#3f3f3f', label: '#c4c1ba', text: '#ffffff' };

function ownerLayout({ preheader, title, intro, body }: { preheader: string; title: string; intro: string; body: string }) {
  return `${docHead(title)}<body style="margin:0;padding:0;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
    <tr><td align="center" style="padding:32px 12px;" class="outer">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${D.card}" style="width:600px;max-width:600px;background:${D.card};border-radius:18px;">
        <tr><td class="px" style="padding:36px 36px 32px;font-family:${FONT};">
          <h1 class="title" style="margin:0 0 6px;font-size:26px;line-height:1.25;font-weight:800;color:${D.text};">${title}</h1>
          <p style="margin:0;font-size:15px;line-height:1.6;color:${D.label};">${intro}</p>
          ${body}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// En grå sektion med rubrik och rader (etikett + värde).
function panel(heading: string, items: [string, string | undefined][]) {
  const rowsHtml = items
    .filter(([, v]) => v && v.trim())
    .map(
      ([label, value], i) => `
      <tr>
        <td class="row-label" valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${D.line};` : ''}width:36%;font-family:${FONT};font-size:13px;font-weight:600;color:${D.label};">${label}</td>
        <td class="row-value" valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${D.line};` : ''}font-family:${FONT};font-size:16px;font-weight:600;color:${D.text};">${value}</td>
      </tr>`,
    )
    .join('');
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${D.panel}" style="margin-top:20px;background:${D.panel};border-radius:12px;">
    <tr><td style="padding:16px 20px 6px;font-family:${FONT};font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:${D.label};">${heading}</td></tr>
    <tr><td style="padding:0 20px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rowsHtml}</table>
    </td></tr>
  </table>`;
}

const darkLink = (href: string, text: string) => `<a href="${href}" style="color:${D.text};">${text}</a>`;

function twoButtons(a: string, b: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;">
    <tr>
      <td class="btn-cell" valign="top" style="padding-right:12px;">${a}</td>
      <td class="btn-gap" style="font-size:0;line-height:0;"></td>
      <td class="btn-cell" valign="top">${b}</td>
      <td class="btn-fill" width="100%" style="font-size:0;">&nbsp;</td>
    </tr>
  </table>`;
}

const section = (heading: string, content: string) => `
  <h2 style="margin:32px 0 6px;font-family:${FONT};font-size:14px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:${C.text};">${heading}</h2>
  ${content}`;

const note = (html: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
    <tr><td style="padding:18px 20px;background:#fdf6e3;border-left:4px solid ${C.yellow};border-radius:8px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">${html}</td></tr>
  </table>`;

const PHONE = SITE.phone.replace(/ /g, '&nbsp;').replace(/-/g, '&#8209;');

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/* ---------- Mejl ---------- */

// Till taxibolaget när någon bokar.
export function bookingToOwner(b: Booking): Mail {
  const price = fixedPrice(b.to);
  const reply = `mailto:${encodeURIComponent(b.email)}?subject=${encodeURIComponent(`Din taxibokning ${formatDate(b.date)} kl. ${b.time}`)}`;
  return {
    subject: `Ny bokning: ${b.from} → ${b.to}, ${b.date} kl. ${b.time}`,
    html: ownerLayout({
      preheader: `${b.name} vill åka ${formatDate(b.date)} kl. ${b.time} till ${b.to}.`,
      title: `Ny bokning från ${esc(b.name)}`,
      intro: 'Bekräfta resan med kunden så snart du kan.',
      body:
        panel('Resa', [
          ['Från', esc(b.from)],
          ['Till', esc(b.to)],
          ['Datum', esc(formatDate(b.date))],
          ['Tid', `kl. ${esc(b.time)}`],
          ['Antal personer', esc(b.passengers)],
          ['Fast pris', price ? `${formatKr(price)} kr` : undefined],
        ]) +
        panel('Kund', [
          ['Namn', esc(b.name)],
          ['Telefon', darkLink(telHref(b.phone), esc(b.phone))],
          ['E-post', darkLink(`mailto:${esc(b.email)}`, esc(b.email))],
          ['Meddelande', b.message ? nl2br(b.message) : undefined],
        ]) +
        twoButtons(button(telHref(b.phone), 'Ring kunden'), button(reply, 'Svara via e-post', D.panel, D.text)),
    }),
  };
}

// Bekräftelse till kunden när hen bokar.
export function bookingToCustomer(b: Booking): Mail {
  const price = fixedPrice(b.to);
  const first = b.name.trim().split(/\s+/)[0];
  return {
    subject: `Vi har tagit emot din bokning, ${formatDate(b.date)} kl. ${b.time}`,
    html: layout({
      preheader: `Tack ${first}! Vi bekräftar din resa till ${b.to} så snart vi kan.`,
      badge: 'Bokning mottagen',
      title: `Tack för din bokning, ${esc(first)}!`,
      intro: 'Vi har tagit emot din bokning och hör av oss så snart vi kan för att bekräfta resan. Här är en sammanfattning:',
      body:
        tripCard(b, price) +
        section(
          'Dina uppgifter',
          detailsTable([
            ['Namn', esc(b.name)],
            ['Telefon', esc(b.phone)],
            ['Antal personer', esc(b.passengers)],
            ['Meddelande', b.message ? nl2br(b.message) : undefined],
          ]),
        ) +
        note(`<strong>Behöver du ändra något eller har det bråttom?</strong><br>Ring oss på <a href="${SITE.phoneHref}" style="color:${C.ink};font-weight:700;">${PHONE}</a>, vi svarar dygnet runt. Du kan också svara direkt på det här mejlet.`) +
        `<div style="margin-top:28px;">${button(SITE.phoneHref, `Ring ${SITE.phone}`)}</div>`,
    }),
  };
}

// Till taxibolaget när ett företag vill bli avtalskund.
export function companyToOwner(c: CompanyRequest): Mail {
  const reply = `mailto:${encodeURIComponent(c.email)}?subject=${encodeURIComponent(`Företagsavtal med ${SITE.name}`)}`;
  return {
    subject: `Ny företagsförfrågan: ${c.company}`,
    html: ownerLayout({
      preheader: `${c.company} vill bli avtalskund. Kontakt: ${c.name}, ${c.phone}.`,
      title: `${esc(c.company)} vill bli avtalskund`,
      intro: 'En ny förfrågan om företagsavtal har kommit in via hemsidan.',
      body:
        panel('Företag', [
          ['Företag', esc(c.company)],
          ['Org.nummer', c.orgNumber ? esc(c.orgNumber) : undefined],
        ]) +
        panel('Kontaktperson', [
          ['Namn', esc(c.name)],
          ['Telefon', darkLink(telHref(c.phone), esc(c.phone))],
          ['E-post', darkLink(`mailto:${esc(c.email)}`, esc(c.email))],
          ['Meddelande', c.message ? nl2br(c.message) : undefined],
        ]) +
        twoButtons(button(telHref(c.phone), 'Ring kontaktpersonen'), button(reply, 'Svara via e-post', D.panel, D.text)),
    }),
  };
}

// Bekräftelse till företaget.
export function companyToCustomer(c: CompanyRequest): Mail {
  const first = c.name.trim().split(/\s+/)[0];
  return {
    subject: `Tack för er förfrågan om företagsavtal, ${c.company}`,
    html: layout({
      preheader: `Tack ${first}! Vi återkommer med ett förslag på avtal.`,
      badge: 'Förfrågan mottagen',
      title: `Tack ${esc(first)}, vi hör av oss!`,
      intro: `Vi har tagit emot förfrågan om företagsavtal för <strong style="color:${C.text};">${esc(c.company)}</strong> och återkommer med ett förslag så snart vi kan.`,
      body:
        section(
          'Det här ingår för avtalskunder',
          `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${['Förmånliga avtalspriser', 'En samlad faktura per månad', 'Tydlig översikt över alla resor', 'Prioriterad service dygnet runt']
              .map(
                (t) => `<tr><td style="padding:8px 0;font-family:${FONT};font-size:16px;color:${C.text};">
                  <span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:50%;background:${C.yellow};color:${C.ink};font-size:13px;font-weight:800;margin-right:10px;">&#10003;</span>${t}
                </td></tr>`,
              )
              .join('')}
          </table>`,
        ) +
        section(
          'Era uppgifter',
          detailsTable([
            ['Företag', esc(c.company)],
            ['Org.nummer', c.orgNumber ? esc(c.orgNumber) : undefined],
            ['Kontaktperson', esc(c.name)],
            ['Telefon', esc(c.phone)],
          ]),
        ) +
        note(`Frågor redan nu? Ring oss på <a href="${SITE.phoneHref}" style="color:${C.ink};font-weight:700;">${PHONE}</a> eller svara på det här mejlet.`),
    }),
  };
}
