import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Preload assets and update progress
    const loadAssets = async () => {
      const images = [] // Will be populated with actual image paths
      const totalAssets = images.length || 1
      let loadedAssets = 0

      const updateProgress = () => {
        const assetProgress = (loadedAssets / totalAssets) * 90 // 90% for assets
        const timeProgress = Math.min(Date.now() - startTime, 1800) / 1800 * 10 // 10% for time
        const total = Math.min(assetProgress + timeProgress, 100)
        setProgress(total)
      }

      const startTime = Date.now()
      const progressInterval = setInterval(updateProgress, 16) // ~60fps

      // Simulate asset loading
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
      }

      // Ensure minimum loading time and smooth animation
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 1800 - elapsed)
      await new Promise((resolve) => setTimeout(resolve, remaining))

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        setIsComplete(true)
      }, 300)
    }

    loadAssets()
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-dark-900 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center px-4">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-primary-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to my portfolio website
            </motion.h1>

            <div className="w-full max-w-md mx-auto">
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <motion.p
                className="text-xl text-gray-300"
                key={Math.floor(progress)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Math.floor(progress)}%
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

