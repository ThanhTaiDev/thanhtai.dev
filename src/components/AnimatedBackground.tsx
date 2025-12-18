import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Variables that need to be recreated on resize
    let gradient: CanvasGradient
    let stars: Array<{ x: number; y: number; size: number; opacity: number; twinkle: number }> = []
    
    const createGradient = () => {
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#0B061A')
      gradient.addColorStop(0.5, '#120A2F')
      gradient.addColorStop(1, '#0B061A')
    }
    
    const createStars = () => {
      const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
      const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
      const starCount = Math.floor((logicalWidth * logicalHeight) / 15000)
      stars = []
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * logicalWidth,
          y: Math.random() * logicalHeight,
          size: Math.random() * 1.5,
          opacity: Math.random(),
          twinkle: Math.random() * Math.PI * 2,
        })
      }
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      // Recreate gradient and stars after resize
      createGradient()
      createStars()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationFrameId: number
    let time = 0

    const animate = () => {
      // Redraw gradient background every frame to ensure seamless coverage
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Vẽ stars với hiệu ứng nhấp nháy
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 0.5 + star.twinkle) * 0.3 + 0.7
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      time += 0.01
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
        margin: 0,
        padding: 0
      }}
    />
  )
}

