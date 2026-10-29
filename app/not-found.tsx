import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="sec notfound">
      <div className="container">
        <p className="kicker">404 — page not found</p>
        <h1>This slice doesn&rsquo;t exist</h1>
        <hr className="tri-rule tri-rule--center" aria-hidden="true" />
        <p className="lede" style={{ marginInline: 'auto', maxWidth: '46ch' }}>
          The page you&rsquo;re after isn&rsquo;t on the menu. Let&rsquo;s get you back to the
          good stuff.
        </p>
        <div className="hero__actions" style={{ justifyContent: 'center' }}>
          <Link className="btn btn--lg" href="/">Back home</Link>
          <Link className="btn btn--ghost btn--lg" href="/quote">Get a Quote</Link>
        </div>
      </div>
    </section>
  );
}
