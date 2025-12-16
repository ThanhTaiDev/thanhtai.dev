import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const prevSpeedRef = useRef(speed)

  useEffect(() => {
    if (speed === 0) {
      // Don't start typing if speed is 0
      if (prevSpeedRef.current !== 0) {
        setDisplayedText('')
        setIsTyping(true)
      }
      prevSpeedRef.current = speed
      return
    }

    // Reset when speed changes from 0 to non-zero
    if (prevSpeedRef.current === 0 && speed > 0) {
      setDisplayedText('')
      setIsTyping(true)
    }
    prevSpeedRef.current = speed

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayedText, text, speed])

  return { displayedText, isTyping }
}

