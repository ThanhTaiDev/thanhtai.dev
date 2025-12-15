import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useState, FormEvent } from 'react'
import { Project } from '../types'

const techStack = [
  'React', 'TypeScript', 'Node.js', 'TailwindCSS',
  'Vite', 'Framer Motion', 'HTML5', 'CSS3',
  'JavaScript', 'Git', 'MongoDB', 'Docker'
]

const timeline = [
  {
    year: '2024',
    title: 'Senior Frontend Developer',
    description: 'Phát triển các ứng dụng web hiện đại với React, TypeScript và các công nghệ mới nhất.',
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    description: 'Xây dựng UI/UX cho các dự án web, tối ưu hiệu suất và trải nghiệm người dùng.',
  },
  {
    year: '2020',
    title: 'Junior Developer',
    description: 'Bắt đầu sự nghiệp với HTML, CSS, JavaScript và học các framework hiện đại.',
  },
]

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'database'
}

const skills: Skill[] = [
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 88, category: 'frontend' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Redux', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 93, category: 'frontend' },
  { name: 'Framer Motion', level: 80, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'MongoDB', level: 80, category: 'database' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Figma', level: 85, category: 'tools' },
  { name: 'Three.js', level: 70, category: 'tools' },
]

const categories = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Others',
}

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

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: '🔗' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
  { name: 'Email', url: 'mailto:example@email.com', icon: '📧' },
]

export function MainPage() {
  const { elementRef: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver()
  const { elementRef: aboutRef, hasIntersected: aboutIntersected } = useIntersectionObserver()
  const { elementRef: skillsRef, hasIntersected: skillsIntersected } = useIntersectionObserver()
  const { elementRef: portfolioRef, hasIntersected: portfolioIntersected } = useIntersectionObserver()
  const { elementRef: contactRef, hasIntersected: contactIntersected } = useIntersectionObserver()

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Tên là bắt buộc'
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Tin nhắn là bắt buộc'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Tin nhắn phải có ít nhất 10 ký tự'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            ref={heroRef}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={heroIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Building modern web experiences with cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="primary" onClick={() => scrollToSection('portfolio')}>
                View Projects
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('contact')}>
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={heroIntersected ? { opacity: 1, y: 0 } : {}}
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
                  animate={heroIntersected ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm font-medium text-primary-400 hover:border-primary-500 transition-colors"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen pt-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle>About Me</SectionTitle>

          <div ref={aboutRef} className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Profile</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Tôi là một Frontend Developer đam mê tạo ra những trải nghiệm web tuyệt vời. 
                  Với kiến thức sâu về React, TypeScript và các công nghệ hiện đại, tôi luôn 
                  tìm cách tối ưu hiệu suất và cải thiện trải nghiệm người dùng.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Tôi thích học hỏi các công nghệ mới và áp dụng chúng vào các dự án thực tế. 
                  Luôn đặt chất lượng code và user experience lên hàng đầu.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-200 mb-2">Computer Science</h4>
                    <p className="text-gray-400">University Degree</p>
                    <p className="text-sm text-gray-500">2018 - 2022</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-primary-400 mb-8">Timeline</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={aboutIntersected ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="text-3xl font-bold text-primary-400 min-w-[80px]">
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-200 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen pt-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle>Skills & Technologies</SectionTitle>

          <div ref={skillsRef} className="space-y-12">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsIntersected ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Card>
                  <h3 className="text-2xl font-semibold text-primary-400 mb-6">
                    {categories[category as keyof typeof categories]}
                  </h3>
                  <div className="space-y-4">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={skillsIntersected ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-200 font-medium">{skill.name}</span>
                          <span className="text-primary-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                            initial={{ width: 0 }}
                            animate={skillsIntersected ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + index * 0.05, ease: 'easeOut' }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen pt-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle>Portfolio</SectionTitle>

          <div ref={portfolioRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={portfolioIntersected ? { opacity: 1, y: 0 } : {}}
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen pt-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionTitle>Contact Me</SectionTitle>

          <div ref={contactRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <h3 className="text-2xl font-semibold text-primary-400 mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Bạn có dự án thú vị? Hoặc muốn hợp tác? Hãy liên hệ với tôi qua form bên cạnh 
                  hoặc các kênh social media.
                </p>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-200">Social Links</h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-gray-300 hover:text-primary-400 transition-colors"
                      >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <h3 className="text-2xl font-semibold text-primary-400 mb-6">
                  Send Message
                </h3>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
                  >
                    Cảm ơn bạn! Tin nhắn đã được gửi thành công.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.name ? 'border-red-500' : 'border-dark-600'
                      }`}
                      placeholder="Nhập tên của bạn"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.email ? 'border-red-500' : 'border-dark-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Tin nhắn
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                        errors.message ? 'border-red-500' : 'border-dark-600'
                      }`}
                      placeholder="Nhập tin nhắn của bạn..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

