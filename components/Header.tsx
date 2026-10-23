import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { CalendarIcon, PhoneIcon } from './icons';

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/" aria-label={`${SITE.name}, startsidan`}>
          <Image src="/assets/logo-gul.webp" alt={SITE.name} width={480} height={206} priority />
        </Link>
        <Link className="btn btn-ghost header-book" href="/boka">
          <CalendarIcon />
          <span className="call-full">Boka resa</span>
          <span className="call-short">Boka</span>
        </Link>
        <a className="btn btn-yellow header-call" href={SITE.phoneHref}>
          <PhoneIcon />
          <span className="call-full">{SITE.phone}</span>
          <span className="call-short">Ring</span>
        </a>
      </div>
    </header>
  );
}
