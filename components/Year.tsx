'use client';

/* Client component so the © year stays current even if the site
   isn't rebuilt for a long time. */
export default function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
