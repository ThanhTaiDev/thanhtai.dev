// Mobile Layout Overflow Checker
// Copy and paste this script into browser console to check for overflow elements

(function() {
  console.log('🔍 Checking for overflow elements...\n')
  
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  console.log(`Viewport: ${viewportWidth}x${viewportHeight}\n`)
  
  // Find all elements that overflow horizontally
  const allElements = Array.from(document.querySelectorAll('*'))
  const overflowing = allElements.filter(el => {
    const rect = el.getBoundingClientRect()
    const style = window.getComputedStyle(el)
    
    // Check if element extends beyond viewport
    const overflowsRight = rect.right > viewportWidth + 1
    const overflowsLeft = rect.left < -1
    const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
    
    return isVisible && (overflowsRight || overflowsLeft)
  })
  
  if (overflowing.length === 0) {
    console.log('✅ No overflow elements found!')
    return
  }
  
  console.log(`⚠️ Found ${overflowing.length} overflowing element(s):\n`)
  
  overflowing.slice(0, 20).forEach((el, index) => {
    const rect = el.getBoundingClientRect()
    const style = window.getComputedStyle(el)
    const tag = el.tagName.toLowerCase()
    const id = el.id ? `#${el.id}` : ''
    const classes = el.className ? `.${el.className.split(' ').join('.')}` : ''
    const selector = `${tag}${id}${classes}`
    
    console.group(`[${index + 1}] ${selector}`)
    console.log(`Position: left=${rect.left.toFixed(2)}, right=${rect.right.toFixed(2)}`)
    console.log(`Size: ${rect.width.toFixed(2)}x${rect.height.toFixed(2)}`)
    console.log(`Overflows by: ${Math.max(0, rect.right - viewportWidth).toFixed(2)}px (right) or ${Math.max(0, -rect.left).toFixed(2)}px (left)`)
    console.log(`Styles:`, {
      width: style.width,
      maxWidth: style.maxWidth,
      minWidth: style.minWidth,
      overflow: style.overflow,
      position: style.position,
      transform: style.transform,
    })
    console.log(`Element:`, el)
    console.groupEnd()
  })
  
  if (overflowing.length > 20) {
    console.log(`\n... and ${overflowing.length - 20} more elements`)
  }
  
  console.log('\n💡 Tips:')
  console.log('- Add min-w-0 to flex/grid children')
  console.log('- Add w-full max-w-full to containers')
  console.log('- Add break-words to text elements')
  console.log('- Check for fixed widths (w-[XXXpx])')
  console.log('- Ensure overflow-x-hidden on parent containers')
})();

