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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-3xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
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
                  className={`relative px-3 py-1.5 text-lg font-medium transition-colors ${
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
