import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Toast } from './components/Toast'
import { useToast } from './components/Toast'

export interface AuthUser {
  name: string
  email: string
}

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('travel_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function CustomerApp() {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)
  const { toasts, removeToast } = useToast()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('travel_user')
    setUser(null)
  }

  return (
    <div data-theme="travel" className="min-h-screen bg-[#FDFAF5] text-[#1C1917] flex flex-col">
      <Helmet>
        <title>Wanderlux — Curated Travel Experiences</title>
        <meta name="description" content="Discover handcrafted travel packages, exclusive destinations, and personalized journey planning with Wanderlux." />
        <meta property="og:title" content="Wanderlux — Curated Travel Experiences" />
        <meta property="og:description" content="Discover handcrafted travel packages, exclusive destinations, and personalized journey planning." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wanderlux — Curated Travel Experiences" />
        <meta name="twitter:description" content="Discover handcrafted travel packages, exclusive destinations, and personalized journey planning." />
      </Helmet>
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet context={{ user, setUser } satisfies { user: AuthUser | null; setUser: (u: AuthUser | null) => void }} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

// Export context type and hook for pages to use
export type { AuthUser as TravelUser }
