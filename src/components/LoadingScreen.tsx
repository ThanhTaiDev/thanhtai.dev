import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadAssets = async () => {
      const images: string[] = []
      const totalAssets = Math.max(images.length, 1)
      let loadedAssets = 0

      // Cập nhật progress: 90% từ assets, 10% từ thời gian
      const updateProgress = () => {
        const assetProgress = (loadedAssets / totalAssets) * 90
        const timeProgress = Math.min(Date.now() - startTime, 1800) / 1800 * 10
        const total = Math.min(assetProgress + timeProgress, 100)
        setProgress(total)
      }

      const startTime = Date.now()
      const progressInterval = setInterval(updateProgress, 16)

      // Preload images nếu có
      if (images.length > 0) {
        await Promise.all(
          images.map((src) =>
            new Promise<void>((resolve) => {
              const img = new Image()
              img.onload = () => {
                loadedAssets++
                resolve()
              }
              img.onerror = () => {
                loadedAssets++
                resolve()
              }
              img.src = src
            })
          )
        )
      } else {
        // Đảm bảo animation mượt trong 1.8s
        await new Promise((resolve) => setTimeout(resolve, 1800))
        loadedAssets = totalAssets
      }

      // Đảm bảo tối thiểu 1.8s loading
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 1800 - elapsed)
      await new Promise((resolve) => setTimeout(resolve, remaining))

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 500)
      }, 300)
    }

    loadAssets()
  }, [onComplete])

  // Icons data
  const icons = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      label: 'Code'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'Profile'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      label: 'GitHub'
    }
  ]

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center min-h-screen w-full"
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
            overflow: 'hidden'
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle noise/grain overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
              pointerEvents: 'none'
            }}
          />

          {/* Soft radial glow behind title */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div className="relative z-10 text-center px-4 w-full max-w-2xl">
            {/* Icons - Top Area */}
            <motion.div 
              className="flex justify-center items-center gap-6 mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {icons.map((item, index) => (
                <motion.div
                  key={index}
                  className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300"
                  style={{
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), inset 0 0 10px rgba(139, 92, 246, 0.1)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.1,
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.5), inset 0 0 15px rgba(139, 92, 246, 0.2)'
                  }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </motion.div>

            {/* Title - Split into 2 lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              {/* Line 1 - Lighter */}
              <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#EDE9FE] tracking-[0.05em] mb-2"
                style={{
                  textShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}
              >
                Welcome To My
              </motion.div>
              
              {/* Line 2 - Gradient highlight */}
              <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.05em]"
                style={{
                  background: 'linear-gradient(to right, #a78bfa, #8b5cf6, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 4px 16px rgba(139, 92, 246, 0.4)'
                }}
              >
                Portfolio Website
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="w-full max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {/* Progress bar container */}
              <div className="h-1 bg-dark-700/50 rounded-full overflow-hidden mb-3 backdrop-blur-sm">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #a78bfa, #8b5cf6, #7c3aed)',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ 
                    duration: 0.2,
                    ease: 'easeInOut'
                  }}
                />
              </div>

              {/* Percentage text */}
              <motion.p
                className="text-lg font-medium text-gray-300 tracking-wide"
                key={Math.floor(progress)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {Math.floor(progress)}%
              </motion.p>
            </motion.div>

            {/* Footer - Domain */}
            <motion.div
              className="flex items-center justify-center gap-2 text-sm text-gray-400/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="tracking-wide">www.thanhtai.dev</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
