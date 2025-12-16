import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const codeLines = [
  'const developer = {',
  '  name: "Your Name",',
  '  role: "Web Developer",',
  '  skills: [',
  '    "React", "TypeScript",',
  '    "Node.js", "MongoDB"',
  '  ],',
  '  passion: "Creating amazing web experiences"',
  '};',
  '',
  'function buildPortfolio() {',
  '  return {',
  '    modern: true,',
  '    responsive: true,',
  '    beautiful: true',
  '  };',
  '}',
]

export function CodingScreen() {
  const [displayedCode, setDisplayedCode] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const lineIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const typeCode = () => {
      if (lineIndexRef.current < codeLines.length) {
        const currentLine = codeLines[lineIndexRef.current]
        
        if (charIndexRef.current < currentLine.length) {
          setDisplayedCode((prev) => {
            const newCode = [...prev]
            if (!newCode[lineIndexRef.current]) {
              newCode[lineIndexRef.current] = ''
            }
            newCode[lineIndexRef.current] = currentLine.substring(0, charIndexRef.current + 1)
            return newCode
          })
          charIndexRef.current += 1
        } else {
          lineIndexRef.current += 1
          charIndexRef.current = 0
        }
      } else {
        // Reset và lặp lại
        setTimeout(() => {
          setDisplayedCode([])
          lineIndexRef.current = 0
          charIndexRef.current = 0
        }, 3000)
      }
    }

    intervalRef.current = setInterval(typeCode, 50)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Laptop Frame */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 shadow-2xl border border-gray-700">
        {/* Screen */}
        <div className="bg-gray-900 rounded-t-lg border-2 border-gray-700 overflow-hidden">
          {/* Screen Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400">Terminal</span>
            </div>
          </div>
          
          {/* Code Display */}
          <div className="p-6 font-mono text-sm min-h-[300px]">
            <div className="text-green-400 mb-2">$ portfolio --dev</div>
            {displayedCode.map((line, index) => (
              <div key={index} className="text-gray-300">
                {line}
              </div>
            ))}
            {showCursor && (
              <span className="text-gray-300 animate-pulse">|</span>
            )}
          </div>
        </div>

        {/* Laptop Base */}
        <div className="h-2 bg-gray-800 rounded-b-lg"></div>
        <div className="h-1 bg-gray-700 rounded-b-lg -mt-1"></div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-primary-500/20 blur-3xl -z-10 rounded-lg"></div>
    </motion.div>
  )
}

