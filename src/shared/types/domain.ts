export type OptionType = 'single' | 'multi'

export interface MenuOption {
  id: string
  name: string
  priceDelta: number
}

export interface OptionGroup {
  id: string
  name: string
  type: OptionType
  required: boolean
  options: MenuOption[]
}

export type DietaryTag = 'veg' | 'non-veg'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  tags: DietaryTag[]
  spiceLevel: number
  popular: boolean
  signature: boolean
  available: boolean
  optionGroups: OptionGroup[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Restaurant {
  id: string
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  hours: string
  deliveryFee: number
  taxRate: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
}

export type OrderStatus =
  | 'NEW'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'

export type FulfilmentType = 'delivery' | 'pickup'

export interface SelectedOption {
  groupId: string
  optionId: string
}

export interface OrderItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  selectedOptions: SelectedOption[]
  subtotal: number
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  items: OrderItem[]
  status: OrderStatus
  fulfilment: FulfilmentType
  address: string
  contact: { name: string; phone: string; email: string }
  paymentMethod: string
  paymentStatus: 'paid' | 'pending' | 'cod'
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  notes: string
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  selectedOptions: SelectedOption[]
  image: string
}
