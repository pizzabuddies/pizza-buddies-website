import type { Metadata } from 'next';
import Link from 'next/link';
import Photo from '@/components/Photo';

export const metadata: Metadata = {
  title: 'Wedding & Party Pizza Catering Leicestershire',
  description:
    'Wedding pizza catering in Leicestershire, plus mehndi parties, engagements and birthdays. Hand-stretched Neapolitan pizza cooked live at your celebration. Fully vegetarian menu. From £16 per person.',
  alternates: { canonical: '/private-events' },
  openGraph: {
    title: 'Wedding & Party Pizza Catering in Leicestershire',
    description:
      'Weddings, mehndi nights, engagements and birthdays. Live Neapolitan pizza that becomes the part of the party everyone remembers.',
    url: '/private-events',
  },
};

const occasionHeading = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)',
} as const;

export default function PrivateEventsPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--page">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="kicker">Weddings · Mehndi · Engagements · Birthdays</p>
            <h1>The part of the party everyone remembers</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              Some caterers set up in the corner. We start a crowd. Hand-stretched dough, the
              glow of the oven, and that moment the first Margherita comes out. This is food
              your guests will still be talking about long after the music stops.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--light btn--lg" href="/quote">Check Your Date</Link>
              <Link className="btn btn--ghost btn--lg" href="/gallery">See Us in Action</Link>
            </div>
            <p className="hero__meta">
              <span>Fully vegetarian</span>
              <span>Vegan &amp; GF options</span>
              <span>From £16 per person</span>
            </p>
          </div>
          <div className="hero__media">
            {/* PHOTO: public/assets/img/hero-private-event.jpg (swap the file to change it) */}
            <Photo
              src="/assets/img/hero-private-event.jpg"
              alt="A man presenting a freshly baked pizza on a wooden peel while a woman beside him laughs and claps"
              aspect="ph--45"
              position="center 45%"
              sizes="(min-width: 900px) 500px, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ============ OCCASIONS ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">Your occasion</p>
            <h2>Whatever you&rsquo;re celebrating, we&rsquo;ve fed it</h2>
          </div>

          <div id="weddings" className="grid-2" style={{ alignItems: 'center', marginBottom: 'clamp(44px, 7vw, 80px)' }}>
            <div className="reveal">
              {/* PHOTO: public/assets/img/occasion-wedding.jpg (swap the file to change it) */}
              <Photo
                src="/assets/img/occasion-wedding.jpg"
                alt="A Neapolitan pizza with a blistered crust on a wooden board in front of a glowing oven fire"
                aspect="ph--43"
                sizes="(min-width: 720px) 560px, 100vw"
              />
            </div>
            <div className="reveal">
              <p className="kicker">Weddings</p>
              <h3 style={occasionHeading}>The evening your guests didn&rsquo;t see coming</h3>
              <p style={{ marginTop: '1rem' }}>
                Whether we&rsquo;re the main event or the late-night rescue after the dancing
                starts, a live pizza station gives your reception a second wind. Fully
                vegetarian, with vegan and gluten-free options, which makes the
                dietary-requirements spreadsheet a lot shorter.
              </p>
            </div>
          </div>

          <div id="mehndi" className="grid-2" style={{ alignItems: 'center', marginBottom: 'clamp(44px, 7vw, 80px)' }}>
            <div className="reveal" style={{ order: 1 }}>
              <p className="kicker">Mehndi &amp; engagements</p>
              <h3 style={occasionHeading}>Made for the nights before the big day</h3>
              <p style={{ marginTop: '1rem' }}>
                Colour, music, family everywhere. Our oven fits right into the middle of it.
                We&rsquo;ve been part of mehndi nights and engagements across Leicestershire
                since 2021, and a fully vegetarian menu means everyone from grandparents to
                toddlers eats from the same pass.
              </p>
            </div>
            <div className="reveal" style={{ order: 2 }}>
              {/* PHOTO: public/assets/img/occasion-mehndi.jpg (swap the file to change it) */}
              <Photo
                src="/assets/img/occasion-mehndi.jpg"
                alt="A freshly baked Margherita pizza with charred crust and fresh basil, cut into slices on a marble table"
                aspect="ph--43"
                sizes="(min-width: 720px) 560px, 100vw"
              />
            </div>
          </div>

          <div id="birthdays" className="grid-2" style={{ alignItems: 'center' }}>
            <div className="reveal">
              {/* PHOTO: public/assets/img/occasion-birthday.jpg (swap the file to change it) */}
              <Photo
                src="/assets/img/occasion-birthday.jpg"
                alt="A smiling woman in a black dress holding up a freshly baked Margherita pizza on a restaurant terrace"
                aspect="ph--43"
                position="center 40%"
                sizes="(min-width: 720px) 560px, 100vw"
              />
            </div>
            <div className="reveal">
              <p className="kicker">Birthdays &amp; garden parties</p>
              <h3 style={occasionHeading}>Better than hiring a marquee band</h3>
              <p style={{ marginTop: '1rem' }}>
                A birthday with a pizzaiolo in the garden is a birthday people turn up to. We
                need a 3m × 3m spot and a power supply. The rest, including the show, comes
                with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT GUESTS SEE ============ */}
      <section className="sec sec--dark">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">What your guests see</p>
            <h2>Dinner, with a front-row seat</h2>
          </div>
          <ol className="steps">
            <li className="step reveal">
              <h3>The stretch</h3>
              <p>48-hour dough, hand-stretched and topped to order while your guests watch (and film it).</p>
            </li>
            <li className="step reveal">
              <h3>The fire</h3>
              <p>Minutes in a roaring Gozney oven. The leopard-spotted crust does its own marketing.</p>
            </li>
            <li className="step reveal">
              <h3>The queue that isn&rsquo;t</h3>
              <p>Pizzas come out one after another, so people drift over, eat, and drift back to the party.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ PRACTICAL ============ */}
      <section className="sec sec--paper">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="kicker">The practical bit</p>
              <h2>Simple to book, simple to host</h2>
              <p className="lede" style={{ marginTop: '1.2rem' }}>
                Packages from £16 per person, minimum hire from £900 depending on location. A
                25% deposit secures your date, with the balance due two weeks before the event.
              </p>
            </div>
            <div className="reveal">
              <ul className="fact-list" style={{ borderTop: '1px solid var(--line)' }}>
                <li>
                  <b>Space</b>
                  <p>A 3m × 3m pitch and a power supply. A garden, driveway or venue courtyard all work.</p>
                </li>
                <li>
                  <b>Dietaries</b>
                  <p>Everything is vegetarian. Vegan and gluten-free options are available, so tell us when you book.</p>
                </li>
                <li>
                  <b>Area</b>
                  <p>Leicester, Leicestershire and the East Midlands. Travel can affect final pricing.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec sec--dark cta-band">
        <div className="container reveal">
          <p className="kicker">One date, one crew</p>
          <h2>Your date is the one thing we can&rsquo;t remake</h2>
          <p className="lede">
            Build an estimate now, and Priten and Vishant will personally confirm we&rsquo;re
            free for your day.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="/quote">Check Your Date</Link>
          </div>
          <p className="pricing-line">Classic from £16pp · Premium from £18pp · Minimum hire from £900</p>
        </div>
      </section>
    </>
  );
}
