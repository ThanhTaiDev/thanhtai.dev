import { Layout } from './components/Layout'
import { MainPage } from './pages/MainPage'
import { LoadingScreen } from './components/LoadingScreen'
import { useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <Layout>
      <MainPage />
    </Layout>
  )
}

export default App
