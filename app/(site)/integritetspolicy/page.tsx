import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description: `Så behandlar ${SITE.legalName} dina personuppgifter.`,
  alternates: { canonical: '/integritetspolicy' },
};

export default function Integritetspolicy() {
  return (
    <div className="wrap legal">
      <h1>Integritetspolicy</h1>
      <p>
        {SITE.legalName} värnar om din integritet. Här beskriver vi hur vi behandlar dina personuppgifter när du bokar en resa,
        kontaktar oss eller besöker vår webbplats.
      </p>

      <h2>Personuppgiftsansvarig</h2>
      <p>
        {SITE.legalName}, {SITE.street}, {SITE.postalCode} {SITE.city}.<br />
        Telefon: <a href={SITE.phoneHref}>{SITE.phone}</a> · E-post: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>

      <h2>Vilka uppgifter vi samlar in</h2>
      <ul>
        <li>Namn, telefonnummer och e-postadress som du lämnar när du bokar eller kontaktar oss.</li>
        <li>Uppgifter om resan, till exempel upphämtningsadress, resmål, datum, tid och meddelande.</li>
        <li>För företagsavtal: företagsnamn, organisationsnummer och kontaktperson.</li>
      </ul>

      <h2>Varför vi behandlar uppgifterna</h2>
      <p>
        Vi använder uppgifterna för att genomföra och bekräfta din resa, kontakta dig om bokningen, hantera fakturering för
        avtalskunder och svara på frågor. Den rättsliga grunden är att fullgöra avtal med dig (din bokning) samt vårt berättigade
        intresse av att kunna ge god service.
      </p>

      <h2>Hur länge vi sparar uppgifterna</h2>
      <p>
        Vi sparar uppgifterna så länge det behövs för att genomföra resan och hantera eventuella frågor eller reklamationer, och
        därefter så länge lagen kräver, till exempel enligt bokföringslagen.
      </p>

      <h2>Vilka som tar del av uppgifterna</h2>
      <p>
        Bokningar från webbplatsen skickas till oss via e-posttjänsten FormSubmit. Vi säljer aldrig dina uppgifter och lämnar inte
        ut dem till andra än de som behövs för att utföra resan, eller om lagen kräver det.
      </p>

      <h2>Cookies</h2>
      <p>Webbplatsen använder inga cookies för spårning eller marknadsföring.</p>

      <h2>Dina rättigheter</h2>
      <p>
        Du har rätt att begära information om vilka uppgifter vi har om dig, få felaktiga uppgifter rättade, få uppgifter raderade,
        begränsa eller invända mot behandlingen samt få ut dina uppgifter i ett maskinläsbart format. Kontakta oss på telefon eller
        e-post ovan.
      </p>
      <p>
        Är du missnöjd med hur vi behandlar dina personuppgifter kan du lämna klagomål till Integritetsskyddsmyndigheten (IMY),{' '}
        <a href="https://www.imy.se" target="_blank" rel="noopener">imy.se</a>.
      </p>

      <p><Link className="btn btn-dark" href="/">Tillbaka till startsidan</Link></p>
    </div>
  );
}
