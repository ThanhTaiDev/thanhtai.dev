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

// Mapping icon dựa trên từ khóa trong title
const iconMap: Record<string, LucideIcon> = {
  'foundation': GraduationCap,
  'fundamental': Code2,
  'junior': Briefcase,
  'modern': Rocket,
}

/**
 * Lấy icon phù hợp dựa trên title hoặc index
 * @param title - Tiêu đề của timeline item
 * @param index - Index của item trong mảng
 * @returns LucideIcon component
 */
const getIcon = (title: string, index: number): LucideIcon => {
  const titleLower = title.toLowerCase()
  // Tìm icon dựa trên keyword trong title
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (titleLower.includes(key)) {
      return Icon
    }
  }
  // Nếu không tìm thấy, dùng icon mặc định theo index
  const defaults: LucideIcon[] = [GraduationCap, Code2, Briefcase, Rocket]
  return defaults[index % defaults.length]
}

export function TimelinePro({ items }: TimelineProProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className="relative w-full max-w-6xl mx-auto py-8 min-w-0 px-4 sm:px-6 lg:px-8">
      {/* Đường thẳng dọc ở giữa - Chỉ hiện trên desktop, có gradient tím và glow */}
      <div 
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2" 
        style={{ 
          zIndex: 0,
          background: 'linear-gradient(to bottom, #7c3aed, #a78bfa, #7c3aed)',
          boxShadow: '0 0 8px rgba(167, 139, 250, 0.4), 0 0 16px rgba(124, 58, 237, 0.2)'
        }} 
      />

      {/* Đường thẳng dọc bên trái - Chỉ hiện trên mobile, có gradient tím và glow */}
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
          const isEven = index % 2 === 0 // Xác định card ở trái (even) hay phải (odd)
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
              {/* Node với Icon - Luôn nằm trên đường timeline */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                {/* Vòng pulse bên ngoài - Animation mở rộng */}
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
                {/* Vòng tròn node với icon bên trong */}
                <div 
                  className="relative w-12 h-12 rounded-full bg-dark-800 border-2 border-primary-400 flex items-center justify-center"
                  style={{ 
                    boxShadow: '0 0 16px rgba(167, 139, 250, 0.5), 0 0 32px rgba(124, 58, 237, 0.3), inset 0 0 8px rgba(167, 139, 250, 0.2)'
                  }}
                >
                  <Icon className="w-5 h-5 text-primary-400" strokeWidth={2} />
                  {/* Vòng ring bên trong */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-primary-500/50 ring-offset-0" />
                </div>
              </div>

              {/* Đường nối từ node đến card - Chỉ hiện trên desktop */}
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

              {/* Card nội dung - Mobile: full width với padding trái, Desktop: so le trái/phải */}
              <div className="relative min-w-0 pl-20 md:pl-0">
                <motion.div
                  className={`w-full min-w-0 ${
                    isEven
                      ? 'md:pr-[calc(50%+2rem)] md:mr-auto' // Card bên trái (even)
                      : 'md:pl-[calc(50%+2rem)] md:ml-auto' // Card bên phải (odd)
                  }`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card với hiệu ứng glass và mũi tam giác chỉ về node */}
                  <div className="relative bg-dark-800/80 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-dark-700/50 w-full min-w-0 hover:shadow-[0_20px_40px_rgba(124,58,237,0.2)] hover:border-primary-500/30 transition-all duration-200">
                    {/* Mũi tam giác chỉ về phía node */}
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
                      {/* Năm - Lớn và nổi bật */}
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-primary-400 break-words">
                          {item.year}
                        </h3>
                        {item.dateRange && (
                          <span className="ml-2 text-sm text-gray-400">({item.dateRange})</span>
                        )}
                      </div>

                      {/* Tiêu đề - Đậm */}
                      <h4 className="text-xl md:text-2xl font-semibold text-gray-200 break-words">
                        {item.title}
                      </h4>

                      {/* Mô tả - Nhỏ hơn */}
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

