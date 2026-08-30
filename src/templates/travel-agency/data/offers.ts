export interface Offer {
  id: string
  code: string
  title: string
  description: string
  discountType: 'percent' | 'flat'
  discountValue: number
  minBooking: number
  validTill: string
  applicable: 'all' | string[]
  active: boolean
}

export const offers: Offer[] = [
  {
    id: 'off1', code: 'EARLYBIRD25', title: 'Early Bird 25% Off',
    description: 'Book any package 90+ days in advance and get 25% off. Limited seats.',
    discountType: 'percent', discountValue: 25, minBooking: 50000,
    validTill: '2025-12-31', applicable: 'all', active: true,
  },
  {
    id: 'off2', code: 'HONEYMOON10K', title: '₹10,000 Off Honeymoon Packages',
    description: 'Flat ₹10,000 discount on all honeymoon packages. Make it unforgettable.',
    discountType: 'flat', discountValue: 10000, minBooking: 80000,
    validTill: '2025-12-31', applicable: ['honeymoon'], active: true,
  },
  {
    id: 'off3', code: 'SUMMER2025', title: 'Summer Escape 15% Off',
    description: 'Travel between May–July 2025 and save 15% on all international packages.',
    discountType: 'percent', discountValue: 15, minBooking: 60000,
    validTill: '2025-07-31', applicable: 'all', active: true,
  },
  {
    id: 'off4', code: 'INDIA5K', title: '₹5,000 Off India Packages',
    description: 'Explore incredible India with a flat ₹5,000 discount on domestic packages.',
    discountType: 'flat', discountValue: 5000, minBooking: 25000,
    validTill: '2025-09-30', applicable: ['kerala', 'goa', 'rajasthan', 'himachal', 'andaman'], active: true,
  },
]
