import express from 'express'
import upload from '../middleware/upload.js'
import cloudinary from '../config/cloudinary.js'
import { Readable } from 'stream'

const router = express.Router()

// Helper function to convert buffer to stream
const bufferToStream = (buffer) => {
  const readable = new Readable()
  readable._read = () => {}
  readable.push(buffer)
  readable.push(null)
  return readable
}

// Upload single image to Cloudinary
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    console.log('Uploading image to Cloudinary...')
    console.log('File:', req.file.originalname, 'Size:', req.file.size, 'bytes')

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/comments', // Folder in Cloudinary
          resource_type: 'image',
          transformation: [
            { width: 200, height: 200, crop: 'fill', gravity: 'face' }, // Resize and crop to square
            { quality: 'auto' }, // Auto quality
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            console.log('Upload successful:', result.secure_url)
            resolve(result)
          }
        }
      )

      // Convert buffer to stream and pipe to Cloudinary
      bufferToStream(req.file.buffer).pipe(uploadStream)
    })

    res.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    })
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error)
    console.error('Error details:', {
      message: error.message,
      http_code: error.http_code,
      name: error.name,
    })
    res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message || 'Unknown error'
    })
  }
})

export default router

