import { motion } from 'framer-motion'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

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

export function About() {
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
        <SectionTitle>About Me</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
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
        </div>

        <div ref={elementRef}>
          <h3 className="text-2xl font-semibold text-primary-400 mb-8">Timeline</h3>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </section>
    </motion.div>
  )
}
