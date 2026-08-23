import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

/* ── SaLira portfolio ── */
import { PortfolioLayout } from './portfolio/PortfolioLayout'
import PortfolioHome from './portfolio/pages/Home'
import WorkPage from './portfolio/pages/Work'
import RestaurantShowcase from './portfolio/pages/RestaurantShowcase'

/* ── Restaurant template · AURA Customer App ── */
import { CustomerLayout } from './templates/restaurant/customer/CustomerLayout'
import CustomerHome from './templates/restaurant/customer/pages/Home'
import CustomerMenu from './templates/restaurant/customer/pages/Menu'
import ItemDetail from './templates/restaurant/customer/pages/ItemDetail'
import Cart from './templates/restaurant/customer/pages/Cart'
import Checkout from './templates/restaurant/customer/pages/Checkout'
import OrderConfirmation from './templates/restaurant/customer/pages/OrderConfirmation'
import Orders from './templates/restaurant/customer/pages/Orders'
import Account from './templates/restaurant/customer/pages/Account'

/* ── Restaurant template · AURA Restaurant Console ── */
import ConsoleLayout from './templates/restaurant/console/ConsoleLayout'
import ConsoleOverview from './templates/restaurant/console/pages/Overview'
import OrdersConsole from './templates/restaurant/console/pages/OrdersConsole'
import OrderDetail from './templates/restaurant/console/pages/OrderDetail'
import ConsoleMenu from './templates/restaurant/console/pages/ConsoleMenu'
import ConsoleCustomers from './templates/restaurant/console/pages/Customers'
import ConsoleAnalytics from './templates/restaurant/console/pages/Analytics'
import ConsoleSettings from './templates/restaurant/console/pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── SaLira Portfolio ── */}
        <Route path="/" element={<PortfolioLayout />}>
          <Route index element={<PortfolioHome />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/restaurants" element={<RestaurantShowcase />} />
        </Route>

        {/* ── Restaurant template · Customer App ── */}
        <Route path="/work/restaurants/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="menu" element={<CustomerMenu />} />
          <Route path="item/:id" element={<ItemDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/:id" element={<OrderConfirmation />} />
          <Route path="orders" element={<Orders />} />
          <Route path="account" element={<Account />} />
        </Route>

        {/* ── Restaurant template · Restaurant Console ── */}
        <Route path="/work/restaurants/console" element={<ConsoleLayout />}>
          <Route index element={<ConsoleOverview />} />
          <Route path="orders" element={<OrdersConsole />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="menu" element={<ConsoleMenu />} />
          <Route path="customers" element={<ConsoleCustomers />} />
          <Route path="analytics" element={<ConsoleAnalytics />} />
          <Route path="settings" element={<ConsoleSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
