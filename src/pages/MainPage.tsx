import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { CodingScreen } from '../components/CodingScreen'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { useState, useEffect, FormEvent } from 'react'
import { Project } from '../types'

// Mapping tech names to Devicon icon URLs
const techIconMap: Record<string, string> = {
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'NestJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
  'Zustand': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
  'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'Mongoose': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'Nodemon': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  'Socket.io': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
  'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  'Railway': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/railway/railway-original.svg',
  'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  'Prisma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
}

const techStack = [
  'TypeScript', 'MySQL', 'HTML5', 'Next.js', 'NestJS', 'Zustand',
  'CSS3', 'TailwindCSS', 'Postman', 'PostgreSQL', 'Git', 'GitHub',
  'SQLite', 'Vite', 'Docker', 'JavaScript', 'Mongoose', 'MongoDB',
  'Nodemon', 'Node.js', 'React', 'Express', 'Socket.io', 'Bootstrap',
  'GraphQL', 'Railway', 'Vercel', 'Prisma'
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
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
]

interface Certificate {
  id: string
  title: string
  issuer: string
  image?: string
  date?: string
  link?: string
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding',
    image: 'https://via.placeholder.com/400x250/ffffff/000000?text=Certificate+1',
  },
  {
    id: '2',
    title: 'Belajar Dasar Visualisasi Data',
    issuer: 'Dicoding',
    image: 'https://via.placeholder.com/400x250/ffffff/000000?text=Certificate+2',
  },
  {
    id: '3',
    title: 'Belajar Membuat Aplikasi Web dengan React',
    issuer: 'Dicoding',
    image: 'https://via.placeholder.com/400x250/ffffff/000000?text=Certificate+3',
  },
  {
    id: '4',
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    issuer: 'Dicoding',
    image: 'https://via.placeholder.com/400x250/ffffff/000000?text=Certificate+4',
  },
  {
    id: '5',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding',
    image: 'https://via.placeholder.com/400x250/ffffff/000000?text=Certificate+5',
  },
  {
    id: '6',
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    issuer: 'Dicoding',
    image: 'https://via.placeholder.com/400x250/ffffff/000000?text=Certificate+6',
  },
]

export function MainPage() {
  const { elementRef: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver()
  const { elementRef: aboutRef, hasIntersected: aboutIntersected } = useIntersectionObserver()
  const { elementRef: portfolioRef, hasIntersected: portfolioIntersected } = useIntersectionObserver()
  const { elementRef: contactRef, hasIntersected: contactIntersected } = useIntersectionObserver()

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'techstack'>('projects')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Typing effects - both lines start together
  const titleText = 'Welcome to My Portfolio'
  const subtitleText = 'Building modern web experiences with cutting-edge technology'
  
  const [startTyping, setStartTyping] = useState(false)
  
  const { displayedText: displayedTitle, isTyping: isTypingTitle } = useTypingEffect(
    titleText, 
    startTyping ? 40 : 0
  )
  const { displayedText: displayedSubtitle, isTyping: isTypingSubtitle } = useTypingEffect(
    subtitleText,
    startTyping ? 30 : 0
  )

  // Start typing when hero is intersected
  useEffect(() => {
    if (heroIntersected && !startTyping) {
      setStartTyping(true)
    }
  }, [heroIntersected, startTyping])


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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              ref={heroRef}
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={heroIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent">
                {displayedTitle}
                {isTypingTitle && <span className="animate-pulse">|</span>}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                {displayedSubtitle}
                {isTypingSubtitle && <span className="animate-pulse">|</span>}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="primary" 
                  onClick={() => scrollToSection('portfolio')}
                >
                  View Projects
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 hover:border-primary-500 flex items-center justify-center transition-colors"
                    title={link.name}
                  >
                    {link.icon === 'github' && (
                      <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {link.icon === 'facebook' && (
                      <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {link.icon === 'instagram' && (
                      <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Coding Screen */}
            <CodingScreen />
          </div>
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

      {/* Portfolio Showcase Section */}
      <section id="portfolio" className="min-h-screen pt-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent">
              Portfolio Showcase
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
            </p>
          </div>

          {/* Tabs */}
          <div ref={portfolioRef} className="mb-8">
            <div className="flex justify-center gap-4 mb-8">
              {[
                { id: 'projects' as const, label: 'Projects', icon: '<>' },
                { id: 'certificates' as const, label: 'Certificates', icon: '🎓' },
                { id: 'techstack' as const, label: 'Tech Stack', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-500/20 text-primary-400 border-2 border-primary-500/50 shadow-lg shadow-primary-500/20'
                      : 'bg-dark-800 text-gray-300 border-2 border-dark-700 hover:border-primary-500/30'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={portfolioIntersected ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full flex flex-col">
                        <div className="aspect-[4/3] bg-white rounded-lg mb-4 overflow-hidden border-2 border-gray-200">
                          {cert.image ? (
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                              <div className="text-center">
                                <div className="text-4xl mb-4">🎓</div>
                                <h4 className="font-bold text-gray-800 mb-2">{cert.issuer}</h4>
                                <p className="text-sm text-gray-600">{cert.title}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-primary-400 mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {cert.issuer}
                        </p>
                        {cert.date && (
                          <p className="text-gray-500 text-xs">
                            {cert.date}
                          </p>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tech Stack Tab */}
              {activeTab === 'techstack' && (
                <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                  {techStack.map((tech, index) => {
                    const iconUrl = techIconMap[tech]
                    return (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={portfolioIntersected ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="flex flex-col items-center gap-2 p-3 bg-dark-800 border border-dark-700 rounded-lg hover:border-primary-500 transition-colors"
                        title={tech}
                      >
                        {iconUrl ? (
                          <div className="w-16 h-16 rounded-full bg-white/30 border-2 border-white/40 flex items-center justify-center p-2 hover:bg-white/40 hover:border-white/60 transition-all shadow-lg backdrop-blur-sm">
                            <img 
                              src={iconUrl} 
                              alt={tech}
                              className="w-10 h-10 object-contain brightness-120 contrast-120 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                            />
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-primary-400">{tech}</span>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Project Modal */}
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

