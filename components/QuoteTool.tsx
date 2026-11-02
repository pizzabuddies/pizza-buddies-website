'use client';

import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Pizza Buddies - estimate builder + availability enquiry
   ------------------------------------------------------------------
   This is an ESTIMATE tool, not a booking system. It ends in a
   lead-capture step; availability is always confirmed personally by
   the founders. Submissions POST to /api/send-quote, which emails
   the enquiry to the business via Resend (see app/api/send-quote/route.ts).

   PRICING - edit these three constants when prices change:            */
const PRICE_PER_PERSON = { classic: 16, premium: 18 } as const;
const MINIMUM_HIRE = 900;          // £; minimum hire, depends on location
const ESTIMATE_HEADROOM = 1.15;    // upper bound of range (+15% for travel/extras)

type Pkg = keyof typeof PRICE_PER_PERSON;

const EVENT_TYPES = ['Wedding', 'Mehndi', 'Engagement', 'Birthday', 'Corporate', 'Festival', 'Other'];

type FormData = {
  location: string;
  eventType: string;
  guests: string;
  pkg: Pkg | '';
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const EMPTY: FormData = {
  location: '', eventType: '', guests: '', pkg: '', date: '', time: '',
  name: '', email: '', phone: '', notes: '',
};

function gbp(n: number) {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

function niceDate(iso: string) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function calcRange(guests: number, pkg: Pkg) {
  const perHead = PRICE_PER_PERSON[pkg];
  const base = guests * perHead;
  const low = Math.max(MINIMUM_HIRE, base);
  const high = Math.max(low, Math.ceil((base * ESTIMATE_HEADROOM) / 25) * 25);
  return { low, high, base, perHead };
}

export default function QuoteTool() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [minDate, setMinDate] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [done, setDone] = useState(false);

  // Set the earliest pickable date on the client so it's always "today"
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMinDate(now.toISOString().slice(0, 10));
  }, []);

  // Move focus to the current step's heading (but not on first render)
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) headingRef.current?.focus();
    mounted.current = true;
  }, [step, done]);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData((d) => ({ ...d, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  function validateStep1() {
    const errs: typeof errors = {};
    if (!data.location.trim()) errs.location = 'This one’s required.';
    if (!data.eventType) errs.eventType = 'This one’s required.';
    const guests = Number(data.guests);
    if (!data.guests.trim()) errs.guests = 'This one’s required.';
    else if (!Number.isFinite(guests) || guests < 1 || guests > 2000) {
      errs.guests = 'Please enter a guest count between 1 and 2000.';
    }
    if (!data.date) errs.date = 'This one’s required.';
    else if (minDate && data.date < minDate) errs.date = 'Please pick a date in the future.';
    if (!data.time) errs.time = 'This one’s required.';
    if (!data.pkg) errs.pkg = 'Please choose a package.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep3() {
    const errs: typeof errors = {};
    if (!data.name.trim()) errs.name = 'This one’s required.';
    if (!data.email.trim()) errs.email = 'This one’s required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'That email address doesn’t look quite right.';
    }
    if (!data.phone.trim()) errs.phone = 'This one’s required.';
    else if (data.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a phone number we can reach you on.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const pkg: Pkg = data.pkg || 'classic';
  const range = calcRange(Number(data.guests) || 0, pkg);
  const pkgLabel = pkg === 'premium' ? 'Premium (from £18pp)' : 'Classic (from £16pp)';
  const estimateText = range.high > range.low
    ? `${gbp(range.low)} – ${gbp(range.high)}`
    : `From ${gbp(range.low)}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep3()) return;
    setSending(true);
    setSendError('');
    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: data.location.trim(),
          eventType: data.eventType,
          guests: Number(data.guests),
          packageLabel: pkgLabel,
          date: data.date,
          time: data.time,
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          notes: data.notes.trim(),
          estimate: estimateText,
        }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.ok) {
        setDone(true);
      } else {
        setSendError(json?.error || 'Something went wrong sending your enquiry.');
      }
    } catch {
      setSendError('Something went wrong sending your enquiry.');
    } finally {
      setSending(false);
    }
  }

  /* ---------- success panel ---------- */
  if (done) {
    return (
      <div className="quote-done">
        <p className="kicker">Enquiry received</p>
        <h2 tabIndex={-1} ref={headingRef}>Thanks, we&rsquo;ve got your details</h2>
        <p>
          We&rsquo;ve received your enquiry and will confirm availability shortly. Priten or
          Vishant will come back to you personally at <strong>{data.email}</strong>. Every
          date is checked by a founder, not an algorithm.
        </p>
        <ul className="est-recap" style={{ borderTop: '1px solid var(--line)', color: 'inherit' }}>
          <li style={{ color: 'inherit' }}><b>Event</b>{data.eventType}</li>
          <li style={{ color: 'inherit' }}><b>Date</b>{niceDate(data.date)}, {data.time}</li>
          <li style={{ color: 'inherit' }}><b>Guests</b>{data.guests}</li>
          <li style={{ color: 'inherit' }}><b>Package</b>{pkgLabel}</li>
          <li style={{ color: 'inherit' }}><b>Estimate</b>{estimateText}</li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ol className="progress" aria-label="Quote steps">
        <li aria-current={step === 1 ? 'step' : undefined} className={step > 1 ? 'done' : ''}>Your event</li>
        <li aria-current={step === 2 ? 'step' : undefined} className={step > 2 ? 'done' : ''}>Your estimate</li>
        <li aria-current={step === 3 ? 'step' : undefined}>Check availability</li>
      </ol>

      <form onSubmit={submit} noValidate>
        {/* ================= STEP 1 - inputs ================= */}
        <fieldset className="qstep" hidden={step !== 1}>
          <h2 tabIndex={-1} ref={step === 1 ? headingRef : undefined}>Tell us about your event</h2>
          <div className="fields">
            <div className={`field${errors.location ? ' error' : ''}`}>
              <label htmlFor="event-location">Event location</label>
              <input
                type="text" id="event-location" required autoComplete="postal-code"
                placeholder="Postcode or town (e.g. LE2 or Market Harborough)"
                value={data.location} onChange={set('location')}
                aria-invalid={errors.location ? true : undefined}
              />
              <p className="err" aria-live="polite">{errors.location}</p>
            </div>
            <div className={`field${errors.eventType ? ' error' : ''}`}>
              <label htmlFor="event-type">Event type</label>
              <select
                id="event-type" required value={data.eventType} onChange={set('eventType')}
                aria-invalid={errors.eventType ? true : undefined}
              >
                <option value="" disabled>Choose an event type…</option>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <p className="err" aria-live="polite">{errors.eventType}</p>
            </div>
            <div className={`field${errors.guests ? ' error' : ''}`}>
              <label htmlFor="guest-count">Guest count</label>
              <input
                type="number" id="guest-count" required min={1} max={2000} inputMode="numeric"
                placeholder="e.g. 80" value={data.guests} onChange={set('guests')}
                aria-invalid={errors.guests ? true : undefined}
              />
              <p className="hint">A best guess is fine. We&rsquo;ll fine-tune it together.</p>
              <p className="err" aria-live="polite">{errors.guests}</p>
            </div>
            <div className={`field${errors.date ? ' error' : ''}`}>
              <label htmlFor="event-date">Event date</label>
              <input
                type="date" id="event-date" required min={minDate || undefined}
                value={data.date} onChange={set('date')}
                aria-invalid={errors.date ? true : undefined}
              />
              <p className="err" aria-live="polite">{errors.date}</p>
            </div>
            <div className={`field${errors.time ? ' error' : ''}`}>
              <label htmlFor="event-time">Serving time</label>
              <input
                type="time" id="event-time" required value={data.time} onChange={set('time')}
                aria-invalid={errors.time ? true : undefined}
              />
              <p className="err" aria-live="polite">{errors.time}</p>
            </div>
            <div className={`field field--full${errors.pkg ? ' error' : ''}`}>
              <span className="field__legend" id="pkg-legend">Package</span>
              <div className="pkg-grid" role="radiogroup" aria-labelledby="pkg-legend">
                <div className="pkg">
                  <input
                    type="radio" id="pkg-classic" name="package" value="classic" required
                    checked={data.pkg === 'classic'}
                    onChange={() => { setData((d) => ({ ...d, pkg: 'classic' })); setErrors((e) => ({ ...e, pkg: undefined })); }}
                  />
                  <label htmlFor="pkg-classic">
                    <b>Classic</b>
                    <span className="pkg__price">£16 <small>from, pp</small></span>
                    <p>The signature experience: our Neapolitan pizzas, hand-stretched and cooked live for your guests.</p>
                  </label>
                </div>
                <div className="pkg">
                  <input
                    type="radio" id="pkg-premium" name="package" value="premium" required
                    checked={data.pkg === 'premium'}
                    onChange={() => { setData((d) => ({ ...d, pkg: 'premium' })); setErrors((e) => ({ ...e, pkg: undefined })); }}
                  />
                  <label htmlFor="pkg-premium">
                    <b>Premium</b>
                    <span className="pkg__price">£18 <small>from, pp</small></span>
                    <p>The full spread: wider menu choice, made for weddings and showpiece events.</p>
                  </label>
                </div>
              </div>
              <p className="err" aria-live="polite">{errors.pkg}</p>
            </div>
          </div>
          <div className="qstep__actions">
            <button
              type="button" className="btn btn--lg"
              onClick={() => { if (validateStep1()) setStep(2); }}
            >
              See my estimate
            </button>
          </div>
        </fieldset>

        {/* ================= STEP 2 - estimate output ================= */}
        <fieldset className="qstep" hidden={step !== 2}>
          <h2 tabIndex={-1} ref={step === 2 ? headingRef : undefined}>Your estimate</h2>
          <div className="estimate-card" aria-live="polite">
            <p className="kicker">Estimated cost</p>
            <p className="estimate-card__range">{estimateText}</p>
            <p className="estimate-card__note">
              This is an estimate to help you budget, based on your guest count and package,
              before travel and location are factored in. Every event is confirmed personally
              by Priten and Vishant to make sure we can deliver on your date.
            </p>
            {range.base < MINIMUM_HIRE && (
              <p className="estimate-card__minflag">
                Our minimum hire of {gbp(MINIMUM_HIRE)} applies to this estimate
              </p>
            )}
            <ul className="est-recap">
              <li><b>Event</b>{data.eventType}</li>
              <li><b>Date</b>{niceDate(data.date)}{data.time ? `, ${data.time}` : ''}</li>
              <li><b>Guests</b>{data.guests} × {gbp(range.perHead)} per person</li>
              <li><b>Package</b>{pkgLabel}</li>
              <li><b>Location</b>{data.location}</li>
            </ul>
          </div>
          <div className="qstep__actions">
            <button type="button" className="btn-back" onClick={() => setStep(1)}>← Adjust details</button>
            <button type="button" className="btn btn--lg" onClick={() => setStep(3)}>
              Looks right: check availability
            </button>
          </div>
        </fieldset>

        {/* ================= STEP 3 - lead capture ================= */}
        <fieldset className="qstep" hidden={step !== 3}>
          <h2 tabIndex={-1} ref={step === 3 ? headingRef : undefined}>Check availability for this date</h2>
          <p style={{ marginBottom: '1.8rem' }}>
            This is where a human takes over. Send us your details and Priten or Vishant will
            come back to you personally to confirm whether your date is free. Nothing is
            booked automatically.
          </p>
          <div className="fields">
            <div className={`field${errors.name ? ' error' : ''}`}>
              <label htmlFor="contact-name">Your name</label>
              <input
                type="text" id="contact-name" required autoComplete="name"
                value={data.name} onChange={set('name')}
                aria-invalid={errors.name ? true : undefined}
              />
              <p className="err" aria-live="polite">{errors.name}</p>
            </div>
            <div className={`field${errors.phone ? ' error' : ''}`}>
              <label htmlFor="contact-phone">Phone</label>
              <input
                type="tel" id="contact-phone" required autoComplete="tel"
                value={data.phone} onChange={set('phone')}
                aria-invalid={errors.phone ? true : undefined}
              />
              <p className="err" aria-live="polite">{errors.phone}</p>
            </div>
            <div className={`field field--full${errors.email ? ' error' : ''}`}>
              <label htmlFor="contact-email">Email</label>
              <input
                type="email" id="contact-email" required autoComplete="email"
                value={data.email} onChange={set('email')}
                aria-invalid={errors.email ? true : undefined}
              />
              <p className="err" aria-live="polite">{errors.email}</p>
            </div>
            <div className="field field--full">
              <label htmlFor="contact-notes">
                Anything we should know? <span style={{ opacity: 0.5 }}>(optional)</span>
              </label>
              <textarea
                id="contact-notes" placeholder="Venue details, dietary requirements, timings…"
                value={data.notes} onChange={set('notes')}
              />
            </div>
          </div>
          <div className="qstep__actions">
            <button type="button" className="btn-back" onClick={() => setStep(2)}>← Back to estimate</button>
            <button type="submit" className="btn btn--lg" disabled={sending}>
              {sending ? 'Sending…' : 'Check availability for this date'}
            </button>
          </div>
          {sendError && (
            <p className="send-error" role="alert">
              {sendError} Please try again in a minute, or email us directly at{' '}
              <a href="mailto:info@pizzabuddies.co.uk">info@pizzabuddies.co.uk</a>.
            </p>
          )}
          <p className="smallprint">
            Your enquiry goes straight to Priten and Vishant at info@pizzabuddies.co.uk.
            No email app needed, and nothing is booked until they confirm with you.
          </p>
        </fieldset>
      </form>
    </div>
  );
}
