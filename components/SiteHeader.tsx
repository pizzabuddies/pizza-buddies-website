'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoIcon from '@/public/assets/pizza-buddies-icon.png';

/* Primary navigation.
   NOTE: the Corporate Events page is currently disabled (see
   app/corporate-events/page.tsx). To re-enable it, add this entry back
   here and in components/SiteFooter.tsx:
     { href: '/corporate-events', label: 'Corporate' }              */
const NAV_LINKS = [
  { href: '/private-events', label: 'Private Events' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'Our Story' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock page scroll while the mobile overlay is open
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Close when the route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  const current = (href: string) => (pathname === href ? 'page' : undefined);

  return (
    <>
      <header className="site-head">
        <div className="site-head__inner">
          <Link className="logo" href="/" aria-label="Pizza Buddies, home">
            <Image className="logo__icon" src={logoIcon} alt="" priority sizes="44px" />
            <span className="logo__text">
              <span className="logo__word">Pizza Buddies</span>
              <span className="logo__tri" aria-hidden="true"></span>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={current(l.href)}>{l.label}</Link>
                </li>
              ))}
              <li><Link className="btn btn--light" href="/quote">Get a Quote</Link></li>
            </ul>
          </nav>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile">
        <ul>
          <li><Link href="/" aria-current={current('/')}>Home</Link></li>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={current(l.href)}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav__foot">
          <Link className="btn btn--light" href="/quote">Get a Quote</Link>
          <p className="mobile-nav__meta">Leicester &amp; the East Midlands · @pizzabuddiesuk</p>
        </div>
      </nav>
    </>
  );
}
