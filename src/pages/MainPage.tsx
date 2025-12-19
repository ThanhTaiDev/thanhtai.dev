import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { CodingScreen } from '../components/CodingScreen'
import { TimelinePro } from '../components/TimelinePro'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { useState, useEffect, FormEvent } from 'react'
import { Project } from '../types'
import { fetchComments, createComment, uploadImage, Comment } from '../utils/api'

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
    year: '2021',
    title: 'Front-end Development Foundations',
    description: 'Started learning HTML, CSS, and JavaScript, focusing on basic layouts, styling, and client-side logic.',
  },
  {
    year: '2023',
    title: 'Front-end & Backend Fundamentals',
    description: 'Implemented front-end interfaces and basic backend services using JavaScript, handling API requests, data persistence, and authentication fundamentals.',
  },
  {
    year: '2024',
    title: 'Junior Front-end Development (Foundational Stage)',
    description: 'Designed and implemented UI/UX for basic web projects, focusing on component structure, responsiveness, and usability.',
  },
  {
    year: '2025',
    title: 'Modern Web Development (Generalist Level)',
    description: 'Gained broad exposure to modern web technologies including React, Node.js, TypeScript, deployment platforms, and databases, with practical usage across multiple projects.',
  },
]

// Skills and categories moved to TimelinePro component

const projects: Project[] = [
  {
    id: '1',
    title: 'Cinema Management System',
    description: 'A project focused on building a cinema management system using React, TypeScript, and Node.js. The system enables the management of movies, showtimes, tickets, and users, and provides an administrative dashboard to support system operations.',
    image: '/images/projects/cinema-management.png',
    stack: ['React', 'TypeScript', 'Node.js'],
    links: {
      live: 'http://website-xem-phim.vercel.app/',
      github: 'https://github.com/ThanhTaiDev/Frontend_WebsiteXemPhim',
    },
  },
  {
    id: '2',
    title: 'Online Traditional Market Platform',
    description: 'A project that develops an online traditional marketplace platform using React, Node.js, and Prisma ORM. It supports the management of products, shops, orders, and users, and includes an administrative dashboard to facilitate system operations.',
    image: '/images/projects/smart-market.png',
    stack: ['React', 'Node.js', 'Prisma'],
    links: {
      live: '',
      github: 'https://github.com/ThanhTaiDev/Frontend_Market',
    },
  },
  {
    id: '3',
    title: 'Online Voting System',
    description: 'A project centered on building an online voting system using React and Node.js. The system allows creating and managing polls, user authentication, vote recording, and provides an administrative dashboard for monitoring and analyzing results.',
    image: '/images/projects/voting-system.png',
    stack: ['React', 'Node.js'],
    links: {
      live: '',
      github: 'https://github.com/ThanhTaiDev/Project_BoPhieu_FE_BE',
    },
  },
]

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/ThanhTai.In4', icon: 'facebook', label: "Let's Connect" },
  { name: 'Instagram', url: 'https://www.instagram.com/_thanhtaisosad_/', icon: 'instagram', label: '@_thanhtaisosad_' },
  { name: 'Youtube', url: 'https://youtube.com', icon: 'youtube', label: '@thanhtai' },
  { name: 'GitHub', url: 'https://github.com/ThanhTaiDev', icon: 'github', label: '@ThanhTaiDev' },
  { name: 'TikTok', url: 'https://tiktok.com', icon: 'tiktok', label: '@thanhtai' },
]


interface Certificate {
  id: string
  title: string
  issuer: string
  image?: string
  date?: string
  link?: string
  description?: string
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Certificate of Achievement - Information Technology',
    issuer: 'Awarded for outstanding achievement in Information Technology',
    image: '/images/certificates/CERTIFICATE1.png',
    date: 'August 2025',
    description: 'This certificate is awarded to Vo Van Thanh Tai in recognition for outstanding achievement in Information Technology, demonstrating strong technical competence, analytical thinking, and practical problem-solving skills.',
  },
  {
    id: '2',
    title: 'Certificate of Completion - Information Technology Certification Program',
    issuer: 'Information Technology Certification Program',
    image: '/images/certificates/CERTIFICATE2.png',
    description: 'For successfully completing an Information Technology Certification Program.',
  },
  {
    id: '3',
    title: 'Certificate of Achievement - Information Technology',
    issuer: 'Awarded for achievement in Information Technology',
    image: '/images/certificates/CERTIFICATE.png',
    description: 'For achievement in Information Technology and demonstrated technical excellence.',
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
  
  // Comments state
  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentData, setCommentData] = useState({ name: '', message: '' })
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  
  // Fetch comments on mount
  useEffect(() => {
    loadComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Default pinned comment (fallback if not in database)
  const defaultPinnedComment: Comment = {
    id: 'default-pinned',
    name: 'Thanh Tai',
    message: 'Thanks for visiting! Contact me if you need anything',
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    isPinned: true,
    profilePhoto: '/images/profile/5d20d308b815374b6e04.jpg',
  }

  const loadComments = async () => {
    try {
      setCommentsLoading(true)
      const fetchedComments = await fetchComments()
      
      // Check if we have a pinned comment from Thanh Tai
      const hasDefaultPinned = fetchedComments.some(
        c => c.isPinned && c.name === 'Thanh Tai'
      )
      
      // If no default pinned comment exists, add it
      if (!hasDefaultPinned) {
        setComments([defaultPinnedComment, ...fetchedComments])
      } else {
        setComments(fetchedComments)
      }
    } catch (error) {
      console.error('Failed to load comments:', error)
      // On error, show at least the default pinned comment
      setComments([defaultPinnedComment])
    } finally {
      setCommentsLoading(false)
    }
  }
  
  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!commentData.name.trim() || !commentData.message.trim()) return
    if (isSubmittingComment) return

    try {
      setIsSubmittingComment(true)
      
      // Upload profile photo to Cloudinary if provided
      let profilePhotoUrl: string | null = null
      if (profilePhoto) {
        try {
          profilePhotoUrl = await uploadImage(profilePhoto)
        } catch (error) {
          console.error('Failed to upload image:', error)
          alert('Failed to upload profile photo. Comment will be posted without photo.')
          // Continue without photo
        }
      }

      // Create comment with Cloudinary URL
      const newComment = await createComment({
        name: commentData.name.trim(),
        message: commentData.message.trim(),
        profilePhoto: profilePhotoUrl,
        isPinned: false,
      })

      // Add new comment to the list (it will be at the top since API returns sorted)
      setComments([newComment, ...comments])
      setCommentData({ name: '', message: '' })
      setProfilePhoto(null)
      setProfilePhotoPreview(null)
    } catch (error) {
      console.error('Failed to submit comment:', error)
      alert('Failed to post comment. Please try again.')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Typing effects - both lines start together
  const titleText = 'Frontend Developer'
  const subtitleText = 'Building modern web experiences with cutting-edge technology'
  
  // Hero skills badges
  const heroSkills = ['React', 'JavaScript', 'Node.js', 'TailwindCSS']
  
  const [startTyping, setStartTyping] = useState(false)
  
  const { displayedText: _displayedTitle, isTyping: _isTypingTitle } = useTypingEffect(
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
      // Với scroll snap, chỉ cần scroll đến vị trí của element
      // Scroll snap sẽ tự động snap vào đúng vị trí
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
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
    <div className="w-full bg-transparent relative">
      {/* Hero Section */}
      <section id="home" className="h-screen snap-start pt-16 flex items-center bg-transparent relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              ref={heroRef}
              className="text-left min-w-0"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-lg md:text-xl text-primary-400 mb-4 font-medium">
                Hi, I'm Thanh Tai
              </p>
              
              {/* Main Heading - Split with different colors */}
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-white">Frontend</span>{' '}
                <span className="text-purple-400">Developer</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                {displayedSubtitle}
                {isTypingSubtitle && <span className="animate-pulse">|</span>}
              </p>
              
              {/* Skills Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {heroSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg text-sm font-medium text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  variant="primary" 
                  onClick={() => scrollToSection('portfolio')}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Projects</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact</span>
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.filter(link => ['facebook', 'github', 'instagram'].includes(link.icon)).map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 hover:border-primary-500 flex items-center justify-center transition-colors"
                    title={link.name}
                  >
                    {link.icon === 'github' && (
                      <svg role="img" className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    )}
                    {link.icon === 'facebook' && (
                      <svg role="img" className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>Facebook</title>
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                      </svg>
                    )}
                    {link.icon === 'instagram' && (
                      <svg role="img" className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>Instagram</title>
                        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
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
      <section id="about" className="min-h-screen snap-start pt-16 flex items-start bg-transparent relative z-10">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={aboutIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>About Me</SectionTitle>
          </motion.div>

          <div ref={aboutRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Profile</h3>
                <p className="text-gray-300 leading-relaxed mb-4 break-words">
                  I am a Frontend Developer passionate about creating outstanding web experiences. With a solid foundation in React, Node.js, TypeScript, and modern web technologies, I continuously strive to optimize performance and enhance user experience.
                </p>
                <p className="text-gray-300 leading-relaxed break-words">
                  I enjoy learning new technologies and applying them to real-world projects, always prioritizing code quality and user experience in everything I build.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="min-w-0"
            >
              <Card>
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">2022-2026</p>
                    <h4 className="text-lg font-medium text-gray-200">Duy Tan University</h4>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={aboutIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-primary-400 mb-8">Timeline</h3>
            <TimelinePro items={timeline} />
          </motion.div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section id="portfolio" className="min-h-screen snap-start pt-16 flex items-start bg-transparent relative z-10">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={portfolioIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent">
              Portfolio Showcase
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
            </p>
          </motion.div>

          {/* Tabs */}
          <div ref={portfolioRef} className="mb-4 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={portfolioIntersected ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-4 mb-4"
            >
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
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-12">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={portfolioIntersected ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">MY WORK</p>
                    <p className="text-gray-300 max-w-3xl">
                      Following projects showcases my skills and experience through real-world examples of my work. 
                      Each project is briefly described with links to code repositories and live demos in it. 
                      It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
                    </p>
                  </motion.div>

                  {/* Projects Grid */}
                  <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {projects.slice(0, 3).map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={portfolioIntersected ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                        whileHover={{ y: -8 }}
                        className="cursor-pointer min-w-0"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Card className="h-full flex flex-col bg-dark-800/50 border border-dark-700 hover:border-primary-500/50 transition-all">
                          {/* Project Image */}
                          <div className="relative mb-6 rounded-lg overflow-hidden bg-white">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-auto object-cover max-w-full"
                            />
                            {/* GitHub Icon Overlay */}
                            {project.links.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                              >
                                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                          </div>

                          {/* Project Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-3">
                              {project.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed break-words">
                              {project.description}
                            </p>
                            
                            {/* Technologies as Hashtags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-primary-400 text-sm font-medium"
                                >
                                  #{tech.toLowerCase().replace(/\s+/g, '')}
                                </span>
                              ))}
                            </div>
                            
                            {/* View Live Demo Button */}
                            <a
                              href={project.links.live || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (!project.links.live) {
                                  e.preventDefault()
                                }
                              }}
                              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg transition-all ${
                                project.links.live
                                  ? 'bg-primary-500 hover:bg-primary-600 text-white cursor-pointer'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                              }`}
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View Live Demo
                            </a>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      className="min-w-0"
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
                              className="w-full h-full object-cover max-w-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-6">
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
                <div className="pt-8">
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 lg:gap-6 max-w-6xl mx-auto">
                    {techStack.map((tech, index) => {
                      const iconUrl = techIconMap[tech]
                      return (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={portfolioIntersected ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.02 }}
                          whileHover={{ scale: 1.15, y: -8 }}
                          className="min-w-0 flex flex-col items-center justify-center"
                          title={tech}
                        >
                          {iconUrl ? (
                            <motion.div 
                              className="w-20 h-20 rounded-full bg-white/30 border-2 border-white/40 flex items-center justify-center p-2 cursor-pointer group hover:bg-white/40 hover:border-white/60 transition-all duration-300 shadow-lg backdrop-blur-sm relative"
                              whileHover={{ 
                                boxShadow: "0 20px 40px rgba(167, 139, 250, 0.35)",
                              }}
                            >
                              {/* Glow effect on hover */}
                              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 rounded-full transition-all duration-300"></div>
                              
                              <img 
                                src={iconUrl} 
                                alt={tech}
                                className="w-14 h-14 object-contain brightness-120 contrast-120 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(167,139,250,0.6)] transition-all duration-300 relative z-10"
                              />
                            </motion.div>
                          ) : (
                            <span className="text-sm font-medium text-primary-400">{tech}</span>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
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
                    className="w-full h-full object-cover max-w-full"
                  />
                </div>
                <h2 className="text-3xl font-bold text-primary-400 mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed break-words">
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
      <section id="contact" className="h-screen snap-start pt-16 flex flex-col bg-transparent overflow-y-auto overflow-x-hidden relative z-10">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 py-6">
          <div ref={contactRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contactIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col w-full min-w-0"
            >
              <Card className="flex flex-col h-[calc(100vh-180px)] w-full min-w-0">
                {/* Title with icon */}
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-primary-400">Contact</h3>
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm">
                  Have something to discuss? Send me a message and let's talk.
                </p>

                {/* Contact Form */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 bg-primary-500/10 border rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                        errors.name ? 'border-red-500' : 'border-primary-500/30 hover:border-primary-500/50'
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 bg-primary-500/10 border rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                        errors.email ? 'border-red-500' : 'border-primary-500/30 hover:border-primary-500/50'
                      }`}
                      placeholder="Your Email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className={`w-full pl-12 pr-4 py-3 bg-primary-500/10 border rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all ${
                        errors.message ? 'border-red-500' : 'border-primary-500/30 hover:border-primary-500/50'
                      }`}
                      placeholder="Your Message"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>

                {/* Connect With Me Section */}
                <div className="border-t border-dark-700/50 pt-4 mt-4">
                  <h4 className="text-base font-semibold text-gray-200 mb-3">Connect With Me</h4>
                  <div className="space-y-3">
                    {/* Facebook - Full Width */}
                    {socialLinks.filter(link => link.icon === 'facebook').map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600 hover:border-primary-500/50 rounded-xl text-gray-300 hover:text-primary-400 transition-all group"
                      >
                        <div className="w-11 h-11 p-0 flex items-center justify-center leading-none shrink-0">
                          <svg className="w-5 h-5 block" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                          </svg>
                        </div>
                        <span className="text-sm font-medium">{link.label || link.name}</span>
                      </a>
                    ))}
                    
                    {/* Other Social Links - 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.filter(link => link.icon !== 'facebook').map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600 hover:border-primary-500/50 rounded-xl text-gray-300 hover:text-primary-400 transition-all group"
                        >
                          <div className="w-11 h-11 p-0 flex items-center justify-center leading-none shrink-0">
                            {link.icon === 'instagram' && (
                              <svg className="w-5 h-5 block" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            )}
                            {link.icon === 'youtube' && (
                              <svg className="w-5 h-5 block" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                            )}
                            {link.icon === 'github' && (
                              <svg className="w-5 h-5 block" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                              </svg>
                            )}
                            {link.icon === 'tiktok' && (
                              <svg className="w-5 h-5 block" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium">{link.label || link.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right Column - Comments Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contactIntersected ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col w-full min-w-0"
            >
              <Card className="flex flex-col h-[calc(100vh-180px)] overflow-hidden w-full min-w-0">
                <h3 className="text-lg font-semibold text-primary-400 mb-3 flex-shrink-0">
                  Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-3 mb-3 pb-3 border-b border-dark-700/50 flex-shrink-0">
                  <div>
                    <label htmlFor="comment-name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="comment-name"
                      value={commentData.name}
                      onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-primary-500/10 border border-dark-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="comment-message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="comment-message"
                      value={commentData.message}
                      onChange={(e) => setCommentData({ ...commentData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-primary-500/10 border border-dark-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none placeholder-gray-500"
                      placeholder="Write a comment..."
                    />
                  </div>

                  <div>
                    <label htmlFor="comment-photo" className="block text-sm font-medium text-gray-300 mb-2">
                      Profile Photo (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      {profilePhotoPreview ? (
                        <div className="relative">
                          <img
                            src={profilePhotoPreview}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/50"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setProfilePhoto(null)
                              setProfilePhotoPreview(null)
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="comment-photo"
                          className="w-16 h-16 rounded-full bg-dark-700 border-2 border-dashed border-dark-600 hover:border-primary-500/50 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </label>
                      )}
                      <input
                        type="file"
                        id="comment-photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <span className="text-sm text-gray-400">
                        {profilePhoto ? profilePhoto.name : 'Upload a profile photo'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!commentData.name.trim() || !commentData.message.trim() || isSubmittingComment}
                    className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>

                {/* Comments List */}
                <div className="flex-1 flex flex-col pt-2 min-h-0 overflow-hidden">
                  <div className="space-y-3 pr-2 overflow-y-auto flex-1 min-h-0 max-h-full">
                    {/* Loading State */}
                    {commentsLoading && (
                      <p className="text-gray-400 text-sm text-center py-8">Loading comments...</p>
                    )}
                    
                    {/* Pinned Comments */}
                    {comments.filter(c => c.isPinned).length > 0 && (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pinned Comment</span>
                        </div>
                        {comments
                          .filter(c => c.isPinned)
                          .map((comment) => (
                            <div
                              key={comment.id}
                              className="p-4 bg-dark-700/50 border border-dark-600 rounded-lg"
                            >
                              <div className="flex items-start gap-3">
                                {comment.profilePhoto ? (
                                  <img
                                    src={comment.profilePhoto}
                                    alt={comment.name}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-primary-500/30"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    {comment.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-sm font-semibold text-gray-200">{comment.name}</h5>
                                    {comment.isPinned && comment.name === 'Thanh Tai' && (
                                      <span className="text-xs px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded">Admin</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-300 mb-2">{comment.message}</p>
                                  <div className="flex justify-end">
                                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                    
                    {/* Regular Comments - Show first 2, rest are scrollable */}
                    {(() => {
                      const regularComments = comments.filter(c => !c.isPinned)
                      const initialDisplayCount = 2 // Show 2 regular comments initially
                      const visibleComments = regularComments.slice(0, initialDisplayCount)
                      const scrollableComments = regularComments.slice(initialDisplayCount)
                      
                      return (
                        <>
                          {/* First 2 regular comments (always visible) */}
                          {visibleComments.map((comment) => (
                            <div
                              key={comment.id}
                              className="p-4 bg-dark-700/30 border border-dark-600 rounded-lg hover:bg-dark-700/50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                {comment.profilePhoto ? (
                                  <img
                                    src={comment.profilePhoto}
                                    alt={comment.name}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-primary-500/30"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/50 to-primary-600/50 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    {comment.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-sm font-semibold text-gray-200 mb-1">{comment.name}</h5>
                                  <p className="text-sm text-gray-300 mb-2">{comment.message}</p>
                                  <div className="flex justify-end">
                                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {/* Remaining comments (scrollable) */}
                          {scrollableComments.map((comment) => (
                            <div
                              key={comment.id}
                              className="p-4 bg-dark-700/30 border border-dark-600 rounded-lg hover:bg-dark-700/50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                {comment.profilePhoto ? (
                                  <img
                                    src={comment.profilePhoto}
                                    alt={comment.name}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-primary-500/30"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500/50 to-primary-600/50 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    {comment.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-sm font-semibold text-gray-200 mb-1">{comment.name}</h5>
                                  <p className="text-sm text-gray-300 mb-2">{comment.message}</p>
                                  <div className="flex justify-end">
                                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )
                    })()}
                    {!commentsLoading && comments.length === 0 && (
                      <p className="text-gray-400 text-sm text-center py-8">No comments yet. Be the first to comment!</p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

