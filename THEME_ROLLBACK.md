# Theme Rollback Reference — Annachies Color System

This file preserves the exact snapshot of the previous color palette, tokens, and hardcoded values across the codebase prior to the Annachies brand identity update. If a rollback is ever needed, restore the values documented below.

---

## 1. `src/index.css` — `@theme` (Tailwind v4 tokens)

```css
@theme {
  --color-ivory-50: #FBF6EE;
  --color-ivory-100: #F5ECE0;
  --color-ivory-200: #EDE0CC;
  --color-ivory-300: #E0CDB0;

  --color-espresso-900: #231A12;
  --color-espresso-800: #34261A;
  --color-espresso-700: #4A3626;
  --color-espresso-600: #5C4532;
  --color-espresso-500: #7A5F46;

  --color-cocoa-500: #8B7355;
  --color-cocoa-400: #A08968;
  --color-cocoa-300: #BBA282;

  --color-clay-600: #A44A24;
  --color-clay-500: #B4532A;
  --color-clay-400: #C46838;
  --color-clay-300: #D4895A;

  --color-leaf-700: #2B4528;
  --color-leaf-600: #355731;
  --color-leaf-500: #3E6A38;
  --color-leaf-400: #4A7D42;

  --color-brass-500: #A9834F;
  --color-brass-400: #B9935F;
  --color-brass-300: #C9A36F;

  --color-line: #E7DCC8;
  --color-line-light: #F0E8D8;
}
```

---

## 2. `src/index.css` — Scoped Restaurant Tokens (`[data-theme="restaurant"]`)

```css
[data-theme="restaurant"] {
  --rest-primary: #F4C430;
  --rest-primary-dark: #D6A800;
  --rest-primary-light: #FFD966;
  --rest-surface: #FFFFFF;
  --rest-card: #FFFFFF;
  --rest-text: #4A4030;
  --rest-muted: #756B59;
  --rest-border: rgba(180, 145, 50, 0.16);
  --rest-accent: #FFE9A3;
  --rest-gold: #F4C430;
  --rest-cream: #FFF9E8;
  --rest-cream-light: #FFFDF2;
  --rest-gold-shadow: rgba(244, 196, 48, 0.12);
  --rest-card-shadow: 0 10px 30px rgba(120, 90, 20, 0.08);
}
```

---

## 3. `src/index.css` — Utility Classes

```css
.rest-particles::before {
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(244, 196, 48, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 30% 60%, rgba(244, 196, 48, 0.06) 0%, transparent 40%),
    radial-gradient(circle at 70% 30%, rgba(244, 196, 48, 0.07) 0%, transparent 45%),
    radial-gradient(circle at 90% 70%, rgba(244, 196, 48, 0.05) 0%, transparent 35%);
}

.rest-grid-cell {
  border: 1px solid rgba(180, 145, 50, 0.12);
  box-shadow: var(--rest-card-shadow);
}
.rest-grid-cell:hover {
  box-shadow: 0 14px 40px rgba(120, 90, 20, 0.12);
  border-color: rgba(180, 145, 50, 0.2);
}

.rest-category-card {
  border: 1px solid rgba(180, 145, 50, 0.12);
  box-shadow: var(--rest-card-shadow);
}
.rest-category-card:hover {
  box-shadow: 0 14px 40px rgba(120, 90, 20, 0.12);
  border-color: rgba(180, 145, 50, 0.2);
}

.rest-hero-bg {
  background: 
    radial-gradient(circle at 20% 20%, rgba(244, 196, 48, 0.12) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(244, 196, 48, 0.08) 0%, transparent 40%),
    linear-gradient(135deg, #FFFDF2 0%, #FFF3C4 45%, #FFD966 100%);
}

.rest-footer-gradient {
  background: linear-gradient(135deg, #FFFDF2 0%, #FFF3C4 45%, #FFD966 100%);
}
```

---

## 4. Hardcoded Components

### `src/shared/components/ui/VegDot.tsx`
```tsx
const color = type === 'veg' ? '#3E6A38' : '#C4342D'
```

### `src/shared/components/ui/Badge.tsx`
```tsx
const variantStyles: Record<BadgeVariant, string> = {
  veg: 'bg-[var(--color-leaf-600)] text-white',
  'non-veg': 'bg-red-600 text-white',
  popular: 'bg-[var(--color-brass-500)] text-white',
  signature: 'bg-[var(--color-espresso-900)] text-white',
  'sold-out': 'bg-gray-200 text-gray-500',
}
```

### `src/shared/components/ui/Button.tsx`
```tsx
variant === 'primary' && 'bg-[var(--color-clay-500)] text-white hover:bg-[var(--color-clay-600)] shadow-sm'
```

### `src/templates/restaurant/console/ConsoleLayout.tsx`
```tsx
<svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
  <circle cx="12" cy="13.4" r="8.6" fill="none" stroke="#A9834F" strokeWidth="1.6" />
  <circle cx="12" cy="13.4" r="5.4" fill="#F5ECE0" />
  <path
    d="M12 7.2c2.6 2.2 4 4.3 4 6.6 0 2.8-1.7 4.7-4 4.7s-4-1.9-4-4.7c0-2.3 1.4-4.4 4-6.6z"
    fill="#B4532A"
  />
</svg>
```

### `src/portfolio/components/BlueprintSkeletons.tsx`
```tsx
export function RestaurantCustomerSkeleton() {
  // Uses: #FBF6EE, #E7DCC8, #B4532A, #231A12, #7A5F46
}
```
