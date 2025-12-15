import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'database'
  icon?: string
}

const skills: Skill[] = [
  // Frontend
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3', level: 90, category: 'frontend' },
  { name: 'JavaScript', level: 92, category: 'frontend' },
  { name: 'TypeScript', level: 88, category: 'frontend' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Redux', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 93, category: 'frontend' },
  { name: 'Framer Motion', level: 80, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  
  // Database
  { name: 'MongoDB', level: 80, category: 'database' },
  
  // Tools
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

export function Skills() {
  const { elementRef, hasIntersected } = useIntersectionObserver()

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <motion.div
      className="min-h-screen pt-16"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle>Skills & Technologies</SectionTitle>

        <div ref={elementRef} className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
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
                      animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
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
                          animate={hasIntersected ? { width: `${skill.level}%` } : {}}
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
      </section>
    </motion.div>
  )
}
