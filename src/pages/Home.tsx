import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const techStack = [
  'React', 'TypeScript', 'Node.js', 'TailwindCSS',
  'Vite', 'Framer Motion', 'HTML5', 'CSS3',
  'JavaScript', 'Git', 'MongoDB', 'Docker'
]

export function Home() {
  const { elementRef, hasIntersected } = useIntersectionObserver()

  return (
    <motion.div
      className="min-h-screen pt-16"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Building modern web experiences with cutting-edge technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/portfolio">
              <Button variant="primary">
                View Projects
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">
                Contact Me
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          ref={elementRef}
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-300 mb-8">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hasIntersected ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm font-medium text-primary-400 hover:border-primary-500 transition-colors"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}
