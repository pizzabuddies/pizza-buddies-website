# Pizza Buddies: photo guide

All site photos live in this folder (`public/assets/img/`). To change a photo,
replace the file with a new one **using the same file name** and redeploy. No
code changes needed. Colour photos are fine: the site converts every photo to
black & white automatically (the `ph-img` CSS class).

Keep each file under ~300KB (resize to about 1800px on the long edge) so the
site stays fast. Next.js also optimises them for each visitor's screen.

## Photos currently on the site

| File | Where it appears | Shape it is cropped to | Notes |
|---|---|---|---|
| `hero-live-cooking.jpg` | Home hero, Our Story hero | Portrait 4:5 | Real photo: the team at the gazebo. |
| `hero-private-event.jpg` | Private Events hero | Portrait 4:5 | Stand-in image. Replace with a real celebration. |
| `split-private.jpg` | Home, "Weddings" panel | Fills the panel | Stand-in image. A real wedding service shot would be ideal. |
| `split-celebrations.jpg` | Home, "Mehndi, engagements & birthdays" panel | Fills the panel | Real photo: the gazebo set up in a garden. |
| `occasion-wedding.jpg` | Private Events, Weddings | Landscape 4:3 | Stand-in image. |
| `occasion-mehndi.jpg` | Private Events, Mehndi & engagements | Landscape 4:3 | Stand-in image. A colourful mehndi night would suit this. |
| `occasion-birthday.jpg` | Private Events, Birthdays | Landscape 4:3 | Stand-in image. |
| `founder-priten.jpg` | Our Story, founders | Portrait 3:4 | Real photo. |
| `founder-vishant.jpg` | Our Story, founders | Portrait 3:4 | Real photo. |
| `og-cover.jpg` | Link preview when the site is shared (WhatsApp, Facebook) | 1200 x 630 | Currently the logo on black. A strong B&W photo plus the logo would work well. |

## Not yet supplied

- `about-founders.jpg` (portrait 4:5, Priten and Vishant together at the oven):
  the Our Story hero currently reuses `hero-live-cooking.jpg`. To use a
  dedicated photo, add this file and change the `src` in `app/about/page.tsx`.

## The gallery

The Gallery page shows the live Instagram feed for @pizzabuddiesuk, so there
are no gallery photos to upload here. It updates by itself whenever you post.
