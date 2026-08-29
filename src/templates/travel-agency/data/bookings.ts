export interface Booking {
  id: string
  bookingRef: string
  customerId: string
  customerName: string
  packageId: string
  packageTitle: string
  destination: string
  startDate: string
  endDate: string
  travelers: number
  totalAmount: number
  paidAmount: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  paymentStatus: 'paid' | 'partial' | 'unpaid'
  bookedOn: string
  notes?: string
}

export const mockBookings: Booking[] = [
  {
    id: 'b1', bookingRef: 'VYG-2025-0001', customerId: 'c1', customerName: 'Arjun Sharma',
    packageId: 'pkg-bali-honeymoon', packageTitle: 'Bali Honeymoon in Paradise',
    destination: 'Bali', startDate: '2025-02-14', endDate: '2025-02-21',
    travelers: 2, totalAmount: 156000, paidAmount: 156000,
    status: 'confirmed', paymentStatus: 'paid', bookedOn: '2025-01-10',
    notes: 'Honeymoon couple, need rose petal decoration at villa'
  },
  {
    id: 'b2', bookingRef: 'VYG-2025-0002', customerId: 'c2', customerName: 'Priya Nair',
    packageId: 'pkg-kerala-backwaters', packageTitle: 'Kerala Backwaters & Beaches Escape',
    destination: 'Kerala', startDate: '2025-03-01', endDate: '2025-03-07',
    travelers: 4, totalAmount: 114000, paidAmount: 57000,
    status: 'confirmed', paymentStatus: 'partial', bookedOn: '2025-01-25',
  },
  {
    id: 'b3', bookingRef: 'VYG-2025-0003', customerId: 'c3', customerName: 'Ravi Krishnamurthy',
    packageId: 'pkg-rajasthan-royal', packageTitle: 'Royal Rajasthan Grand Tour',
    destination: 'Rajasthan', startDate: '2025-01-15', endDate: '2025-01-25',
    travelers: 2, totalAmount: 90000, paidAmount: 90000,
    status: 'completed', paymentStatus: 'paid', bookedOn: '2024-12-10',
  },
  {
    id: 'b4', bookingRef: 'VYG-2025-0004', customerId: 'c4', customerName: 'Deepa Menon',
    packageId: 'pkg-goa-beach', packageTitle: 'Goa Sun, Sand & Heritage',
    destination: 'Goa', startDate: '2025-04-10', endDate: '2025-04-14',
    travelers: 3, totalAmount: 54000, paidAmount: 0,
    status: 'pending', paymentStatus: 'unpaid', bookedOn: '2025-02-01',
  },
  {
    id: 'b5', bookingRef: 'VYG-2025-0005', customerId: 'c5', customerName: 'Suresh Patel',
    packageId: 'pkg-dubai-luxury', packageTitle: 'Dubai Luxury Experience',
    destination: 'Dubai', startDate: '2025-02-20', endDate: '2025-02-25',
    travelers: 2, totalAmount: 170000, paidAmount: 85000,
    status: 'cancelled', paymentStatus: 'partial', bookedOn: '2025-01-05',
    notes: 'Cancelled due to personal reasons. Refund being processed.'
  },
  {
    id: 'b6', bookingRef: 'VYG-2025-0006', customerId: 'c6', customerName: 'Anita Reddy',
    packageId: 'pkg-switzerland-alps', packageTitle: 'Switzerland Alps Dream Tour',
    destination: 'Switzerland', startDate: '2025-06-15', endDate: '2025-06-22',
    travelers: 2, totalAmount: 276000, paidAmount: 276000,
    status: 'confirmed', paymentStatus: 'paid', bookedOn: '2025-02-10',
  },
  {
    id: 'b7', bookingRef: 'VYG-2025-0007', customerId: 'c7', customerName: 'Vikram Singh',
    packageId: 'pkg-japan-cultural', packageTitle: 'Japan Cherry Blossom & Culture',
    destination: 'Japan', startDate: '2025-04-01', endDate: '2025-04-10',
    travelers: 2, totalAmount: 296000, paidAmount: 148000,
    status: 'confirmed', paymentStatus: 'partial', bookedOn: '2025-01-20',
  },
  {
    id: 'b8', bookingRef: 'VYG-2025-0008', customerId: 'c8', customerName: 'Kavitha Iyer',
    packageId: 'pkg-andaman-island', packageTitle: 'Andaman Island Odyssey',
    destination: 'Andaman Islands', startDate: '2025-05-05', endDate: '2025-05-10',
    travelers: 2, totalAmount: 84000, paidAmount: 84000,
    status: 'confirmed', paymentStatus: 'paid', bookedOn: '2025-02-15',
  },
]
