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

// Middleware - CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      // Vercel domains (will be added dynamically)
    ].filter(Boolean) // Remove undefined values
    
    // In production, also allow Vercel preview deployments
    if (process.env.NODE_ENV === 'production') {
      if (origin.includes('vercel.app') || origin.includes('vercel.com')) {
        return callback(null, true)
      }
    }
    
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
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

