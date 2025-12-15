import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { CanvasOverlay } from './CanvasOverlay'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative">
      <CanvasOverlay />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}

