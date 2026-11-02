import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Menu: Classic & Premium Packages',
  description:
    'Our fully vegetarian Neapolitan menu: 48-hour dough, seven pizzas from Margherita to Fake-a-roni, dessert pizzas and sides. Classic from £16pp, Premium from £18pp. Vegan and gluten-free options available.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'The Pizza Buddies Menu: Fully Vegetarian Neapolitan',
    description: 'Seven pizzas, five dessert pizzas, zero meat. Classic from £16pp, Premium from £18pp.',
    url: '/menu',
  },
};

type MenuItem = { name: string; desc?: string; tags?: ('V' | 'VE')[] };

const STARTERS: MenuItem[] = [
  { name: 'Garlic Bread', desc: 'Blistered Neapolitan base, garlic butter. Add mozzarella or green chillies.', tags: ['V'] },
  { name: 'Bruschetta', desc: 'Fior di latte, cherry tomatoes, red onion, rocket, basil pesto, balsamic glaze.', tags: ['V'] },
];

const PIZZAS: MenuItem[] = [
  { name: 'Margherita', desc: 'The classic every Neapolitan menu is judged on: tomato, mozzarella, basil.', tags: ['V'] },
  { name: 'Marinara', desc: 'The Neapolitan original: tomato, garlic, oregano. Simplicity, at full temperature.', tags: ['V'] },
  { name: 'Vegetarian', desc: 'Peppers, sweetcorn, black olives, red onion.', tags: ['V'] },
  { name: 'Spicy', desc: 'Green and red chillies, for the end of the table that always asks for hotter.', tags: ['V'] },
  { name: 'Greek', desc: 'Feta, spinach, black olives, caramelised onion.', tags: ['V'] },
  { name: 'Funghi', desc: 'A medley of mushrooms.', tags: ['V'] },
  { name: 'Fake-a-roni', desc: 'Vegan pepperoni. Fools the pepperoni loyalists every single time.', tags: ['V', 'VE'] },
];

const DESSERTS: MenuItem[] = [
  { name: 'Nutella & Strawberries', desc: 'The crowd-pleaser.', tags: ['V'] },
  { name: 'Nutella & Chillies', desc: 'Sweet heat. Trust us, then tell everyone.', tags: ['V'] },
  { name: 'Biscoff', desc: 'Caramelised biscuit, warm dough. Dangerous combination.', tags: ['V'] },
  { name: 'Pistachio', desc: 'For the sophisticated end of the dessert queue.', tags: ['V'] },
  { name: 'Lemon', desc: 'Bright, sharp, and lighter than it has any right to be.', tags: ['V'] },
];

const ON_REQUEST: MenuItem[] = [
  { name: 'Chips' },
  { name: 'Caprese Salad', tags: ['V'] },
  { name: 'Tiramisu', tags: ['V'] },
  { name: 'Drinks' },
];

function MenuGroup({ title, note, items, last }: { title: string; note: string; items: MenuItem[]; last?: boolean }) {
  return (
    <div className="menu-group reveal" style={last ? { marginBottom: 0 } : undefined}>
      <div className="menu-group__head">
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      <div className="menu-list">
        {items.map((item) => (
          <article className="menu-item" key={item.name}>
            <div className="menu-item__row">
              <h3>{item.name}</h3>
              {item.tags && (
                <span className="tags">
                  {item.tags.map((t) => (
                    <span key={t} className={t === 'VE' ? 'tag tag--ve' : 'tag'}>{t}</span>
                  ))}
                </span>
              )}
            </div>
            {item.desc && <p>{item.desc}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--page">
        <div className="hero__inner hero__inner--solo">
          <div className="hero__copy">
            <p className="kicker">The menu</p>
            <h1>Every pizza vegetarian. Every base, 48 hours in the making.</h1>
            <hr className="tri-rule" aria-hidden="true" />
            <p className="lede">
              Premium ingredients from Italy and local producers, hand-stretched and fired in
              Gozney ovens at your event. Vegan and gluten-free options are available across
              the menu. Just tell us when you book.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PACKAGES ============ */}
      <section className="sec">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">Packages</p>
            <h2>Two ways to book us</h2>
            <p>
              Exact package contents are tailored to your event and confirmed in your quote.
              {/* TODO: confirm exact Classic vs Premium inclusions with Priten & Vishant
                  and list them in the cards below */}
            </p>
          </div>
          <div className="tiers">
            <article className="tier reveal">
              <p className="kicker" style={{ marginBottom: 0 }}>Classic</p>
              <span className="tier__price">£16 <small>from, per person</small></span>
              <p>
                The signature Pizza Buddies experience: our Neapolitan pizzas, hand-stretched
                and cooked live, served one after another.
              </p>
              <ul>
                <li>Live cooking station &amp; pizzaiolos</li>
                <li>48-hour fermented dough</li>
                <li>Vegan &amp; gluten-free options on request</li>
              </ul>
              <Link className="btn" href="/quote">Estimate with Classic</Link>
            </article>
            <article className="tier tier--dark reveal">
              <span className="tier__tag">Most popular for weddings</span>
              <p className="kicker" style={{ marginBottom: 0 }}>Premium</p>
              <span className="tier__price">£18 <small>from, per person</small></span>
              <p>
                The full spread: wider choice across the menu, built for weddings, mehndi
                nights and showpiece events.
              </p>
              <ul>
                <li>Everything in Classic</li>
                <li>Wider menu choice for your guests</li>
                <li>Vegan &amp; gluten-free options on request</li>
              </ul>
              <Link className="btn btn--light" href="/quote">Estimate with Premium</Link>
            </article>
          </div>
          <p className="smallprint reveal" style={{ marginTop: '1.8rem' }}>
            Minimum hire from £900 depending on location. A 25% deposit secures your date; the
            balance is due two weeks before your event.
          </p>
        </div>
      </section>

      {/* ============ THE FOOD ============ */}
      <section className="sec sec--paper">
        <div className="container">
          <div className="sec-head reveal">
            <p className="kicker">Dietary key</p>
            <h2>What&rsquo;s on the pass</h2>
            <p>
              <span className="tag">V</span> Everything on this menu is vegetarian&nbsp;&nbsp;
              <span className="tag tag--ve">VE</span> Vegan &nbsp;·&nbsp; Vegan and gluten-free
              options are available across the menu, so tell us when you book.
            </p>
          </div>

          <MenuGroup title="Starters" note="While the oven roars" items={STARTERS} />
          <MenuGroup title="Pizzas" note="Hand-stretched · fired in minutes" items={PIZZAS} />
          <MenuGroup title="Dessert Pizzas" note="Same oven, sweeter ending" items={DESSERTS} />
          <MenuGroup title="On Request" note="Sides &amp; extras, arranged when you book" items={ON_REQUEST} last />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="sec sec--dark cta-band">
        <div className="container reveal">
          <p className="kicker">Hungry yet?</p>
          <h2>Price it up for your guest list</h2>
          <p className="lede">Pick a package, tell us your headcount, and get an honest estimate in two minutes.</p>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="/quote">Get a Quote</Link>
          </div>
          <p className="pricing-line">Classic from £16pp · Premium from £18pp · Minimum hire from £900</p>
        </div>
      </section>
    </>
  );
}
