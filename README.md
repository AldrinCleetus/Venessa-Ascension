# Venessa — Landing Page

Marketing site for **Project Venessa**, a pre-deployment failure simulator for cloud architectures.
Repository: `Venessa-Ascension`.

> See what breaks before you deploy.

Static HTML, CSS and vanilla JS. No build step, no dependencies, no framework.

## Preview

Open `index.html` directly — everything works from the filesystem.

Or serve it locally:

```bash
# Python
python -m http.server 4173

# Node
npx serve .
```

Then open `http://localhost:4173`.

## Structure

```
Venessa-Ascension/
├── index.html    # All sections and copy
├── styles.css    # Design tokens, layout, animation, responsive rules
├── main.js       # Nav, scroll reveal, counters, hero live cycle
├── favicon.svg   # Brand mark
└── README.md
```

## Design notes

- **Palette is lifted from the app** (`frontend/src/index.css`): `--bg #0a0e17`,
  `--panel #111723`, `--accent #4f8cff`, `--ok #22c55e`, `--warn #f5a524`,
  `--bad #f04461`, `--boot #a78bfa`.
- **Type**: Inter for UI, Instrument Serif italic for accent words,
  JetBrains Mono for labels and data.
- **Motion**: one load sequence, IntersectionObserver reveals, a live failure
  cycle in the hero report, and CSS-only ambient glow. All of it is disabled
  under `prefers-reduced-motion`.
- **Responsive**: breakpoints at 1080 / 960 / 760 / 520. The product mock drops
  its side rails on mobile, grids collapse, and the comparison table becomes
  stacked per-dimension cards so the Venessa column stays visible.

## Deploy

Any static host works:

- **Cloud Run / Firebase Hosting / Netlify / Vercel / S3 + CloudFront** — point
  the root at this directory. No environment variables.
- Fonts load from Google Fonts; everything else is local.

## Copy sources

Positioning, comparison claims and the "risk map, not a prophecy" framing come
from the research documents in the main repo under `research/`.
