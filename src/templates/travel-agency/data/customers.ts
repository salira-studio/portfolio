export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  city: string
  joinedDate: string
  totalBookings: number
  totalSpent: number
  status: 'active' | 'inactive'
}

export const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Arjun Sharma', email: 'arjun@gmail.com', phone: '+91 98765 43210', avatar: 'AS', city: 'Mumbai', joinedDate: '2024-01-15', totalBookings: 4, totalSpent: 185000, status: 'active' },
  { id: 'c2', name: 'Priya Nair', email: 'priya.nair@yahoo.com', phone: '+91 87654 32109', avatar: 'PN', city: 'Bangalore', joinedDate: '2024-02-20', totalBookings: 2, totalSpent: 93000, status: 'active' },
  { id: 'c3', name: 'Ravi Krishnamurthy', email: 'ravi.k@hotmail.com', phone: '+91 76543 21098', avatar: 'RK', city: 'Chennai', joinedDate: '2023-11-08', totalBookings: 6, totalSpent: 420000, status: 'active' },
  { id: 'c4', name: 'Deepa Menon', email: 'deepa.menon@gmail.com', phone: '+91 65432 10987', avatar: 'DM', city: 'Kochi', joinedDate: '2024-03-12', totalBookings: 1, totalSpent: 45000, status: 'active' },
  { id: 'c5', name: 'Suresh Patel', email: 'suresh.patel@gmail.com', phone: '+91 54321 09876', avatar: 'SP', city: 'Ahmedabad', joinedDate: '2023-09-05', totalBookings: 3, totalSpent: 165000, status: 'inactive' },
  { id: 'c6', name: 'Anita Reddy', email: 'anita.reddy@outlook.com', phone: '+91 43210 98765', avatar: 'AR', city: 'Hyderabad', joinedDate: '2024-04-01', totalBookings: 2, totalSpent: 78000, status: 'active' },
  { id: 'c7', name: 'Vikram Singh', email: 'vikram.s@gmail.com', phone: '+91 32109 87654', avatar: 'VS', city: 'Delhi', joinedDate: '2023-12-20', totalBookings: 5, totalSpent: 310000, status: 'active' },
  { id: 'c8', name: 'Kavitha Iyer', email: 'kavitha.iyer@gmail.com', phone: '+91 21098 76543', avatar: 'KI', city: 'Pune', joinedDate: '2024-01-28', totalBookings: 1, totalSpent: 32000, status: 'active' },
]
