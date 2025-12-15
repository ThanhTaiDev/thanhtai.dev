import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { Project } from '../types'

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Nền tảng thương mại điện tử hiện đại với React, TypeScript và Node.js. Tích hợp thanh toán, quản lý đơn hàng và dashboard admin.',
    image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=E-Commerce',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TailwindCSS'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com/example',
    },
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Ứng dụng quản lý công việc với drag & drop, real-time updates và collaboration features.',
    image: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Task+App',
    stack: ['React', 'Redux', 'Firebase', 'Framer Motion'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com/example',
    },
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Website portfolio hiện đại với animations và interactive effects. Responsive design và optimized performance.',
    image: 'https://via.placeholder.com/600x400/06b6d4/ffffff?text=Portfolio',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com/example',
    },
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Dashboard hiển thị thời tiết với API integration, charts và location-based forecasts.',
    image: 'https://via.placeholder.com/600x400/10b981/ffffff?text=Weather',
    stack: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com/example',
    },
  },
]

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { elementRef, hasIntersected } = useIntersectionObserver()

  return (
    <motion.div
      className="min-h-screen pt-16"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle>Portfolio</SectionTitle>

        <div ref={elementRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="cursor-pointer h-full flex flex-col" onClick={() => setSelectedProject(project)}>
                <div className="aspect-video bg-dark-700 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 flex-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-dark-700 text-xs text-primary-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <div className="p-6">
              <div className="aspect-video bg-dark-700 rounded-lg mb-6 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-primary-400 mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-700 text-sm text-primary-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary">Live Demo</Button>
                  </a>
                )}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">GitHub</Button>
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </section>
    </motion.div>
  )
}
