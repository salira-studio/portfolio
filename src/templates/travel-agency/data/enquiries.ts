export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  destination: string
  packageId?: string
  travelDate: string
  travelers: number
  budget: string
  message: string
  status: 'new' | 'contacted' | 'converted' | 'closed'
  submittedOn: string
}

export const mockEnquiries: Enquiry[] = [
  {
    id: 'enq1', name: 'Rahul Joshi', email: 'rahul.j@gmail.com', phone: '+91 99887 76655',
    destination: 'Maldives', packageId: 'pkg-maldives-overwater',
    travelDate: '2025-05-15', travelers: 2, budget: '₹2,50,000 - ₹3,00,000',
    message: 'Planning our anniversary trip. Would love overwater villa with best coral reef access.',
    status: 'new', submittedOn: '2025-02-14',
  },
  {
    id: 'enq2', name: 'Sneha Kulkarni', email: 'sneha.k@yahoo.com', phone: '+91 88776 65544',
    destination: 'Japan', packageId: 'pkg-japan-cultural',
    travelDate: '2025-03-28', travelers: 4, budget: '₹5,00,000 - ₹6,00,000',
    message: 'Family trip during cherry blossom season. Need kid-friendly itinerary.',
    status: 'contacted', submittedOn: '2025-01-30',
  },
  {
    id: 'enq3', name: 'Mohan Das', email: 'mohan.das@gmail.com', phone: '+91 77665 54433',
    destination: 'Kerala',
    travelDate: '2025-04-10', travelers: 6, budget: '₹1,50,000 - ₹2,00,000',
    message: 'Group trip with family. Need houseboat for 2 nights with good backwater views.',
    status: 'converted', submittedOn: '2025-01-20',
  },
  {
    id: 'enq4', name: 'Parveen Kaur', email: 'parveen.k@hotmail.com', phone: '+91 66554 43322',
    destination: 'Switzerland',
    travelDate: '2025-07-01', travelers: 2, budget: '₹2,50,000+',
    message: 'Honeymoon trip. Want snow-covered Alps experience with luxury stays.',
    status: 'new', submittedOn: '2025-02-12',
  },
  {
    id: 'enq5', name: 'Amit Tiwari', email: 'amit.t@gmail.com', phone: '+91 55443 32211',
    destination: 'Thailand', packageId: 'pkg-thailand-explorer',
    travelDate: '2025-03-15', travelers: 3, budget: '₹1,20,000 - ₹1,60,000',
    message: 'Want to explore Bangkok and islands. Looking for best beaches and Thai food.',
    status: 'closed', submittedOn: '2025-01-05',
  },
]
