# SaLira — Studio Portfolio

Portfolio showcase for **SaLira**, a custom software studio. The site
demonstrates that SaLira builds custom software around how each business
actually works.

**SaLira is the studio. Each industry template is a working demonstration.
AURA (restaurant) is our first one.**

## Experience map

```text
SaLira Portfolio          →  /
Our Work                  →  /work
Restaurant showcase       →  /work/restaurants
AURA Customer App         →  /work/restaurants/customer
AURA Restaurant Console   →  /work/restaurants/console
```

The portfolio explains the work. The customer app and console are two
separate product experiences that can be opened independently. During a
demonstration they stay in sync live (BroadcastChannel + localStorage),
so an order placed in one appears instantly in the other.

## Repository structure

```text
src/
├── portfolio/               # SaLira studio identity, navigation & case pages
│   ├── PortfolioLayout.tsx
│   └── pages/
│       ├── Home.tsx             # /
│       ├── Work.tsx             # /work
│       └── RestaurantShowcase.tsx  # /work/restaurants
│
├── templates/               # Business demonstrations (one folder per industry)
│   ├── README.md            # How to add a new template
│   └── restaurant/
│       ├── README.md
│       ├── routes.ts        # Route prefixes for this template's products
│       ├── customer/        # AURA Customer App (PWA experience)
│       ├── console/         # AURA Restaurant Console (operations)
│       ├── store/           # Shared demo state + cross-app sync
│       └── data/            # Menu & restaurant seed data
│
├── shared/                  # Genuinely reusable building blocks only
│   ├── components/ui/
│   ├── lib/
│   └── types/
│
├── App.tsx                  # Route table (portfolio + each template's products)
├── index.css                # AURA theme tokens + scoped .salira tokens
└── main.tsx
```

## Key principles

- **Do not mix navigation contexts.** The portfolio, the customer app and
  the console each own their own header/nav. Never blend them.
- **Templates are isolated.** Restaurant code lives under
  `templates/restaurant/`. A teammate adds `templates/<industry>/` without
  touching anything else. See `templates/README.md`.
- **Shared code stays small.** Only genuinely reusable pieces (buttons,
  formatting helpers, generic types) belong in `shared/`.
- **Demos start clean.** No pre-seeded orders or carts — visitors create
  the story themselves. Reset state from Settings in the console or the
  showcase page.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run lint     # oxlint
```
