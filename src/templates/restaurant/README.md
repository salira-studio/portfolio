# Restaurant Template — AURA

AURA is a demonstration built around a modern South Indian restaurant in
Chennai. It shows that SaLira can deliver **both sides** of a real
operation as one connected system.

## Products

| Experience | Route base | Audience |
| --- | --- | --- |
| AURA Customer App | `/work/restaurants/customer` | Diners — browse, order, track |
| AURA Restaurant Console | `/work/restaurants/console` | Restaurant team — orders, menu, customers, analytics |

Both experiences are independent applications with their own navigation.
They are linked only through lightweight demo sync (BroadcastChannel +
localStorage) so an order placed in the customer app appears in the
console instantly, and status changes flow back.

## Structure

```text
restaurant/
├── routes.ts          # CUSTOMER_BASE / CONSOLE_BASE constants
├── customer/
│   ├── CustomerLayout.tsx   # mobile bottom-nav / desktop top-nav shell
│   └── pages/               # Home, Menu, ItemDetail, Cart, Checkout,
│                            # OrderConfirmation, Orders, Account
├── console/
│   ├── ConsoleLayout.tsx    # persistent sidebar shell
│   └── pages/               # Overview, Orders, OrderDetail, Menu,
│                            # Customers, Analytics, Settings
├── store/
│   └── useAppStore.ts       # zustand store + cross-window demo sync
└── data/
    ├── menu.ts              # full South Indian menu (₹ pricing)
    └── seed.ts              # restaurant profile + historical orders
```

## Demo rules

- The customer app starts **clean**: empty cart, no orders, guest profile.
  Visitors create the story themselves: browse → customize → cart →
  checkout → track, while processing the order in the console.
- Demo state can be reset from the console's Settings page or from the
  portfolio showcase page.
- No backend. Everything runs in the browser; state persists via
  localStorage and syncs across tabs via BroadcastChannel.
