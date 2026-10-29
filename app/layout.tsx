import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import { SITE } from '@/lib/site';
import './globals.css';

// Inter för brödtext, Playfair Display för rubriker. Laddas lokalt av next/font.
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['600', '700'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: '24x7Taxi Helsingborg | Taxi & flygtaxi dygnet runt | 042-18 09 00',
    template: '%s | 24x7Taxi Helsingborg',
  },
  description:
    'Taxi i Helsingborg dygnet runt, alla dagar. Flygtaxi till fast pris till Kastrup, Sturup och Ängelholm. Ring 042-18 09 00 eller förhandsboka online.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    siteName: SITE.name,
    title: '24x7Taxi Helsingborg | Taxi & flygtaxi dygnet runt',
    description: 'Ring 042-18 09 00 eller boka online. Fasta priser till Kastrup, Sturup och Ängelholm.',
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0d0d0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a className="skip" href="#main">Hoppa till innehållet</a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
