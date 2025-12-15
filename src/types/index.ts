// Common types for the application

export interface Project {
  id: string
  title: string
  description: string
  image: string
  stack: string[]
  links: {
    live?: string
    github?: string
  }
}

export interface Skill {
  name: string
  level: number // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other'
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

