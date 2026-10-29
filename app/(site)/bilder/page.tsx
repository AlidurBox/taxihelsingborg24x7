import type { Metadata } from 'next';
import { CtaBand, GallerySection, PageHero, VehiclesSection } from '@/components/sections';
import { PHOTOS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bilder',
  description: 'Se våra bilar: bekväm personbil för 1–4 personer och storbilstaxi för upp till 8 personer. Taxi i Helsingborg dygnet runt.',
  alternates: { canonical: '/bilder' },
};

export default function BilderPage() {
  return (
    <>
      <PageHero
        kicker="Bilder"
        title="Våra bilar i"
        accent="Helsingborg"
        lead="Personbil för 1–4 personer och storbilstaxi för upp till 8. Bekväma bilar som kör dig hela vägen fram, dygnet runt."
        photo={PHOTOS.fleet}
      />
      <GallerySection page />
      <VehiclesSection />
      <CtaBand />
    </>
  );
}
