import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import prisma from './lib/prisma.js'
import commentsRoutes from './routes/comments.js'
import uploadRoutes from './routes/upload.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Test PostgreSQL connection
async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to PostgreSQL')
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error)
    console.log('💡 Make sure PostgreSQL is running or check your DATABASE_URL in .env file')
  }
}

testConnection()

// Routes
app.use('/api/comments', commentsRoutes)
app.use('/api/upload', uploadRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/comments`)
})

