import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/* ============================================================
   CORPORATE EVENTS — PAGE PARKED (July 2026), NOT DELETED
   ============================================================
   Corporate bookings aren't being actively pursued for now
   (weekday events don't fit around the founders' full-time jobs),
   so this page is switched off. The full page below is kept
   compiled and ready — do not delete it.

   TO RE-ENABLE THIS PAGE:
   1. Change CORPORATE_PAGE_ENABLED to true (one line, just below).
   2. Restore the nav link in components/SiteHeader.tsx
      (see the NOTE at the top of that file).
   3. Restore the footer link in components/SiteFooter.tsx
      (see the comment in its "Explore" list).
   4. Add the route back into app/sitemap.ts
      (see the commented entry there).
   5. Optionally re-add a corporate panel/CTA on the home page
      (app/page.tsx — see the "CELEBRATION SPLIT" comment).

   While disabled, /corporate-events returns a 404 but general
   mentions of corporate catering elsewhere on the site remain.
   ============================================================ */
const CORPORATE_PAGE_ENABLED = false;

export const metadata: Metadata = {
  title: 'Corporate Pizza Catering Leicester',
  description:
    'Corporate pizza catering in Leicester & the East Midlands. NCASS-registered live Neapolitan pizza for launches, away-days and office events. Fully vegetarian menu with vegan and gluten-free options. From £16pp.',
  alternates: { canonical: '/corporate-events' },
  robots: CORPORATE_PAGE_ENABLED ? undefined : { index: false },
};

export default function CorporateEventsPage() {
  if (!CORPORATE_PAGE_ENABLED) notFound();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--page">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="kicker">Corporate &amp; workplace catering</p>
            <h1>The easiest decision on the events checklist</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              Live Neapolitan pizza for launches, away-days, summer socials and end-of-quarter
              thank-yous — delivered with the paperwork in order and zero fuss on the day.
              Fully vegetarian, so one caterer covers the whole floor.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--light btn--lg" href="/quote">Get a Corporate Quote</Link>
              <Link className="btn btn--ghost btn--lg" href="/menu">View the Menu</Link>
            </div>
            <p className="hero__meta">
              <span>Food Hygiene Rating 5</span>
              <span>NCASS Registered</span>
              <span>From £16 per person</span>
            </p>
          </div>
          <div className="hero__media">
            {/* IMAGE SLOT: public/assets/img/hero-corporate-event.jpg — replace this .ph div with:
                <img className="ph-img ph--45" src="/assets/img/hero-corporate-event.jpg"
                     alt="Pizza Buddies serving colleagues at a corporate event" /> */}
            <div
              className="ph ph--45"
              role="img"
              aria-label="Placeholder — corporate event photo, professional photography coming soon"
              data-label="hero-corporate-event.jpg"
            ></div>
          </div>
        </div>
      </section>

      {/* ============ WHY IT WORKS ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">Why pizza works at work</p>
            <h2>A centrepiece, not just catering</h2>
            <p className="lede">
              A buffet gets eaten. A live pizza station gets talked about. Our pizzaiolos
              stretch, top and fire every pizza in front of your team — the food becomes the
              event.
            </p>
          </div>
          <div className="grid-3">
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 01</span>
              <h3>Every diet, one menu</h3>
              <p>
                The whole menu is vegetarian, with vegan and gluten-free options available —
                which makes dietary logistics for a mixed office refreshingly simple.
              </p>
            </article>
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 02</span>
              <h3>Predictable costs</h3>
              <p>
                Per-head pricing from £16, an estimate you can put in front of finance before
                you commit, and payment terms agreed up front.
              </p>
            </article>
            <article className="feat reveal">
              <span className="feat__num" aria-hidden="true">№ 03</span>
              <h3>Minimal footprint</h3>
              <p>
                We need a 3m × 3m pitch and a power supply — a car park, courtyard or loading
                bay is plenty. We arrive, set up, serve and leave the site as we found it.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ COMPLIANCE ============ */}
      <section className="sec sec--paper">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <p className="kicker">Compliance, sorted</p>
              <h2>The boring bits, done properly</h2>
              <p className="lede">We know corporate bookings come with due diligence. Ours is in order.</p>
              <div className="badges" style={{ marginTop: '1.8rem' }}>
                <span className="badge">Food Hygiene Rating <b className="rating">5</b></span>
                <span className="badge">NCASS Registered</span>
                <span className="badge">Level 2 Food Hygiene</span>
              </div>
              <p style={{ marginTop: '1.6rem' }}>
                Compliance documentation is available for your facilities or events team on
                request — just ask when you enquire.
              </p>
              {/* CLIENT LOGO SLOT: when past corporate clients confirm permission, add an
                  "As served at" logo strip here. Do not add logos that haven't been supplied. */}
            </div>
            <div className="reveal">
              {/* IMAGE SLOT: public/assets/img/corporate-setup.jpg — replace this .ph div with:
                  <img className="ph-img ph--43" src="/assets/img/corporate-setup.jpg"
                       alt="Pizza Buddies gazebo setup at a workplace event" loading="lazy" /> */}
              <div
                className="ph ph--43"
                role="img"
                aria-label="Placeholder — our setup at a workplace event"
                data-label="corporate-setup.jpg"
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW BOOKING WORKS ============ */}
      <section className="sec sec--dark">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">How booking works</p>
            <h2>Three steps, one human answer</h2>
          </div>
          <ol className="steps">
            <li className="step reveal">
              <h3>Send your date</h3>
              <p>Use the estimate builder — two minutes, and you&rsquo;ll have a budget figure to circulate internally.</p>
            </li>
            <li className="step reveal">
              <h3>Personal confirmation</h3>
              <p>Priten or Vishant come back to you directly. Availability is confirmed by a founder, not an algorithm.</p>
            </li>
            <li className="step reveal">
              <h3>Locked in</h3>
              <p>A 25% deposit secures the date; the balance is due two weeks before the event. Simple.</p>
            </li>
          </ol>
          <p className="lede reveal" style={{ marginTop: 'clamp(36px, 6vw, 56px)', color: '#d9d9d9' }}>
            As we grow, a bespoke fully-fitted trailer is on its way — built for all-weather
            service and larger events. 2026 and beyond looks bigger.
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">Frequently asked</p>
            <h2>What events teams ask us</h2>
          </div>
          <div className="faq reveal">
            <details>
              <summary>What do you need from our site?</summary>
              <p>
                A 3m × 3m space for our gazebo setup and access to a power supply. Car parks,
                courtyards and outdoor areas all work well — tell us about the site in your
                enquiry and we&rsquo;ll flag anything early.
              </p>
            </details>
            <details>
              <summary>Can you cover vegan and gluten-free colleagues?</summary>
              <p>
                Yes. The entire menu is vegetarian, and vegan and gluten-free options are
                available — let us know numbers when you book and everyone gets fed from the
                same oven.
              </p>
            </details>
            <details>
              <summary>Where do you travel?</summary>
              <p>
                We&rsquo;re based in Leicester and serve events across Leicestershire and the
                East Midlands. Location affects final pricing, which is why we confirm every
                quote personally.
              </p>
            </details>
            <details>
              <summary>How does payment work?</summary>
              <p>
                A 25% deposit confirms your booking, with the balance due two weeks before the
                event. Minimum hire starts from £900 depending on location.
              </p>
            </details>
            <details>
              <summary>Are you certified?</summary>
              <p>
                We hold a Food Hygiene Rating of 5 (the top FSA rating), we&rsquo;re
                NCASS-registered, and we&rsquo;re Level 2 Food Hygiene certified. Documentation
                is available for your due diligence on request.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec sec--dark cta-band">
        <div className="container reveal">
          <p className="kicker">Corporate enquiries</p>
          <h2>Put a date in front of us</h2>
          <p className="lede">
            Get an estimate for your headcount now, then we&rsquo;ll confirm availability and
            the finer details directly with you.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="/quote">Get a Corporate Quote</Link>
          </div>
          <p className="pricing-line">Classic from £16pp · Premium from £18pp · Minimum hire from £900</p>
        </div>
      </section>
    </>
  );
}
