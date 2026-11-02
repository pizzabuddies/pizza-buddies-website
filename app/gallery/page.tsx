import type { Metadata } from 'next';
import Link from 'next/link';
import InstagramFeed from '@/components/InstagramFeed';

export const metadata: Metadata = {
  title: 'Gallery: Live Pizza Catering in Action',
  description:
    'The latest photos and videos from Pizza Buddies events across Leicestershire and the East Midlands, live from our Instagram. See the live Neapolitan cooking experience.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery: Pizza Buddies in Action',
    description: 'The latest from our events across the East Midlands, live from Instagram.',
    url: '/gallery',
  },
};

/* The gallery is Instagram's embed of @pizzabuddiesuk (components/InstagramFeed.tsx).
   The earlier filterable photo grid is kept, unused, in components/GalleryGrid.tsx
   in case you want a curated gallery of your own photos later. */
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
              Our gallery is our Instagram, so you always see the latest. Follow{' '}
              <a
                href="https://www.instagram.com/pizzabuddiesuk"
                rel="noopener"
                style={{ textUnderlineOffset: '4px' }}
              >
                @pizzabuddiesuk
              </a>{' '}
              to see more.
            </p>
          </div>
        </div>
      </section>

      {/* ============ INSTAGRAM FEED ============ */}
      <section className="sec">
        <div className="container">
          <InstagramFeed />
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
