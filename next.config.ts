import type { NextConfig } from 'next';

// Gamla adresser från taxihelsingborg24x7.se och .com pekas om till rätt del av nya sidan.
const oldPages: [string, string][] = [
  ['/fastapriser', '/priser'],
  ['/kontakta-oss', '/#kontakt'],
  ['/bokahar', '/boka'],
  ['/bli-avtalskund-boka-taxi', '/#foretag'],
];

const nextConfig: NextConfig = {
  async redirects() {
    return oldPages.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
