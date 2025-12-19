import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import React from 'react'
import { Code2, Briefcase, Rocket, GraduationCap, LucideIcon } from 'lucide-react'

interface TimelineItem {
  year: string
  title: string
  description: string
  icon?: string
  dateRange?: string
}

interface TimelineProProps {
  items: TimelineItem[]
}

// Icon mapping based on title keywords
const iconMap: Record<string, LucideIcon> = {
  'foundation': GraduationCap,
  'fundamental': Code2,
  'junior': Briefcase,
  'modern': Rocket,
}

const getIcon = (title: string, index: number): LucideIcon => {
  const titleLower = title.toLowerCase()
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (titleLower.includes(key)) {
      return Icon
    }
  }
  // Default icons by index
  const defaults: LucideIcon[] = [GraduationCap, Code2, Briefcase, Rocket]
  return defaults[index % defaults.length]
}

export function TimelinePro({ items }: TimelineProProps) {
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
      <div className="space-y-16 md:space-y-20 relative" style={{ zIndex: 1 }}>
        {items.map((item, index) => {
          const isEven = index % 2 === 0
          const Icon = getIcon(item.title, index)

          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative min-w-0"
            >
              {/* Node with Icon - Always on the line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                {/* Outer pulse ring */}
                <motion.div
                  className="absolute rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4), transparent)',
                    width: '48px',
                    height: '48px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                />
                {/* Node circle with icon */}
                <div 
                  className="relative w-12 h-12 rounded-full bg-dark-800 border-2 border-primary-400 flex items-center justify-center"
                  style={{ 
                    boxShadow: '0 0 16px rgba(167, 139, 250, 0.5), 0 0 32px rgba(124, 58, 237, 0.3), inset 0 0 8px rgba(167, 139, 250, 0.2)'
                  }}
                >
                  <Icon className="w-5 h-5 text-primary-400" strokeWidth={2} />
                  {/* Inner ring */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-primary-500/50 ring-offset-0" />
                </div>
              </div>

              {/* Connector Line - From node to card (desktop only) */}
              {isEven ? (
                <div
                  className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:block h-0.5 left-[calc(50%+1.5rem)]"
                  style={{
                    width: 'calc(50% - 3.5rem)',
                    background: 'linear-gradient(to right, rgba(167, 139, 250, 0.6), rgba(167, 139, 250, 0.2))',
                    boxShadow: '0 0 4px rgba(167, 139, 250, 0.3)',
                  }}
                />
              ) : (
                <div
                  className="absolute top-1/2 -translate-y-1/2 z-10 hidden md:block h-0.5 right-[calc(50%+1.5rem)]"
                  style={{
                    width: 'calc(50% - 3.5rem)',
                    background: 'linear-gradient(to left, rgba(167, 139, 250, 0.6), rgba(167, 139, 250, 0.2))',
                    boxShadow: '0 0 4px rgba(167, 139, 250, 0.3)',
                  }}
                />
              )}

              {/* Content Card - Mobile: full width with left padding, Desktop: alternating sides */}
              <div className="relative min-w-0 pl-20 md:pl-0">
                <motion.div
                  className={`w-full min-w-0 ${
                    isEven
                      ? 'md:pr-[calc(50%+2rem)] md:mr-auto'
                      : 'md:pl-[calc(50%+2rem)] md:ml-auto'
                  }`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card with glass effect and triangle pointer */}
                  <div className="relative bg-dark-800/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-dark-700/50 w-full min-w-0 hover:shadow-[0_20px_40px_rgba(124,58,237,0.2)] hover:border-primary-500/30 transition-all duration-200">
                    {/* Triangle pointer pointing to node */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 hidden md:block ${
                        isEven 
                          ? 'right-0 translate-x-full border-l-[10px] border-l-dark-800/80 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent' 
                          : 'left-0 -translate-x-full border-r-[10px] border-r-dark-800/80 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent'
                      }`}
                      style={{
                        filter: 'drop-shadow(0 0 2px rgba(167, 139, 250, 0.3))'
                      }}
                    />

                    <div className="space-y-4 min-w-0">
                      {/* Year - Large and prominent */}
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-primary-400 break-words">
                          {item.year}
                        </h3>
                        {item.dateRange && (
                          <span className="ml-2 text-sm text-gray-400">({item.dateRange})</span>
                        )}
                      </div>

                      {/* Title - Bold */}
                      <h4 className="text-xl md:text-2xl font-semibold text-gray-200 break-words">
                        {item.title}
                      </h4>

                      {/* Description - Smaller */}
                      <p className="text-gray-300 leading-relaxed break-words text-sm md:text-base">
                        {item.description}
                      </p>
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

