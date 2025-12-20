import { ReactNode, useContext, createContext, useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { CanvasOverlay } from './CanvasOverlay'
import { AnimatedBackground } from './AnimatedBackground'
import { useIsMobile } from '../hooks/useIsMobile'

/**
 * Interface cho Layout Context - quản lý state hiệu ứng toàn cục
 * Cho phép các component kiểm tra/bật/tắt hiệu ứng visual (canvas, animations)
 */
interface LayoutContextType {
  effectsEnabled: boolean
  setEffectsEnabled: (enabled: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | null>(null)

/**
 * Hook để truy cập Layout context (state effectsEnabled)
 * Phải được sử dụng bên trong component Layout
 */
export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout must be used within Layout')
  return context
}

// Key trong localStorage để lưu preference của user về hiệu ứng
const STORAGE_KEY = 'portfolio-effects-enabled'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile()
  
  // Kiểm tra user có bật prefers-reduced-motion không (accessibility)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Khởi tạo state effectsEnabled từ localStorage hoặc mặc định dựa trên device/preferences
  const [effectsEnabled, setEffectsEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    
    // Ưu tiên 1: Kiểm tra user đã lưu preference chưa
    // LƯU Ý: Trên mobile, luôn mặc định false kể cả khi user đã bật true trước đó (để tối ưu performance)
    const saved = localStorage.getItem(STORAGE_KEY)
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const isMobileByUA = mobileRegex.test(userAgent)
    
    // Nếu đang ở mobile, luôn tắt effects (bỏ qua preference đã lưu để đảm bảo performance)
    if (isMobileDevice || isMobileByUA) {
      return false
    }
    
    // Trên desktop: dùng preference đã lưu nếu có
    if (saved !== null) {
      return saved === 'true'
    }
    
    // Ưu tiên 2: Tự động tắt nếu user có prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !prefersReduced
  })

  // Lắng nghe thay đổi preference prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    // Kiểm tra state ban đầu
    setPrefersReducedMotion(mediaQuery.matches)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Tự động tắt effects trên mobile - luôn enforce trên mobile bất kể preference đã lưu
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Luôn tắt trên mobile (iPhone/điện thoại) để tối ưu performance
    if (isMobile) {
      setEffectsEnabledState(false)
    } else if (prefersReducedMotion) {
      // Trên desktop: tự động tắt nếu có prefers-reduced-motion và user chưa set preference
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === null) {
        setEffectsEnabledState(false)
      }
    }
  }, [isMobile, prefersReducedMotion])

  // Lưu vào localStorage khi user thay đổi preference
  const setEffectsEnabled = (enabled: boolean) => {
    setEffectsEnabledState(enabled)
    localStorage.setItem(STORAGE_KEY, enabled.toString())
  }

  return (
    <LayoutContext.Provider value={{ effectsEnabled, setEffectsEnabled }}>
      <div className="min-h-screen relative overflow-x-hidden w-full bg-transparent">
        <AnimatedBackground enabled={effectsEnabled} />
        <CanvasOverlay enabled={effectsEnabled} />
        <Navbar />
        <main className="relative z-10 snap-none md:snap-y md:snap-proximity overflow-y-auto overflow-x-hidden h-screen scroll-smooth w-full bg-transparent">
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  )
}

