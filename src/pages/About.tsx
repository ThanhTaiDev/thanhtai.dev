import { motion } from 'framer-motion'

export function About() {
  return (
    <div className="min-h-screen pt-16">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-primary-400"
        >
          About Me
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-lg max-w-3xl"
        >
          This is the About page. Content will be added here.
        </motion.p>
      </section>
    </div>
  )
}

