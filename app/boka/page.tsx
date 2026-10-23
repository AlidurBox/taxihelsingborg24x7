import type { Metadata } from 'next';
import BookingSection from '@/components/BookingSection';

export const metadata: Metadata = {
  title: 'Boka taxi',
  description: 'Förhandsboka taxi eller flygtaxi i Helsingborg. Fast pris till Kastrup, Sturup och Ängelholm. Ring 042-18 09 00.',
  alternates: { canonical: '/boka' },
};

export default function BokaPage() {
  return <BookingSection page />;
}
