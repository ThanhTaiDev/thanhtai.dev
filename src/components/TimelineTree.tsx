import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import React from 'react'

interface TimelineItem {
  year: string
  title: string
  description: string
  icon?: string
  dateRange?: string
}

interface TimelineTreeProps {
  items: TimelineItem[]
}

export function TimelineTree({ items }: TimelineTreeProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className="relative w-full max-w-6xl mx-auto py-8 min-w-0">
      {/* Center Vertical Line - Desktop Only with gradient + glow */}
      <div 
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2" 
        style={{ 
          zIndex: 0,
          background: 'linear-gradient(to bottom, #7c3aed, #a78bfa, #7c3aed)',
          boxShadow: '0 0 8px rgba(167, 139, 250, 0.4), 0 0 16px rgba(124, 58, 237, 0.2)'
        }} 
      />

      {/* Left Vertical Line - Mobile Only with gradient + glow */}
      <div 
        className="md:hidden absolute left-6 top-0 bottom-0 w-0.5" 
        style={{ 
          zIndex: 0,
          background: 'linear-gradient(to bottom, #7c3aed, #a78bfa, #7c3aed)',
          boxShadow: '0 0 8px rgba(167, 139, 250, 0.4), 0 0 16px rgba(124, 58, 237, 0.2)'
        }} 
      />

      {/* Timeline Items */}
      <div className="space-y-12 md:space-y-16 relative" style={{ zIndex: 1 }}>
        {items.map((item, index) => {
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative min-w-0"
            >
              {/* Node Circle with ring + core + pulse animation */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                {/* Outer ring with pulse animation */}
                <motion.div
                  className="absolute rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.5), transparent)',
                    width: '20px',
                    height: '20px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                />
                {/* Inner core */}
                <div className="relative w-4 h-4 rounded-full bg-primary-500 ring-2 ring-primary-400 ring-offset-2 ring-offset-dark-900" 
                     style={{ boxShadow: '0 0 12px rgba(167, 139, 250, 0.6), 0 0 24px rgba(124, 58, 237, 0.3)' }} 
                />
              </div>

              {/* Content Card - Mobile: full width with left padding, Desktop: alternating sides */}
              <div className="relative min-w-0 pl-14 md:pl-0">
                <motion.div
                  className={`w-full min-w-0 ${
                    isEven
                      ? 'md:pr-[calc(50%+1.5rem)] md:mr-auto'
                      : 'md:pl-[calc(50%+1.5rem)] md:ml-auto'
                  }`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-dark-800 rounded-lg p-6 shadow-2xl border border-dark-700 w-full hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] transition-shadow duration-200">
                    <div className="space-y-3 min-w-0">
                      {/* Year Badge */}
                      <div className="inline-flex items-center gap-2">
                        <span className="px-3 py-1 text-sm font-bold text-primary-400 bg-primary-500/10 border border-primary-500/30 rounded-full">
                          {item.year}
                        </span>
                        {item.dateRange && (
                          <span className="text-xs text-gray-400">({item.dateRange})</span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-semibold text-gray-200 break-words">{item.title}</h4>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed break-words">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

