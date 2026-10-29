'use client';

import { useState } from 'react';

/* Gallery items. To swap in real photography, replace a `ph` entry's div with:
   <img className="ph-img" src="/assets/img/gallery/FILE" alt="…" loading="lazy" />
   (see the IMAGE SLOT list in public/assets/img/SHOT-LIST.md) */

type Cat = 'wedding' | 'mehndi' | 'birthday' | 'corporate' | 'festival';

const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'wedding', label: 'Weddings' },
  { key: 'mehndi', label: 'Mehndi & Engagements' },
  { key: 'birthday', label: 'Birthdays' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'festival', label: 'Festivals' },
];

const ITEMS: { file: string; cat: Cat; caption: string; aria: string; span?: 'tall' | 'wide' }[] = [
  { file: 'wedding-01.jpg', cat: 'wedding', caption: 'Wedding', aria: 'Placeholder — wedding photo', span: 'tall' },
  { file: 'corporate-01.jpg', cat: 'corporate', caption: 'Corporate', aria: 'Placeholder — corporate event photo' },
  { file: 'mehndi-01.jpg', cat: 'mehndi', caption: 'Mehndi', aria: 'Placeholder — mehndi night photo' },
  { file: 'festival-01.jpg', cat: 'festival', caption: 'Festival', aria: 'Placeholder — food festival photo', span: 'wide' },
  { file: 'birthday-01.jpg', cat: 'birthday', caption: 'Birthday', aria: 'Placeholder — birthday party photo' },
  { file: 'wedding-02.jpg', cat: 'wedding', caption: 'Wedding', aria: 'Placeholder — wedding photo' },
  { file: 'mehndi-02.jpg', cat: 'mehndi', caption: 'Engagement', aria: 'Placeholder — engagement party photo', span: 'tall' },
  { file: 'corporate-02.jpg', cat: 'corporate', caption: 'Corporate', aria: 'Placeholder — corporate event photo' },
  { file: 'festival-02.jpg', cat: 'festival', caption: 'Festival', aria: 'Placeholder — food festival photo' },
  { file: 'birthday-02.jpg', cat: 'birthday', caption: 'Birthday', aria: 'Placeholder — garden party photo' },
  { file: 'wedding-03.jpg', cat: 'wedding', caption: 'Wedding', aria: 'Placeholder — wedding photo', span: 'wide' },
  { file: 'mehndi-03.jpg', cat: 'mehndi', caption: 'Mehndi', aria: 'Placeholder — mehndi night photo' },
];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Cat | 'all'>('all');

  const shown = ITEMS.filter((i) => filter === 'all' || i.cat === filter).length;

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter gallery by event type">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className="chip"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="smallprint" aria-live="polite" style={{ margin: '0 0 18px' }}>
        {filter === 'all' ? '' : `${shown} ${shown === 1 ? 'photo' : 'photos'} shown`}
      </p>

      <div className="gallery-grid">
        {ITEMS.map((item) => (
          <figure
            key={item.file}
            className={`gitem${item.span === 'tall' ? ' gitem--tall' : ''}${item.span === 'wide' ? ' gitem--wide' : ''}`}
            hidden={filter !== 'all' && item.cat !== filter}
          >
            {/* IMAGE SLOT: public/assets/img/gallery/{item.file} */}
            <div className="ph" role="img" aria-label={item.aria} data-label={item.file}></div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
