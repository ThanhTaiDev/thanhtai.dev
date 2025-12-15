import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: '🔗' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
  { name: 'Email', url: 'mailto:example@email.com', icon: '📧' },
]

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validate form data
  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Tên là bắt buộc'
    }

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: '', email: '', message: '' })

    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <motion.div
      className="min-h-screen pt-16"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle>Contact Me</SectionTitle>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
        </div>
      </section>
    </motion.div>
  )
}
