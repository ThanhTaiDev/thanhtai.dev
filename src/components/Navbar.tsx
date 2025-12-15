import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]

export function Navbar() {
  const location = useLocation()
  const [canvasEnabled, setCanvasEnabled] = useState(true)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-primary-400">
              Portfolio
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-primary-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCanvasEnabled(!canvasEnabled)}
              className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="Toggle canvas effect"
            >
              {canvasEnabled ? '🌐' : '🌑'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

