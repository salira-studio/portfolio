import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

/* ── SaLira portfolio ── */
import { PortfolioLayout } from './portfolio/PortfolioLayout'
import PortfolioHome from './portfolio/pages/Home'
import WorkPage from './portfolio/pages/Work'
import RestaurantShowcase from './portfolio/pages/RestaurantShowcase'
import TravelShowcase from './portfolio/pages/TravelShowcase'

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

/* ── Travel Agency template · Customer App ── */
import TravelCustomerApp from './templates/travel-agency/customer/CustomerApp'
import TravelHome from './templates/travel-agency/customer/pages/Home'
import TravelDestinations from './templates/travel-agency/customer/pages/Destinations'
import TravelDestinationDetail from './templates/travel-agency/customer/pages/DestinationDetail'
import TravelPackages from './templates/travel-agency/customer/pages/Packages'
import TravelPackageDetail from './templates/travel-agency/customer/pages/PackageDetail'
import TravelAbout from './templates/travel-agency/customer/pages/About'
import TravelContact from './templates/travel-agency/customer/pages/Contact'
import TravelLogin from './templates/travel-agency/customer/pages/Login'
import TravelRegister from './templates/travel-agency/customer/pages/Register'
import TravelDashboard from './templates/travel-agency/customer/pages/Dashboard'
import TravelMyBookings from './templates/travel-agency/customer/pages/MyBookings'
import TravelWishlist from './templates/travel-agency/customer/pages/Wishlist'
import TravelNotFound from './templates/travel-agency/customer/pages/NotFound'

/* ── Travel Agency template · Admin App ── */
import TravelAdminApp from './templates/travel-agency/admin/AdminApp'
import AdminLogin from './templates/travel-agency/admin/pages/AdminLogin'
import AdminDashboard from './templates/travel-agency/admin/pages/AdminDashboard'
import AdminPackages from './templates/travel-agency/admin/pages/AdminPackages'
import AdminDestinations from './templates/travel-agency/admin/pages/AdminDestinations'
import AdminBookings from './templates/travel-agency/admin/pages/AdminBookings'
import AdminEnquiries from './templates/travel-agency/admin/pages/AdminEnquiries'
import AdminCustomers from './templates/travel-agency/admin/pages/AdminCustomers'
import AdminAnalytics from './templates/travel-agency/admin/pages/AdminAnalytics'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── SaLira Portfolio ── */}
        <Route path="/" element={<PortfolioLayout />}>
          <Route index element={<PortfolioHome />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/restaurants" element={<RestaurantShowcase />} />
          <Route path="work/travel" element={<TravelShowcase />} />
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

        {/* ── Travel Agency · Customer App ── */}
        <Route path="/work/travel/customer" element={<TravelCustomerApp />}>
          <Route index element={<TravelHome />} />
          <Route path="destinations" element={<TravelDestinations />} />
          <Route path="destinations/:id" element={<TravelDestinationDetail />} />
          <Route path="packages" element={<TravelPackages />} />
          <Route path="packages/:id" element={<TravelPackageDetail />} />
          <Route path="about" element={<TravelAbout />} />
          <Route path="contact" element={<TravelContact />} />
          <Route path="login" element={<TravelLogin />} />
          <Route path="register" element={<TravelRegister />} />
          <Route path="dashboard" element={<TravelDashboard />} />
          <Route path="dashboard/bookings" element={<TravelMyBookings />} />
          <Route path="dashboard/wishlist" element={<TravelWishlist />} />
          <Route path="*" element={<TravelNotFound />} />
        </Route>

        {/* ── Travel Agency · Admin App ── */}
        <Route path="/work/travel/admin" element={<TravelAdminApp />}>
          <Route index element={<Navigate to="/work/travel/admin/dashboard" replace />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
