# Pizza Buddies - Website

Brand & lead-capture site for Pizza Buddies, fully vegetarian Neapolitan pizza
catering in Leicester & the East Midlands.

**Stack:** Next.js (App Router) + TypeScript, built for **Vercel**. Enquiries
from the quote tool are emailed to the business server-side via **Resend** -
no visitor email app involved.

## Deploying to Vercel

1. Push this folder to a GitHub repository (Vercel deploys from Git):
   `git init`, commit, push, then **vercel.com → Add New Project → import the repo**.
   Vercel auto-detects Next.js - no build settings needed
   (`npm run build` / `next build` are already wired up in package.json).
2. **Before going live, add the environment variable** (see next section):
   - `RESEND_API_KEY` - Vercel → Project → **Settings → Environment Variables**.
3. Point the pizzabuddies.co.uk domain at the project
   (Vercel → Project → Settings → Domains).

### Required environment variables

| Variable | Purpose | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Lets the quote form send enquiry emails | resend.com → API Keys (free tier) |

Without the key the site still runs; the quote form shows a friendly error
(with a direct-email fallback) instead of sending.

## Enquiry emails (Resend) - one-time setup

Full step-by-step comments live at the top of
[`app/api/send-quote/route.ts`](app/api/send-quote/route.ts). Short version:

1. Create a free account at resend.com - **sign up with info@pizzabuddies.co.uk**
   (until your domain is verified, Resend only delivers to the address you
   signed up with).
2. Create an API key and add it to Vercel as `RESEND_API_KEY`, then redeploy.
3. Recommended: verify pizzabuddies.co.uk in Resend (Domains → add the DNS
   records they show you), then update the `FROM_EMAIL` constant in the route
   file to `'Pizza Buddies Website <enquiries@pizzabuddies.co.uk>'`.

The enquiry email includes: name, email, phone, event type, date, time,
location, guest count, package, the estimate shown, and any notes. Reply-to is
set to the customer, so you can answer straight from your inbox.

## Running locally

Requires Node.js 18.18+ (nodejs.org). Then:

```
npm install
npm run dev        # http://localhost:3000
```

For a real send test locally: copy `.env.example` to `.env.local` and paste
your Resend key in.

(Heads-up: this machine had no system Node when the site was converted, so
`.claude/dev.ps1` bootstraps a portable Node from a temp folder for the
in-session preview. Once you install Node properly, plain `npm run dev` is all
you need.)

## Where things live

| Path | What |
|---|---|
| `app/` | One folder per page (App Router): `page.tsx` at the root is Home, plus `private-events/`, `menu/`, `gallery/`, `about/`, `quote/` |
| `app/api/send-quote/route.ts` | The serverless email endpoint (Resend) |
| `app/corporate-events/page.tsx` | **Parked corporate page** - see below |
| `app/globals.css` | The whole design system (black & white, tricolour accents) |
| `components/` | Header, footer, quote tool, photo, Instagram feed, etc. |
| `public/assets/` | Logos (renamed, no spaces) + `img/` for photography |
| `app/icon.png`, `app/apple-icon.png` | Favicons, generated from the PB roundel - Next serves these automatically |
| `_legacy-static/` | The original static-HTML site, kept for reference. Not deployed. Safe to delete once Vercel is live. |

### Pricing

Estimate-tool pricing constants are at the top of
[`components/QuoteTool.tsx`](components/QuoteTool.tsx):
`PRICE_PER_PERSON` (£16/£18), `MINIMUM_HIRE` (£900), `ESTIMATE_HEADROOM` (+15%).

### The corporate events page (parked, not deleted)

Corporate isn't being pursued as a dedicated funnel right now, so
`/corporate-events` returns 404 and no navigation links point to it. The full
page is kept intact behind a flag. **To re-enable:** open
[`app/corporate-events/page.tsx`](app/corporate-events/page.tsx) and follow the
5-step checklist at the top (flip `CORPORATE_PAGE_ENABLED` to `true`, restore
the marked nav/footer/sitemap entries). General mentions of corporate catering
in site copy were intentionally kept.

## Photos

All photos live in `public/assets/img/`. To change one, replace the file with a
new one **with the same file name** and push to GitHub; Vercel redeploys it.
Photos are shown in full colour. (To bring back the black & white treatment, see
the comment on the `.ph-img` rule in `app/globals.css`.) Photos are shown through [`components/Photo.tsx`](components/Photo.tsx)
(lazy loading, responsive sizes, crop position). The full list of photos, where
each appears and which are stand-ins is in
[`public/assets/img/SHOT-LIST.md`](public/assets/img/SHOT-LIST.md).

## Gallery (Instagram)

The Gallery page embeds the live Instagram feed for @pizzabuddiesuk
([`components/InstagramFeed.tsx`](components/InstagramFeed.tsx)), so it updates
whenever you post. It needs the Instagram account to stay public.

Instagram's embed sets cookies, so by default the feed loads when a visitor taps
"Load the live feed". The site has no other cookies, so this avoids needing a
cookie banner. To load the feed automatically instead, set `LOAD_ON_CLICK` to
`false` at the top of that file (and add a cookie notice if you do).

The earlier filterable photo grid is kept, unused, in `components/GalleryGrid.tsx`.

## Still awaiting real content (marked in the code)

- Stand-in photos (see SHOT-LIST.md) - replace with your own event photography
- `TESTIMONIAL SLOT` on the home page - real client quotes only
- `CLIENT LOGO SLOT` on the parked corporate page - with permission only
- `TODO` on the menu page - confirm exact Classic vs Premium package contents
- `og-cover.jpg` - currently the logo on black; replace with a photo version

## Brand rules baked into the design

- Strict black & white; the Italian tricolour appears only as thin accent
  rules (logo underline, button hover, dividers) - never backgrounds.
- Display type: Anton. Labels/nav: Oswald. Body: Source Serif 4
  (all self-hosted via `next/font`).
- Trust signals: FSA **Food Hygiene Rating 5** (official business rating) is
  shown alongside **NCASS registration** and the **Level 2 Food Hygiene**
  certificate (personal qualification) - they're different things, so keep all
  three badges.
- The trailer is referenced as **on its way** ("2026 & beyond") - update
  about/corporate copy when it's actually in service.
