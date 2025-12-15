import { useEffect, useRef, useCallback } from 'react'

interface Segment {
  first: boolean
  pos: { x: number; y: number }
  length: number
  angle: number
  nextPos: { x: number; y: number }
}

interface Tentacle {
  x: number
  y: number
  length: number
  segmentCount: number
  segments: Segment[]
  rand: number
  target?: { x: number; y: number }
  distance?: number
}

interface CanvasOverlayProps {
  enabled?: boolean
}

export function CanvasOverlay({ enabled = true }: CanvasOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tentaclesRef = useRef<Tentacle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const coreRef = useRef({ x: 0, y: 0 })
  const prevCoreRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const hasMouseRef = useRef(false)

  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  // Class Segment
  class Segment {
    first: boolean
    pos: { x: number; y: number }
    length: number
    angle: number
    nextPos: { x: number; y: number }

    constructor(
      parent: { x: number; y: number } | { nextPos: { x: number; y: number } },
      segmentLength: number,
      angle: number,
      isFirst: boolean
    ) {
      this.first = isFirst
      this.length = segmentLength
      this.angle = angle

      if (isFirst) {
        this.pos = { x: (parent as { x: number; y: number }).x, y: (parent as { x: number; y: number }).y }
      } else {
        this.pos = {
          x: (parent as { nextPos: { x: number; y: number } }).nextPos.x,
          y: (parent as { nextPos: { x: number; y: number } }).nextPos.y,
        }
      }

      this.nextPos = {
        x: this.pos.x + this.length * Math.cos(this.angle),
        y: this.pos.y + this.length * Math.sin(this.angle),
      }
    }

    update(target: { x: number; y: number }) {
      this.angle = Math.atan2(target.y - this.pos.y, target.x - this.pos.x)
      this.pos.x = target.x + this.length * Math.cos(this.angle - Math.PI)
      this.pos.y = target.y + this.length * Math.sin(this.angle - Math.PI)
      this.nextPos.x = this.pos.x + this.length * Math.cos(this.angle)
      this.nextPos.y = this.pos.y + this.length * Math.sin(this.angle)
    }

    fallback(target: { x: number; y: number }) {
      this.pos.x = target.x
      this.pos.y = target.y
      this.nextPos.x = this.pos.x + this.length * Math.cos(this.angle)
      this.nextPos.y = this.pos.y + this.length * Math.sin(this.angle)
    }
  }

  // Class Tentacle
  class Tentacle {
    x: number
    y: number
    length: number
    segmentCount: number
    segments: Segment[]
    rand: number

    constructor(x: number, y: number, length: number, segmentCount: number, initialAngle: number) {
      this.x = x
      this.y = y
      this.length = length
      this.segmentCount = segmentCount
      this.rand = Math.random()
      this.segments = []

      // Tạo segments
      const segmentLength = this.length / this.segmentCount
      this.segments.push(new Segment({ x: this.x, y: this.y }, segmentLength, initialAngle, true))

      for (let i = 1; i < this.segmentCount; i++) {
        this.segments.push(new Segment(this.segments[i - 1], segmentLength, initialAngle, false))
      }
    }

    move(core: { x: number; y: number }, target: { x: number; y: number }) {
      const angle = Math.atan2(target.y - this.y, target.x - this.x)
      const dist = distance(core.x, core.y, target.x, target.y) + 5
      const t = {
        x: target.x - 0.8 * dist * Math.cos(angle),
        y: target.y - 0.8 * dist * Math.sin(angle),
      }

      // Update từ cuối lên đầu
      if (t.x) {
        this.segments[this.segmentCount - 1].update(t)
      } else {
        this.segments[this.segmentCount - 1].update(target)
      }

      for (let i = this.segmentCount - 2; i >= 0; i--) {
        this.segments[i].update(this.segments[i + 1].pos)
      }

      // Fallback nếu quá gần
      if (distance(this.x, this.y, target.x, target.y) <= this.length + distance(core.x, core.y, target.x, target.y)) {
        this.segments[0].fallback({ x: this.x, y: this.y })
        for (let i = 1; i < this.segmentCount; i++) {
          this.segments[i].fallback(this.segments[i - 1].nextPos)
        }
      }
    }

    show(ctx: CanvasRenderingContext2D, target: { x: number; y: number }) {
      if (distance(this.x, this.y, target.x, target.y) <= this.length) {
        ctx.globalCompositeOperation = 'lighter'
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)

        for (let i = 0; i < this.segmentCount; i++) {
          ctx.lineTo(this.segments[i].nextPos.x, this.segments[i].nextPos.y)
        }

        // Màu mới dựa trên khoảng cách từ core
        const dist = distance(this.x, this.y, target.x, target.y)
        const distRatio = dist / this.length // 0-1
        
        let strokeColor: string
        // 5% tentacles có accent color
        if (this.rand < 0.05) {
          strokeColor = 'hsl(200, 80%, 70%)'
        } else if (distRatio < 0.33) {
          // Near: gần core
          strokeColor = 'hsl(210, 40%, 95%)'
        } else if (distRatio < 0.66) {
          // Mid: giữa
          strokeColor = 'hsl(0, 0%, 88%)'
        } else {
          // Far: xa core
          strokeColor = 'hsl(210, 20%, 70%)'
        }
        
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = 2 * this.rand
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
        ctx.globalCompositeOperation = 'source-over'
      }
    }

    showParticle(ctx: CanvasRenderingContext2D, target: { x: number; y: number }) {
      ctx.beginPath()
      const dist = distance(this.x, this.y, target.x, target.y)
      if (dist <= this.length) {
        // Near: trắng
        ctx.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI)
        ctx.fillStyle = '#ffffff'
      } else {
        // Far: xanh nhạt
        ctx.arc(this.x, this.y, 2 * this.rand, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(180, 200, 220, 0.6)'
      }
      ctx.fill()
    }
  }

  const initTentacles = useCallback((count: number, width: number, height: number) => {
    tentaclesRef.current = []
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const length = 250 * Math.random() + 50
      const segmentCount = 30
      const initialAngle = 2 * Math.random() * Math.PI
      tentaclesRef.current.push(new Tentacle(x, y, length, segmentCount, initialAngle))
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let isVisible = true
    let time = 0

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const tentacleCount = 500
      initTentacles(tentacleCount, width, height)
    }

    resizeCanvas()

    const initTimeout = setTimeout(() => {
      resizeCanvas()
    }, 100)

    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      hasMouseRef.current = true
    }

    const handleMouseLeave = () => {
      hasMouseRef.current = false
      // Reset time để pattern bắt đầu từ đầu
      // Core sẽ tự động quay về giữa với spring effect trong animate loop
      time = 0
    }

    coreRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    prevCoreRef.current = { ...coreRef.current }

    // Thêm event listener cho mouseleave trên document để catch khi mouse ra ngoài window
    const handleDocumentMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e.relatedTarget as Node)?.nodeName) {
        handleMouseLeave()
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseleave', handleDocumentMouseLeave)

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const animate = () => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

      ctx.clearRect(0, 0, width, height)

      const tentacles = tentaclesRef.current
      const mouse = mouseRef.current
      const core = coreRef.current
      const prevCore = prevCoreRef.current

      // Kiểm tra xem mouse có còn trong viewport không
      if (hasMouseRef.current) {
        if (mouse.x < 0 || mouse.x > width || mouse.y < 0 || mouse.y > height) {
          hasMouseRef.current = false
          time = 0
        }
      }

      // Update core position
      if (hasMouseRef.current) {
        const errX = mouse.x - core.x
        const errY = mouse.y - core.y
        core.x += errX / 10
        core.y += errY / 10
        
        // Giữ core trong viewport khi có mouse
        const margin = 50
        core.x = Math.max(margin, Math.min(width - margin, core.x))
        core.y = Math.max(margin, Math.min(height - margin, core.y))
      } else {
        // Animation khi không có mouse - pattern hình số 8 (lemniscate)
        // Giảm tốc độ di chuyển
        time += 0.003
        
        const g = 10
        const centerX = width / 2
        const centerY = height / 2
        const radius = Math.min(width, height) / 2 - g
        
        // Kiểm tra xem core có đang ở ngoài viewport không, nếu có thì quay về giữa trước
        const margin = 50
        const isOutsideViewport = 
          core.x < margin || core.x > width - margin ||
          core.y < margin || core.y > height - margin
        
        let targetX: number
        let targetY: number
        
        if (isOutsideViewport) {
          // Nếu đang ở ngoài, từ từ quay về giữa
          targetX = centerX
          targetY = centerY
        } else {
          // Nếu đã ở trong, bắt đầu pattern
          targetX =
            centerX +
            (radius * Math.sqrt(2) * Math.cos(time)) /
              (Math.pow(Math.sin(time), 2) + 1)
          targetY =
            centerY +
            (radius * Math.sqrt(2) * Math.cos(time) * Math.sin(time)) /
              (Math.pow(Math.sin(time), 2) + 1)
        }
        
        const errX = targetX - core.x
        const errY = targetY - core.y
        
        // Làm chậm spring effect khi tự động di chuyển hoặc quay về giữa
        const springSpeed = isOutsideViewport ? 20 : 15
        core.x += errX / springSpeed
        core.y += errY / springSpeed
        
        // Force core về trong viewport nếu đi ra ngoài
        if (core.x < margin) {
          core.x = margin
        } else if (core.x > width - margin) {
          core.x = width - margin
        }
        if (core.y < margin) {
          core.y = margin
        } else if (core.y > height - margin) {
          core.y = height - margin
        }
      }

      // Vẽ core node
      const coreRadius = distance(prevCore.x, prevCore.y, core.x, core.y) + 5
      ctx.beginPath()
      ctx.arc(core.x, core.y, coreRadius, 0, 2 * Math.PI)
      ctx.fillStyle = 'hsl(210, 60%, 92%)'
      ctx.fill()

      // Update và vẽ particles trước
      for (let i = 0; i < tentacles.length; i++) {
        tentacles[i].move(prevCore, core)
        tentacles[i].showParticle(ctx, core)
      }

      // Vẽ tentacles
      for (let i = 0; i < tentacles.length; i++) {
        tentacles[i].show(ctx, core)
      }

      // Update prevCore
      prevCore.x = core.x
      prevCore.y = core.y

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

      return () => {
      clearTimeout(initTimeout)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseleave', handleDocumentMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [enabled, initTentacles])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
