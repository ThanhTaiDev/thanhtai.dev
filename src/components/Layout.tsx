import { ReactNode, useContext, createContext, useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { CanvasOverlay } from './CanvasOverlay'
import { AnimatedBackground } from './AnimatedBackground'
import { useIsMobile } from '../hooks/useIsMobile'

interface LayoutContextType {
  effectsEnabled: boolean
  setEffectsEnabled: (enabled: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | null>(null)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout must be used within Layout')
  return context
}

const STORAGE_KEY = 'portfolio-effects-enabled'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile()
  
  // Check for prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Initialize state with localStorage or default based on device/preferences
  const [effectsEnabled, setEffectsEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    
    // Priority 1: Check if user has saved preference
    // BUT: On mobile, always default to false even if user set it to true before
    const saved = localStorage.getItem(STORAGE_KEY)
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
    const isMobileByUA = mobileRegex.test(userAgent)
    
    // If on mobile, always default to false (ignore saved preference on mobile for performance)
    if (isMobileDevice || isMobileByUA) {
      return false
    }
    
    // On desktop: use saved preference if available
    if (saved !== null) {
      return saved === 'true'
    }
    
    // Priority 2: Auto-disable on reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !prefersReduced
  })

  // Listen for reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    // Check initial state
    setPrefersReducedMotion(mediaQuery.matches)
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Auto-disable on mobile - always enforce on mobile regardless of saved preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Always disable on mobile (iPhone/điện thoại) for performance
    if (isMobile) {
      setEffectsEnabledState(false)
    } else if (prefersReducedMotion) {
      // On desktop: auto-disable if reduced motion preference and user hasn't set preference
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === null) {
        setEffectsEnabledState(false)
      }
    }
  }, [isMobile, prefersReducedMotion])

  // Persist to localStorage when changed (user preference)
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

