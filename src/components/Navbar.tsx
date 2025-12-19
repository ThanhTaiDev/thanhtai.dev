import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLayout } from './Layout'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const { effectsEnabled, setEffectsEnabled } = useLayout()
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll state for glass effect
  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScrollState, { passive: true })
    handleScrollState() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScrollState)
    }
  }, [])

  // Scroll spy để highlight active section
  useEffect(() => {
    const handleScroll = () => {
      // Với scroll snap, section sẽ snap vào top của viewport
      // Tìm section nào đang ở top của viewport (rect.top gần 0 nhất)
      let activeId = navItems[navItems.length - 1].id // Default to last section
      let closestToTop = Infinity
      
      // Duyệt từ cuối lên để ưu tiên section ở cuối nếu có nhiều section cùng visible
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i]
        const element = document.getElementById(item.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Nếu section này có top >= 0 và top <= một threshold nhỏ (đang ở đầu viewport)
          // Hoặc nếu section này là section cuối cùng và đang visible
          if (rect.top >= -50 && rect.top <= 100) {
            // Section này đang ở đầu viewport
            if (Math.abs(rect.top) < closestToTop) {
              closestToTop = Math.abs(rect.top)
              activeId = item.id
            }
          }
        }
      }
      
      setActiveSection(activeId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Kiểm tra ngay khi mount và sau scroll snap
    handleScroll()
    const intervalId = setInterval(handleScroll, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(intervalId)
    }
  }, [])

  const scrollToSection = (id: string) => {
    // Cập nhật active section ngay lập tức
    setActiveSection(id)
    
    // Đóng mobile menu nếu đang mở
    setIsMobileMenuOpen(false)
    
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]' 
          : 'bg-transparent border-transparent shadow-none'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold md:font-bold tracking-wide md:tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 hover:from-violet-300 hover:via-fuchsia-300 hover:to-blue-300 transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.6)]"
            >
              Thanh Tai
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-violet-400'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-400/80 rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            {/* Effects Toggle - Hidden on mobile, shown on desktop */}
            <button
              onClick={() => setEffectsEnabled(!effectsEnabled)}
              className="hidden md:block p-2 text-gray-400 hover:text-primary-400 transition-colors"
              aria-label="Toggle effects"
            >
              {effectsEnabled ? '🌐' : '🌑'}
            </button>
            
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 w-10 h-10 flex items-center justify-center border border-yellow-400/50 rounded transition-colors hover:bg-yellow-400/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black/90 backdrop-blur-md border-l border-white/10 shadow-2xl z-50 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-2xl font-semibold text-violet-400">Thanh Tai</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-yellow-400/50 rounded transition-colors hover:bg-yellow-400/10"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Menu Items */}
              <nav className="flex-1 p-6 space-y-6">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left text-xl font-medium py-3 transition-colors ${
                        isActive
                          ? 'text-violet-400'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </nav>
              
              {/* Footer Description */}
              <div className="p-6 border-t border-white/10">
                <p className="text-sm text-white/60 leading-relaxed">
                  Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
                </p>
              </div>
              
              {/* Effects Toggle - Mobile */}
              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => setEffectsEnabled(!effectsEnabled)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-primary-500/50 transition-colors"
                  aria-label="Toggle effects"
                >
                  <span className="text-white/80 text-sm font-medium">Visual Effects</span>
                  <span className="text-2xl">{effectsEnabled ? '🌐' : '🌑'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </nav>
  )
}
