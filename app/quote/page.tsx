import type { Metadata } from 'next';
import QuoteTool from '@/components/QuoteTool';

export const metadata: Metadata = {
  title: 'Get a Quote: Check Your Date',
  description:
    'Build an instant estimate for Neapolitan pizza catering at your wedding, party or celebration in Leicester & the East Midlands, then check your date directly with the founders.',
  alternates: { canonical: '/quote' },
  openGraph: {
    title: 'Get a Quote from Pizza Buddies',
    description: 'Two minutes, five questions, an honest estimate, then the founders personally confirm your date.',
    url: '/quote',
  },
};

export default function QuotePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--page">
        <div className="hero__inner hero__inner--solo">
          <div className="hero__copy">
            <p className="kicker">Get a quote</p>
            <h1>An honest estimate, then a human answer</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              Five questions, two minutes, a realistic number for your budget. Then Priten and
              Vishant personally check your date. Every event is confirmed by the founders,
              never by an algorithm.
            </p>
          </div>
        </div>
      </section>

      {/* ============ ESTIMATE TOOL ============ */}
      <section className="sec">
        <div className="container">
          <div className="quote-layout">
            <div>
              <noscript>
                <p style={{ border: '1px solid var(--it-red)', padding: '16px 20px', marginBottom: '28px' }}>
                  The estimate builder needs JavaScript. No problem: email{' '}
                  <a href="mailto:info@pizzabuddies.co.uk">info@pizzabuddies.co.uk</a>{' '}
                  with your date, location, guest count and preferred package (Classic from
                  £16pp / Premium from £18pp) and we&rsquo;ll reply with a quote.
                </p>
              </noscript>
              <QuoteTool />
            </div>

            {/* ================= ASIDE ================= */}
            <aside aria-label="Contact details and booking terms">
              <div className="aside-card aside-card--dark">
                <h3>Prefer to talk it through?</h3>
                <ul>
                  <li><b>Email</b><a href="mailto:info@pizzabuddies.co.uk">info@pizzabuddies.co.uk</a></li>
                  <li><b>Priten</b><a href="tel:+447972611157">07972 611157</a></li>
                  <li><b>Vishant</b><a href="tel:+447503864419">07503 864419</a></li>
                  <li><b>Instagram</b><a href="https://www.instagram.com/pizzabuddiesuk" rel="noopener">@pizzabuddiesuk</a></li>
                </ul>
              </div>
              <div className="aside-card">
                <h3>The small print</h3>
                <ul>
                  <li><b>Minimum hire</b>From £900, depending on location</li>
                  <li><b>Securing a date</b>25% deposit, balance due two weeks before your event</li>
                  <li><b>Space we need</b>3m × 3m pitch plus a power supply</li>
                  <li><b>Service area</b>Leicester, Leicestershire &amp; the East Midlands</li>
                  <li><b>Dietaries</b>Fully vegetarian menu; vegan &amp; gluten-free options on request</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
