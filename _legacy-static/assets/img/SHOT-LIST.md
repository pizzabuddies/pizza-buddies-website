# Pizza Buddies — photography shot list & image slots

Every image slot on the site is a named placeholder waiting for these files.
Shoot in colour if you like — **the site converts all photos to black & white
automatically** (via the `.ph-img` CSS class), so nothing needs editing first.

Aim for sharp, high-contrast shots with real moments in them: hands in dough,
flames in the oven, guests mid-laugh. Phone photos work until the pro shoot lands.

## Hero images (most important — shoot these first)

| File | Used on | Orientation | What to shoot |
|---|---|---|---|
| `hero-live-cooking.jpg` | Home | Portrait 4:5 | Pizzaiolo hand-stretching dough, guests visible behind. This is the site's first impression. Could also be a short video loop. |
| `hero-corporate-event.jpg` | Corporate | Portrait 4:5 | Serving a smartly-dressed crowd; setup looking tidy and professional |
| `hero-private-event.jpg` | Private Events | Portrait 4:5 | Guests gathered around the oven at a celebration, energy high |
| `about-founders.jpg` | Our Story | Portrait 4:5 | Priten & Vishant together at the oven |

## Section images

| File | Used on | Orientation | What to shoot |
|---|---|---|---|
| `split-corporate.jpg` | Home (split panel) | Any (fills panel) | Corporate serving moment |
| `split-private.jpg` | Home (split panel) | Any (fills panel) | Wedding/party moment |
| `corporate-setup.jpg` | Corporate | Landscape 4:3 | Full setup wide shot — gazebo (later: trailer), ovens, signage |
| `occasion-wedding.jpg` | Private Events | Landscape 4:3 | Wedding service |
| `occasion-mehndi.jpg` | Private Events | Landscape 4:3 | Mehndi night — colour & movement (goes B&W beautifully) |
| `occasion-birthday.jpg` | Private Events | Landscape 4:3 | Garden party / birthday |
| `founder-priten.jpg` | Our Story | Portrait 3:4 | Priten portrait, at work |
| `founder-vishant.jpg` | Our Story | Portrait 3:4 | Vishant portrait, at work |

## Gallery (`assets/img/gallery/`)

Three per category is the current grid; add more anytime.

- `wedding-01.jpg`, `wedding-02.jpg`, `wedding-03.jpg`
- `mehndi-01.jpg`, `mehndi-02.jpg`, `mehndi-03.jpg`
- `birthday-01.jpg`, `birthday-02.jpg`
- `corporate-01.jpg`, `corporate-02.jpg`
- `festival-01.jpg`, `festival-02.jpg`

## Social sharing

| File | Size | Notes |
|---|---|---|
| `og-cover.jpg` | 1200 × 630 | Shown when the site is shared on WhatsApp/LinkedIn/etc. Logo + one strong B&W image. |

## How to swap an image in

1. Drop the file into `assets/img/` (or `assets/img/gallery/`).
2. In the HTML, find the matching `<!-- IMAGE SLOT: ... -->` comment.
3. Replace the `<div class="ph" ...>` below it with the `<img>` tag shown in the comment.

Keep files under ~300KB each (resize to max 1600px wide) so the site stays fast.
