import Footer from '@/components/Footer';

// Sidor med sidfot. /boka ligger utanför och visas utan sidfot.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
