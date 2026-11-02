import Link from 'next/link';
import Image from 'next/image';
import Year from '@/components/Year';
import logoRoundel from '@/public/assets/pizza-buddies-logo-darkbg.png';

export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="site-foot__tri" aria-hidden="true"></div>
      <div className="container">
        <div className="site-foot__grid">
          <div>
            <Link href="/" aria-label="Pizza Buddies, home">
              <Image
                className="site-foot__roundel"
                src={logoRoundel}
                alt="Pizza Buddies"
                sizes="128px"
              />
            </Link>
            <p className="site-foot__blurb">
              Fully vegetarian Neapolitan pizza, cooked live at weddings, parties and
              workplaces across Leicestershire and the East Midlands. Est. 2021.
            </p>
          </div>
          <nav aria-label="Footer">
            <h3>Explore</h3>
            <ul>
              {/* Corporate Events link removed while that page is disabled -
                  see app/corporate-events/page.tsx to re-enable, then restore:
                  <li><Link href="/corporate-events">Corporate Events</Link></li> */}
              <li><Link href="/private-events">Private Events</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/quote">Get a Quote</Link></li>
            </ul>
          </nav>
          <div>
            <h3>Contact</h3>
            <address>
              <ul>
                <li><a href="mailto:info@pizzabuddies.co.uk">info@pizzabuddies.co.uk</a></li>
                <li><a href="tel:+447972611157">07972 611157</a></li>
                <li><a href="tel:+447503864419">07503 864419</a></li>
                <li><a href="https://www.instagram.com/pizzabuddiesuk" rel="noopener">@pizzabuddiesuk</a></li>
              </ul>
            </address>
          </div>
          <div>
            <h3>Good to know</h3>
            <div className="badges">
              {/* FSA Food Hygiene Rating (business rating) - distinct from the
                  Level 2 Food Hygiene certificate (personal qualification) */}
              <span className="badge">Food Hygiene Rating <b className="rating">5</b></span>
              <span className="badge">NCASS Registered</span>
              <span className="badge">Level 2 Food Hygiene</span>
            </div>
            <p className="site-foot__blurb">
              Serving Leicester, Leicestershire &amp; the East Midlands. Minimum hire from
              £900. We need a 3m × 3m pitch and a power supply.
            </p>
          </div>
        </div>
        <div className="site-foot__bottom">
          <p>© <Year /> Pizza Buddies · Leicester, UK</p>
          <p><Link href="/quote">Check your date →</Link></p>
        </div>
      </div>
    </footer>
  );
}
