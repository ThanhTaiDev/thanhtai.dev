import { motion } from 'framer-motion'

export function Home() {
  return (
    <div className="min-h-screen pt-16">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Building modern web experiences with cutting-edge technology
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium"
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-primary-500 text-primary-400 rounded-lg font-medium"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

