# AURA — Implementation Plan

> **AURA is a branded digital ordering ecosystem for a modern Indian restaurant, combining a customer-facing PWA with a connected restaurant operations console.**

This plan replaces the previous "restaurant operating system" concept entirely. The old
direction (spatial floor, guest intelligence, service scrubber, HUD telemetry) is discarded.
What remains from the old repo is infrastructure only: React 19 + TypeScript + Vite + Tailwind 4 +
Motion + Zustand + Lucide + vite-plugin-pwa, and the food photography already downloaded to
`public/img/food/`.

---

## 1. Product Concept

A capability showcase for a custom software studio. We build believable software that a real
premium South Indian restaurant could commission:

- **Customer PWA** — discover the restaurant, browse the menu by category, view dish details,
  customize items, build a cart, choose delivery/pickup, place an order (simulated payment),
  track the order live.
- **Restaurant Console** — receive incoming orders, accept them, move them through preparation
  stages, mark ready/completed, manage menu availability, see basic customer info and analytics.

Both surfaces share one simulated application state. The connected workflow — customer places an
order → console receives it → staff actions update the customer's tracking screen in real time —
is the heart of the demonstration.

## 2. Fictional Restaurant Profile

- **Name:** AURA
- **Tagline:** Modern South Indian Kitchen
- **Location:** Chennai (Kilpauk neighbourhood)
- **Voice:** warm, editorial, contemporary; food-first, never sci-fi.
- **Menu:** realistic dishes with realistic ₹ pricing — ghee roast dosa, podi idli, Kongu chicken
  biryani, South Indian meals, paneer ghee roast, Chicken 65, filter coffee, tender coconut
  payasam.
- **Hours:** 11:00 AM – 10:30 PM.

## 3. Customer User Journey

```
Home → Menu → Category → Item Detail → Customize → Add to Order
      → Cart → Delivery/Pickup → Checkout → Confirmation
      → Live Order Tracking
```

Bottom navigation: Home · Menu · Orders · Account. Cart is prominent in the header.

## 4. Restaurant User Journey

```
Dashboard → Incoming Orders (Kanban: New / Preparing / Ready) → Order Detail drawer
→ Accept → Start Preparing → Mark Ready → Complete
```

Side navigation: Overview · Orders · Menu · Customers · Analytics · Settings.
Desktop/tablet-first, dark warm theme (espresso surfaces) distinct from the light customer app,
same brand family.

## 5. Shared State Architecture

- Single Zustand store (`src/store/useAppStore.ts`) persisted to `localStorage` (`aura-store`).
- Cross-tab sync: `storage` event triggers `rehydrate()` so a second window (console) reflects
  the first (customer) instantly — this is what makes the two-window demo seamless.
- Entities: `Category`, `MenuItem` (+ option groups / add-ons), `Customer`, `Order`,
  `OrderItem`, `OrderStatus`, `Payment`.
- Status flow: `NEW → ACCEPTED → PREPARING → READY → OUT_FOR_DELIVERY|READY_FOR_PICKUP → COMPLETED`
  (delivery orders pass through out-for-delivery; pickup skip it).
- Every status transition appends a timeline entry (`status`, timestamp).
- Deterministic seed data: ~30 menu items across 8 categories; seeded customers (Arjun Kumar is
  the demo user); seeded today-orders ending at #A4820 so the next live order is **#A4821**;
  4 pre-seeded active orders populate the Kanban at start.
- Store actions are the only mutation path; screens stay declarative. A future REST layer can
  replace actions without touching UI code.

## 6. Screen Inventory

**Customer (9):** Home `/` · Menu `/menu` · Item detail `/menu/:itemId` · Cart `/cart` ·
Checkout `/checkout` · Confirmation `/order/:orderId/placed` · My Orders `/orders` ·
Track order `/orders/:orderId` · Account `/account`.

**Console (6):** Dashboard `/console` · Orders board `/console/orders` · Menu manager
`/console/menu` · Customers `/console/customers` · Analytics `/console/analytics` ·
Settings `/console/settings`. Order details open as a side drawer over any console screen.

## 7. Design System

- **Type:** Fraunces (editorial display serif) + Inter (UI sans). Self-hosted woff2 when
  network allows; Google Fonts link as fallback.
- **Palette:** warm ivory paper `#FAF5EC`, coconut cream `#F2EADA`, sand borders `#E9DFC9`,
  espresso ink `#241A12`, taupe secondary text, terracotta action `#B4502E`, earthy red
  `#A02C2C`, banana-leaf green `#4F6B4A`, brass accent `#9A7328`. Console uses espresso-dark
  surfaces with cream text and terracotta accents.
- **Material:** editorial whitespace, strong photography, hairline rules, soft warm shadows,
  subtle grain texture on heroes. No glassmorphism, no neon, no HUD.
- **Components (shared kit):** Button, IconButton, Chip, Badge/StatusPill, VegMark (FSSAI-style),
  QtyStepper, TextField/Select/Toggle/SegmentedControl, Sheet (mobile bottom sheet), Drawer
  (console side panel), Modal, SectionHeader, Rail, EmptyState, Timeline.
- FSSAI veg/non-veg marks and ₹ en-IN currency formatting for authenticity.

## 8. Responsive Strategy

- Customer: mobile-first (390×844 target; supports 375–430px, tablet, desktop). Bottom nav on
  mobile becomes inline header nav ≥768px. Content max-width ~480px centred on desktop.
- Console: 1280px+ primary; 1024px tablet collapses sidebar to icon rail; order board columns
  scroll horizontally on narrow widths. Never simply shrink the customer layout into it.

## 9. Motion Strategy

Motion communicates state only: route/page fades, category rail transitions, item-detail sheet
presentation, add-to-cart button morph + cart badge bump, confirmation check draw, tracking
timeline progression, new-order arrival highlight in the Kanban, card layout animation between
columns. `prefers-reduced-motion` disables all of it. If removing an animation doesn't reduce
clarity, remove it.

## 10. PWA Strategy

vite-plugin-pwa (`autoUpdate`): manifest named "AURA — Modern South Indian Kitchen", theme
colour `#FBF5EC`, standalone display, maskable-safe SVG icons + generated PNG touch icon,
offline shell precached, self-hosted fonts so typography survives offline. Payment/delivery are
simulated; no advanced offline ordering.

## 11. Demo Walkthrough (target ≈ 3 minutes)

1. Open customer PWA — AURA home, signature dishes, story band.
2. Open Ghee Roast Dosa → pick accompaniment, add extra ghee → Add to Order (cart badge bumps).
3. Cart review → checkout (Delivery, Arjun Kumar prefilled, UPI) → Place Order.
4. Confirmation: **#A4821**, ETA 25–35 min → Track Order.
5. Switch tab to Console — order appears in NEW column with arrival highlight.
6. ACCEPT → customer screen flips to "Restaurant accepted". START PREPARING → "Preparing your
   food". MARK READY → "Your order is ready" (+ rider assigned for delivery → out for delivery).
7. Complete the order; show dashboard metrics updating; toggle Kongu Biryani sold-out in Menu
   Manager → customer menu shows SOLD OUT instantly.

## 12. Explicitly Out of Scope

Spatial floor/isometric maps, acoustic or lighting telemetry, sommelier/wine cellar, VIP
dossiers, palate radar, guest intelligence, staff cadence radar, haptics simulation, time
scrubber, role lens, AI gastronomy anything, inventory/ERP/payroll/accounting/suppliers,
advanced POS, loyalty programmes, real payments, real delivery infrastructure, real backend
(architecture stays swappable), multi-language, admin auth (single demo session).

---

## Build Phases

1. **Foundation** — tokens, fonts, types, seed data, store + persistence + cross-tab sync,
   router, shared UI kit, both app shells. *Run it.*
2. **Customer experience** — Home, Menu, Item, Cart, Checkout, Confirmation, Tracking, Account.
3. **Console** — Dashboard, Orders board, Order drawer, Menu manager, Customers, Analytics,
   Settings.
4. **Connected workflow** — full lifecycle QA across two windows.
5. **Polish** — spacing, imagery treatment, motion, empty/loading/error states, responsive.
6. **PWA** — manifest, icons, installability, production build.
7. **Final QA** — run the §11 script end-to-end.
