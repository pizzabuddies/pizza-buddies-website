'use client';

import { useState } from 'react';

/* The gallery: Instagram's official profile embed for @pizzabuddiesuk.
   It always shows the latest posts, with no API keys or tokens, and works
   because the account is public.

   PRIVACY SWITCH: Instagram's embed sets tracking cookies. This site has no
   other cookies (so no cookie banner), so by default the feed only loads
   after the visitor taps the button. To load it automatically instead, set
   LOAD_ON_CLICK to false below (and add a cookie notice if you do). */
const LOAD_ON_CLICK = true;

const HANDLE = 'pizzabuddiesuk';
const PROFILE_URL = `https://www.instagram.com/${HANDLE}/`;
const EMBED_URL = `https://www.instagram.com/${HANDLE}/embed/`;

export default function InstagramFeed() {
  const [loaded, setLoaded] = useState(!LOAD_ON_CLICK);

  return (
    <div className="insta">
      {loaded ? (
        <iframe
          className="insta__frame"
          src={EMBED_URL}
          title="Pizza Buddies on Instagram: our latest photos and videos"
          loading="lazy"
        />
      ) : (
        <div className="insta__gate">
          <p className="kicker">Live from Instagram</p>
          <h2>Our latest photos and videos</h2>
          <p>
            Our gallery is our Instagram, so you always see our newest events first.
            Loading it brings in content from Instagram, which may set cookies.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn--light btn--lg" onClick={() => setLoaded(true)}>
              Load the live feed
            </button>
            <a className="btn btn--ghost btn--lg" href={PROFILE_URL} rel="noopener" target="_blank">
              Open on Instagram
            </a>
          </div>
        </div>
      )}
      {loaded && (
        <p className="insta__foot">
          Can&rsquo;t see the feed?{' '}
          <a href={PROFILE_URL} rel="noopener" target="_blank">View @{HANDLE} on Instagram</a>
        </p>
      )}
    </div>
  );
}
