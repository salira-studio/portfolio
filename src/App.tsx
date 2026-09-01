import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

/* ── Layouts (eager — needed immediately for routing) ── */
import { PortfolioLayout } from './portfolio/PortfolioLayout'
import { CustomerLayout } from './templates/restaurant/customer/CustomerLayout'
import ConsoleLayout from './templates/restaurant/console/ConsoleLayout'
import TravelCustomerApp from './templates/travel-agency/customer/CustomerApp'
import TravelAdminApp from './templates/travel-agency/admin/AdminApp'

/* ── Portfolio pages (lazy) ── */
const PortfolioHome = lazy(() => import('./portfolio/pages/Home'))
const WorkPage = lazy(() => import('./portfolio/pages/Work'))
const RestaurantShowcase = lazy(() => import('./portfolio/pages/RestaurantShowcase'))
const TravelShowcase = lazy(() => import('./portfolio/pages/TravelShowcase'))

/* ── Restaurant Customer pages (lazy) ── */
const CustomerHome = lazy(() => import('./templates/restaurant/customer/pages/Home'))
const CustomerMenu = lazy(() => import('./templates/restaurant/customer/pages/Menu'))
const ItemDetail = lazy(() => import('./templates/restaurant/customer/pages/ItemDetail'))
const Cart = lazy(() => import('./templates/restaurant/customer/pages/Cart'))
const Checkout = lazy(() => import('./templates/restaurant/customer/pages/Checkout'))
const OrderConfirmation = lazy(() => import('./templates/restaurant/customer/pages/OrderConfirmation'))
const Orders = lazy(() => import('./templates/restaurant/customer/pages/Orders'))
const Account = lazy(() => import('./templates/restaurant/customer/pages/Account'))

/* ── Restaurant Console pages (lazy) ── */
const ConsoleOverview = lazy(() => import('./templates/restaurant/console/pages/Overview'))
const OrdersConsole = lazy(() => import('./templates/restaurant/console/pages/OrdersConsole'))
const OrderDetail = lazy(() => import('./templates/restaurant/console/pages/OrderDetail'))
const ConsoleMenu = lazy(() => import('./templates/restaurant/console/pages/ConsoleMenu'))
const ConsoleCustomers = lazy(() => import('./templates/restaurant/console/pages/Customers'))
const ConsoleAnalytics = lazy(() => import('./templates/restaurant/console/pages/Analytics'))
const ConsoleSettings = lazy(() => import('./templates/restaurant/console/pages/Settings'))

/* ── Travel Customer pages (lazy) ── */
const TravelHome = lazy(() => import('./templates/travel-agency/customer/pages/Home'))
const TravelDestinations = lazy(() => import('./templates/travel-agency/customer/pages/Destinations'))
const TravelDestinationDetail = lazy(() => import('./templates/travel-agency/customer/pages/DestinationDetail'))
const TravelPackages = lazy(() => import('./templates/travel-agency/customer/pages/Packages'))
const TravelPackageDetail = lazy(() => import('./templates/travel-agency/customer/pages/PackageDetail'))
const TravelAbout = lazy(() => import('./templates/travel-agency/customer/pages/About'))
const TravelContact = lazy(() => import('./templates/travel-agency/customer/pages/Contact'))
const TravelLogin = lazy(() => import('./templates/travel-agency/customer/pages/Login'))
const TravelRegister = lazy(() => import('./templates/travel-agency/customer/pages/Register'))
const TravelDashboard = lazy(() => import('./templates/travel-agency/customer/pages/Dashboard'))
const TravelMyBookings = lazy(() => import('./templates/travel-agency/customer/pages/MyBookings'))
const TravelWishlist = lazy(() => import('./templates/travel-agency/customer/pages/Wishlist'))
const TravelNotFound = lazy(() => import('./templates/travel-agency/customer/pages/NotFound'))

/* ── Travel Admin pages (lazy) ── */
const AdminLogin = lazy(() => import('./templates/travel-agency/admin/pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./templates/travel-agency/admin/pages/AdminDashboard'))
const AdminPackages = lazy(() => import('./templates/travel-agency/admin/pages/AdminPackages'))
const AdminDestinations = lazy(() => import('./templates/travel-agency/admin/pages/AdminDestinations'))
const AdminBookings = lazy(() => import('./templates/travel-agency/admin/pages/AdminBookings'))
const AdminEnquiries = lazy(() => import('./templates/travel-agency/admin/pages/AdminEnquiries'))
const AdminCustomers = lazy(() => import('./templates/travel-agency/admin/pages/AdminCustomers'))
const AdminAnalytics = lazy(() => import('./templates/travel-agency/admin/pages/AdminAnalytics'))

import { BlueprintRouteSkeleton } from './portfolio/components/BlueprintSkeletons'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<BlueprintRouteSkeleton />}>
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
      </Suspense>
    </BrowserRouter>
  )
}
