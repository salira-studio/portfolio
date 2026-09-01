import { useLocation } from 'react-router-dom'

/**
 * Technical Blueprint Skeleton Loader System
 * Matches "The Working Draft" aesthetic: blueprint graph paper, drawing lines,
 * registration corner ticks, and route-specific structural wireframe previews.
 */

export function BlueprintRouteSkeleton() {
  const location = useLocation()
  const path = location.pathname

  if (path.startsWith('/work/restaurants/console')) {
    return <RestaurantConsoleSkeleton />
  }
  if (path.startsWith('/work/restaurants/customer')) {
    return <RestaurantCustomerSkeleton />
  }
  if (path.startsWith('/work/travel/admin')) {
    return <TravelAdminSkeleton />
  }
  if (path.startsWith('/work/travel')) {
    return <TravelCustomerSkeleton />
  }
  return <PortfolioSkeleton />
}

/** ── Portfolio Blueprint Skeleton ── */
export function PortfolioSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--salira-paper)] salira-draft-grid p-4 sm:p-8 animate-pulse">
      {/* Top Drafting Header */}
      <div className="mx-auto max-w-7xl border-b border-[var(--salira-border-draft)] pb-4 flex items-center justify-between font-mono text-xs text-[var(--salira-blueprint)]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--salira-redpen)] animate-ping" />
          <span className="font-bold">DRAWING SPECIFICATION // DRAFT SHEET 01</span>
        </div>
        <div className="hidden sm:block text-[var(--salira-graphite-muted)]">
          COORD: 13.0827° N, 80.2707° E · SCALE: 1:1
        </div>
      </div>

      {/* Hero Skeleton Sheet */}
      <div className="mx-auto mt-8 max-w-7xl rounded-xl border border-[var(--salira-border-draft-strong)] bg-[var(--salira-paper-lifted)] p-6 sm:p-10 relative">
        <div className="salira-sheet-corner salira-corner-tl" />
        <div className="salira-sheet-corner salira-corner-tr" />
        <div className="salira-sheet-corner salira-corner-bl" />
        <div className="salira-sheet-corner salira-corner-br" />

        <div className="h-4 w-48 rounded bg-[var(--salira-blueprint)]/15 mb-6" />
        <div className="space-y-3 max-w-3xl">
          <div className="h-10 sm:h-14 w-full rounded bg-[var(--salira-graphite)]/10" />
          <div className="h-10 sm:h-14 w-3/4 rounded bg-[var(--salira-graphite)]/10" />
        </div>
        <div className="mt-6 h-5 w-1/2 rounded bg-[var(--salira-graphite)]/10" />

        {/* Blueprint Action Console Skeleton */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="h-32 rounded-lg border border-[var(--salira-border-draft)] bg-white/60 p-4" />
          <div className="h-32 rounded-lg border border-[var(--salira-border-draft)] bg-white/60 p-4" />
          <div className="h-32 rounded-lg border border-[var(--salira-border-draft)] bg-white/60 p-4" />
        </div>
      </div>
    </div>
  )
}

/** ── Restaurant Customer Skeleton ── */
export function RestaurantCustomerSkeleton() {
  return (
    <div className="min-h-screen bg-[#FBF6EE] p-4 sm:p-6 animate-pulse" data-theme="restaurant">
      <div className="mx-auto max-w-6xl">
        {/* Nav skeleton */}
        <div className="flex items-center justify-between border-b border-[#E7DCC8] pb-4 mb-6">
          <div className="h-7 w-32 rounded bg-[#B4532A]/20" />
          <div className="h-8 w-24 rounded-full bg-[#B4532A]/15" />
        </div>

        {/* Categories Bar */}
        <div className="flex gap-3 overflow-hidden mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-24 shrink-0 rounded-full bg-[#E7DCC8]" />
          ))}
        </div>

        {/* Food Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border border-[#E7DCC8] bg-white p-4 space-y-3">
              <div className="h-44 w-full rounded-xl bg-[#E7DCC8]/60" />
              <div className="h-5 w-3/4 rounded bg-[#231A12]/15" />
              <div className="h-4 w-1/2 rounded bg-[#7A5F46]/20" />
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 w-16 rounded bg-[#B4532A]/20" />
                <div className="h-8 w-20 rounded-lg bg-[#B4532A]/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** ── Restaurant Operations Console Skeleton ── */
export function RestaurantConsoleSkeleton() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-6 flex gap-6 animate-pulse" data-theme="restaurant">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-4">
        <div className="h-8 w-3/4 rounded bg-slate-800" />
        <div className="space-y-2 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-full rounded-lg bg-slate-800/80" />
          ))}
        </div>
      </div>

      {/* Main Console */}
      <div className="flex-1 space-y-6">
        {/* KPI Metrics */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="h-4 w-1/2 rounded bg-slate-800" />
              <div className="h-7 w-3/4 rounded bg-slate-700" />
            </div>
          ))}
        </div>

        {/* Live Order Pipeline Kanban / Table */}
        <div className="h-96 rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div className="h-6 w-48 rounded bg-slate-800" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-lg bg-slate-800/60" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** ── Travel Customer App Skeleton ── */
export function TravelCustomerSkeleton() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 p-4 sm:p-8 animate-pulse" data-theme="travel">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="h-7 w-36 rounded bg-blue-500/20" />
          <div className="flex gap-3">
            <div className="h-8 w-20 rounded-full bg-slate-800" />
            <div className="h-8 w-24 rounded-full bg-blue-600/30" />
          </div>
        </div>

        {/* Hero Section Banner */}
        <div className="h-64 sm:h-80 w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-8 flex flex-col justify-end space-y-4">
          <div className="h-8 sm:h-12 w-2/3 rounded bg-slate-800" />
          <div className="h-5 w-1/3 rounded bg-slate-800/60" />
        </div>

        {/* Destinations Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 rounded-2xl border border-slate-800 bg-[#131B2E] p-4 space-y-3">
              <div className="h-40 w-full rounded-xl bg-slate-800" />
              <div className="h-5 w-3/4 rounded bg-slate-700" />
              <div className="h-4 w-1/2 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** ── Travel Admin App Skeleton ── */
export function TravelAdminSkeleton() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 p-6 flex gap-6 animate-pulse" data-theme="travel">
      <div className="hidden lg:block w-64 rounded-2xl border border-slate-800 bg-[#131B2E] p-5 space-y-4">
        <div className="h-8 w-32 rounded bg-blue-500/20" />
        <div className="space-y-2 pt-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-9 w-full rounded-lg bg-slate-800/70" />
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl border border-slate-800 bg-[#131B2E] p-4 space-y-3">
              <div className="h-4 w-1/3 rounded bg-slate-700" />
              <div className="h-8 w-2/3 rounded bg-blue-500/20" />
            </div>
          ))}
        </div>

        <div className="h-80 rounded-2xl border border-slate-800 bg-[#131B2E] p-6 space-y-4">
          <div className="h-6 w-40 rounded bg-slate-700" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 rounded-lg bg-slate-800/50" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
