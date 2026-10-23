import Link from 'next/link';
import { bookHref } from '@/lib/site';

type Props = { destination?: string; className?: string; children: React.ReactNode };

export default function BookButton({ destination, className = 'btn btn-dark', children }: Props) {
  return (
    <Link className={className} href={bookHref(destination)}>
      {children}
    </Link>
  );
}
