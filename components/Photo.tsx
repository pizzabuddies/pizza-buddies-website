import Image from 'next/image';

/* A site photograph: shown in full colour, with lazy loading and
   responsive sizing handled by next/image. Files live in public/assets/img/.

   aspect: one of the ratio classes in globals.css (ph--45, ph--43, ph--34, ph--11 ...).
   fill:   stretch to the parent panel instead of using an aspect ratio.
   position: CSS object-position, to choose which part survives the crop
             (for example 'center 25%' keeps faces near the top of a portrait).
   priority: only for the big image at the top of a page (loads immediately). */

type PhotoProps = {
  src: string;                // e.g. '/assets/img/hero-live-cooking.jpg'
  alt: string;                // describe what is in the picture; use '' for purely decorative images
  sizes: string;              // how wide it displays, so phones don't download desktop-size files
  aspect?: string;
  fill?: boolean;
  position?: string;
  priority?: boolean;
};

export default function Photo({ src, alt, sizes, aspect, fill, position, priority }: PhotoProps) {
  const cls = ['photo', fill ? 'photo--fill' : aspect].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <Image
        className="ph-img"
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
