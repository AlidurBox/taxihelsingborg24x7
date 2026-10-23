import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import { SITE } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Taxi Helsingborg 24x7 | Taxi & flygtaxi dygnet runt | 042-18 09 00',
    template: '%s | Taxi Helsingborg 24x7',
  },
  description:
    'Taxi i Helsingborg dygnet runt, alla dagar. Flygtaxi till fast pris till Kastrup, Sturup och Ängelholm. Ring 042-18 09 00 eller förhandsboka online.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    siteName: SITE.name,
    title: 'Taxi Helsingborg 24x7 | Taxi & flygtaxi dygnet runt',
    description: 'Ring 042-18 09 00 eller boka online. Fasta priser till Kastrup, Sturup och Ängelholm.',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#111111',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <a className="skip" href="#main">Hoppa till innehållet</a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
