import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, MotionProps } from 'framer-motion'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900'
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-dark-700 text-gray-100 hover:bg-dark-600',
    outline: 'border border-primary-500 text-primary-400 hover:bg-primary-500/10'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}

