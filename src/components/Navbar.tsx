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
  const { canvasEnabled, setCanvasEnabled } = useLayout()
  const [activeSection, setActiveSection] = useState('home')

  // Scroll spy để highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const threshold = viewportHeight * 0.5 // 50% của viewport
      
      // Tìm section nào đang ở gần top của viewport nhất (với scroll snap, section sẽ snap vào top)
      let activeId = navItems[0].id
      
      // Duyệt từ trên xuống để tìm section đầu tiên có top < threshold
      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Nếu section này đang ở trong viewport (top < threshold và bottom > 0)
          if (rect.top <= threshold && rect.bottom > 0) {
            activeId = item.id
            break
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
    
    const element = document.getElementById(id)
    if (element) {
      // Với scroll snap, chỉ cần scroll đến vị trí của element
      // Scroll snap sẽ tự động snap vào đúng vị trí
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
            >
              Portfolio
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-primary-400'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
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
