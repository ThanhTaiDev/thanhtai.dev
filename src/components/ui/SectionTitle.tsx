import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionTitleProps {
  children: ReactNode
  className?: string
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-3xl md:text-4xl font-bold text-primary-400 mb-8 ${className}`}
    >
      {children}
    </motion.h2>
  )
}

