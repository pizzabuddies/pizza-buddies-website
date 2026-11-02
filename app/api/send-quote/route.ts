import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* ============================================================
   /api/send-quote - sends quote-tool enquiries to the business
   via Resend (https://resend.com), no visitor email app involved.

   ─── SETUP (one-time, ~10 minutes) ──────────────────────────
   1. Create a free Resend account at https://resend.com
      → sign up with info@pizzabuddies.co.uk (important: until your
        domain is verified, Resend only delivers to the address you
        signed up with).
   2. In Resend → API Keys → Create API Key ("Sending access" is enough).
   3. Add the key as an environment variable named RESEND_API_KEY:
      • Vercel → your project → Settings → Environment Variables
        → add RESEND_API_KEY = re_xxxxxxxx (all environments), then redeploy.
      • Locally: copy .env.example to .env.local and paste the key there.
      Never paste the key into this file.
   4. RECOMMENDED - verify your domain so enquiries come from your
      own address: Resend → Domains → Add Domain → pizzabuddies.co.uk,
      then add the DNS records Resend shows you at your domain registrar.
      Once verified, change FROM_EMAIL below to something like:
        'Pizza Buddies Website <enquiries@pizzabuddies.co.uk>'
   ============================================================ */

// Where enquiries are delivered:
const TO_EMAIL = 'info@pizzabuddies.co.uk';

// The "from" address. This only works once pizzabuddies.co.uk shows as
// "Verified" in Resend (Domains page). Until then Resend refuses to send.
// (Before a domain is verified, 'onboarding@resend.dev' can be used, but it
// only delivers to the email address your Resend account was created with.)
const FROM_EMAIL = 'Pizza Buddies Website <enquiries@pizzabuddies.co.uk>';

type QuotePayload = {
  location: string;
  eventType: string;
  guests: number;
  packageLabel: string;
  date: string;   // ISO yyyy-mm-dd
  time: string;   // HH:mm
  name: string;
  email: string;
  phone: string;
  notes?: string;
  estimate?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export async function POST(request: Request) {
  let body: Partial<QuotePayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // --- validate ---------------------------------------------------------
  const stringFields = ['location', 'eventType', 'packageLabel', 'date', 'time', 'name', 'email', 'phone'] as const;
  for (const field of stringFields) {
    if (!isNonEmptyString(body[field])) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }
  }
  const guests = Number(body.guests);
  if (!Number.isFinite(guests) || guests < 1 || guests > 2000) {
    return NextResponse.json({ error: 'Please enter a valid guest count.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // --- send -------------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // The env var hasn't been added yet (see SETUP notes at the top of this file)
    console.error('[send-quote] RESEND_API_KEY is not set. Add it in Vercel > Settings > Environment Variables.');
    return NextResponse.json(
      { error: 'Our enquiry form isn’t quite ready yet.' },
      { status: 500 }
    );
  }

  const summaryText = [
    'New availability enquiry from pizzabuddies.co.uk',
    '',
    `Name:     ${body.name}`,
    `Email:    ${body.email}`,
    `Phone:    ${body.phone}`,
    '',
    `Event:    ${body.eventType}`,
    `Date:     ${formatDate(String(body.date))}`,
    `Time:     ${body.time}`,
    `Location: ${body.location}`,
    `Guests:   ${guests}`,
    `Package:  ${body.packageLabel}`,
    body.estimate ? `Estimate shown: ${body.estimate}` : '',
    isNonEmptyString(body.notes) ? `\nNotes:\n${body.notes}` : '',
  ].filter(Boolean).join('\n');

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: String(body.email), // reply straight to the customer from your inbox
    subject: `Availability check: ${formatDate(String(body.date))} | ${body.eventType}, ${guests} guests`,
    text: summaryText,
  });

  if (error) {
    console.error('[send-quote] Resend error:', error);
    return NextResponse.json(
      { error: 'We couldn’t send your enquiry just now.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
