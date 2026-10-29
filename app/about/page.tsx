import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story — Priten, Vishant & a Garden Pizza Oven',
  description:
    "Pizza Buddies began with a friend's garden pizza oven in 2021. Now Priten and Vishant bring fully vegetarian Neapolitan pizza, cooked live, to events across Leicester and the East Midlands.",
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Our Story — Pizza Buddies',
    description:
      'Two buddies, one garden pizza oven, and five seasons of live Neapolitan pizza across the East Midlands.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--page">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="kicker">Our story</p>
            <h1>It started in a friend&rsquo;s garden</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              One garden pizza oven, one very good evening, and two friends who couldn&rsquo;t
              stop thinking about it. In August 2021, Priten and Vishant took the hint and
              Pizza Buddies started trading. We&rsquo;ve been stretching dough in front of
              crowds ever since.
            </p>
          </div>
          <div className="hero__media">
            {/* IMAGE SLOT: public/assets/img/about-founders.jpg — replace this .ph div with:
                <img className="ph-img ph--45" src="/assets/img/about-founders.jpg"
                     alt="Priten and Vishant, founders of Pizza Buddies, at the oven" /> */}
            <div
              className="ph ph--45"
              role="img"
              aria-label="Placeholder — Priten and Vishant at the oven, professional photography coming soon"
              data-label="about-founders.jpg"
            ></div>
          </div>
        </div>
      </section>

      {/* ============ THE STORY ============ */}
      <section className="sec">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="sec-head reveal" style={{ marginBottom: 0 }}>
              <p className="kicker">How it happened</p>
              <h2>From one oven to every kind of party</h2>
            </div>
            <div className="reveal">
              <p className="lede">
                The idea was simple and it hasn&rsquo;t changed: proper Neapolitan pizza —
                48-hour dough, ingredients from Italy and local producers, cooked in minutes in
                Gozney ovens — made right in front of the people eating it.
              </p>
              <p style={{ marginTop: '1.2rem' }}>
                What has changed is everything around it. Now in our fifth year, we&rsquo;ve
                served weddings, mehndi nights, engagements, birthdays, corporate floors and
                festival fields across Leicestershire and the East Midlands — all of it fully
                vegetarian, all of it cooked live.
              </p>
              <p style={{ marginTop: '1.2rem' }}>
                And because it&rsquo;s just the two of us at the helm, every single booking is
                confirmed personally. When you enquire, you&rsquo;re talking to a founder — not
                a call centre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CREDENTIALS ============ */}
      <section className="sec--paper sec--tight">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="reveal">
              <p className="kicker">The paperwork, in order</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.6vw, 2.4rem)' }}>Rated 5, certified, registered</h2>
            </div>
            <div className="reveal">
              <div className="badges">
                {/* The FSA rating is our official business rating; Level 2 Food Hygiene
                    is a personal qualification — different things, both worth showing. */}
                <span className="badge">Food Hygiene Rating <b className="rating">5</b></span>
                <span className="badge">NCASS Registered</span>
                <span className="badge">Level 2 Food Hygiene</span>
              </div>
              <p style={{ marginTop: '1.2rem', fontSize: '0.98rem' }}>
                We hold the top Food Hygiene Rating of 5 under the Food Standards Agency&rsquo;s
                Food Hygiene Rating Scheme — our official business rating — alongside NCASS
                registration and our Level 2 Food Hygiene certification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="sec sec--dark">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">The journey</p>
            <h2>Five seasons of dough and flame</h2>
          </div>
          <ol className="timeline">
            <li className="tl-item reveal">
              <time>2021</time>
              <p>
                A friend fires up a garden pizza oven. The pizzas are good; the idea is better.
                By August, Pizza Buddies is trading.
              </p>
            </li>
            <li className="tl-item reveal">
              <time>Since then</time>
              <p>
                Weddings, mehndi parties, engagements, birthdays, corporate events and food
                festivals across the East Midlands — NCASS-registered, Level 2 Food Hygiene
                certified and rated 5 for food hygiene along the way.
              </p>
            </li>
            <li className="tl-item reveal">
              <time>2026 &amp; beyond</time>
              <p>
                As we grow, a bespoke fully-fitted pizza trailer is on its way — replacing the
                gazebo, ready for all weathers and even bigger events. Watch this space.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ============ FOUNDERS ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">The buddies</p>
            <h2>Two founders, one pass</h2>
          </div>
          <div className="founders">
            <figure className="founder reveal">
              {/* IMAGE SLOT: public/assets/img/founder-priten.jpg — replace this .ph div with:
                  <img className="ph-img ph--34" src="/assets/img/founder-priten.jpg"
                       alt="Priten, co-founder of Pizza Buddies" loading="lazy" /> */}
              <div className="ph ph--34" role="img" aria-label="Placeholder — portrait of Priten" data-label="founder-priten.jpg"></div>
              <figcaption><b>Priten</b><span>Co-founder</span></figcaption>
            </figure>
            <figure className="founder reveal">
              {/* IMAGE SLOT: public/assets/img/founder-vishant.jpg — replace this .ph div with:
                  <img className="ph-img ph--34" src="/assets/img/founder-vishant.jpg"
                       alt="Vishant, co-founder of Pizza Buddies" loading="lazy" /> */}
              <div className="ph ph--34" role="img" aria-label="Placeholder — portrait of Vishant" data-label="founder-vishant.jpg"></div>
              <figcaption><b>Vishant</b><span>Co-founder</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="sec sec--paper">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">What we stand on</p>
            <h2>Three things we won&rsquo;t compromise</h2>
          </div>
          <div className="grid-3">
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 01</span>
              <h3>Quality</h3>
              <p>
                48-hour fermented dough, premium ingredients from Italy and trusted local
                producers. Shortcuts taste like shortcuts.
              </p>
            </article>
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 02</span>
              <h3>Authenticity</h3>
              <p>
                Neapolitan method, Gozney fire, pizzas cooked in minutes. And a fully
                vegetarian menu — because that&rsquo;s who we are, not a concession.
              </p>
            </article>
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 03</span>
              <h3>Experience</h3>
              <p>
                We don&rsquo;t drop food off. We turn up, light the oven, and give your guests
                something to gather around.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec sec--dark cta-band">
        <div className="container reveal">
          <p className="kicker">Be part of the story</p>
          <h2>Let&rsquo;s cook at yours next</h2>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="/quote">Get a Quote</Link>
          </div>
          <p className="pricing-line">Classic from £16pp · Premium from £18pp · Minimum hire from £900</p>
        </div>
      </section>
    </>
  );
}
