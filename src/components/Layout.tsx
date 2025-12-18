import { ReactNode, useContext, createContext, useState } from 'react'
import { Navbar } from './Navbar'
import { CanvasOverlay } from './CanvasOverlay'
import { AnimatedBackground } from './AnimatedBackground'

interface LayoutContextType {
  canvasEnabled: boolean
  setCanvasEnabled: (enabled: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | null>(null)

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout must be used within Layout')
  return context
}

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [canvasEnabled, setCanvasEnabled] = useState(true)

  return (
    <LayoutContext.Provider value={{ canvasEnabled, setCanvasEnabled }}>
      <div className="min-h-screen relative overflow-x-hidden">
        <AnimatedBackground />
        <CanvasOverlay enabled={canvasEnabled} />
        <Navbar />
        <main className="relative z-10 snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth">
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  )
}

