'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* Reveal-on-scroll: mirrors the original static-site behaviour.
   The `js` class gates the hidden state so content is always visible
   without JavaScript; prefers-reduced-motion is respected in CSS too. */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
