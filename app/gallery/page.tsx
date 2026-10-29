import type { Metadata } from 'next';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery — Live Pizza Catering in Action',
  description:
    'Pizza Buddies at weddings, mehndi nights, birthdays and festivals across Leicestershire and the East Midlands. See the live Neapolitan cooking experience.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery — Pizza Buddies in Action',
    description: 'Weddings, mehndi nights, birthdays and festivals across the East Midlands.',
    url: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--page">
        <div className="hero__inner hero__inner--solo">
          <div className="hero__copy">
            <p className="kicker">Gallery</p>
            <h1>Shot live, at real events</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              Weddings, mehndi nights, birthdays and festival fields across the East Midlands.
              Professional photography from our shoot is on its way — these frames are reserved
              for it. Meanwhile, the day-to-day lives on Instagram at{' '}
              <a
                href="https://www.instagram.com/pizzabuddiesuk"
                rel="noopener"
                style={{ textUnderlineOffset: '4px' }}
              >
                @pizzabuddiesuk
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* ============ GRID ============ */}
      <section className="sec">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec sec--dark cta-band">
        <div className="container reveal">
          <p className="kicker">Picture your event here</p>
          <h2>Let&rsquo;s add your date to the wall</h2>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="/quote">Get a Quote</Link>
            <a className="btn btn--ghost btn--lg" href="https://www.instagram.com/pizzabuddiesuk" rel="noopener">
              Follow @pizzabuddiesuk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
