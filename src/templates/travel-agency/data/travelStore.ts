/**
 * travelStore — shared localStorage-backed store
 * Admin changes (packages, destinations, offers) write here.
 * Customer pages read from here, falling back to static mock data.
 */

import { packages as staticPackages } from './packages'
import { destinations as staticDestinations } from './destinations'
import { offers as staticOffers } from './offers'
import { mockBookings as staticBookings } from './bookings'
import { mockEnquiries as staticEnquiries } from './enquiries'
import type { TourPackage } from './packages'
import type { Destination } from './destinations'
import type { Offer } from './offers'
import type { Booking } from './bookings'
import type { Enquiry } from './enquiries'

const KEYS = {
  packages: 'voyage_packages',
  destinations: 'voyage_destinations',
  offers: 'voyage_offers',
  bookings: 'voyage_bookings',
  enquiries: 'voyage_enquiries',
} as const

function read<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    // Dispatch a custom event so same-tab listeners can react
    window.dispatchEvent(new CustomEvent('voyageStoreUpdate', { detail: { key } }))
  } catch {
    // localStorage may be full — silently fail
  }
}

// ── Packages ─────────────────────────────────────────────
export function getPackages(): TourPackage[] {
  return read<TourPackage>(KEYS.packages, staticPackages)
}
export function savePackages(data: TourPackage[]): void {
  write(KEYS.packages, data)
}
export function resetPackages(): void {
  localStorage.removeItem(KEYS.packages)
}

// ── Destinations ─────────────────────────────────────────
export function getDestinations(): Destination[] {
  return read<Destination>(KEYS.destinations, staticDestinations)
}
export function saveDestinations(data: Destination[]): void {
  write(KEYS.destinations, data)
}

// ── Offers ───────────────────────────────────────────────
export function getOffers(): Offer[] {
  return read<Offer>(KEYS.offers, staticOffers)
}
export function saveOffers(data: Offer[]): void {
  write(KEYS.offers, data)
}

// ── Bookings ─────────────────────────────────────────────
export function getBookings(): Booking[] {
  return read<Booking>(KEYS.bookings, staticBookings)
}
export function saveBookings(data: Booking[]): void {
  write(KEYS.bookings, data)
}

// ── Enquiries ────────────────────────────────────────────
export function getEnquiries(): Enquiry[] {
  return read<Enquiry>(KEYS.enquiries, staticEnquiries)
}
export function saveEnquiries(data: Enquiry[]): void {
  write(KEYS.enquiries, data)
}

// ── Hook: re-render when store updates ───────────────────
import { useState, useEffect } from 'react'

export function useStoreVersion(): number {
  const [v, setV] = useState(0)
  useEffect(() => {
    const handler = () => setV(n => n + 1)
    window.addEventListener('voyageStoreUpdate', handler)
    return () => window.removeEventListener('voyageStoreUpdate', handler)
  }, [])
  return v
}
