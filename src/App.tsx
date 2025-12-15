import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppRoutes } from './routes/AppRoutes'
import { LoadingScreen } from './components/LoadingScreen'
import { useState, useEffect } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Loading logic will be implemented here
    // For now, just a placeholder
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App

