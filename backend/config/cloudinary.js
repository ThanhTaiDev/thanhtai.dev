import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

// Validate Cloudinary credentials
if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Cloudinary credentials missing!')
  console.error('Please check your .env file for:')
  console.error('  - CLOUDINARY_CLOUD_NAME')
  console.error('  - CLOUDINARY_API_KEY')
  console.error('  - CLOUDINARY_API_SECRET')
} else {
  console.log('✅ Cloudinary configured with cloud name:', cloudName)
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

export default cloudinary

