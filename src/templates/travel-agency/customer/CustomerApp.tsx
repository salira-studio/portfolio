import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Toast } from './components/Toast'
import { useToast } from './components/Toast'

export interface AuthUser {
  name: string
  email: string
}

// Guest user — no sign-in required
const GUEST_USER: AuthUser = { name: 'Guest', email: 'guest@voyageai.travel' }

export default function CustomerApp() {
  const user = GUEST_USER
  const { toasts, removeToast } = useToast()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#FDFAF5] text-[#1C1917] flex flex-col">
      <Navbar user={user} onLogout={() => {}} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet context={{ user, setUser: () => {} } satisfies { user: AuthUser | null; setUser: (u: AuthUser | null) => void }} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

export type { AuthUser as TravelUser }
