import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';

export const metadata: Metadata = {
  // Home keeps the full default title from layout.tsx (no template applied)
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pizza Buddies | Neapolitan Pizza Catering, Leicester',
    description:
      'Fully vegetarian Neapolitan pizza, cooked live at weddings, parties and celebrations across the East Midlands.',
    url: '/',
  },
};

const MARQUEE_ITEMS = [
  '48-Hour Dough',
  'Hand-Stretched to Order',
  'Fired in Gozney Ovens',
  '100% Vegetarian',
  'Vegan & Gluten-Free Options',
  'Leicester & the East Midlands',
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'Pizza Buddies',
  description:
    'Fully vegetarian Neapolitan pizza catering for weddings, mehndi parties, birthdays and corporate events across Leicestershire and the East Midlands.',
  url: 'https://pizzabuddies.co.uk/',
  email: 'info@pizzabuddies.co.uk',
  telephone: '+447972611157',
  servesCuisine: 'Neapolitan pizza',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Leicester',
    addressRegion: 'Leicestershire',
    addressCountry: 'GB',
  },
  areaServed: ['Leicester', 'Leicestershire', 'East Midlands'],
  foundingDate: '2021-08',
  founder: [
    { '@type': 'Person', name: 'Priten' },
    { '@type': 'Person', name: 'Vishant' },
  ],
  sameAs: ['https://www.instagram.com/pizzabuddiesuk'],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="kicker">Neapolitan pizza catering in Leicester &amp; the East Midlands</p>
            <h1>Neapolitan pizza, cooked live at your event</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              Hand-stretched, 48-hour dough. Roaring Gozney ovens. A fully vegetarian menu
              that nobody misses the meat on. We bring the theatre of a Naples pizzeria to
              weddings, mehndi nights, birthdays and boardrooms.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--light btn--lg" href="/quote">Get a Quote</Link>
              <Link className="btn btn--ghost btn--lg" href="/menu">See the Menu</Link>
            </div>
            <p className="hero__meta">
              <span>Food Hygiene Rating 5</span>
              <span>NCASS Registered</span>
              <span>Est. 2021</span>
            </p>
          </div>
          <div className="hero__media">
            {/* PHOTO: public/assets/img/hero-live-cooking.jpg (swap the file to change it) */}
            <Photo
              src="/assets/img/hero-live-cooking.jpg"
              alt="Two Pizza Buddies team members in black aprons behind the stall, with fresh pizza bases lined up on the counter"
              aspect="ph--45"
              sizes="(min-width: 900px) 500px, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <ul>{MARQUEE_ITEMS.map((item) => <li key={item}>{item}</li>)}</ul>
          <ul>{MARQUEE_ITEMS.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>

      {/* ============ USP ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">Why Pizza Buddies</p>
            <h2>Fully vegetarian. Genuinely Neapolitan.</h2>
            <p className="lede">
              Most caterers treat vegetarian food as the option in the corner. For us it&rsquo;s
              the entire menu, and we&rsquo;ve spent five seasons proving nobody leaves hungry,
              or unconvinced.
            </p>
          </div>
          <div className="grid-3">
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 01</span>
              <h3>The 48-hour dough</h3>
              <p>
                Every base is fermented for two full days before it goes anywhere near a flame,
                so it comes out light, blistered and properly Neapolitan. Made with premium
                ingredients sourced from Italy and local producers.
              </p>
            </article>
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 02</span>
              <h3>The live show</h3>
              <p>
                Our pizzaiolos stretch and top every pizza in front of your guests, then fire
                it in a Gozney oven in minutes. It&rsquo;s dinner and entertainment in one
                3-metre pitch.
              </p>
            </article>
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 03</span>
              <h3>Everyone eats</h3>
              <p>
                A 100% vegetarian menu with vegan and gluten-free options means one caterer
                covers the whole guest list, with no sad separate plate for anyone.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ THE EXPERIENCE ============ */}
      <section className="sec sec--dark">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">The live experience</p>
            <h2>Stretched, fired and served in front of your guests</h2>
          </div>
          <ol className="steps">
            <li className="step reveal">
              <h3>Stretch</h3>
              <p>Dough that&rsquo;s been resting for 48 hours is hand-stretched and topped to order, right at the pass.</p>
            </li>
            <li className="step reveal">
              <h3>Fire</h3>
              <p>Into the Gozney it goes. Guests watch it blister and rise. Every pizza is cooked in minutes.</p>
            </li>
            <li className="step reveal">
              <h3>Serve</h3>
              <p>Straight out of the oven and into hands, one after another, until the whole guest list has been fed.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ CELEBRATION SPLIT ============
          Private events are the primary path for now. The former
          Corporate/Private 50-50 split was rebalanced when the dedicated
          corporate page was parked - see app/corporate-events/page.tsx. */}
      <section aria-label="What are you celebrating?">
        <div className="choice-grid">
          <Link className="choice" href="/private-events#weddings">
            {/* PHOTO: public/assets/img/split-private.jpg (decorative, the panel heading says what it is) */}
            <Photo src="/assets/img/split-private.jpg" alt="" fill position="center 30%" sizes="(min-width: 800px) 50vw, 100vw" />
            <span className="choice__body">
              <span className="kicker">The big day</span>
              <h3>Weddings</h3>
              <p>The evening your guests didn&rsquo;t see coming. From golden-hour service to the late-night rescue.</p>
              <span className="link">Wedding catering <span className="arrow">→</span></span>
            </span>
          </Link>
          <Link className="choice" href="/private-events#mehndi">
            {/* PHOTO: public/assets/img/split-celebrations.jpg (decorative, the panel heading says what it is) */}
            <Photo src="/assets/img/split-celebrations.jpg" alt="" fill sizes="(min-width: 800px) 50vw, 100vw" />
            <span className="choice__body">
              <span className="kicker">The celebrations</span>
              <h3>Mehndi, engagements &amp; birthdays</h3>
              <p>Colour, music, family everywhere. Our oven fits right into the middle of it.</p>
              <span className="link">Party catering <span className="arrow">→</span></span>
            </span>
          </Link>
        </div>
      </section>

      {/* ============ MENU TEASER ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">From the menu</p>
            <h2>Seven pizzas. Five desserts. Zero meat.</h2>
          </div>
          <div className="grid-3">
            <article className="feat reveal">
              <h3>Margherita</h3>
              <p>The one every Neapolitan menu is judged on. Simple, blistered, right.</p>
            </article>
            <article className="feat reveal">
              <h3>Greek</h3>
              <p>Feta, spinach, black olives and caramelised onion. The sleeper hit of every event.</p>
            </article>
            <article className="feat reveal">
              <h3>Nutella &amp; Strawberries</h3>
              <p>Dessert, from the same oven. There are four more where this came from.</p>
            </article>
          </div>
          <div className="hero__actions reveal">
            <Link className="btn" href="/menu">See the full menu</Link>
            <Link className="link" href="/quote">Build an estimate <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ============ CREDENTIALS / SOCIAL PROOF ============ */}
      <section className="sec sec--paper">
        <div className="container">
          <div className="stats reveal">
            <p className="stat"><b>48<small>hr</small></b><span>Fermented dough</span></p>
            <p className="stat"><b>2021</b><span>Est. Leicester</span></p>
            <p className="stat"><b>100%</b><span>Vegetarian menu</span></p>
            <p className="stat"><b>5/5</b><span>Food hygiene rating</span></p>
          </div>
          <hr
            className="tri-rule tri-rule--center reveal"
            aria-hidden="true"
            style={{ marginBlock: 'clamp(36px, 6vw, 56px)' }}
          />
          <div className="badges badges--center reveal">
            <span className="badge">Food Hygiene Rating <b className="rating">5</b></span>
            <span className="badge">NCASS Registered</span>
            <span className="badge">Level 2 Food Hygiene</span>
            <span className="badge">Weddings · Mehndi · Corporate · Festivals</span>
          </div>
          {/* TESTIMONIAL SLOT: when real client quotes are supplied, add them here as a
              blockquote strip. Do not publish testimonials that haven't been provided. */}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec sec--dark cta-band">
        <div className="container reveal">
          <p className="kicker">Ready when you are</p>
          <h2>Let&rsquo;s check your date</h2>
          <p className="lede">
            Build an estimate in two minutes. Priten and Vishant confirm every booking
            personally. No bots, no double-bookings, no surprises.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="/quote">Get a Quote</Link>
          </div>
          <p className="pricing-line">Classic from £16pp · Premium from £18pp · Minimum hire from £900</p>
        </div>
      </section>
    </>
  );
}
