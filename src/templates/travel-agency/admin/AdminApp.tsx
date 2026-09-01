import { useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AdminSidebar } from './components/AdminSidebar'
import { AdminHeader } from './components/AdminHeader'

const ADMIN_BASE = '/work/travel/admin'

function getAdminUser() {
  try {
    return JSON.parse(localStorage.getItem('travel_admin') || 'null')
  } catch {
    return null
  }
}

export default function AdminApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isLoginPage = location.pathname === `${ADMIN_BASE}/login`
  const adminUser = getAdminUser()

  if (!adminUser && !isLoginPage) {
    return <Navigate to={`${ADMIN_BASE}/login`} replace />
  }

  if (isLoginPage) {
    return <Outlet />
  }

  const handleLogout = () => {
    localStorage.removeItem('travel_admin')
    window.location.href = `${ADMIN_BASE}/login`
  }

  return (
    <div data-theme="travel" className="flex h-screen bg-[#FDFAF5] text-[#1C1917] overflow-hidden">
      <Helmet>
        <title>Wanderlux — Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          adminName={adminUser?.name || 'Admin'}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
