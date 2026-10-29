import type { Metadata, Viewport } from 'next';
import { Anton, Oswald, Source_Serif_4 } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Effects from '@/components/Effects';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});
const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pizzabuddies.co.uk'),
  title: {
    default: 'Pizza Buddies — Neapolitan Pizza Catering in Leicester & the East Midlands',
    template: '%s | Pizza Buddies',
  },
  description:
    'Live Neapolitan pizza catering for weddings, mehndi parties, birthdays and events across Leicestershire. Fully vegetarian menu, 48-hour dough, Gozney ovens. From £16 per person.',
  openGraph: {
    siteName: 'Pizza Buddies',
    locale: 'en_GB',
    type: 'website',
    /* IMAGE SLOT: public/assets/img/og-cover.jpg — regenerate with real photography when available */
    images: ['/assets/img/og-cover.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${anton.variable} ${oswald.variable} ${sourceSerif.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Effects />
      </body>
    </html>
  );
}
